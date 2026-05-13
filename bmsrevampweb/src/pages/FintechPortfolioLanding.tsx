import { IndustryLandingPage } from "../components/IndustryLandingPage";

export default function FintechPortfolioLanding() {
  return (
    <IndustryLandingPage
      portfolioVertical="fintech"
      eyebrow="Fintech software"
      heroTitle="We build fintech software that users trust with real money."
      heroSubtitle="We design and engineer secure fintech platforms, from payment systems and wallets to lending infrastructure and compliance tooling."
      socialProofItems={["500+ products shipped", "Trusted across 56+ cities", "24-hour response guarantee"]}
      trustIndicators={[
        "PCI-DSS Ready",
        "SOC 2 & ISO 27001 workflows",
        "35+ fintech products shipped",
        "Trusted across 56+ cities",
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
      differentiatorTitle="Built differently from traditional agencies"
      differentiatorItems={[
        "Senior-only product and engineering teams",
        "Weekly shipping cadence with sprint visibility",
        "Compliance-aware architecture from sprint one",
        "Full IP transfer and code ownership",
        "Embedded QA, observability, and release discipline",
        "24/7 operational support for critical flows",
      ]}
      scaleTitle="Built for scale from day one"
      scaleItems={[
        "Uptime-focused infrastructure and incident playbooks",
        "Observability with logs, metrics, and trace visibility",
        "RBAC and secure access boundaries across environments",
        "CI/CD pipelines with release guardrails",
        "Encrypted data handling and secrets management",
        "Disaster recovery strategy and rollback safety",
        "Audit log integrity and compliance reporting hooks",
        "Cloud-native architecture for high-throughput workloads",
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
      whyChooseTitle="Why regulated teams choose Boostmysites"
      whyChooseItems={[
        "Operators trust our sprint predictability and transparent delivery.",
        "Architecture decisions are made with compliance and scale in mind.",
        "We combine product thinking with production-grade engineering rigor.",
        "Teams stay because we ship fast without compromising reliability.",
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
          questions: ["How do you handle PCI compliance?", "How do you support audits and evidence readiness?"],
        },
        {
          category: "Delivery",
          questions: ["Do you work with startups or enterprises?", "What is your typical timeline?"],
        },
        {
          category: "Tech",
          questions: ["Can you integrate with banks and PSPs?", "Can you modernize existing fintech systems?"],
        },
        {
          category: "Pricing",
          questions: ["How do engagement models and pricing work?", "What is included in post-launch support?"],
        },
      ]}
      finalTitle="Building the next fintech category leader?"
      finalSubtitle="Work with a team that understands payments, compliance, scale, and shipping velocity."
      formHeading="Start your fintech project"
      formSubheading="Fill this form and get your proposal in 24 hours."
    />
  );
}
