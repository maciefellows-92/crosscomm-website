import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <article className="wrap page not-found">
      <p className="giant" aria-hidden="true">
        404
      </p>
      <p className="eyebrow">Missing page</p>
      <h1 tabIndex={-1}>That page is not here.</h1>
      <p className="deck">The link may be old, or the page was never on this site.</p>
      <ul className="rescue-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/services/">Services</Link>
        </li>
        <li>
          <Link to="/portfolio/">Work</Link>
        </li>
        <li>
          <Link to="/contact/">Contact</Link>
        </li>
      </ul>
    </article>
  );
}
