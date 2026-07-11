/** Fixed phase-1 copy (steps 1–5) + case-study bodies for steps 2o, 12, 18, … */

export type StepCopy = { subject: string; body: string };

export const PHASE_1_STEP_1: StepCopy = {
  subject: "Manual follow-up at {{company}}?",
  body:
    "Most teams lose leads not from bad marketing, but slow response.\n" +
    "We fix that without ripping out what {{company}} already uses.\n" +
    "Reply if that's worth a look.",
};

export const PHASE_1_STEP_2_OPENED: StepCopy = {
  subject: "Saw you opened — quick example",
  body:
    "Since you opened the last one — here's the short version.\n" +
    "We helped a team cut lead response time by 80%, without adding headcount.\n" +
    "{{case_study_url}}",
};

export const PHASE_1_STEP_2_NOT_OPENED: StepCopy = {
  subject: "Re: quick question",
  body:
    "Might've gotten buried — happy to share how teams like {{company}} stopped losing leads to slow follow-up.\n" +
    "Tell me if it's not useful and I'll stop here.",
};

export const PHASE_1_STEP_3: StepCopy = {
  subject: "A number worth checking",
  body:
    "Most teams don't track this, but slow lead response usually costs 20–30% of pipeline, quietly.\n" +
    "Worth 15 minutes to see where that number sits for {{company}}?",
};

export const PHASE_1_STEP_4_OPENED: StepCopy = {
  subject: "Worth 15 min, {{name}}?",
  body:
    "Since you've read a couple of these — happy to walk through a quick automation audit for {{company}}, no pitch deck involved.\n" +
    "Reply with a time that works.",
};

export const PHASE_1_STEP_4_NOT_OPENED: StepCopy = {
  subject: "Different angle",
  body:
    "Trying this from another direction: most teams we talk to lose hours a week to manual lead handling.\n" +
    "If that sounds like {{company}}, worth a short call.",
};

export const PHASE_1_STEP_5: StepCopy = {
  subject: "Should I close your file?",
  body:
    "I've sent a few of these without a reply, so I'll assume the timing's off.\n" +
    "If that changes, or automation becomes a priority for {{company}}, just reply — I'll pick it back up.",
};

/** Weekly position-5 case study steps — custom bodies (step_order → copy). */
export const WEEKLY_CASE_STUDY_STEP_COPY: Record<number, StepCopy> = {
  12: {
    subject: "Lead response in under a minute",
    body:
      "A team similar to {{company}} used to lose leads sitting in an inbox for hours.\n" +
      "Now the first response goes out in under a minute, automatically.\n" +
      "{{case_study_url}}",
  },
  18: {
    subject: "Staffing workflow we automated",
    body:
      "A staffing firm was manually matching candidates to job orders — hours of repetitive work every week.\n" +
      "We automated the matching and cut that down to minutes.\n" +
      "{{case_study_url}}",
  },
  24: {
    subject: "Compliance workflow for a finance team",
    body:
      "A fintech team was manually compiling data for compliance reporting each cycle.\n" +
      "We automated the document processing — same reporting, a fraction of the manual work.\n" +
      "{{case_study_url}}",
  },
  30: {
    subject: "Patient intake without the backlog",
    body:
      "Manual intake was creating a backlog before appointments even started.\n" +
      "An automated intake flow cleared that bottleneck without adding staff.\n" +
      "{{case_study_url}}",
  },
  36: {
    subject: "Order support on autopilot",
    body:
      "An e-commerce team was drowning in repetitive order-status questions.\n" +
      "Automating first-response support freed their team for the tickets that actually need a human.\n" +
      "{{case_study_url}}",
  },
  42: {
    subject: "Manufacturing ops, less manual handoff",
    body:
      "A manufacturing team had multiple manual handoffs between ops and scheduling.\n" +
      "Automating that handoff cut delays and errors in one move.\n" +
      "{{case_study_url}}",
  },
  48: {
    subject: "Lead to tour without the lag",
    body:
      "A real estate team was manually scheduling tours after every lead came in — hours of back-and-forth.\n" +
      "Automated scheduling closed that gap same-day, consistently.\n" +
      "{{case_study_url}}",
  },
  54: {
    subject: "The workflow that performed best",
    body:
      "Out of everything we've automated this year, one workflow consistently gets the fastest results: lead response time.\n" +
      "Here's what that actually looked like.\n" +
      "{{case_study_url}}",
  },
};

export function getCaseStudyStepCopy(stepOrder: number): StepCopy | null {
  return WEEKLY_CASE_STUDY_STEP_COPY[stepOrder] ?? null;
}
