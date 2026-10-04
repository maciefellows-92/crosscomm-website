import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { notFoundRoute, routeByPath, type RouteDef } from "../content/routes";
import { headFor, releaseToken, type HeadModel } from "./seo";
import { useOrigins } from "./origins";

export function useMatchedRoute(): RouteDef {
  const { pathname } = useLocation();
  return routeByPath(pathname) ?? notFoundRoute;
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  const selector = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

const ogAlt =
  "CrossComm wordmark on a dark field, with AI strategy, custom apps, and human-centered product development, plus Durham and Cleveland.";

function applyHead(head: HeadModel) {
  document.title = head.title;
  setMeta("name", "description", head.description);
  setMeta("name", "robots", head.robots);
  setMeta("name", "crosscomm-release", releaseToken());
  setMeta("property", "og:title", head.title);
  setMeta("property", "og:description", head.description);
  setMeta("property", "og:url", head.canonical);
  setMeta("property", "og:type", "website");
  setMeta("property", "og:image", head.ogImage);
  setMeta("property", "og:image:width", "1200");
  setMeta("property", "og:image:height", "630");
  setMeta("property", "og:image:alt", ogAlt);
  setMeta("name", "twitter:card", "summary_large_image");
  setMeta("name", "twitter:title", head.title);
  setMeta("name", "twitter:description", head.description);
  setMeta("name", "twitter:image", head.ogImage);

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = head.canonical;

  document.head.querySelectorAll("script[data-crosscomm-ld]").forEach((node) => node.remove());
  for (const entry of head.jsonLd) {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.crosscommLd = "true";
    script.text = JSON.stringify(entry).replaceAll("<", "\\u003c");
    document.head.appendChild(script);
  }
}

export function useRouteDocument() {
  const route = useMatchedRoute();
  const origins = useOrigins();
  const { pathname } = useLocation();
  const first = useRef(true);

  useEffect(() => {
    applyHead(headFor(route, origins));
    if (first.current) {
      first.current = false;
      return;
    }
    window.scrollTo(0, 0);
    document.querySelector<HTMLElement>("main h1")?.focus();
  }, [pathname, route, origins]);
}
