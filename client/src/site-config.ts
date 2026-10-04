/**
 * Review defaults. indexable stays false.
 * Going live is a coordinated cutover, not this one flag:
 * 1. Owner sets indexable true only after the public host is approved.
 * 2. Canonical origin must be that host (publicOrigin), not the review deployment.
 * 3. Robots meta, sitemap, and llms.txt follow origins.indexable.
 * 4. The hosting X-Robots-Tag header must change in the same cutover. A true flag with a noindex header still hides the site.
 * 5. Confirm the contact form and careers URLs still resolve after DNS. They must not point at these pages and leave no real form.
 * Do not read .env files.
 */
export const siteConfig = {
  name: "CrossComm",
  legalName: "CrossComm, Inc.",
  indexable: false,
  publicOrigin: "https://www.crosscomm.com",
  configuredDeploymentOrigin: "https://crosscomm-website.vercel.app",
  githubRepo: "mrhinkle/crosscomm-website",
  issueUrlMax: 7000,
  descriptionMax: 1200,
  expectedMax: 400,
  contentUpdated: "2026-10-04",
  email: "hello@crosscomm.com",
  careersEmail: "careers@crosscomm.com",
  phoneDisplay: "+1 919 695 3241",
  phoneTel: "+19196953241",
  founder: "Don Shin",
  founded: "1998",
  tagline: "Independent thinking. Lasting impact.",
  existingContactForm: "https://www.crosscomm.com/contact/",
  existingCareers: "https://www.crosscomm.com/careers/",
  offices: [
    { city: "Durham", region: "North Carolina", regionCode: "NC" },
    { city: "Cleveland", region: "Ohio", regionCode: "OH" },
  ],
} as const;

export type SiteOrigins = {
  indexable: boolean;
  deploymentOrigin: string;
  publicOrigin: string;
  canonicalOrigin: string;
};

function readEnv(env?: Record<string, string | undefined>): Record<string, string | undefined> {
  if (env) return env;
  const proc = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process;
  return proc?.env ?? {};
}

export function resolveDeploymentOrigin(env?: Record<string, string | undefined>): string {
  const raw = readEnv(env).VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (!raw) return siteConfig.configuredDeploymentOrigin;
  const host = raw.replace(/^https?:\/\//, "").replace(/\/.*$/, "").trim();
  if (!/^[a-z0-9.-]+(?::\d+)?$/i.test(host)) return siteConfig.configuredDeploymentOrigin;
  return `https://${host}`;
}

export function resolveOrigins(env?: Record<string, string | undefined>): SiteOrigins {
  const deploymentOrigin = resolveDeploymentOrigin(env);
  const canonicalOrigin = siteConfig.indexable ? siteConfig.publicOrigin : deploymentOrigin;
  return {
    indexable: siteConfig.indexable,
    deploymentOrigin,
    publicOrigin: siteConfig.publicOrigin,
    canonicalOrigin,
  };
}

export function canonicalPath(path: string): string {
  if (path === "/" || path === "") return "/";
  const bare = path.endsWith("/") ? path : `${path}/`;
  return bare.startsWith("/") ? bare : `/${bare}`;
}

export function absoluteUrl(origin: string, path: string): string {
  const base = origin.replace(/\/$/, "");
  return `${base}${canonicalPath(path) === "/" ? "/" : canonicalPath(path)}`;
}
