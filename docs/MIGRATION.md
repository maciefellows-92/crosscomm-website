# Migration

Prepared 4 October 2026. This is a map, not a redirect file. Nothing in this repository sends an old URL to the homepage.

## What was counted

The source list is `../research/legacy-urls.txt` in the research folder next to this checkout: 138 lines, captured 4 October 2026. The same 138 URLs are stored in `client/src/content/legacy-inventory.ts`. On 4 October 2026 the two lists matched: no URL only in the file, no URL only in the module, 138 unique paths.

The inventory uses the apex host `https://crosscomm.com`. The review site's configured public origin, for a later cutover, is `https://www.crosscomm.com` (`siteConfig.publicOrigin`). This document does not decide apex versus www. That choice is part of the domain work, which is not authorized yet.

## The decision

| Set | Count | What a request does on this review site |
| --- | ---: | --- |
| Preserved | 15 | The same path is a real page. `vercel.json` has `trailingSlash: true`, so `/contact` is redirected to `/contact/`. That slash redirect is not a content redirect. |
| Deferred | 123 | No page and no redirect. After the slash is normalized, the response is 404. The body is `404.html`, not the homepage, and the status is 404, not 200. |
| New public URLs | 0 | No extra marketing path was added. |

The 15 preserved paths are exactly `publicRoutes` in `client/src/content/routes.ts`. The unit test `tests/routes.test.ts` fails if those two sets drift.

`404.html` is the unknown-page template. It is not one of the 138 legacy URLs. Its canonical is the homepage. It is excluded from the sitemap.

There is no `redirects` array in `vercel.json`, and there is no catch-all rewrite to `index.html`.

## Pages that were considered and not added

The SEO strategy named a `/resources/` hub and five new articles. Neither became a route.

- Insights stay on the preserved path `/resources/blog/`. There is no separate `/resources/` page.
- The five article ideas are listed in [SEO-AEO-STRATEGY.md](SEO-AEO-STRATEGY.md). They are not written, and they are not URLs.
- The five older posts that the insights page links to are still deferred URLs on this host. The links go to `https://www.crosscomm.com/resources/blog/<slug>/` on the live site. This review site does not host those articles.
- Privacy, terms, and other legal pages were not created. Customer legal text was not copied.

Do not approve a rule that sends every deferred URL to `/`. A retired page can stay a 404, or it can move to one chosen replacement, one URL at a time, after someone names that replacement. A blanket homepage redirect throws away the information that the old address was a different page.

## Preserved paths

These are the pages a reviewer can open. The review route always ends in `/` except for `/`.

| Inventory path | Legacy URL | Review route |
| --- | --- | --- |
| `/` | https://crosscomm.com/ | `/` |
| `/contact` | https://crosscomm.com/contact | `/contact/` |
| `/careers` | https://crosscomm.com/careers | `/careers/` |
| `/services` | https://crosscomm.com/services | `/services/` |
| `/services/ai-agents-and-automation` | https://crosscomm.com/services/ai-agents-and-automation | `/services/ai-agents-and-automation/` |
| `/services/app-development` | https://crosscomm.com/services/app-development | `/services/app-development/` |
| `/services/ai-strategy-consulting` | https://crosscomm.com/services/ai-strategy-consulting | `/services/ai-strategy-consulting/` |
| `/services/ai-training-seminars` | https://crosscomm.com/services/ai-training-seminars | `/services/ai-training-seminars/` |
| `/services/healthcare-app-development` | https://crosscomm.com/services/healthcare-app-development | `/services/healthcare-app-development/` |
| `/resources/blog` | https://crosscomm.com/resources/blog | `/resources/blog/` |
| `/approach` | https://crosscomm.com/approach | `/approach/` |
| `/portfolio` | https://crosscomm.com/portfolio | `/portfolio/` |
| `/portfolio/acs-cares` | https://crosscomm.com/portfolio/acs-cares | `/portfolio/acs-cares/` |
| `/portfolio/well-aware` | https://crosscomm.com/portfolio/well-aware | `/portfolio/well-aware/` |
| `/portfolio/smithsonian-national-museum-of-african-art` | https://crosscomm.com/portfolio/smithsonian-national-museum-of-african-art | `/portfolio/smithsonian-national-museum-of-african-art/` |

## Deferred paths

Each of these is absent on purpose. Opening it on the review host should 404. Do not add a redirect until the owner picks a destination.

| Inventory path | Legacy URL | Review route |
| --- | --- | --- |
| `/ai-daily-brief` | https://crosscomm.com/ai-daily-brief | none — 404 |
| `/free-assessment/apple-vision-pro-development` | https://crosscomm.com/free-assessment/apple-vision-pro-development | none — 404 |
| `/web-ar-demos` | https://crosscomm.com/web-ar-demos | none — 404 |
| `/free-assessment/ar-vr-development` | https://crosscomm.com/free-assessment/ar-vr-development | none — 404 |
| `/free-assessment/healthcare-app-development` | https://crosscomm.com/free-assessment/healthcare-app-development | none — 404 |
| `/focusstem-live-2023` | https://crosscomm.com/focusstem-live-2023 | none — 404 |
| `/health-science-tech-huddle-subscription` | https://crosscomm.com/health-science-tech-huddle-subscription | none — 404 |
| `/thank-you` | https://crosscomm.com/thank-you | none — 404 |
| `/software-development-free-assessment` | https://crosscomm.com/software-development-free-assessment | none — 404 |
| `/free-assessment/mobile-development` | https://crosscomm.com/free-assessment/mobile-development | none — 404 |
| `/resources/blog/crosscomm-wins-clutch-global-award` | https://crosscomm.com/resources/blog/crosscomm-wins-clutch-global-award | none — 404 |
| `/resources/blog/tech-funding-alerts` | https://crosscomm.com/resources/blog/tech-funding-alerts | none — 404 |
| `/resources/blog/health-and-science-tech-digest-april-2023` | https://crosscomm.com/resources/blog/health-and-science-tech-digest-april-2023 | none — 404 |
| `/resources/blog/health-and-science-tech-digest-march-2023` | https://crosscomm.com/resources/blog/health-and-science-tech-digest-march-2023 | none — 404 |
| `/resources/blog/health-and-science-tech-digest-february-2023` | https://crosscomm.com/resources/blog/health-and-science-tech-digest-february-2023 | none — 404 |
| `/resources/blog/health-and-science-tech-digest-january-2023` | https://crosscomm.com/resources/blog/health-and-science-tech-digest-january-2023 | none — 404 |
| `/resources/blog/tech-for-good-award-win` | https://crosscomm.com/resources/blog/tech-for-good-award-win | none — 404 |
| `/resources/blog/health-and-science-tech-digest-december-2022` | https://crosscomm.com/resources/blog/health-and-science-tech-digest-december-2022 | none — 404 |
| `/resources/blog/bringing-art-to-life-in-an-interactive-mobile-app` | https://crosscomm.com/resources/blog/bringing-art-to-life-in-an-interactive-mobile-app | none — 404 |
| `/resources/blog/virtual-reality-in-medical-research` | https://crosscomm.com/resources/blog/virtual-reality-in-medical-research | none — 404 |
| `/resources/blog/speaking-from-user-experience-podcast` | https://crosscomm.com/resources/blog/speaking-from-user-experience-podcast | none — 404 |
| `/resources/blog/decade-of-growth` | https://crosscomm.com/resources/blog/decade-of-growth | none — 404 |
| `/resources/blog/wintersummit2016` | https://crosscomm.com/resources/blog/wintersummit2016 | none — 404 |
| `/resources/blog/react-native-boilerplate` | https://crosscomm.com/resources/blog/react-native-boilerplate | none — 404 |
| `/resources/blog/unlimited-pto-diaries-alaska` | https://crosscomm.com/resources/blog/unlimited-pto-diaries-alaska | none — 404 |
| `/resources/blog/ar-and-vr-news-google-glasses-magic-leap-vr-urban-planning` | https://crosscomm.com/resources/blog/ar-and-vr-news-google-glasses-magic-leap-vr-urban-planning | none — 404 |
| `/resources/blog/ar-and-vr-news-reality-recap-july-2022` | https://crosscomm.com/resources/blog/ar-and-vr-news-reality-recap-july-2022 | none — 404 |
| `/resources/blog/the-xr-glossary` | https://crosscomm.com/resources/blog/the-xr-glossary | none — 404 |
| `/resources/blog/reality-recap-june-2022` | https://crosscomm.com/resources/blog/reality-recap-june-2022 | none — 404 |
| `/resources/blog/unreal-engine-5s-epic-features` | https://crosscomm.com/resources/blog/unreal-engine-5s-epic-features | none — 404 |
| `/resources/blog/The-time-is-right-for-web-AR` | https://crosscomm.com/resources/blog/The-time-is-right-for-web-AR | none — 404 |
| `/resources/blog/unlimited-pto-savannah` | https://crosscomm.com/resources/blog/unlimited-pto-savannah | none — 404 |
| `/resources/blog/crosscomm-wins-three-telly-awards` | https://crosscomm.com/resources/blog/crosscomm-wins-three-telly-awards | none — 404 |
| `/resources/blog/guide-to-ux-audits` | https://crosscomm.com/resources/blog/guide-to-ux-audits | none — 404 |
| `/resources/blog/working-with-3d-models-in-unity` | https://crosscomm.com/resources/blog/working-with-3d-models-in-unity | none — 404 |
| `/resources/blog/building-an-app-for-research-studies` | https://crosscomm.com/resources/blog/building-an-app-for-research-studies | none — 404 |
| `/resources/blog/reality-recap-episode-6` | https://crosscomm.com/resources/blog/reality-recap-episode-6 | none — 404 |
| `/resources/blog/what-is-ux` | https://crosscomm.com/resources/blog/what-is-ux | none — 404 |
| `/resources/blog/reality-recap-episode-5` | https://crosscomm.com/resources/blog/reality-recap-episode-5 | none — 404 |
| `/resources/blog/reality-recap-episode-4` | https://crosscomm.com/resources/blog/reality-recap-episode-4 | none — 404 |
| `/resources/blog/how-a-donut-helped-our-team-feel-more-connected` | https://crosscomm.com/resources/blog/how-a-donut-helped-our-team-feel-more-connected | none — 404 |
| `/resources/blog/reality-recap-episode-3` | https://crosscomm.com/resources/blog/reality-recap-episode-3 | none — 404 |
| `/resources/blog/crosscomms-holiday-techie-gift-guide` | https://crosscomm.com/resources/blog/crosscomms-holiday-techie-gift-guide | none — 404 |
| `/resources/blog/reality-recap-episode-2` | https://crosscomm.com/resources/blog/reality-recap-episode-2 | none — 404 |
| `/resources/blog/be-well-versed-in-the-metaverse` | https://crosscomm.com/resources/blog/be-well-versed-in-the-metaverse | none — 404 |
| `/resources/blog/work-life-balance-culture` | https://crosscomm.com/resources/blog/work-life-balance-culture | none — 404 |
| `/resources/blog/crosscomm-new-website` | https://crosscomm.com/resources/blog/crosscomm-new-website | none — 404 |
| `/resources/blog/reality-recap-ep1` | https://crosscomm.com/resources/blog/reality-recap-ep1 | none — 404 |
| `/resources/blog/unlimitedpto-oceans-mountains` | https://crosscomm.com/resources/blog/unlimitedpto-oceans-mountains | none — 404 |
| `/resources/blog/responsible-cancer-apps` | https://crosscomm.com/resources/blog/responsible-cancer-apps | none — 404 |
| `/resources/blog/tech-partner-grant-success` | https://crosscomm.com/resources/blog/tech-partner-grant-success | none — 404 |
| `/resources/blog/vrandhealth` | https://crosscomm.com/resources/blog/vrandhealth | none — 404 |
| `/resources/blog/mobile-apps-cancer-care` | https://crosscomm.com/resources/blog/mobile-apps-cancer-care | none — 404 |
| `/resources/blog/hip-to-hipaa` | https://crosscomm.com/resources/blog/hip-to-hipaa | none — 404 |
| `/resources/blog/fhir-healthcare-data` | https://crosscomm.com/resources/blog/fhir-healthcare-data | none — 404 |
| `/resources/blog/healthcare-app-fda` | https://crosscomm.com/resources/blog/healthcare-app-fda | none — 404 |
| `/resources/blog/digital-divide-stem` | https://crosscomm.com/resources/blog/digital-divide-stem | none — 404 |
| `/resources/blog/wearables-health` | https://crosscomm.com/resources/blog/wearables-health | none — 404 |
| `/resources/blog/return-to-durham` | https://crosscomm.com/resources/blog/return-to-durham | none — 404 |
| `/resources/blog/havana-night-durham` | https://crosscomm.com/resources/blog/havana-night-durham | none — 404 |
| `/resources/blog/awe-2019-recap` | https://crosscomm.com/resources/blog/awe-2019-recap | none — 404 |
| `/resources/blog/wwdc-2019-recap` | https://crosscomm.com/resources/blog/wwdc-2019-recap | none — 404 |
| `/resources/blog/meet-anthony-garritano` | https://crosscomm.com/resources/blog/meet-anthony-garritano | none — 404 |
| `/resources/blog/meet-mike-harris` | https://crosscomm.com/resources/blog/meet-mike-harris | none — 404 |
| `/resources/blog/meet-beverly-williams` | https://crosscomm.com/resources/blog/meet-beverly-williams | none — 404 |
| `/resources/blog/meet-sean-doherty` | https://crosscomm.com/resources/blog/meet-sean-doherty | none — 404 |
| `/resources/blog/blockchain-beyond-buzzword` | https://crosscomm.com/resources/blog/blockchain-beyond-buzzword | none — 404 |
| `/resources/blog/bluetooth-low-energy-android` | https://crosscomm.com/resources/blog/bluetooth-low-energy-android | none — 404 |
| `/resources/blog/oculus-connect-6-biggest-announcements-part1` | https://crosscomm.com/resources/blog/oculus-connect-6-biggest-announcements-part1 | none — 404 |
| `/resources/blog/six-coding-tips-junior-devs` | https://crosscomm.com/resources/blog/six-coding-tips-junior-devs | none — 404 |
| `/resources/blog/xr-experiences-easier-to-build` | https://crosscomm.com/resources/blog/xr-experiences-easier-to-build | none — 404 |
| `/resources/blog/oculus-quest-hand-tracking-is-here` | https://crosscomm.com/resources/blog/oculus-quest-hand-tracking-is-here | none — 404 |
| `/resources/blog/future-webxr` | https://crosscomm.com/resources/blog/future-webxr | none — 404 |
| `/resources/blog/covid19-remote-work` | https://crosscomm.com/resources/blog/covid19-remote-work | none — 404 |
| `/resources/blog/synthetic-datasets-unity` | https://crosscomm.com/resources/blog/synthetic-datasets-unity | none — 404 |
| `/resources/blog/unlimitedpto-accidentally-viral` | https://crosscomm.com/resources/blog/unlimitedpto-accidentally-viral | none — 404 |
| `/resources/blog/history-ar-vr` | https://crosscomm.com/resources/blog/history-ar-vr | none — 404 |
| `/resources/blog/unlimitedpto-disneyworld` | https://crosscomm.com/resources/blog/unlimitedpto-disneyworld | none — 404 |
| `/resources/blog/crosscomm-via-contentful` | https://crosscomm.com/resources/blog/crosscomm-via-contentful | none — 404 |
| `/resources/blog/enterprisear` | https://crosscomm.com/resources/blog/enterprisear | none — 404 |
| `/resources/blog/zedminidemo` | https://crosscomm.com/resources/blog/zedminidemo | none — 404 |
| `/resources/blog/speaking-at-sxsw` | https://crosscomm.com/resources/blog/speaking-at-sxsw | none — 404 |
| `/resources/blog/clutchreviews` | https://crosscomm.com/resources/blog/clutchreviews | none — 404 |
| `/resources/blog/sxswtalk` | https://crosscomm.com/resources/blog/sxswtalk | none — 404 |
| `/resources/blog/teamisbetter` | https://crosscomm.com/resources/blog/teamisbetter | none — 404 |
| `/resources/blog/serverless-architecture` | https://crosscomm.com/resources/blog/serverless-architecture | none — 404 |
| `/resources/blog/haves-and-have-nots-of-ai` | https://crosscomm.com/resources/blog/haves-and-have-nots-of-ai | none — 404 |
| `/resources/blog/why-blog` | https://crosscomm.com/resources/blog/why-blog | none — 404 |
| `/resources/blog/mvp-types` | https://crosscomm.com/resources/blog/mvp-types | none — 404 |
| `/resources/blog/category/News` | https://crosscomm.com/resources/blog/category/News | none — 404 |
| `/resources/blog/category/HealthTech` | https://crosscomm.com/resources/blog/category/HealthTech | none — 404 |
| `/resources/blog/category/Business` | https://crosscomm.com/resources/blog/category/Business | none — 404 |
| `/resources/blog/category/Technology` | https://crosscomm.com/resources/blog/category/Technology | none — 404 |
| `/resources/blog/category/Culture` | https://crosscomm.com/resources/blog/category/Culture | none — 404 |
| `/portfolio/learn-to-quit-mobile-app` | https://crosscomm.com/portfolio/learn-to-quit-mobile-app | none — 404 |
| `/portfolio/vr-motor-learning-and-rehabilitation` | https://crosscomm.com/portfolio/vr-motor-learning-and-rehabilitation | none — 404 |
| `/portfolio/mobile-neurofeedback` | https://crosscomm.com/portfolio/mobile-neurofeedback | none — 404 |
| `/portfolio/clean-energy-smart-home` | https://crosscomm.com/portfolio/clean-energy-smart-home | none — 404 |
| `/portfolio/ar-exposure-therapy-app` | https://crosscomm.com/portfolio/ar-exposure-therapy-app | none — 404 |
| `/portfolio/focusstem-virtual-xr-summit` | https://crosscomm.com/portfolio/focusstem-virtual-xr-summit | none — 404 |
| `/portfolio/dooable-health` | https://crosscomm.com/portfolio/dooable-health | none — 404 |
| `/portfolio/focusstem-nextgen` | https://crosscomm.com/portfolio/focusstem-nextgen | none — 404 |
| `/portfolio/the-diversity-movement` | https://crosscomm.com/portfolio/the-diversity-movement | none — 404 |
| `/portfolio/forbes` | https://crosscomm.com/portfolio/forbes | none — 404 |
| `/portfolio/mypatientpal` | https://crosscomm.com/portfolio/mypatientpal | none — 404 |
| `/portfolio/socialshowcase` | https://crosscomm.com/portfolio/socialshowcase | none — 404 |
| `/portfolio/gerrymander-madness` | https://crosscomm.com/portfolio/gerrymander-madness | none — 404 |
| `/portfolio/duke-surgery-podcast` | https://crosscomm.com/portfolio/duke-surgery-podcast | none — 404 |
| `/portfolio/medfusion` | https://crosscomm.com/portfolio/medfusion | none — 404 |
| `/portfolio/moogfest-augmented-reality` | https://crosscomm.com/portfolio/moogfest-augmented-reality | none — 404 |
| `/portfolio/reveal` | https://crosscomm.com/portfolio/reveal | none — 404 |
| `/portfolio/icfi` | https://crosscomm.com/portfolio/icfi | none — 404 |
| `/portfolio/paces` | https://crosscomm.com/portfolio/paces | none — 404 |
| `/portfolio/category/AI/Machine Learning` | https://crosscomm.com/portfolio/category/AI/Machine%20Learning | none — 404 |
| `/portfolio/category/UX/UI` | https://crosscomm.com/portfolio/category/UX/UI | none — 404 |
| `/portfolio/category/Mobile` | https://crosscomm.com/portfolio/category/Mobile | none — 404 |
| `/portfolio/category/Emerging Tech` | https://crosscomm.com/portfolio/category/Emerging%20Tech | none — 404 |
| `/portfolio/category/Healthcare` | https://crosscomm.com/portfolio/category/Healthcare | none — 404 |
| `/portfolio/category/AR/VR` | https://crosscomm.com/portfolio/category/AR/VR | none — 404 |
| `/portfolio/category/Web` | https://crosscomm.com/portfolio/category/Web | none — 404 |
| `/privacy-policy/moogfest-privacy-policy` | https://crosscomm.com/privacy-policy/moogfest-privacy-policy | none — 404 |
| `/privacy-policy/duke-kunshan-ar` | https://crosscomm.com/privacy-policy/duke-kunshan-ar | none — 404 |
| `/privacy-policy/gerrymander-madness` | https://crosscomm.com/privacy-policy/gerrymander-madness | none — 404 |

## Before any domain change

This map is not a launch checklist by itself. Search Console exports, backlinks, downloads, and analytics definitions were not collected. The strategy file says to record a destination or an explicit retirement for every known URL before a domain switch. That work is open. See [BACKLOG.md](BACKLOG.md).

Changing DNS, or pointing crosscomm.com at this project, is not authorized by this repository.
