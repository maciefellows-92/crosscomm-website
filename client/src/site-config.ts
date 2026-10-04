/**
 * Review defaults. Cutover is an owner pull request: set indexable to true
 * and point publicOrigin at the approved host. Do not read .env files.
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

export function resolveDeploymentOrigin(env: Record<string, string | undefined> = process.env): string {
  const raw = env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (!raw) return siteConfig.configuredDeploymentOrigin;
  const host = raw.replace(/^https?:\/\//, "").replace(/\/.*$/, "").trim();
  if (!/^[a-z0-9.-]+(?::\d+)?$/i.test(host)) return siteConfig.configuredDeploymentOrigin;
  return `https://${host}`;
}

export function resolveOrigins(env: Record<string, string | undefined> = process.env): SiteOrigins {
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
