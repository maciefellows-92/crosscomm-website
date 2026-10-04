# Design

This is the visual target for the interface lane. This delivery lane did not build the pages and did not measure contrast on a rendered screen. Treat the numbers below as the brief, not as a test result.

## Character

An editorial technology studio. Warm paper, near-black text, a limited orange. No purple gradients, glowing orbs, or stock dashboard charts.

| Token | Value | Use |
| --- | --- | --- |
| Paper | `#f5f3ed` | Page background |
| Ink | `#202321` | Text and the dark squares of the mark |
| Orange | `#ed542b` | The mark, large display words, the "Let's talk" control |
| Forest or sage | muted, occasional | A panel, not a second brand color |

The packages already in the lockfile are Fraunces for the large headlines, Source Sans 3 for text, and IBM Plex Mono for small uppercase eyebrows. They are self-hosted dependencies. The interface still has to import them. This lane did not verify that a page loads them.

## Layout

- Desktop content width about 1320px, with about 60px of gutter.
- Phone gutter about 20px.
- Desktop headline about 110px with tight leading. It has to reflow. It must not cause sideways scrolling at 390px or at 1440px.
- Header: wordmark, Services, Work, Approach, Insights, and an orange "Let's talk".
- A quiet line may say "Independent thinking. Lasting impact." Durham and Cleveland can be named. Do not invent a headcount or a client count.
- Homepage headline direction: "Make the next thing." and "Make it matter." The supporting sentence has to say AI strategy, custom apps, and human-centered product development.
- Show all five services as numbered rows. Show three case cards. ACS CARES is the large photograph, with a short caption, not a fake laptop.
- Orange as large type or decoration is fine. Orange as a button is not fine unless the text on it meets 4.5:1. Use a dark text color that passes, or a darker burnt orange with a white label. Do not ship a contrast claim without a measurement.
- Body text target is WCAG 4.5:1. Large text target is 3:1. This lane did not run that measurement.
- Focus must be visible. Honor `prefers-reduced-motion`.

## Mark

`client/public/favicon.svg` is a four-square mark: paper, ink, and orange. `client/public/og.png` is a social image made for this review site (the meta alt text says a wordmark on a dark field with an orange cross). Neither file is a logo taken from CrossComm's brand kit. Do not treat them as approved brand assets. See [SOURCES.md](SOURCES.md).

## Photographs

The six photographs in `client/public/images/` are the public case-study images, saved as WebP. Use the `alt` text already stored on each project record. Do not generate a picture and present it as the client's product.
