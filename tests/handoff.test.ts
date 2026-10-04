import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { legacyUrls } from "../client/src/content/legacy-inventory";

const requiredDocs = [
  "README.md",
  "docs/PLAN.md",
  "docs/DESIGN.md",
  "docs/MACIE-HANDOFF.md",
  "docs/CONTENT-GUIDE.md",
  "docs/DEPLOYMENT.md",
  "docs/FEEDBACK.md",
  "docs/SEO-AEO-STRATEGY.md",
  "docs/SOURCES.md",
  "docs/MIGRATION.md",
  "docs/BACKLOG.md",
  "docs/backlog.json",
];

describe("handoff files", () => {
  it("includes the reading set", () => {
    for (const file of requiredDocs) expect(fs.existsSync(file), file).toBe(true);
  });

  it("keeps the backlog as issue objects with both priorities", () => {
    const items = JSON.parse(fs.readFileSync("docs/backlog.json", "utf8")) as unknown[];
    expect(Array.isArray(items)).toBe(true);
    expect(items.length).toBeGreaterThanOrEqual(11);
    const prose = fs.readFileSync("docs/BACKLOG.md", "utf8");
    const titles = new Set<string>();
    for (const item of items) {
      const record = item as { title?: unknown; body?: unknown; labels?: unknown };
      expect(typeof record.title).toBe("string");
      expect(typeof record.body).toBe("string");
      const title = record.title as string;
      const body = record.body as string;
      expect(titles.has(title)).toBe(false);
      titles.add(title);
      expect(prose).toContain(title);
      expect(body).toMatch(/Acceptance:/);
      expect(body).toMatch(/User impact:/);
      expect(body).toMatch(/Effort:/);
      expect(body).toMatch(/Owner:/);
      const labels = record.labels as string[];
      expect(labels.length).toBeGreaterThan(0);
      if (labels.includes("P1")) expect(labels).toContain("cutover");
      if (labels.includes("P2")) expect(labels).toContain("growth");
      expect(labels.includes("P1") || labels.includes("P2")).toBe(true);
    }
    const blob = [...titles, ...items.map((item) => (item as { body: string }).body)].join("\n").toLowerCase();
    for (const needle of ["legacy", "legal", "crm", "macie", "asset", "search console", "byline", "outcome", "semrush", "cms", "server"]) {
      expect(blob).toContain(needle);
    }
  });

  it("lists all 138 legacy URLs and does not prescribe a homepage redirect", () => {
    const doc = fs.readFileSync("docs/MIGRATION.md", "utf8");
    expect(doc).toContain("138");
    expect(doc).toContain("123");
    expect(doc).toMatch(/do not|does not|not a redirect/i);
    for (const row of legacyUrls) {
      expect(doc).toContain(`\`${row.path}\``);
      expect(doc).toContain(row.url);
    }
    const strategy = fs.readFileSync("docs/SEO-AEO-STRATEGY.md", "utf8");
    expect(strategy).toMatch(/ERROR 120/);
    expect(strategy).toMatch(/WouldBlock/);
    expect(strategy).toMatch(/no search volume/i);
  });
});
