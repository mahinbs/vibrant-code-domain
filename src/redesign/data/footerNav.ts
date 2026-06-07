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
    heading: "Services",
    links: [
      { label: "All services", href: "/services" },
      { label: "Web applications", href: "/web-apps" },
      { label: "Mobile apps", href: "/mobile-apps" },
      { label: "SaaS development", href: "/saas" },
      { label: "UX / UI design", href: "/ux-ui-design" },
      { label: "AI development", href: "/ai-development" },
      { label: "AI automation", href: "/ai-automation" },
      { label: "AI calling", href: "/ai-calling" },
      { label: "Game development", href: "/game-development" },
      { label: "AR / VR development", href: "/ar-vr-development" },
      { label: "Blockchain development", href: "/blockchain-development" },
      { label: "IoT development", href: "/iot-development" },
      { label: "Data analytics", href: "/data-analytics" },
      { label: "Cloud computing", href: "/cloud-computing" },
      { label: "Chatbot development", href: "/chatbot-development" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "Workflow automation", href: "/ai-automation" },
      { label: "AI customer support", href: "/chatbot-development" },
      { label: "AI calling", href: "/ai-calling" },
      { label: "Data & reporting", href: "/data-analytics" },
      { label: "Healthcare software", href: "/healthcare-landing" },
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
