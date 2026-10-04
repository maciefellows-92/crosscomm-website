import { Link } from "react-router";
import { services } from "../content/services";
import { Arrow, Breadcrumbs, ContactBand } from "../components/chrome";

export function ServicesIndexPage() {
  return (
    <>
      <div className="wrap page">
        <Breadcrumbs />
        <header className="page-intro">
          <p className="eyebrow">Services</p>
          <h1 tabIndex={-1}>What we do.</h1>
          <p className="deck">
            Custom apps, agents and automation, strategy, training, and healthcare software. Pick the practice that
            matches the decision in front of you. If you are not sure, start with a conversation.
          </p>
        </header>
        <ol className="service-rows service-index">
          {services.map((service, index) => (
            <li key={service.slug}>
              <Link to={`/services/${service.slug}/`}>
                <span className="num">{String(index + 1).padStart(2, "0")}</span>
                <h2 className="row-title">{service.name}</h2>
                <span className="row-copy">{service.lead}</span>
                <Arrow />
              </Link>
            </li>
          ))}
        </ol>
      </div>
      <ContactBand heading="Not sure which one fits?" />
    </>
  );
}
