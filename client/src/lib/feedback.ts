import { siteConfig } from "../site-config";

export const reportTypes = ["bug", "content-correction", "suggestion"] as const;
export type ReportType = (typeof reportTypes)[number];

export type ReportInput = {
  type: string;
  description: string;
  expectedBehavior: string;
  pathname: string;
  viewport: string;
  release: string;
};

export type ReportDraft = {
  title: string;
  body: string;
  url: string;
  tooLong: boolean;
};

const typeLabels: Record<ReportType, string> = {
  bug: "Bug",
  "content-correction": "Content correction",
  suggestion: "Suggestion",
};

export function pathnameOnly(value: string): string {
  const raw = value.trim();
  if (!raw) return "/";
  try {
    if (raw.startsWith("http://") || raw.startsWith("https://")) {
      return new URL(raw).pathname || "/";
    }
  } catch {
    return "/";
  }
  const cut = raw.split("#")[0]?.split("?")[0] ?? "/";
  if (!cut.startsWith("/")) return "/";
  return cut || "/";
}

export function validateReport(input: ReportInput): { ok: true; value: ReportInput } | { ok: false; errors: string[] } {
  const errors: string[] = [];
  if (!reportTypes.includes(input.type as ReportType)) {
    errors.push("Choose bug, content correction, or suggestion.");
  }
  const description = input.description;
  if (description.trim().length === 0) errors.push("Description is required.");
  if ([...description].length > siteConfig.descriptionMax) {
    errors.push(
      `Description is ${[...description].length} characters. The maximum is ${siteConfig.descriptionMax}. It was not shortened.`,
    );
  }
  const expected = input.expectedBehavior;
  if ([...expected].length > siteConfig.expectedMax) {
    errors.push(
      `Expected behavior is ${[...expected].length} characters. The maximum is ${siteConfig.expectedMax}. It was not shortened.`,
    );
  }
  const pathname = pathnameOnly(input.pathname);
  if (pathname !== input.pathname || pathname.includes("?") || pathname.includes("#")) {
    errors.push("Page path must be a path only, with no query string or hash.");
  }
  if (!/^\d{2,5}x\d{2,5}$/.test(input.viewport)) {
    errors.push("Viewport is not ready yet.");
  }
  if (!/^[A-Za-z0-9._-]{1,64}$/.test(input.release)) {
    errors.push("Release id is missing or not usable.");
  }
  if (errors.length) return { ok: false, errors };
  return {
    ok: true,
    value: {
      type: input.type,
      description,
      expectedBehavior: expected,
      pathname,
      viewport: input.viewport,
      release: input.release,
    },
  };
}

export function formatReport(input: ReportInput): string {
  const label = typeLabels[input.type as ReportType] ?? input.type;
  const expected = input.expectedBehavior.trim() ? input.expectedBehavior : "Not provided.";
  return [
    `## ${label}`,
    "",
    "### Description",
    input.description,
    "",
    "### Expected behavior",
    expected,
    "",
    "### Diagnostics",
    `- Page: ${input.pathname}`,
    `- Viewport: ${input.viewport}`,
    `- Release: ${input.release}`,
    "",
    "### Privacy",
    "Included: report type, description, optional expected behavior, page path, viewport, and release id.",
    "Not included: query strings, URL hashes, form fields, cookies, logs, screenshots, or account data.",
    "",
    "### Filing",
    "This file is the whole report. It was not shortened to fit a link.",
    "Opening a GitHub draft does not submit an issue. The person filing it still has to submit.",
    "Suggested labels: website-report, and bug, content-correction, or suggestion to match the type.",
    "",
  ].join("\n");
}

export function issueDraft(input: ReportInput, repo = siteConfig.githubRepo): ReportDraft {
  const title = `[${input.type}] ${input.pathname}`;
  const body = formatReport(input);
  const url = `https://github.com/${repo}/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
  return { title, body, url, tooLong: url.length > siteConfig.issueUrlMax };
}
