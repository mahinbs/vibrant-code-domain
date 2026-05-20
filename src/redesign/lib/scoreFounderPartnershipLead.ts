import type {
  FounderApplicationFormState,
  FounderArchetype,
  FounderPartnerFit,
  FounderProfile,
} from "../founderPartnership/founderApplicationTypes";
import { SOFT_TEXT_RECOMMENDED_CHARS } from "../founderPartnership/founderApplicationConfig";
import { TIER_HIGH_MIN, TIER_MEDIUM_MIN, tierFromScore, type LeadTier } from "./scoreLead";

const HIGH_BUDGET = new Set(["10l-20l", "20l-50l", "custom-scale"]);
const LOW_BUDGET = new Set(["below-3l"]);
const HIGH_TIMELINE = new Set(["immediately", "within-30"]);
const LOW_TIMELINE = new Set(["researching", "exploring"]);
const STRONG_VALIDATION = new Set([
  "existing-customers",
  "waitlist",
  "mvp",
  "competitor-analysis",
  "market-research",
]);
const WEAK_VALIDATION = new Set(["idea-only"]);
const STRONG_REVENUE = new Set([
  "subscription",
  "commission",
  "enterprise",
  "transaction-fees",
]);
const WEAK_REVENUE = new Set(["figuring-out"]);
const END_TO_END_PARTNERSHIP = new Set(["end-to-end", "long-term-growth", "technical-partner"]);

const PSYCH_STAKE_WEIGHT: Record<string, number> = {
  "market-window": 8,
  "competitor-first": 8,
  credibility: 7,
  runway: 6,
  "stuck-idea": 5,
};

const PSYCH_CONVICTION_WEIGHT: Record<string, number> = {
  "full-time": 14,
  "majority-time": 11,
  "serious-side": 7,
  ramping: 5,
  exploring: 2,
};

function textDepth(...texts: string[]): number {
  const len = texts.reduce((n, t) => n + t.trim().length, 0);
  if (len >= SOFT_TEXT_RECOMMENDED_CHARS * 4) return 24;
  if (len >= SOFT_TEXT_RECOMMENDED_CHARS * 2) return 16;
  if (len >= SOFT_TEXT_RECOMMENDED_CHARS) return 10;
  if (len >= 25) return 4;
  return 0;
}

function psychDepth(state: FounderApplicationFormState): number {
  let score = 0;
  score += PSYCH_STAKE_WEIGHT[state.psychStake] ?? 0;
  score += PSYCH_CONVICTION_WEIGHT[state.psychConviction] ?? 0;
  return score;
}

export function buildFounderProfile(state: FounderApplicationFormState): FounderProfile {
  let maturityScore = 0;
  let urgencyScore = 0;
  let mindsetScore =
    textDepth(state.ideaOrigin, state.vision3Year, state.founderMindset) + psychDepth(state);

  if (STRONG_REVENUE.has(state.revenueModel)) maturityScore += 18;
  else if (WEAK_REVENUE.has(state.revenueModel)) maturityScore -= 10;

  if (STRONG_VALIDATION.has(state.validationStage)) maturityScore += 22;
  else if (WEAK_VALIDATION.has(state.validationStage)) maturityScore -= 14;

  if (state.commitmentLevel >= 4) maturityScore += 14;
  else if (state.commitmentLevel <= 2) maturityScore -= 8;

  if (HIGH_TIMELINE.has(state.timeline)) urgencyScore += 28;
  else if (LOW_TIMELINE.has(state.timeline)) urgencyScore -= 18;
  else if (state.timeline === "1-3mo") urgencyScore += 10;

  let commercialScore = 0;
  if (HIGH_BUDGET.has(state.budgetInr)) commercialScore += 30;
  else if (state.budgetInr === "5l-10l") commercialScore += 14;
  else if (LOW_BUDGET.has(state.budgetInr)) commercialScore -= 16;

  if (state.partnershipTypes.some((p) => END_TO_END_PARTNERSHIP.has(p))) commercialScore += 10;

  let partnerFit: FounderPartnerFit = "medium";
  if (state.technicalSupport === "none" && state.commitmentLevel >= 3) partnerFit = "high";
  else if (state.technicalSupport === "team" && state.commitmentLevel >= 4) partnerFit = "medium";
  else if (state.commitmentLevel <= 2) partnerFit = "low";

  if (state.psychConviction === "full-time" || state.psychConviction === "majority-time") {
    partnerFit = partnerFit === "low" ? "medium" : "high";
  }

  const totalForArchetype = maturityScore + urgencyScore + commercialScore + mindsetScore;

  let archetype: FounderArchetype = "builder";
  if (
    LOW_TIMELINE.has(state.timeline) &&
    WEAK_VALIDATION.has(state.validationStage) &&
    WEAK_REVENUE.has(state.revenueModel)
  ) {
    archetype = "researcher";
  } else if (WEAK_VALIDATION.has(state.validationStage) && state.commitmentLevel <= 2) {
    archetype = "dreamer";
  } else if (
    STRONG_VALIDATION.has(state.validationStage) &&
    (HIGH_TIMELINE.has(state.timeline) || state.commitmentLevel >= 4)
  ) {
    archetype = "operator";
  } else if (totalForArchetype >= 50) {
    archetype = "operator";
  }

  return {
    archetype,
    maturityScore: Math.max(0, Math.min(100, maturityScore)),
    urgencyScore: Math.max(0, Math.min(100, urgencyScore)),
    mindsetScore: Math.max(0, Math.min(100, mindsetScore)),
    partnerFit,
  };
}

export function scoreFounderPartnershipLead(state: FounderApplicationFormState): {
  score: number;
  tier: LeadTier;
  profile: FounderProfile;
} {
  const profile = buildFounderProfile(state);
  let score = 0;

  score += profile.maturityScore * 0.35;
  score += profile.urgencyScore * 0.3;
  score += profile.mindsetScore * 0.15;

  if (HIGH_BUDGET.has(state.budgetInr)) score += 28;
  else if (state.budgetInr === "5l-10l") score += 12;
  else if (LOW_BUDGET.has(state.budgetInr)) score -= 12;

  if (state.commitmentLevel >= 4) score += 16;
  else if (state.commitmentLevel <= 2) score -= 10;

  if (state.technicalSupport === "none") score += 6;
  if (state.launchBlockers.length >= 2) score += 4;
  if (state.partnershipTypes.some((p) => END_TO_END_PARTNERSHIP.has(p))) score += 8;

  if (state.buildingType === "fintech" || state.buildingType === "saas") score += 3;

  const capped = Math.min(100, Math.max(0, Math.round(score)));
  return { score: capped, tier: tierFromScore(capped), profile };
}

export { TIER_HIGH_MIN, TIER_MEDIUM_MIN };
