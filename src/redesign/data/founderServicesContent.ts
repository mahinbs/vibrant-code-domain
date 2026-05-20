export type FounderServiceItem = {
  id: string;
  num: string;
  /** Accordion row headline: wrap impact words in {{double braces}}. */
  name: string;
  tag: string;
  description: [string, string];
  bullets: [string, string, string];
};

export const FOUNDER_SERVICES_INTRO =
  "One partner across {{product, brand, growth, and launch}}. You stay on {{vision and customers}}.";

export const FOUNDER_SERVICES: FounderServiceItem[] = [
  {
    id: "tech-product",
    num: "01",
    name: "{{Tech Product}} Development",
    tag: "Core",
    description: [
      "We architect, design, and build {{production-ready}} digital products from the ground up, transforming raw startup ideas into scalable software infrastructure built for real users, growth, and long-term expansion.",
      "From product strategy and technical architecture to sprint execution, QA, deployment, and post-launch scaling, we operate as your {{dedicated technical execution team}} across the entire lifecycle.",
    ],
    bullets: [
      "Product architecture, feature planning, and {{technical roadmapping}}",
      "Full-stack execution across web, mobile, backend, APIs, dashboards, and infrastructure",
      "Agile sprint delivery, QA systems, deployment pipelines, and {{scaling support}}",
    ],
  },
  {
    id: "brand-design",
    num: "02",
    name: "{{Brand Identity}} & Design",
    tag: "Strategy",
    description: [
      "The strongest startups don't just function well. They feel {{credible, memorable, and category-defining}} from the very first interaction.",
      "We craft the visual identity, user experience, product interface, and positioning systems that make your company look {{investable and ready for scale}} across customers, investors, and partners.",
    ],
    bullets: [
      "Brand positioning, identity systems, and {{strategic messaging}}",
      "UX/UI design built for adoption, clarity, and {{conversion}}",
      "Design systems and developer-ready handoffs aligned with {{engineering workflows}}",
    ],
  },
  {
    id: "marketing-growth",
    num: "03",
    name: "{{Marketing}} & Growth",
    tag: "Scale",
    description: [
      "Building the product is only one layer. Sustainable startups require {{acquisition systems}}, growth infrastructure, analytics, and retention strategies that compound over time.",
      "We help founders launch with {{measurable growth systems}} instead of disconnected marketing experiments, aligning product, funnels, content, and acquisition into one scalable ecosystem.",
    ],
    bullets: [
      "Go-to-market growth systems tailored to your {{stage and audience}}",
      "Funnel architecture, paid acquisition, analytics, and {{conversion tracking}}",
      "Messaging refinement, retention optimization, and {{scalable growth loops}}",
    ],
  },
  {
    id: "gtm-launch",
    num: "04",
    name: "{{Go-To-Market}} Execution",
    tag: "Launch",
    description: [
      "Most startups fail during {{execution}}, not ideation.",
      "We help translate your product into a {{market-ready business}} through launch sequencing, onboarding systems, monetization strategy, operational setup, and customer acquisition workflows designed for real-world traction.",
    ],
    bullets: [
      "Launch planning, onboarding flows, and {{customer journey}} execution",
      "Pricing strategy, subscription systems, and {{monetization infrastructure}}",
      "Sales assets, landing systems, demos, and {{operational launch support}}",
    ],
  },
  {
    id: "startup-india",
    num: "05",
    name: "{{Startup India}} Funding Support",
    tag: "Capital",
    description: [
      "Funding conversations require more than a pitch deck. Investors, accelerators, and grant programs evaluate {{execution readiness}}, technical clarity, scalability, and founder credibility.",
      "We help structure your startup narrative, product presentation, and technical documentation in a way that positions your company as a {{venture-ready business}}.",
    ],
    bullets: [
      "Startup India, grant, and {{ecosystem guidance}} where applicable",
      "Pitch narrative development, product storytelling, and {{founder positioning}}",
      "Technical documentation, investor prep, and {{due-diligence readiness}}",
    ],
  },
];
