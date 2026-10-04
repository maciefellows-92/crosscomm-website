import { approachBeliefs, approachSteps } from "../content/studio";
import { Breadcrumbs, ContactBand } from "../components/chrome";

export function ApproachPage() {
  return (
    <>
      <article className="wrap page">
        <Breadcrumbs />
        <header className="page-intro">
          <p className="eyebrow">Approach</p>
          <h1 tabIndex={-1}>Good technology starts with people.</h1>
          <p className="deck">
            A project moves from discovery and a plan through design, weekly builds, launch, and support. We explain
            the technology as we go.
          </p>
        </header>
        <ol className="beliefs">
          {approachBeliefs.map((belief, index) => (
            <li key={belief}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{belief}</p>
            </li>
          ))}
        </ol>
        <div className="phases">
          {approachSteps.map((step, index) => (
            <section key={step.phase} className="phase">
              <p className="eyebrow">
                {String(index + 1).padStart(2, "0")} · {step.phase}
              </p>
              <ol>
                {step.items.map((item) => (
                  <li key={item.name}>
                    <h2>{item.name}</h2>
                    <p>{item.goal}</p>
                    <p className="output">
                      <span>You leave with</span> {item.output}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      </article>
      <ContactBand heading="Start with the problem, not the platform." />
    </>
  );
}
