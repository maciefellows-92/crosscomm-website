import type { ServiceRecord } from "./types";

const retrieved = "Retrieved 4 October 2026 from the public CrossComm page.";

export const services: ServiceRecord[] = [
  {
    slug: "app-development",
    name: "App development",
    description:
      "Custom web, mobile, and connected product development with CrossComm, from discovery and design through build and support.",
    lead:
      "CrossComm designs and builds custom software when a team needs a product of its own, not a template with a logo swapped in. The public service page describes web, mobile, AI features inside products, XR, connected devices, interface design, and the backend work that keeps a product running.",
    audience:
      "Teams with a specific user and a problem that off-the-shelf software does not cover. The page names healthcare, research, education, and marketing as examples, and it points at products CrossComm has already shipped.",
    activities: [
      {
        title: "Mobile",
        detail: "iOS, Android, and cross-platform apps. The page describes this as a long-running practice, not a new side offer.",
      },
      {
        title: "Web",
        detail: "Interfaces in the browser, with backend structure the page says is meant to grow with the business.",
      },
      {
        title: "Product AI",
        detail: "Large language models placed inside an app or site so the product itself is more useful. That is product work, not a claim that every app is an autonomous agent.",
      },
      {
        title: "XR, devices, and design",
        detail:
          "The page also lists AR, VR, and mixed reality (including headsets and phones), apps that talk to wearables and other devices, interface design, backend maintenance, and advice on whether a new technology belongs on the project.",
      },
    ],
    proofNote:
      "The three projects on this site that connect here are ACS CARES and Well Aware (mobile products with AI features) and the Smithsonian National Museum of African Art web app. Other legacy case studies are not on this review site yet.",
    relatedProjectSlugs: ["acs-cares", "well-aware", "smithsonian-national-museum-of-african-art"],
    faqs: [
      {
        question: "Which platforms can a project ship on?",
        answer:
          "The public page lists iOS, Android, cross-platform mobile, the web, headset and phone XR, and connections to wearables and other devices. The right set is a project decision, not a default stack.",
      },
      {
        question: "What happens before anyone writes production code?",
        answer:
          "CrossComm's approach page describes a discovery step that checks fit and scope, then a plan with low-fidelity wireframes, then higher-fidelity design, then weekly builds. Launch and support come after that.",
      },
      {
        question: "Who owns the product and the code?",
        answer:
          "The public pages do not publish a standard contract, a price, or an intellectual-property clause. Ownership and handoff belong in the consultation, not in a guess on this website.",
      },
      {
        question: "Is ACS CARES an example of this service?",
        answer:
          "Yes. The case study describes a mobile app CrossComm designed and built with the American Cancer Society. It is also listed under healthcare and AI product work. It is not described as an autonomous agent.",
      },
    ],
    sourceUrl: "https://www.crosscomm.com/services/app-development/",
  },
  {
    slug: "ai-agents-and-automation",
    name: "AI agents and automation",
    description:
      "Help integrating agentic AI and the Model Context Protocol into workflows and products, as described on CrossComm's public service page.",
    lead:
      "This service is for teams that want software to take steps inside the tools they already use. CrossComm's public page says the studio helps organizations integrate agentic AI and use the Model Context Protocol (MCP) so agents can reach existing systems without replacing the whole stack.",
    audience:
      "People responsible for product, engineering, operations, or innovation who already juggle several tools and want less repetitive work. The page says the fit is weaker if you are still deciding whether to build or buy and have not named a workflow.",
    activities: [
      {
        title: "Internal workflows",
        detail: "The page names scheduling, task creation, approvals, onboarding, and ticketing as the kind of work agents can take on.",
      },
      {
        title: "Features inside a product",
        detail: "Chatbots, smarter forms, and recommendation engines are the examples the page gives for customer-facing AI.",
      },
      {
        title: "Connecting models to systems",
        detail:
          "The page describes MCP as a way for agents to work with systems a company already runs. Don Shin is quoted there on that point. This site does not add a diagram or a vendor matrix the source does not publish.",
      },
      {
        title: "A partnership label to confirm",
        detail: `The same page calls CrossComm a CrewAI Solutions Partner. ${retrieved} Confirm that label before it is treated as current.`,
      },
    ],
    proofNote:
      "ACS CARES and Well Aware are evidence of AI inside a product: semantic search and matching in ACS CARES, and models that read well-water test strips in Well Aware. The public case studies do not describe either project as an agent implementation. Do not present them as one.",
    relatedProjectSlugs: ["acs-cares", "well-aware"],
    faqs: [
      {
        question: "What does CrossComm mean by an agent?",
        answer:
          "The public page describes software that can act across tools: creating tasks, routing approvals, answering inside a product, and calling existing systems through MCP. It is a services description, not a published architecture for a named client.",
      },
      {
        question: "Does an agent replace a person in the loop?",
        answer:
          "The page frames the work as safe integration. It does not publish a universal rule for when a human must approve an action. That boundary is part of the engagement, and this site will not invent one.",
      },
      {
        question: "Is ACS CARES an agent project?",
        answer:
          "No. The 2024 work described on the ACS CARES case study is semantic search and similarity matching inside the app. The page lists agents, chatbots, and similar ideas as future exploration, not as features it says shipped.",
      },
      {
        question: "Do we have to throw out our current tools?",
        answer:
          "The public page says MCP is a way to connect agents to existing systems rather than overhaul the stack. Whether that is true for a given toolchain is a discovery question.",
      },
    ],
    sourceUrl: "https://www.crosscomm.com/services/ai-agents-and-automation/",
  },
  {
    slug: "ai-strategy-consulting",
    name: "AI strategy consulting",
    description:
      "Discovery, an AI readiness audit, and workshops that end in a roadmap, as CrossComm's public strategy page describes them.",
    lead:
      "Strategy work here is a decision engagement, not a build. CrossComm's public page offers a discovery pass for near-term AI opportunities, a readiness audit of technology, data, security, skills, and culture, and workshops that look for repetitive work a more agent-like approach might take on.",
    audience:
      "Leaders who need to know where AI belongs before they fund a product. The page says the offerings can stand alone or run together.",
    activities: [
      {
        title: "Discovery",
        detail: "Sessions with business and IT teams to find near-term opportunities, judge feasibility, and sketch a roadmap. The page mentions ROI as something the work assesses. It does not publish a promised return.",
      },
      {
        title: "Readiness audit",
        detail: "A look at tech, data, security, expertise, and culture, with recommended next steps. This site does not turn that into a score or a certification.",
      },
      {
        title: "Workshops",
        detail: "Collaborative sessions to surface repetitive tasks and decide which ones are realistic candidates for agent-style automation.",
      },
      {
        title: "What you leave with",
        detail:
          "The page says clients should leave with a clearer sense of where AI fits, how ready the organization is, a few near-term opportunities, longer-term options, and a roadmap tied to budget and priorities.",
      },
    ],
    proofNote:
      "None of the three case studies on this site is a strategy engagement. ACS CARES and Well Aware show AI inside shipped products. They are context for the kind of build that can follow a strategy, not proof that those clients bought this consulting offer.",
    relatedProjectSlugs: ["acs-cares", "well-aware"],
    faqs: [
      {
        question: "Is this the same engagement as building the software?",
        answer:
          "No. The public page says strategy and readiness can be standalone. App development and agent implementation are separate services. A roadmap does not obligate a build.",
      },
      {
        question: "Will you guarantee a return?",
        answer:
          "No. The page says discovery assesses feasibility and ROI. This website publishes no percentage, no payback period, and no savings figure.",
      },
      {
        question: "What should we bring to the first conversation?",
        answer:
          "The contact page on the current CrossComm site asks what problem you have, when you want to start, whether the product is new or an update, who the user is, an approximate budget, and which platforms you have in mind. Those are sensible inputs for a strategy conversation too.",
      },
      {
        question: "Why are product case studies linked from a strategy page?",
        answer:
          "So you can see AI work CrossComm has shipped. The link is context. It is not a claim that ACS CARES or Well Aware was a strategy-consulting project.",
      },
    ],
    sourceUrl: "https://www.crosscomm.com/services/ai-strategy-consulting/",
  },
  {
    slug: "ai-training-seminars",
    name: "AI training seminars",
    description:
      "Seminars and technical webinars that teach teams how to use AI in daily work, based on CrossComm's public training page.",
    lead:
      "CrossComm teaches teams how to use AI in the work they already do. The public page describes sessions for people exploring everyday tools, for operations teams tightening a workflow, and for developers learning to code with agents.",
    audience:
      "Companies that want a shared vocabulary and some practice, not a keynote. The page splits the audience across general staff and technical teams.",
    activities: [
      {
        title: "Basics",
        detail: "What AI and machine learning can and cannot do, and the difference between generative AI and older machine-learning approaches.",
      },
      {
        title: "Tools in the room",
        detail:
          "The page, retrieved 4 October 2026, names hands-on time with ChatGPT, Claude, Microsoft Copilot, and Veo 3, aimed at marketing, sales, and operations. Tool names go stale. Confirm the current list before you book.",
      },
      {
        title: "Practice",
        detail: "Prompting, workflow design, and making decisions with AI assistance are the skill areas the page lists.",
      },
      {
        title: "Technical webinars",
        detail:
          "Deeper sessions for developers and IT on using AI to start a project, change existing code, review it, document it, and run coding agents. The page does not publish a duration, a class size, or a price.",
      },
    ],
    proofNote:
      "Training is not the same engagement as a shipped product. ACS CARES and Well Aware are linked so a buyer can see the kind of AI product work the studio discusses in class. They are not training engagements, and this page does not invent a syllabus from them.",
    relatedProjectSlugs: ["acs-cares", "well-aware"],
    faqs: [
      {
        question: "Do participants leave with a certificate?",
        answer: "The public page does not mention a certificate, a credential, or a university partner. Do not assume one.",
      },
      {
        question: "Is this only for engineers?",
        answer:
          "No. The page describes separate tracks for general business tools and for developers. A mixed company can ask for one track or both.",
      },
      {
        question: "Can you train us on our own data and tools?",
        answer:
          "The page describes common tools and techniques. It does not say every seminar is built on a client's private systems. Ask that in the consultation if it matters.",
      },
      {
        question: "How is this different from strategy consulting?",
        answer:
          "Strategy produces a readiness view and a roadmap. Training teaches people to work with the tools. Neither one is a commitment to build a product.",
      },
    ],
    sourceUrl: "https://www.crosscomm.com/services/ai-training-seminars/",
  },
  {
    slug: "healthcare-app-development",
    name: "Healthcare app development",
    description:
      "Custom software for clinical care, research, and medical education, including the healthcare products documented on this site.",
    lead:
      "CrossComm builds software with research teams and care organizations. The public page describes custom experiences for clinical care, research studies, and medical education, plus the practical problems that come with devices, interoperability, and health-data rules.",
    audience:
      "Research scientists and healthcare groups that need a study app, a care tool, or a training experience. It is not a clinic, and this site does not offer medical advice.",
    activities: [
      {
        title: "Care and research software",
        detail: "The page lists digitizing care delivery and outcome reporting, and gamified experiences tied to health behaviors.",
      },
      {
        title: "Training and models",
        detail: "Immersive medical training in AR or VR, and 3D anatomical models a learner can inspect. Machine learning for diagnostics and precision medicine is also listed as an area of work.",
      },
      {
        title: "Devices",
        detail: "Interventions that use data from wearables and other connected devices.",
      },
      {
        title: "Health-data rules, stated carefully",
        detail:
          "The public page says the team helps clients navigate HIPAA requirements and other health-IT constraints. It also displays certification badges. This review site does not repeat a HIPAA or SOC 2 certification claim. Confirm any compliance wording with the owner before cutover.",
      },
    ],
    proofNote:
      "ACS CARES (American Cancer Society) and Well Aware (with UNC Gillings) are the healthcare projects published on this site. Both are also mobile products with AI features. The legacy site has more health case studies that are not ported yet.",
    relatedProjectSlugs: ["acs-cares", "well-aware"],
    faqs: [
      {
        question: "Is CrossComm HIPAA certified?",
        answer:
          "This site does not say that. The public healthcare page discusses navigating HIPAA requirements and shows certification imagery. Those claims need the owner's confirmation and the right legal wording before they appear here.",
      },
      {
        question: "Can you build a research-study app?",
        answer:
          "That is one of the uses the public page describes. Well Aware is a documented example: a mobile app paired with an at-home water test, built with a university research team. A study protocol, consent, and data handling are the client's to define.",
      },
      {
        question: "Do you provide clinical advice or patient care?",
        answer: "No. CrossComm is a software studio. Clinical decisions stay with the clinical organization.",
      },
      {
        question: "Which of your healthcare projects can I read now?",
        answer:
          "ACS CARES and Well Aware are written up on this site, with links back to the original case studies. Other health projects remain on the legacy site until they are ported on purpose.",
      },
    ],
    sourceUrl: "https://www.crosscomm.com/services/healthcare-app-development/",
  },
];

export function serviceBySlug(slug: string): ServiceRecord | undefined {
  return services.find((service) => service.slug === slug);
}
