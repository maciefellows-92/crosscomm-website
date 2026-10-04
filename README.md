# CrossComm review site

This is the private review site for a new CrossComm website. You can click through fifteen pages: home, five services, three case studies, approach, insights, contact, and careers. It is not the live site at [crosscomm.com](https://www.crosscomm.com/). Search engines are asked not to index this copy. Visitors do not sign in. There is no account on the site itself.

The other known CrossComm URLs are listed and left alone. They are not redirected to the homepage.

## Reviewing and editing

Ask Mark Hinkle for two invites if you cannot already open the site. Your GitHub username is for the private repository `mrhinkle/crosscomm-website`. The identity on your Vercel account is for the protected preview. GitHub access alone does not open https://crosscomm-website.vercel.app. Viewing the preview is separate from permission to edit the hosting dashboard. Write access on the repo is enough to open a branch and a pull request. Nothing in this folder grants either invite.

Once you can open the repo:

1. Read a page against the live CrossComm page it came from. [docs/CONTENT-GUIDE.md](docs/CONTENT-GUIDE.md) says where each sentence lives.
2. Change the typed record, not a generated HTML file. Open a pull request. Someone else reviews it. [docs/FEEDBACK.md](docs/FEEDBACK.md) is the same loop when the note starts from the on-page report.
3. Before merge, compare the preview `version.json` and the Vercel Git metadata with the current pull-request head, and wait for a green `quality` check on that head. After merge, compare production `version.json` with the `main` SHA. [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) covers hosting, rollback, and a later domain move. [docs/RELEASE-EVIDENCE.md](docs/RELEASE-EVIDENCE.md) is the bootstrap receipt.
4. [docs/MACIE-HANDOFF.md](docs/MACIE-HANDOFF.md) is the longer reading guide. [docs/BACKLOG.md](docs/BACKLOG.md) is what is still a decision, not a defect in the pages you can click.

## Running it locally

Node 24 (`.nvmrc`) and pnpm 10.33.0.

```bash
corepack enable
corepack prepare pnpm@10.33.0 --activate
pnpm install --frozen-lockfile
pnpm dev
```

| Command | What it does | Address |
| --- | --- | --- |
| `pnpm dev` | Vite dev server | http://127.0.0.1:5173 |
| `pnpm build` | Client bundle, server render, one HTML file per route | writes `dist/public` |
| `pnpm preview` | Static server for that folder. Unknown URLs are 404. It does not reuse a process already listening. | http://127.0.0.1:4187 |
| `pnpm test` | Unit tests | |
| `pnpm test:e2e` | Browser tests against the preview server | needs a build and Playwright's Chromium |
| `pnpm smoke` | Checks the built HTML | needs a build |
| `pnpm lighthouse` | One real Lighthouse run against the local preview. The preview compresses text. That is not a Vercel CDN measurement and not a pass/fail score. | needs a build and Chrome |
| `pnpm check` | Typecheck, lint, workflow lint, unit tests, build, smoke, browser tests | |

Playwright's browser is not in the lockfile. Install it once with `pnpm exec playwright install chromium`. The preview defaults to port 4187. Override it with `PREVIEW_PORT`. Do not attach this server to a process you did not start, and do not borrow another project's port.

## What is in the repository

Typed copy and routes, the pages, pictures in `client/public/`, the build, tests, GitHub Actions, and these docs. How a page is assembled is in [docs/PLAN.md](docs/PLAN.md).

## Status on 4 October 2026

The bootstrap receipt is [docs/RELEASE-EVIDENCE.md](docs/RELEASE-EVIDENCE.md), for `024ed0c303bcf294a828b0bd4c8ab70c4370ec95` only. The protected review URL is https://crosscomm-website.vercel.app. Macie's GitHub and Vercel invites are still pending. Legal pages, photograph permission, lead delivery, analytics, DNS, and indexing this host are still owner decisions. A later documentation change does not inherit this receipt.

Do not put secrets, `.env` files, or customer legal text in this repo.
