import type { EmAiAngle, EmStepCondition, EmStepType } from "./types";

export const COLD_OUTREACH_12_MONTH_NAME = "Cold Outreach — 12 Month";

export const COLD_OUTREACH_12_MONTH_DESCRIPTION =
  "12-month cold nurture: intensive first 30 days with open/not-open branches, then weekly touches (weeks 5–52). " +
  "Stops on reply. ~55 emails — trim weekly phase if domain reputation is new.";

type StepSeed = {
  step_order: number;
  branch_lane: "main" | "opened" | "not_opened";
  branch_after_step_order?: number | null;
  delay_days: number;
  condition: EmStepCondition;
  step_type: EmStepType;
  ai_angle?: EmAiAngle | null;
  ai_instructions?: string | null;
  subject_template: string;
  body_template: string;
  case_study_mode?: "fixed" | "auto_industry";
  ai_generated?: boolean;
};

const WEEKLY_THEMES: Omit<StepSeed, "step_order" | "branch_lane" | "delay_days" | "condition">[] = [
  {
    step_type: "case_study",
    case_study_mode: "auto_industry",
    subject_template: "How {{company}} peers automated ops",
    body_template: "",
    ai_generated: false,
  },
  {
    step_type: "ai_draft",
    ai_angle: "custom",
    ai_instructions: "Share one timely industry trend and tie it to automation ROI for their company.",
    subject_template: "Quick thought for {{company}}",
    body_template: "",
    ai_generated: true,
  },
  {
    step_type: "template",
    subject_template: "Still manual on {{company}}'s follow-up?",
    body_template:
      "Hi {{name}},\n\nCurious — is lead follow-up still mostly manual at {{company}}? We help teams automate that without adding headcount.\n\nWorth a quick chat?",
    ai_generated: false,
  },
  {
    step_type: "case_study",
    case_study_mode: "auto_industry",
    subject_template: "Another win in your space",
    body_template: "",
    ai_generated: false,
  },
  {
    step_type: "ai_draft",
    ai_angle: "case_study_tease",
    ai_instructions: "Tease a free automation audit and one concrete workflow they could automate.",
    subject_template: "Free automation audit for {{company}}?",
    body_template: "",
    ai_generated: true,
  },
  {
    step_type: "template",
    subject_template: "Teams like yours save 10+ hrs/week",
    body_template:
      "Hi {{name}},\n\nWe recently helped a similar team cut manual ops by double digits hours per week. Happy to share how if useful.\n\n— BoostMySites",
    ai_generated: false,
  },
  {
    step_type: "ai_draft",
    ai_angle: "niche_followup",
    ai_instructions: "Soft re-engage — acknowledge they're busy, one line of value, no hard sell.",
    subject_template: "Re: {{company}}",
    body_template: "",
    ai_generated: true,
  },
  {
    step_type: "template",
    subject_template: "15 min this week?",
    body_template:
      "Hi {{name}},\n\nIf automation is still on your radar, I can walk you through a 15-min audit for {{company}}. Reply with a time or grab a slot on our calendar.\n\nBest,",
    ai_generated: false,
  },
];

const PHASE1: StepSeed[] = [
  {
    step_order: 1,
    branch_lane: "main",
    delay_days: 0,
    condition: "always",
    step_type: "ai_draft",
    ai_angle: "opener",
    subject_template: "Quick idea for {{company}}",
    body_template: "",
    ai_generated: true,
  },
  {
    step_order: 2,
    branch_lane: "opened",
    branch_after_step_order: 1,
    delay_days: 3,
    condition: "opened_not_replied",
    step_type: "case_study",
    case_study_mode: "auto_industry",
    subject_template: "Saw you opened — case study for {{company}}",
    body_template: "",
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
    body_template: "Hi {{name}},\n\nBumping this in case it got buried — still happy to share how teams like {{company}} automate follow-up.\n\nWorth a look?",
    ai_generated: false,
  },
  {
    step_order: 3,
    branch_lane: "main",
    delay_days: 5,
    condition: "no_reply",
    step_type: "ai_draft",
    ai_angle: "niche_followup",
    subject_template: "Automation audit for {{company}}",
    body_template: "",
    ai_generated: true,
  },
  {
    step_order: 4,
    branch_lane: "opened",
    branch_after_step_order: 3,
    delay_days: 3,
    condition: "opened_not_replied",
    step_type: "template",
    subject_template: "Worth 15 min, {{name}}?",
    body_template:
      "Hi {{name}},\n\nNoticed you read my last note — if timing works, I can walk through a quick automation audit for {{company}}.\n\nReply with a time?",
    ai_generated: false,
  },
  {
    step_order: 4,
    branch_lane: "not_opened",
    branch_after_step_order: 3,
    delay_days: 3,
    condition: "no_open",
    step_type: "template",
    subject_template: "Different angle — ops at {{company}}",
    body_template:
      "Hi {{name}},\n\nTrying a different angle: most teams we talk to lose hours on manual lead follow-up. We fix that with light automation.\n\nOpen to a 10-min call?",
    ai_generated: false,
  },
  {
    step_order: 5,
    branch_lane: "main",
    delay_days: 7,
    condition: "no_reply",
    step_type: "ai_draft",
    ai_angle: "breakup",
    subject_template: "Should I close your file?",
    body_template: "",
    ai_generated: true,
  },
  {
    step_order: 6,
    branch_lane: "main",
    delay_days: 7,
    condition: "no_meeting",
    step_type: "template",
    subject_template: "Book a call — {{company}} automation",
    body_template:
      "Hi {{name}},\n\nIf you'd like to explore automation for {{company}}, grab a slot here: [your Calendly link]\n\nNo pressure if timing isn't right.",
    ai_generated: false,
  },
  {
    step_order: 7,
    branch_lane: "main",
    delay_days: 3,
    condition: "clicked",
    step_type: "template",
    subject_template: "Saw you clicked — chat this week?",
    body_template:
      "Hi {{name}},\n\nLooks like you checked out our link — happy to answer questions or walk through a quick audit for {{company}}.\n\nWhat does your week look like?",
    ai_generated: false,
  },
];

function buildWeeklySteps(): StepSeed[] {
  const weekly: StepSeed[] = [];
  for (let stepOrder = 8; stepOrder <= 55; stepOrder++) {
    const weekIndex = stepOrder - 8;
    const theme = WEEKLY_THEMES[weekIndex % 8];
    weekly.push({
      step_order: stepOrder,
      branch_lane: "main",
      delay_days: 7,
      condition: "no_reply",
      ...theme,
    });
  }
  return weekly;
}

export function getColdOutreach12MonthSteps(): StepSeed[] {
  return [...PHASE1, ...buildWeeklySteps()];
}
