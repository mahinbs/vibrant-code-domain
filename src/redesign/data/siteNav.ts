import type { NavCta, NavLinkItem } from "../components/Nav";
import { site } from "./site";

/**
 * The site-wide menu for boostmysites.com pages built on the redesign shell.
 * Every service, industry and tool page sits at most two clicks from home.
 */
export const SITE_NAV_LINKS: ReadonlyArray<NavLinkItem> = [
  {
    label: "Services",
    dropdown: [
      { label: "All services", href: "/services" },
      { label: "AI ad campaigns", href: "/services/ai-ad-campaigns" },
      { label: "WhatsApp automation", href: "/services/whatsapp-automation" },
      { label: "AI calling agent", href: "/services/ai-calling" },
      { label: "LinkedIn outreach", href: "/services/linkedin-outreach" },
      { label: "Email marketing", href: "/services/email-marketing" },
      { label: "Leads and CRM", href: "/services/leads-crm" },
      { label: "AI calling — live demo", href: "/voice-demo" },
    ],
  },
  {
    label: "Industries",
    dropdown: [
      { label: "All industries", href: "/industries" },
      { label: "Real estate", href: "/industries/real-estate" },
      { label: "Clinics and healthcare", href: "/industries/clinics" },
      { label: "Education and coaching", href: "/industries/education" },
      { label: "Interior designers", href: "/industries/interior-designers" },
      { label: "CA and finance firms", href: "/industries/ca-finance" },
      { label: "E-commerce", href: "/industries/ecommerce" },
      { label: "IT and SaaS", href: "/industries/it-saas" },
      { label: "Agencies", href: "/industries/agencies" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  { label: "Free tools", href: "/tools" },
  { label: "Log in", href: site.productUrl, external: true },
];

export const SITE_NAV_CTA: NavCta = { label: "Get my acquisition plan", href: "/#contact-form" };
