import { chromium } from "@playwright/test";
import { pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const card = path.join(root, "scripts/og-card.html");
const out = path.join(root, "client/public/og.png");

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});
await page.goto(pathToFileURL(card).href);
await page.screenshot({ path: out, type: "png", clip: { x: 0, y: 0, width: 1200, height: 630 } });
await browser.close();
