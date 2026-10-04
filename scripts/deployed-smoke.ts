/**
 * Manual check of an already deployed HTTPS origin.
 * GitHub runs this only from workflow_dispatch. It does not deploy anything.
 */
const allowedHost = (host: string): boolean =>
  host === "crosscomm.com" || host === "www.crosscomm.com" || host.endsWith(".vercel.app");

function originFromArg(): URL {
  const raw = process.argv[2] ?? process.env.DEPLOY_SMOKE_URL ?? "";
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error("Pass an https origin, for example https://crosscomm-website.vercel.app");
  }
  if (url.protocol !== "https:" || url.username || url.password || url.port) {
    throw new Error("The origin must be https, with no user, password, or port.");
  }
  if (!allowedHost(url.hostname)) {
    throw new Error("Host must be crosscomm.com, www.crosscomm.com, or a vercel.app hostname.");
  }
  url.pathname = "/";
  url.search = "";
  url.hash = "";
  return url;
}

async function main(): Promise<void> {
  const origin = originFromArg();
  const home = await fetch(origin, { redirect: "follow" });
  const homeText = await home.text();
  const homeFinal = new URL(home.url);
  if (!allowedHost(homeFinal.hostname)) throw new Error(`Homepage redirected off the allowed host to ${homeFinal.hostname}`);
  if (home.status !== 200) throw new Error(`Homepage status ${home.status}, expected 200`);

  const reviewHost = origin.hostname.endsWith(".vercel.app");
  const header = home.headers.get("x-robots-tag") ?? "";
  const metaNoindex = /name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(homeText);
  if (reviewHost && !/noindex/i.test(header) && !metaNoindex) {
    throw new Error("Review host did not send noindex in X-Robots-Tag or the robots meta.");
  }

  const robots = await fetch(new URL("/robots.txt", origin));
  const robotsText = await robots.text();
  if (reviewHost && /^Sitemap:/m.test(robotsText)) {
    throw new Error("Review robots.txt advertises a sitemap.");
  }
  if (/^Disallow:\s*\/\s*$/m.test(robotsText)) {
    throw new Error("robots.txt disallows the whole site, so crawlers may never see noindex.");
  }

  const missingUrl = new URL("/review-smoke-unknown-path/", origin);
  const missing = await fetch(missingUrl, { redirect: "follow" });
  const missingFinal = new URL(missing.url);
  if (missing.status !== 404) {
    throw new Error(`Unknown path returned ${missing.status}. A 200 means the SPA fallback is on.`);
  }
  if (missingFinal.pathname === "/") {
    throw new Error("Unknown path resolved to the homepage.");
  }
  console.log(`Deployed smoke ok for ${origin.origin}: home ${home.status}, unknown ${missing.status}.`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
