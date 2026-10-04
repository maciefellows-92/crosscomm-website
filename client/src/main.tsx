import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { App } from "./App";
import { notFoundRoute, routeByPath } from "./content/routes";
import { buildMeta } from "./generated/build-meta";
import "./styles.css";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Missing #root");

const app = (
  <StrictMode>
    <BrowserRouter>
      <App origins={buildMeta.origins} />
    </BrowserRouter>
  </StrictMode>
);

function barePath(pathname: string): string {
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
}

/** Real elements only. A Vite <!--app-html--> comment is not prerendered markup. */
function hasPrerenderedMarkup(root: HTMLElement): boolean {
  return [...root.childNodes].some((node) => node.nodeType === Node.ELEMENT_NODE);
}

/** Hydrate only when this URL is the page that was prerendered into #root. */
function matchesPrerenderedRoute(pathname: string): boolean {
  if (routeByPath(pathname)) return true;
  return barePath(pathname) === barePath(notFoundRoute.path);
}

if (hasPrerenderedMarkup(rootEl) && matchesPrerenderedRoute(window.location.pathname)) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
}
