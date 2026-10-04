export type Category = "ai" | "healthcare" | "web" | "mobile";

export type Asset = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type Faq = { question: string; answer: string };

export type Activity = { title: string; detail: string };

export type ServiceRecord = {
  slug: string;
  name: string;
  description: string;
  lead: string;
  audience: string;
  activities: Activity[];
  proofNote: string;
  relatedProjectSlugs: string[];
  faqs: Faq[];
  sourceUrl: string;
};

export type ProjectRecord = {
  slug: string;
  name: string;
  client: string;
  description: string;
  summary: string;
  categories: Category[];
  hero: Asset;
  gallery: Asset[];
  challenge: string[];
  work: string[];
  outcome: string[];
  sourceUrl: string;
  relatedServiceSlugs: string[];
  caption: string;
};

export type InsightRecord = {
  title: string;
  date: string;
  dateLabel: string;
  href: string;
  summary: string;
};
