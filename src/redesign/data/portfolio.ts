export type PortfolioItem = {
  id: string;
  slug: string;
  title: string;
  industry: string;
  outcome: string;
  /** Case study / marketing body from DB; shown under headline outcome on industry landings. */
  description?: string;
  stack: string[];
  gradient: string;
  image?: string;
  serviceId?: string;
};

export const portfolio: PortfolioItem[] = [
  {
    id: "fintech-ledger",
    slug: "fintech-ledger",
    title: "Realtime ledger for a neo-bank",
    industry: "Fintech",
    outcome: "Cut transaction reconciliation time by 87%",
    stack: ["Next.js", "Postgres", "Kafka"],
    gradient:
      "radial-gradient(120% 100% at 0% 0%, rgba(72,118,255,0.48), rgba(0,0,0,0.85) 70%)",
  },
  {
    id: "ai-voice-clinic",
    slug: "ai-voice-clinic",
    title: "AI voice receptionist for clinics",
    industry: "Healthtech",
    outcome: "Booked 4,200+ appointments without human reps",
    stack: ["OpenAI", "Twilio", "Python"],
    gradient:
      "radial-gradient(120% 100% at 100% 0%, rgba(96,142,255,0.34), rgba(0,0,0,0.85) 70%)",
  },
  {
    id: "saas-ops",
    slug: "saas-ops-dashboard",
    title: "Multi-tenant ops dashboard",
    industry: "B2B SaaS",
    outcome: "Onboarded 60+ tenants in the first quarter",
    stack: ["React", "Stripe", "AWS"],
    gradient:
      "radial-gradient(120% 100% at 50% 100%, rgba(22,36,74,0.72), rgba(0,0,0,0.9) 70%)",
  },
  {
    id: "mobile-fitness",
    slug: "ai-fitness-coach",
    title: "AI fitness coach (iOS / Android)",
    industry: "Consumer mobile",
    outcome: "92% week-1 retention in beta cohort",
    stack: ["React Native", "Firebase", "ML Kit"],
    gradient:
      "radial-gradient(120% 100% at 0% 100%, rgba(72,118,255,0.52), rgba(0,0,0,0.85) 70%)",
  },
  {
    id: "ai-automation-logistics",
    slug: "ai-document-automation",
    title: "Document AI for logistics ops",
    industry: "Logistics",
    outcome: "Automated 12,000+ docs/month at 99.4% accuracy",
    stack: ["LangChain", "Python", "AWS"],
    gradient:
      "radial-gradient(120% 100% at 100% 100%, rgba(84,130,255,0.28), rgba(0,0,0,0.9) 70%)",
  },
  {
    id: "marketplace",
    slug: "creator-marketplace-design",
    title: "Two-sided creator marketplace",
    industry: "Marketplace",
    outcome: "$2.1M GMV in first 5 months",
    stack: ["Next.js", "Stripe Connect", "Algolia"],
    gradient:
      "radial-gradient(120% 100% at 50% 0%, rgba(14,26,52,0.88), rgba(0,0,0,0.9) 70%)",
  },
];
