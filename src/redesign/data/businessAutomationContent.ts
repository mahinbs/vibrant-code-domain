import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Building2,
  FileText,
  Mail,
  MessageSquare,
  Package,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";

export const heroRotatingItems = [
  "lead follow-ups",
  "customer support",
  "invoice processing",
  "HR onboarding",
  "daily reports",
  "WhatsApp workflows",
] as const;

export const costOfInactionStats = [
  {
    stat: "4.5 hrs",
    label: "Average time a business owner wastes daily on tasks AI can handle",
    accent: "text-red-400",
  },
  {
    stat: "₹18L+",
    label: "Annual cost of manual operations in a 10-person business",
    accent: "text-orange-300",
  },
  {
    stat: "67%",
    label: "Of businesses slow to adopt automation lose market share within 3 years",
    accent: "text-red-400",
  },
] as const;

const SECONDS_PER_YEAR = 365 * 24 * 3600;
const SECONDS_PER_MONTH = 30 * 24 * 3600;

/** Live loss counter — single rate derived from ₹18L annual (matches stat card). */
export const liveLossRates = {
  annualInr: 1_800_000,
  teamSizeLabel: "10-person team",
  secondsPerYear: SECONDS_PER_YEAR,
  secondsPerMonth: SECONDS_PER_MONTH,
  secondsPerHour: 3600,
  ratePerSec: 1_800_000 / SECONDS_PER_YEAR,
} as const;

export const liveLossBandCopy = {
  headline: "Your business might be {{losing more}}",
} as const;

export type AutomationScopeItem = {
  id: string;
  icon: LucideIcon;
  title: string;
  shortTitle: string;
  desc: string;
  examples: string[];
  tools: string[];
};

export const automationScopeItems: AutomationScopeItem[] = [
  {
    id: "lead-nurturing",
    icon: MessageSquare,
    title: "Lead Nurturing & Follow-ups",
    shortTitle: "Lead nurturing",
    desc: "AI reaches every lead instantly via WhatsApp, email, and SMS — with sequences that actually convert.",
    examples: [
      "Instant WhatsApp when a form is submitted",
      "Auto-qualify budget, timeline, and intent",
      "Multi-touch follow-up until they book or opt out",
    ],
    tools: ["WhatsApp Business API", "HubSpot", "Zoho CRM", "Google Sheets"],
  },
  {
    id: "ai-support",
    icon: Zap,
    title: "AI Customer Support",
    shortTitle: "AI support",
    desc: "24/7 chatbot that resolves queries, handles returns, and escalates when a human is genuinely needed.",
    examples: [
      "Answer FAQs from your knowledge base",
      "Raise tickets and route by category",
      "Handle returns and order status without wait time",
    ],
    tools: ["Intercom", "Zendesk", "Freshdesk", "Custom web chat"],
  },
  {
    id: "reports",
    icon: BarChart3,
    title: "Reports & Dashboards",
    shortTitle: "Reports",
    desc: "Auto-pulled from your tools and delivered to your inbox before your morning coffee.",
    examples: [
      "Daily sales summary to leadership WhatsApp",
      "Weekly pipeline report from CRM",
      "Live dashboard that updates without manual exports",
    ],
    tools: ["Google Sheets", "Looker", "Power BI", "Metabase"],
  },
  {
    id: "documents",
    icon: FileText,
    title: "Document & Invoice Processing",
    shortTitle: "Documents",
    desc: "AI reads, validates, and routes documents — no human touch, no delays, no errors.",
    examples: [
      "Extract line items from PDF invoices",
      "Match POs to catalog and flag mismatches",
      "Route approvals based on amount and vendor",
    ],
    tools: ["Gmail", "Drive", "Tally", "SAP / ERP APIs"],
  },
  {
    id: "hr-onboarding",
    icon: Users,
    title: "HR & Employee Onboarding",
    shortTitle: "HR onboarding",
    desc: "Offer letters, form collection, IT setup — all automated end-to-end.",
    examples: [
      "Offer letter generated and e-signed on acceptance",
      "Document collection via automated checklist",
      "IT access and welcome sequence triggered on day one",
    ],
    tools: ["BambooHR", "Google Workspace", "Slack", "Notion"],
  },
  {
    id: "messaging",
    icon: Mail,
    title: "Email & WhatsApp Workflows",
    shortTitle: "Messaging",
    desc: "Trigger-based communication flows that keep customers and teams in sync.",
    examples: [
      "Payment reminder sequences with UPI deeplinks",
      "Internal alerts when SLA is about to breach",
      "Customer updates at every order milestone",
    ],
    tools: ["WhatsApp", "SendGrid", "Twilio", "Make / n8n"],
  },
  {
    id: "compliance",
    icon: ShieldCheck,
    title: "Compliance & KYC Automation",
    shortTitle: "Compliance",
    desc: "For fintech and healthcare — automated checks, alerts, and tamper-proof audit trails.",
    examples: [
      "KYC document verification and status tracking",
      "Audit-ready logs for every automated action",
      "Alerts when compliance thresholds are crossed",
    ],
    tools: ["Core banking", "HIPAA-ready storage", "Aadhaar / PAN APIs"],
  },
  {
    id: "real-estate",
    icon: Building2,
    title: "Real Estate Inquiry Pipeline",
    shortTitle: "Real estate",
    desc: "Auto-qualify leads, schedule site visits, and follow up until they sign.",
    examples: [
      "Portal inquiry → instant WhatsApp qualification",
      "Site visit booking with calendar sync",
      "Post-visit price sheet and EMI calculator sequence",
    ],
    tools: ["MagicBricks", "99acres", "Google Calendar", "WhatsApp"],
  },
  {
    id: "inventory",
    icon: Package,
    title: "Inventory & Supply Chain",
    shortTitle: "Inventory",
    desc: "Live monitoring with AI-triggered alerts when stock, delivery, or suppliers need attention.",
    examples: [
      "Low-stock alerts before you run out",
      "Supplier delay notifications to ops and clients",
      "Reorder suggestions based on velocity",
    ],
    tools: ["ERP", "Warehouse systems", "Shopify", "Custom inventory DB"],
  },
];

export const businessAutomationSteps = [
  {
    num: "01",
    title: "Book a Free Audit Call",
    desc: "30 minutes. We ask the right questions to map every manual process eating your team's time right now.",
  },
  {
    num: "02",
    title: "Get Your Automation Blueprint",
    desc: "We identify your top 3–5 automation opportunities and show you the ROI before we build a single thing.",
  },
  {
    num: "03",
    title: "Live in 30 Days",
    desc: "Custom-built, fully tested, team trained. You go live — and we stay until it runs completely clean.",
  },
] as const;

export const businessAutomationMetrics = [
  { end: 8, suffix: "+", label: "Years Building AI Products" },
  { end: 200, suffix: "+", label: "Businesses Automated" },
  { end: 30, suffix: " Days", label: "Average Deployment" },
  { end: 60, suffix: "%", label: "Average Time Saved" },
] as const;

/** Press wordmarks shown under the founder credibility band. */
export const businessAutomationPressItems = [
  {
    publication: "Forbes",
    href: "https://www.forbes.com/",
    yearLabel: "Interview",
    isPartnerContent: false,
  },
  {
    publication: "Entrepreneur",
    href: "https://www.entrepreneur.com/",
    yearLabel: "Editorial",
    isPartnerContent: false,
  },
  {
    publication: "Times of India",
    href: "https://timesofindia.indiatimes.com/",
    yearLabel: "Editorial",
    isPartnerContent: false,
  },
  {
    publication: "Business Insider",
    href: "https://www.businessinsider.com/",
    yearLabel: "Editorial",
    isPartnerContent: false,
  },
  {
    publication: "Outlook India",
    href: "https://www.outlookindia.com/hub4business/boostmysites-acclaim-as-industry-leader",
    yearLabel: "May 2024",
    isPartnerContent: true,
  },
  {
    publication: "The Quint",
    href: "https://www.thequint.com/brandstudio/boostmysite-2000-ai-projects-milestone",
    yearLabel: "Sep 2024",
    isPartnerContent: true,
  },
] as const;

/** Thin Mahin media strip — quote, magazine cover, Forbes video (homepage content, compact band). */
export const founderMediaStripCopy = {
  eyebrow: "Founder",
  quoteLines: [
    "I've watched strong teams stall on busywork.",
    "Automation isn't a nice-to-have anymore — it's how you buy back time and margin.",
    "That's what we build at Boostmysites.",
  ],
  intro:
    "On AI-native delivery, shipping automations in 30 days, and why systems beat spreadsheets every time.",
  watchInterviewLabel: "Watch interview",
  workTogetherLabel: "Let's work together",
  forbesInterviewLabel: "Forbes interview",
  /** Brown-suit founder portrait for the circular profile. */
  portraitSrc: "/mahin-bs.jpg",
  portraitAlt: "Mahin B S — Founder & Chairman, Boostmysites",
  magazinePublication: "Entrepreneur",
  magazineFeatureLabel: "Editorial",
  magazineYear: "2021",
  magazineStoryTitle: "The Growth Builder",
  magazineCoverSrc: "/mahinbsnew.jpeg",
  magazineCoverAlt: "Mahin B S on Entrepreneur magazine — The Growth Builder",
} as const;

/** Process section bottom CTA — scrolls to #contact-form. */
export const processCtaCopy = {
  line1: "Three steps. Thirty days. Real results.",
  line2: "See your biggest automation opportunities.",
  buttonLabel: "Get My Automation Blueprint",
  trustLine: "Free audit · 30 minutes · No sales pitch",
} as const;

/** WhatsApp override for /business-automation only. */
export const businessAutomationWhatsapp = {
  number: "919790035747",
  message: "Hello BMS, I want to automate my business and avail the free audit call.",
} as const;

export const businessAutomationWhatsappHref = `https://wa.me/${businessAutomationWhatsapp.number}?text=${encodeURIComponent(businessAutomationWhatsapp.message)}`;

/** Reshab CEO audit-call band on the business automation landing. */
export const reshabAuditCallCopy = {
  headline: "Get a {{straight answer}} on what to automate first",
  subheadline:
    "In 30 minutes we map your manual bottlenecks, show ROI on your top workflows, and leave you with a plan you can act on — not a sales script.",
  ctaLabel: "Book my audit call",
} as const;

/** Static stats for the homepage-style Stats grid on the business landing. */
export const businessLandingStats = [
  { value: "8+", label: "Years Building AI Products" },
  { value: "200+", label: "Businesses Automated" },
  { value: "30 days", label: "Average Deployment" },
  { value: "60%", label: "Average Time Saved" },
] as const;
