import type { HighIntentLeadPayload } from "./highIntentLead";

export type LeadTier = "high" | "medium" | "low";

/** Legacy USD keys still accepted when re-scoring old payloads. */
const LEGACY_HIGH_BUDGET = new Set(["15k-50k", "50k-100k", "100k-plus"]);
const LEGACY_LOW_BUDGET = new Set(["under-5k"]);

const SECURITY_COMPLIANCE_IDS = new Set([
  "audit-readiness",
  "vapt",
  "rbac",
  "txn-security",
  "encryption",
  "hipaa-gdpr",
]);

const HIGH_INTENT_BUILD = new Set([
  "trading-platform",
  "payment-system",
  "lending-platform",
  "telemedicine",
  "healthcare-mgmt",
]);

function resolveBudget(p: HighIntentLeadPayload): string {
  return (
    p.budgetInr ||
    (p as HighIntentLeadPayload & { budgetUsd?: string }).budgetUsd ||
    ""
  );
}

/**
 * Lead score (roughly 0–120+ before soft cap). Higher = stronger commercial intent.
 *
 * Dimensions:
 * - Project stage (maturity / urgency to ship)
 * - User scale
 * - Budget (INR bands; legacy USD keys supported)
 * - Decision role
 * - Timeline urgency
 * - Compliance / security engagement
 * - Vertical + build type + stated technical challenge
 */
export function scoreHighIntentLead(p: HighIntentLeadPayload): number {
  let score = 0;
  const budget = resolveBudget(p);

  switch (p.projectStage) {
    case "idea-stage":
      score += 4;
      break;
    case "mvp-in-progress":
      score += 14;
      break;
    case "existing-product":
      score += 22;
      break;
    case "scaling-infrastructure":
      score += 28;
      break;
    case "rebuilding":
      score += 16;
      break;
    default:
      break;
  }

  switch (p.userScale) {
    case "under-1k":
      score += 0;
      break;
    case "1k-10k":
      score += 10;
      break;
    case "10k-100k":
      score += 22;
      break;
    case "100k-plus":
      score += 26;
      break;
    default:
      break;
  }

  if (budget === "15l-50l" || budget === "50l-1cr" || budget === "1cr-plus" || LEGACY_HIGH_BUDGET.has(budget)) {
    score += 30;
  } else if (budget === "5l-15l") {
    score += 12;
  } else if (budget === "under-5l" || LEGACY_LOW_BUDGET.has(budget)) {
    score -= 14;
  }

  switch (p.decisionRole) {
    case "founder":
    case "cto":
      score += 24;
      break;
    case "pm":
      score += 14;
      break;
    case "operations":
      score += 8;
      break;
    case "agency":
      score += 5;
      break;
    case "researching":
      score -= 12;
      break;
    default:
      break;
  }

  switch (p.timeline) {
    case "asap":
      score += 12;
      break;
    case "within-30":
      score += 10;
      break;
    case "1-3mo":
      score += 6;
      break;
    case "3-6mo":
      score += 3;
      break;
    case "exploring":
      score -= 14;
      break;
    default:
      break;
  }

  const hasSecuritySignal = p.complianceNeeds.some((id) => SECURITY_COMPLIANCE_IDS.has(id));
  if (hasSecuritySignal) {
    score += 18;
  } else if (p.complianceNeeds.length > 0) {
    score += 10;
  }

  if (p.industry === "fintech" || p.industry === "healthcare") {
    score += 4;
  }

  if (HIGH_INTENT_BUILD.has(p.whatBuilding)) {
    score += 5;
  }

  if (p.technicalChallenge && p.technicalChallenge.trim() && p.technicalChallenge !== "unsure") {
    score += 5;
  }

  /** Soft cap keeps display comparable across rule tweaks. */
  return Math.min(100, Math.max(0, score));
}

/** Tuned for post–soft-cap 0–100 scores. */
export const TIER_HIGH_MIN = 62;
export const TIER_MEDIUM_MIN = 34;

export function tierFromScore(score: number): LeadTier {
  if (score >= TIER_HIGH_MIN) return "high";
  if (score >= TIER_MEDIUM_MIN) return "medium";
  return "low";
}

export function scoreAndTier(p: HighIntentLeadPayload): { score: number; tier: LeadTier } {
  const score = scoreHighIntentLead(p);
  return { score, tier: tierFromScore(score) };
}
