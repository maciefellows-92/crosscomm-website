import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export type AuditIssue = { file: string; check: string; detail: string };

type ManifestRoute = { path: string; outputFile: string; kind: string; inSitemap: boolean };

type VersionReceipt = { release: string; builtAt: string; indexable: boolean; canonicalOrigin: string };

function issue(file: string, check: string, detail: string): AuditIssue {
  return { file, check, detail };
}

function readJson<T>(file: string): { value?: T; error?: string } {
  try {
    return { value: JSON.parse(fs.readFileSync(file, "utf8")) as T };
  } catch (error) {
    return { error: error instanceof Error ? error.message : String(error) };
  }
}

function tagAttrs(html: string, tag: string): string[] {
  const out: string[] = [];
  const re = new RegExp(`<${tag}\\b([^>]*)>`, "gi");
  for (const match of html.matchAll(re)) out.push(match[1] ?? "");
  return out;
}

function attr(attrs: string, name: string): string | undefined {
  const match = attrs.match(new RegExp(`(?:^|\\s)${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, "i"));
  return match?.[2] ?? match?.[3];
}

function metaByName(html: string, name: string): string | undefined {
  for (const attrs of tagAttrs(html, "meta")) {
    if (attr(attrs, "name")?.toLowerCase() === name.toLowerCase()) return attr(attrs, "content");
  }
  return undefined;
}

function visibleText(html: string): string {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function jsonLd(html: string): { nodes: unknown[]; errors: string[] } {
  const nodes: unknown[] = [];
  const errors: string[] = [];
  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      nodes.push(JSON.parse(match[1] ?? ""));
    } catch (error) {
      errors.push(error instanceof Error ? error.message : String(error));
    }
  }
  return { nodes, errors };
}

function typesOf(nodes: unknown[]): string[] {
  const found: string[] = [];
  const walk = (value: unknown) => {
    if (Array.isArray(value)) {
      value.forEach(walk);
      return;
    }
    if (!value || typeof value !== "object") return;
    const record = value as Record<string, unknown>;
    if (typeof record["@type"] === "string") found.push(record["@type"]);
    for (const child of Object.values(record)) walk(child);
  };
  nodes.forEach(walk);
  return found;
}

function fileForSiteUrl(publicDir: string, urlPath: string): string | null {
  const clean = urlPath.split("#")[0]?.split("?")[0] ?? "";
  if (!clean.startsWith("/")) return null;
  let decoded: string;
  try {
    decoded = decodeURIComponent(clean);
  } catch {
    return null;
  }
  if (decoded.split("/").some((segment) => segment === "..") || decoded.includes("\\") || decoded.includes("\0")) {
    return null;
  }
  const relative = decoded.replace(/^\/+/, "").replace(/\/+$/, "");
  if (relative === "") return path.join(publicDir, "index.html");
  if (path.extname(relative)) return path.join(publicDir, relative);
  return path.join(publicDir, relative, "index.html");
}

function localRefs(html: string): string[] {
  const refs: string[] = [];
  for (const attrs of [...tagAttrs(html, "a"), ...tagAttrs(html, "img"), ...tagAttrs(html, "script"), ...tagAttrs(html, "link"), ...tagAttrs(html, "source")]) {
    for (const name of ["href", "src"]) {
      const value = attr(attrs, name);
      if (value) refs.push(value);
    }
    const srcset = attr(attrs, "srcset");
    if (srcset) {
      for (const part of srcset.split(",")) {
        const url = part.trim().split(/\s+/)[0];
        if (url) refs.push(url);
      }
    }
  }
  return refs;
}

function isSkippableRef(value: string): boolean {
  return /^(?:[a-z][a-z0-9+.-]*:|#)/i.test(value) || value.startsWith("//");
}

export function auditBuild(distDir: string): AuditIssue[] {
  const problems: AuditIssue[] = [];
  const publicDir = path.join(distDir, "public");
  const versionFile = path.join(publicDir, "version.json");
  const manifestFile = path.join(distDir, "route-manifest.json");
  const version = readJson<VersionReceipt>(versionFile);
  if (!version.value) {
    problems.push(issue("public/version.json", "version", version.error ?? "missing"));
    return problems;
  }
  const receipt = version.value;
  if (!/^(?:local|[0-9a-f]{40})$/.test(receipt.release)) {
    problems.push(issue("public/version.json", "release", "expected a 40-character SHA or local"));
  }
  if (Number.isNaN(Date.parse(receipt.builtAt))) {
    problems.push(issue("public/version.json", "builtAt", "not a parseable time"));
  }
  if (typeof receipt.indexable !== "boolean" || !/^https:\/\/[^/]+$/.test(receipt.canonicalOrigin)) {
    problems.push(issue("public/version.json", "origins", "indexable or canonicalOrigin is missing"));
  }

  const manifestRead = readJson<ManifestRoute[]>(manifestFile);
  if (!manifestRead.value || !Array.isArray(manifestRead.value)) {
    problems.push(issue("route-manifest.json", "manifest", manifestRead.error ?? "missing"));
    return problems;
  }
  const routes = manifestRead.value;
  const paths = new Set<string>();
  for (const route of routes) {
    if (paths.has(route.path)) problems.push(issue(route.outputFile, "unique-path", route.path));
    paths.add(route.path);
    const file = path.join(publicDir, route.outputFile);
    if (!fs.existsSync(file)) problems.push(issue(route.outputFile, "file", "prerendered HTML is missing"));
  }
  const notFound = routes.filter((route) => route.kind === "not-found");
  if (notFound.length !== 1 || notFound[0]?.outputFile !== "404.html" || notFound[0].inSitemap) {
    problems.push(issue("404.html", "not-found", "manifest needs one 404 route excluded from the sitemap"));
  }

  const robotsFile = path.join(publicDir, "robots.txt");
  const robots = fs.existsSync(robotsFile) ? fs.readFileSync(robotsFile, "utf8") : "";
  if (!robots) problems.push(issue("public/robots.txt", "robots", "missing"));
  if (/^Disallow:\s*\/\s*$/m.test(robots)) {
    problems.push(issue("public/robots.txt", "robots", "Disallow: / hides the noindex tag from crawlers"));
  }
  if (!/^Allow:\s*\/\s*$/m.test(robots)) problems.push(issue("public/robots.txt", "robots", "Allow: / is missing"));
  const sitemapAdvertised = /^Sitemap:\s*\S+/m.test(robots);
  if (receipt.indexable && !sitemapAdvertised) {
    problems.push(issue("public/robots.txt", "sitemap", "an indexable build must advertise the sitemap"));
  }
  if (!receipt.indexable && sitemapAdvertised) {
    problems.push(issue("public/robots.txt", "sitemap", "a review build must not advertise the sitemap"));
  }

  const sitemapFile = path.join(publicDir, "sitemap.xml");
  const sitemap = fs.existsSync(sitemapFile) ? fs.readFileSync(sitemapFile, "utf8") : "";
  if (!sitemap.includes("<urlset")) problems.push(issue("public/sitemap.xml", "sitemap", "missing urlset"));
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1] ?? "");
  const expectedLocs = routes
    .filter((route) => route.inSitemap)
    .map((route) => `${receipt.canonicalOrigin}${route.path === "/" ? "/" : route.path}`);
  if (locs.length !== expectedLocs.length || expectedLocs.some((loc) => !locs.includes(loc))) {
    problems.push(issue("public/sitemap.xml", "sitemap", "locations do not match the indexable routes"));
  }
  if (locs.some((loc) => loc.includes("404"))) problems.push(issue("public/sitemap.xml", "sitemap", "404 is listed"));

  const llmsFile = path.join(publicDir, "llms.txt");
  const llms = fs.existsSync(llmsFile) ? fs.readFileSync(llmsFile, "utf8") : "";
  if (!llms.trim()) problems.push(issue("public/llms.txt", "llms", "missing"));
  if (!receipt.indexable && !/noindex/i.test(llms)) {
    problems.push(issue("public/llms.txt", "llms", "review directory must say the build is noindex"));
  }
  if (receipt.indexable && /review build marked noindex/i.test(llms)) {
    problems.push(issue("public/llms.txt", "llms", "indexable directory still describes a review build"));
  }
  if (!fs.existsSync(path.join(publicDir, "og.png"))) problems.push(issue("public/og.png", "asset", "missing"));

  for (const route of routes) {
    const relative = route.outputFile;
    const file = path.join(publicDir, relative);
    if (!fs.existsSync(file)) continue;
    const html = fs.readFileSync(file, "utf8");
    if (html.includes("<!--app-head-->") || html.includes("<!--app-html-->")) {
      problems.push(issue(relative, "placeholders", "build markers are still in the HTML"));
    }
    const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) =>
      (match[1] ?? "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim(),
    );
    if (h1s.length !== 1 || !h1s[0]) problems.push(issue(relative, "h1", `expected one heading, found ${h1s.length}`));
    const title = html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() ?? "";
    if (!title) problems.push(issue(relative, "title", "missing"));
    const description = metaByName(html, "description")?.trim() ?? "";
    if (!description) problems.push(issue(relative, "description", "missing"));
    const canonical = tagAttrs(html, "link")
      .filter((attrs) => attr(attrs, "rel")?.toLowerCase() === "canonical")
      .map((attrs) => attr(attrs, "href"))
      .find(Boolean);
    const expectedCanonical =
      route.kind === "not-found" ? `${receipt.canonicalOrigin}/` : `${receipt.canonicalOrigin}${route.path === "/" ? "/" : route.path}`;
    if (canonical !== expectedCanonical) {
      problems.push(issue(relative, "canonical", `expected ${expectedCanonical}, found ${canonical ?? "nothing"}`));
    }
    if (canonical?.includes("?") || canonical?.includes("#")) {
      problems.push(issue(relative, "canonical", "canonical includes a query or hash"));
    }
    const robotsMeta = metaByName(html, "robots") ?? "";
    const mustNoindex = !receipt.indexable || route.kind === "not-found";
    if (mustNoindex && !/noindex/i.test(robotsMeta)) problems.push(issue(relative, "noindex", robotsMeta || "missing"));
    if (!mustNoindex && /noindex/i.test(robotsMeta)) problems.push(issue(relative, "index", robotsMeta));
    const release = metaByName(html, "crosscomm-release");
    if (release !== receipt.release) {
      problems.push(
        issue(
          relative,
          "release",
          `meta is "${release ?? ""}" but version.json is "${receipt.release}". releaseToken() must return buildMeta.release.`,
        ),
      );
    }
    const linked = jsonLd(html);
    if (linked.errors.length) problems.push(issue(relative, "schema", linked.errors.join("; ")));
    const types = typesOf(linked.nodes);
    if (route.kind === "not-found") {
      if (types.includes("Service")) problems.push(issue(relative, "schema", "404 publishes a Service"));
    } else if (!types.includes("Organization")) {
      problems.push(issue(relative, "schema", "Organization is missing"));
    }
    if (route.kind === "service" && !types.includes("Service")) {
      problems.push(issue(relative, "schema", "Service is missing"));
    }
    const schemaText = JSON.stringify(linked.nodes);
    if (types.some((type) => /aggregaterating|review|offer/i.test(type)) || /aggregateRating|ratingValue|reviewCount/i.test(schemaText)) {
      problems.push(issue(relative, "schema", "rating, review count, or offer data is not allowed"));
    }
    if (visibleText(html).length < (route.kind === "not-found" ? 8 : 40)) {
      problems.push(issue(relative, "content", "visible text is too thin to be the page"));
    }
    for (const ref of localRefs(html)) {
      if (isSkippableRef(ref)) continue;
      const target = fileForSiteUrl(publicDir, ref);
      if (!target || !fs.existsSync(target)) problems.push(issue(relative, "link", `${ref} does not resolve to a built file`));
    }
  }

  return problems;
}

function isDirectRun(): boolean {
  const entry = process.argv[1];
  if (!entry) return false;
  return path.resolve(entry) === path.resolve(fileURLToPath(import.meta.url));
}

if (isDirectRun()) {
  const distDir = path.resolve(process.argv[2] ?? "dist");
  const problems = auditBuild(distDir);
  const reportDir = path.resolve("reports");
  fs.mkdirSync(reportDir, { recursive: true });
  const lines = problems.length
    ? problems.map((problem) => `${problem.file}: ${problem.check}: ${problem.detail}`)
    : ["Smoke checks passed for the prerendered files."];
  fs.writeFileSync(path.join(reportDir, "smoke.txt"), `${lines.join("\n")}\n`);
  if (problems.length) {
    console.error(lines.join("\n"));
    process.exit(1);
  }
  console.log(lines[0]);
}
