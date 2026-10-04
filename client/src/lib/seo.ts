import { services, serviceBySlug } from "../content/services";
import { projectBySlug } from "../content/projects";
import { insights } from "../content/insights";
import { publicRoutes, type RouteDef } from "../content/routes";
import { buildMeta } from "../generated/build-meta";
import { absoluteUrl, siteConfig, type SiteOrigins } from "../site-config";

export type HeadModel = {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  ogImage: string;
  jsonLd: unknown[];
};

function organizationId(origins: SiteOrigins): string {
  return `${absoluteUrl(origins.canonicalOrigin, "/")}#organization`;
}

function organization(origins: SiteOrigins) {
  return {
    "@type": "Organization",
    "@id": organizationId(origins),
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: absoluteUrl(origins.canonicalOrigin, "/"),
    email: siteConfig.email,
    telephone: "+1-919-695-3241",
    foundingDate: siteConfig.founded,
    founder: { "@type": "Person", name: siteConfig.founder },
    location: siteConfig.offices.map((office) => ({
      "@type": "Place",
      name: `${office.city} office`,
      address: {
        "@type": "PostalAddress",
        addressLocality: office.city,
        addressRegion: office.regionCode,
        addressCountry: "US",
      },
    })),
  };
}

function breadcrumb(route: RouteDef, origins: SiteOrigins) {
  const items = [{ name: "Home", path: "/" }, ...route.crumbs];
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(origins.canonicalOrigin, item.path),
    })),
  };
}

export function headFor(route: RouteDef, origins: SiteOrigins): HeadModel {
  const canonical = route.kind === "not-found" ? absoluteUrl(origins.canonicalOrigin, "/") : absoluteUrl(origins.canonicalOrigin, route.path);
  const robots = route.kind === "not-found" || !origins.indexable ? "noindex, follow" : "index, follow";
  const graph: unknown[] = [];
  if (route.kind !== "not-found") {
    graph.push(organization(origins));
    if (route.crumbs.length) graph.push(breadcrumb(route, origins));
  }
  if (route.serviceSlug) {
    const service = serviceBySlug(route.serviceSlug);
    if (service) {
      graph.push({
        "@type": "Service",
        name: service.name,
        description: service.description,
        url: absoluteUrl(origins.canonicalOrigin, route.path),
        provider: { "@id": organizationId(origins) },
        areaServed: "United States",
      });
    }
  }
  return {
    title: route.title,
    description: route.description,
    canonical,
    robots,
    ogImage: `${origins.canonicalOrigin.replace(/\/$/, "")}/og.png`,
    jsonLd: graph.map((node) => ({ "@context": "https://schema.org", ...(node as object) })),
  };
}

function escapeAttr(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export function renderHead(route: RouteDef, origins: SiteOrigins): string {
  const head = headFor(route, origins);
  const json = head.jsonLd
    .map(
      (entry) =>
        `<script type="application/ld+json" data-crosscomm-ld="true">${JSON.stringify(entry).replaceAll("<", "\\u003c")}</script>`,
    )
    .join("");
  return [
    `<title>${escapeAttr(head.title)}</title>`,
    `<meta name="description" content="${escapeAttr(head.description)}" />`,
    `<link rel="canonical" href="${escapeAttr(head.canonical)}" />`,
    `<meta name="robots" content="${head.robots}" />`,
    `<meta name="crosscomm-release" content="${escapeAttr(releaseToken())}" />`,
    `<meta property="og:title" content="${escapeAttr(head.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(head.description)}" />`,
    `<meta property="og:url" content="${escapeAttr(head.canonical)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:image" content="${escapeAttr(head.ogImage)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="CrossComm wordmark on a dark field, with AI strategy, custom apps, and human-centered product development, plus Durham and Cleveland." />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(head.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(head.description)}" />`,
    `<meta name="twitter:image" content="${escapeAttr(head.ogImage)}" />`,
    json,
  ].join("\n");
}

export function releaseToken(): string {
  return buildMeta.release;
}

export function robotsTxt(origins: SiteOrigins): string {
  const lines = [
    "User-agent: *",
    "Allow: /",
    "",
    "# Crawl is allowed so a noindex tag can be seen.",
    "# A disallow rule is not how this site stays out of the index.",
  ];
  if (origins.indexable) {
    lines.push("", `Sitemap: ${origins.canonicalOrigin.replace(/\/$/, "")}/sitemap.xml`);
  } else {
    lines.push("", "# Sitemap intentionally not advertised on the review deployment.");
  }
  return `${lines.join("\n")}\n`;
}

function xml(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

export function sitemapXml(origins: SiteOrigins): string {
  const urls = publicRoutes
    .filter((route) => route.inSitemap)
    .map((route) => {
      const loc = absoluteUrl(origins.canonicalOrigin, route.path);
      return `  <url><loc>${xml(loc)}</loc><lastmod>${siteConfig.contentUpdated}</lastmod></url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function llmsTxt(origins: SiteOrigins): string {
  const origin = origins.canonicalOrigin.replace(/\/$/, "");
  const lines = [
    `# ${siteConfig.name}`,
    "",
    "> AI strategy, custom apps, and human-centered product development. A directory of pages on this website.",
    "",
    origins.indexable ? "This deployment is indexable." : "This deployment is a review build and is marked noindex.",
    "",
    "## Pages",
    ...publicRoutes.map((route) => `- [${route.title}](${absoluteUrl(origin, route.path)}): ${route.description}`),
    "",
    "## Services",
    ...services.map((service) => `- ${service.name}: ${service.description}`),
    "",
    "## Selected original articles",
    ...insights.map((insight) => `- [${insight.title}](${insight.href}) (${insight.dateLabel})`),
    "",
    "## Contact",
    `- Email: ${siteConfig.email}`,
    `- Phone: ${siteConfig.phoneDisplay}`,
    "",
  ];
  return lines.join("\n");
}

export function projectJsonAvailable(slug: string): boolean {
  return Boolean(projectBySlug(slug));
}
