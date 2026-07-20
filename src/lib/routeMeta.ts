import { matchPath } from "react-router-dom";

export type RouteSeo = { title: string; description: string };

const DEFAULT: RouteSeo = {
  title: "Boostmysites - AI-Powered Software Solutions",
  description:
    "Transform your business with Boostmysites: web development, mobile apps, SaaS, AI solutions, and digital products built for scale.",
};

const NOT_FOUND: RouteSeo = {
  title: "Page Not Found | Boostmysites",
  description:
    "The page you are looking for could not be found. Explore our services, work, and blog from the Boostmysites homepage.",
};

/** Exact pathname → SEO (leading slash, no trailing slash except "/"). */
const EXACT: Record<string, RouteSeo> = {
  "/": {
    title: "Boostmysites - AI-Powered Software Solutions",
    description:
      "Transform your business with Boostmysites' innovative AI-powered software solutions. Web development, mobile apps, SaaS, and digital marketing services.",
  },
  "/portfolio": {
    title: "Portfolio | Boostmysites",
    description:
      "Explore Boostmysites project portfolio: web apps, SaaS, mobile, AI automation, and more—built for startups and enterprises.",
  },
  "/work": {
    title: "Work & Case Studies | Boostmysites",
    description:
      "Selected client work and case studies from Boostmysites: product engineering, AI, fintech, healthtech, and growth-focused delivery.",
  },
  "/contact": {
    title: "Contact Us | Boostmysites",
    description:
      "Book a free automation audit with Boostmysites. Tell us about your business — we respond within 24 hours.",
  },
  "/about": {
    title: "About Us | Boostmysites",
    description:
      "Learn about Boostmysites—mission, expertise, and how we help teams ship web, mobile, and AI products with clarity and velocity.",
  },
  "/blogs": {
    title: "Blog | Boostmysites",
    description:
      "Insights on web development, AI, mobile, SaaS, and engineering from the Boostmysites team—practical guides for builders and founders.",
  },
  "/services": {
    title: "Services | Boostmysites",
    description:
      "End-to-end software services from Boostmysites: strategy, design, engineering, DevOps, and ongoing support for digital products.",
  },
  "/web-apps": {
    title: "Web Application Development | Boostmysites",
    description:
      "Custom web applications with modern stacks—fast, secure, and scalable. Boostmysites builds dashboards, platforms, and customer-facing web products.",
  },
  "/mobile-apps": {
    title: "Mobile App Development | Boostmysites",
    description:
      "iOS and Android apps with polished UX and solid architecture. Boostmysites ships consumer and B2B mobile products end-to-end.",
  },
  "/ux-ui-design": {
    title: "UX/UI Design | Boostmysites",
    description:
      "Product design that converts: UX research, UI systems, and prototypes. Boostmysites aligns design with engineering for faster launches.",
  },
  "/saas": {
    title: "SaaS Development | Boostmysites",
    description:
      "Build and scale multi-tenant SaaS: billing, onboarding, analytics, and secure backends. Boostmysites helps SaaS teams ship with confidence.",
  },
  "/ai-development": {
    title: "AI Development | Boostmysites",
    description:
      "Applied AI for your product: LLM features, agents, retrieval, and integrations. Boostmysites delivers production-ready AI with clear ROI.",
  },
  "/game-development": {
    title: "Game Development | Boostmysites",
    description:
      "Game and interactive experiences—prototyping through launch. Boostmysites supports gameplay systems, live ops, and cross-platform delivery.",
  },
  "/ar-vr-development": {
    title: "AR/VR Development | Boostmysites",
    description:
      "Immersive AR and VR applications for training, retail, and brand experiences. Boostmysites builds performant 3D and spatial products.",
  },
  "/blockchain-development": {
    title: "Blockchain Development | Boostmysites",
    description:
      "Web3 and blockchain solutions where they make sense—wallets, smart contracts, and integrations. Boostmysites focuses on security and usability.",
  },
  "/iot-development": {
    title: "IoT Development | Boostmysites",
    description:
      "Connected devices, firmware-adjacent software, and cloud pipelines. Boostmysites builds reliable IoT products from edge to dashboard.",
  },
  "/data-analytics": {
    title: "Data & Analytics | Boostmysites",
    description:
      "Dashboards, pipelines, and analytics products. Boostmysites turns raw data into decisions with modern warehousing and visualization.",
  },
  "/cloud-computing": {
    title: "Cloud Computing | Boostmysites",
    description:
      "Cloud architecture, migrations, and cost-aware scaling on AWS and similar platforms. Boostmysites hardens infra for growth-stage products.",
  },
  "/chatbot-development": {
    title: "Chatbot Development | Boostmysites",
    description:
      "Customer and internal chatbots with guardrails and integrations. Boostmysites builds conversational experiences that reduce load on teams.",
  },
  "/ai-automation": {
    title: "AI Automation | Boostmysites",
    description:
      "Automate workflows with AI: document processing, routing, and ops copilots. Boostmysites ships automation that teams actually adopt.",
  },
  "/business-automation": {
    title: "AI Automation for Businesses | Boostmysites",
    description:
      "Automate lead follow-ups, customer support, invoicing, and ops workflows. Free 30-minute AI audit — most clients live in 30 days.",
  },
  "/automation-score": {
    title: "Free Automation Score | Boostmysites",
    description:
      "Get your automation score in 60 seconds. A personalized report on the hours and money your business loses to manual work — and what to automate first.",
  },
  "/automation-score/report": {
    title: "Your Automation Report | Boostmysites",
    description:
      "Your personalized automation score report — hours lost, monthly cost, and what to automate first.",
  },
  "/automation-case-studies": {
    title: "Automation Case Studies | Boostmysites",
    description:
      "Watch real AI automation case studies — healthcare, manufacturing, dairy, sales, and more. Long-form walkthroughs, event highlights, and 60-second proof.",
  },
  "/personal-automation": {
    title: "Personal Workflow Automation | Boostmysites",
    description:
      "Automate your personal workflow — inbox, calendar, notes, finances and follow-ups — and get hours back every week.",
  },
  "/reviews": {
    title: "Client Reviews | Boostmysites",
    description:
      "What clients say about working with Boostmysites—delivery, communication, and outcomes across web, mobile, and AI engagements.",
  },
  "/thank-you": {
    title: "Thank You | Boostmysites",
    description:
      "Your request was received. Our team will review it and get back to you within 24 hours.",
  },
  "/privacy-policy": {
    title: "Privacy Policy | Boostmysites",
    description:
      "Boostmysites privacy policy: how we collect, use, and protect your information when you use our website and services.",
  },
  "/terms-and-conditions": {
    title: "Terms & Conditions | Boostmysites",
    description:
      "Terms and conditions for using Boostmysites websites and services. Please read before engaging with our offerings.",
  },
  "/index.php/aie-termsconditions": {
    title: "Terms & Conditions | Boostmysites",
    description:
      "Terms and conditions for Boostmysites AI engagement offerings and related services.",
  },
  "/placement-programs": {
    title: "Job Placement Programs | Boostmysites",
    description:
      "Become job-ready in 7 months with industry-focused tech training, real-world projects, one-on-one mentorship, and dedicated placement assistance.",
  },
  "/ai-freelancing": {
    title: "AI Freelancing | Boostmysites",
    description:
      "Opportunities and programs for AI-skilled freelancers collaborating with Boostmysites on real client and product work.",
  },
  "/ai-freelancing/thank-you": {
    title: "Thank You | AI Freelancing | Boostmysites",
    description:
      "Your AI freelancing submission was received. Boostmysites will follow up with next steps if there is a fit.",
  },
  "/ai-calling": {
    title: "AI Calling Solutions | Boostmysites",
    description:
      "AI voice agents and calling workflows for sales and support. Boostmysites implements low-latency voice stacks integrated with your CRM.",
  },
  "/app-ideas-lab": {
    title: "App Ideas Lab | Boostmysites",
    description:
      "Explore and validate app ideas with Boostmysites—concept to scope for founders who want clarity before building.",
  },
  "/app-ideas": {
    title: "App Ideas | Boostmysites",
    description:
      "Browse app ideas and product concepts curated by Boostmysites—inspiration for your next mobile or web venture.",
  },
  "/ai-stock-prediction": {
    title: "AI Stock Prediction | Boostmysites",
    description:
      "AI-driven market intelligence and prediction experiences—explore how Boostmysites applies ML to financial and data products.",
  },
  "/fintech-founder": {
    title: "Fintech Founder | Boostmysites",
    description:
      "Fintech product and engineering support for founders: compliance-aware builds, payments, and scalable backends from Boostmysites.",
  },
  "/fintech-landing": {
    title: "Fintech Portfolio & Services | Boostmysites",
    description:
      "Fintech case studies and capabilities from Boostmysites: payments, lending, risk, and modern banking-grade web platforms.",
  },
  "/healthcare-landing": {
    title: "Healthcare Digital Products | Boostmysites",
    description:
      "Healthcare software and design from Boostmysites: patient portals, telehealth, HIPAA-minded architecture, and clinician-first UX.",
  },
  "/new-homepage-preview": {
    title: "Homepage Preview | Boostmysites",
    description:
      "Internal preview of the next Boostmysites homepage experience—design and content may change before public release.",
  },
  "/for-llm": {
    title: "For LLMs & AI Systems | Boostmysites",
    description:
      "Machine-readable facts for AI systems: BoostMySites legal identity, leadership, services, boundaries, milestones, and official contact emails.",
  },
  "/admin/login": {
    title: "Admin Login | Boostmysites",
    description: "Sign in to the Boostmysites admin console.",
  },
  "/admin": {
    title: "Admin Dashboard | Boostmysites",
    description: "Boostmysites admin dashboard—manage content and leads.",
  },
  "/admin/customer-inquiries": {
    title: "Customer Inquiries | Admin | Boostmysites",
    description: "Review and manage customer inquiries in the Boostmysites admin.",
  },
  "/admin/trial-leads": {
    title: "Trial Leads | Admin | Boostmysites",
    description: "Manage trial leads in the Boostmysites admin.",
  },
  "/admin/placement-applications": {
    title: "Placement Applications | Admin | Boostmysites",
    description: "View and manage placement program applications in the Boostmysites admin.",
  },
  "/admin/portfolio": {
    title: "Portfolio | Admin | Boostmysites",
    description: "Manage portfolio entries in the Boostmysites admin.",
  },
  "/admin/portfolio/new": {
    title: "New Portfolio | Admin | Boostmysites",
    description: "Create a new portfolio item in the Boostmysites admin.",
  },
  "/admin/case-studies": {
    title: "Case Studies | Admin | Boostmysites",
    description: "Manage case studies in the Boostmysites admin.",
  },
  "/admin/blogs": {
    title: "Blogs | Admin | Boostmysites",
    description: "Manage blog posts in the Boostmysites admin.",
  },
  "/admin/blogs/new": {
    title: "New Blog Post | Admin | Boostmysites",
    description: "Create a new blog post in the Boostmysites admin.",
  },
  "/admin/webinar-management": {
    title: "Webinars | Admin | Boostmysites",
    description: "Manage webinars in the Boostmysites admin.",
  },
  "/admin/reshab-leads": {
    title: "Reshab Leads | Admin | Boostmysites",
    description: "View high-intent redesign lead submissions and scores.",
  },
};

const PATTERNS: Array<{ pattern: string; seo: RouteSeo }> = [
  {
    pattern: "/admin/portfolio/edit/:id",
    seo: {
      title: "Edit Portfolio | Admin | Boostmysites",
      description: "Edit a portfolio item in the Boostmysites admin.",
    },
  },
  {
    pattern: "/admin/blogs/edit/:id",
    seo: {
      title: "Edit Blog Post | Admin | Boostmysites",
      description: "Edit a blog post in the Boostmysites admin.",
    },
  },
  {
    pattern: "/blog/:slug",
    seo: {
      title: "Blog Article | Boostmysites",
      description:
        "Read this article on the Boostmysites blog—insights on software, AI, product, and engineering.",
    },
  },
  {
    pattern: "/case-study/:slug",
    seo: {
      title: "Case Study | Boostmysites",
      description:
        "Detailed case study from Boostmysites: problem, solution, stack, and outcomes for a real client project.",
    },
  },
  {
    pattern: "/work/:slug",
    seo: {
      title: "Case Study | Boostmysites Work",
      description:
        "Explore this Boostmysites work case study—challenge, approach, tech stack, and measurable results.",
    },
  },
  {
    pattern: "/app-ideas/product/:id",
    seo: {
      title: "App Idea | Boostmysites",
      description:
        "Productized app idea details from Boostmysites App Ideas—scope, positioning, and build considerations.",
    },
  },
  {
    pattern: "/salesperson/:id",
    seo: {
      title: "Services | Boostmysites",
      description:
        "Explore Boostmysites services through your dedicated link—web, mobile, AI, and product delivery.",
    },
  },
  {
    pattern: "/webinar/:id",
    seo: {
      title: "Webinar | Boostmysites",
      description:
        "Join or learn about this Boostmysites webinar—topics on product, AI, and modern software delivery.",
    },
  },
  {
    pattern: "/:salesperson/:service",
    seo: {
      title: "Services | Boostmysites",
      description:
        "Boostmysites service overview tailored to your referral—engineering, AI, and product capabilities.",
    },
  },
];

function normalizePathname(pathname: string): string {
  if (!pathname) return "/";
  const withSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (withSlash.length > 1 && withSlash.endsWith("/")) {
    return withSlash.replace(/\/+$/, "") || "/";
  }
  return withSlash;
}

export function getRouteMeta(pathname: string): RouteSeo {
  const path = normalizePathname(pathname);
  const exact = EXACT[path];
  if (exact) return exact;

  for (const { pattern, seo } of PATTERNS) {
    if (matchPath({ path: pattern, end: true }, path)) {
      return seo;
    }
  }

  return NOT_FOUND;
}

export { DEFAULT as defaultRouteSeo, NOT_FOUND as notFoundRouteSeo };
