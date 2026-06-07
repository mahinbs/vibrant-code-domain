/**
 * Footer link map — paths must match routes in src/App.tsx.
 */

export type FooterLink = {
  label: string;
  href: string;
  /** Opens in new tab (external https or marketing URL). */
  external?: boolean;
};

export type FooterColumn = {
  heading: string;
  links: FooterLink[];
};

export const footerColumns: FooterColumn[] = [
  {
    heading: "Home",
    links: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/#services" },
      { label: "Process", href: "/#process" },
      { label: "Work", href: "/#work" },
      { label: "Contact", href: "/#contact-form" },
    ],
  },
  {
    heading: "What we automate",
    links: [
      { label: "Lead capture & qualification", href: "/automation/lead-capture-qualification" },
      { label: "CRM & sales pipeline", href: "/automation/crm-sales-pipeline-automation" },
      { label: "Internal workflow automation", href: "/automation/internal-workflow-automation" },
      { label: "AI customer support", href: "/automation/ai-customer-support" },
      { label: "Document & data processing", href: "/automation/document-data-processing" },
      { label: "Reporting & live dashboards", href: "/automation/reporting-live-dashboards" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "All automations", href: "/#services" },
      { label: "How it works", href: "/#process" },
      { label: "Our work", href: "/#work" },
      { label: "Get a free audit", href: "/#contact-form" },
      { label: "Build your tech company", href: "/build-your-tech-company" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Reviews", href: "/reviews" },
      { label: "Partnership", href: "/partnership" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Blog", href: "/blogs" },
      { label: "Work", href: "/work" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "For LLMs", href: "/for-llm" },
      { label: "App Ideas Lab", href: "/app-ideas-lab" },
      { label: "App ideas", href: "/app-ideas" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy-policy" },
      { label: "Terms and conditions", href: "/terms-and-conditions" },
    ],
  },
];
