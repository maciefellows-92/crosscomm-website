import { describe, expect, it } from "vitest";
import { formatReport, issueDraft, pathnameOnly, validateReport, type ReportInput } from "../client/src/lib/feedback";
import { siteConfig } from "../client/src/site-config";

function input(overrides: Partial<ReportInput> = {}): ReportInput {
  return {
    type: "bug",
    description: "The phone number is easy to miss on the contact page.",
    expectedBehavior: "The phone number is next to the email address.",
    pathname: "/contact/",
    viewport: "1440x900",
    release: "local",
    ...overrides,
  };
}

describe("feedback bounds", () => {
  it("accepts a normal report and refuses query strings, hashes, and silent shortening", () => {
    expect(validateReport(input()).ok).toBe(true);
    expect(pathnameOnly("https://review.example/contact/?utm=secret#note")).toBe("/contact/");
    expect(pathnameOnly("/services/?q=1")).toBe("/services/");
    expect(pathnameOnly("/services/#part")).toBe("/services/");
    const queried = validateReport(input({ pathname: "/contact/?token=abc" }));
    expect(queried.ok).toBe(false);
    if (!queried.ok) expect(queried.errors.join(" ")).toMatch(/query string or hash/);
    const hashed = validateReport(input({ pathname: "/contact/#private" }));
    expect(hashed.ok).toBe(false);
  });

  it("counts Unicode code points and does not shorten an over-long description", () => {
    const emoji = "😀";
    expect(emoji).toHaveLength(2);
    expect(validateReport(input({ description: emoji.repeat(siteConfig.descriptionMax) })).ok).toBe(true);
    const over = validateReport(input({ description: emoji.repeat(siteConfig.descriptionMax + 1) }));
    expect(over.ok).toBe(false);
    if (!over.ok) {
      expect(over.errors.join(" ")).toContain(`${siteConfig.descriptionMax + 1}`);
      expect(over.errors.join(" ")).toMatch(/not shortened/i);
    }
    const expectedOver = validateReport(input({ expectedBehavior: "é".repeat(siteConfig.expectedMax + 1) }));
    expect(expectedOver.ok).toBe(false);
    if (!expectedOver.ok) expect(expectedOver.errors.join(" ")).toMatch(/not shortened/i);
    expect(validateReport(input({ expectedBehavior: "é".repeat(siteConfig.expectedMax) })).ok).toBe(true);
  });

  it("keeps a normal draft under the URL cap and marks a Unicode draft too long without cutting it", () => {
    const ordinary = issueDraft(input());
    expect(ordinary.tooLong).toBe(false);
    expect(ordinary.url.startsWith("https://github.com/mrhinkle/crosscomm-website/issues/new?")).toBe(true);
    expect(ordinary.url.length).toBeLessThanOrEqual(siteConfig.issueUrlMax);
    expect(decodeURIComponent(ordinary.url)).toContain("does not submit");
    expect(ordinary.body).toBe(formatReport(input()));
    expect(ordinary.body).not.toContain("?");

    const crowded = input({ description: "😀".repeat(600), expectedBehavior: "" });
    expect(validateReport(crowded).ok).toBe(true);
    const draft = issueDraft(crowded);
    expect(draft.tooLong).toBe(true);
    expect(draft.url.length).toBeGreaterThan(siteConfig.issueUrlMax);
    expect(draft.body).toBe(formatReport(crowded));
    expect(draft.body).toContain("😀".repeat(600));
    expect(draft.body.length).toBeGreaterThan(600);
  });

  it("records the path, viewport, and release, and names what it refuses to collect", () => {
    const body = formatReport(input());
    expect(body).toContain("- Page: /contact/");
    expect(body).toContain("- Viewport: 1440x900");
    expect(body).toContain("- Release: local");
    expect(body.toLowerCase()).toContain("cookies");
    expect(body.toLowerCase()).toContain("screenshots");
    expect(body).not.toContain("document.cookie");
    expect(validateReport(input({ viewport: "wide" })).ok).toBe(false);
    expect(validateReport(input({ release: "sha with spaces" })).ok).toBe(false);
    expect(validateReport(input({ type: "hotfix" })).ok).toBe(false);
    expect(validateReport(input({ description: "   " })).ok).toBe(false);
  });
});
