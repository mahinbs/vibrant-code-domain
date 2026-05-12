export type Service = {
  id: string;
  title: string;
  blurb: string;
  duration: string;
  bullets: string[];
  stack: string[];
  isNew?: boolean;
};

export const services: Service[] = [
  {
    id: "web",
    title: "Web Applications",
    blurb:
      "Production-grade web apps built with modern frameworks, designed to scale.",
    duration: "4-12 weeks",
    bullets: [
      "React & Next.js architecture",
      "Real-time features & WebSockets",
      "Cloud-native deploys (AWS/GCP)",
      "Progressive Web Apps",
    ],
    stack: ["TypeScript", "Next.js", "Tailwind", "Postgres"],
  },
  {
    id: "saas",
    title: "SaaS Platforms",
    blurb:
      "Multi-tenant SaaS with billing, analytics and admin baked in from day one.",
    duration: "8-16 weeks",
    bullets: [
      "Multi-tenant architecture",
      "Stripe billing & subscriptions",
      "Analytics dashboards",
      "Public & internal APIs",
    ],
    stack: ["React", "Stripe", "AWS", "Redis"],
  },
  {
    id: "mobile",
    title: "Mobile Applications",
    blurb:
      "Native and cross-platform iOS / Android apps your users actually love.",
    duration: "6-14 weeks",
    bullets: [
      "iOS & Android native",
      "React Native cross-platform",
      "Push notifications & deep links",
      "App store launch support",
    ],
    stack: ["React Native", "Swift", "Kotlin", "Firebase"],
  },
  {
    id: "ai-calling",
    title: "AI Calling Agency",
    blurb:
      "Voice AI agents that qualify leads, run support and close deals 24/7.",
    duration: "6-10 weeks",
    bullets: [
      "Real-time voice AI",
      "Call analytics & sentiment",
      "Outbound lead generation",
      "CRM & telephony integration",
    ],
    stack: ["OpenAI", "Twilio", "Python", "TensorFlow"],
    isNew: true,
  },
  {
    id: "ai-automation",
    title: "AI Automation",
    blurb:
      "Custom AI workflows that take repetitive ops off your team's plate.",
    duration: "8-12 weeks",
    bullets: [
      "Process & workflow automation",
      "Custom ML models",
      "Document & data extraction",
      "Integrations across your stack",
    ],
    stack: ["Python", "LangChain", "AWS Lambda", "Zapier"],
    isNew: true,
  },
  {
    id: "design",
    title: "Product Design (UI/UX)",
    blurb:
      "Interfaces that feel inevitable - clear, fast, and conversion-tuned.",
    duration: "2-6 weeks",
    bullets: [
      "Discovery & user research",
      "Wireframes & high-fidelity UI",
      "Design systems",
      "Usability testing",
    ],
    stack: ["Figma", "Framer", "Principle", "Maze"],
  },
];
