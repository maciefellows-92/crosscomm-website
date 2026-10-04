# Plan

This is how the review site is built, and what a reviewer can do on it. The owner asked for a strong starter to click through. They did not ask for the production cutover of crosscomm.com.

The fifteen pages, the build, and the tests are in this repository. Visitors do not sign in.

## How a change ships

1. Edit a typed record. See [CONTENT-GUIDE.md](CONTENT-GUIDE.md).
2. Open a pull request. GitHub Actions runs the quality checks. Vercel builds a preview from the same push. Those two are separate. See [DEPLOYMENT.md](DEPLOYMENT.md).
3. Someone other than the author reviews the pages.
4. Merge, then confirm the deployment before closing the issue.

## What the build does

- Vite 7 client build to `dist/public`, then a server build to `dist/server/entry-server.js`, then one HTML file per route plus `404.html`.
- `client/src/generated/build-meta.ts` is rewritten before both bundles. `version.json` records the same release: `VERCEL_GIT_COMMIT_SHA`, then `GITHUB_SHA`, then `git rev-parse HEAD`, otherwise `local`. The value is a full 40-character SHA or `local`.
- A preview server on port 4187 (`PREVIEW_PORT` overrides it; `0` is an ephemeral port for unit tests). It does not attach to a server that is already listening. Port 4173 belongs to another local site and must not be used. The server refuses decoded `..` paths and symlinks that leave `dist/public`. It sends the file's real type. A missing path is status 404 and is not the homepage.
- The dev server is port 5173.
- Vitest, Playwright, a smoke checker, a Lighthouse script, actionlint, and GitHub Actions.
- `vercel.json` uses `trailingSlash: true`, output `dist/public`, and no catch-all rewrite. The default header is `X-Robots-Tag: noindex, follow`. There is no Content-Security-Policy, because a strict policy here would break hashed assets and fonts before anyone had measured it.

## Status on 4 October 2026

Unit tests, lint, the production build, prerender smoke, and actionlint passed locally. The 15 known routes passed in the browser on desktop and mobile, including contact and the work filters. The repaired browser suite, Claude's visual review, remote CI, and the hosted deployment are still being checked. `pnpm lighthouse` writes a JSON file and a summary only after Chrome actually runs. It does not invent a score and it does not fail the build on a number.

## Files the build reads

These files are in the repository. The build stops, and names the gap, if one of them is missing:

| File | Contract |
| --- | --- |
| `client/index.html` | Keep `<!--app-head-->` in `<head>`, `<div id="root"><!--app-html--></div>`, and `<script type="module" src="/src/main.tsx"></script>`. The build replaces the two markers. Do not remove them in source. |
| `client/src/main.tsx` | Hydrate `BrowserRouter` and `App` with `buildMeta.origins`. In Vite dev, `createRoot` is the fallback. |
| `client/src/App.tsx` | Named export `App` with prop `{ origins: SiteOrigins }`. The caller provides the router. |
| `client/src/entry-server.tsx` | `render(url: string, origins: SiteOrigins): string` using `renderToString` and `StaticRouter`. Re-export `renderHead`, `robotsTxt`, `sitemapXml`, and `llmsTxt` from `lib/seo`, and `prerenderRoutes` from `content/routes`. |

`releaseToken()` in `client/src/lib/seo.ts` must return `buildMeta.release`. The smoke check compares that meta tag with `dist/public/version.json`. A hardcoded `"local"` fails once the build has a real SHA.

Use eager imports in the server render. `renderToString` plus `React.lazy` can write an empty loading state into the HTML.

Routes come from `prerenderRoutes`. Pass `route.path` into `render`, including `/404.html` for the not-found record. Canonical paths end in `/` except `/`.

## What a visitor must be able to do

Browser tests in `e2e/site.spec.ts` are the list. Names below are the accessible names, not CSS classes.

- Header is a banner. Links: Services, Work, Approach, Insights. A "Let's talk" link goes to `/contact/`. On a 390px-wide screen those links may sit behind a button whose name contains "menu".
- `<main>` on the homepage and on `/services/` has one link per service, pointing at `/services/<slug>/`. The link wraps the row number, the heading, the description, and an arrow, so the accessible name is the whole row. The heading inside the link is the service name.
- The same `<main>` links the three projects by their exact names: ACS CARES, Well Aware, Smithsonian National Museum of African Art.
- Portfolio filters are buttons named All, AI, Healthcare, Web, and Mobile. Healthcare shows ACS CARES and Well Aware and hides Smithsonian. Web does the opposite.
- If a filter matches nothing, show `emptyFilterMessage` from `client/src/content/projects.ts`. The current three projects never hit that state.
- The healthcare service page's heading is "Healthcare app development". The body includes the lead about research teams and care organizations, does not claim "HIPAA certified" or "SOC 2 certified", and has a link named ACS CARES.
- The ACS CARES page names the American Cancer Society, mentions semantic search, and links to the public case study on `crosscomm.com` or `www.crosscomm.com` at `/portfolio/acs-cares/`.
- Contact, inside `<main>`: a `mailto:hello@crosscomm.com` link, a `tel:+19196953241` link, and a link to the existing contact page on `crosscomm.com` or `www.crosscomm.com`. Visible copy says nothing is sent until the visitor sends it from their own mail app.
- Every page has a button named like "Report a problem". It opens a dialog, moves focus inside, and Escape returns focus to the button. A control named like "Cancel" or "Close" also closes it.
- The dialog has textboxes named like "Description" and "Expected", shows the description as text (not only inside the field), and has Copy and Download buttons. Download is a file. Copy uses the clipboard.
- The draft control's accessible name is exactly "Open issue draft in GitHub". When the report fits, it is a real link to `https://github.com/mrhinkle/crosscomm-website/issues/new?title=...&body=...` and it opens a new tab. The test may open that tab and must not submit the issue. The page must say nothing was filed, and must not say the issue was created.
- At 1440px wide, the homepage lead and the "See the services" and "See the work" links sit inside the first 900px of height.
- A client-side move from one service to another leaves only that route's JSON-LD (`script[data-crosscomm-ld]`). Direct load still has a canonical, a noindex robots meta, and one Service graph for that page.
- The suite writes `reports/screenshots/` for the homepage at 1440 and 390, plus a service, a case study, contact, and the open dialog on desktop.
- The page path stored in the report has no query and no hash. A visit to `/contact/?utm=should-not-appear#private` must not put `should-not-appear` in the report.
- Six hundred emoji in the description is valid and makes the draft URL longer than 7,000 characters. The draft control is disabled, and the dialog tells the person to copy or download. The report text is not shortened.
- `/review-smoke-unknown-path/` returns HTTP 404 and does not render the homepage.
- At 1440 and 390, the document does not scroll sideways. There are no page errors and no console errors, other than a missing favicon.ico.
- axe-core reports zero serious or critical violations on `/`, `/services/app-development/`, `/contact/`, and the open dialog.

Each prerendered page needs exactly one `h1`, a title, a description, a canonical URL, a robots meta, working local links and assets, and schema. Public pages include Organization. Service pages include Service. The 404 is noindex, is not in the sitemap, and its canonical is the homepage. That matches `lib/seo.ts` today.

## Order of later work

Cutover items come before growth items. The list, with acceptance and owners, is [BACKLOG.md](BACKLOG.md) and [backlog.json](backlog.json).
