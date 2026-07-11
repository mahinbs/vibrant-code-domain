/**
 * Generates supabase/migrations/*_sync_cold_outreach_12month_copy.sql
 * from coldOutreach12MonthTemplate.ts (run after copy changes).
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Mirror of coldOutreachPhase1Copy.ts + weeklyCycleCopy.ts + coldOutreach12MonthTemplate.ts
const PHASE_1_STEP_1 = {
  subject: "Manual follow-up at {{company}}?",
  body:
    "Most teams lose leads not from bad marketing, but slow response.\n" +
    "We fix that without ripping out what {{company}} already uses.\n" +
    "Reply if that's worth a look.",
};
const PHASE_1_STEP_2_OPENED = {
  subject: "Saw you opened — quick example",
  body:
    "Since you opened the last one — here's the short version.\n" +
    "We helped a team cut lead response time by 80%, without adding headcount.\n" +
    "{{case_study_url}}",
};
const PHASE_1_STEP_2_NOT_OPENED = {
  subject: "Re: quick question",
  body:
    "Might've gotten buried — happy to share how teams like {{company}} stopped losing leads to slow follow-up.\n" +
    "Tell me if it's not useful and I'll stop here.",
};
const PHASE_1_STEP_3 = {
  subject: "A number worth checking",
  body:
    "Most teams don't track this, but slow lead response usually costs 20–30% of pipeline, quietly.\n" +
    "Worth 15 minutes to see where that number sits for {{company}}?",
};
const PHASE_1_STEP_4_OPENED = {
  subject: "Worth 15 min, {{name}}?",
  body:
    "Since you've read a couple of these — happy to walk through a quick automation audit for {{company}}, no pitch deck involved.\n" +
    "Reply with a time that works.",
};
const PHASE_1_STEP_4_NOT_OPENED = {
  subject: "Different angle",
  body:
    "Trying this from another direction: most teams we talk to lose hours a week to manual lead handling.\n" +
    "If that sounds like {{company}}, worth a short call.",
};
const PHASE_1_STEP_5 = {
  subject: "Should I close your file?",
  body:
    "I've sent a few of these without a reply, so I'll assume the timing's off.\n" +
    "If that changes, or automation becomes a priority for {{company}}, just reply — I'll pick it back up.",
};

const WEEKLY_CASE_STUDY_STEP_COPY = {
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

const WEEKLY_POSITION_1 = [
  { subject: "Free 15 min, {{name}}?", body: "No pitch here — just a slot if you want it: {{calendly_url}}\nIf automation for {{company}} isn't a priority right now, no worries, I'll stop pinging." },
  { subject: "What manual follow-up is costing {{company}}", body: "Most teams don't track this, but slow lead follow-up usually costs 20-30% of pipeline, quietly.\nHappy to walk through where that's likely leaking for {{company}} — 15 min, your call: {{calendly_url}}" },
  { subject: "A few teams in your space already did this", body: "Not naming names, but a couple of companies doing similar work to {{company}} automated their lead intake this year and stopped losing leads overnight.\nWant the rundown? {{calendly_url}}" },
  { subject: "One question about {{company}}'s follow-up", body: "When a lead comes in at {{company}}, how long before someone actually responds?\nIf the honest answer is \"depends,\" that's usually fixable in a week." },
  { subject: "Reshab here — one more try", body: "I've sent a few of these and don't want to keep cluttering your inbox.\nIf there's any interest in fixing manual follow-up at {{company}}, reply and I'll keep it short. If not, I'll close this out." },
  { subject: "Planning season at {{company}}?", body: "If you're mapping out next quarter, this is usually when automation gets budgeted and then forgotten by Q2.\nWorth 15 min now while it's on the radar? {{calendly_url}}" },
  { subject: "\"Too much to switch right now\" — fair", body: "Most teams assume automation means ripping out their current stack. It doesn't — this usually plugs into what {{company}} already uses.\nIf that's what's held this up, worth a quick call to see the actual lift." },
  { subject: "Your competitors aren't waiting", body: "The teams winning right now in your space aren't doing anything smarter — they're just not doing it manually anymore.\nHappy to show you what that looks like for {{company}}: {{calendly_url}}" },
];
const WEEKLY_POSITION_2 = [
  { subject: "Saw you opened this — one question", body: "No pressure, just curious if this is something {{company}} is actively looking at, or just filed for later." },
  { subject: "~12 hrs/week, roughly", body: "That's the average time teams like {{company}} were losing to manual lead handling before automating it.\nIf that number's in the right ballpark for you, worth a look." },
  { subject: "Guessing where {{company}}'s stuck", body: "If I had to guess, it's either lead response time or data entry between tools. Usually one of the two.\nWhich one's closer?" },
  { subject: "A quiet win for a team like yours", body: "A similar-sized company cut their lead response time from hours to minutes without adding headcount.\nCan share exactly how if useful." },
  { subject: "Timing shift in your industry", body: "Buyers are expecting faster responses than they were even a year ago — the bar's moved, quietly.\nMight be worth checking if {{company}}'s process kept up." },
  { subject: "10 minutes, no pitch", body: "Not a sales call — just a look at where {{company}}'s current process has gaps, free either way." },
  { subject: "Manual vs. automated, in one line", body: "Manual: lead sits for hours, maybe gets a reply. Automated: lead gets a response in under a minute, every time.\nThat's really the whole pitch." },
  { subject: "Still relevant, or should I stop?", body: "Genuinely asking — if this isn't useful for {{company}} right now, tell me and I'll take you off the list. If it is, happy to keep going." },
];
const WEEKLY_POSITION_3 = [
  { subject: "Where the ROI actually shows up", body: "Most teams expect automation ROI in \"saved time.\" The bigger number is usually recovered leads that were falling through cracks.\nWorth a quick look at where that applies to {{company}}." },
  { subject: "Compliance load creeping up?", body: "If reporting or audit trail requirements have gotten heavier this year, that's usually a sign manual processes are about to break.\nAutomating that layer tends to fix both problems at once." },
  { subject: "Not trying to create urgency, but", body: "A handful of companies in your space have quietly automated core workflows this year. Not a trend piece — just what's actually happening." },
  { subject: "Scaling {{company}} without scaling headcount", body: "If growth plans for {{company}} assume hiring to keep up with volume, automation is usually the cheaper first move." },
  { subject: "What your customers actually notice", body: "Customers don't see your backend — they just notice when responses are fast. That's usually the real value of automating this." },
  { subject: "Data you're probably not capturing", body: "Manual processes usually mean no clean record of what happened with a lead. Automating it tends to surface that data for the first time." },
  { subject: "Speed-to-lead, the actual number", body: "Response time inside 5 minutes converts significantly better than anything slower — most teams don't realize how far off they are until they check." },
  { subject: "What's changed for {{company}} this year", body: "Worth a quick gut-check: is {{company}}'s process handling the same volume it was a year ago, or has it quietly gotten harder to keep up?" },
];
const WEEKLY_POSITION_4 = [
  { subject: "Still manual on {{company}}'s follow-up?", body: "Curious if this is still handled by hand at {{company}}, or if something's already in place." },
  { subject: "Rough estimate — how many hours/week?", body: "No wrong answer, just curious what manual follow-up is costing your team weekly right now." },
  { subject: "What's the actual bottleneck?", body: "If you had to name one thing slowing {{company}} down operationally, what would it be?" },
  { subject: "How many tools are you stitching together?", body: "Most teams have 3-4 tools that don't talk to each other, and someone's manually bridging the gap. Sound familiar?" },
  { subject: "Is this blocking growth plans?", body: "Sometimes the manual process isn't just annoying — it's actually capping how fast {{company}} can scale. Worth checking which one it is." },
  { subject: "What's your team saying about this?", body: "Usually the people doing the manual work complain about it long before leadership hears it. Has that started at {{company}}?" },
  { subject: "Do you know your lead drop-off rate?", body: "Most companies don't track how many leads go cold from slow follow-up — until they automate and see the number." },
  { subject: "Still a priority?", body: "Just checking in — is fixing this still on your radar for {{company}}, or has it moved down the list?" },
];
const WEEKLY_POSITION_6 = [
  { subject: "Free automation audit for {{company}}?", body: "No cost, no obligation — I'll point out one or two things {{company}} could automate this month. Interested?" },
  { subject: "My guess at {{company}}'s biggest fix", body: "Based on companies your size, I'd guess lead follow-up is the first thing worth automating. Want me to confirm or correct that guess?" },
  { subject: "15 minutes, nothing needed from you", body: "The audit's free and doesn't require prep on your end — just a look at what's already happening at {{company}}." },
  { subject: "What you'd walk away with", body: "Not a sales pitch — you'd get a short list of what to automate first at {{company}}, ranked by impact. Yours either way." },
  { subject: "Standing offer, no deadline", body: "This isn't going anywhere and there's no pressure — just let me know whenever it's useful to look at {{company}}'s process." },
  { subject: "How {{company}} compares", body: "Curious how automated your process is versus others in your space? The audit usually answers that pretty quickly." },
  { subject: "No call required, if you'd rather not", body: "If a call feels like overkill, reply here and I'll just send over what I'd flag for {{company}} directly." },
  { subject: "Last one on this — audit's still open", body: "Closing this thread out soon. If a free look at {{company}}'s automation gaps is still useful, this is the easy way in." },
];
const WEEKLY_CASE_STUDY_SLUGS = [
  "lead-capture-qualification",
  "internal-workflow-automation",
  "document-data-processing",
  "ai-customer-support",
  "ai-customer-support",
  "internal-workflow-automation",
  "crm-sales-pipeline-automation",
  "lead-capture-qualification",
];
const WEEKLY_CASE_STUDY_SUBJECTS = [
  "Lead response in under a minute",
  "Staffing workflow we automated",
  "Compliance workflow for a finance team",
  "Patient intake without the backlog",
  "Order support on autopilot",
  "Manufacturing ops, less manual handoff",
  "Lead to tour without the lag",
  "The workflow that performed best",
];
const WEEKLY_POSITIONS = [WEEKLY_POSITION_1, WEEKLY_POSITION_2, WEEKLY_POSITION_3, WEEKLY_POSITION_4, WEEKLY_POSITION_6];

function getWeeklyStepContent(stepOrder) {
  const weekIndex = stepOrder - 8;
  const position = weekIndex % 6;
  const cycle = Math.floor(weekIndex / 6);
  if (position === 4) {
    return {
      copy: null,
      caseStudySlug: WEEKLY_CASE_STUDY_SLUGS[cycle],
      caseStudySubject: WEEKLY_CASE_STUDY_SUBJECTS[cycle],
      useOpenedCondition: false,
    };
  }
  const posIndex = position < 4 ? position : position - 1;
  return {
    copy: WEEKLY_POSITIONS[posIndex][cycle],
    caseStudySlug: null,
    caseStudySubject: null,
    useOpenedCondition: position === 1,
  };
}

function getCaseStudyStepCopy(stepOrder) {
  return WEEKLY_CASE_STUDY_STEP_COPY[stepOrder] ?? null;
}

function getPhase1() {
  return [
    { step_order: 1, branch_lane: "main", branch_after_step_order: null, delay_days: 0, condition: "always", step_type: "template", subject_template: PHASE_1_STEP_1.subject, body_template: PHASE_1_STEP_1.body, case_study_mode: "fixed", case_study_slug: null, ai_generated: false },
    { step_order: 2, branch_lane: "opened", branch_after_step_order: 1, delay_days: 3, condition: "opened_not_replied", step_type: "case_study", subject_template: PHASE_1_STEP_2_OPENED.subject, body_template: PHASE_1_STEP_2_OPENED.body, case_study_mode: "fixed", case_study_slug: "lead-capture-qualification", ai_generated: false },
    { step_order: 2, branch_lane: "not_opened", branch_after_step_order: 1, delay_days: 3, condition: "no_open", step_type: "template", subject_template: PHASE_1_STEP_2_NOT_OPENED.subject, body_template: PHASE_1_STEP_2_NOT_OPENED.body, case_study_mode: "fixed", case_study_slug: null, ai_generated: false },
    { step_order: 3, branch_lane: "main", branch_after_step_order: null, delay_days: 5, condition: "no_reply", step_type: "template", subject_template: PHASE_1_STEP_3.subject, body_template: PHASE_1_STEP_3.body, case_study_mode: "fixed", case_study_slug: null, ai_generated: false },
    { step_order: 4, branch_lane: "opened", branch_after_step_order: 3, delay_days: 3, condition: "opened_not_replied", step_type: "template", subject_template: PHASE_1_STEP_4_OPENED.subject, body_template: PHASE_1_STEP_4_OPENED.body, case_study_mode: "fixed", case_study_slug: null, ai_generated: false },
    { step_order: 4, branch_lane: "not_opened", branch_after_step_order: 3, delay_days: 3, condition: "no_open", step_type: "template", subject_template: PHASE_1_STEP_4_NOT_OPENED.subject, body_template: PHASE_1_STEP_4_NOT_OPENED.body, case_study_mode: "fixed", case_study_slug: null, ai_generated: false },
    { step_order: 5, branch_lane: "main", branch_after_step_order: null, delay_days: 7, condition: "no_reply", step_type: "template", subject_template: PHASE_1_STEP_5.subject, body_template: PHASE_1_STEP_5.body, case_study_mode: "fixed", case_study_slug: null, ai_generated: false },
    { step_order: 6, branch_lane: "main", branch_after_step_order: null, delay_days: 7, condition: "no_meeting", step_type: "template", subject_template: WEEKLY_POSITION_1[0].subject, body_template: WEEKLY_POSITION_1[0].body, case_study_mode: "fixed", case_study_slug: null, ai_generated: false },
    { step_order: 7, branch_lane: "main", branch_after_step_order: null, delay_days: 3, condition: "clicked", step_type: "template", subject_template: WEEKLY_POSITION_2[0].subject, body_template: WEEKLY_POSITION_2[0].body, case_study_mode: "fixed", case_study_slug: null, ai_generated: false },
  ];
}

function buildWeeklySteps() {
  const weekly = [];
  for (let stepOrder = 8; stepOrder <= 55; stepOrder++) {
    const { copy, caseStudySlug, caseStudySubject, useOpenedCondition } = getWeeklyStepContent(stepOrder);
    if (caseStudySlug) {
      const csCopy = getCaseStudyStepCopy(stepOrder);
      weekly.push({
        step_order: stepOrder,
        branch_lane: "main",
        branch_after_step_order: null,
        delay_days: 7,
        condition: "no_reply",
        step_type: "case_study",
        subject_template: csCopy?.subject ?? caseStudySubject ?? "Workflow teams your size automated",
        body_template: csCopy?.body ?? "{{case_study_url}}",
        case_study_mode: "fixed",
        case_study_slug: caseStudySlug,
        ai_generated: false,
      });
    } else {
      weekly.push({
        step_order: stepOrder,
        branch_lane: "main",
        branch_after_step_order: null,
        delay_days: 7,
        condition: useOpenedCondition ? "opened_not_replied" : "no_reply",
        step_type: "template",
        subject_template: copy.subject,
        body_template: copy.body,
        case_study_mode: "fixed",
        case_study_slug: null,
        ai_generated: false,
      });
    }
  }
  return weekly;
}

function sqlLiteral(str) {
  if (str == null) return "NULL";
  return `E'${String(str).replace(/'/g, "''")}'`;
}

const steps = [...getPhase1(), ...buildWeeklySteps()];
const updates = steps.map(
  (s) => `  UPDATE public.em_sequence_steps SET
    branch_after_step_order = ${s.branch_after_step_order ?? "NULL"},
    delay_days = ${s.delay_days},
    delay_hours = 0,
    condition = ${sqlLiteral(s.condition)},
    step_type = ${sqlLiteral(s.step_type)},
    ai_angle = NULL,
    ai_instructions = NULL,
    subject_template = ${sqlLiteral(s.subject_template)},
    body_template = ${sqlLiteral(s.body_template)},
    case_study_mode = ${sqlLiteral(s.case_study_mode)},
    case_study_slug = ${s.case_study_slug ? sqlLiteral(s.case_study_slug) : "NULL"},
    ai_generated = false
  WHERE sequence_id = seq_id
    AND step_order = ${s.step_order}
    AND branch_lane = ${sqlLiteral(s.branch_lane)}
    AND COALESCE((metadata->>'copy_locked')::boolean, false) = false;`,
);

const sql = `-- Sync all Cold Outreach — 12 Month step copy from app templates.
-- Generated by scripts/generate-cold-outreach-copy-sql.mjs — re-run after copy edits.
-- Safe to re-run. Skips steps with metadata.copy_locked = true.

DO $sync$
DECLARE
  seq_id UUID;
  updated_count INT := 0;
BEGIN
  SELECT id INTO seq_id FROM public.em_sequences WHERE name = 'Cold Outreach — 12 Month' LIMIT 1;
  IF seq_id IS NULL THEN
    RAISE NOTICE 'Sequence "Cold Outreach — 12 Month" not found — run seed migration first.';
    RETURN;
  END IF;

${updates.join("\n\n")}

  GET DIAGNOSTICS updated_count = ROW_COUNT;

  DELETE FROM public.em_ai_draft_cache
  WHERE step_id IN (
    SELECT id FROM public.em_sequence_steps
    WHERE sequence_id = seq_id
      AND step_order BETWEEN 1 AND 55
      AND COALESCE((metadata->>'copy_locked')::boolean, false) = false
  );

  -- Optional: default empty calendly_url setting for {{calendly_url}} merge var
  INSERT INTO public.em_settings (key, value)
  VALUES ('calendly_url', '""'::jsonb)
  ON CONFLICT (key) DO NOTHING;

  RAISE NOTICE 'Cold outreach copy sync complete for sequence %', seq_id;
END $sync$;
`;

const outPath = join(dirname(fileURLToPath(import.meta.url)), "..", "supabase", "migrations", "20260714120000_sync_cold_outreach_12month_copy.sql");
writeFileSync(outPath, sql);
console.log(`Wrote ${outPath} (${steps.length} steps)`);
