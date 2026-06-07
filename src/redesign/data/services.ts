export type Service = {
  id: string;
  title: string;
  blurb: string;
  duration: string;
  bullets: string[];
  stack: string[];
  isNew?: boolean;
};

export const services: Service[] = [
  {
    id: "web",
    title: "Lead Capture & Qualification",
    blurb:
      "Never let a hot lead go cold. We capture, score, tag and route every lead in seconds.",
    duration: "Live in ~2 weeks",
    bullets: [
      "Capture from forms, ads, DMs & email",
      "Instant lead scoring & tagging",
      "Auto-routed to the right rep",
      "Faster response = more deals closed",
    ],
    stack: ["Zapier", "Make", "HubSpot", "Webhooks"],
  },
  {
    id: "saas",
    title: "CRM & Sales Pipeline Automation",
    blurb:
      "Your CRM updates itself. Every call, email and stage logged automatically, follow-ups on time.",
    duration: "Live in ~2-3 weeks",
    bullets: [
      "Auto-logged calls, emails & stages",
      "Follow-ups triggered on time",
      "No more manual data entry",
      "A CRM your reps actually use",
    ],
    stack: ["HubSpot", "Salesforce", "Pipedrive", "Make"],
  },
  {
    id: "mobile",
    title: "Internal Workflow Automation",
    blurb:
      "Connect the tools that don't talk to each other. Approvals, handoffs and onboarding wired together.",
    duration: "Live in ~2-4 weeks",
    bullets: [
      "Approvals & handoffs on autopilot",
      "Onboarding & notifications wired up",
      "Work moves without anyone chasing it",
      "Less pinging, more shipping",
    ],
    stack: ["Make", "Zapier", "n8n", "Slack API"],
  },
  {
    id: "ai-calling",
    title: "AI Customer Support",
    blurb:
      "Answer instantly, around the clock. A custom-trained assistant resolves common questions and hands off the rest.",
    duration: "Live in ~2-3 weeks",
    bullets: [
      "Custom-trained on your business",
      "Resolves common questions 24/7",
      "Smart handoff to humans with context",
      "Lower support costs, happier customers",
    ],
    stack: ["OpenAI", "RAG", "Intercom", "Zendesk"],
    isNew: true,
  },
  {
    id: "ai-automation",
    title: "Document & Data Processing",
    blurb:
      "Stop typing what a machine can read. We extract, validate and push data into your systems automatically.",
    duration: "Live in ~2-4 weeks",
    bullets: [
      "Extract data from any document",
      "Automatic validation checks",
      "Pushed straight into your systems",
      "Hours of entry become seconds",
    ],
    stack: ["OCR", "Document AI", "Python", "APIs"],
    isNew: true,
  },
  {
    id: "design",
    title: "Reporting & Live Dashboards",
    blurb:
      "Decisions backed by numbers, not guesses. One live dashboard that pulls from all your tools and updates itself.",
    duration: "Live in ~2-3 weeks",
    bullets: [
      "All your tools in one dashboard",
      "Updates itself in real time",
      "No more half-day report builds",
      "Ready before Monday's meeting",
    ],
    stack: ["Looker Studio", "Power BI", "BigQuery", "APIs"],
  },
];
