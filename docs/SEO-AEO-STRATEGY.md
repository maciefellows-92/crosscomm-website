# SEO and AEO strategy

Prepared 4 October 2026 for Macie Fellows. Source: `../seo-research/SEO-STRATEGY.md`, written the same day from a public-page inspection. This file maps that plan onto what this repository actually does. It does not claim the review site is indexed, ranking, or receiving leads.

## Evidence limits

The strategy inspected the public homepage, five service pages, and the ACS CARES case study on 4 October 2026. Those pages are the source of the service set and of the qualitative ACS CARES results. They are not a full crawl, a backlink audit, a Search Console audit, or a legal review.

Semrush did not return metrics. The strategy records `ERROR 120` (a wrong key pair on the first connector) and then, on the official connection, missing structured content followed by `WouldBlock`. A browser check reached a logged-out Semrush homepage. No credential was read and no subscription was bought. **There is no search volume, difficulty, rank, traffic estimate, or competitor share in this document.** The query phrases below are hypotheses about buyer intent. They are not measured demand. Do not describe this as a completed Semrush audit.

A failed fetch of `robots.txt` or `sitemap.xml` on the live site is not evidence that those files are missing. This lane did not re-fetch them.

## What this repository implements

Review deployments are non-indexable on purpose, including a Vercel deployment that Vercel calls production. `siteConfig.indexable` is false. Canonicals use the deployment host (`https://crosscomm-website.vercel.app` unless `VERCEL_PROJECT_PRODUCTION_URL` is a real host). HTML robots meta is `noindex, follow`. The Vercel header `X-Robots-Tag` is also `noindex, follow`. Both have to change together at cutover. See [DEPLOYMENT.md](DEPLOYMENT.md).

`robots.txt` allows `/` so a crawler can see the noindex tag. It does not advertise a sitemap while the site is non-indexable. `sitemap.xml` is still generated, with the review origin and without the 404, so the URL list can be inspected. It is not linked from `robots.txt`.

`llms.txt` is a directory of the pages, services, and the five original article links. The file says it is not a ranking claim or a citation promise. The strategy cites Google's AI optimization guidance that special AI markup and `llms.txt` do not improve Google visibility. This site still writes the file as a readable index. That is not a bet that a model will prefer the site.

Structured data, from `client/src/lib/seo.ts`:

- Organization on public pages: name, legal name, email, phone, founding year 1998, founder Don Shin, Durham NC and Cleveland OH as city and region. No street address, no employee count, no rating, no review.
- BreadcrumbList where the route has crumbs.
- Service on the five service routes.
- No FAQPage. Visible questions exist. Google's FAQ rich-result feature was retired and the documentation removed in June 2026, according to the strategy's reading of Google's documentation updates. This site does not promise a FAQ rich result.
- No Article schema. The insights page does not host articles.
- The 404 has no Organization and no Service. Its canonical is the homepage. It is noindex.

Titles and descriptions come from `routes.ts`. Service and project text comes from the records. Metadata is escaped when the HTML is rendered. That escaping is unit-tested. The built pages were checked locally on 4 October 2026. A hosted crawl has not been recorded yet.

Unknown URLs return 404. They are not the homepage with status 200.

## Page map

The strategy's proposed paths, and the path this repo uses:

| Strategy path | This repo | Notes |
| --- | --- | --- |
| `/` | `/` | Services, three projects, contact. No invented client count. |
| `/services/ai-agents-and-automation/` | same | MCP and workflow language from the public page. ACS CARES and Well Aware are not presented as agent projects. |
| `/services/ai-strategy-consulting/` | same | Those two projects are not proof of a consulting purchase. |
| `/services/app-development/` | same | Smithsonian is included, filed as web. |
| `/services/healthcare-app-development/` | same | Does not claim HIPAA certification. |
| `/services/ai-training-seminars/` | same | Tool names are dated 4 October 2026 and can go stale. Not a training engagement for the three projects. |
| `/portfolio/acs-cares/` | same | Qualitative results only. Semantic search and matching are described. No invented adoption number. |
| `/approach/` | same | Discovery, plan, design, develop, launch, support. |
| `/resources/` | **not built** | The preserved path is `/resources/blog/`. Do not add a second hub without a decision. |
| Contact | `/contact/` | `mailto:hello@crosscomm.com`, `tel:+19196953241`, and a link to `https://www.crosscomm.com/contact/`. This page does not submit, receive, or store a message. No response-time promise. |

Also preserved, and not extra inventions: `/services/`, `/portfolio/`, `/portfolio/well-aware/`, `/portfolio/smithsonian-national-museum-of-african-art/`, `/careers/`. Careers points at `https://www.crosscomm.com/careers/` and does not post roles.

The strategy's buyer-query phrases stay hypotheses. Examples, not targets to stuff into titles: "AI agent development services", "healthcare app development", "custom app development company". Put them in a page only when the sentence would still be true with the phrase removed.

## Articles that were not written

The strategy recommended these angles, after an expert reviews them. They are not pages here:

1. How CrossComm evaluates an AI workflow before recommending an agent.
2. What an AI readiness assessment should answer before a build begins.
3. What research teams should prepare before commissioning a study app.
4. Lessons from the publicly documented ACS CARES semantic search and matching work.
5. How to choose between a custom application, an integration, and an existing product.

The insights page instead links five existing posts on the live site, with the original titles and dates. The newest is a 6 May 2024 post about a 2023 award. The record says it is an archive item, not current news. Do not label it "Latest news" as if it were new.

Individual blog URLs are deferred on this host. The full list is [MIGRATION.md](MIGRATION.md).

## Measurement

Not started. There is no Search Console property, no analytics id, and no Semrush export in this repo. Do not add either id during review.

When measurement is allowed, the strategy's weekly loop is the one to use: qualified inquiries (only after a real destination exists), Search Console clicks and impressions, queries, indexing errors, field mobile data when there is enough of it, and the feedback issues. A Lighthouse lab number is not that loop. `pnpm lighthouse` records one lab run against the local preview. That preview negotiates gzip or Brotli for text. Local compression is implemented and is not the same as a Vercel CDN measurement or field data. It is not a pass/fail gate. An SEO category held down by `noindex` stays that way until an owner asks for the review host to be indexed. Do not flip indexability to raise the score.

Set a numeric growth target only after a baseline exists. The Semrush baseline does not exist yet. The acceptance for creating one is in [BACKLOG.md](BACKLOG.md).

## Cutover, when someone asks for it

Not part of this starter. Before a domain move, the strategy asks for the old sitemap, a crawl, Search Console landing pages, important backlinks, downloads, and the current analytics definitions. None of those exports are in this repo. Preserve paths. No blanket redirect to the homepage. Remove the review noindex only on the approved host, then submit that host's sitemap. Keep a rollback deployment. Google's site-move guidance is the reference named in the source strategy.
