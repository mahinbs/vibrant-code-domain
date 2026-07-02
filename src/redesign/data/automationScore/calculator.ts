import {
  getProcessCategory,
  TEAM_SIZE_OPTIONS,
  type TeamSizeId,
  type ToolId,
} from "./taxonomy";
import {
  getIndustryProfile,
  processLabelFor,
  type IndustryProfile,
} from "./industryProfiles";

/**
 * Pure report math for the /automation-score funnel. All numbers come from
 * the taxonomy benchmark table; ranges (±20%) keep estimates defensible.
 */

export type SurveyAnswers = {
  industryId: string;
  teamSizeId: TeamSizeId;
  selectedProcessIds: string[];
  otherLeakText?: string;
  toolIds: ToolId[];
};

export type ProcessEstimate = {
  id: string;
  /** Label in the respondent's industry vocabulary. */
  label: string;
  reportTag: string;
  automationExample: string;
  hoursPerWeek: number;
  recoverableHoursPerWeek: number;
};

export type MaturityStage = {
  /** 1 (fully manual) → 4 (automation underway). */
  stage: 1 | 2 | 3 | 4;
  label: string;
  blurb: string;
};

export type ProjectionPoint = {
  month: number;
  /** Cumulative cost of inaction (INR). */
  doingNothing: number;
  /** Cumulative cost with automation ramping in (INR). */
  withAutomation: number;
};

export type AutomationReport = {
  industry: IndustryProfile;
  teamSizeLabel: string;
  /** 0–100; lower = more untapped automation opportunity. */
  automationScore: number;
  processes: ProcessEstimate[];
  /** Top leaks sorted by hours, biggest first. */
  topLeaks: ProcessEstimate[];
  /** Share (0–100) of total lost hours attributable to the single biggest leak. */
  topLeakSharePct: number;
  /** Share (0–100) of lost time that is realistically automatable. */
  recoverableSharePct: number;
  maturity: MaturityStage;
  totalHoursPerWeek: { low: number; high: number };
  recoverableHoursPerWeek: { low: number; high: number };
  monthlyCostInr: { low: number; high: number };
  monthlySavingsInr: { low: number; high: number };
  annualCostInr: { low: number; high: number };
  annualSavingsInr: { low: number; high: number };
  /** Weeks until a typical automation engagement pays for itself; null when savings are negligible. */
  paybackWeeks: { low: number; high: number } | null;
  /** 12-month cumulative cost curves (mid estimates). */
  projection: ProjectionPoint[];
};

const RANGE_SPREAD = 0.2;
const WEEKS_PER_MONTH = 4.33;
/** Reference cost of a typical starter automation engagement (aligns with the under-₹5L budget band). */
const REFERENCE_ENGAGEMENT_COST_INR = 250_000;

const range = (mid: number) => ({
  low: mid * (1 - RANGE_SPREAD),
  high: mid * (1 + RANGE_SPREAD),
});

/** Tool maturity nudges the score, not the hours (hours come from selections). */
const TOOL_SCORE_BONUS: Record<ToolId, number> = {
  none: -8,
  excel: -3,
  whatsapp: 0,
  crm: 6,
  erp: 8,
  "automation-tools": 10,
};

function maturityFromTools(toolIds: ToolId[]): MaturityStage {
  if (toolIds.includes("automation-tools")) {
    return {
      stage: 4,
      label: "Automation underway",
      blurb:
        "You've started automating, the wins now come from connecting it end-to-end instead of tool by tool.",
    };
  }
  if (toolIds.includes("crm") || toolIds.includes("erp")) {
    return {
      stage: 3,
      label: "Systems in place, not connected",
      blurb:
        "You have real systems, but they don't talk to each other, your team is the integration layer.",
    };
  }
  if (toolIds.includes("excel") || toolIds.includes("whatsapp")) {
    return {
      stage: 2,
      label: "Basic tools, mostly manual",
      blurb:
        "Sheets and chats hold it together, but every process still depends on someone remembering to do it.",
    };
  }
  return {
    stage: 1,
    label: "Fully manual",
    blurb:
      "Almost everything runs on effort and memory, which means the fastest wins of anyone at this stage.",
  };
}

/** 12-month cumulative curves: automation ramps in over months 1–2, full savings from month 3. */
function buildProjection(monthlyCostMid: number, monthlySavingsMid: number): ProjectionPoint[] {
  const points: ProjectionPoint[] = [];
  let doingNothing = 0;
  let withAutomation = 0;
  for (let month = 1; month <= 12; month++) {
    doingNothing += monthlyCostMid;
    const savingsFactor = month <= 1 ? 0 : month === 2 ? 0.5 : 1;
    withAutomation += monthlyCostMid - monthlySavingsMid * savingsFactor;
    points.push({
      month,
      doingNothing: Math.round(doingNothing),
      withAutomation: Math.round(withAutomation),
    });
  }
  return points;
}

export function computeReport(answers: SurveyAnswers): AutomationReport {
  const industry = getIndustryProfile(answers.industryId);
  const teamSize =
    TEAM_SIZE_OPTIONS.find((t) => t.id === answers.teamSizeId) ?? TEAM_SIZE_OPTIONS[0];

  const processes: ProcessEstimate[] = answers.selectedProcessIds
    .map((id) => {
      const cat = getProcessCategory(id);
      if (!cat) return null;
      const hoursPerWeek = cat.baseHoursPerPersonWeek * teamSize.effectivePeople;
      return {
        id: cat.id,
        label: processLabelFor(industry, cat.id),
        reportTag: cat.reportTag,
        automationExample: cat.automationExample,
        hoursPerWeek,
        recoverableHoursPerWeek: hoursPerWeek * cat.automationRecoveryRate,
      };
    })
    .filter((p): p is ProcessEstimate => p !== null);

  const totalHours = processes.reduce((s, p) => s + p.hoursPerWeek, 0);
  const recoverableHours = processes.reduce((s, p) => s + p.recoverableHoursPerWeek, 0);
  const topLeaks = [...processes].sort((a, b) => b.hoursPerWeek - a.hoursPerWeek);

  const toolBonus = answers.toolIds.reduce((s, t) => s + (TOOL_SCORE_BONUS[t] ?? 0), 0);
  const automationScore = Math.min(
    92,
    Math.max(8, Math.round(84 - processes.length * 9 + toolBonus)),
  );

  const monthlyCostMid = totalHours * WEEKS_PER_MONTH * industry.hourlyCostLoaded;
  const monthlySavingsMid = recoverableHours * WEEKS_PER_MONTH * industry.hourlyCostLoaded;
  const monthlySavings = range(monthlySavingsMid);

  const paybackWeeks =
    monthlySavings.low > 10_000
      ? {
          low: Math.max(
            2,
            Math.round((REFERENCE_ENGAGEMENT_COST_INR / monthlySavings.high) * WEEKS_PER_MONTH),
          ),
          high: Math.max(
            3,
            Math.round((REFERENCE_ENGAGEMENT_COST_INR / monthlySavings.low) * WEEKS_PER_MONTH),
          ),
        }
      : null;

  return {
    industry,
    teamSizeLabel: teamSize.label,
    automationScore,
    processes,
    topLeaks,
    topLeakSharePct:
      totalHours > 0 && topLeaks.length > 0
        ? Math.round((topLeaks[0].hoursPerWeek / totalHours) * 100)
        : 0,
    recoverableSharePct:
      totalHours > 0 ? Math.round((recoverableHours / totalHours) * 100) : 0,
    maturity: maturityFromTools(answers.toolIds),
    totalHoursPerWeek: range(totalHours),
    recoverableHoursPerWeek: range(recoverableHours),
    monthlyCostInr: range(monthlyCostMid),
    monthlySavingsInr: monthlySavings,
    annualCostInr: range(monthlyCostMid * 12),
    annualSavingsInr: range(monthlySavingsMid * 12),
    paybackWeeks,
    projection: buildProjection(monthlyCostMid, monthlySavingsMid),
  };
}

export function formatHoursRange(r: { low: number; high: number }): string {
  return `${Math.round(r.low)}–${Math.round(r.high)} hrs`;
}

export function formatInr(value: number): string {
  if (value >= 10_000_000) return `₹${(value / 10_000_000).toFixed(1)} Cr`;
  if (value >= 100_000) return `₹${(value / 100_000).toFixed(1)}L`;
  if (value >= 1000) return `₹${Math.round(value / 1000)}K`;
  return `₹${Math.round(value)}`;
}

export function formatInrRange(r: { low: number; high: number }): string {
  return `${formatInr(r.low)}–${formatInr(r.high)}`;
}
