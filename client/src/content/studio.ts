import type { Faq } from "./types";

export const homeFaqs: Faq[] = [
  {
    question: "What does CrossComm actually do?",
    answer:
      "Five practices, all on this site: custom app development, AI agents and automation, AI strategy consulting, AI training, and healthcare app development. The studio was founded in 1998 by Don Shin and works from Durham, North Carolina and Cleveland, Ohio.",
  },
  {
    question: "Where is the proof?",
    answer:
      "Three projects are written up here with the original case studies linked: ACS CARES for the American Cancer Society, Well Aware with UNC researchers, and a web app for the Smithsonian National Museum of African Art. Outcomes are described the way the source describes them. This site does not add counts.",
  },
  {
    question: "How do we start a conversation?",
    answer:
      "Email hello@crosscomm.com, call +1 919 695 3241, or use CrossComm's existing consultation form. This review site can open a draft in your email app. It does not receive or store the message.",
  },
  {
    question: "Is this the live CrossComm website?",
    answer:
      "No. This is a review build. It asks search engines not to index it. crosscomm.com is unchanged.",
  },
];

export const approachSteps = [
  {
    phase: "Discovery",
    items: [
      { name: "Learn", goal: "Decide whether the work fits and what it covers.", output: "A partnership agreement, if both sides want one." },
      { name: "Plan", goal: "Agree on a roadmap.", output: "Low-fidelity wireframes." },
    ],
  },
  {
    phase: "Production",
    items: [
      { name: "Design", goal: "Settle look, feel, and behavior.", output: "High-fidelity wireframes." },
      { name: "Develop", goal: "Build in weekly increments with the client in the loop.", output: "Regular builds and demos." },
    ],
  },
  {
    phase: "Release",
    items: [
      { name: "Launch", goal: "Roll the product out, all at once or in stages.", output: "A working release." },
      { name: "Support", goal: "Train the team and stay available.", output: "Updates and the notes people need to run it." },
    ],
  },
] as const;

export const approachBeliefs = [
  "Trust is the thing the relationship runs on.",
  "Plan at the start. Change the plan when the work teaches you something.",
  "Explain the technology. Do not treat a client's unfamiliarity as an advantage.",
  "Do not promise what the project cannot carry.",
  "A single package rarely fits every client.",
  "A new technology is not automatically the right one.",
  "If the end user will not use it, it is not finished.",
];
