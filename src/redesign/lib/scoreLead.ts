import type { HighIntentLeadPayload } from "./highIntentLead";

export type LeadTier = "high" | "medium" | "low";

/** Signals from the product brief — positive intent. */
const SECURITY_COMPLIANCE_IDS = new Set([
  "audit-readiness",
  "vapt",
  "rbac",
  "txn-security",
  "encryption",
  "hipaa-gdpr",
]);

/**
 * Scoring rubric (internal). Tune thresholds in `tierFromScore` only when changing bands.
 * - Existing product: +20
 * - Scaling infrastructure: +25
 * - 10K+ users: +20
 * - $15K+ budget: +25
 * - Founder / CTO: +20
 * - Audit/security-related compliance selections: +15 (once)
 * - Exploring timeline: -15
 * - Under $5K budget: -20
 */
export function scoreHighIntentLead(p: HighIntentLeadPayload): number {
  let score = 0;

  if (p.projectStage === "existing-product") score += 20;
  if (p.projectStage === "scaling-infrastructure") score += 25;

  if (p.userScale === "10k-100k" || p.userScale === "100k-plus") score += 20;

  if (
    p.budgetUsd === "15k-50k" ||
    p.budgetUsd === "50k-100k" ||
    p.budgetUsd === "100k-plus"
  ) {
    score += 25;
  }
  if (p.budgetUsd === "under-5k") score -= 20;

  if (p.decisionRole === "founder" || p.decisionRole === "cto") score += 20;

  const hasSecuritySignal = p.complianceNeeds.some((id) => SECURITY_COMPLIANCE_IDS.has(id));
  if (hasSecuritySignal) score += 15;

  if (p.timeline === "exploring") score -= 15;

  return score;
}

/** Higher = stronger lead. Thresholds chosen so typical “serious” fills land medium–high. */
export function tierFromScore(score: number): LeadTier {
  if (score >= 55) return "high";
  if (score >= 25) return "medium";
  return "low";
}

export function scoreAndTier(p: HighIntentLeadPayload): { score: number; tier: LeadTier } {
  const score = scoreHighIntentLead(p);
  return { score, tier: tierFromScore(score) };
}
