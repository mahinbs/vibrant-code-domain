import type { ServiceId } from "@/components/work/primitives/serviceMeta";
import { supabase } from "@/integrations/supabase/client";

export type Metric = {
  value: string;
  label: string;
  description?: string;
};

export type FeatureItem = {
  title: string;
  description: string;
};

export type ApproachStep = {
  number: string;
  title: string;
  description: string;
};

export type TechStackGroup = {
  category: string;
  technologies: string[];
};

export type WorkProject = {
  id: string;
  slug: string;
  serviceId: ServiceId;
  title: string;
  client: string;
  industry: string;
  outcome: string;
  description: string;
  heroImage: string;
  cardImage: string;
  /** CSS gradient used as the card cover overlay if no image renders. */
  fallbackGradient: string;
  stack: string[];
  timeline: string;
  team: string;
  year: string;
  liveUrl?: string;
  topMetrics: Metric[];
  challenge: string;
  challengeBullets: string[];
  approach: ApproachStep[];
  features: FeatureItem[];
  techStack: TechStackGroup[];
  gallery: string[];
  detailedMetrics: Metric[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
    company: string;
    avatar?: string;
  };
};

const projects: WorkProject[] = [
  {
    id: "fintech-ledger",
    slug: "fintech-ledger",
    serviceId: "web",
    title: "Realtime ledger for a neo-bank",
    client: "Stride Bank",
    industry: "Fintech",
    outcome: "Cut transaction reconciliation time by 87%",
    description:
      "Built a streaming ledger and operations console that reconciles millions of transactions per day across multiple rails, with sub-second visibility for finance ops.",
    heroImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    cardImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    fallbackGradient:
      "radial-gradient(120% 100% at 0% 0%, rgba(72,118,255,0.48), rgba(0,0,0,0.85) 70%)",
    stack: ["Next.js", "Postgres", "Kafka", "TypeScript"],
    timeline: "14 weeks",
    team: "5 engineers",
    year: "2025",
    liveUrl: "https://example.com",
    topMetrics: [
      { value: "87%", label: "Faster reconciliation" },
      { value: "12k+", label: "Daily ops users" },
      { value: "99.95%", label: "Pipeline uptime" },
      { value: "$0", label: "Lost transactions" },
    ],
    challenge:
      "Stride was reconciling transactions overnight in Excel, which meant a 16-hour blind spot for ops and a daily fire-fighting routine when records did not line up.",
    challengeBullets: [
      "Five payment rails feeding into one general ledger",
      "Audit trails were stitched together by hand",
      "Scaling from 50k to 5M transactions per day with no rewrite budget",
    ],
    approach: [
      {
        number: "01",
        title: "Map every flow",
        description:
          "Two-week embed with finance and engineering to model rails, edge cases, and SLAs before writing code.",
      },
      {
        number: "02",
        title: "Streaming spine",
        description:
          "Kafka + a typed event schema replaced the nightly batch with a continuous, replayable pipeline.",
      },
      {
        number: "03",
        title: "Ops console",
        description:
          "A typed Next.js console for exceptions, manual matches, and approvals, owned by finance.",
      },
      {
        number: "04",
        title: "Battle test",
        description:
          "Two weeks of shadow runs against the legacy stack before a hard cutover, zero rollback.",
      },
    ],
    features: [
      { title: "Streaming ledger", description: "Sub-second updates across every rail." },
      { title: "Auto-matching", description: "Rule + ML matchers covering 96% of records." },
      { title: "Exception queue", description: "Finance handles only what truly needs a human." },
      { title: "Audit-ready", description: "Every change carries a signed, replayable trail." },
      { title: "Role-based access", description: "Granular controls for ops, finance, and audit." },
      { title: "Observability", description: "Built-in dashboards and alerting on every stream." },
    ],
    techStack: [
      { category: "Frontend", technologies: ["Next.js", "TypeScript", "Tailwind", "tRPC"] },
      { category: "Backend", technologies: ["Node.js", "Postgres", "Kafka", "Redis"] },
      { category: "Infra", technologies: ["AWS", "Terraform", "Datadog"] },
      { category: "Quality", technologies: ["Playwright", "Vitest", "OpenTelemetry"] },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=1400&q=80",
    ],
    detailedMetrics: [
      {
        value: "87%",
        label: "Reconciliation speed-up",
        description: "From overnight batch to continuous matching, freeing 6 ops FTEs.",
      },
      {
        value: "5M+",
        label: "Daily transactions",
        description: "Sustained throughput with zero dropped events in the first 12 months.",
      },
      {
        value: "99.95%",
        label: "Pipeline uptime",
        description: "Measured at the consumer side over a rolling 90-day window.",
      },
      {
        value: "0",
        label: "Manual exports",
        description: "Finance no longer reaches for spreadsheets to close the day.",
      },
    ],
    testimonial: {
      quote:
        "We went from chasing yesterday's numbers to running the bank in real time. The team didn't just ship software; they reshaped how finance and engineering work together.",
      author: "Priya Menon",
      role: "VP, Finance Operations",
      company: "Stride Bank",
    },
  },
  {
    id: "ai-voice-clinic",
    slug: "ai-voice-clinic",
    serviceId: "ai-calling",
    title: "AI voice receptionist for clinics",
    client: "ClearCare Health",
    industry: "Healthtech",
    outcome: "Booked 4,200+ appointments without human reps",
    description:
      "A multilingual voice AI receptionist that answers calls 24/7, books appointments, and triages urgency before a human ever picks up.",
    heroImage:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80",
    cardImage:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
    fallbackGradient:
      "radial-gradient(120% 100% at 100% 0%, rgba(96,142,255,0.34), rgba(0,0,0,0.85) 70%)",
    stack: ["OpenAI", "Twilio", "Python", "FastAPI"],
    timeline: "8 weeks",
    team: "4 engineers",
    year: "2025",
    topMetrics: [
      { value: "4,200+", label: "Appointments booked" },
      { value: "92%", label: "Calls fully resolved" },
      { value: "12s", label: "Avg. response time" },
      { value: "3", label: "Languages supported" },
    ],
    challenge:
      "Front desks were missing 1 in 3 calls and patients were leaving for competitors. Hiring more receptionists was not financially viable across 40+ clinics.",
    challengeBullets: [
      "Inbound call volume spiking after-hours",
      "EMR integration was the elephant in the room",
      "Strict HIPAA-grade handling of patient context",
    ],
    approach: [
      {
        number: "01",
        title: "Listen in",
        description:
          "Two weeks of call recordings across clinics surfaced the top 12 intents we needed to nail.",
      },
      {
        number: "02",
        title: "Voice loop",
        description:
          "Low-latency speech pipeline with interruption handling so it actually feels human.",
      },
      {
        number: "03",
        title: "EMR + booking",
        description:
          "Direct EMR integration with safe write paths and a human-handoff escape hatch.",
      },
      {
        number: "04",
        title: "Clinic rollout",
        description:
          "Pilot at three clinics, weekly tuning, then a managed rollout across the network.",
      },
    ],
    features: [
      { title: "24/7 coverage", description: "Never miss a call, even at peak hours." },
      { title: "Smart triage", description: "Routes urgent cases to a human in seconds." },
      { title: "Multilingual", description: "English, Spanish, and Hindi out of the box." },
      { title: "EMR booking", description: "Writes directly into your existing system." },
      { title: "Call analytics", description: "Sentiment + outcome tagging on every call." },
      { title: "HIPAA-ready", description: "Encrypted transit and storage with audit logs." },
    ],
    techStack: [
      { category: "Voice", technologies: ["OpenAI Realtime", "Twilio", "Deepgram"] },
      { category: "Backend", technologies: ["Python", "FastAPI", "Postgres"] },
      { category: "Infra", technologies: ["AWS", "Terraform", "CloudWatch"] },
      { category: "Integration", technologies: ["FHIR", "HL7", "Webhooks"] },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1581595219315-a187dd40c322?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=1400&q=80",
    ],
    detailedMetrics: [
      {
        value: "4,200+",
        label: "Appointments booked",
        description: "Across the first six months without expanding the front-desk team.",
      },
      {
        value: "92%",
        label: "Calls fully handled",
        description: "Only 8% needed a human escalation, mostly billing edge cases.",
      },
      {
        value: "+38%",
        label: "Patient retention",
        description: "Measured against the prior cohort that hit voicemail after-hours.",
      },
      {
        value: "12s",
        label: "Avg. time to answer",
        description: "Down from a 4-minute peak hold time on busy mornings.",
      },
    ],
    testimonial: {
      quote:
        "Patients tell us our front desk got way friendlier. They have no idea it's AI. That's exactly what we wanted.",
      author: "Dr. Aaron Patel",
      role: "Network Director",
      company: "ClearCare Health",
    },
  },
  {
    id: "saas-ops",
    slug: "saas-ops-dashboard",
    serviceId: "saas",
    title: "Multi-tenant ops dashboard",
    client: "Helmsman",
    industry: "B2B SaaS",
    outcome: "Onboarded 60+ tenants in the first quarter",
    description:
      "A multi-tenant operations dashboard for a logistics SaaS — billing, role-based access, analytics, and tenant-aware admin in one stack.",
    heroImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    cardImage:
      "https://images.unsplash.com/photo-1554200876-56c2f25224fa?auto=format&fit=crop&w=1200&q=80",
    fallbackGradient:
      "radial-gradient(120% 100% at 50% 100%, rgba(22,36,74,0.72), rgba(0,0,0,0.9) 70%)",
    stack: ["React", "Stripe", "AWS", "Postgres"],
    timeline: "12 weeks",
    team: "4 engineers",
    year: "2025",
    topMetrics: [
      { value: "60+", label: "Tenants live" },
      { value: "$420k", label: "ARR in 90 days" },
      { value: "4.6/5", label: "Operator NPS" },
      { value: "99.9%", label: "Uptime" },
    ],
    challenge:
      "Helmsman had product-market fit but everything was glued together with spreadsheets and Stripe. Onboarding a tenant took an engineer half a day.",
    challengeBullets: [
      "No tenant isolation in the existing schema",
      "Manual billing and provisioning",
      "Reporting was a different tool per customer",
    ],
    approach: [
      {
        number: "01",
        title: "Tenancy model",
        description:
          "Designed a row-level tenancy model that worked with the existing Postgres without a rewrite.",
      },
      {
        number: "02",
        title: "Self-serve onboarding",
        description:
          "Stripe Checkout + automated provisioning brought tenant setup down to under 2 minutes.",
      },
      {
        number: "03",
        title: "Operator console",
        description:
          "A console for the Helmsman team with feature flags, impersonation, and usage drill-downs.",
      },
      {
        number: "04",
        title: "Analytics pack",
        description:
          "Per-tenant dashboards built on the same warehouse so the operator and customer see the same numbers.",
      },
    ],
    features: [
      { title: "Self-serve onboarding", description: "From sign-up to live tenant in 2 minutes." },
      { title: "Stripe billing", description: "Subscriptions, metered usage, dunning built-in." },
      { title: "RBAC", description: "Granular roles per tenant with audit logs." },
      { title: "Per-tenant analytics", description: "Same warehouse, scoped views." },
      { title: "Public APIs", description: "Versioned, typed, documented from day one." },
      { title: "Operator console", description: "Impersonation, flags, usage drill-downs." },
    ],
    techStack: [
      { category: "Frontend", technologies: ["React", "TypeScript", "Tailwind", "Recharts"] },
      { category: "Backend", technologies: ["Node.js", "Postgres", "Redis", "Stripe"] },
      { category: "Infra", technologies: ["AWS", "Terraform", "CloudFront"] },
      { category: "Data", technologies: ["dbt", "BigQuery", "Metabase"] },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1400&q=80",
    ],
    detailedMetrics: [
      { value: "60+", label: "Tenants in 90 days", description: "From 4 hand-onboarded customers." },
      { value: "$420k", label: "ARR added", description: "Almost entirely self-serve." },
      { value: "2 min", label: "Onboarding time", description: "From a half-day engineering task." },
      { value: "0", label: "Manual provisioning", description: "Everything runs through the console." },
    ],
    testimonial: {
      quote:
        "We went from a service business pretending to be SaaS to actually running like one. The platform finally feels like a product.",
      author: "Marc Lévesque",
      role: "Co-founder & CEO",
      company: "Helmsman",
    },
  },
  {
    id: "mobile-fitness",
    slug: "ai-fitness-coach",
    serviceId: "mobile",
    title: "AI fitness coach (iOS / Android)",
    client: "Pulse",
    industry: "Consumer mobile",
    outcome: "92% week-1 retention in beta cohort",
    description:
      "A cross-platform AI coach app that builds personalized programs, adapts to weekly progress, and delivers real-time form feedback from your phone camera.",
    heroImage:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=80",
    cardImage:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80",
    fallbackGradient:
      "radial-gradient(120% 100% at 0% 100%, rgba(72,118,255,0.52), rgba(0,0,0,0.85) 70%)",
    stack: ["React Native", "Firebase", "ML Kit", "TypeScript"],
    timeline: "10 weeks",
    team: "3 engineers + designer",
    year: "2025",
    topMetrics: [
      { value: "92%", label: "Week-1 retention" },
      { value: "4.8★", label: "App Store rating" },
      { value: "180+", label: "Workouts library" },
      { value: "3.2k", label: "Beta users" },
    ],
    challenge:
      "Existing fitness apps felt like static PDFs. Pulse needed an experience that felt like a coach who actually paid attention.",
    challengeBullets: [
      "Personalization without a giant content team",
      "On-device form feedback at 60fps",
      "Cross-platform from week one",
    ],
    approach: [
      {
        number: "01",
        title: "Coach voice",
        description:
          "Worked with a real S&C coach to define the system prompt, weekly check-ins, and tone.",
      },
      {
        number: "02",
        title: "Adaptive plans",
        description:
          "Programs regenerate every Sunday from the prior week's effort and adherence data.",
      },
      {
        number: "03",
        title: "On-device feedback",
        description:
          "ML Kit pose estimation runs locally so users get real-time form cues without a cloud round-trip.",
      },
      {
        number: "04",
        title: "Beta to launch",
        description:
          "8-week TestFlight + Play Store internal track with weekly cohort reviews before the public launch.",
      },
    ],
    features: [
      { title: "Adaptive plans", description: "Resets weekly based on your progress." },
      { title: "Real-time form", description: "On-device pose estimation, no lag." },
      { title: "Voice coach", description: "Cues that feel coached, not scripted." },
      { title: "Habit streaks", description: "Light gamification that does not get annoying." },
      { title: "Wearable sync", description: "Apple Health and Google Fit on day one." },
      { title: "Offline mode", description: "Full workouts without a signal." },
    ],
    techStack: [
      { category: "App", technologies: ["React Native", "TypeScript", "Reanimated"] },
      { category: "Backend", technologies: ["Firebase", "Cloud Functions", "Firestore"] },
      { category: "AI", technologies: ["ML Kit", "OpenAI", "Custom prompts"] },
      { category: "Quality", technologies: ["Detox", "Sentry", "TestFlight"] },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1400&q=80",
    ],
    detailedMetrics: [
      { value: "92%", label: "Week-1 retention", description: "Beta cohort, n = 3,200." },
      { value: "4.8★", label: "App Store rating", description: "Across 1,400+ reviews at launch." },
      { value: "21 min", label: "Median session", description: "Right in the sweet spot for habit." },
      { value: "+27%", label: "Plan completion", description: "Vs. the static PDF baseline." },
    ],
    testimonial: {
      quote:
        "Our beta users said it felt like the app was actually paying attention to them. That is the whole product, and the team nailed it.",
      author: "Lena Garcia",
      role: "Founder",
      company: "Pulse",
    },
  },
  {
    id: "ai-automation-logistics",
    slug: "ai-document-automation",
    serviceId: "ai-automation",
    title: "Document AI for logistics ops",
    client: "Northbound Freight",
    industry: "Logistics",
    outcome: "Automated 12,000+ docs/month at 99.4% accuracy",
    description:
      "An end-to-end document automation pipeline that parses bills of lading, customs forms, and invoices, then writes structured data straight into the TMS.",
    heroImage:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80",
    cardImage:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    fallbackGradient:
      "radial-gradient(120% 100% at 100% 100%, rgba(84,130,255,0.28), rgba(0,0,0,0.9) 70%)",
    stack: ["LangChain", "Python", "AWS", "Postgres"],
    timeline: "9 weeks",
    team: "3 engineers",
    year: "2024",
    topMetrics: [
      { value: "12k+", label: "Docs / month" },
      { value: "99.4%", label: "Field accuracy" },
      { value: "8x", label: "Faster than ops" },
      { value: "$0", label: "Re-keyed entries" },
    ],
    challenge:
      "Operators were re-keying every shipment by hand into the TMS. Nights and weekends were a backlog of paperwork, and the error rate was creeping up.",
    challengeBullets: [
      "Forms came in 17 different layouts across carriers",
      "OCR was 'good enough' but not for billing-grade data",
      "TMS integration required extreme care on writes",
    ],
    approach: [
      {
        number: "01",
        title: "Form taxonomy",
        description:
          "Catalogued every form type, then built a labeled set of 4,000 documents to evaluate against.",
      },
      {
        number: "02",
        title: "LLM + classifier",
        description:
          "Two-stage pipeline: a fast classifier routes the doc, then a focused LLM extracts the schema.",
      },
      {
        number: "03",
        title: "Human-in-the-loop",
        description:
          "Confidence-based queue so ops review only the ~3% the model is uncertain about.",
      },
      {
        number: "04",
        title: "TMS write path",
        description:
          "Idempotent, auditable writes with a one-click rollback if anything looks off downstream.",
      },
    ],
    features: [
      { title: "Form-aware extraction", description: "Schema per form type, not a generic blob." },
      { title: "Confidence routing", description: "Auto-pass, review, or reject — never silent." },
      { title: "Audit trail", description: "Every field has a source and a timestamp." },
      { title: "TMS integration", description: "Idempotent writes with rollback." },
      { title: "Retraining loop", description: "Reviewer fixes feed back into the model weekly." },
      { title: "Ops dashboard", description: "Throughput, SLA, and accuracy at a glance." },
    ],
    techStack: [
      { category: "AI", technologies: ["LangChain", "OpenAI", "Custom classifier"] },
      { category: "Backend", technologies: ["Python", "FastAPI", "Postgres"] },
      { category: "Infra", technologies: ["AWS Lambda", "S3", "EventBridge"] },
      { category: "Integration", technologies: ["TMS API", "Webhooks", "SFTP"] },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1586528116493-7f3e8a8c0a8c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1400&q=80",
    ],
    detailedMetrics: [
      { value: "99.4%", label: "Field accuracy", description: "Across the top 12 form types." },
      { value: "8x", label: "Faster than manual", description: "From 4 minutes to 30 seconds per doc." },
      { value: "12k+", label: "Docs per month", description: "Auto-processed with no overtime." },
      { value: "$310k", label: "Annual savings", description: "Reallocated from data entry to growth." },
    ],
    testimonial: {
      quote:
        "Our ops team used to dread Mondays. Now the queue is empty by 9am. The pipeline just works, and when it doesn't, we know why.",
      author: "Tom Erikson",
      role: "Head of Operations",
      company: "Northbound Freight",
    },
  },
  {
    id: "design-marketplace",
    slug: "creator-marketplace-design",
    serviceId: "design",
    title: "Two-sided creator marketplace",
    client: "Loom Studio",
    industry: "Marketplace",
    outcome: "$2.1M GMV in the first 5 months",
    description:
      "Brand, product, and design system for a two-sided marketplace connecting independent creators with high-intent buyers.",
    heroImage:
      "https://images.unsplash.com/photo-1561070791-2526d30994b8?auto=format&fit=crop&w=1600&q=80",
    cardImage:
      "https://images.unsplash.com/photo-1561070791-2526d30994b8?auto=format&fit=crop&w=1200&q=80",
    fallbackGradient:
      "radial-gradient(120% 100% at 50% 0%, rgba(14,26,52,0.88), rgba(0,0,0,0.9) 70%)",
    stack: ["Figma", "Framer", "Design system", "Webflow"],
    timeline: "6 weeks",
    team: "2 designers + PM",
    year: "2025",
    topMetrics: [
      { value: "$2.1M", label: "GMV in 5 months" },
      { value: "+38%", label: "Sign-up conversion" },
      { value: "9.1/10", label: "Usability score" },
      { value: "60+", label: "Design system tokens" },
    ],
    challenge:
      "Loom had two strong audiences but the product looked like two different startups. We had six weeks to give them a single, premium identity.",
    challengeBullets: [
      "Buyers and creators needed very different flows",
      "Brand had to feel premium without intimidating creators",
      "Engineering ran in parallel — no spec drift allowed",
    ],
    approach: [
      {
        number: "01",
        title: "Discovery",
        description:
          "10 buyer + 10 creator interviews and a content audit before we touched a pixel.",
      },
      {
        number: "02",
        title: "System first",
        description:
          "Tokens, components, and motion principles in one Figma library before any screen design.",
      },
      {
        number: "03",
        title: "Hi-fi flows",
        description:
          "End-to-end flows for both sides, prototyped in Framer for fast usability tests.",
      },
      {
        number: "04",
        title: "Engineering handoff",
        description:
          "Synced tokens with the codebase so engineering could ship without redrawing components.",
      },
    ],
    features: [
      { title: "Design system", description: "60+ tokens, every component documented." },
      { title: "Two-sided flows", description: "Distinct journeys for buyer and creator." },
      { title: "Premium feel", description: "Type, motion, and detail tuned for trust." },
      { title: "Accessibility", description: "WCAG AA across the entire surface." },
      { title: "Motion principles", description: "Codified so the team scales without losing it." },
      { title: "Brand kit", description: "Marketing assets aligned to the product system." },
    ],
    techStack: [
      { category: "Design", technologies: ["Figma", "Framer", "FigJam"] },
      { category: "Tokens", technologies: ["Style Dictionary", "CSS variables"] },
      { category: "Research", technologies: ["Maze", "Notion", "Loom"] },
      { category: "Handoff", technologies: ["Storybook", "Chromatic"] },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1559028006-44d08a9d27a6?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1400&q=80",
    ],
    detailedMetrics: [
      { value: "+38%", label: "Sign-up conversion", description: "Versus the unbranded MVP baseline." },
      { value: "$2.1M", label: "GMV in 5 months", description: "Powered by a clean two-sided flow." },
      { value: "9.1/10", label: "Usability score", description: "Cross-side, n = 84 participants." },
      { value: "0", label: "Spec disputes", description: "Tokens lived in code from day one." },
    ],
    testimonial: {
      quote:
        "The system they delivered is the only reason we could ship at the pace we did. Two months in and engineers are still building net-new flows without us.",
      author: "Iyana Cole",
      role: "Head of Product",
      company: "Loom Studio",
    },
  },
];

export const workMock = {
  projects,
};

export function getAllProjects(): WorkProject[] {
  return projects;
}

export function getProjectBySlug(slug: string): WorkProject | undefined {
  return projects.find((p) => p.slug === slug || p.id === slug);
}

export function getProjectsByService(serviceId: string): WorkProject[] {
  return projects.filter((p) => p.serviceId === serviceId);
}

export function getRelatedProjects(slug: string, limit = 3): WorkProject[] {
  const current = getProjectBySlug(slug);
  if (!current) return [];
  const sameService = projects.filter(
    (p) => p.serviceId === current.serviceId && p.slug !== current.slug,
  );
  const others = projects.filter(
    (p) => p.serviceId !== current.serviceId && p.slug !== current.slug,
  );
  return [...sameService, ...others].slice(0, limit);
}

function toSlug(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeServiceId(value: unknown): ServiceId {
  const raw = typeof value === "string" ? value.toLowerCase() : "";
  if (raw === "web" || raw === "saas" || raw === "mobile" || raw === "ai-calling" || raw === "ai-automation" || raw === "design") {
    return raw;
  }
  if (raw.includes("saas")) return "saas";
  if (raw.includes("mobile")) return "mobile";
  if (raw.includes("call")) return "ai-calling";
  if (raw.includes("automation")) return "ai-automation";
  if (raw.includes("design")) return "design";
  return "web";
}

function asArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    return value.split(",").map((item) => item.trim()).filter(Boolean);
  }
  return [];
}

function mapRowToWorkProject(row: Record<string, unknown>, index: number): WorkProject {
  const title = typeof row.title === "string" ? row.title : `Project ${index + 1}`;
  const slugFromDb = typeof row.slug === "string" ? row.slug : "";
  const slug = slugFromDb || toSlug(title);
  const technologies = asArray(row.technologies);
  const detailedMetricsFromDb = Array.isArray(row.detailed_metrics) ? row.detailed_metrics : [];
  const detailedMetrics: Metric[] =
    detailedMetricsFromDb.length > 0
      ? detailedMetricsFromDb
          .map((entry) => {
            if (!entry || typeof entry !== "object") return null;
            const metric = entry as Record<string, unknown>;
            const label = typeof metric.label === "string" ? metric.label : "";
            const value = typeof metric.value === "string" ? metric.value : "";
            const description = typeof metric.description === "string" ? metric.description : undefined;
            if (!label || !value) return null;
            return { label, value, description };
          })
          .filter((item): item is Metric => item !== null)
      : [];

  const fallbackGradient =
    "radial-gradient(120% 100% at 0% 0%, rgba(72,118,255,0.48), rgba(0,0,0,0.85) 70%)";
  const image =
    typeof row.image === "string" && row.image.length > 0
      ? row.image
      : `https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80`;
  const gallery = asArray(row.gallery);
  const challenge = typeof row.challenge === "string" && row.challenge.length > 0 ? row.challenge : "Project challenge details coming soon.";
  const solution = typeof row.solution === "string" && row.solution.length > 0 ? row.solution : "Solution details coming soon.";
  const description =
    typeof row.description === "string" && row.description.length > 0
      ? row.description
      : "Case study details are being prepared.";
  const outcome =
    typeof row.outcome === "string" && row.outcome.length > 0
      ? row.outcome
      : typeof row.impact === "string" && row.impact.length > 0
        ? row.impact
        : "Delivered measurable business impact.";

  const topMetrics = detailedMetrics.slice(0, 4);
  const testimonialDb = row.extended_testimonial;
  const testimonial =
    testimonialDb && typeof testimonialDb === "object"
      ? (testimonialDb as Record<string, unknown>)
      : {};

  return {
    id: String(row.id ?? slug),
    slug,
    serviceId: normalizeServiceId(row.service_id),
    title,
    client: typeof row.client === "string" && row.client.length > 0 ? row.client : "Confidential Client",
    industry: typeof row.industry === "string" && row.industry.length > 0 ? row.industry : "Digital Product",
    outcome,
    description,
    heroImage: image,
    cardImage: image,
    fallbackGradient,
    stack: technologies.length > 0 ? technologies : ["Web", "Product", "Engineering"],
    timeline: typeof row.timeline === "string" ? row.timeline : "8-12 weeks",
    team: typeof row.team === "string" ? row.team : "Senior product + engineering team",
    year: typeof row.created_at === "string" ? new Date(row.created_at).getFullYear().toString() : "2026",
    liveUrl: typeof row.link === "string" ? row.link : undefined,
    topMetrics:
      topMetrics.length > 0
        ? topMetrics
        : [
            { value: "Live", label: "Shipped" },
            { value: "Scale", label: "Production-ready" },
            { value: "Secure", label: "Best practices" },
            { value: "Fast", label: "Delivery velocity" },
          ],
    challenge,
    challengeBullets: [challenge],
    approach: [
      { number: "01", title: "Discover", description: "Goals, constraints, and scope alignment." },
      { number: "02", title: "Design", description: "Product and architecture decisions validated early." },
      { number: "03", title: "Build", description: solution },
      { number: "04", title: "Scale", description: "Observability, quality, and handover." },
    ],
    features: technologies.slice(0, 6).map((tech) => ({ title: tech, description: `${tech} used in delivery.` })),
    techStack: [{ category: "Technologies", technologies: technologies.length > 0 ? technologies : ["TypeScript"] }],
    gallery: gallery.length > 0 ? gallery : [image],
    detailedMetrics:
      detailedMetrics.length > 0
        ? detailedMetrics
        : [{ value: outcome, label: "Business result", description: "Project impact snapshot." }],
    testimonial: {
      quote:
        typeof testimonial.quote === "string" && testimonial.quote.length > 0
          ? testimonial.quote
          : "Strong delivery partnership with measurable outcomes.",
      author: typeof testimonial.author === "string" && testimonial.author.length > 0 ? testimonial.author : "Client team",
      role: typeof testimonial.position === "string" && testimonial.position.length > 0 ? testimonial.position : "Leadership",
      company: typeof testimonial.company === "string" && testimonial.company.length > 0 ? testimonial.company : "Boostmysites partner",
    },
  };
}

export async function getAllProjectsFromBackend(): Promise<WorkProject[]> {
  try {
    const { data, error } = await supabase.from("portfolios").select("*").order("created_at", { ascending: false });
    if (error || !data) return [];
    return (data as Record<string, unknown>[]).map(mapRowToWorkProject);
  } catch {
    return [];
  }
}
