import { useState } from "react";
import { categoryLabels, emptyFilterMessage, filterProjects, projects } from "../content/projects";
import type { Category } from "../content/types";
import { Breadcrumbs, ContactStrip, ProjectCard } from "../components/chrome";

const filters = ["all", "ai", "healthcare", "mobile", "web"] as const;

export function WorkPage() {
  const [category, setCategory] = useState<Category | "all">("all");
  const visible = filterProjects(projects, category);
  const label = visible.length === 1 ? "1 project" : `${visible.length} projects`;

  return (
    <>
      <div className="wrap page">
        <Breadcrumbs />
        <header className="page-intro">
          <p className="eyebrow">Work</p>
          <h1 tabIndex={-1}>Selected work.</h1>
          <p className="deck">
            ACS CARES, Well Aware, and a browser exhibition app for the Smithsonian National Museum of African Art.
          </p>
        </header>
        <div className="filters" role="group" aria-label="Filter projects">
          {filters.map((item) => (
            <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>
              {categoryLabels[item]}
            </button>
          ))}
        </div>
        <p className="filter-status" aria-live="polite">
          {visible.length === 0 ? emptyFilterMessage : label}
        </p>
        {visible.length > 0 ? (
          <div className="portfolio-grid">
            {visible.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : null}
      </div>
      <ContactStrip />
    </>
  );
}
