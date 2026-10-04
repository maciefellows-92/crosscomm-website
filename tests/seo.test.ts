import { describe, expect, it } from "vitest";
import { publicRoutes, routeById } from "../client/src/content/routes";
import { buildMeta } from "../client/src/generated/build-meta";
import { headFor, llmsTxt, releaseToken, renderHead, robotsTxt, sitemapXml } from "../client/src/lib/seo";
import { resolveDeploymentOrigin, resolveOrigins, siteConfig, type SiteOrigins } from "../client/src/site-config";

const review = resolveOrigins({});
const live: SiteOrigins = {
  indexable: true,
  deploymentOrigin: review.deploymentOrigin,
  publicOrigin: siteConfig.publicOrigin,
  canonicalOrigin: siteConfig.publicOrigin,
};

describe("index mode", () => {
  it("stays noindex on the review origin until an owner changes the tracked config", () => {
    expect(siteConfig.indexable).toBe(false);
    expect(review.indexable).toBe(false);
    expect(review.canonicalOrigin).toBe(review.deploymentOrigin);
    expect(review.deploymentOrigin).toBe("https://crosscomm-website.vercel.app");
    expect(review.publicOrigin).toBe("https://www.crosscomm.com");
    expect(buildMeta.origins.indexable).toBe(false);
    expect(releaseToken()).toBe(buildMeta.release);
    expect(releaseToken()).toMatch(/^[A-Za-z0-9._-]{1,64}$/);
  });

  it("uses a valid Vercel production host and rejects a host that is not a hostname", () => {
    expect(resolveDeploymentOrigin({ VERCEL_PROJECT_PRODUCTION_URL: "preview-alias.vercel.app" })).toBe(
      "https://preview-alias.vercel.app",
    );
    expect(resolveDeploymentOrigin({ VERCEL_PROJECT_PRODUCTION_URL: "https://preview-alias.vercel.app/extra" })).toBe(
      "https://preview-alias.vercel.app",
    );
    expect(resolveDeploymentOrigin({ VERCEL_PROJECT_PRODUCTION_URL: "not a host" })).toBe(siteConfig.configuredDeploymentOrigin);
    expect(resolveDeploymentOrigin({})).toBe(siteConfig.configuredDeploymentOrigin);
  });

  it("points canonicals, Open Graph, and the sitemap at the public origin only in indexable mode", () => {
    const home = routeById("home");
    const reviewHead = headFor(home, review);
    const liveHead = headFor(home, live);
    expect(reviewHead.canonical).toBe("https://crosscomm-website.vercel.app/");
    expect(reviewHead.robots).toBe("noindex, follow");
    expect(reviewHead.ogImage).toBe("https://crosscomm-website.vercel.app/og.png");
    expect(liveHead.canonical).toBe("https://www.crosscomm.com/");
    expect(liveHead.robots).toBe("index, follow");
    expect(liveHead.ogImage).toBe("https://www.crosscomm.com/og.png");
    expect(sitemapXml(review)).toContain("https://crosscomm-website.vercel.app/services/");
    expect(sitemapXml(review)).not.toContain("404");
    expect(sitemapXml(live)).toContain("https://www.crosscomm.com/contact/");
    expect(robotsTxt(review)).toContain("Allow: /");
    expect(robotsTxt(review)).not.toMatch(/^Sitemap:/m);
    expect(robotsTxt(review)).not.toMatch(/^Disallow:\s*\/\s*$/m);
    expect(robotsTxt(live)).toContain("Sitemap: https://www.crosscomm.com/sitemap.xml");
    expect(llmsTxt(review).toLowerCase()).toContain("noindex");
    expect(llmsTxt(live).toLowerCase()).not.toContain("review build marked noindex");
  });
});

describe("schema and escaping", () => {
  it("publishes only the organization facts the site is willing to say", () => {
    const home = headFor(routeById("home"), review);
    const text = JSON.stringify(home.jsonLd);
    expect(text).toContain('"@type":"Organization"');
    expect(text).toContain("CrossComm, Inc.");
    expect(text).toContain("hello@crosscomm.com");
    expect(text).toContain("+1-919-695-3241");
    expect(text).toContain('"foundingDate":"1998"');
    expect(text).toContain("Don Shin");
    expect(text).toContain("Durham");
    expect(text).toContain("Cleveland");
    expect(text).not.toMatch(/aggregateRating|ratingValue|reviewCount|streetAddress|"price"/);
    expect(home.jsonLd.some((node) => JSON.stringify(node).includes('"@type":"Service"'))).toBe(false);
  });

  it("adds Service and breadcrumb data on a service page, and keeps the 404 out of the index", () => {
    const service = headFor(routeById("service:healthcare-app-development"), review);
    const serviceText = JSON.stringify(service.jsonLd);
    expect(serviceText).toContain('"@type":"Service"');
    expect(serviceText).toContain("Healthcare app development");
    expect(serviceText).toContain('"@type":"BreadcrumbList"');
    expect(serviceText).not.toMatch(/aggregateRating|offers|price/);
    const missing = headFor(routeById("not-found"), live);
    expect(missing.robots).toBe("noindex, follow");
    expect(missing.canonical).toBe("https://www.crosscomm.com/");
    expect(missing.jsonLd).toEqual([]);
    const urls = [...sitemapXml(live).matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
    expect(urls).toHaveLength(publicRoutes.length);
    expect(urls.some((url) => url?.includes("404"))).toBe(false);
  });

  it("escapes hostile titles and descriptions before they reach the document", () => {
    const home = routeById("home");
    const html = renderHead(
      {
        ...home,
        title: `A & B <script> "quoted"`,
        description: `</meta><script>alert(1)</script>`,
        crumbs: [{ name: "<script>", path: "/services/" }],
      },
      review,
    );
    expect(html).not.toContain("<script>alert");
    expect(html).toContain("&amp;");
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("&quot;quoted&quot;");
    expect(html).toContain("\\u003c");
    expect(html).toContain('content="noindex, follow"');
  });
});
