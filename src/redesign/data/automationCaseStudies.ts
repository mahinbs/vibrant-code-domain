/**
 * Detailed case-study / explainer content for each automation on the homepage
 * "What we automate" grid. One entry per service card (keyed by the same
 * `serviceId` used in `services.ts`). Drives the `/automation/:slug` pages.
 *
 * `savings` powers the interactive ROI calculator: defaults are pre-filled but
 * the visitor can override them. Annual saving =
 *   hoursPerWeek × people × automationRate × 52 × hourlyCost
 */

export type HowStep = {
  title: string;
  description: string;
};

export type CaseStudySavings = {
  /** Pre-filled calculator defaults */
  defaultHoursPerWeek: number;
  defaultPeople: number;
  defaultHourlyCost: number;
  /** Share of those hours automation removes (0-1) */
  automationRate: number;
  /** Headline outcome chips shown above the calculator */
  metrics: { value: string; label: string }[];
};

export type AutomationCaseStudy = {
  slug: string;
  serviceId: string;
  category: string;
  title: string;
  hook: string;
  heroSub: string;
  /** "The cost of doing it by hand" */
  painPoints: string[];
  /** Step-by-step: exactly how we automate it */
  howItWorks: HowStep[];
  tools: string[];
  before: string[];
  after: string[];
  savings: CaseStudySavings;
  faqs: { q: string; a: string }[];
};

export const automationCaseStudies: AutomationCaseStudy[] = [
  {
    slug: "lead-capture-qualification",
    serviceId: "web",
    category: "Sales & Revenue",
    title: "Lead Capture & Qualification",
    hook: "Never let a hot lead go cold.",
    heroSub:
      "Every lead from every channel — captured, scored, tagged and routed to the right rep in seconds, 24/7. Your team wakes up to a sorted pipeline instead of a chaotic inbox.",
    painPoints: [
      "Leads arrive at 9pm and sit untouched until someone notices the next afternoon — by then they've replied to a competitor.",
      "Enquiries are scattered across forms, ad platforms, Instagram DMs and a shared inbox nobody fully owns.",
      "Reps manually copy lead details into the CRM and guess which ones are worth chasing.",
      "No one knows your real response time, so slow follow-up keeps quietly costing deals.",
    ],
    howItWorks: [
      {
        title: "Connect every lead source",
        description:
          "We wire your website forms, paid-ad lead forms, Instagram/WhatsApp DMs and inbox into one pipeline so nothing slips through.",
      },
      {
        title: "Score & enrich automatically",
        description:
          "Each lead is enriched (company, role, intent signals), scored against your ideal-customer rules and tagged hot / warm / cold in seconds.",
      },
      {
        title: "Route to the right rep instantly",
        description:
          "Hot leads are assigned by territory or round-robin, pushed to the owner on Slack/WhatsApp/email, and logged in the CRM — no manual entry.",
      },
      {
        title: "Auto-respond in under a minute",
        description:
          "A personalized first reply or booking link goes out instantly, so the lead hears from you while they're still interested.",
      },
    ],
    tools: ["Zapier", "Make", "HubSpot", "Webhooks", "Calendly"],
    before: [
      "Avg. first response: 4-18 hours",
      "Leads logged by hand, inconsistently",
      "No scoring — every lead treated the same",
      "Hot leads lost to faster competitors",
    ],
    after: [
      "Avg. first response: under 60 seconds",
      "100% of leads captured & logged automatically",
      "Hot leads flagged and routed instantly",
      "Reps spend time selling, not sorting",
    ],
    savings: {
      defaultHoursPerWeek: 10,
      defaultPeople: 2,
      defaultHourlyCost: 25,
      automationRate: 0.8,
      metrics: [
        { value: "3x", label: "faster lead response" },
        { value: "+28%", label: "more leads converted" },
        { value: "10 hrs", label: "saved per rep / week" },
      ],
    },
    faqs: [
      {
        q: "Will it work with the lead sources we already use?",
        a: "Yes — forms, Meta/Google lead ads, WhatsApp, Instagram DMs, email and most CRMs all plug in. The free audit confirms your exact stack.",
      },
      {
        q: "Can it qualify leads the way our sales team does?",
        a: "We codify your real qualification rules (budget, role, region, intent) so the scoring matches how your best rep would triage.",
      },
    ],
  },
  {
    slug: "crm-sales-pipeline-automation",
    serviceId: "saas",
    category: "Sales & Revenue",
    title: "CRM & Sales Pipeline Automation",
    hook: "Your CRM updates itself.",
    heroSub:
      "Every call, email and stage logged automatically. Follow-ups triggered on time, every time. Turn the CRM your reps avoid into the system that closes deals.",
    painPoints: [
      "Reps spend the last hour of every day updating the CRM — or skip it entirely, so the data is stale.",
      "Follow-ups depend on someone remembering. Deals go cold in the gaps.",
      "Managers can't trust the pipeline because half of it isn't logged.",
      "Handoffs between SDR and AE drop context, and the prospect feels it.",
    ],
    howItWorks: [
      {
        title: "Auto-log every interaction",
        description:
          "Calls, emails and meetings sync to the right deal automatically — no manual note-taking, no missing activity.",
      },
      {
        title: "Move deals through stages on triggers",
        description:
          "When a proposal is sent, a contract is signed, or a reply lands, the deal advances and the next task is created for you.",
      },
      {
        title: "Never-miss follow-up sequences",
        description:
          "Time-based and behavior-based reminders fire automatically so every prospect gets the right nudge at the right moment.",
      },
      {
        title: "Clean handoffs & alerts",
        description:
          "Owners, managers and the next rep get notified with full context, and stale deals surface before they die.",
      },
    ],
    tools: ["HubSpot", "Salesforce", "Pipedrive", "Make", "Gmail / Outlook"],
    before: [
      "~1 hr/day per rep on CRM admin",
      "Follow-ups missed when things get busy",
      "Pipeline reports are guesswork",
      "Context lost on every handoff",
    ],
    after: [
      "CRM updates itself in the background",
      "Every follow-up triggered automatically",
      "Real-time, trustworthy pipeline",
      "Reps reclaim selling hours",
    ],
    savings: {
      defaultHoursPerWeek: 8,
      defaultPeople: 3,
      defaultHourlyCost: 30,
      automationRate: 0.85,
      metrics: [
        { value: "5 hrs", label: "saved per rep / week" },
        { value: "100%", label: "of activity logged" },
        { value: "+22%", label: "more deals worked" },
      ],
    },
    faqs: [
      {
        q: "Do we have to switch CRMs?",
        a: "No. We automate the CRM you already use. If you don't have one yet, we'll help you pick and set it up.",
      },
      {
        q: "Will reps still control their deals?",
        a: "Completely. Automation handles the busywork — logging and reminders — while reps keep full control of the selling.",
      },
    ],
  },
  {
    slug: "internal-workflow-automation",
    serviceId: "mobile",
    category: "Operations",
    title: "Internal Workflow Automation",
    hook: "Connect the tools that don't talk to each other.",
    heroSub:
      "Approvals, handoffs, onboarding and notifications wired together so work moves from step to step without anyone chasing it. Less pinging, more shipping.",
    painPoints: [
      "Work stalls waiting on an approval buried in someone's inbox.",
      "Onboarding a client or hire is a 30-item checklist done by hand every time.",
      "The same data is re-entered across five tools that don't sync.",
      "People spend their day chasing status updates instead of doing the work.",
    ],
    howItWorks: [
      {
        title: "Map the workflow",
        description:
          "We document how work actually moves today — every step, owner, approval and tool — and find the handoffs that leak time.",
      },
      {
        title: "Wire the tools together",
        description:
          "Your apps are connected so data flows automatically: create once, and it appears everywhere it's needed.",
      },
      {
        title: "Automate approvals & routing",
        description:
          "Requests route to the right approver, escalate if ignored, and move the task forward the moment they're cleared.",
      },
      {
        title: "Trigger the next step automatically",
        description:
          "Onboarding, notifications and handoffs fire on their own, so nothing waits on someone remembering.",
      },
    ],
    tools: ["Make", "Zapier", "n8n", "Slack API", "Google Workspace"],
    before: [
      "Approvals stuck for days",
      "Manual onboarding checklists",
      "Same data typed into 5 tools",
      "Constant 'what's the status?' pings",
    ],
    after: [
      "Approvals routed & escalated automatically",
      "Onboarding runs itself end-to-end",
      "Enter data once, it syncs everywhere",
      "Status is always visible, no chasing",
    ],
    savings: {
      defaultHoursPerWeek: 12,
      defaultPeople: 4,
      defaultHourlyCost: 25,
      automationRate: 0.75,
      metrics: [
        { value: "12 hrs", label: "saved per person / week" },
        { value: "90%", label: "faster approvals" },
        { value: "0", label: "dropped handoffs" },
      ],
    },
    faqs: [
      {
        q: "Our process is messy — can it still be automated?",
        a: "That's exactly where the audit helps. We map the real (messy) process first, clean up the obvious gaps, then automate what's stable.",
      },
      {
        q: "What if our process changes later?",
        a: "Automations are built to be edited. We maintain them and adjust as your process evolves — it's part of the ongoing plan.",
      },
    ],
  },
  {
    slug: "ai-customer-support",
    serviceId: "ai-calling",
    category: "Customer Support",
    title: "AI Customer Support",
    hook: "Answer instantly, around the clock.",
    heroSub:
      "A custom-trained assistant resolves the common questions, drafts replies, and hands the tricky ones to a human with full context attached. Lower support costs, faster answers, happier customers.",
    painPoints: [
      "The same handful of questions get answered by hand, all day, every day.",
      "Customers wait hours (or overnight) for a simple reply.",
      "Support costs scale linearly — more tickets means more headcount.",
      "Agents burn out on repetitive tickets instead of the hard, valuable ones.",
    ],
    howItWorks: [
      {
        title: "Train on your knowledge",
        description:
          "We feed the assistant your docs, past tickets, FAQs and policies so its answers sound like your team — accurate and on-brand.",
      },
      {
        title: "Deploy where customers already are",
        description:
          "Website chat, WhatsApp, email and your help desk — the assistant answers in the channels your customers actually use.",
      },
      {
        title: "Resolve, draft, or escalate",
        description:
          "Common questions are resolved instantly. For others it drafts a reply for an agent, or escalates to a human with the full conversation attached.",
      },
      {
        title: "Learn and improve",
        description:
          "Gaps and new questions are flagged so the assistant keeps getting smarter — and your deflection rate keeps climbing.",
      },
    ],
    tools: ["OpenAI", "RAG", "Intercom", "Zendesk", "WhatsApp"],
    before: [
      "First reply: hours to overnight",
      "Agents answer the same FAQs all day",
      "Costs rise with every new ticket",
      "Limited or no after-hours support",
    ],
    after: [
      "Instant answers, 24/7",
      "Up to 60-70% of tickets auto-resolved",
      "Agents focus on high-value cases",
      "Support that scales without new hires",
    ],
    savings: {
      defaultHoursPerWeek: 15,
      defaultPeople: 2,
      defaultHourlyCost: 22,
      automationRate: 0.65,
      metrics: [
        { value: "24/7", label: "instant coverage" },
        { value: "~65%", label: "tickets auto-resolved" },
        { value: "15 hrs", label: "saved per agent / week" },
      ],
    },
    faqs: [
      {
        q: "Will it give wrong or made-up answers?",
        a: "It answers only from your approved knowledge base, and anything it's unsure about is escalated to a human — never guessed.",
      },
      {
        q: "Can customers still reach a person?",
        a: "Always. The assistant hands off to your team with full context whenever a human is the better fit.",
      },
    ],
  },
  {
    slug: "document-data-processing",
    serviceId: "ai-automation",
    category: "Operations",
    title: "Document & Data Processing",
    hook: "Stop typing what a machine can read.",
    heroSub:
      "Invoices, contracts, receipts and intake forms — we extract the data, validate it, and push it into your systems automatically. Hours of manual entry become a few error-free seconds.",
    painPoints: [
      "Someone re-keys data from PDFs and emails into spreadsheets and accounting tools every day.",
      "Manual entry means typos, and typos mean expensive downstream mistakes.",
      "Documents pile up; processing is slow and backlogs build.",
      "Skilled staff spend hours on data entry instead of real work.",
    ],
    howItWorks: [
      {
        title: "Capture documents automatically",
        description:
          "Files arrive by email, upload or scan and are picked up automatically — no manual sorting or filing.",
      },
      {
        title: "Extract the data with AI",
        description:
          "We read invoices, contracts, receipts and forms and pull out exactly the fields you need, in any layout.",
      },
      {
        title: "Validate & flag exceptions",
        description:
          "Totals, dates and required fields are checked automatically. Anything that looks off is flagged for a quick human glance.",
      },
      {
        title: "Push into your systems",
        description:
          "Clean, structured data lands in your accounting tool, CRM or database — ready to use, with the source document attached.",
      },
    ],
    tools: ["OCR", "Document AI", "Python", "APIs", "Google Sheets"],
    before: [
      "Hours of manual data entry daily",
      "Typos cause downstream errors",
      "Processing backlogs build up",
      "Skilled staff stuck on data entry",
    ],
    after: [
      "Documents processed in seconds",
      "Validation catches errors automatically",
      "No backlog — it keeps up in real time",
      "Staff freed for higher-value work",
    ],
    savings: {
      defaultHoursPerWeek: 14,
      defaultPeople: 2,
      defaultHourlyCost: 24,
      automationRate: 0.9,
      metrics: [
        { value: "60%", label: "fewer manual errors" },
        { value: "14 hrs", label: "saved per person / week" },
        { value: "seconds", label: "per document" },
      ],
    },
    faqs: [
      {
        q: "Our documents come in lots of different formats — is that a problem?",
        a: "No. Modern document AI handles varied layouts. We test against your real samples during the audit to confirm accuracy.",
      },
      {
        q: "What happens if it's unsure about a field?",
        a: "It flags low-confidence extractions for a quick human review instead of guessing, so your data stays clean.",
      },
    ],
  },
  {
    slug: "reporting-live-dashboards",
    serviceId: "design",
    category: "Analytics",
    title: "Reporting & Live Dashboards",
    hook: "Decisions backed by numbers, not guesses.",
    heroSub:
      "We pull data from all your tools into one live dashboard that updates itself. The report that ate half your week now builds itself before Monday's meeting.",
    painPoints: [
      "Someone exports CSVs from five tools and stitches them together by hand every week.",
      "By the time the report is ready, the numbers are already out of date.",
      "Different teams quote different figures because there's no single source of truth.",
      "Leadership flies blind between reports instead of seeing live performance.",
    ],
    howItWorks: [
      {
        title: "Connect your data sources",
        description:
          "Sales, marketing, finance, ops — we connect the tools where your data already lives, securely and read-only.",
      },
      {
        title: "Model one source of truth",
        description:
          "We clean and combine the data into consistent metrics everyone agrees on, so reports finally match.",
      },
      {
        title: "Build the live dashboard",
        description:
          "A clear, shareable dashboard shows the KPIs that matter — refreshed automatically, no manual updates.",
      },
      {
        title: "Automate alerts & digests",
        description:
          "Scheduled summaries and threshold alerts land in email or Slack, so the right people see the right numbers on time.",
      },
    ],
    tools: ["Looker Studio", "Power BI", "BigQuery", "APIs", "Slack"],
    before: [
      "Half a day building reports weekly",
      "Numbers stale by the time they're shared",
      "Teams argue over conflicting figures",
      "No visibility between reports",
    ],
    after: [
      "Reports build themselves",
      "Always-live, real-time numbers",
      "One source of truth everyone trusts",
      "Live visibility, anytime",
    ],
    savings: {
      defaultHoursPerWeek: 6,
      defaultPeople: 2,
      defaultHourlyCost: 30,
      automationRate: 0.9,
      metrics: [
        { value: "6 hrs", label: "saved per person / week" },
        { value: "live", label: "always up to date" },
        { value: "1", label: "source of truth" },
      ],
    },
    faqs: [
      {
        q: "Can it combine data from tools that don't normally connect?",
        a: "Yes — that's the point. We bridge the gaps so all your sources feed one dashboard, even when they don't talk natively.",
      },
      {
        q: "Is our data secure?",
        a: "Connections are read-only and access-controlled. We follow least-privilege access and never move data you haven't approved.",
      },
    ],
  },
];

export function getCaseStudyBySlug(slug: string): AutomationCaseStudy | undefined {
  return automationCaseStudies.find((c) => c.slug === slug);
}

export function getCaseStudyByServiceId(
  serviceId: string,
): AutomationCaseStudy | undefined {
  return automationCaseStudies.find((c) => c.serviceId === serviceId);
}

export function caseStudyPath(slug: string): string {
  return `/automation/${slug}`;
}
