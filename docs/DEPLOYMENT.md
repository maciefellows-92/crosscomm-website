# Deployment

4 October 2026. The repository is `mrhinkle/crosscomm-website`. The protected review site is https://crosscomm-website.vercel.app. The bootstrap receipt, including the Actions run and deployment id, is [RELEASE-EVIDENCE.md](RELEASE-EVIDENCE.md). This file is how you publish a change, roll one back, and, later, attach a domain. It does not change DNS. A later pull request is not covered by that receipt until its own evidence is written down.

## Release a change

1. Open a pull request from a branch. Do not edit `main` directly.
2. Before merge, open the pull-request preview and confirm the page you changed. Compare that preview's `version.json` and the Vercel Git metadata with the current pull-request head. If Actions tested a synthetic merge commit, write that SHA down separately and do not treat it as the branch head. Wait for the `quality` check on the commit you are merging. A green preview does not mean the tests passed.
3. After merge, open the production deployment and compare `version.json` with the `main` SHA, which can differ from the pull-request head. The bootstrap comparison is in [RELEASE-EVIDENCE.md](RELEASE-EVIDENCE.md).

## What is already configured

`vercel.json` is the build contract:

| Setting | Value |
| --- | --- |
| Install | `pnpm install --frozen-lockfile` |
| Build | `pnpm run build` |
| Output | `dist/public` |
| `trailingSlash` | `true` |
| Rewrites | none |
| Clean URLs | not set. Do not set `cleanUrls` together with `trailingSlash`. |

Node 24 (`.nvmrc`) and pnpm 10.33.0 (`packageManager`). No environment variable is required to build. Do not add a secret to make the review site render.

The release written into `version.json` is `VERCEL_GIT_COMMIT_SHA`, then `GITHUB_SHA` when that is 40 hex characters, then `git rev-parse HEAD`, otherwise `local`.

## What a push does, and what it does not do

GitHub Actions workflow `.github/workflows/quality.yml` runs on push and on pull request: frozen install, workflow lint, typecheck, lint, unit tests, build, HTML smoke, Playwright. It uploads `reports/`, `playwright-report/`, `test-results/`, and `dist/public/version.json` even when the job fails. Retention is 14 days. The only token permission is `contents: read`. It does not grant `actions: write`, and it does not use `pull_request_target`. Artifact upload uses that default token.

On 4 October 2026 GitHub reported protection on `main`. The required status-check context is `quality`, and it is strict. Admins are included. Force pushes and branch deletion are off. Conversation resolution is required. A pull request is required, and the required approving-review count is 0, so a sole owner is not deadlocked. Code-owner review and last-push approval are off. `CODEOWNERS` names `@mrhinkle` and does not, by itself, block a merge. The exact read-back is in [RELEASE-EVIDENCE.md](RELEASE-EVIDENCE.md).

An independent review of the current head is still required before merge. That review is process evidence Mark confirms. It is not a GitHub approval count. Do not add `Deployed smoke` as a required check. It cannot sign in to the protected host.

Vercel can still build a preview before the quality job finishes. Protection stops a merge to `main` without the check. It does not make Vercel wait. A red check and a green preview can exist for the same commit.

The same audit recorded Vercel deployment protection as SSO for generated `.vercel.app` URLs, including the production hostname, until a custom domain is attached. A login page, a redirect to login, or a 401/403 is not a passing smoke test. Check the pages in a browser that is already signed in to Vercel. Do not call `vercel curl` for that check: it can create a bypass secret, so it is not a read-only command. Do not mint a share link or a bypass token. The manual deployed-smoke workflow only works against an origin that already returns the site without a new credential.

`.github/workflows/deployed-smoke.yml` runs only when someone starts it by hand (`workflow_dispatch`) and passes an `https` origin. It is not on every push. It reads `siteConfig.indexable` from this checkout, not the hostname. A review build must send `noindex` on both `X-Robots-Tag` and the robots meta tag. A live build must send it on neither. `robots.txt` must allow crawling. A review build must not advertise a sitemap. An unknown path must be 404. HTML smoke fails the build when `vercel.json` disagrees with `siteConfig.indexable`. The current review site stays `noindex`.

## 404 and the trailing slash

Unknown paths must be 404. There is no rewrite of every missing URL to `index.html`. A 200 homepage for a missing path is a bug.

`trailingSlash: true` redirects `/services` to `/services/`. That is only a slash redirect. Deferred legacy URLs still 404 after the slash is added. See [MIGRATION.md](MIGRATION.md).

The local preview server (`pnpm preview`, port 4187) is the production-shaped static server the browser tests use. Playwright starts it with `reuseExistingServer: false`, so it will not silently test whatever is already bound to that port. If 4187 is already this project's preview, stop that preview before the suite. Do not stop unrelated processes, and do not borrow another project's port. The preview server is not Vite's SPA fallback. It rejects a decoded `..` path and a symlink that leaves `dist/public`. For HTML, CSS, JavaScript, and other text it negotiates gzip or Brotli from `Accept-Encoding`, including `q=0` and an identity fallback, and it sets `Content-Length` and `Vary: Accept-Encoding`. Images and fonts stay uncompressed. That local compression is not a measurement of the Vercel CDN. The dev server is port 5173 and is not the production check. Unit tests bind an ephemeral port (`PREVIEW_PORT=0` or port `0`) and do not listen on 4187.

## Headers

Every response from the Vercel config sends:

- `X-Robots-Tag: noindex, follow`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Frame-Options: DENY`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

Hashed files under `/assets/` are cached as `public, max-age=31536000, immutable`.

There is no Content-Security-Policy. A strict policy written before the interface assets and fonts were measured would break the site. Add one only after a real page loads its scripts, styles, and fonts, and only with a report of what it blocks.

HSTS preload is not set. Do not add `preload` on a review host.

The local preview sends the same noindex and baseline headers, and `Cache-Control: no-store`, so a reviewer does not cache a stale file.

## The index switch is two switches

While `siteConfig.indexable` is false:

- Canonical URLs use the deployment origin: `VERCEL_PROJECT_PRODUCTION_URL` when that value is a hostname or an `https` URL, otherwise `https://crosscomm-website.vercel.app`.
- Pages send `noindex, follow`, including the HTML robots meta.
- `robots.txt` allows `/` and does not advertise a sitemap. A `Disallow: /` would hide the noindex tag. Do not add it.
- `sitemap.xml` is still written, so a person can read the URL list, and its locations use the review origin. It is not linked from `robots.txt`. The 404 is not in it. `llms.txt` says the build is a review build marked noindex.

Search engines can still fetch a noindex URL. `noindex` is not a lock, and it is not authentication.

Cutover, later and only with the owner's approval, has to change both of these or the stricter one wins:

1. Set `siteConfig.indexable` to true, so canonicals move to `https://www.crosscomm.com` and `robots.txt` advertises the sitemap.
2. Remove or replace the `X-Robots-Tag: noindex, follow` header in `vercel.json`.

Do that on the approved host only. Do not flip it to make a preview look "more real". The local check fails if only one of the two changes. The current files keep `indexable` false and `X-Robots-Tag: noindex, follow`.

## Rollback

Vercel keeps earlier deployments. The bootstrap production deployment is `dpl_J79UdCgz8o1PCTMvQm6Kq3sSEy3s` at https://crosscomm-website-4q64hcyjf-the-aie.vercel.app, source `024ed0c303bcf294a828b0bd4c8ab70c4370ec95`. While SSO protection is on, check a rollback target in a browser that is already signed in. Do not use the manual deployed-smoke workflow for that. It cannot authenticate, and creating a bypass secret is not allowed.

Prefer a revert through a new pull request so `main` matches what is served. Promoting an old deployment in the Vercel UI without changing `main` leaves Git ahead. The next Git deployment can put the bad version back.

`version.json` on the deployment is the SHA to compare with the commit you think is live.

## Personal project, team project, import, transfer

No Vercel seat was granted to Macie by this folder.

| Choice | What happens | What to watch |
| --- | --- | --- |
| Leave the project on the account that already linked the repo | Previews keep working for people who can see that account | Macie needs a GitHub invite and a Vercel identity that can open the protected preview. Dashboard edit rights are a separate, narrower grant. Neither invite is done. |
| Import the same Git repository into a new Vercel project | A second project builds the same commits | Two projects can both try to own a domain later. Do not attach crosscomm.com to either one now. An import does not rewrite `configuredDeploymentOrigin` or `githubRepo` in `client/src/site-config.ts`. |
| Transfer the project to a team | The project moves, including deployment history, the Git link, domains, and most environment variables. Integrations, logs, and some attached resources do not all come along. | Re-authorize Git, check who can author a private-repo deploy, re-link the local CLI, and confirm the Git link still points at this repository. A transfer is an ownership change, not a copy. Do not do it now. |
| Duplicate or use a template | You get the files at one moment | You do not get issues, deployment history, or the linked project |

Build settings on any new project must match the table above: frozen pnpm install, `pnpm run build`, output `dist/public`, framework Vite. Do not switch the output to the Vite default `dist` or to an SPA preset. An SPA preset is how a missing URL becomes a 200 homepage.

GitHub access is a separate decision, described in [MACIE-HANDOFF.md](MACIE-HANDOFF.md). A private fork is not a public fork. A collaborator seat is the normal way to work in this repo. Transferring the GitHub repository moves ownership. Do that only if ownership should move, and expect to reattach Vercel and any later domain.

A fork, import, or duplicate keeps the old feedback destination until someone changes it. In `client/src/site-config.ts`, set `githubRepo` to the new repository and review `configuredDeploymentOrigin`. Leave `publicOrigin` as the public site, and do not set `indexable` to true as part of the copy. Update `CODEOWNERS`. Recreate the issue labels the templates name (`website-report`, `bug`, `content-correction`, `suggestion`). Open a feedback draft and confirm it targets the new repository. A Vercel import does not edit those source values. This receipt does not include a list of labels currently on the GitHub repository.

## Domains

Not now. The user asked for a starter review site, not the production cutover. Do not add crosscomm.com, do not edit DNS, and do not issue a cutover certificate as part of review.

When that work is approved, decide apex versus www first (the legacy list is apex; `publicOrigin` is www), attach the domain only to the chosen project, keep the noindex header until the index decision is explicit, and keep a tested rollback deployment. Details of the URL map are in [MIGRATION.md](MIGRATION.md).

## What the bootstrap receipt does not cover

See [RELEASE-EVIDENCE.md](RELEASE-EVIDENCE.md). It does not cover a later documentation pull request, a hosted mobile axe pass, an exhaustive hosted route crawl, the manual deployed-smoke workflow, Macie's invites, or a CDN field measurement. Local Lighthouse compression is not proof of what the Vercel CDN sends. Do not change `noindex` to chase a higher SEO category.
