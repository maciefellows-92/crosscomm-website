import { Breadcrumbs } from "../components/chrome";
import { siteConfig } from "../site-config";

export function CareersPage() {
  return (
    <article className="wrap page careers-page">
      <Breadcrumbs />
      <header className="page-intro">
        <p className="eyebrow">Careers</p>
        <h1 tabIndex={-1}>Come do the work.</h1>
        <p className="deck">Open roles are posted on our careers page. They change as the work changes.</p>
      </header>
      <p>
        <a className="btn btn-deep" href={siteConfig.existingCareers} target="_blank" rel="noreferrer">
          View current openings
        </a>
      </p>
      <p className="fine">Opens the careers page on crosscomm.com in a new tab.</p>
      <p>
        You can also write to <a href={`mailto:${siteConfig.careersEmail}`}>{siteConfig.careersEmail}</a>.
      </p>
      <p className="offices-line">
        Offices in {siteConfig.offices.map((office) => `${office.city}, ${office.region}`).join(" and ")}. Founded in{" "}
        {siteConfig.founded}.
      </p>
    </article>
  );
}
