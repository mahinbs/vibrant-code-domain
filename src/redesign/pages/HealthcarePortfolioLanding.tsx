import { IndustryLandingPage } from "../components/IndustryLandingPage";

export default function HealthcarePortfolioLanding() {
  return (
    <IndustryLandingPage
      portfolioVertical="healthcare"
      eyebrow="Healthcare software"
      heroTitle="Healthcare software built for patients, providers, and compliance."
      heroSubtitle="We design and develop HIPAA-ready healthcare platforms, telemedicine products, and interoperable health systems."
      socialProofItems={["500+ products shipped", "Trusted across 56+ cities", "24-hour response guarantee"]}
      trustIndicators={[
        "HIPAA-ready workflows",
        "HL7 & FHIR integrations",
        "25+ healthcare products shipped",
        "24/7 support coverage",
      ]}
      trustedByHeading="Trusted by healthcare innovators and care teams."
      trustedBySubheading="From digital health startups to provider operations, teams choose us for secure and reliable execution."
      trustedByGroups={["Healthcare startups", "Clinics", "Hospitals", "Wellness brands"]}
      capabilityTitle="Healthcare Solutions"
      capabilityCards={[
        {
          title: "Telemedicine Platforms",
          body: "Video consultations, messaging, prescriptions, and appointment systems.",
        },
        {
          title: "EHR / EMR Integrations",
          body: "FHIR APIs, HL7 interoperability, and medical record synchronization.",
        },
        {
          title: "Remote Patient Monitoring",
          body: "Wearables, health tracking, alerts, and real-time monitoring.",
        },
        {
          title: "Patient Portals",
          body: "Scheduling, reports, billing, and communication systems.",
        },
        {
          title: "AI in Healthcare",
          body: "Voice agents, intake automation, document extraction, and clinical workflows.",
        },
      ]}
      buildItems={[
        { title: "Telehealth Apps", description: "Consultations, scheduling, and communication in one secure flow." },
        { title: "Clinic Systems", description: "Operational software for front desk, care teams, and coordination." },
        { title: "Hospital Dashboards", description: "Real-time visibility into clinical and operational metrics." },
        { title: "Mental Health Platforms", description: "Patient-facing experiences with privacy and continuity in mind." },
        { title: "ePrescription Products", description: "Digital prescription and approval workflows with guardrails." },
        { title: "Patient Engagement", description: "Reminders, portals, communication, and follow-up automation." },
        { title: "AI Medical Assistants", description: "Intake, triage support, and documentation acceleration layers." },
        { title: "Healthcare SaaS", description: "Multi-tenant healthcare products with compliance-first architecture." },
      ]}
      operatingModelPillars={[
        {
          title: "Sprint visibility",
          body: "Weekly demos and transparent execution—clinical and product stakeholders stay aligned as you ship.",
        },
        {
          title: "HIPAA-aware architecture",
          body: "PHI boundaries, audit trails, and secure workflows from day one—not bolt-on compliance after launch.",
        },
        {
          title: "Senior engineering teams",
          body: "Senior-heavy product and engineering with full IP transfer—no junior-heavy outsourcing pipeline.",
        },
        {
          title: "Production discipline",
          body: "Observability, QA, CI/CD guardrails, rollback planning, and operational readiness for always-on care systems.",
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
          title: "AI Receptionist for Clinics",
          category: "Care Operations",
          impact: "Booked 4,200+ appointments automatically while reducing front-desk overload.",
          stack: ["React", "Node.js", "Twilio"],
          businessResult: "Clinics improved response time and reduced missed booking opportunities.",
          slug: "ai-voice-clinic",
          image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
          gradient:
            "radial-gradient(120% 100% at 100% 0%, rgba(96,142,255,0.34), rgba(0,0,0,0.85) 70%)",
        },
        {
          title: "Remote Monitoring App",
          category: "Patient Monitoring",
          impact: "Improved patient adherence by 38% with proactive monitoring and alerts.",
          stack: ["TypeScript", "FHIR APIs", "PostgreSQL"],
          businessResult: "Care teams gained better visibility into risk patterns and intervention timing.",
          image: "https://images.unsplash.com/photo-1581595219315-a187dd40c322?auto=format&fit=crop&w=1200&q=80",
          gradient:
            "radial-gradient(120% 100% at 0% 100%, rgba(72,118,255,0.52), rgba(0,0,0,0.85) 70%)",
        },
        {
          title: "Telehealth Platform",
          category: "Telemedicine",
          impact: "Scaled to 100k+ monthly consultations with stable experience for providers and patients.",
          stack: ["Next.js", "WebRTC", "AWS"],
          businessResult: "Provider network expanded while maintaining performance and reliability.",
          image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80",
          gradient:
            "radial-gradient(120% 100% at 50% 0%, rgba(14,26,52,0.88), rgba(0,0,0,0.9) 70%)",
        },
      ]}
      processTitle="From idea to production in four stages."
      processSteps={[
        {
          title: "Discover",
          body: "We map care workflows, compliance constraints, and product priorities.",
        },
        {
          title: "Design",
          body: "UX and system design align patient safety, usability, and interoperability.",
        },
        {
          title: "Build",
          body: "Weekly demos, sprint reviews, QA, and observability are standard in delivery.",
        },
        {
          title: "Launch & Scale",
          body: "Production rollout, documentation, and post-launch support for care operations.",
        },
      ]}
      faqGroups={[
        {
          category: "Compliance",
          items: [
            {
              question: "Do you sign BAAs?",
              answer:
                "Yes, when the engagement involves access to PHI we execute BAAs with covered entities and business associates as required, with clear data-flow diagrams and subprocessors documented up front.",
            },
            {
              question: "How do you secure patient data?",
              answer:
                "Encryption in transit and at rest, scoped service accounts, break-glass procedures, audit logging, and least-privilege IAM are baseline. We align retention and de-identification to your policy—not ours in isolation.",
            },
          ],
        },
        {
          category: "Delivery",
          items: [
            {
              question: "Do you support telemedicine workflows?",
              answer:
                "Scheduling, intake, video visits, asynchronous messaging, and payer-aware eligibility hooks—implemented with reliability and privacy UX that clinicians will actually adopt.",
            },
            {
              question: "What is a typical launch timeline?",
              answer:
                "Pilot-ready telehealth flows can land in weeks; enterprise-grade programs with integrations and validation cycles stretch longer. You always get weekly demos and explicit scope cut lines.",
            },
          ],
        },
        {
          category: "Tech",
          items: [
            {
              question: "Can you integrate with existing EMRs?",
              answer:
                "We integrate through vendor APIs, SMART on FHIR where available, and pragmatic HL7 bridges when legacy systems are part of the reality—always with monitoring around sync health.",
            },
            {
              question: "Do you support HL7 and FHIR workflows?",
              answer:
                "Yes—resource modeling, subscriptions, bulk export patterns, and operational monitoring so clinical data keeps moving without silent drift or duplicate-of-truth issues.",
            },
          ],
        },
        {
          category: "Pricing",
          items: [
            {
              question: "How do your engagement models work?",
              answer:
                "Dedicated product-engineering squads on monthly retainers are the default; fixed phases exist when discovery has already locked scope. Billing maps to how your clinical and IT stakeholders make decisions.",
            },
            {
              question: "What is included after launch?",
              answer:
                "Incident response paths, observability tuning, backlog grooming for the next release train, and optional on-call coverage—so go-live is not the moment engineering disappears.",
            },
          ],
        },
      ]}
      finalTitle="Building the future of digital healthcare?"
      finalSubtitle="We help healthcare teams launch secure, compliant products without slowing innovation."
    />
  );
}
