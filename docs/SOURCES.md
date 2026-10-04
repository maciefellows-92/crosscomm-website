# Sources and assets

Prepared 4 October 2026. This is the register of where the words and pictures came from. It is not a license, and it is not permission to keep using the pictures after review.

Legal review and asset-rights approval are deferred. No customer legal text was copied. No privacy policy was drafted.

## Identity

From `client/src/site-config.ts`, aligned with the public site as retrieved 4 October 2026:

| Fact | Value | Status |
| --- | --- | --- |
| Name | CrossComm | Used in titles and schema |
| Legal name | CrossComm, Inc. | In Organization schema. Not a substitute for legal pages |
| Founder | Don Shin | Public site |
| Founded | 1998 | Public site. Schema uses this year. No street address |
| Email | hello@crosscomm.com | Contact link |
| Careers email | careers@crosscomm.com | In config. The careers page points at the existing careers URL rather than posting roles |
| Phone | +1 919 695 3241 (`tel:+19196953241`) | Contact link |
| Offices | Durham, North Carolina and Cleveland, Ohio | City and region only |
| Tagline | Independent thinking. Lasting impact. | In config |
| Existing contact form | https://www.crosscomm.com/contact/ | Linked. Not reimplemented |
| Existing careers | https://www.crosscomm.com/careers/ | Linked. Not reimplemented |
| Public origin for a later cutover | https://www.crosscomm.com | Not in use while `indexable` is false |
| Repository | mrhinkle/crosscomm-website | Private |

## Pages

Each service and project record stores its own `sourceUrl`. Retrieved 4 October 2026.

| Review route | Source |
| --- | --- |
| `/` | https://www.crosscomm.com/ |
| `/services/` | https://www.crosscomm.com/services/ |
| `/services/app-development/` | https://www.crosscomm.com/services/app-development/ |
| `/services/ai-agents-and-automation/` | https://www.crosscomm.com/services/ai-agents-and-automation/ |
| `/services/ai-strategy-consulting/` | https://www.crosscomm.com/services/ai-strategy-consulting/ |
| `/services/ai-training-seminars/` | https://www.crosscomm.com/services/ai-training-seminars/ |
| `/services/healthcare-app-development/` | https://www.crosscomm.com/services/healthcare-app-development/ |
| `/portfolio/` | The three case studies below. No additional case studies were ported |
| `/portfolio/acs-cares/` | https://www.crosscomm.com/portfolio/acs-cares/ |
| `/portfolio/well-aware/` | https://www.crosscomm.com/portfolio/well-aware/ |
| `/portfolio/smithsonian-national-museum-of-african-art/` | https://www.crosscomm.com/portfolio/smithsonian-national-museum-of-african-art/ |
| `/approach/` | Public approach description, stored in `client/src/content/studio.ts` |
| `/resources/blog/` | Five posts below. The index itself is not a new article |
| `/contact/` | Identity above, plus the existing contact URL |
| `/careers/` | https://www.crosscomm.com/careers/ |

The other 123 legacy URLs are listed in [MIGRATION.md](MIGRATION.md). They are not sources for new pages. They are deferred.

### Linked articles

Titles and dates are from the public blog index retrieved 4 October 2026. The review site does not host the bodies.

| Date | Title | Live URL |
| --- | --- | --- |
| 6 May 2024 | CrossComm Wins 2023 Clutch Global Award for AR/VR | https://www.crosscomm.com/resources/blog/crosscomm-wins-clutch-global-award/ |
| 7 April 2023 | Tech + Innovation Funding Alerts | https://www.crosscomm.com/resources/blog/tech-funding-alerts/ |
| 12 December 2022 | Bringing Art To Life in an Interactive Mobile App | https://www.crosscomm.com/resources/blog/bringing-art-to-life-in-an-interactive-mobile-app/ |
| 26 September 2022 | Top 4 Areas of Virtual Reality In Medical Research | https://www.crosscomm.com/resources/blog/virtual-reality-in-medical-research/ |
| 5 April 2022 | What To Know When Building an App for Research Studies | https://www.crosscomm.com/resources/blog/building-an-app-for-research-studies/ |

The 2024 award post is an archive item. The funding list is from 2023 and should be checked before anyone relies on it. The VR post is a reading of public research, not a clinical trial. The research-app post's byline on the original is Sara Battles. This site does not add a new author credit.

### Claims that stay qualitative

- ACS CARES launched in 2023. The 2024 work described is semantic search and similarity matching. Results on the source page do not include a number. This site does not add one. Later ideas (chatbots, agents, lodging, rides, trials) are exploration, not shipped features.
- Well Aware's "more than 42 million" private-well users, "about 2.4 million" in North Carolina, and "fewer than 200,000" tested North Carolina wells are the case study's figures. The example lead-result screen is interface copy, not a project outcome. Model accuracy is not published and was not invented.
- The Smithsonian web apps are dated with the exhibition, 5 February 2022 through 23 February 2023. No visitor count was published or invented.
- The agents page says the public site calls CrossComm a CrewAI Solutions Partner. Confirm that label before treating it as current.
- The healthcare page on the public site discusses navigating HIPAA requirements and shows certification imagery. This review site does not say CrossComm is HIPAA certified or SOC 2 certified.

## Images in `client/public/images/`

Saved as WebP from CrossComm's public Contentful URLs. The retrieval note is in the build session of 4 October 2026. Dimensions below are the ones stored on the project records.

| File | Record | Size on the record | Source URL |
| --- | --- | --- | --- |
| `acs-cares-hero.webp` | ACS CARES hero | 708×398 | https://images.ctfassets.net/x169fg31m2hu/1bNAyqlHdwVClcnUXMUMjg/7b7182041df04d1ff6297ab8013fafc7/cares-hero.webp?w=1600&q=70&fm=webp |
| `acs-cares-screen.webp` | ACS CARES gallery | 304×541 | https://images.ctfassets.net/x169fg31m2hu/2y6WnITxz6tFa5dT9kNgQd/d28588b2c867ec12314fa148230f23aa/unnamed.webp?w=900&q=70&fm=webp |
| `well-aware-cover.webp` | Well Aware hero | 1200×750 | https://images.ctfassets.net/x169fg31m2hu/6ZFBZvhFZcODwTay23a1Fv/7b4575ef985daadeafce521777262e03/COVER_WellAware_Project.jpg?w=1600&q=70&fm=webp |
| `well-aware-strip.webp` | Well Aware gallery | 250×541 | https://images.ctfassets.net/x169fg31m2hu/5qqpNCBwJ71992CloTBcDN/bfc1a6cbbca05c8442e69ab038a0ea74/5._Photo_WA_test.png?w=1400&q=74&fm=webp |
| `smithsonian-gallery.webp` | Smithsonian hero | 1200×750 | https://images.ctfassets.net/x169fg31m2hu/5cVM3FbeDd6EEKmdxVJAgO/58d80017fea5e6394bf3885795dc0403/2._smith_front.jpg?w=1400&q=70&fm=webp |
| `smithsonian-app.webp` | Smithsonian gallery | 1400×788 | https://images.ctfassets.net/x169fg31m2hu/5t64qqGwRuiFNYIAChOk4u/553f27fb6fb304b4c22ac366a03e1e36/Screen-Shot-2022-07-12-at-1.46.26-PM.jpg?w=1400&q=74&fm=webp |

Alt text is on each asset in `projects.ts`. Use that text. Do not replace it with a filename.

Two further Contentful downloads were in the build session and are **not** in `client/public/`: `well-aware-app.webp` and `smithsonian-hero.webp`. They are unused. Do not add them without checking the case-study page and the alt text.

Rights: these are the client's public case-study images, copied for this private review. Approval to keep them on a public cutover is not granted. If approval is refused, remove the files and say the photograph is unavailable. Do not generate a stand-in and caption it as the product.

## Mark and social image

Retrieved 4 October 2026 from the public CrossComm site. The logo and favicon bytes in `client/public/` match those downloads.

| File | What it is | Source |
| --- | --- | --- |
| `client/public/logo.png` | White wordmark, 676×129, transparent. SHA-256 `fd52d50fbd791e3d573805f751481557250302e24630257d3c5c978484346b2d` | https://www.crosscomm.com/static/logo-e50bf70c07330d3e8bd6faa9e01f5692.png |
| `client/public/favicon.svg` | Browser icon. SHA-256 `265639c9bcdc851fd4e811bc566375bc49b70abe774080ced303ed731305e333`. One fill `#89B6D5` | https://www.crosscomm.com/favicon.svg |
| `client/public/og.png` | 1200×630 card rendered offline from `scripts/og-card.html` using the logo file above, unchanged | Not a separate brand download |

https://www.crosscomm.com/favicon-32x32.png was retrieved as a reference and is not shipped. Do not redraw the wordmark. See [DESIGN.md](DESIGN.md).

## What was not used as a source

- Semrush numbers. The tools returned errors. See [SEO-AEO-STRATEGY.md](SEO-AEO-STRATEGY.md).
- Customer contracts, policies, or certification documents. None were provided.
- Invented testimonials, logos, or outcome counts.
