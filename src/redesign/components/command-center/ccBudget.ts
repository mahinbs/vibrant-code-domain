/**
 * Qualifying answers for the /command-center enquiry form: the options, the daily
 * ad-budget tiers in the visitor's currency, and a 0–100 lead score with a tier.
 */

/* ---------- Viewing country ---------- */

const ZONES: [RegExp, string][] = [
  [/^Asia\/(Kolkata|Calcutta)$/, "IN"],
  [/^Asia\/Dubai$/, "AE"],
  [/^Asia\/Riyadh$/, "SA"],
  [/^Asia\/Singapore$/, "SG"],
  [/^Europe\/London$/, "GB"],
  [/^Europe\/Berlin$/, "DE"],
  [/^Europe\/Paris$/, "FR"],
  [/^Africa\/Johannesburg$/, "ZA"],
  [/^Africa\/Lagos$/, "NG"],
  [/^Australia\//, "AU"],
  [/^America\/(Toronto|Vancouver|Edmonton|Winnipeg|Halifax|St_Johns|Regina|Montreal)$/, "CA"],
  [/^America\/(New_York|Chicago|Denver|Los_Angeles|Phoenix|Anchorage|Detroit|Boise|Indiana\/.+)$/, "US"],
  [/^Pacific\/Honolulu$/, "US"],
];

/** Best guess at the country the visitor is viewing from, using their time zone. */
export function guessCountry(): string | null {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    for (const [re, code] of ZONES) if (re.test(tz)) return code;
  } catch {
    /* no Intl: fall back to the phone picker */
  }
  return null;
}

/* ---------- Daily budget tiers ---------- */

export type BudgetKey = "lt300" | "300-1k" | "1k-3k" | "3k-10k" | "10k+" | "unsure";

/**
 * Tier edges in local currency, roughly ₹300 / 1,000 / 3,000 / 10,000 a day at current
 * rates, rounded to friendly numbers. [prefix, edges, suffix-free].
 */
const EDGES: Record<string, { fmt: (n: number) => string; edges: [number, number, number, number] }> = {
  IN: { fmt: (n) => `₹${n.toLocaleString("en-IN")}`, edges: [300, 1000, 3000, 10000] },
  US: { fmt: (n) => `$${n}`, edges: [4, 12, 35, 120] },
  AE: { fmt: (n) => `AED ${n}`, edges: [15, 45, 130, 450] },
  SA: { fmt: (n) => `SAR ${n}`, edges: [15, 45, 130, 450] },
  GB: { fmt: (n) => `£${n}`, edges: [3, 10, 30, 100] },
  DE: { fmt: (n) => `€${n}`, edges: [4, 12, 35, 110] },
  FR: { fmt: (n) => `€${n}`, edges: [4, 12, 35, 110] },
  CA: { fmt: (n) => `C$${n}`, edges: [5, 16, 50, 160] },
  AU: { fmt: (n) => `A$${n}`, edges: [6, 18, 55, 180] },
  SG: { fmt: (n) => `S$${n}`, edges: [5, 16, 48, 160] },
  ZA: { fmt: (n) => `R${n.toLocaleString("en-ZA")}`, edges: [65, 200, 650, 2000] },
  NG: { fmt: (n) => `₦${n.toLocaleString("en-NG")}`, edges: [5500, 18000, 55000, 180000] },
};

export type BudgetTier = { key: BudgetKey; label: string };

/** The six dropdown options for a country (unknown countries use USD). */
export function budgetTiers(country: string): BudgetTier[] {
  const { fmt, edges } = EDGES[country] ?? EDGES.US;
  const [a, b, c, d] = edges;
  return [
    { key: "lt300", label: `Under ${fmt(a)} a day` },
    { key: "300-1k", label: `${fmt(a)} – ${fmt(b)} a day` },
    { key: "1k-3k", label: `${fmt(b)} – ${fmt(c)} a day` },
    { key: "3k-10k", label: `${fmt(c)} – ${fmt(d)} a day` },
    { key: "10k+", label: `${fmt(d)}+ a day` },
    { key: "unsure", label: "Not sure yet" },
  ];
}

/* ---------- Answer options ---------- */

export const RUNS_ADS = [
  { key: "regularly", label: "Yes, regularly" },
  { key: "tried", label: "Tried before" },
  { key: "not-yet", label: "Not yet" },
] as const;

export const GOALS = [
  { key: "leads", label: "More leads" },
  { key: "whatsapp", label: "More WhatsApp enquiries" },
  { key: "calls", label: "More sales calls or appointments" },
  { key: "linkedin", label: "B2B outreach on LinkedIn" },
  { key: "cpl", label: "Lower cost per lead" },
  { key: "seo", label: "More website traffic (SEO)" },
  { key: "social", label: "Social media presence" },
  { key: "reengage", label: "Win back old leads" },
] as const;

export const MARKETING_TODAY = [
  { key: "in-house", label: "In-house team" },
  { key: "agency", label: "Agency" },
  { key: "freelancer", label: "Freelancer" },
  { key: "myself", label: "I do it myself" },
  { key: "none", label: "Not doing marketing yet" },
] as const;

export const SALES_TEAM = [
  { key: "team", label: "Yes, a sales team" },
  { key: "founder", label: "Just me / founder-led" },
  { key: "not-yet", label: "Not yet" },
] as const;

export type RunsAdsKey = (typeof RUNS_ADS)[number]["key"];
export type GoalKey = (typeof GOALS)[number]["key"];
export type MarketingKey = (typeof MARKETING_TODAY)[number]["key"];
export type SalesKey = (typeof SALES_TEAM)[number]["key"];

/** Pre-select the goal chip closest to a goal sentence passed in by a CTA. */
export function goalFromText(text?: string): GoalKey | null {
  const t = (text ?? "").toLowerCase();
  if (!t) return null;
  if (t.includes("whatsapp")) return "whatsapp";
  if (t.includes("linkedin") || t.includes("decision-maker")) return "linkedin";
  if (t.includes("cost per lead")) return "cpl";
  if (t.includes("seo") || t.includes("traffic")) return "seo";
  if (t.includes("social")) return "social";
  if (t.includes("re-engage") || t.includes("old ") || t.includes("win back")) return "reengage";
  if (t.includes("call") || t.includes("appointment") || t.includes("booking") || t.includes("demo")) return "calls";
  if (
    t.includes("lead") ||
    t.includes("ads") ||
    t.includes("campaign") ||
    t.includes("admission") ||
    t.includes("enquir") ||
    t.includes("customer")
  )
    return "leads";
  return null;
}

/* ---------- Lead score ---------- */

export type Qualify = {
  runsAds: RunsAdsKey;
  budget: BudgetKey;
  goals: GoalKey[];
  marketing: MarketingKey;
  sales: SalesKey;
};

export type LeadTier = "hot" | "warm" | "cold";

const BUDGET_PTS: Record<BudgetKey, number> = { "10k+": 40, "3k-10k": 32, "1k-3k": 24, "300-1k": 14, unsure: 6, lt300: 0 };
const ADS_PTS: Record<RunsAdsKey, number> = { regularly: 20, tried: 10, "not-yet": 2 };
const SALES_PTS: Record<SalesKey, number> = { team: 15, founder: 8, "not-yet": 2 };
const MKT_PTS: Record<MarketingKey, number> = { agency: 15, "in-house": 15, freelancer: 10, myself: 6, none: 2 };

/** 0–100: budget weighs most, then ad experience, then team and how they market today. */
export function scoreLead(q: Qualify): { score: number; tier: LeadTier } {
  const score = Math.min(
    100,
    BUDGET_PTS[q.budget] + ADS_PTS[q.runsAds] + SALES_PTS[q.sales] + MKT_PTS[q.marketing] + Math.min(10, q.goals.length * 3),
  );
  return { score, tier: score >= 65 ? "hot" : score >= 35 ? "warm" : "cold" };
}
