# Design

This is the visual target. Treat the numbers below as the brief. The bootstrap checks are in [RELEASE-EVIDENCE.md](RELEASE-EVIDENCE.md). They do not measure every color in this file.

## Character

An editorial technology studio. Cool ice and blue-grey fields, slate text, a restrained copper accent. No purple gradients, glowing orbs, large orange panels, or stock dashboard charts.

| Token | Value | Use |
| --- | --- | --- |
| Ice | `#F2F5F7` | Page background |
| Ice deep | `#E3EAF0` | Review banner, quiet panels, footer supporting text |
| Slate | `#273743` | Body text, header, footer, dark bands. Legacy site background was near `#272F39` |
| Slate soft | `#465D6E` | Secondary text |
| Pale teal | `#E1EEF0` | Occasional panel |
| Deep teal | `#265865` | Text on the pale teal panel |
| Copper | `#A64B2A` | Links, buttons, hero and 404 display accent |
| Copper hover | `#84361C` | Hover for copper controls and links |
| Light copper | `#D89570` | Link text on dark slate only |
| Brand blue | `#89B6D5` | Accents on dark slate (the fill from the public favicon). Not small text on light backgrounds |
| White | `#FCFDFE` | Labels on copper buttons |
| Divider | `#CAD5DE` | Rules and field borders |
| Danger | `#7A1E12` | Form errors. Kept distinct from copper |
| Photo matte | `#123F4A` | Well Aware image well only |

Measured pairs used for this palette: slate on ice 11.19:1, secondary slate on ice 6.29:1, copper on ice 5.24:1, white on copper 5.63:1, deep teal on pale teal 6.63:1, light copper on slate 4.93:1, brand blue on slate 5.67:1. Copper on pale teal is 4.83:1. White on copper hover is 8.16:1. Danger on ice is 9.49:1. Those ratios are contrast math for these hex pairs, not an axe run.

The packages already in the lockfile are Fraunces for the large headlines, Source Sans 3 for text, and IBM Plex Mono for small uppercase eyebrows. They are self-hosted dependencies. The interface still has to import them. This lane did not verify that a page loads them.

## Layout

- Desktop content width about 1320px, with about 60px of gutter.
- Phone gutter about 20px.
- Desktop headline about 110px with tight leading. It has to reflow. It must not cause sideways scrolling at 390px or at 1440px.
- Header: the public white wordmark on slate, Services, Work, Approach, Insights, and a copper "Let's talk" with a white label.
- A quiet line may say "Independent thinking. Lasting impact." Durham and Cleveland can be named. Do not invent a headcount or a client count.
- Homepage headline direction: "Make the next thing." and "Make it matter." The supporting sentence has to say AI strategy, custom apps, and human-centered product development.
- Show all five services as numbered rows. Show three case cards. ACS CARES is the large photograph, with a short caption, not a fake laptop.
- Copper as large type or a thin accent is fine. Copper buttons use a white label. Do not put brand blue on small text over ice.
- Body text target is WCAG 4.5:1. Large text target is 3:1. The pairs in the character table were measured as contrast ratios for those hex values. That is not a substitute for an axe pass.
- Focus must be visible. Honor `prefers-reduced-motion`.

## Mark

`client/public/logo.png` is the public CrossComm wordmark, copied unchanged from https://www.crosscomm.com/static/logo-e50bf70c07330d3e8bd6faa9e01f5692.png on 4 October 2026. SHA-256 `fd52d50fbd791e3d573805f751481557250302e24630257d3c5c978484346b2d`. Intrinsic size 676×129. Header and footer show it at 205px wide, height automatic, with no filter or recolor. The home link name is "CrossComm home".

`client/public/favicon.svg` is the public favicon, copied unchanged from https://www.crosscomm.com/favicon.svg on 4 October 2026. SHA-256 `265639c9bcdc851fd4e811bc566375bc49b70abe774080ced303ed731305e333`. It is a static SVG with one fill, `#89B6D5`, and no script or external resource. The PNG at https://www.crosscomm.com/favicon-32x32.png is a retrieval reference only and is not the browser icon.

`client/public/og.png` is a 1200×630 social card rendered from `scripts/og-card.html` by `scripts/render-og.ts`. It places the same logo file, unchanged, on a slate field with a thin copper line and the headline "Make the next thing." It is not a generated drawing of the mark, and the template is not a public route. The image alt text matches that composition. See [SOURCES.md](SOURCES.md).

## Photographs

The six photographs in `client/public/images/` are the public case-study images, saved as WebP. Use the `alt` text already stored on each project record. Do not generate a picture and present it as the client's product.
