import { Link, useParams } from "react-router";
import { categoryLabels, projectBySlug } from "../content/projects";
import { serviceBySlug } from "../content/services";
import type { ServiceRecord } from "../content/types";
import { Breadcrumbs, ContactStrip } from "../components/chrome";
import { NotFoundPage } from "./NotFoundPage";

export function ProjectPage() {
  const { slug = "" } = useParams();
  const project = projectBySlug(slug);
  if (!project) return <NotFoundPage />;
  const related = project.relatedServiceSlugs
    .map((serviceSlug) => serviceBySlug(serviceSlug))
    .filter((service): service is ServiceRecord => Boolean(service));
  const heroClass = project.slug === "acs-cares" ? "case-hero is-phone" : "case-hero";

  return (
    <>
      <article className="wrap page">
        <Breadcrumbs />
        <header className="page-intro">
          <p className="eyebrow">{project.client}</p>
          <h1 tabIndex={-1}>{project.name}</h1>
          <p className="deck">{project.summary}</p>
          <ul className="tags">
            {project.categories.map((category) => (
              <li key={category}>{categoryLabels[category]}</li>
            ))}
          </ul>
        </header>
        <figure className={heroClass}>
          <img
            src={project.hero.src}
            width={project.hero.width}
            height={project.hero.height}
            alt={project.hero.alt}
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
          <figcaption>{project.caption}</figcaption>
        </figure>
        <div className="chapters">
          <section>
            <h2>The problem</h2>
            {project.challenge.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
          <section>
            <h2>The work</h2>
            {project.work.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
          <section>
            <h2>What came of it</h2>
            {project.outcome.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        </div>
        {project.gallery.length > 0 ? (
          <div className="gallery">
            {project.gallery.map((image) => (
              <figure key={image.src} className={image.height > image.width ? "shot tall" : "shot wide"}>
                <img
                  src={image.src}
                  width={image.width}
                  height={image.height}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            ))}
          </div>
        ) : null}
        <section className="block">
          <h2>Services on this project</h2>
          <ul className="related-links">
            {related.map((service) => (
              <li key={service.slug}>
                <Link to={`/services/${service.slug}/`}>{service.name}</Link>
              </li>
            ))}
          </ul>
        </section>
        <p className="source-line">
          <a href={project.sourceUrl} target="_blank" rel="noreferrer">
            Original case study on crosscomm.com
          </a>
        </p>
      </article>
      <ContactStrip />
    </>
  );
}
