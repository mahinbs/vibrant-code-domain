import { IndustryLandingPage, type AfterContactVerticalShowcase, type CaseStudy } from "../components/IndustryLandingPage";

/** Always drives the flagship “Featured infrastructure” block + video on this page, independent of other `portfolios` rows. */
const FINTECH_FLAGSHIP_TRADINGSMART: CaseStudy = {
  title: "TradingSmart AI",
  category: "Fintech",
  impact:
    "Shipped an AI-assisted automated trading stack with broker-scale execution, real-time risk signals, and operator-grade observability.",
  businessResult:
    "TradingSmart.AI is a production trading platform for strategy automation, execution orchestration, and portfolio analytics—built for teams that need reliability when markets move fast.",
  slug: "trading-smart-ai",
  stack: [
    "Artificial Intelligence",
    "Algorithmic Trading",
    "Automation Systems",
    "Cloud Infrastructure",
    "Real-Time Analytics",
    "Broker API Integrations",
  ],
  image:
    "https://images.unsplash.com/photo-1611974789855-9c2a0a475e90?auto=format&fit=crop&w=1200&q=80",
  gradient:
    "radial-gradient(120% 100% at 50% 20%, rgba(34,197,94,0.35), rgba(8,16,40,0.92) 55%, rgba(0,0,0,0.9) 100%)",
};

/** Finnly band directly under the contact form — vertical 9:16 video left, narrative right. */
const FINNLY_AFTER_CONTACT: AfterContactVerticalShowcase = {
  eyebrow: "Product spotlight",
  title: "Finnly — multicurrency wallet & exchange",
  description:
    "A consumer-grade crypto wallet and exchange surface we shipped end-to-end: onboarding, BTC/USDT send and exchange flows, NFT and Earn tabs, and a debit-card path for fiat — all in one dark, motion-led product system built for clarity under real money.",
  bullets: [
    "Exchange, send, and wallet flows with preset amounts, QR, and address guardrails",
    "Multi-asset navigation — wallet, NFT, browser, swap, and earn — without losing context",
    "Visual system tuned for trust: depth, grid texture, and high-contrast CTAs on small screens",
  ],
  videoSrc: "/videos/finnly-vertical.mov",
  videoPoster: "/portfolios/finnly/onboarding.webp",
  /** Shown if video is unavailable (e.g. blocked format). */
  fallbackImageSrc: "/portfolios/finnly/screens.webp",
  caseStudySlug: "finnly",
  buildSimilarLabel: "Build Similar",
};

export default function FintechPortfolioLanding() {
  return (
    <IndustryLandingPage
      portfolioVertical="fintech"
      featuredFlagshipCaseStudy={FINTECH_FLAGSHIP_TRADINGSMART}
      eyebrow="Fintech software"
      heroTitle="We build fintech software that users trust with real money."
      heroSubtitle="We design and engineer secure fintech platforms, from payment systems and wallets to lending infrastructure and compliance tooling."
      socialProofItems={["500+ products shipped", "Trusted across 56+ cities", "24-hour response guarantee"]}
      trustIndicators={[
        "PCI-DSS Ready",
        "SOC 2 & ISO 27001 workflows",
        "35+ fintech products shipped",
        "Realtime payments & ledger expertise",
      ]}
      trustedByHeading="Trusted by startups, operators, and regulated teams."
      trustedBySubheading="From early-stage fintech products to regulated finance operations, teams choose us when reliability and speed both matter."
      trustedByGroups={["Fintech startups", "Banks", "NBFCs", "Payment companies", "Growth teams"]}
      capabilityTitle="Fintech Capabilities"
      capabilityCards={[
        {
          title: "Payment Infrastructure",
          body: "Wallets, PSP integrations, settlement engines, and transaction orchestration built for scale.",
        },
        {
          title: "Lending Systems",
          body: "Loan origination, underwriting workflows, repayment systems, and borrower dashboards.",
        },
        {
          title: "Wealth & Investing",
          body: "Portfolio dashboards, trading interfaces, wealth reporting, and advisory product surfaces.",
        },
        {
          title: "Compliance & Risk",
          body: "KYC, AML, audit logs, fraud monitoring, and secure identity verification flows.",
        },
        {
          title: "Banking Experiences",
          body: "Neo-banking apps, treasury dashboards, virtual accounts, and card management systems.",
        },
      ]}
      buildItems={[
        {
          title: "Digital Wallets",
          description: "Multi-currency wallets with transfers, settlements, and transaction tracking.",
        },
        {
          title: "Payment Gateways",
          description: "High-throughput transaction capture, routing, retries, and reconciliation layers.",
        },
        {
          title: "Lending Platforms",
          description: "Underwriting workflows, loan lifecycle automation, and repayment operations.",
        },
        {
          title: "Merchant Settlement",
          description: "Settlement engines with ledger visibility and payout reliability.",
        },
        {
          title: "Expense Platforms",
          description: "Cards, policy controls, reimbursements, and finance workflow tooling.",
        },
        {
          title: "Insurance Tech Products",
          description: "Distribution, claims experience, and partner-facing policy systems.",
        },
        {
          title: "Investment Dashboards",
          description: "Portfolio performance, compliance signals, and reporting for operators.",
        },
        {
          title: "Neo-Banking Experiences",
          description: "Customer apps, back-office operations, and account management surfaces.",
        },
      ]}
      operatingModelPillars={[
        {
          title: "Sprint visibility",
          body: "Weekly demos, transparent backlog, and execution you can track—shipping cadence you can plan around.",
        },
        {
          title: "Compliance-first architecture",
          body: "Security, auditability, and regulatory fit from sprint one—PCI, SOC, and ISO-aware patterns when you need them.",
        },
        {
          title: "Senior engineering teams",
          body: "Senior-heavy product and engineering with full IP transfer and code ownership—no junior-heavy outsourcing pipeline.",
        },
        {
          title: "Production discipline",
          body: "Embedded QA, observability, CI/CD guardrails, rollback planning, and 24/7 support on the flows that cannot fail.",
        },
      ]}
      scaleTitle="Built for scale from day one"
      scaleArchitecture={[
        {
          label: "Uptime & incidents",
          detail: "Uptime-focused infrastructure and incident playbooks",
        },
        {
          label: "Observability",
          detail: "Observability with logs, metrics, and trace visibility",
        },
        {
          label: "RBAC & access",
          detail: "RBAC and secure access boundaries across environments",
        },
        {
          label: "CI/CD guardrails",
          detail: "CI/CD pipelines with release guardrails",
        },
        {
          label: "Encryption & secrets",
          detail: "Encrypted data handling and secrets management",
        },
        {
          label: "Disaster recovery",
          detail: "Disaster recovery strategy and rollback safety",
        },
        {
          label: "Audit & compliance hooks",
          detail: "Audit log integrity and compliance reporting hooks",
        },
        {
          label: "Cloud-native scale",
          detail: "Cloud-native architecture for high-throughput workloads",
        },
      ]}
      caseStudies={[
        {
          title: "Realtime Ledger Platform",
          category: "Fintech Infrastructure",
          impact: "Reduced reconciliation time from hours to minutes across 1.2M+ monthly transactions.",
          stack: ["Next.js", "Kafka", "PostgreSQL"],
          businessResult: "Finance ops cut manual effort, improved settlement confidence, and cleared month-end faster.",
          slug: "fintech-ledger",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
          gradient:
            "radial-gradient(120% 100% at 0% 0%, rgba(72,118,255,0.48), rgba(0,0,0,0.85) 70%)",
        },
        {
          title: "Lending Decision Engine",
          category: "Lending Systems",
          impact: "Scaled to 1M+ loan evaluations per month with predictable decision latency.",
          stack: ["Node.js", "Python", "Redis"],
          businessResult: "Credit team increased throughput while maintaining underwriting policy controls.",
          image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
          gradient:
            "radial-gradient(120% 100% at 100% 0%, rgba(96,142,255,0.34), rgba(0,0,0,0.85) 70%)",
        },
        {
          title: "Wallet Infrastructure Suite",
          category: "Payments",
          impact: "Processed ₹120Cr+ annual transaction volume with reliable settlement visibility.",
          stack: ["TypeScript", "Go", "Kafka"],
          businessResult: "Operations gained real-time payout confidence and fewer reconciliation escalations.",
          image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
          gradient:
            "radial-gradient(120% 100% at 100% 100%, rgba(84,130,255,0.28), rgba(0,0,0,0.9) 70%)",
        },
      ]}
      processTitle="From idea to production in four stages."
      processSteps={[
        {
          title: "Discover",
          body: "We map product goals, compliance boundaries, and business constraints.",
        },
        {
          title: "Design",
          body: "Flows, architecture, and backlog are aligned with risk and delivery needs.",
        },
        {
          title: "Build",
          body: "Weekly demos, sprint reviews, QA, and observability built into execution.",
        },
        {
          title: "Launch & Scale",
          body: "Deployment ownership, documentation handover, and post-launch support.",
        },
      ]}
      faqGroups={[
        {
          category: "Compliance",
          items: [
            {
              question: "How do you handle PCI compliance?",
              answer:
                "We map cardholder-data flows early, enforce least-privilege access, tokenization-friendly patterns, and evidence-oriented logging. Implementation stays collaborative with your processors, acquirers, and counsel so controls line up with how you actually settle funds.",
            },
            {
              question: "How do you support audits and evidence readiness?",
              answer:
                "We document architecture decisions, access models, and change history in forms auditors can follow—traceable releases, retention-aware logs, and clear ownership for who can touch sensitive configuration.",
            },
          ],
        },
        {
          category: "Delivery",
          items: [
            {
              question: "Do you work with startups or enterprises?",
              answer:
                "Both. Engagements flex from lean product teams proving traction to enterprise programs that need stakeholder alignment, stricter change control, and multi-region operations.",
            },
            {
              question: "What is your typical timeline?",
              answer:
                "Scope drives the plan: a focused MVP may ship in weeks, while regulated platforms span quarters. You get weekly demos, transparent backlog hygiene, and explicit cut lines so dates map to risk, not optimism.",
            },
          ],
        },
        {
          category: "Tech",
          items: [
            {
              question: "Can you integrate with banks and PSPs?",
              answer:
                "Yes—REST and message-driven integrations, idempotent settlement flows, reconciliation hooks, and sandbox-to-prod promotion patterns are part of our default toolkit.",
            },
            {
              question: "Can you modernize existing fintech systems?",
              answer:
                "We strangle legacy carefully: parallel run paths, feature flags, data backfills, and observability so you can migrate traffic without freezing the business.",
            },
          ],
        },
        {
          category: "Pricing",
          items: [
            {
              question: "How do engagement models and pricing work?",
              answer:
                "Most teams choose a dedicated squad with a monthly retainer tied to outcomes and velocity. Fixed phases are available when scope is already bounded—we align billing to how decisions get made on your side.",
            },
            {
              question: "What is included in post-launch support?",
              answer:
                "Severity-based response, incident playbooks, on-call coverage options, and roadmap continuity for fixes, tuning, and the next wave of features—so launches are not the end of engineering ownership.",
            },
          ],
        },
      ]}
      finalTitle="Building the next fintech category leader?"
      finalSubtitle="Work with a team that understands payments, compliance, scale, and shipping velocity."
      featuredInfrastructureVideo="/videos/featured-fintech-live-execution.m4v"
      featuredInfrastructureVideoFallback="/videos/featured-fintech-live-execution.mov"
      afterContactVerticalShowcase={FINNLY_AFTER_CONTACT}
    />
  );
}
