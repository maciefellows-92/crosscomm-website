import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createPreviewServer, listenPreview, previewPort } from "./preview-server.ts";

type LighthouseCategory = { score?: number | null; title?: string };
type LighthouseReport = {
  requestedUrl?: string;
  lighthouseVersion?: string;
  categories?: Record<string, LighthouseCategory>;
};

function run(command: string, args: string[]): Promise<number> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit" });
    child.on("error", reject);
    child.on("exit", (code) => resolve(code ?? 1));
  });
}

function summary(report: LighthouseReport): string {
  const lines = [
    "# Lighthouse lab summary",
    "",
    "This is one lab run against the local preview server. That server negotiates gzip or Brotli for HTML, CSS, and JavaScript. Local compression is implemented here and is not the same as a Vercel CDN measurement. The result is a local lab number, not field data, not a statement about crosscomm.com, and not a pass/fail gate.",
    "",
    "| Category | Score |",
    "| --- | --- |",
  ];
  const categories = report.categories ?? {};
  const names = Object.keys(categories);
  if (!names.length) {
    lines.push("| (none) | Lighthouse did not return category scores |");
  }
  for (const name of names) {
    const score = categories[name]?.score;
    const shown = typeof score === "number" ? String(Math.round(score * 100)) : "not reported";
    lines.push(`| ${categories[name]?.title ?? name} | ${shown} |`);
  }
  lines.push(
    "",
    `URL: ${report.requestedUrl ?? `http://127.0.0.1:${previewPort()}/`}`,
    `Lighthouse: ${report.lighthouseVersion ?? "unknown"}`,
    "",
  );
  return lines.join("\n");
}

async function main(): Promise<void> {
  const publicDir = path.resolve("dist/public");
  if (!fs.existsSync(path.join(publicDir, "index.html"))) {
    console.error("dist/public/index.html is missing. Run pnpm build first. No score was invented.");
    process.exit(1);
  }
  const outDir = path.resolve("reports/lighthouse");
  fs.mkdirSync(outDir, { recursive: true });
  const jsonPath = path.join(outDir, "home.json");
  const port = previewPort();
  const server = createPreviewServer(publicDir);
  await listenPreview(server, port);
  try {
    const cli = path.resolve("node_modules/lighthouse/cli/index.js");
    const code = await run(process.execPath, [
      cli,
      `http://127.0.0.1:${port}/`,
      "--only-categories=performance,accessibility,best-practices,seo",
      "--output=json",
      `--output-path=${jsonPath}`,
      "--chrome-flags=--headless=new --no-sandbox",
      "--quiet",
    ]);
    if (code !== 0 || !fs.existsSync(jsonPath)) {
      console.error("Lighthouse did not finish. No score was invented.");
      process.exit(code || 1);
    }
    const report = JSON.parse(fs.readFileSync(jsonPath, "utf8")) as LighthouseReport;
    const summaryPath = path.join(outDir, "summary.md");
    fs.writeFileSync(summaryPath, summary(report));
    console.log(`Wrote ${path.relative(process.cwd(), jsonPath)} and ${path.relative(process.cwd(), summaryPath)}.`);
  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
}

function isDirectRun(): boolean {
  const entry = process.argv[1];
  if (!entry) return false;
  return path.resolve(entry) === path.resolve(fileURLToPath(import.meta.url));
}

if (isDirectRun()) {
  main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : String(error));
    console.error("No Lighthouse score was invented.");
    process.exit(1);
  });
}

export { summary };
