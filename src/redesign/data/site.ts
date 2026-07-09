export const site = {
  brand: "Boostmysites",
  tagline: "Automation that runs your business while you run your business.",
  email: "ceo@boostmysites.com",
  phone: "+91 97900 35747",
  whatsappNumber: "919632953355",
  whatsappMessage: "Hello BMS, I'd like a free automation audit.",
  socials: {
    instagram: "https://www.instagram.com/boostmysites/",
    twitter: "https://x.com/boostmysites",
    youtube: "https://www.youtube.com/@boostmysites",
    linkedin: "https://www.linkedin.com/company/boostmysites/",
  },
  portfolioUrl: "https://www.boostmysites.com/portfolio",
  appIdeasUrl: "https://www.boostmysites.com/app-ideas",
} as const;

export const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Work", href: "/#work" },
  { label: "Contact", href: "/#contact-form" },
] as const;

/** In-page anchors for `/business-automation` landing. */
export const businessAutomationNavLinks = [
  { label: "Process", href: "#process" },
  { label: "Case studies", href: "/automation-case-studies" },
  { label: "Industries", href: "#industry-playbook" },
  { label: "Audit", href: "#contact-form" },
] as const;

export const primaryCta = {
  label: "Know more",
  sublabel: "24hr reply",
  href: "/business-automation",
} as const;

export const businessAutomationCta = {
  label: "Get my free automation audit",
  href: "#contact-form",
} as const;

export const whatsappHref = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.whatsappMessage)}`;
