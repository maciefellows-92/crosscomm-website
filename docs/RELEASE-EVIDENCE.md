# Release evidence

Recorded 4 October 2026 from a read-back of the source, GitHub Actions, Vercel, and an already signed-in browser. This file is the bootstrap record for commit `024ed0c303bcf294a828b0bd4c8ab70c4370ec95`. It is not a receipt for a later documentation pull request or for any merge after that commit. Those receipts belong in the pull request and the final handoff when they exist. Do not treat them as passed.

## Source that was tested

The local checks ran on `024ed0c303bcf294a828b0bd4c8ab70c4370ec95`. The tracked tree was clean before and after that check.

| Check | Result |
| --- | --- |
| Typecheck, lint, actionlint, build, prerender smoke | Passed |
| Unit tests | 36 passed |
| Browser tests | 26 passed, 2 skipped |
| Skip reason | The desktop first-viewport check and the desktop page-axe sample do not run on the mobile project. Dialog axe runs on both viewports. |

Lighthouse on the local preview, mobile, with the preview's own gzip or Brotli negotiation: performance 95, accessibility 100, best practices 100, SEO 69. The SEO category is held down because the review host is `noindex` on purpose. This is not field data and not a measurement of the Vercel CDN.

## GitHub Actions

The quality job succeeded for head `024ed0c303bcf294a828b0bd4c8ab70c4370ec95`. That recorded head is the same SHA as the source above and as the production deployment. This record does not describe a different synthetic merge commit.

- Run: https://github.com/mrhinkle/crosscomm-website/actions/runs/37240279415
- Job `quality`, id `111547450088`, success, started 2026-10-04T22:30:37Z, completed 2026-10-04T22:32:11Z: https://github.com/mrhinkle/crosscomm-website/actions/runs/37240279415/job/111547450088
- Steps that succeeded include checkout, frozen install, workflow lint, typecheck, lint, unit tests, build, prerender smoke, Playwright install, browser tests, and evidence upload.

GitHub marked the commit verification as unverified. The author login on the deployment is `aie-agent-lanes-grok[bot]`. The message was `fix: strengthen review-site quality and handoff safeguards`.

## Deployment

Production deployment `dpl_J79UdCgz8o1PCTMvQm6Kq3sSEy3s` is `READY`. Immutable URL: https://crosscomm-website-4q64hcyjf-the-aie.vercel.app. Current `main` aliases include https://crosscomm-website.vercel.app, https://crosscomm-website-the-aie.vercel.app, and https://crosscomm-website-git-main-the-aie.vercel.app.

Git source on that deployment: GitHub `main`, SHA `024ed0c303bcf294a828b0bd4c8ab70c4370ec95`, no pull-request id. Project settings match the repo: Node 24.x, `pnpm install --frozen-lockfile`, `pnpm run build`, output `dist/public`, framework Vite. No build error was recorded.

The deployment is SSO-protected. A login page or a 401/403 is not a pass.

## What the signed-in browser checked

Checked in an existing signed-in Chrome session. The extension could not drive the tab, so the check used the browser's own interface. No bypass secret or share link was created.

- Homepage content, image, and navigation, with HTTP 200 in the network panel.
- `version.json` release matches `024ed0c303bcf294a828b0bd4c8ab70c4370ec95`, `indexable` is false, and `canonicalOrigin` is `https://crosscomm-website.vercel.app`.
- The healthcare service page opens directly, and a click reaches the ACS CARES case study.
- Feedback opens, records the real pathname, viewport, and release, previews a draft, and links the private repository. No issue was submitted.
- An unknown path shows the missing page, and the console shows that request returned 404.

Not run on the host: the manual deployed-smoke workflow, because it cannot sign in through the protected URL without new access. The local and GitHub browser suites passed. A separate hosted mobile axe pass and an exhaustive hosted route suite were not run.

## Branch protection read back from GitHub

`main` on `mrhinkle/crosscomm-website` has classic protection. This is the API read-back, not a written wish.

| Setting | Observed |
| --- | --- |
| Pull request required | Yes. `required_approving_review_count` is 0. |
| Code owner review | Not required. |
| Last-push approval | Not required. |
| Dismiss stale reviews | Off. |
| Required status check | Context `quality`, strict (branch must be up to date). |
| Enforce for admins | On. |
| Conversation resolution | Required. |
| Force pushes | Off. |
| Deletions | Off. |

A required approving review of 1, a code-owner review, or last-push approval would deadlock a change while Mark is the only GitHub user who can approve. Zero approvals still requires a pull request and a green `quality` check. An independent review of the current head is still required as process evidence. Mark confirms that evidence before merge. `Deployed smoke` is not a required check. It is manual and cannot pass the protected host without new access.

## Still not done

Macie Fellows does not yet have repository or protected-preview access. The usable review URL is https://crosscomm-website.vercel.app. Seeing it requires a Vercel identity Mark invites. GitHub access alone does not open a protected deployment. Issue [#4](https://github.com/mrhinkle/crosscomm-website/issues/4) tracks both invites.

Open decisions are the twelve GitHub issues at https://github.com/mrhinkle/crosscomm-website/issues. [BACKLOG.md](BACKLOG.md) links them. [backlog.json](backlog.json) is the archived seed, not a second tracker.
