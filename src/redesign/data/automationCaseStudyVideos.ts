export type CaseVideoSection = "long-form" | "event" | "short";
export type CaseVideoAspect = "16:9" | "9:16";

export type AutomationCaseVideo = {
  id: string;
  title: string;
  tag: string;
  description: string;
  industry: string;
  section: CaseVideoSection;
  aspect: CaseVideoAspect;
  order: number;
  /** Workflows automated in this client build (shown on case study page). */
  workflowsAutomated?: number;
  /** Short outcome chip below the description. */
  outcomeLabel?: string;
};

export const CASE_STUDY_PAGE_STATS = [
  { value: "200+", label: "Businesses Automated" },
  { value: "500+", label: "Workflows Deployed" },
  { value: "60%", label: "Average Time Saved" },
  { value: "30 days", label: "Average Go-Live" },
] as const;

export const EVENT_HIGHLIGHT_STATS = [
  { value: "40+", label: "Founders & operators" },
  { value: "6", label: "Live demos shown" },
] as const;

export const AUTOMATION_CASE_STUDY_VIDEOS: AutomationCaseVideo[] = [
  {
    id: "cXhRjw1myAo",
    title: "AI Agents for Real Time Business Intelligence",
    tag: "Business intelligence",
    description:
      "AI agents that surface live KPIs, alerts, and trends — so leadership acts on data the same day, not after a weekly report.",
    industry: "Analytics",
    section: "long-form",
    aspect: "16:9",
    order: 1,
    workflowsAutomated: 8,
    outcomeLabel: "Same-day reporting",
  },
  {
    id: "c1Bg46GO9PU",
    title: "Most businesses think they have a lead generation problem. Reality: lead management.",
    tag: "Sales & CRM",
    description:
      "Automated follow-up, routing, and nurture workflows so inbound leads get a response in minutes, not days.",
    industry: "Sales",
    section: "long-form",
    aspect: "16:9",
    order: 2,
    workflowsAutomated: 6,
    outcomeLabel: "Response in under 5 min",
  },
  {
    id: "KX1TjgNiNjE",
    title: "The goal isn't just automation. The goal is decision intelligence.",
    tag: "Strategy",
    description:
      "Connected ops data turned into daily decisions — fewer spreadsheets, clearer priorities across the team.",
    industry: "Operations",
    section: "long-form",
    aspect: "16:9",
    order: 3,
    workflowsAutomated: 10,
    outcomeLabel: "3 dashboards unified",
  },
  {
    id: "8I1O1YTJ8Pc",
    title: "How We Replaced a Full-Time Employee with AI",
    tag: "ROI",
    description:
      "Repetitive admin and coordination work handled by AI agents — same output, without adding headcount.",
    industry: "Operations",
    section: "long-form",
    aspect: "16:9",
    order: 4,
    workflowsAutomated: 14,
    outcomeLabel: "1 full role automated",
  },
  {
    id: "MSxcrnb-rLE",
    title: "Behind every successful dairy business is a process that runs with precision.",
    tag: "Dairy",
    description:
      "Inventory, dispatch, and supplier coordination automated end-to-end for a dairy operation that runs on tight margins.",
    industry: "Dairy",
    section: "long-form",
    aspect: "16:9",
    order: 5,
    workflowsAutomated: 9,
    outcomeLabel: "Dispatch + inventory synced",
  },
  {
    id: "00wfHdHV4gU",
    title: "AI Automation Event",
    tag: "Event",
    description:
      "Founders and operators sharing live demos, real workflows, and what's working in AI automation right now.",
    industry: "Community",
    section: "event",
    aspect: "9:16",
    order: 6,
  },
  {
    id: "PFXHd09ikjc",
    title: "We Automated an Entire Healthcare HR Department Using AI",
    tag: "Healthcare",
    description:
      "Onboarding, scheduling, and HR ops running on autopilot — built for a healthcare team buried in manual coordination.",
    industry: "Healthcare",
    section: "short",
    aspect: "9:16",
    order: 7,
    workflowsAutomated: 11,
    outcomeLabel: "HR ops on autopilot",
  },
  {
    id: "Ebwz5ayf9Vc",
    title: "Stop wasting hours on manual sales tasks.",
    tag: "Sales",
    description:
      "Proposal follow-ups, CRM updates, and pipeline hygiene — automated so reps sell instead of admin.",
    industry: "Sales",
    section: "short",
    aspect: "9:16",
    order: 8,
    workflowsAutomated: 5,
    outcomeLabel: "12+ hrs/week saved",
  },
  {
    id: "okVZBouBuZ4",
    title: "How AI Transformed an Entire Manufacturing Business in Just 12 Weeks",
    tag: "Manufacturing",
    description:
      "Production scheduling, vendor comms, and reporting unified in 12 weeks — from manual chaos to a single automated flow.",
    industry: "Manufacturing",
    section: "short",
    aspect: "9:16",
    order: 9,
    workflowsAutomated: 13,
    outcomeLabel: "Live in 12 weeks",
  },
  {
    id: "Z85ClwH23tc",
    title: "BOOSTMYSITES AUTOMATION ENGINE",
    tag: "Product demo",
    description:
      "A quick look at the automation engine behind client deployments — agents, triggers, and integrations in one stack.",
    industry: "Platform",
    section: "short",
    aspect: "9:16",
    order: 10,
    workflowsAutomated: 20,
    outcomeLabel: "One stack, many clients",
  },
];

/** Homepage teaser — 2 long-form + 1 short. */
export const CASE_STUDY_HOMEPAGE_TEASER_IDS = [
  "c1Bg46GO9PU",
  "cXhRjw1myAo",
  "okVZBouBuZ4",
] as const;

export function videosBySection(section: CaseVideoSection): AutomationCaseVideo[] {
  return AUTOMATION_CASE_STUDY_VIDEOS.filter((v) => v.section === section).sort(
    (a, b) => a.order - b.order,
  );
}

export function videoById(id: string): AutomationCaseVideo | undefined {
  return AUTOMATION_CASE_STUDY_VIDEOS.find((v) => v.id === id);
}

export function homepageTeaserVideos(): AutomationCaseVideo[] {
  return CASE_STUDY_HOMEPAGE_TEASER_IDS.map((id) => videoById(id)).filter(
    (v): v is AutomationCaseVideo => Boolean(v),
  );
}

export const CASE_STUDY_INDUSTRIES = [
  ...new Set(AUTOMATION_CASE_STUDY_VIDEOS.map((v) => v.industry)),
];
