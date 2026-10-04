import type { ServiceRecord } from "./types";

export const services: ServiceRecord[] = [
  {
    slug: "app-development",
    name: "App development",
    description:
      "Custom web, mobile, and connected products, from discovery and design through build and support.",
    lead:
      "We design and build software when you need a product of your own. That includes the web, mobile, AI inside the product, XR, connected devices, the interface, and the backend that keeps it running.",
    audience:
      "You have a specific person to serve and a problem off-the-shelf software does not cover. We do this with teams in healthcare, research, education, and marketing, and with organizations that have already shipped with us.",
    activities: [
      {
        title: "Mobile",
        detail: "iOS, Android, and cross-platform apps. Mobile has been a core practice here for years.",
      },
      {
        title: "Web",
        detail: "Interfaces in the browser, with backend structure that can grow with the business.",
      },
      {
        title: "Product AI",
        detail: "Large language models placed inside an app or site so the product itself is more useful.",
      },
      {
        title: "XR, devices, and design",
        detail:
          "AR, VR, and mixed reality on headsets and phones. Apps that talk to wearables and other devices. Interface design, care of the backend, and a straight answer on whether a new technology belongs.",
      },
    ],
    proofNote:
      "ACS CARES and Well Aware are mobile products with AI in the workflow. The Smithsonian project is a browser app visitors opened in the gallery.",
    relatedProjectSlugs: ["acs-cares", "well-aware", "smithsonian-national-museum-of-african-art"],
    faqs: [
      {
        question: "Which platforms can a project ship on?",
        answer:
          "iOS, Android, cross-platform mobile, the web, headset and phone XR, and connections to wearables and other devices. We choose the set for the project rather than starting from a default stack.",
      },
      {
        question: "What happens before production code?",
        answer:
          "Discovery checks fit and scope. A plan and low-fidelity wireframes come next, then higher-fidelity design, then weekly builds. Launch and support follow.",
      },
      {
        question: "How do we decide what the first release includes?",
        answer:
          "In discovery we name the user, the job the product has to do, and what the first release must carry. The plan is allowed to change when the work teaches us something.",
      },
      {
        question: "Is ACS CARES this kind of work?",
        answer:
          "Yes. We designed and built the ACS CARES mobile app with the American Cancer Society. It launched in 2023. In 2024 we added semantic search and volunteer matching. It is not an autonomous agent.",
      },
    ],
    sourceUrl: "https://www.crosscomm.com/services/app-development/",
  },
  {
    slug: "ai-agents-and-automation",
    name: "AI agents and automation",
    description: "Agentic AI and the Model Context Protocol, put to work in the tools and products you already run.",
    lead:
      "We help you integrate agentic AI so software can take steps inside the tools you already use. With the Model Context Protocol (MCP), an agent can reach those systems without replacing the stack.",
    audience:
      "This is for people who own product, engineering, operations, or innovation, and who want less repetitive work across the tools they already juggle. If you have considered building or buying AI and you are not sure where to start, start here. We will name the workflow with you.",
    activities: [
      {
        title: "Internal workflows",
        detail: "Scheduling, task creation, approvals, onboarding, and ticketing.",
      },
      {
        title: "Features inside a product",
        detail: "Chatbots, smarter forms, and recommendation engines.",
      },
      {
        title: "Connecting models to systems",
        detail: "MCP is how an agent works with systems you already run, so the stack can stay.",
      },
      {
        title: "A place to begin",
        detail:
          "We start with one named workflow, the systems it touches, and which decisions a person still needs to make. We are a CrewAI Solutions Partner.",
      },
    ],
    proofNote:
      "ACS CARES added semantic search and volunteer matching so people can find support in their own words. Well Aware reads a photo of a water test strip. Both are AI inside a product. Neither is an autonomous agent.",
    relatedProjectSlugs: ["acs-cares", "well-aware"],
    faqs: [
      {
        question: "What do you mean by an agent?",
        answer:
          "Software that can act across tools: create a task, route an approval, answer inside a product, or call a system you already run through MCP.",
      },
      {
        question: "We have not picked a workflow yet. Can we still talk?",
        answer:
          "Yes. If you have thought about building or buying AI and you are not sure where to start, this is the right conversation. We will sort build, buy, or wait with you.",
      },
      {
        question: "Does an agent replace the person in the loop?",
        answer:
          "No. We design the integration so a person stays on the decisions that need one. Where that line sits is part of the engagement.",
      },
      {
        question: "Is ACS CARES an agent project?",
        answer:
          "No. The 2024 work is semantic search and similarity matching inside the app. Question prompts, chatbots, and agents that could help with lodging, rides, or trials are later exploration, not features in the shipped app.",
      },
    ],
    sourceUrl: "https://www.crosscomm.com/services/ai-agents-and-automation/",
  },
  {
    slug: "ai-strategy-consulting",
    name: "AI strategy consulting",
    description: "Discovery, a readiness audit, and workshops that end in a roadmap for where AI belongs.",
    lead:
      "Strategy is a decision engagement, not a build. We look for near-term AI opportunities, audit how ready the organization is, and run workshops that find repetitive work a more agent-like approach might take on.",
    audience:
      "Leaders who need to know where AI belongs before they fund a product. Discovery, the readiness audit, and the workshops can stand alone or run together.",
    activities: [
      {
        title: "Discovery",
        detail:
          "Sessions with business and IT to find near-term opportunities, judge feasibility, and sketch a roadmap. We look at return as part of that judgment. We do not promise one.",
      },
      {
        title: "Readiness audit",
        detail: "A look at technology, data, security, skills, and culture, with recommended next steps.",
      },
      {
        title: "Workshops",
        detail: "We surface repetitive tasks and decide which ones are realistic candidates for agent-style automation.",
      },
      {
        title: "What you leave with",
        detail:
          "A clearer sense of where AI fits, how ready the organization is, a few near-term opportunities, longer-term options, and a roadmap tied to budget and priorities.",
      },
    ],
    proofNote:
      "ACS CARES and Well Aware are products we shipped, not strategy engagements. They show the kind of AI a roadmap can point toward.",
    relatedProjectSlugs: ["acs-cares", "well-aware"],
    faqs: [
      {
        question: "Is this the same engagement as building the software?",
        answer:
          "No. Strategy and readiness can stand alone. A roadmap does not obligate a build. App development and agent work are separate services.",
      },
      {
        question: "What do we leave with?",
        answer:
          "Where AI fits, how ready you are, a few near-term opportunities, longer-term options, and a roadmap you can fund in order.",
      },
      {
        question: "What should we bring to the first conversation?",
        answer:
          "The problem you have, when you want to start, whether this is new or an update, who the user is, an approximate budget, and which platforms you have in mind.",
      },
      {
        question: "Why are product stories on a strategy page?",
        answer:
          "So you can see AI we have already shipped. They are context for the work a roadmap can lead to. They are not strategy engagements.",
      },
    ],
    sourceUrl: "https://www.crosscomm.com/services/ai-strategy-consulting/",
  },
  {
    slug: "ai-training-seminars",
    name: "AI training seminars",
    description: "Seminars and technical webinars that teach teams how to use AI in the work they already do.",
    lead:
      "We teach teams how to use AI in the work they already do. Some sessions are for people getting familiar with everyday tools. Some are for operations teams tightening a workflow. Some are for developers learning to code with agents.",
    audience:
      "Companies that want a shared vocabulary and time to practice. We run separate tracks for general staff and for technical teams. A mixed company can take one track or both.",
    activities: [
      {
        title: "Basics",
        detail:
          "What AI and machine learning can and cannot do, and how generative AI differs from earlier machine-learning approaches.",
      },
      {
        title: "Tools in the room",
        detail:
          "Hands-on time for marketing, sales, and operations. The current set includes ChatGPT, Claude, Microsoft Copilot, and Veo 3.",
      },
      {
        title: "Practice",
        detail: "Prompting, workflow design, and making decisions with AI in the loop.",
      },
      {
        title: "Technical webinars",
        detail:
          "Deeper sessions for developers and IT: using AI to start a project, change existing code, review it, document it, and run coding agents.",
      },
    ],
    proofNote:
      "ACS CARES and Well Aware are product builds, not seminars. They are examples of AI put to work, which is the kind of work the sessions are about.",
    relatedProjectSlugs: ["acs-cares", "well-aware"],
    faqs: [
      {
        question: "Who should attend?",
        answer:
          "People who will use the tools in their own jobs. We split general business practice from developer sessions so a team can choose the track that fits.",
      },
      {
        question: "What will we practice?",
        answer:
          "Prompting, workflow design, and decisions made with AI assistance. Developer sessions add starting a project, changing code, review, documentation, and coding agents.",
      },
      {
        question: "Can a session use our own tools?",
        answer:
          "The open seminars use widely available tools and techniques. If you want the work grounded in your own systems, say so when we plan it. We will tell you whether that fits a seminar or a separate engagement.",
      },
      {
        question: "How is this different from strategy consulting?",
        answer:
          "Strategy leaves you with a readiness view and a roadmap. Training leaves people able to work with the tools. Neither one is a commitment to build a product.",
      },
    ],
    sourceUrl: "https://www.crosscomm.com/services/ai-training-seminars/",
  },
  {
    slug: "healthcare-app-development",
    name: "Healthcare app development",
    description: "Custom software for clinical care, research studies, and medical education.",
    lead:
      "We build software with research teams and care organizations. Clinical care, research studies, and medical education, including the practical problems of devices, interoperability, and health-data rules.",
    audience:
      "Research scientists and healthcare groups that need a study app, a care tool, or a training experience.",
    activities: [
      {
        title: "Care and research software",
        detail: "Digitizing care delivery and outcome reporting, and game-like experiences tied to health behaviors.",
      },
      {
        title: "Training and models",
        detail:
          "Immersive medical training in AR or VR, and 3D anatomical models a learner can inspect. Machine learning for diagnostics and precision medicine.",
      },
      {
        title: "Devices",
        detail: "Interventions that use data from wearables and other connected devices.",
      },
      {
        title: "Health-data rules",
        detail: "We help clients work through HIPAA requirements and other health-IT constraints as part of the build.",
      },
    ],
    proofNote:
      "ACS CARES is the American Cancer Society app for patients and caregivers. Well Aware, built with UNC Gillings School of Global Public Health, reads at-home well-water test strips.",
    relatedProjectSlugs: ["acs-cares", "well-aware"],
    faqs: [
      {
        question: "Can you build a research-study app?",
        answer:
          "Yes. Well Aware is one: a mobile app paired with an at-home water test, built with researchers at the UNC Gillings School of Global Public Health.",
      },
      {
        question: "What kinds of healthcare products do you take on?",
        answer:
          "Care delivery and outcome reporting, study apps, medical education in AR or VR, anatomical models, and products that use wearable data.",
      },
      {
        question: "How do health-data rules show up in the work?",
        answer:
          "We help you account for HIPAA and other health-IT constraints while the product is designed and built. Clinical decisions stay with the clinical organization.",
      },
      {
        question: "Which healthcare projects can I read now?",
        answer: "ACS CARES and Well Aware. Each write-up ends with a link to the original case study.",
      },
    ],
    sourceUrl: "https://www.crosscomm.com/services/healthcare-app-development/",
  },
];

export function serviceBySlug(slug: string): ServiceRecord | undefined {
  return services.find((service) => service.slug === slug);
}
