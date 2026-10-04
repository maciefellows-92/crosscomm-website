import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { auditBuild } from "../scripts/smoke";

function page(title: string, canonical: string, body: string, schema: string): string {
  return `<!doctype html><html><head><title>${title}</title>
<meta name="description" content="A complete description for the smoke check of this page." />
<link rel="canonical" href="${canonical}" />
<meta name="robots" content="noindex, follow" />
<meta name="crosscomm-release" content="local" />
${schema}
</head><body><main>${body}</main></body></html>`;
}

function writeFixture(root: string, html: { home: string; service: string; missing: string }): void {
  const publicDir = path.join(root, "public");
  fs.mkdirSync(path.join(publicDir, "services/app-development"), { recursive: true });
  fs.writeFileSync(path.join(publicDir, "index.html"), html.home);
  fs.writeFileSync(path.join(publicDir, "services/app-development/index.html"), html.service);
  fs.writeFileSync(path.join(publicDir, "404.html"), html.missing);
  fs.writeFileSync(path.join(publicDir, "og.png"), "png");
  fs.writeFileSync(
    path.join(publicDir, "version.json"),
    JSON.stringify({
      release: "local",
      builtAt: "2026-10-04T00:00:00.000Z",
      indexable: false,
      canonicalOrigin: "https://crosscomm-website.vercel.app",
    }),
  );
  fs.writeFileSync(
    path.join(publicDir, "robots.txt"),
    "User-agent: *\nAllow: /\n\n# Sitemap intentionally not advertised on the review deployment.\n",
  );
  fs.writeFileSync(
    path.join(publicDir, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>https://crosscomm-website.vercel.app/</loc></url>\n  <url><loc>https://crosscomm-website.vercel.app/services/app-development/</loc></url>\n</urlset>\n`,
  );
  fs.writeFileSync(path.join(publicDir, "llms.txt"), "This deployment is a review build marked noindex.\n");
  fs.writeFileSync(
    path.join(root, "route-manifest.json"),
    JSON.stringify([
      { path: "/", outputFile: "index.html", kind: "home", inSitemap: true },
      { path: "/services/app-development/", outputFile: "services/app-development/index.html", kind: "service", inSitemap: true },
      { path: "/404.html", outputFile: "404.html", kind: "not-found", inSitemap: false },
    ]),
  );
}

describe("prerender smoke", () => {
  it("accepts a complete route set and rejects a thin or mis-released page", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "crosscomm-smoke-"));
    const origin = "https://crosscomm-website.vercel.app";
    writeFixture(root, {
      home: page(
        "Home",
        `${origin}/`,
        `<h1>Make the next thing</h1><p>${"CrossComm builds custom software for ambitious teams. ".repeat(3)}</p><a href="/services/app-development/">App development</a><img src="/og.png" alt="CrossComm" />`,
        `<script type="application/ld+json">{"@context":"https://schema.org","@type":"Organization","name":"CrossComm"}</script>`,
      ),
      service: page(
        "App development",
        `${origin}/services/app-development/`,
        `<h1>App development</h1><p>${"Custom web and mobile products, from discovery through support. ".repeat(2)}</p><a href="/">Home</a>`,
        `<script type="application/ld+json">{"@context":"https://schema.org","@type":"Organization","name":"CrossComm"}</script><script type="application/ld+json">{"@context":"https://schema.org","@type":"Service","name":"App development"}</script>`,
      ),
      missing: page("Missing", `${origin}/`, "<h1>Page not found</h1><p>That page is not on this site.</p>", ""),
    });
    expect(auditBuild(root)).toEqual([]);

    const broken = path.join(root, "public/index.html");
    fs.writeFileSync(broken, fs.readFileSync(broken, "utf8").replace("<h1>Make the next thing</h1>", "").replace('content="local"', 'content="other"'));
    const problems = auditBuild(root);
    expect(problems.some((problem) => problem.check === "h1")).toBe(true);
    expect(problems.some((problem) => problem.check === "release")).toBe(true);
    fs.rmSync(root, { recursive: true, force: true });
  });
});
