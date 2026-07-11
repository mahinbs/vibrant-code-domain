/** Fixed subject/body pairs for the 12-month cold sequence weekly rotation. */

export type WeeklyCopy = { subject: string; body: string };

/** Position 1 — Direct ask / book a call */
export const WEEKLY_POSITION_1: WeeklyCopy[] = [
  {
    subject: "Free 15 min, {{name}}?",
    body: "No pitch here — just a slot if you want it: [calendly link]\nIf automation for {{company}} isn't a priority right now, no worries, I'll stop pinging.",
  },
  {
    subject: "What manual follow-up is costing {{company}}",
    body: "Most teams don't track this, but slow lead follow-up usually costs 20-30% of pipeline, quietly.\nHappy to walk through where that's likely leaking for {{company}} — 15 min, your call: [calendly link]",
  },
  {
    subject: "A few teams in your space already did this",
    body: "Not naming names, but a couple of companies doing similar work to {{company}} automated their lead intake this year and stopped losing leads overnight.\nWant the rundown? [calendly link]",
  },
  {
    subject: "One question about {{company}}'s follow-up",
    body: "When a lead comes in at {{company}}, how long before someone actually responds?\nIf the honest answer is \"depends,\" that's usually fixable in a week.",
  },
  {
    subject: "Reshab here — one more try",
    body: "I've sent a few of these and don't want to keep cluttering your inbox.\nIf there's any interest in fixing manual follow-up at {{company}}, reply and I'll keep it short. If not, I'll close this out.",
  },
  {
    subject: "Planning season at {{company}}?",
    body: "If you're mapping out next quarter, this is usually when automation gets budgeted and then forgotten by Q2.\nWorth 15 min now while it's on the radar? [calendly link]",
  },
  {
    subject: "\"Too much to switch right now\" — fair",
    body: "Most teams assume automation means ripping out their current stack. It doesn't — this usually plugs into what {{company}} already uses.\nIf that's what's held this up, worth a quick call to see the actual lift.",
  },
  {
    subject: "Your competitors aren't waiting",
    body: "The teams winning right now in your space aren't doing anything smarter — they're just not doing it manually anymore.\nHappy to show you what that looks like for {{company}}: [calendly link]",
  },
];

/** Position 2 — Engagement-triggered (opened/clicked path) */
export const WEEKLY_POSITION_2: WeeklyCopy[] = [
  {
    subject: "Saw you opened this — one question",
    body: "No pressure, just curious if this is something {{company}} is actively looking at, or just filed for later.",
  },
  {
    subject: "~12 hrs/week, roughly",
    body: "That's the average time teams like {{company}} were losing to manual lead handling before automating it.\nIf that number's in the right ballpark for you, worth a look.",
  },
  {
    subject: "Guessing where {{company}}'s stuck",
    body: "If I had to guess, it's either lead response time or data entry between tools. Usually one of the two.\nWhich one's closer?",
  },
  {
    subject: "A quiet win for a team like yours",
    body: "A similar-sized company cut their lead response time from hours to minutes without adding headcount.\nCan share exactly how if useful.",
  },
  {
    subject: "Timing shift in your industry",
    body: "Buyers are expecting faster responses than they were even a year ago — the bar's moved, quietly.\nMight be worth checking if {{company}}'s process kept up.",
  },
  {
    subject: "10 minutes, no pitch",
    body: "Not a sales call — just a look at where {{company}}'s current process has gaps, free either way.",
  },
  {
    subject: "Manual vs. automated, in one line",
    body: "Manual: lead sits for hours, maybe gets a reply. Automated: lead gets a response in under a minute, every time.\nThat's really the whole pitch.",
  },
  {
    subject: "Still relevant, or should I stop?",
    body: "Genuinely asking — if this isn't useful for {{company}} right now, tell me and I'll take you off the list. If it is, happy to keep going.",
  },
];

/** Position 3 — Trend / ROI / competitive angle */
export const WEEKLY_POSITION_3: WeeklyCopy[] = [
  {
    subject: "Where the ROI actually shows up",
    body: "Most teams expect automation ROI in \"saved time.\" The bigger number is usually recovered leads that were falling through cracks.\nWorth a quick look at where that applies to {{company}}.",
  },
  {
    subject: "Compliance load creeping up?",
    body: "If reporting or audit trail requirements have gotten heavier this year, that's usually a sign manual processes are about to break.\nAutomating that layer tends to fix both problems at once.",
  },
  {
    subject: "Not trying to create urgency, but",
    body: "A handful of companies in your space have quietly automated core workflows this year. Not a trend piece — just what's actually happening.",
  },
  {
    subject: "Scaling {{company}} without scaling headcount",
    body: "If growth plans for {{company}} assume hiring to keep up with volume, automation is usually the cheaper first move.",
  },
  {
    subject: "What your customers actually notice",
    body: "Customers don't see your backend — they just notice when responses are fast. That's usually the real value of automating this.",
  },
  {
    subject: "Data you're probably not capturing",
    body: "Manual processes usually mean no clean record of what happened with a lead. Automating it tends to surface that data for the first time.",
  },
  {
    subject: "Speed-to-lead, the actual number",
    body: "Response time inside 5 minutes converts significantly better than anything slower — most teams don't realize how far off they are until they check.",
  },
  {
    subject: "What's changed for {{company}} this year",
    body: "Worth a quick gut-check: is {{company}}'s process handling the same volume it was a year ago, or has it quietly gotten harder to keep up?",
  },
];

/** Position 4 — Pain-point question */
export const WEEKLY_POSITION_4: WeeklyCopy[] = [
  {
    subject: "Still manual on {{company}}'s follow-up?",
    body: "Curious if this is still handled by hand at {{company}}, or if something's already in place.",
  },
  {
    subject: "Rough estimate — how many hours/week?",
    body: "No wrong answer, just curious what manual follow-up is costing your team weekly right now.",
  },
  {
    subject: "What's the actual bottleneck?",
    body: "If you had to name one thing slowing {{company}} down operationally, what would it be?",
  },
  {
    subject: "How many tools are you stitching together?",
    body: "Most teams have 3-4 tools that don't talk to each other, and someone's manually bridging the gap. Sound familiar?",
  },
  {
    subject: "Is this blocking growth plans?",
    body: "Sometimes the manual process isn't just annoying — it's actually capping how fast {{company}} can scale. Worth checking which one it is.",
  },
  {
    subject: "What's your team saying about this?",
    body: "Usually the people doing the manual work complain about it long before leadership hears it. Has that started at {{company}}?",
  },
  {
    subject: "Do you know your lead drop-off rate?",
    body: "Most companies don't track how many leads go cold from slow follow-up — until they automate and see the number.",
  },
  {
    subject: "Still a priority?",
    body: "Just checking in — is fixing this still on your radar for {{company}}, or has it moved down the list?",
  },
];

/** Position 5 — Case study rotation (fixed slug per cycle) */
export const WEEKLY_CASE_STUDY_SLUGS: string[] = [
  "lead-capture-qualification",
  "internal-workflow-automation",
  "document-data-processing",
  "lead-capture-qualification",
  "ai-customer-support",
  "internal-workflow-automation",
  "crm-sales-pipeline-automation",
  "lead-capture-qualification",
];

export const WEEKLY_CASE_STUDY_SUBJECTS: string[] = [
  "Lead response in under a minute",
  "Staffing workflow we automated",
  "Compliance workflow for a finance team",
  "Patient intake without the backlog",
  "Order support on autopilot",
  "Manufacturing ops, less manual handoff",
  "Lead to tour without the lag",
  "The workflow that performed best",
];

/** Position 6 — Free audit tease */
export const WEEKLY_POSITION_6: WeeklyCopy[] = [
  {
    subject: "Free automation audit for {{company}}?",
    body: "No cost, no obligation — I'll point out one or two things {{company}} could automate this month. Interested?",
  },
  {
    subject: "My guess at {{company}}'s biggest fix",
    body: "Based on companies your size, I'd guess lead follow-up is the first thing worth automating. Want me to confirm or correct that guess?",
  },
  {
    subject: "15 minutes, nothing needed from you",
    body: "The audit's free and doesn't require prep on your end — just a look at what's already happening at {{company}}.",
  },
  {
    subject: "What you'd walk away with",
    body: "Not a sales pitch — you'd get a short list of what to automate first at {{company}}, ranked by impact. Yours either way.",
  },
  {
    subject: "Standing offer, no deadline",
    body: "This isn't going anywhere and there's no pressure — just let me know whenever it's useful to look at {{company}}'s process.",
  },
  {
    subject: "How {{company}} compares",
    body: "Curious how automated your process is versus others in your space? The audit usually answers that pretty quickly.",
  },
  {
    subject: "No call required, if you'd rather not",
    body: "If a call feels like overkill, reply here and I'll just send over what I'd flag for {{company}} directly.",
  },
  {
    subject: "Last one on this — audit's still open",
    body: "Closing this thread out soon. If a free look at {{company}}'s automation gaps is still useful, this is the easy way in.",
  },
];

export const WEEKLY_POSITIONS: WeeklyCopy[][] = [
  WEEKLY_POSITION_1,
  WEEKLY_POSITION_2,
  WEEKLY_POSITION_3,
  WEEKLY_POSITION_4,
  WEEKLY_POSITION_6,
];

/** position 0-5 for steps 8–55; index 4 is case study (handled separately) */
export function getWeeklyStepContent(stepOrder: number): {
  position: number;
  cycle: number;
  copy: WeeklyCopy | null;
  caseStudySlug: string | null;
  caseStudySubject: string | null;
  useOpenedCondition: boolean;
} {
  const weekIndex = stepOrder - 8;
  const position = weekIndex % 6;
  const cycle = Math.floor(weekIndex / 6);

  if (position === 4) {
    return {
      position,
      cycle,
      copy: null,
      caseStudySlug: WEEKLY_CASE_STUDY_SLUGS[cycle],
      caseStudySubject: WEEKLY_CASE_STUDY_SUBJECTS[cycle],
      useOpenedCondition: false,
    };
  }

  const posIndex = position < 4 ? position : position - 1;
  const copy = WEEKLY_POSITIONS[posIndex][cycle];

  return {
    position,
    cycle,
    copy,
    caseStudySlug: null,
    caseStudySubject: null,
    useOpenedCondition: position === 1,
  };
}
