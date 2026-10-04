import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { injectHtml, gitHead, missingUi, renderBuildMetaSource, resolveRelease, HEAD_MARKER, HTML_MARKER } from "../scripts/build";
import { ensureBuildMeta } from "../scripts/ensure-build-meta";
import { siteConfig } from "../client/src/site-config";
import { summary } from "../scripts/lighthouse";
import { hostedIndexProblems, robotsHeaderProblem } from "../scripts/robots-posture";

describe("release receipt", () => {
  it("prefers the Vercel SHA, then GitHub, then git, and otherwise local", () => {
    const vercel = "a".repeat(40);
    const github = "b".repeat(40);
    const git = "c".repeat(40);
    expect(resolveRelease({ VERCEL_GIT_COMMIT_SHA: vercel, GITHUB_SHA: github }, git)).toBe(vercel);
    expect(resolveRelease({ GITHUB_SHA: github.toUpperCase() }, git)).toBe(github);
    expect(resolveRelease({ GITHUB_SHA: "short" }, git)).toBe(git);
    expect(resolveRelease({}, undefined)).toBe("local");
    expect(resolveRelease({ VERCEL_GIT_COMMIT_SHA: " not-a-sha " }, "also-short")).toBe("local");
    const fromGit = gitHead();
    const expected = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim().toLowerCase();
    expect(fromGit).toBe(expected);
    expect(resolveRelease({}, fromGit)).toBe(expected);
  });

  it("writes a module whose release and origins round-trip", () => {
    const source = renderBuildMetaSource({
      release: "abc".padEnd(40, "d"),
      builtAt: "2026-10-04T12:00:00.000Z",
      origins: {
        indexable: false,
        deploymentOrigin: "https://crosscomm-website.vercel.app",
        publicOrigin: "https://www.crosscomm.com",
        canonicalOrigin: "https://crosscomm-website.vercel.app",
      },
    });
    expect(source).toContain('import type { SiteOrigins } from "../site-config";');
    expect(source).toContain("export const buildId = buildMeta.release;");
    const start = source.indexOf("= {") + 2;
    const end = source.indexOf(";\n\nexport const buildId");
    const parsed = JSON.parse(source.slice(start, end)) as { release: string; origins: { indexable: boolean } };
    expect(parsed.release).toHaveLength(40);
    expect(parsed.origins.indexable).toBe(false);
  });
});

describe("html injection", () => {
  it("replaces each marker once and does not escape the fragments again", () => {
    const template = `<head>${HEAD_MARKER}</head><div id="root">${HTML_MARKER}</div>`;
    const head = `<title>A &amp; B</title>`;
    const html = `<h1>Ready</h1>`;
    const page = injectHtml(template, head, html);
    expect(page).toContain(head);
    expect(page).toContain(html);
    expect(page).not.toContain(HEAD_MARKER);
    expect(page).not.toContain("&amp;amp;");
  });

  it("refuses a template that lost its markers", () => {
    expect(() => injectHtml("<div id=\"root\"></div>", "<title>T</title>", "<p>Hi</p>")).toThrow(/markers/i);
  });
});

describe("interface preflight", () => {
  it("names the files the build cannot invent", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "crosscomm-ui-"));
    const gaps = missingUi(root).map((gap) => gap.file);
    expect(gaps).toEqual([
      "client/index.html",
      "client/src/main.tsx",
      "client/src/App.tsx",
      "client/src/entry-server.tsx",
    ]);
    fs.mkdirSync(path.join(root, "client/src"), { recursive: true });
    fs.writeFileSync(path.join(root, "client/index.html"), "<html></html>");
    fs.writeFileSync(path.join(root, "client/src/main.tsx"), "export {};\n");
    fs.writeFileSync(path.join(root, "client/src/App.tsx"), "export {};\n");
    fs.writeFileSync(path.join(root, "client/src/entry-server.tsx"), "export {};\n");
    expect(missingUi(root).map((gap) => gap.file)).toEqual(["client/index.html"]);
  });
});

describe("generated build meta", () => {
  it("writes a local fallback only when the module is missing", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "crosscomm-meta-"));
    expect(ensureBuildMeta(root)).toBe("written");
    const file = path.join(root, "client/src/generated/build-meta.ts");
    expect(fs.readFileSync(file, "utf8")).toContain('"release": "local"');
    expect(ensureBuildMeta(root)).toBe("present");
    fs.rmSync(root, { recursive: true, force: true });
  });
});

describe("static hosting", () => {
  it("asks Vercel for a real 404 and does not install a single-page catch-all", () => {
    const vercel = JSON.parse(fs.readFileSync("vercel.json", "utf8")) as {
      trailingSlash?: boolean;
      outputDirectory?: string;
      rewrites?: unknown;
      routes?: unknown;
      headers?: { headers: { key: string; value: string }[] }[];
    };
    expect(vercel.trailingSlash).toBe(true);
    expect(vercel.outputDirectory).toBe("dist/public");
    expect(vercel.rewrites).toBeUndefined();
    expect(vercel.routes).toBeUndefined();
    const headers = (vercel.headers ?? []).flatMap((block) => block.headers);
    const robots = headers.find((header) => header.key === "X-Robots-Tag")?.value;
    expect(robotsHeaderProblem(siteConfig.indexable, robots)).toBeNull();
    expect(siteConfig.indexable).toBe(false);
    expect(robots).toBe("noindex, follow");
    expect(headers.some((header) => header.key.toLowerCase() === "content-security-policy")).toBe(false);
  });
});

describe("robots header posture", () => {
  const html = '<meta name="robots" content="noindex, follow" />';
  const live = '<meta name="robots" content="index, follow" />';

  it("rejects indexable true while the header still says noindex", () => {
    expect(robotsHeaderProblem(true, "noindex, follow")).toMatch(/still sends noindex/);
    expect(hostedIndexProblems(true, "noindex, follow", live)).toEqual([
      "Live build still sends noindex on X-Robots-Tag.",
    ]);
    expect(hostedIndexProblems(true, "index, follow", html)).toEqual([
      "Live build still sends noindex on the robots meta tag.",
    ]);
  });

  it("rejects indexable false when either signal drops noindex", () => {
    expect(robotsHeaderProblem(false, "index, follow")).toMatch(/does not send noindex/);
    expect(hostedIndexProblems(false, "", live).length).toBe(2);
    expect(hostedIndexProblems(false, "noindex, follow", html)).toEqual([]);
    expect(hostedIndexProblems(true, "index, follow", live)).toEqual([]);
  });
});

describe("lighthouse summary", () => {
  it("reports measured scores and does not fill in a missing one", () => {
    const text = summary({
      requestedUrl: "http://127.0.0.1:4173/",
      lighthouseVersion: "13.5.0",
      categories: {
        performance: { title: "Performance", score: 0.42 },
        seo: { title: "SEO", score: null },
      },
    });
    expect(text).toContain("not a pass/fail gate");
    expect(text).toContain("| Performance | 42 |");
    expect(text).toContain("| SEO | not reported |");
    expect(summary({}).toLowerCase()).not.toContain("| performance | 100 |");
  });
});
