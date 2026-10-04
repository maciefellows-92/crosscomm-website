# Feedback

Prepared 4 October 2026. A visitor can prepare a report. The site does not file it.

## The loop

1. The visitor opens **Report a problem** on a page.
2. They choose bug, content correction, or suggestion. They write what happened. Expected behavior is optional.
3. The dialog shows the report as text. They can copy it or download it.
4. **Open issue draft in GitHub** opens GitHub's new-issue page with the title and body filled in. The visitor still has to press submit on GitHub. If they are not signed in, or they do not have access to the private repository, GitHub will stop them. That is expected. Copy and download still work.
5. A person with access triages the issue.
6. The fix is a branch and a pull request. Vercel may build a preview. GitHub Actions runs the quality checks. Those are separate. See [DEPLOYMENT.md](DEPLOYMENT.md).
7. Someone other than the author reviews it when that is possible.
8. After merge, open the deployment, confirm the page, and close the issue with the URL or the commit.

No step sends the report by itself. There is no email gateway, no GitHub token, and no success message that says the issue was created.

## What is included

- Report type
- Description
- Expected behavior, or the words "Not provided."
- Page path
- Viewport, such as `1440x900`
- Release id from the build (`version.json`)

## What is not included

Query strings, URL hashes, form fields, cookies, logs, screenshots, and account data.

A visit to `/contact/?utm=should-not-appear#private` stores `/contact` (or `/contact/`, whichever path the page recorded). It must not store `should-not-appear`.

## Limits

Counted in Unicode code points, not UTF-16 units:

| Field | Maximum | Over the maximum |
| --- | ---: | --- |
| Description | 1,200 | The report is invalid. The text is not shortened. |
| Expected behavior | 400 | Same. |
| Encoded GitHub draft URL | 7,000 characters | The report can still be valid. The draft control is disabled. The dialog tells the person to copy or download. The body is not trimmed to fit the URL. |

An empty description is invalid. The release id has to be 1 to 64 characters from `A-Z`, `a-z`, `0-9`, `.`, `_`, and `-`. A missing release is an error, not a silent `"local"` inside the report.

Suggested labels, written into the report, are `website-report` plus `bug`, `content-correction`, or `suggestion`. The GitHub issue templates in `.github/ISSUE_TEMPLATE/` use those labels. Creating the labels in the repository, if they do not exist yet, is a coordinator step. The templates are Markdown files with YAML frontmatter, not GitHub issue forms.

The draft control's accessible name is exactly **Open issue draft in GitHub**. The address starts with `https://github.com/mrhinkle/crosscomm-website/issues/new?`.

## The dialog is on the page

The rules above are implemented in `client/src/lib/feedback.ts` and locked by unit tests. The report dialog is in the footer of the review site. It opens from "Report a problem", keeps the draft in a preview, and offers copy, download, and an issue draft link. Nothing is filed until the visitor submits that draft on GitHub. Browser tests cover open, close, focus return, the preview, copy, download, and the disabled draft when the URL is too long. A green remote run of those tests is still a receipt the coordinator has to attach. This file does not claim that receipt.

## Server filing is optional and not built

A later server route could create the issue with a token that lives in Vercel, not in the browser and not in this repo. That is a backlog item, not this starter.

If it is built later:

- The visitor's browser must not choose the repository or the token.
- Success is allowed only after GitHub accepts the issue.
- Failure must say the issue was not created, and copy or download must still work.
- The report text is untrusted. Nothing should automatically implement it.
- A rate limit that exists only inside one warm serverless instance is not abuse protection. Do not describe it as one.

Until that exists, the honest path is the draft link plus the file.
