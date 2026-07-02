import { getProcessCategory, type ProcessId } from "./taxonomy";

/**
 * Industry overlays for the /automation-score funnel.
 *
 * Industries never add categories — they only re-label universal processes in
 * their own vocabulary and pick which ~8-10 show first in Step 3. "Other"
 * falls back to universal labels, so any niche always works.
 *
 * `hourlyCostLoaded` = assumed loaded cost per work-hour (INR) used for the
 * monthly-cost estimate in the report.
 */
export type IndustryProfile = {
  id: string;
  label: string;
  processLabels: Partial<Record<ProcessId, string>>;
  emphasizedProcesses: ProcessId[];
  hourlyCostLoaded: number;
};

export const INDUSTRY_PROFILES: IndustryProfile[] = [
  {
    id: "real-estate",
    label: "Real Estate",
    hourlyCostLoaded: 600,
    processLabels: {
      "lead-followup": "Following up with buyer / tenant leads",
      scheduling: "Site-visit scheduling & reminders",
      "compliance-paperwork": "RERA / registration paperwork",
      contracts: "Agreements, sale deeds & e-signing",
      "deadline-tracking": "Lease & listing renewals",
      "listings-seo": "Listing & portal updates",
      "doc-chasing": "Chasing buyers / sellers for documents",
      "comms-triage": "WhatsApp & call follow-up triage",
    },
    emphasizedProcesses: [
      "lead-followup",
      "scheduling",
      "listings-seo",
      "contracts",
      "compliance-paperwork",
      "doc-chasing",
      "deadline-tracking",
      "crm-updates",
      "comms-triage",
    ],
  },
  {
    id: "healthcare",
    label: "Healthcare",
    hourlyCostLoaded: 700,
    processLabels: {
      scheduling: "Appointment booking & no-show recovery",
      support: "Patient queries & repeated FAQs",
      "records-verification": "Patient records & insurance verification",
      "compliance-paperwork": "Clinical compliance & filings",
      "doc-generation": "Reports & discharge summaries",
      invoicing: "Billing & insurance claims",
      feedback: "Patient feedback & follow-ups",
      "comms-triage": "Patient call / WhatsApp triage",
    },
    emphasizedProcesses: [
      "scheduling",
      "support",
      "records-verification",
      "invoicing",
      "doc-generation",
      "compliance-paperwork",
      "feedback",
      "comms-triage",
    ],
  },
  {
    id: "staffing",
    label: "Staffing / Recruitment",
    hourlyCostLoaded: 550,
    processLabels: {
      sourcing: "Candidate sourcing",
      interviews: "Screening calls & interview scheduling",
      "lead-followup": "Client & candidate follow-ups",
      "crm-updates": "ATS / CRM updates",
      "doc-chasing": "Collecting candidate documents",
      "customer-onboarding": "Client onboarding & updates",
      timesheets: "Contractor timesheets & attendance",
      invoicing: "Client invoicing & collections",
    },
    emphasizedProcesses: [
      "sourcing",
      "interviews",
      "lead-followup",
      "crm-updates",
      "doc-chasing",
      "customer-onboarding",
      "timesheets",
      "invoicing",
    ],
  },
  {
    id: "fintech",
    label: "Finance / Fintech",
    hourlyCostLoaded: 900,
    processLabels: {
      "records-verification": "KYC & onboarding verification",
      "compliance-paperwork": "Regulatory filings & audit trails",
      reconciliation: "Payment reconciliation",
      support: "Customer support & dispute queries",
      "deadline-tracking": "Regulatory due-date tracking",
      "data-rekeying": "Re-keying data across core systems",
    },
    emphasizedProcesses: [
      "records-verification",
      "support",
      "compliance-paperwork",
      "reconciliation",
      "lead-followup",
      "reporting",
      "data-rekeying",
      "deadline-tracking",
    ],
  },
  {
    id: "ecommerce",
    label: "E-commerce / Retail",
    hourlyCostLoaded: 500,
    processLabels: {
      support: "Customer support & \u201cwhere is my order?\u201d queries",
      "listings-seo": "Catalog & marketplace listing updates",
      logistics: "Shipping, returns & COD coordination",
      orders: "Order processing & tracking updates",
    },
    emphasizedProcesses: [
      "orders",
      "support",
      "inventory",
      "listings-seo",
      "campaigns",
      "reviews",
      "logistics",
      "invoicing",
    ],
  },
  {
    id: "manufacturing",
    label: "Manufacturing",
    hourlyCostLoaded: 650,
    processLabels: {
      "rfq-bids": "RFQs & quotations",
      "production-planning": "Production planning & workfloor scheduling",
      shopfloor: "Shop-floor progress tracking & job cards",
      "quality-control": "QC checks & inspection reports",
      maintenance: "Machine maintenance schedules",
      inventory: "Raw material & stock tracking",
      vendors: "Supplier follow-ups & coordination",
      procurement: "Purchase orders & procurement",
    },
    emphasizedProcesses: [
      "rfq-bids",
      "production-planning",
      "shopfloor",
      "quality-control",
      "maintenance",
      "inventory",
      "procurement",
      "vendors",
      "invoicing",
    ],
  },
  {
    id: "accounting",
    label: "Accounting / CA Firm",
    hourlyCostLoaded: 700,
    processLabels: {
      "doc-chasing": "Chasing clients for documents",
      "client-deliverables": "Monthly GST / TDS & filing deliverables",
      "deadline-tracking": "Statutory due-date tracking",
      "data-rekeying": "Data entry from bank statements & invoices",
      "comms-triage": "Client email & WhatsApp triage",
      invoicing: "Client billing & fee collection",
      "customer-onboarding": "New client onboarding",
    },
    emphasizedProcesses: [
      "doc-chasing",
      "client-deliverables",
      "deadline-tracking",
      "reconciliation",
      "data-rekeying",
      "comms-triage",
      "invoicing",
      "customer-onboarding",
    ],
  },
  {
    id: "agency",
    label: "Agency / Marketing",
    hourlyCostLoaded: 600,
    processLabels: {
      quoting: "Proposals & pitch decks",
      "client-deliverables": "Retainer reports & deliverables",
      "ads-reporting": "Client ad reports",
      "comms-triage": "Client email / Slack / WhatsApp triage",
    },
    emphasizedProcesses: [
      "lead-followup",
      "quoting",
      "client-deliverables",
      "content-creation",
      "social-scheduling",
      "ads-reporting",
      "comms-triage",
      "invoicing",
    ],
  },
  {
    id: "logistics",
    label: "Logistics / Supply Chain",
    hourlyCostLoaded: 550,
    processLabels: {
      orders: "Shipment booking & tracking updates",
      logistics: "Dispatch & fulfillment coordination",
      "field-dispatch": "Driver & fleet dispatch",
      "doc-generation": "PODs, invoices & shipping docs",
      "data-rekeying": "Re-keying shipment data between systems",
    },
    emphasizedProcesses: [
      "orders",
      "logistics",
      "field-dispatch",
      "doc-generation",
      "vendors",
      "invoicing",
      "comms-triage",
      "data-rekeying",
    ],
  },
  {
    id: "professional-services",
    label: "Professional Services",
    hourlyCostLoaded: 800,
    processLabels: {
      quoting: "Proposals & engagement letters",
      "client-deliverables": "Recurring client deliverables",
      "doc-chasing": "Chasing clients for inputs & documents",
    },
    emphasizedProcesses: [
      "lead-followup",
      "quoting",
      "client-deliverables",
      "meetings",
      "doc-chasing",
      "invoicing",
      "comms-triage",
      "task-tracking",
    ],
  },
  {
    id: "education",
    label: "Education / Training",
    hourlyCostLoaded: 450,
    processLabels: {
      "lead-followup": "Admission enquiry follow-ups",
      scheduling: "Class & demo scheduling",
      support: "Student & parent queries",
      "customer-onboarding": "Student onboarding",
      invoicing: "Fee collection & reminders",
      "doc-chasing": "Collecting admission documents",
    },
    emphasizedProcesses: [
      "lead-followup",
      "scheduling",
      "support",
      "campaigns",
      "customer-onboarding",
      "invoicing",
      "feedback",
      "doc-chasing",
    ],
  },
  {
    id: "other",
    label: "Other",
    hourlyCostLoaded: 550,
    processLabels: {},
    emphasizedProcesses: [
      "lead-followup",
      "support",
      "crm-updates",
      "invoicing",
      "reporting",
      "data-rekeying",
      "scheduling",
      "comms-triage",
    ],
  },
];

const profileById = new Map(INDUSTRY_PROFILES.map((p) => [p.id, p]));

const FALLBACK_PROFILE = profileById.get("other") as IndustryProfile;

export function getIndustryProfile(id: string | null | undefined): IndustryProfile {
  return (id && profileById.get(id)) || FALLBACK_PROFILE;
}

/** Label for a process in a given industry's vocabulary (falls back to universal). */
export function processLabelFor(industry: IndustryProfile, processId: string): string {
  const override = industry.processLabels[processId as ProcessId];
  if (override) return override;
  return getProcessCategory(processId)?.universalLabel ?? processId;
}
