# Content guide

Prepared 4 October 2026. The sentences on this site live in typed files. Change the file, open a pull request, and review the preview. There is no CMS.

The copy was taken from public CrossComm pages retrieved 4 October 2026. It is a reading of those pages, not a new measurement and not a contract.

## Where a sentence lives

| What you want to change | File |
| --- | --- |
| Name, email, phone, offices, founder, founding year, the index switch | `client/src/site-config.ts` |
| A service | `client/src/content/services.ts` |
| A case study, its pictures, its categories | `client/src/content/projects.ts` |
| The five linked articles | `client/src/content/insights.ts` |
| Homepage questions, the approach steps, the approach beliefs | `client/src/content/studio.ts` |
| Which URLs exist, and their titles | `client/src/content/routes.ts` |
| The 138 old URLs | `client/src/content/legacy-inventory.ts` |

Service and project routes are built from those records. A service title is `Name | CrossComm`. A service description is the record's `description`. You do not keep a second copy of that sentence in the route file.

If you rename a slug, update every `relatedProjectSlugs` or `relatedServiceSlugs` that points at it, and update the legacy inventory only when the public URL itself changes. A slug change is a new URL. Treat it as a migration decision, not a cleanup.

`contentUpdated` in `site-config.ts` is the date on sitemap entries. Change it when the public copy changes in a way a reviewer should notice. It is `2026-10-04` now.

## What you may say

- Attribute a claim to the public page it came from. Each service and project record has a `sourceUrl`.
- Keep a number only when the source sentence is still in the record. The Well Aware population figures are the case study's figures, retrieved 4 October 2026. They are not a new count. The ACS CARES results section does not give a number. Do not add one.
- Say what the studio does not do, when the record already says it. The healthcare page does not claim HIPAA certification. The strategy page does not claim ACS CARES or Well Aware were consulting engagements. The agents page does not claim those two projects are agent implementations. The training page does not claim they were training engagements.

## What you must not add

- A statistic, a percentage, a rating, a price, a headcount, or a client count that is not on the source page.
- A testimonial or a customer quote you cannot point at.
- A certification, a HIPAA claim, or an SOC 2 claim. The public healthcare page shows certification imagery. This review site does not repeat it. The owner has to approve the wording before cutover.
- Privacy, terms, or other legal pages. Do not paste customer legal text into this repo.
- A new article that pretends to be an old CrossComm post. The insights list links out. It does not rewrite the posts.
- A form that says a message was sent. Contact is email, phone, and a link to the existing form on crosscomm.com.

## How the five services use the three projects

| Service | Related projects | What the relationship is allowed to mean |
| --- | --- | --- |
| App development | ACS CARES, Well Aware, Smithsonian | Shipped product work. Other legacy case studies are not on this site yet. |
| AI agents and automation | ACS CARES, Well Aware | AI inside those products. Do not describe either project as an autonomous agent. |
| AI strategy consulting | ACS CARES, Well Aware | Context for the kind of product that can follow a strategy. Not evidence those clients bought consulting. |
| AI training seminars | ACS CARES, Well Aware | Examples of the studio's AI product work. Not evidence those clients bought training. |
| Healthcare app development | ACS CARES, Well Aware | The healthcare projects on this site. Do not claim HIPAA or SOC 2 certification. |

Portfolio filters use the categories on the project, not a guess. ACS CARES and Well Aware are `ai`, `healthcare`, and `mobile`. Smithsonian is `web` only. The empty-state sentence is `emptyFilterMessage` in `projects.ts`. The current three projects never show it.

## Pictures

Use the `alt`, `width`, and `height` already on the asset. Do not generate a picture and present it as the client's product. The six WebP files and where they came from are in [SOURCES.md](SOURCES.md). Permission to keep using them is not confirmed.

## Adding or removing a page

A new public path is a product decision. This starter added none. The full map is [MIGRATION.md](MIGRATION.md).

To retire a deferred URL, leave it as 404 or name one replacement. Do not send every old URL to the homepage.

To add a page later:

1. Add the record.
2. Confirm the route appears once, with a trailing slash, a title, and a description.
3. Decide whether the old inventory path is now preserved. If the path is new, say so in the migration doc. Do not hide a new URL inside a "cleanup".
4. Give it a source. If there is no source, it is not ready.

## Feedback bounds, if you change the form

These limits are in `site-config.ts` and checked by `client/src/lib/feedback.ts`:

- Description: 1,200 Unicode code points. Expected behavior: 400. Over the limit is an error. The text is not shortened.
- The GitHub draft URL cap is 7,000 characters. Over that, the draft control is disabled. Copy and download still work. The body is not shortened to fit the link.
- The stored page is a path only. No query string and no hash.

## Status of this guide

The records are in the tree and covered by unit tests. The fifteen built routes are what the review site serves. What was checked on the protected host is in [RELEASE-EVIDENCE.md](RELEASE-EVIDENCE.md). That check was not an exhaustive read of every sentence.
