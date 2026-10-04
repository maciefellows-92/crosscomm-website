import { useParams } from "react-router";
import { projectBySlug } from "../content/projects";
import { serviceBySlug, services } from "../content/services";
import type { ProjectRecord } from "../content/types";
import { Breadcrumbs, ContactBand, FaqList, PageIntro, ProjectCard } from "../components/chrome";
import { NotFoundPage } from "./NotFoundPage";

export function ServicePage() {
  const { slug = "" } = useParams();
  const service = serviceBySlug(slug);
  if (!service) return <NotFoundPage />;
  const index = services.findIndex((item) => item.slug === service.slug);
  const related = service.relatedProjectSlugs
    .map((projectSlug) => projectBySlug(projectSlug))
    .filter((project): project is ProjectRecord => Boolean(project));

  return (
    <>
      <article className="wrap page">
        <Breadcrumbs />
        <PageIntro
          className="service-intro"
          eyebrow={`Services · ${String(index + 1).padStart(2, "0")}`}
          title={service.name}
          deck={service.lead}
        />
        <section className="split">
          <h2>Who it is for</h2>
          <p className="lead-copy">{service.audience}</p>
        </section>
        <section className="block">
          <h2>What we do</h2>
          <ol className="activities">
            {service.activities.map((activity, activityIndex) => (
              <li key={activity.title}>
                <span className="num">{String(activityIndex + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{activity.title}</h3>
                  <p>{activity.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <section className="block">
          <h2>Related work</h2>
          <p className="lead-copy">{service.proofNote}</p>
          <div className="portfolio-grid">
            {related.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
        <FaqList items={service.faqs} />
      </article>
      <ContactBand heading={`Talk about ${service.name}.`} />
    </>
  );
}
