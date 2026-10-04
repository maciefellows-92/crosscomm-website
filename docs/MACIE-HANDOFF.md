# Handoff for Macie Fellows

4 October 2026. This is the guide for reviewing the new CrossComm site with the team. It does not create a GitHub account or a Vercel seat. The website itself has no visitor login.

## What you are looking at

A private review copy of a new CrossComm website. Fifteen pages are built and can be clicked: home, five services, three case studies, approach, insights, contact, and careers. The public site at crosscomm.com is unchanged. This copy asks crawlers not to index it. A crawler can still fetch a noindex page. That is not the same as a lock, and it is not a sign-in wall.

The request was a site good enough to review. It was not a request to switch the domain.

## How you get in

Ask Mark for your GitHub username on the private repository `mrhinkle/crosscomm-website`, and for the identity on your Vercel account so you can open the protected preview. Those are different invites. GitHub access does not open https://crosscomm-website.vercel.app. Write access on the repo lets you open branches and pull requests. You do not need to be an admin. Permission to view the protected preview is separate from permission to change the hosting dashboard. Neither invite has been sent. The request is [issue 4](https://github.com/mrhinkle/crosscomm-website/issues/4).

Start here:

1. [README.md](../README.md) for how to run the site.
2. [design.md](../design.md) for color, type, layout, and components.
3. [CONTENT-GUIDE.md](CONTENT-GUIDE.md) for changing a sentence without inventing a fact.
4. [FEEDBACK.md](FEEDBACK.md) for how a comment becomes a change.
5. [DEPLOYMENT.md](DEPLOYMENT.md) for previews, merge, rollback, and a later domain.
6. [BACKLOG.md](BACKLOG.md) for decisions that are still open.

## What you can do

- Read the five services and three case studies against the live CrossComm pages. Flag anything that overclaims. The copy avoids new numbers. It can still be wrong.
- Edit the typed records and open a pull request. A preview build is how the team sees the change before it is merged.
- Use **Report a problem** on any page. You can read the note, copy it, download it, or open a GitHub draft. You still submit the draft yourself. The site does not file it.
- Contact is an email link, a phone link, and a link to CrossComm's existing contact form. This site does not store the message. Nothing is sent until the visitor sends it from their own mail app.

## What is still open

- Legal and privacy pages. Customer policy text was not copied.
- Permission to keep the case-study photographs on a public site.
- A place for consultation leads to arrive, beyond the visitor's own email app.
- Search Console and analytics for the current crosscomm.com site can start before this review host is indexed. Indexing this review host is a separate approval. Semrush did not return numbers on 4 October 2026. The tools failed. That is not a traffic figure.
- The domain is not connected.

## If the repository should move

| Choice | What you get | What to remember |
| --- | --- | --- |
| Collaborator on this repo | Branches, pull requests, the same issues and the same Vercel previews | This is the normal way to review |
| Private fork | A linked copy, only if forking is allowed and you already have access | It stays in the upstream private network. Losing upstream access can delete the fork. You cannot make it public on your own, and you cannot transfer that fork as its own repository. |
| Duplicate or template | A new repository you can own, with the files from one moment | You do not get issues, deployment history, or the Vercel project. It needs its own GitHub connection and its own Vercel project. Change `githubRepo` and review `configuredDeploymentOrigin` in `client/src/site-config.ts`, or feedback drafts still open `mrhinkle/crosscomm-website`. Do not turn indexing on. Update `CODEOWNERS`, recreate the issue labels, and open one draft to confirm the new repository. |
| Transfer | The original repository moves to the new owner, history included | This is a normal ownership handoff, not a scratch copy. The recipient must not already have a repo or fork with the same name. Vercel and any later domain are transferred or reattached on purpose. The same `githubRepo` and deployment-origin edits apply if the repository name or the review host changes. A Vercel import does not rewrite those values. |

Details of the Vercel side are in [DEPLOYMENT.md](DEPLOYMENT.md). Do not copy an `.env` file from someone else's machine.

## What to review first

Read the three case studies and the five service pages. Then decide which deferred URLs, if any, should come over before a domain change. The map is [MIGRATION.md](MIGRATION.md): 15 paths kept, 123 left as 404. Do not send every old URL to the homepage.
