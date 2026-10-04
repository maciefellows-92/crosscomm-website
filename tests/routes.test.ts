import { describe, expect, it } from "vitest";
import { insights } from "../client/src/content/insights";
import { legacyUrls } from "../client/src/content/legacy-inventory";
import { emptyFilterMessage, filterProjects, projects } from "../client/src/content/projects";
import { notFoundRoute, prerenderRoutes, publicRoutes, routeById, routeByPath } from "../client/src/content/routes";
import { services } from "../client/src/content/services";

function bare(pathname: string): string {
  if (pathname === "/" || pathname === "") return "/";
  return pathname.replace(/\/+$/, "");
}

describe("routes", () => {
  it("publishes 15 unique trailing-slash paths and a separate 404", () => {
    expect(publicRoutes).toHaveLength(15);
    expect(new Set(publicRoutes.map((route) => route.id)).size).toBe(15);
    expect(new Set(publicRoutes.map((route) => route.path)).size).toBe(15);
    expect(new Set(publicRoutes.map((route) => route.outputFile)).size).toBe(15);
    for (const route of publicRoutes) {
      expect(route.path === "/" || route.path.endsWith("/")).toBe(true);
      expect(route.inSitemap).toBe(true);
      expect(route.title.trim().length).toBeGreaterThan(0);
      expect(route.description.trim().length).toBeGreaterThan(0);
      expect(route.outputFile).toBe(route.path === "/" ? "index.html" : `${route.path.slice(1)}index.html`);
    }
    expect(prerenderRoutes).toHaveLength(16);
    expect(notFoundRoute.inSitemap).toBe(false);
    expect(notFoundRoute.outputFile).toBe("404.html");
    expect(notFoundRoute.path).not.toBe("/");
    expect(publicRoutes.some((route) => route.outputFile === "404.html")).toBe(false);
  });

  it("resolves a path with or without a trailing slash and ignores unknown ids", () => {
    expect(routeByPath("/contact")).toMatchObject({ id: "contact" });
    expect(routeByPath("/contact/")).toMatchObject({ id: "contact" });
    expect(routeByPath("/")).toMatchObject({ id: "home" });
    expect(routeByPath("/not-a-page")).toBeUndefined();
    expect(routeByPath("/contact/?secret=1")).toBeUndefined();
    expect(() => routeById("missing")).toThrow(/Unknown route/);
  });

  it("preserves the 15 selected legacy paths and does not treat the other 123 as redirects", () => {
    expect(legacyUrls).toHaveLength(138);
    const preserved = legacyUrls.filter((entry) => entry.disposition === "preserved").map((entry) => bare(entry.path));
    const deferred = legacyUrls.filter((entry) => entry.disposition === "deferred").map((entry) => bare(entry.path));
    expect(preserved).toHaveLength(15);
    expect(deferred).toHaveLength(123);
    expect(new Set(preserved)).toEqual(new Set(publicRoutes.map((route) => bare(route.path))));
    for (const path of deferred) expect(preserved).not.toContain(path);
    expect(new Set(legacyUrls.map((entry) => entry.url)).size).toBe(138);
  });
});

describe("source-backed catalog", () => {
  it("keeps the five services and the three project categories from the public case studies", () => {
    expect(services.map((service) => service.slug)).toEqual([
      "app-development",
      "ai-agents-and-automation",
      "ai-strategy-consulting",
      "ai-training-seminars",
      "healthcare-app-development",
    ]);
    const bySlug = Object.fromEntries(projects.map((project) => [project.slug, project.categories]));
    expect(bySlug["acs-cares"]).toEqual(["ai", "healthcare", "mobile"]);
    expect(bySlug["well-aware"]).toEqual(["ai", "healthcare", "mobile"]);
    expect(bySlug["smithsonian-national-museum-of-african-art"]).toEqual(["web"]);
  });

  it("links healthcare and app work to the health projects, and does not call those projects agents", () => {
    const healthcare = services.find((service) => service.slug === "healthcare-app-development");
    const apps = services.find((service) => service.slug === "app-development");
    const agents = services.find((service) => service.slug === "ai-agents-and-automation");
    const strategy = services.find((service) => service.slug === "ai-strategy-consulting");
    const training = services.find((service) => service.slug === "ai-training-seminars");
    expect(healthcare?.relatedProjectSlugs).toEqual(["acs-cares", "well-aware"]);
    expect(apps?.relatedProjectSlugs).toContain("smithsonian-national-museum-of-african-art");
    expect(agents?.relatedProjectSlugs).toEqual(["acs-cares", "well-aware"]);
    expect(strategy?.relatedProjectSlugs).toEqual(["acs-cares", "well-aware"]);
    expect(training?.relatedProjectSlugs).toEqual(["acs-cares", "well-aware"]);
    for (const service of [agents, strategy, training]) {
      expect(service?.proofNote.trim().length).toBeGreaterThan(40);
    }
    const smithsonian = projects.find((project) => project.slug === "smithsonian-national-museum-of-african-art");
    expect(smithsonian?.relatedServiceSlugs).toEqual(["app-development"]);
    expect(smithsonian?.relatedServiceSlugs).not.toContain("healthcare-app-development");
  });

  it("filters by category and has a plain empty state", () => {
    expect(filterProjects(projects, "web").map((project) => project.slug)).toEqual([
      "smithsonian-national-museum-of-african-art",
    ]);
    expect(filterProjects(projects, "healthcare").map((project) => project.slug).sort()).toEqual(["acs-cares", "well-aware"]);
    expect(filterProjects([], "ai")).toEqual([]);
    expect(emptyFilterMessage).toMatch(/Nothing in this category/);
    expect(emptyFilterMessage.toLowerCase()).not.toContain("exception");
  });

  it("points insight cards at the original posts instead of inventing new articles", () => {
    expect(insights.length).toBeGreaterThan(0);
    for (const insight of insights) {
      expect(insight.title.trim().length).toBeGreaterThan(0);
      expect(insight.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      const pathname = new URL(insight.href).pathname.replace(/\/+$/, "") || "/";
      expect(["www.crosscomm.com", "crosscomm.com"]).toContain(new URL(insight.href).hostname);
      expect(publicRoutes.some((route) => bare(route.path) === pathname)).toBe(false);
    }
  });
});
