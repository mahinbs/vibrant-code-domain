/**
 * Universal process taxonomy for the /automation-score funnel.
 *
 * The taxonomy is the spine of the whole funnel: industries never add their
 * own categories, they only re-label / re-order these universal ones (see
 * industryProfiles.ts). That guarantees every niche maps into the survey and
 * the report math stays a single lookup table.
 *
 * `baseHoursPerPersonWeek` = benchmark hours one involved person loses to the
 * manual version of this process per week. `automationRecoveryRate` = share of
 * that time realistically recoverable with automation (kept conservative so
 * report numbers stay defensible on the audit call).
 */

export type ProcessCluster = {
  id: string;
  label: string;
};

export const PROCESS_CLUSTERS = [
  { id: "sales", label: "Sales & revenue" },
  { id: "marketing", label: "Marketing" },
  { id: "customer", label: "Customer & client management" },
  { id: "finance", label: "Finance & admin" },
  { id: "compliance", label: "Compliance & documentation" },
  { id: "internal", label: "Internal ops & team management" },
  { id: "production", label: "Production & field operations" },
  { id: "hr", label: "People / HR" },
  { id: "data", label: "Data & intelligence" },
] as const satisfies readonly ProcessCluster[];

export type ClusterId = (typeof PROCESS_CLUSTERS)[number]["id"];

export type ProcessCategory = {
  id: string;
  clusterId: ClusterId;
  universalLabel: string;
  baseHoursPerPersonWeek: number;
  automationRecoveryRate: number;
  /** Pill-tag copy shown on the report ("what we'd automate"). */
  reportTag: string;
  /** One-line preview of what the automated version looks like (report detail rows). */
  automationExample: string;
};

export const PROCESS_CATEGORIES = [
  // ── Sales & revenue ────────────────────────────────────────────────
  {
    id: "lead-capture",
    clusterId: "sales",
    universalLabel: "Capturing & routing new leads",
    baseHoursPerPersonWeek: 3,
    automationRecoveryRate: 0.8,
    reportTag: "AI lead capture & routing",
    automationExample:
      "Every form, ad and call lands in one pipeline, tagged, deduped and assigned in seconds.",
  },
  {
    id: "lead-followup",
    clusterId: "sales",
    universalLabel: "Following up with leads",
    baseHoursPerPersonWeek: 5,
    automationRecoveryRate: 0.75,
    reportTag: "Automated lead follow-ups",
    automationExample:
      "AI replies to every enquiry in under 60 seconds, WhatsApp, email and missed calls.",
  },
  {
    id: "lead-qualification",
    clusterId: "sales",
    universalLabel: "Qualifying & scoring leads",
    baseHoursPerPersonWeek: 3,
    automationRecoveryRate: 0.7,
    reportTag: "AI lead qualification",
    automationExample:
      "Leads auto-scored on fit and intent, so your team only calls the ones worth calling.",
  },
  {
    id: "crm-updates",
    clusterId: "sales",
    universalLabel: "CRM data entry & pipeline updates",
    baseHoursPerPersonWeek: 4,
    automationRecoveryRate: 0.8,
    reportTag: "CRM auto-sync",
    automationExample:
      "Calls, emails and deal stages log themselves, the pipeline stays current without anyone typing.",
  },
  {
    id: "quoting",
    clusterId: "sales",
    universalLabel: "Quotes, proposals & estimates",
    baseHoursPerPersonWeek: 4,
    automationRecoveryRate: 0.65,
    reportTag: "Instant quote & proposal generation",
    automationExample:
      "Branded quotes and proposals generated from your price book in minutes, not days.",
  },
  {
    id: "rfq-bids",
    clusterId: "sales",
    universalLabel: "RFQs, bids & tenders",
    baseHoursPerPersonWeek: 5,
    automationRecoveryRate: 0.6,
    reportTag: "RFQ & bid automation",
    automationExample:
      "Incoming RFQs parsed, costed against your rate tables and drafted for review the same day.",
  },
  {
    id: "contracts",
    clusterId: "sales",
    universalLabel: "Contracts & e-signatures",
    baseHoursPerPersonWeek: 3,
    automationRecoveryRate: 0.7,
    reportTag: "Auto contract generation",
    automationExample:
      "Contracts auto-filled from deal data and sent for e-sign in one click.",
  },
  {
    id: "renewals",
    clusterId: "sales",
    universalLabel: "Renewals, upsells & win-backs",
    baseHoursPerPersonWeek: 3,
    automationRecoveryRate: 0.7,
    reportTag: "Renewal & upsell automation",
    automationExample:
      "Renewal reminders, win-back nudges and upsell offers fire on schedule, not from memory.",
  },

  // ── Marketing ──────────────────────────────────────────────────────
  {
    id: "content-creation",
    clusterId: "marketing",
    universalLabel: "Creating & repurposing content",
    baseHoursPerPersonWeek: 5,
    automationRecoveryRate: 0.6,
    reportTag: "AI content engine",
    automationExample:
      "One long-form piece becomes posts, reel scripts and newsletters automatically.",
  },
  {
    id: "social-scheduling",
    clusterId: "marketing",
    universalLabel: "Social media posting & scheduling",
    baseHoursPerPersonWeek: 3,
    automationRecoveryRate: 0.8,
    reportTag: "Social media autopilot",
    automationExample:
      "A month of posts queued and published across platforms from one approval.",
  },
  {
    id: "campaigns",
    clusterId: "marketing",
    universalLabel: "Email / WhatsApp campaigns",
    baseHoursPerPersonWeek: 4,
    automationRecoveryRate: 0.75,
    reportTag: "Campaign automation",
    automationExample:
      "Segmented email and WhatsApp journeys trigger off customer behaviour, not manual sends.",
  },
  {
    id: "ads-reporting",
    clusterId: "marketing",
    universalLabel: "Ad management & spend reports",
    baseHoursPerPersonWeek: 3,
    automationRecoveryRate: 0.65,
    reportTag: "Automated ad reporting",
    automationExample:
      "Spend, leads and cost-per-lead pulled into one live report, no more screenshot decks.",
  },
  {
    id: "listings-seo",
    clusterId: "marketing",
    universalLabel: "SEO, listings & catalog updates",
    baseHoursPerPersonWeek: 3,
    automationRecoveryRate: 0.7,
    reportTag: "Auto listing & catalog updates",
    automationExample:
      "Catalog and listing changes push to every portal and marketplace at once.",
  },
  {
    id: "reviews",
    clusterId: "marketing",
    universalLabel: "Reviews & reputation management",
    baseHoursPerPersonWeek: 2,
    automationRecoveryRate: 0.75,
    reportTag: "Review & reputation automation",
    automationExample:
      "Happy customers get review requests automatically; bad reviews raise an instant alert.",
  },
  {
    id: "market-monitoring",
    clusterId: "marketing",
    universalLabel: "Competitor & market monitoring",
    baseHoursPerPersonWeek: 2,
    automationRecoveryRate: 0.7,
    reportTag: "Market monitoring bots",
    automationExample:
      "Competitor prices, listings and news tracked by bots and digested into a weekly brief.",
  },

  // ── Customer & client management ───────────────────────────────────
  {
    id: "support",
    clusterId: "customer",
    universalLabel: "Customer support & repeated FAQs",
    baseHoursPerPersonWeek: 6,
    automationRecoveryRate: 0.7,
    reportTag: "AI support agent",
    automationExample:
      "An AI agent resolves the repetitive 70% instantly and hands the rest to your team with full context.",
  },
  {
    id: "scheduling",
    clusterId: "customer",
    universalLabel: "Appointments, reminders & no-shows",
    baseHoursPerPersonWeek: 3,
    automationRecoveryRate: 0.8,
    reportTag: "Smart scheduling & reminders",
    automationExample:
      "Self-serve booking, automatic reminders, and no-show recovery sequences.",
  },
  {
    id: "customer-onboarding",
    clusterId: "customer",
    universalLabel: "Customer onboarding & welcomes",
    baseHoursPerPersonWeek: 3,
    automationRecoveryRate: 0.7,
    reportTag: "Onboarding flows",
    automationExample:
      "Welcome sequences, document collection and setup steps run themselves.",
  },
  {
    id: "orders",
    clusterId: "customer",
    universalLabel: "Order processing & status updates",
    baseHoursPerPersonWeek: 4,
    automationRecoveryRate: 0.75,
    reportTag: "Order & status automation",
    automationExample:
      "Order confirmations, status changes and tracking updates go out without a human touch.",
  },
  {
    id: "feedback",
    clusterId: "customer",
    universalLabel: "Feedback, surveys & NPS",
    baseHoursPerPersonWeek: 2,
    automationRecoveryRate: 0.8,
    reportTag: "Automated feedback loops",
    automationExample:
      "Surveys trigger after every purchase or service; scores roll into a weekly pulse.",
  },
  {
    id: "comms-triage",
    clusterId: "customer",
    universalLabel: "Email / WhatsApp / DM triage",
    baseHoursPerPersonWeek: 4,
    automationRecoveryRate: 0.65,
    reportTag: "AI inbox triage",
    automationExample:
      "One inbox, auto-tagged and routed, urgent messages surface, noise gets filed.",
  },
  {
    id: "client-deliverables",
    clusterId: "customer",
    universalLabel: "Recurring client deliverables",
    baseHoursPerPersonWeek: 5,
    automationRecoveryRate: 0.6,
    reportTag: "Deliverable autopilot",
    automationExample:
      "Recurring reports and filings assembled from source data and queued for your sign-off.",
  },
  {
    id: "doc-chasing",
    clusterId: "customer",
    universalLabel: "Chasing clients for documents",
    baseHoursPerPersonWeek: 4,
    automationRecoveryRate: 0.75,
    reportTag: "Auto document collection",
    automationExample:
      "Clients get automated document requests, reminders and a live checklist, no more chasing.",
  },

  // ── Finance & admin ────────────────────────────────────────────────
  {
    id: "invoicing",
    clusterId: "finance",
    universalLabel: "Invoicing & payment collection",
    baseHoursPerPersonWeek: 4,
    automationRecoveryRate: 0.8,
    reportTag: "Auto invoicing & collections",
    automationExample:
      "Invoices generate on trigger and polite payment chasers escalate automatically.",
  },
  {
    id: "reconciliation",
    clusterId: "finance",
    universalLabel: "Reconciliation & bookkeeping",
    baseHoursPerPersonWeek: 4,
    automationRecoveryRate: 0.7,
    reportTag: "Auto reconciliation",
    automationExample:
      "Bank feeds matched to invoices nightly; only the exceptions need a human.",
  },
  {
    id: "expenses",
    clusterId: "finance",
    universalLabel: "Expense tracking & approvals",
    baseHoursPerPersonWeek: 2,
    automationRecoveryRate: 0.75,
    reportTag: "Expense automation",
    automationExample:
      "Receipts captured by photo, coded automatically, approvals routed by policy.",
  },
  {
    id: "payroll",
    clusterId: "finance",
    universalLabel: "Payroll preparation",
    baseHoursPerPersonWeek: 2,
    automationRecoveryRate: 0.7,
    reportTag: "Payroll prep automation",
    automationExample:
      "Attendance, leave and variable pay flow into payroll-ready sheets untouched.",
  },
  {
    id: "procurement",
    clusterId: "finance",
    universalLabel: "Purchase orders & procurement",
    baseHoursPerPersonWeek: 3,
    automationRecoveryRate: 0.65,
    reportTag: "PO & procurement workflows",
    automationExample:
      "POs raised from stock triggers, approvals tracked through to delivery.",
  },

  // ── Compliance & documentation ─────────────────────────────────────
  {
    id: "compliance-paperwork",
    clusterId: "compliance",
    universalLabel: "Compliance paperwork & filings",
    baseHoursPerPersonWeek: 4,
    automationRecoveryRate: 0.6,
    reportTag: "Compliance workflows",
    automationExample:
      "Filings assembled from templates with a full audit trail, deadlines pre-scheduled.",
  },
  {
    id: "deadline-tracking",
    clusterId: "compliance",
    universalLabel: "Deadline & renewal tracking",
    baseHoursPerPersonWeek: 2,
    automationRecoveryRate: 0.85,
    reportTag: "Deadline & renewal sentinel",
    automationExample:
      "Every license, lease and statutory date on one radar with escalating alerts.",
  },
  {
    id: "doc-generation",
    clusterId: "compliance",
    universalLabel: "Document generation & filing",
    baseHoursPerPersonWeek: 3,
    automationRecoveryRate: 0.75,
    reportTag: "Document automation",
    automationExample:
      "Standard documents generated from your data in seconds and filed automatically.",
  },
  {
    id: "data-rekeying",
    clusterId: "compliance",
    universalLabel: "Re-keying data between systems",
    baseHoursPerPersonWeek: 4,
    automationRecoveryRate: 0.85,
    reportTag: "System-to-system sync",
    automationExample:
      "Systems synced directly, data entered once, correct everywhere.",
  },
  {
    id: "records-verification",
    clusterId: "compliance",
    universalLabel: "KYC / records verification",
    baseHoursPerPersonWeek: 3,
    automationRecoveryRate: 0.7,
    reportTag: "Automated verification",
    automationExample:
      "KYC and records checked against sources automatically; only exceptions get flagged.",
  },

  // ── Internal ops & team management ─────────────────────────────────
  {
    id: "reporting",
    clusterId: "internal",
    universalLabel: "Reports & dashboards built by hand",
    baseHoursPerPersonWeek: 4,
    automationRecoveryRate: 0.8,
    reportTag: "Live dashboards",
    automationExample:
      "KPIs stream into live dashboards, the Monday report builds itself.",
  },
  {
    id: "approvals",
    clusterId: "internal",
    universalLabel: "Chasing approvals & sign-offs",
    baseHoursPerPersonWeek: 3,
    automationRecoveryRate: 0.75,
    reportTag: "Approval workflows",
    automationExample:
      "Requests route to the right approver with automatic nudges until they're closed.",
  },
  {
    id: "task-tracking",
    clusterId: "internal",
    universalLabel: "Project & task status chasing",
    baseHoursPerPersonWeek: 3,
    automationRecoveryRate: 0.7,
    reportTag: "Auto status updates",
    automationExample:
      "Status pulled from where the work actually happens, no more \u201cany update?\u201d pings.",
  },
  {
    id: "meetings",
    clusterId: "internal",
    universalLabel: "Meeting notes & action items",
    baseHoursPerPersonWeek: 3,
    automationRecoveryRate: 0.7,
    reportTag: "AI meeting notes",
    automationExample:
      "Calls transcribed, summarized, and action items assigned automatically.",
  },
  {
    id: "sops",
    clusterId: "internal",
    universalLabel: "SOPs & knowledge base upkeep",
    baseHoursPerPersonWeek: 2,
    automationRecoveryRate: 0.6,
    reportTag: "Living knowledge base",
    automationExample:
      "SOPs generated from recorded workflows and kept current in one hub.",
  },
  {
    id: "inventory",
    clusterId: "internal",
    universalLabel: "Inventory & stock management",
    baseHoursPerPersonWeek: 4,
    automationRecoveryRate: 0.7,
    reportTag: "Inventory automation",
    automationExample:
      "Stock levels tracked in real time with reorder triggers and low-stock alerts.",
  },
  {
    id: "vendors",
    clusterId: "internal",
    universalLabel: "Vendor & supplier coordination",
    baseHoursPerPersonWeek: 3,
    automationRecoveryRate: 0.6,
    reportTag: "Vendor workflows",
    automationExample:
      "Vendor follow-ups, PO status and rate comparisons handled by workflows.",
  },
  {
    id: "logistics",
    clusterId: "internal",
    universalLabel: "Logistics & fulfillment coordination",
    baseHoursPerPersonWeek: 4,
    automationRecoveryRate: 0.65,
    reportTag: "Fulfillment automation",
    automationExample:
      "Dispatch, courier handoffs and delivery updates coordinated automatically.",
  },

  // ── Production & field operations ──────────────────────────────────
  {
    id: "production-planning",
    clusterId: "production",
    universalLabel: "Production planning & scheduling",
    baseHoursPerPersonWeek: 5,
    automationRecoveryRate: 0.6,
    reportTag: "Production scheduling",
    automationExample:
      "Orders convert into machine and shift schedules that re-plan as priorities change.",
  },
  {
    id: "shopfloor",
    clusterId: "production",
    universalLabel: "Shop-floor tracking & job cards",
    baseHoursPerPersonWeek: 4,
    automationRecoveryRate: 0.65,
    reportTag: "Digital job cards",
    automationExample:
      "Digital job cards update from the floor, progress visible without walking it.",
  },
  {
    id: "quality-control",
    clusterId: "production",
    universalLabel: "QC & inspection reports",
    baseHoursPerPersonWeek: 3,
    automationRecoveryRate: 0.65,
    reportTag: "Digital QC & inspections",
    automationExample:
      "Inspection checklists on tablets, instant reports, defects trended automatically.",
  },
  {
    id: "maintenance",
    clusterId: "production",
    universalLabel: "Equipment maintenance schedules",
    baseHoursPerPersonWeek: 2,
    automationRecoveryRate: 0.75,
    reportTag: "Maintenance scheduling",
    automationExample:
      "Preventive maintenance scheduled by usage hours, with work orders raised automatically.",
  },
  {
    id: "field-dispatch",
    clusterId: "production",
    universalLabel: "Field service dispatch & site updates",
    baseHoursPerPersonWeek: 4,
    automationRecoveryRate: 0.7,
    reportTag: "Dispatch automation",
    automationExample:
      "Jobs assigned by location and skill; site updates flow back in real time.",
  },
  {
    id: "safety-incidents",
    clusterId: "production",
    universalLabel: "Safety & incident reporting",
    baseHoursPerPersonWeek: 2,
    automationRecoveryRate: 0.7,
    reportTag: "Incident report workflows",
    automationExample:
      "Incidents logged by photo and voice; reports and notifications auto-generated.",
  },

  // ── People / HR ────────────────────────────────────────────────────
  {
    id: "sourcing",
    clusterId: "hr",
    universalLabel: "Candidate sourcing & screening",
    baseHoursPerPersonWeek: 5,
    automationRecoveryRate: 0.7,
    reportTag: "AI candidate screening",
    automationExample:
      "AI screens resumes against your criteria and delivers a shortlist overnight.",
  },
  {
    id: "interviews",
    clusterId: "hr",
    universalLabel: "Interview scheduling & comms",
    baseHoursPerPersonWeek: 3,
    automationRecoveryRate: 0.8,
    reportTag: "Interview autopilot",
    automationExample:
      "Candidates self-book interview slots; reminders and updates go out automatically.",
  },
  {
    id: "employee-onboarding",
    clusterId: "hr",
    universalLabel: "Employee onboarding / offboarding",
    baseHoursPerPersonWeek: 3,
    automationRecoveryRate: 0.7,
    reportTag: "HR onboarding flows",
    automationExample:
      "Offer-to-day-one checklists, accounts and paperwork run on rails.",
  },
  {
    id: "timesheets",
    clusterId: "hr",
    universalLabel: "Timesheets, attendance & leave",
    baseHoursPerPersonWeek: 2,
    automationRecoveryRate: 0.8,
    reportTag: "Attendance automation",
    automationExample:
      "Attendance and leave captured automatically and synced straight to payroll.",
  },
  {
    id: "training",
    clusterId: "hr",
    universalLabel: "Training assignment & tracking",
    baseHoursPerPersonWeek: 2,
    automationRecoveryRate: 0.7,
    reportTag: "Training automation",
    automationExample:
      "Courses assigned by role, completion chased and certificates issued automatically.",
  },

  // ── Data & intelligence ────────────────────────────────────────────
  {
    id: "data-collection",
    clusterId: "data",
    universalLabel: "Data collection & research",
    baseHoursPerPersonWeek: 4,
    automationRecoveryRate: 0.75,
    reportTag: "Research & scraping bots",
    automationExample:
      "Bots gather the data you research by hand and deliver it structured.",
  },
  {
    id: "data-cleaning",
    clusterId: "data",
    universalLabel: "Data cleaning & deduplication",
    baseHoursPerPersonWeek: 3,
    automationRecoveryRate: 0.8,
    reportTag: "Data hygiene bots",
    automationExample:
      "Duplicates merged and records standardized on a schedule, not during a crisis.",
  },
  {
    id: "tool-syncing",
    clusterId: "data",
    universalLabel: "Cross-tool syncing & migrations",
    baseHoursPerPersonWeek: 3,
    automationRecoveryRate: 0.8,
    reportTag: "Tool integrations",
    automationExample:
      "Your tools finally talk to each other, one change updates everywhere.",
  },
] as const satisfies readonly ProcessCategory[];

export type ProcessId = (typeof PROCESS_CATEGORIES)[number]["id"];

const categoryById = new Map<string, ProcessCategory>(
  PROCESS_CATEGORIES.map((c) => [c.id, c]),
);

export function getProcessCategory(id: string): ProcessCategory | undefined {
  return categoryById.get(id);
}

export function categoriesForCluster(clusterId: ClusterId): ProcessCategory[] {
  return PROCESS_CATEGORIES.filter((c) => c.clusterId === clusterId);
}

/** Team size ranges for Step 2. `effectivePeople` = people assumed to be hands-on in each selected process area (deliberately much smaller than headcount so estimates stay conservative). */
export const TEAM_SIZE_OPTIONS = [
  { id: "1-10", label: "1–10 people", effectivePeople: 2 },
  { id: "11-50", label: "11–50 people", effectivePeople: 5 },
  { id: "51-200", label: "51–200 people", effectivePeople: 12 },
  { id: "200-plus", label: "200+ people", effectivePeople: 24 },
] as const;

export type TeamSizeId = (typeof TEAM_SIZE_OPTIONS)[number]["id"];

/** Step 4 (optional), current tooling, used as a maturity signal. */
export const TOOL_OPTIONS = [
  { id: "excel", label: "Excel / Google Sheets" },
  { id: "crm", label: "A CRM (Zoho, HubSpot, Salesforce…)" },
  { id: "whatsapp", label: "WhatsApp for business comms" },
  { id: "erp", label: "ERP / accounting software" },
  { id: "automation-tools", label: "Zapier / Make / n8n" },
  { id: "none", label: "Mostly manual, no real tools" },
] as const;

export type ToolId = (typeof TOOL_OPTIONS)[number]["id"];
