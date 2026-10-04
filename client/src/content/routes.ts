import { services } from "./services";
import { projects } from "./projects";
import { canonicalPath } from "../site-config";

export type RouteKind =
  | "home"
  | "services"
  | "service"
  | "portfolio"
  | "project"
  | "approach"
  | "insights"
  | "contact"
  | "careers"
  | "not-found";

export type Crumb = { name: string; path: string };

export type RouteDef = {
  id: string;
  path: string;
  outputFile: string;
  title: string;
  description: string;
  kind: RouteKind;
  inSitemap: boolean;
  crumbs: Crumb[];
  serviceSlug?: string;
  projectSlug?: string;
};

function page(partial: Omit<RouteDef, "path" | "outputFile"> & { path: string }): RouteDef {
  const path = canonicalPath(partial.path);
  const outputFile = path === "/" ? "index.html" : `${path.slice(1)}index.html`;
  return { ...partial, path, outputFile };
}

const home: RouteDef = page({
  id: "home",
  path: "/",
  title: "CrossComm | AI strategy, custom apps, and product development",
  description:
    "CrossComm, founded in 1998 in Durham and Cleveland, builds AI strategy, custom apps, and human-centered products for ambitious teams.",
  kind: "home",
  inSitemap: true,
  crumbs: [],
});

const servicesIndex: RouteDef = page({
  id: "services",
  path: "/services",
  title: "Services | CrossComm",
  description:
    "App development, AI agents and automation, AI strategy, AI training, and healthcare app development from CrossComm.",
  kind: "services",
  inSitemap: true,
  crumbs: [{ name: "Services", path: "/services/" }],
});

const serviceRoutes: RouteDef[] = services.map((service) =>
  page({
    id: `service:${service.slug}`,
    path: `/services/${service.slug}`,
    title: `${service.name} | CrossComm`,
    description: service.description,
    kind: "service",
    inSitemap: true,
    crumbs: [
      { name: "Services", path: "/services/" },
      { name: service.name, path: `/services/${service.slug}/` },
    ],
    serviceSlug: service.slug,
  }),
);

const portfolio: RouteDef = page({
  id: "portfolio",
  path: "/portfolio",
  title: "Work | CrossComm",
  description:
    "Three CrossComm projects with sources: ACS CARES, Well Aware, and the Smithsonian National Museum of African Art.",
  kind: "portfolio",
  inSitemap: true,
  crumbs: [{ name: "Work", path: "/portfolio/" }],
});

const projectRoutes: RouteDef[] = projects.map((project) =>
  page({
    id: `project:${project.slug}`,
    path: `/portfolio/${project.slug}`,
    title: `${project.name} | CrossComm`,
    description: project.description,
    kind: "project",
    inSitemap: true,
    crumbs: [
      { name: "Work", path: "/portfolio/" },
      { name: project.name, path: `/portfolio/${project.slug}/` },
    ],
    projectSlug: project.slug,
  }),
);

const rest: RouteDef[] = [
  page({
    id: "approach",
    path: "/approach",
    title: "Approach | CrossComm",
    description:
      "How a CrossComm project moves from discovery and a plan through design, weekly builds, launch, and support.",
    kind: "approach",
    inSitemap: true,
    crumbs: [{ name: "Approach", path: "/approach/" }],
  }),
  page({
    id: "insights",
    path: "/resources/blog",
    title: "Insights | CrossComm",
    description:
      "A short list of existing CrossComm articles, with original titles, dates, and links. No new articles are invented here.",
    kind: "insights",
    inSitemap: true,
    crumbs: [{ name: "Insights", path: "/resources/blog/" }],
  }),
  page({
    id: "contact",
    path: "/contact",
    title: "Contact | CrossComm",
    description:
      "Email hello@crosscomm.com, call +1 919 695 3241, or open CrossComm's existing consultation form. This page does not submit a form of its own.",
    kind: "contact",
    inSitemap: true,
    crumbs: [{ name: "Contact", path: "/contact/" }],
  }),
  page({
    id: "careers",
    path: "/careers",
    title: "Careers | CrossComm",
    description:
      "Open roles are listed on CrossComm's existing careers page. This review site does not post vacancies of its own.",
    kind: "careers",
    inSitemap: true,
    crumbs: [{ name: "Careers", path: "/careers/" }],
  }),
];

export const notFoundRoute: RouteDef = {
  id: "not-found",
  path: "/404.html",
  outputFile: "404.html",
  title: "Page not found | CrossComm",
  description: "That page is not on this CrossComm review site.",
  kind: "not-found",
  inSitemap: false,
  crumbs: [],
};

export const publicRoutes: RouteDef[] = [home, servicesIndex, ...serviceRoutes, portfolio, ...projectRoutes, ...rest];

export const prerenderRoutes: RouteDef[] = [...publicRoutes, notFoundRoute];

export function routeById(id: string): RouteDef {
  const found = prerenderRoutes.find((route) => route.id === id);
  if (!found) throw new Error(`Unknown route ${id}`);
  return found;
}

export function routeByPath(pathname: string): RouteDef | undefined {
  const bare = pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
  return publicRoutes.find((route) => {
    const routeBare = route.path === "/" ? "/" : route.path.replace(/\/+$/, "");
    return routeBare === bare;
  });
}
