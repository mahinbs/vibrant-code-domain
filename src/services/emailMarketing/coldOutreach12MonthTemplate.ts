import type { EmAiAngle, EmStepCondition, EmStepType } from "./types";
import {
  CASE_STUDY_EMAIL_BODY,
  CASE_STUDY_EMAIL_BODY_OPENED,
  PHASE_1_STEP_1,
} from "./coldOutreachPhase1Copy";
import {
  WEEKLY_POSITION_1,
  WEEKLY_POSITION_2,
  WEEKLY_POSITION_3,
  WEEKLY_POSITION_4,
  getWeeklyStepContent,
} from "./weeklyCycleCopy";

export const COLD_OUTREACH_12_MONTH_NAME = "Cold Outreach — 12 Month";

export const COLD_OUTREACH_12_MONTH_DESCRIPTION =
  "12-month cold nurture: intensive first 30 days with open/not-open branches, then weekly touches (weeks 5–52). " +
  "All weekly copy is fixed templates (no freeform AI). Stops on reply. ~55 emails — trim weekly phase if domain reputation is new.";

export type StepSeed = {
  step_order: number;
  branch_lane: "main" | "opened" | "not_opened";
  branch_after_step_order?: number | null;
  delay_days: number;
  condition: EmStepCondition;
  step_type: EmStepType;
  ai_angle?: EmAiAngle | null;
  subject_template: string;
  body_template: string;
  case_study_mode?: "fixed" | "auto_industry";
  case_study_slug?: string | null;
  ai_generated?: boolean;
};

function getPhase1(): StepSeed[] {
  return [
    {
      step_order: 1,
      branch_lane: "main",
      delay_days: 0,
      condition: "always",
      step_type: "template",
      subject_template: PHASE_1_STEP_1.subject,
      body_template: PHASE_1_STEP_1.body,
      ai_generated: false,
    },
    {
      step_order: 2,
      branch_lane: "opened",
      branch_after_step_order: 1,
      delay_days: 3,
      condition: "opened_not_replied",
      step_type: "case_study",
      case_study_mode: "fixed",
      case_study_slug: "lead-capture-qualification",
      subject_template: "Saw you opened — quick example",
      body_template: CASE_STUDY_EMAIL_BODY_OPENED,
      ai_generated: false,
    },
    {
      step_order: 2,
      branch_lane: "not_opened",
      branch_after_step_order: 1,
      delay_days: 3,
      condition: "no_open",
      step_type: "template",
      subject_template: "Re: quick question",
      body_template:
        "Bumping this in case it got buried — still happy to share how teams like {{company}} cut manual follow-up.\nIf not useful, tell me and I'll stop.",
      ai_generated: false,
    },
    {
      step_order: 3,
      branch_lane: "main",
      delay_days: 5,
      condition: "no_reply",
      step_type: "template",
      subject_template: WEEKLY_POSITION_3[0].subject,
      body_template: WEEKLY_POSITION_3[0].body,
      ai_generated: false,
    },
    {
      step_order: 4,
      branch_lane: "opened",
      branch_after_step_order: 3,
      delay_days: 3,
      condition: "opened_not_replied",
      step_type: "template",
      subject_template: WEEKLY_POSITION_2[3].subject,
      body_template: WEEKLY_POSITION_2[3].body,
      ai_generated: false,
    },
    {
      step_order: 4,
      branch_lane: "not_opened",
      branch_after_step_order: 3,
      delay_days: 3,
      condition: "no_open",
      step_type: "template",
      subject_template: WEEKLY_POSITION_4[0].subject,
      body_template: WEEKLY_POSITION_4[0].body,
      ai_generated: false,
    },
    {
      step_order: 5,
      branch_lane: "main",
      delay_days: 7,
      condition: "no_reply",
      step_type: "template",
      subject_template: WEEKLY_POSITION_1[4].subject,
      body_template: WEEKLY_POSITION_1[4].body,
      ai_generated: false,
    },
    {
      step_order: 6,
      branch_lane: "main",
      delay_days: 7,
      condition: "no_meeting",
      step_type: "template",
      subject_template: WEEKLY_POSITION_1[0].subject,
      body_template: WEEKLY_POSITION_1[0].body,
      ai_generated: false,
    },
    {
      step_order: 7,
      branch_lane: "main",
      delay_days: 3,
      condition: "clicked",
      step_type: "template",
      subject_template: WEEKLY_POSITION_2[0].subject,
      body_template: WEEKLY_POSITION_2[0].body,
      ai_generated: false,
    },
  ];
}

function buildWeeklySteps(): StepSeed[] {
  const weekly: StepSeed[] = [];
  for (let stepOrder = 8; stepOrder <= 55; stepOrder++) {
    const { copy, caseStudySlug, caseStudySubject, useOpenedCondition } =
      getWeeklyStepContent(stepOrder);

    if (caseStudySlug) {
      weekly.push({
        step_order: stepOrder,
        branch_lane: "main",
        delay_days: 7,
        condition: "no_reply",
        step_type: "case_study",
        case_study_mode: "fixed",
        case_study_slug: caseStudySlug,
        subject_template: caseStudySubject ?? "Workflow teams your size automated",
        body_template: CASE_STUDY_EMAIL_BODY,
        ai_generated: false,
      });
      continue;
    }

    weekly.push({
      step_order: stepOrder,
      branch_lane: "main",
      delay_days: 7,
      condition: useOpenedCondition ? "opened_not_replied" : "no_reply",
      step_type: "template",
      subject_template: copy!.subject,
      body_template: copy!.body,
      ai_generated: false,
    });
  }
  return weekly;
}

export function getColdOutreach12MonthSteps(): StepSeed[] {
  return [...getPhase1(), ...buildWeeklySteps()];
}

export function isStepCopyLocked(metadata: Record<string, unknown> | null | undefined): boolean {
  return metadata?.copy_locked === true;
}

export function coldOutreachStepToDbRow(sequenceId: string, s: StepSeed) {
  return {
    sequence_id: sequenceId,
    step_order: s.step_order,
    branch_lane: s.branch_lane,
    branch_after_step_order: s.branch_after_step_order ?? null,
    delay_days: s.delay_days,
    delay_hours: 0,
    condition: s.condition,
    step_type: s.step_type,
    ai_angle: s.ai_angle ?? null,
    ai_instructions: null,
    subject_template: s.subject_template,
    body_template: s.body_template,
    case_study_mode: s.case_study_mode ?? "fixed",
    case_study_slug: s.case_study_slug ?? null,
    ai_generated: s.ai_generated ?? false,
    metadata: {},
  };
}

export type ColdOutreachRefreshResult = {
  sequenceId: string;
  updated: number;
  inserted: number;
  skipped: number;
};
