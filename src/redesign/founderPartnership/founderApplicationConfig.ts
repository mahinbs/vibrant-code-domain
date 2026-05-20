import type { FounderPhaseId, FounderSceneId } from "./founderApplicationTypes";

export const FOUNDER_SOURCE_PAGE = "founder-partnership";
export const FORM_VERSION = "v2.2" as const;
export const SOFT_TEXT_RECOMMENDED_CHARS = 50;

export const FOUNDER_HERO_REQUIREMENTS = {
  intro: "Due to high demand, we require you to complete this application.",
  reasons: [
    "We review every application before scheduling founder strategy calls.",
    "Your answers help us assess fit, timeline, and execution scope upfront.",
    "Completed applications are prioritized in our selective founder queue.",
  ],
  applicationTime: "Application time: 8–10 minutes",
} as const;

export type SceneMeta = {
  id: FounderSceneId;
  phase: FounderPhaseId;
  phaseIndex: number;
  eyebrow: string;
  headline: string;
  subheadline?: string;
};

export const SCENE_ORDER: FounderSceneId[] = [
  "hero",
  "identity",
  "building",
  "ideaOrigin",
  "blockers",
  "noCode",
  "technicalSupport",
  "marketUnderstanding",
  "validation",
  "commitment",
  "timeline",
  "budget",
  "partnership",
  "vision3Year",
  "founderMindset",
  "psychStake",
  "psychConviction",
  "milestone",
  "queue",
  "aboutCompany",
];

export const PHASE_ORDER: FounderPhaseId[] = [
  "identity",
  "reality",
  "business",
  "investment",
  "psychology",
  "close",
];

export const SCENE_META: Record<FounderSceneId, SceneMeta> = {
  hero: {
    id: "hero",
    phase: "identity",
    phaseIndex: 0,
    eyebrow: "Founder Application",
    headline: "Start The Next Big Tech Company.",
    subheadline:
      "A selective founder application for ambitious builders looking to launch scalable Tech businesses.",
  },
  identity: {
    id: "identity",
    phase: "identity",
    phaseIndex: 0,
    eyebrow: "Introduction",
    headline: "Let's begin your application.",
    subheadline:
      "Most founders never move beyond the idea stage. This is where execution begins.",
  },
  building: {
    id: "building",
    phase: "identity",
    phaseIndex: 0,
    eyebrow: "Your vision",
    headline: "What are you trying to build?",
  },
  ideaOrigin: {
    id: "ideaOrigin",
    phase: "identity",
    phaseIndex: 0,
    eyebrow: "Origin",
    headline: "What sparked this idea?",
  },
  blockers: {
    id: "blockers",
    phase: "reality",
    phaseIndex: 1,
    eyebrow: "Reality check",
    headline: "What's stopping you from launching?",
  },
  noCode: {
    id: "noCode",
    phase: "reality",
    phaseIndex: 1,
    eyebrow: "Reality check",
    headline: "Have you explored no-code or AI builders before?",
  },
  technicalSupport: {
    id: "technicalSupport",
    phase: "reality",
    phaseIndex: 1,
    eyebrow: "Execution",
    headline: "Do you currently have technical support?",
  },
  marketUnderstanding: {
    id: "marketUnderstanding",
    phase: "business",
    phaseIndex: 2,
    eyebrow: "Business fundamentals",
    headline: "How do you believe this company will generate revenue?",
  },
  validation: {
    id: "validation",
    phase: "business",
    phaseIndex: 2,
    eyebrow: "Market validation",
    headline: "Have you validated this idea in any way?",
  },
  commitment: {
    id: "commitment",
    phase: "business",
    phaseIndex: 2,
    eyebrow: "Commitment",
    headline: "How serious are you about building this?",
  },
  timeline: {
    id: "timeline",
    phase: "business",
    phaseIndex: 2,
    eyebrow: "Timeline",
    headline: "When are you planning to start building?",
  },
  budget: {
    id: "budget",
    phase: "investment",
    phaseIndex: 3,
    eyebrow: "Investment",
    headline: "What level of investment are you prepared to allocate?",
  },
  partnership: {
    id: "partnership",
    phase: "investment",
    phaseIndex: 3,
    eyebrow: "Partnership",
    headline: "What type of partnership are you looking for?",
  },
  vision3Year: {
    id: "vision3Year",
    phase: "psychology",
    phaseIndex: 4,
    eyebrow: "Vision",
    headline: "If executed correctly, where do you see this company in 3 years?",
  },
  founderMindset: {
    id: "founderMindset",
    phase: "psychology",
    phaseIndex: 4,
    eyebrow: "Founder mindset",
    headline: "Why is building this important to you?",
  },
  psychStake: {
    id: "psychStake",
    phase: "psychology",
    phaseIndex: 4,
    eyebrow: "Reflection",
    headline: "What's at stake for you if this doesn't get built in the next 12 months?",
  },
  psychConviction: {
    id: "psychConviction",
    phase: "psychology",
    phaseIndex: 4,
    eyebrow: "Conviction",
    headline: "How committed are you to making this your primary focus for the next 12 months?",
  },
  milestone: {
    id: "milestone",
    phase: "close",
    phaseIndex: 5,
    eyebrow: "Milestone",
    headline: "You've taken the first step.",
    subheadline:
      "Partnering with a serious tech execution company is selective. Your application reflects that commitment.",
  },
  queue: {
    id: "queue",
    phase: "close",
    phaseIndex: 5,
    eyebrow: "Received",
    headline: "You're in the queue.",
    subheadline:
      "A founder strategy specialist from BoostMySites will reach out if your application aligns with our current partnership criteria.",
  },
  aboutCompany: {
    id: "aboutCompany",
    phase: "close",
    phaseIndex: 5,
    eyebrow: "Who we are",
    headline: "Built for founders who are done prototyping alone.",
  },
};

export const BUILDING_OPTIONS = [
  { value: "saas", label: "SaaS Platform", micro: "SaaS companies are built on strong infrastructure, positioning, and recurring systems." },
  { value: "ai-product", label: "AI Product", micro: "AI products need reliable data pipelines, model ops, and productized delivery—not just demos." },
  { value: "fintech", label: "Fintech Startup", micro: "Fintech demands compliance-ready architecture, security, and trust from day one." },
  { value: "marketplace", label: "Marketplace", micro: "Marketplaces win on liquidity, payments, and operational systems on both sides." },
  { value: "mobile-app", label: "Mobile App", micro: "Mobile products need scalable backends, analytics, and retention systems behind the UI." },
  { value: "internal-software", label: "Internal Business Software", micro: "Internal platforms still require enterprise-grade reliability and integration depth." },
  { value: "healthcare", label: "Healthcare Platform", micro: "Healthcare products require compliance, data governance, and clinical-grade reliability." },
  { value: "other", label: "Something else", micro: "Every serious product still needs architecture, GTM, and long-term engineering discipline." },
] as const;

export const BLOCKER_OPTIONS = [
  { value: "technical-complexity", label: "Technical complexity" },
  { value: "no-dev-team", label: "Lack of development team" },
  { value: "branding", label: "Branding & positioning" },
  { value: "gtm", label: "Go-to-market confusion" },
  { value: "funding", label: "Funding uncertainty" },
  { value: "no-cofounder", label: "No technical cofounder" },
  { value: "where-to-begin", label: "Don't know where to begin" },
] as const;

export const BLOCKERS_MICRO =
  "Most founders fail because execution requires multiple specialized layers working together.";

export const NO_CODE_MICRO_YES =
  "No-code tools are excellent for prototyping. But scalable companies eventually require custom infrastructure, scalability, integrations, security, and long-term architecture.";

export const NO_CODE_MICRO_NO =
  "Starting with clarity on build vs. buy saves months. Serious companies plan for custom infrastructure early.";

export const TECHNICAL_SUPPORT_OPTIONS = [
  { value: "cofounder", label: "A technical cofounder", micro: "Even with a cofounder, most teams still need specialized execution on infrastructure and scale." },
  { value: "team", label: "A development team", micro: "Teams often need a partner for architecture, velocity, and specialized systems." },
  { value: "none", label: "No technical support", micro: "That's exactly where a dedicated execution partner becomes your infrastructure layer." },
] as const;

export const REVENUE_MODEL_OPTIONS = [
  { value: "subscription", label: "Subscription / SaaS", micro: "Sustainable businesses are built on predictable revenue systems and scalable distribution." },
  { value: "commission", label: "Commission / Marketplace", micro: "Marketplace revenue depends on liquidity, trust, and transaction infrastructure." },
  { value: "service", label: "Service-based", micro: "Service models scale when productized systems reduce delivery friction." },
  { value: "advertising", label: "Advertising", micro: "Ad models need audience scale, retention data, and platform reliability." },
  { value: "enterprise", label: "Enterprise contracts", micro: "Enterprise revenue requires security, compliance, and long sales-cycle systems." },
  { value: "transaction-fees", label: "Transaction fees", micro: "Fee-based models need payments infrastructure, reconciliation, and trust." },
  { value: "figuring-out", label: "Still figuring it out", micro: "Clarifying revenue mechanics early prevents expensive rebuilds later." },
] as const;

export const VALIDATION_OPTIONS = [
  { value: "existing-customers", label: "Existing customers", micro: "Validation reduces risk and accelerates execution clarity." },
  { value: "waitlist", label: "Waitlist / community", micro: "Early demand signals help prioritize what to build first." },
  { value: "market-research", label: "Market research", micro: "Research informs positioning—but execution still separates winners." },
  { value: "competitor-analysis", label: "Competitor analysis", micro: "Understanding the landscape is step one; differentiation requires shipping." },
  { value: "mvp", label: "Prototype / MVP", micro: "Validation reduces risk and accelerates execution clarity." },
  { value: "idea-only", label: "Just an idea currently", micro: "Ideas are common. Validated execution paths are rare—that's what we help build." },
] as const;

export const COMMITMENT_LEVELS = [
  { value: 1, label: "Exploring casually" },
  { value: 2, label: "Side project" },
  { value: 3, label: "Serious startup idea" },
  { value: 4, label: "Ready to execute" },
  { value: 5, label: "Building aggressively" },
] as const;

export const TIMELINE_OPTIONS = [
  { value: "immediately", label: "Immediately", micro: "Urgency with the right partner compresses time-to-market dramatically." },
  { value: "within-30", label: "Within 30 days", micro: "A focused 30-day execution window can define your first market advantage." },
  { value: "1-3mo", label: "1–3 months", micro: "Three months is enough to ship a credible v1—with the right systems in place." },
  { value: "exploring", label: "Exploring timelines", micro: "Clarity on timeline helps align scope, team, and investment." },
  { value: "researching", label: "Just researching currently", micro: "Research is valuable when it leads to a committed build plan." },
] as const;

export const BUDGET_OPTIONS = [
  { value: "below-3l", label: "Below ₹3L" },
  { value: "3l-5l", label: "₹3L–₹5L" },
  { value: "5l-10l", label: "₹5L–₹10L" },
  { value: "10l-20l", label: "₹10L–₹20L" },
  { value: "20l-50l", label: "₹20L–₹50L" },
  { value: "custom-scale", label: "Custom / Strategic Scale" },
] as const;

export const PARTNERSHIP_OPTIONS = [
  { value: "product-dev", label: "Product Development" },
  { value: "end-to-end", label: "End-to-End Startup Support" },
  { value: "branding", label: "Branding & Positioning" },
  { value: "technical-partner", label: "Technical Execution Partner" },
  { value: "gtm", label: "Go-To-Market Guidance" },
  { value: "long-term-growth", label: "Long-Term Growth Partnership" },
] as const;

export const MILESTONE_COPY = {
  subheadline:
    "You've taken the first step toward partnering with a serious tech execution company. Few founders make it this far with this level of intention.",
};

export const ABOUT_COMPANY_COPY = {
  intro:
    "BoostMySites is an execution partner for founders building scalable digital companies—not a generic dev shop. We combine product engineering, infrastructure, and go-to-market systems under one roof.",
  positioning:
    "We build for founders who are done prototyping alone and ready to ship production-grade products in fintech, healthcare, SaaS, and AI.",
};

export const COMPANY_STATS = [
  { value: "500+", label: "Projects delivered" },
  { value: "7+", label: "Years building" },
  { value: "230+", label: "Experts on staff" },
  { value: "2", label: "Regulated verticals" },
] as const;

export const PSYCH_STAKE_OPTIONS = [
  {
    value: "market-window",
    label: "I'd miss the market window",
    micro: "Timing compounds—founders who ship in the window often define the category.",
  },
  {
    value: "stuck-idea",
    label: "I'd stay stuck in the idea phase",
    micro: "Ideas without execution rarely compound. Partnership is how serious founders break through.",
  },
  {
    value: "competitor-first",
    label: "A competitor would ship first",
    micro: "In most markets, the team that ships credible v1 first sets the narrative.",
  },
  {
    value: "credibility",
    label: "I'd lose credibility with users or investors",
    micro: "Trust is hard to rebuild. Execution credibility starts with what you ship.",
  },
  {
    value: "runway",
    label: "My runway or opportunity cost would hurt",
    micro: "Every month without progress has a real cost—financial and psychological.",
  },
] as const;

export const PSYCH_CONVICTION_OPTIONS = [
  {
    value: "full-time",
    label: "Full-time — this is my primary focus",
    micro: "Primary focus is the signal we look for in partnership conversations.",
  },
  {
    value: "majority-time",
    label: "Majority of my time, minimal distractions",
    micro: "Sustained focus beats sporadic bursts when building systems that scale.",
  },
  {
    value: "serious-side",
    label: "Serious side project with clear milestones",
    micro: "Clear milestones help us align scope and delivery expectations early.",
  },
  {
    value: "ramping",
    label: "Ramping up over the next few months",
    micro: "A committed ramp plan can work when the build plan is equally clear.",
  },
  {
    value: "exploring",
    label: "Still validating before going all-in",
    micro: "Honesty here helps us advise whether partnership timing is right.",
  },
] as const;

export const QUEUE_COPY = {
  bullets: [
    "Your application is in our review queue",
    "We assess execution readiness and founder fit",
    "Shortlisted founders receive a strategy discussion",
  ],
};

export function sceneIndex(id: FounderSceneId): number {
  return SCENE_ORDER.indexOf(id);
}

export function emptyFormState() {
  return {
    name: "",
    email: "",
    phone: "",
    phoneCountry: "IN",
    buildingType: "",
    buildingTypeOther: "",
    ideaOrigin: "",
    launchBlockers: [] as string[],
    exploredNoCode: "" as "" | "yes" | "no",
    technicalSupport: "",
    revenueModel: "",
    validationStage: "",
    commitmentLevel: 3,
    timeline: "",
    budgetInr: "",
    partnershipTypes: [] as string[],
    vision3Year: "",
    founderMindset: "",
    psychStake: "",
    psychConviction: "",
  };
}

export const DRAFT_STORAGE_KEY = "founder_application_draft_token";

export const MULTI_SELECT_HINT = "You can choose multiple options." as const;

export const SOFT_TEXT_HINT = {
  encourage:
    "A little more detail helps us understand your vision. Aim for about 50 characters.",
  canContinue:
    "Nothing more to add? Tap Continue below—you can move on with your current answer.",
  waiting: "You can continue in a moment…",
} as const;

/** Scenes that use soft 50-char textarea flow */
export const SOFT_TEXT_SCENES = new Set<FounderSceneId>([
  "ideaOrigin",
  "vision3Year",
  "founderMindset",
]);

/** Scenes with no footer CTA */
export const SCENES_NO_CTA = new Set<FounderSceneId>(["milestone", "queue", "aboutCompany"]);
