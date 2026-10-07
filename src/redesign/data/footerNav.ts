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
    heading: "Services",
    links: [
      { label: "All services", href: "/services" },
      { label: "AI ad campaigns", href: "/services/ai-ad-campaigns" },
      { label: "WhatsApp automation", href: "/services/whatsapp-automation" },
      { label: "AI calling", href: "/services/ai-calling" },
      { label: "LinkedIn outreach", href: "/services/linkedin-outreach" },
      { label: "Email marketing", href: "/services/email-marketing" },
      { label: "Leads and CRM", href: "/services/leads-crm" },
      { label: "AI calling — live demo", href: "/voice-demo" },
    ],
  },
  {
    heading: "Industries",
    links: [
      { label: "Real estate", href: "/industries/real-estate" },
      { label: "Clinics", href: "/industries/clinics" },
      { label: "Education", href: "/industries/education" },
      { label: "Interior designers", href: "/industries/interior-designers" },
      { label: "CA and finance", href: "/industries/ca-finance" },
      { label: "E-commerce", href: "/industries/ecommerce" },
      { label: "IT and SaaS", href: "/industries/it-saas" },
      { label: "Agencies", href: "/industries/agencies" },
    ],
  },
  {
    heading: "Locations",
    links: [
      { label: "Dubai", href: "/locations/dubai" },
      { label: "United Kingdom", href: "/locations/uk" },
      { label: "United States", href: "/locations/usa" },
      { label: "Singapore", href: "/locations/singapore" },
      { label: "Bengaluru", href: "/locations/bengaluru" },
      { label: "Mumbai", href: "/locations/mumbai" },
      { label: "Delhi NCR", href: "/locations/delhi-ncr" },
      { label: "Hyderabad", href: "/locations/hyderabad" },
    ],
  },
  {
    heading: "Free tools",
    links: [
      { label: "All free tools", href: "/tools" },
      { label: "Ad budget calculator", href: "/tools/ad-budget-calculator" },
      { label: "Lead response calculator", href: "/tools/lead-response-calculator" },
      { label: "WhatsApp link generator", href: "/tools/whatsapp-link-generator" },
      { label: "Ad copy generator", href: "/tools/ad-copy-generator" },
    ],
  },
  {
    heading: "Proof",
    links: [
      { label: "Case studies", href: "/case-studies" },
      { label: "vs an agency", href: "/compare/vs-agency" },
      { label: "vs HubSpot", href: "/compare/vs-hubspot" },
      { label: "vs doing it yourself", href: "/compare/vs-diy" },
      { label: "Blog", href: "/blogs" },
      { label: "Portfolio", href: "/portfolio" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Pricing", href: "/pricing" },
      { label: "About us", href: "/about" },
      { label: "Security", href: "/security" },
      { label: "Partner programme", href: "/partners" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
      { label: "Software development", href: "/services#software" },
      { label: "The app: boostmysites.in", href: "https://www.boostmysites.in/", external: true },
      { label: "How the app works", href: "https://www.boostmysites.in/how-it-works", external: true },
      { label: "Log in", href: "https://www.boostmysites.in/app", external: true },
    ],
  },
];
