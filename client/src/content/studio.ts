import type { Faq } from "./types";

export const homeFaqs: Faq[] = [
  {
    question: "What does CrossComm do?",
    answer:
      "Five practices: custom app development, AI agents and automation, AI strategy, AI training, and healthcare software. Don Shin founded the studio in 1998. We work from Durham, North Carolina and Cleveland, Ohio.",
  },
  {
    question: "What if we have not picked a workflow yet?",
    answer:
      "Come anyway. The agent practice is for teams that have thought about building or buying AI and are not sure where to start. Strategy is the right first conversation if you need to know where AI belongs before you fund a build.",
  },
  {
    question: "How does a project run once we begin?",
    answer:
      "Discovery checks fit and scope. Then a plan and low-fidelity wireframes, then design, then weekly builds you can react to. Launch is all at once or in stages. After that we train your team and stay available.",
  },
  {
    question: "How do we start?",
    answer: "Email hello@crosscomm.com, call +1 919 695 3241, or use the consultation form on crosscomm.com.",
  },
];

export const approachSteps = [
  {
    phase: "Discovery",
    items: [
      { name: "Learn", goal: "Decide whether the work fits and what it covers.", output: "A partnership agreement, when both sides want one." },
      { name: "Plan", goal: "Agree on a roadmap.", output: "Low-fidelity wireframes." },
    ],
  },
  {
    phase: "Production",
    items: [
      { name: "Design", goal: "Settle look, feel, and behavior.", output: "High-fidelity wireframes." },
      { name: "Develop", goal: "Build in weekly increments, with you in the loop.", output: "Regular builds and demos." },
    ],
  },
  {
    phase: "Release",
    items: [
      { name: "Launch", goal: "Roll the product out, all at once or in stages.", output: "A working release." },
      { name: "Support", goal: "Train the team and stay available.", output: "Updates, and the notes people need to run it." },
    ],
  },
] as const;

export const approachBeliefs = [
  "Trust is what the relationship runs on.",
  "We plan at the start. We change the plan when the work teaches us something.",
  "We explain the technology. Unfamiliarity is not an advantage we take.",
  "We do not promise what the project cannot carry.",
  "One package does not fit every client.",
  "A new technology is not automatically the right one.",
  "If the person who has to use it will not, it is not finished.",
];
