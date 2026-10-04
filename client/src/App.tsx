import { Route, Routes } from "react-router";
import { Shell } from "./components/Shell";
import { OriginsProvider } from "./lib/origins";
import { ApproachPage } from "./pages/ApproachPage";
import { CareersPage } from "./pages/CareersPage";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";
import { InsightsPage } from "./pages/InsightsPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProjectPage } from "./pages/ProjectPage";
import { ServicePage } from "./pages/ServicePage";
import { ServicesIndexPage } from "./pages/ServicesIndexPage";
import { WorkPage } from "./pages/WorkPage";
import type { SiteOrigins } from "./site-config";

export function App({ origins }: { origins: SiteOrigins }) {
  return (
    <OriginsProvider value={origins}>
      <Routes>
        <Route element={<Shell />}>
          <Route index element={<HomePage />} />
          <Route path="services" element={<ServicesIndexPage />} />
          <Route path="services/:slug" element={<ServicePage />} />
          <Route path="portfolio" element={<WorkPage />} />
          <Route path="portfolio/:slug" element={<ProjectPage />} />
          <Route path="approach" element={<ApproachPage />} />
          <Route path="resources/blog" element={<InsightsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="careers" element={<CareersPage />} />
          <Route path="404.html" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </OriginsProvider>
  );
}
