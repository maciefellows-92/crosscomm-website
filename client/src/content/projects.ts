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
      "Case study of ACS CARES, the American Cancer Society mobile app CrossComm designed for patients and caregivers, including 2024 semantic search and matching.",
    summary: "A mobile support app for cancer patients and caregivers, with later semantic search and volunteer matching.",
    categories: ["ai", "healthcare", "mobile"],
    hero: {
      src: "/images/acs-cares-hero.webp",
      width: 708,
      height: 398,
      alt: "A person holds a phone open to the ACS CARES home screen, showing the American Cancer Society name and a cartoon figure.",
    },
    gallery: [
      {
        src: "/images/acs-cares-screen.webp",
        width: 304,
        height: 541,
        alt: "ACS CARES welcome screen with the words “Resources, education, and support for people experiencing cancer and their caregivers.”",
      },
    ],
    challenge: [
      "The published case study says cancer care leaves patients and caregivers isolated, and that the practical problems include the healthcare system itself, transportation, childcare, and emotional strain.",
      "The American Cancer Society wanted a digital tool with information, resources, and support shaped to the person using it.",
    ],
    work: [
      "CrossComm and the American Cancer Society built ACS CARES (Community Access to Resources, Education, and Support), a mobile app. The case study says it launched in 2023.",
      "Onboarding personalizes education and logistical help using location, cancer type, and social circumstances.",
      "The app matches patients and caregivers with volunteers who have been through something similar. The case study says the 2023 matching was rules-based.",
      "In 2024 the case study says CrossComm added large language model features: semantic search that maps everyday language to the content, and similarity matching that uses people's stories rather than only demographic rules.",
      "The page says trust and safety work was part of the AI addition, aimed at reliable information. It does not publish an evaluation method or an error rate.",
    ],
    outcome: [
      "The results on the source page are qualitative: resources for people in remote or underserved places, volunteer matches meant to reduce isolation, and more direct help finding the next step in care. The page calls the impact measurable, then does not give a number. This site does not add one.",
      "The same page lists later ideas, including question prompts for doctor visits, sentiment analysis, chatbots, and agents that could help with lodging, rides, or trials. It presents those as exploration, not as shipped features.",
      "The case study says Don Shin of CrossComm and Bonny Morris, PhD, MSPH, RN, of the American Cancer Society gave a keynote about the app at All Things Open.",
    ],
    sourceUrl: "https://www.crosscomm.com/portfolio/acs-cares/",
    relatedServiceSlugs: ["healthcare-app-development", "app-development", "ai-agents-and-automation"],
    caption: "ACS CARES on a phone. American Cancer Society. The photo is from the published case study.",
  },
  {
    slug: "well-aware",
    name: "Well Aware",
    client: "Well Aware, with UNC Gillings School of Global Public Health",
    description:
      "Case study of the Well Aware mobile app, built with UNC researchers so private-well owners can photograph test strips for lead, arsenic, and microbes.",
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
        alt: "A Well Aware lead-result screen from the case study. The concentration shown is sample interface copy, not a measured project outcome.",
      },
    ],
    challenge: [
      "The published case study says more than 42 million people in the United States rely on private wells, including about 2.4 million in North Carolina, and that fewer than 200,000 of those North Carolina wells have been tested. Those figures are the case study's, retrieved 4 October 2026. They are not a new count.",
      "Private wells can carry microbes, lead, and arsenic, and the case study says federal oversight does not cover them the way it covers piped water. Researchers at the UNC Gillings School of Global Public Health wanted a free mobile app paired with a low-cost home test kit.",
    ],
    work: [
      "CrossComm built the mobile app that applies models to a photo of a test strip and estimates concentration and risk for lead, arsenic, and microbes.",
      "The research team supplied existing datasets of strip images and contaminant values. The case study says the images were analyzed with ImageJ, and that lead and arsenic used a regression model on color values.",
      "For E. coli, the case study says the team used Mask R-CNN to segment the strip and recognize the signs of microbes.",
      "The page does not publish model accuracy, a sample size, or a clinical claim. This site does not add them.",
    ],
    outcome: [
      "The case study says the kits are on the Well Aware website and the app is on the Apple App Store and Google Play. It describes a hope, with the researchers, to make the app usable beyond North Carolina. That is an intention, not a completed expansion.",
      "An example result screen in the source imagery shows a moderate lead risk and a parts-per-billion range. That is interface copy from the case study, not an outcome statistic for the project.",
    ],
    sourceUrl: "https://www.crosscomm.com/portfolio/well-aware/",
    relatedServiceSlugs: ["healthcare-app-development", "app-development", "ai-agents-and-automation"],
    caption: "Well Aware on two phones. The screens are from the published case study.",
  },
  {
    slug: "smithsonian-national-museum-of-african-art",
    name: "Smithsonian National Museum of African Art",
    client: "Smithsonian National Museum of African Art",
    description:
      "Case study of the browser-based companion CrossComm built for the Iké Udé: Nollywood Portraits exhibition at the Smithsonian National Museum of African Art.",
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
        alt: "Visitors in the Nollywood Portraits exhibition. One person photographs a wall text titled A Radical Beauty.",
      },
    ],
    challenge: [
      "The case study describes Iké Udé: Nollywood Portraits at the Smithsonian National Museum of African Art, an exhibition of portraits from Nigeria's film industry.",
      "The museum wanted visitors to remix and customize those portraits on their phones, and to do it without installing an app.",
    ],
    work: [
      "CrossComm built two browser-based applications. Visitors could rescale portrait subjects, change backgrounds and patterns, and add and rotate 3D objects. The case study names portraits of Genevieve Nnaji and Sadiq Daba.",
      "The page says the team used WebGL and the Unity engine, working with a Smithsonian digital artist to bring three-dimensional objects into a two-dimensional scene.",
      "QR codes on placards opened the web app. Sharing used the phone's own photo share, including the option to add hashtags.",
      "An early idea was an Instagram filter. The case study says conversations about representation, accessibility, and Instagram's changing tools led CrossComm to recommend the web app instead. The studio's interface team also consulted on the flow and ran a usability audit.",
      "The original case study lists Mobile and Web among the services. This archive files the project under Web because the shipped experience is a website opened in the phone browser, not a native store app.",
    ],
    outcome: [
      "The case study says the web apps launched with the exhibition, dated 5 February 2022 through 23 February 2023, and were reached by QR code in the gallery. It does not give visitor counts or share counts. This site does not invent them.",
    ],
    sourceUrl: "https://www.crosscomm.com/portfolio/smithsonian-national-museum-of-african-art/",
    relatedServiceSlugs: ["app-development"],
    caption: "National Museum of African Art during the Nollywood Portraits exhibition. Photograph from the published case study.",
  },
];

export function projectBySlug(slug: string): ProjectRecord | undefined {
  return projects.find((project) => project.slug === slug);
}

export function filterProjects(list: readonly ProjectRecord[], category: Category | "all"): ProjectRecord[] {
  if (category === "all") return [...list];
  return list.filter((project) => project.categories.includes(category));
}

export const emptyFilterMessage = "Nothing in this category yet. Choose All to see the projects on this site.";
