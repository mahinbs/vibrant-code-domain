/** Fixed phase-1 copy (steps 1–7) — all template/case-study, no freeform AI. */

export type StepCopy = { subject: string; body: string };

export const PHASE_1_STEP_1: StepCopy = {
  subject: "Quick idea for {{company}}",
  body:
    "We help teams automate lead follow-up without ripping out the tools they already use.\n" +
    "If that's on your radar at {{company}}, reply and I'll keep it short.",
};

/** Default body for case-study steps — uses {{case_study_*}} merge vars at send time. */
export const CASE_STUDY_EMAIL_BODY =
  "{{case_study_hook}}\n\n{{case_study_title}} — {{case_study_metric_1}}.\n\nHow we did it: {{case_study_url}}";

export const CASE_STUDY_EMAIL_BODY_OPENED =
  "Since you opened my last note — here's a quick example.\n\n" +
  "{{case_study_hook}}\n\n{{case_study_title}} — {{case_study_metric_1}}.\n\n{{case_study_url}}";
