import {
  computeReport,
  type AutomationReport,
  type SurveyAnswers,
} from "../data/automationScore/calculator";
import type { TeamSizeId, ToolId } from "../data/automationScore/taxonomy";

export const AUTOMATION_SCORE_STORAGE_KEY = "bms-automation-score-v1";

export type AutomationScorePhase = "survey" | "gate" | "report";

export type AutomationScoreStoredState = {
  step: 1 | 2 | 3 | 4;
  industryId: string;
  teamSizeId: TeamSizeId | "";
  leakIds: string[];
  otherLeak: string;
  toolIds: ToolId[];
  phase: AutomationScorePhase;
  contactName: string;
};

export function readAutomationScoreState(): AutomationScoreStoredState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(AUTOMATION_SCORE_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AutomationScoreStoredState;
  } catch {
    return null;
  }
}

export function writeAutomationScoreState(state: AutomationScoreStoredState): void {
  try {
    window.sessionStorage.setItem(AUTOMATION_SCORE_STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* storage unavailable */
  }
}

export function reportFromStoredState(
  state: AutomationScoreStoredState,
): { report: AutomationReport; firstName: string } | null {
  if (state.phase !== "report" || !state.industryId || !state.teamSizeId) return null;

  const answers: SurveyAnswers = {
    industryId: state.industryId,
    teamSizeId: state.teamSizeId,
    selectedProcessIds: state.leakIds,
    otherLeakText: state.otherLeak,
    toolIds: state.toolIds,
  };

  return {
    report: computeReport(answers),
    firstName: state.contactName.trim().split(" ")[0] ?? "",
  };
}
