import type { Category, ProjectRecord } from "./types";

export const categoryLabels: Record<Category | "all", string> = {
  all: "All",
  ai: "AI",
  healthcare: "Healthcare",
  web: "Web",
  mobile: "Mobile",
};

export const projects: ProjectRecord[] = [
  {
    slug: "acs-cares",
    name: "ACS CARES",
    client: "American Cancer Society",
    description:
      "ACS CARES, the American Cancer Society mobile app we designed for patients and caregivers, with semantic search and volunteer matching added in 2024.",
    summary: "A mobile support app for cancer patients and caregivers, with semantic search and volunteer matching added in 2024.",
    categories: ["ai", "healthcare", "mobile"],
    hero: {
      src: "/images/acs-cares-hero.webp",
      width: 708,
      height: 398,
      alt: "Hands hold a phone open to the ACS CARES home screen, with the American Cancer Society name and an illustrated portrait.",
    },
    gallery: [
      {
        src: "/images/acs-cares-screen.webp",
        width: 304,
        height: 541,
        alt: "ACS CARES welcome screen: Resources, education, and support for people experiencing cancer and their caregivers, with the American Cancer Society mark.",
      },
    ],
    challenge: [
      "Cancer care leaves patients and caregivers isolated. The practical problems include the healthcare system itself, transportation, childcare, and emotional strain.",
      "The American Cancer Society wanted a digital tool with information, resources, and support shaped to the person using it.",
    ],
    work: [
      "With the American Cancer Society we built ACS CARES, Community Access to Resources, Education, and Support. The mobile app launched in 2023.",
      "Onboarding personalizes education and logistical help from location, cancer type, and social circumstances.",
      "The app matches patients and caregivers with volunteers who have been through something similar. Matching in 2023 was rules-based.",
      "In 2024 we added large language model features: semantic search that maps everyday language to the content, and similarity matching that uses people's stories rather than only demographic rules.",
      "Trust and safety work sat beside that AI so the information people receive stays reliable. The app is not an autonomous agent.",
    ],
    outcome: [
      "People in remote or underserved places can reach resources. Volunteer matches are there to reduce isolation. Finding the next step in care is more direct.",
      "With the Society, later questions include question prompts for doctor visits, sentiment analysis, chatbots, and agents that could help with lodging, rides, or trials. Those are explorations, not features in the shipped app.",
      "Don Shin of CrossComm and Bonny Morris, PhD, MSPH, RN, of the American Cancer Society gave a keynote about the app at All Things Open.",
    ],
    sourceUrl: "https://www.crosscomm.com/portfolio/acs-cares/",
    relatedServiceSlugs: ["healthcare-app-development", "app-development", "ai-agents-and-automation"],
    caption: "ACS CARES. American Cancer Society.",
  },
  {
    slug: "well-aware",
    name: "Well Aware",
    client: "Well Aware, with UNC Gillings School of Global Public Health",
    description:
      "The Well Aware mobile app, built with UNC researchers so private-well owners can photograph test strips for lead, arsenic, and microbes.",
    summary: "A mobile app that reads at-home well-water test strips, built with UNC public-health researchers.",
    categories: ["ai", "healthcare", "mobile"],
    hero: {
      src: "/images/well-aware-cover.webp",
      width: 1200,
      height: 750,
      alt: "Two phones showing the Well Aware app: a home screen with Test My Water and Order a Test Kit, and a scan screen listing Microbes, Lead, and Arsenic.",
    },
    gallery: [
      {
        src: "/images/well-aware-strip.webp",
        width: 250,
        height: 541,
        alt: "Well Aware lead test result screen labeled moderate risk, with an estimated concentration between 3 and 10 parts per billion.",
      },
    ],
    challenge: [
      "More than 42 million people in the United States rely on private wells, including about 2.4 million in North Carolina. Fewer than 200,000 of those North Carolina wells have been tested.",
      "Private wells can carry microbes, lead, and arsenic, and federal oversight does not cover them the way it covers piped water. Researchers at the UNC Gillings School of Global Public Health wanted a free mobile app paired with a low-cost home test kit.",
    ],
    work: [
      "We built the mobile app. It applies models to a photo of a test strip and estimates concentration and risk for lead, arsenic, and microbes.",
      "The research team supplied datasets of strip images and contaminant values. The images were analyzed with ImageJ. Lead and arsenic use a regression model on color values.",
      "For E. coli, the team used Mask R-CNN to segment the strip and recognize the signs of microbes.",
    ],
    outcome: [
      "The kits are on the Well Aware website. The app is on the Apple App Store and Google Play.",
      "With the researchers, we want the app to be useful beyond North Carolina.",
    ],
    sourceUrl: "https://www.crosscomm.com/portfolio/well-aware/",
    relatedServiceSlugs: ["healthcare-app-development", "app-development", "ai-agents-and-automation"],
    caption: "Well Aware. Home and scan screens.",
  },
  {
    slug: "smithsonian-national-museum-of-african-art",
    name: "Smithsonian National Museum of African Art",
    client: "Smithsonian National Museum of African Art",
    description:
      "A browser companion we built for the Iké Udé: Nollywood Portraits exhibition at the Smithsonian National Museum of African Art.",
    summary: "A web app for remixing portraits in the Iké Udé: Nollywood Portraits exhibition, opened with a QR code.",
    categories: ["web"],
    hero: {
      src: "/images/smithsonian-gallery.webp",
      width: 1200,
      height: 750,
      alt: "Stone entrance of the National Museum of African Art, with banners for the Iké Udé: Nollywood Portraits exhibition.",
    },
    gallery: [
      {
        src: "/images/smithsonian-app.webp",
        width: 1400,
        height: 788,
        alt: "A visitor in the Nollywood Portraits exhibition photographs a wall text titled A Radical Beauty.",
      },
    ],
    challenge: [
      "Iké Udé: Nollywood Portraits, at the Smithsonian National Museum of African Art, is an exhibition of portraits from Nigeria's film industry.",
      "The museum wanted visitors to remix and customize those portraits on their phones, without installing an app.",
    ],
    work: [
      "We built two browser-based applications. Visitors could rescale portrait subjects, change backgrounds and patterns, and add and rotate 3D objects, including portraits of Genevieve Nnaji and Sadiq Daba.",
      "We used WebGL and the Unity engine, working with a Smithsonian digital artist to bring three-dimensional objects into a two-dimensional scene.",
      "QR codes on the placards opened the web app. Visitors shared through the phone's own photo share, with the option to add hashtags.",
      "An early idea was an Instagram filter. Conversations about representation, accessibility, and Instagram's changing tools led us to recommend the web app instead. Our interface team consulted on the flow and ran a usability audit.",
    ],
    outcome: [
      "The web apps launched with the exhibition, 5 February 2022 through 23 February 2023, and were reached by QR code in the gallery.",
    ],
    sourceUrl: "https://www.crosscomm.com/portfolio/smithsonian-national-museum-of-african-art/",
    relatedServiceSlugs: ["app-development"],
    caption: "National Museum of African Art during Nollywood Portraits.",
  },
];

export function projectBySlug(slug: string): ProjectRecord | undefined {
  return projects.find((project) => project.slug === slug);
}

export function filterProjects(list: readonly ProjectRecord[], category: Category | "all"): ProjectRecord[] {
  if (category === "all") return [...list];
  return list.filter((project) => project.categories.includes(category));
}

export const emptyFilterMessage = "Nothing in this category yet. Choose All to see the work.";
