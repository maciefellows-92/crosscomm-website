import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { App } from "./App";
import { prerenderRoutes } from "./content/routes";
import { llmsTxt, renderHead, robotsTxt, sitemapXml } from "./lib/seo";
import type { SiteOrigins } from "./site-config";

export function render(url: string, origins: SiteOrigins): string {
  return renderToString(
    <StaticRouter location={url}>
      <App origins={origins} />
    </StaticRouter>,
  );
}

export { renderHead, robotsTxt, sitemapXml, llmsTxt, prerenderRoutes };
