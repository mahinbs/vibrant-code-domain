export const site = {
  brand: "Boostmysites",
  tagline: "Custom software & AI, shipped at agency speed.",
  email: "ceo@boostmysites.com",
  phone: "+91 97900 35747",
  whatsappNumber: "919790035747",
  whatsappMessage: "Hello BMS, I am looking to develop a project.",
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
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
] as const;

export const primaryCta = {
  label: "Get free consultation",
  sublabel: "24hr reply",
  href: "#contact",
} as const;

export const whatsappHref = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.whatsappMessage)}`;
