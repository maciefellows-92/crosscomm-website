# Contributing

The repository is private: `mrhinkle/crosscomm-website`. Only people the owner invites can open a branch or a pull request.

## The loop

1. Start from a GitHub issue. A visitor report is not an issue until a person submits it. The site never sends one by itself.
2. Make a branch. Do not work on `main`.
3. Open a pull request. GitHub Actions runs the quality workflow. Vercel, if the coordinator's link is still in place, builds a preview. Those are separate. A red check does not by itself stop Vercel. See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).
4. Someone other than the author reviews the change when that is possible.
5. Merge only after that review. Then open the deployment, confirm the page, and close the issue with the URL or the commit.

## Rules that keep the review site honest

- Leave `siteConfig.indexable` false unless the pull request is the approved cutover.
- Do not add a rewrite that sends every unknown URL to `index.html`. Unknown URLs must be 404.
- Do not add a form that says a message was sent. Email opens the visitor's mail app. Feedback opens a draft or a download.
- Do not invent metrics, testimonials, prices, or certifications.
- Do not add privacy or terms pages until the owner supplies the text.
- Do not commit `.env`, `.vercel`, tokens, or logs.
- Keep tests about what a person can see and do. Do not assert private function structure.

## Commands

`pnpm install --frozen-lockfile`, then `pnpm check` before you ask for review. Node 24, pnpm 10.33.0.

If you only changed docs, still run `pnpm typecheck`, `pnpm lint`, and `pnpm test`. Say so in the pull request if you could not run the browser tests.
