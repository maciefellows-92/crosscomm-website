# Backlog

Prepared 4 October 2026. The open tracker is https://github.com/mrhinkle/crosscomm-website/issues (twelve issues). [backlog.json](backlog.json) is the archived seed that those issues were opened from. Edit GitHub, not the seed, when a decision changes. The seed titles below are kept so the archive stays readable. Where GitHub used a shorter title, the issue link says so. This receipt does not include a label inventory. The issue templates still ask for `website-report`, `bug`, `content-correction`, and `suggestion`.

P1 is what has to be decided before a domain cutover. P2 is growth after the review site is in use. Neither list is a claim that the starter is already the live site.

## P1 — cutover

### Decide every legacy URL before cutover

Open as [issue 1](https://github.com/mrhinkle/crosscomm-website/issues/1).

Acceptance: each of the 138 inventoried URLs has an approved destination or an explicit 404, with no rule that sends unrelated URLs to the homepage. The index switch, if approved, flips `siteConfig.indexable` and the `X-Robots-Tag` header together, and only on the approved host.

User impact: old bookmarks and search results either land on the right page or fail honestly.

Effort: a review of the 123 deferred URLs, then redirects only where a destination is named. Days to a couple of weeks.

Owner: Mark decides destinations. Macie can draft the map after she has access. An engineer implements the redirects.

### Approve legal and privacy text

Open as [issue 2](https://github.com/mrhinkle/crosscomm-website/issues/2).

Acceptance: the owner supplies the privacy and terms text, or explicitly says those pages stay off the site. No customer legal text is pasted in without that approval.

User impact: visitors either see approved policies or no fake policy pages.

Effort: small once the text exists. Blocked until then.

Owner: Mark, with whoever at CrossComm owns the legal wording.

### Replace cutover self-links before any DNS switch

Open as [issue 12](https://github.com/mrhinkle/crosscomm-website/issues/12), titled there "Resolve existing-site links before switching the domain." Contact, careers, original case-study links, and the deferred insight URLs are that issue. This review starter does not switch DNS.

Acceptance: before a domain points at this host, the contact page no longer sends people to `www.crosscomm.com/contact/`, careers no longer sends them to `www.crosscomm.com/careers/`, each "Original case study" link no longer points at the page they are already on, and the five insight links no longer point at deferred URLs that 404 on this host. This review starter does not switch DNS.

User impact: after cutover, a visitor can still reach a real lead form, the original case study if it remains elsewhere, and the articles. They do not loop back onto the same page or a 404.

Effort: small once the replacement URLs are named. Blocked on those destinations.

Owner: Mark names the destinations. Engineering updates the typed records. Do not change DNS in that pull request.

### Keep the report dialog off a public host, or replace it

Not a separate open issue. On an indexable build the report launcher is already hidden, so a public visitor is not sent to the private repository. A public intake path, if Mark wants one, is [issue 11](https://github.com/mrhinkle/crosscomm-website/issues/11).

Acceptance: a public, indexable host does not offer a GitHub draft that opens the private repository `mrhinkle/crosscomm-website` for visitors who have no access. The launcher stays on the review build, or cutover replaces it with a path that works for the public. Copy and download remain available. The page still does not say a report was filed.

User impact: a visitor on the live site is not sent to a private-repo 404.

Effort: small if the launcher is hidden when `indexable` is true. Medium if a public intake path is built.

Owner: Mark decides which path the live site uses.

### Deliver consultation leads to a person

Open as [issue 3](https://github.com/mrhinkle/crosscomm-website/issues/3).

Acceptance: a test message arrives at the chosen inbox or CRM, and the page tells the truth when delivery is not configured. This review site only opens the visitor's mail app.

User impact: a consultation request is not lost, and the site does not claim a message was received when it was not.

Effort: medium, after a destination is chosen.

Owner: Mark chooses the destination. Engineering wires it. Do not add a secret during review.

### Grant Macie Fellows access to the private repository

Open as [issue 4](https://github.com/mrhinkle/crosscomm-website/issues/4). Protected-preview access is part of this issue, not a separate one. It is not done.

Acceptance: Macie can open this private repository and a pull request, and she can open https://crosscomm-website.vercel.app while deployment protection is on. Mark needs her GitHub username and the identity on her Vercel account. Viewing the protected preview is separate from permission to edit the hosting dashboard. A private fork is not a substitute. It stays tied to upstream access and cannot be transferred on its own.

User impact: she can review the site and propose changes. GitHub access alone leaves the preview on a login wall.

Effort: small. Two invites, neither sent by this document.

Owner: Mark.

### Confirm rights to the case-study images

Open as [issue 5](https://github.com/mrhinkle/crosscomm-website/issues/5).

Acceptance: the six WebP files may stay on a public site, or they are removed. Generated stand-ins are not captioned as the client's product.

User impact: the case studies show permitted photographs or they do not pretend to.

Effort: a decision, blocked on the owner.

Owner: Mark, confirming with CrossComm.

### Measure the current site, and index the review host only with approval

Open as [issue 6](https://github.com/mrhinkle/crosscomm-website/issues/6).

Acceptance: Search Console and analytics for the existing crosscomm.com site can start before this review host is indexed. Indexing the review host still needs an explicit approval. There is no Semrush baseline yet. The 4 October 2026 calls failed. They are not metrics.

User impact: the team can learn from the current site without putting the review copy into Google.

Effort: medium. The current-site baseline does not wait on cutover.

Owner: Mark approves any new property and the review-host index switch. Macie runs the weekly review once she has access.

## P2 — growth

### Add expert bios and author bylines

Open as [issue 7](https://github.com/mrhinkle/crosscomm-website/issues/7).

Acceptance: a named person approves their bio. Existing posts keep their original bylines.

User impact: a reader can see who stands behind a new article.

Effort: medium.

Owner: Macie drafts. Each expert approves their own bio.

### Publish sourced outcomes or keep results qualitative

Open as [issue 8](https://github.com/mrhinkle/crosscomm-website/issues/8).

Acceptance: new numbers appear only when the client and the source support them.

User impact: proof gets stronger only when it is real.

Effort: medium to large.

Owner: Macie can draft. CrossComm and the client approve any new number.

### Capture a SEMrush baseline from a working export

Open as [issue 9](https://github.com/mrhinkle/crosscomm-website/issues/9). SEMrush numbers are still unavailable. A failed export is not a traffic figure.

Acceptance: a saved US desktop and mobile export with region, device, and retrieval date. ERROR 120 and WouldBlock are not that export.

User impact: keyword choices can be checked against demand.

Effort: small once the connection works. Do not buy a plan from this task.

Owner: Mark restores access. Macie files the export.

### Decide whether the site needs a CMS

Open as [issue 10](https://github.com/mrhinkle/crosscomm-website/issues/10).

Acceptance: typed files stay, or the owner names a CMS and who will run it.

User impact: editors know where a sentence changes.

Effort: a decision. Building one is a separate project.

Owner: Mark decides. Macie can recommend after she has edited the files.

### Evaluate authenticated feedback intake for external reviewers

Open as [issue 11](https://github.com/mrhinkle/crosscomm-website/issues/11). This is the follow-up if a public visitor needs a way to send a note. The review site already hides the private-repo launcher when the build is indexable. Do not open a second issue for that hide.

Acceptance: a reviewer without a GitHub seat gets a receipt only after the server has stored or delivered the report. Any credential stays on the server, and only if Mark approves one. The route needs abuse protection that survives a cold start, and the dialog says what will be sent before the person agrees. Copy and download remain the fallback. The page does not say a report was filed if it was not.

User impact: someone outside the repository can send a note, and can still keep a copy if that path is down.

Effort: medium, and optional.

Owner: Mark decides whether a server credential is allowed. Engineering implements it.
