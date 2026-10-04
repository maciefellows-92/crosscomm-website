import { insights } from "../content/insights";
import { Breadcrumbs, ContactStrip } from "../components/chrome";

export function InsightsPage() {
  return (
    <>
      <div className="wrap page">
        <Breadcrumbs />
        <header className="page-intro">
          <p className="eyebrow">From the archive</p>
          <h1 tabIndex={-1}>Insights</h1>
          <p className="deck">
            Selected writing from the studio. Titles and dates are the originals. Each link opens the article on
            crosscomm.com in a new tab.
          </p>
        </header>
        <ol className="archive">
          {insights.map((insight) => (
            <li key={insight.href}>
              <time dateTime={insight.date}>{insight.dateLabel}</time>
              <div>
                <h2>
                  <a href={insight.href} target="_blank" rel="noreferrer">
                    {insight.title}
                    <span className="visually-hidden"> (opens crosscomm.com in a new tab)</span>
                  </a>
                </h2>
                <p>{insight.summary}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <ContactStrip />
    </>
  );
}
