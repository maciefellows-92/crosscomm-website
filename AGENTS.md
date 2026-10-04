# Agent notes

This file is for a later coding agent in the CrossComm repository. It is not permission to deploy, to change DNS, or to invite people.

- Read [README.md](README.md) and [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) before editing.
- The review build is `noindex`. Do not flip `siteConfig.indexable` or remove the `X-Robots-Tag` header unless the owner asked for the cutover in that pull request.
- Bootstrap release evidence is [docs/RELEASE-EVIDENCE.md](docs/RELEASE-EVIDENCE.md). Do not cite it for a later commit.
- Do not add a single-page catch-all rewrite. `vercel.json` has no `rewrites`.
- Feedback is a draft, a copy, or a download. Never describe it as sent.
- Do not invent proof, legal text, or environment variables. Do not read `.env.local` or print secrets.
- Content lives in `client/src/content/`. Pages should read those records.
- `client/src/generated/build-meta.ts` is generated and gitignored. `scripts/ensure-build-meta.ts` writes a local fallback when the file is missing, and `pnpm build` rewrites it. Edit the writer in `scripts/build.ts`, not a one-off SHA.
- Tests belong in `tests/` and `e2e/`. Prefer a visitor's actions over a snapshot of markup classes.
- Node 24, pnpm 10.33.0, `pnpm install --frozen-lockfile`.
- CI is `.github/workflows/quality.yml`. Do not use `pull_request_target`. Pin new actions to a commit you verified.
- The author of a change does not approve it. Another person, or another vendor's agent, reviews.
- Do not commit, push, or deploy unless the owner asked for that action in the same request.
