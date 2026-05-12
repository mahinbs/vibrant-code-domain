import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { WorkShell } from "@/components/work/primitives/WorkShell";
import { WorkHeroFrame } from "@/components/work/primitives/WorkHeroFrame";
import ProjectContactForm from "@/components/forms/ProjectContactForm";

const scrollToForm = () => {
  document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const fintechCapabilities = [
  {
    title: "Payment Infrastructure",
    body: "PSP integrations, payment gateways, split settlements, wallets, and reconciliation systems.",
  },
  {
    title: "Lending Platforms",
    body: "Loan origination systems, underwriting dashboards, and repayment engines.",
  },
  {
    title: "Wealth & Investing",
    body: "Portfolio dashboards, trading interfaces, and robo-advisory experiences.",
  },
  {
    title: "Compliance & Risk",
    body: "KYC, AML, fraud detection, audit trails, and RBI-ready workflows.",
  },
  {
    title: "Banking Infrastructure",
    body: "Neo-bank experiences, virtual accounts, card systems, and treasury dashboards.",
  },
];

const buildItems = [
  "Neo-banking apps",
  "Payment gateways",
  "Wallet systems",
  "Expense management tools",
  "Lending platforms",
  "Insurance tech products",
  "Investment dashboards",
  "Merchant settlement systems",
];

const caseStudies = [
  { title: "Realtime Ledger System", result: "Reduced reconciliation time by 87%." },
  { title: "Lending Dashboard", result: "Scaled to 1M+ loan evaluations per month." },
  { title: "Wallet Infrastructure", result: "Processed ₹120Cr+ in annual transaction volume." },
];

const faqs = [
  "How do you handle PCI compliance?",
  "Can you integrate with banks and PSPs?",
  "Do you work with startups or enterprises?",
  "What is your typical timeline?",
  "Can you modernize existing fintech systems?",
];

const FintechLanding = () => {
  return (
    <WorkShell documentTitle="Fintech Software Development | Boostmysites">
      <Helmet>
        <title>Fintech Software Development | Boostmysites</title>
        <meta
          name="description"
          content="Financial infrastructure engineered for scale, security, and compliance. Talk to our fintech product team."
        />
      </Helmet>

      <div className="w-full max-w-6xl space-y-6 px-4 py-6 md:px-6 md:py-10">
        <WorkHeroFrame>
          <div className="space-y-5">
            <p className="inline-flex w-fit items-center rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wide text-cyan-100">
              Fintech product engineering
            </p>
            <h1 className="max-w-4xl text-3xl font-semibold leading-tight text-white md:text-5xl">
              Financial infrastructure engineered for scale, security, and compliance.
            </h1>
            <p className="max-w-3xl text-base text-slate-200 md:text-lg">
              From payments and lending to wallets and compliance systems, we help fintech teams ship faster without
              compromising trust.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={scrollToForm} className="btn-gloss">
              Book free consultation
            </Button>
            <Button
              variant="outline"
              onClick={scrollToForm}
              className="border-white/20 bg-black/20 text-white hover:bg-white/10"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Talk on WhatsApp
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm text-slate-100 md:grid-cols-4">
            {["PCI-DSS Ready", "SOC 2 & ISO 27001 workflows", "35+ fintech products shipped", "Trusted across 56+ cities"].map(
              (item) => (
                <div key={item} className="glass-card-soft rounded-xl px-3 py-2">
                  {item}
                </div>
              ),
            )}
          </div>
        </WorkHeroFrame>

        <section className="glass-card space-y-4 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-white">Trusted By</h2>
          <p className="text-slate-200">
            Trusted by fintech founders, operators, and regulated teams globally.
          </p>
          <div className="grid grid-cols-2 gap-3 text-center text-sm text-slate-300 md:grid-cols-5">
            {["Fintech startups", "Banks", "NBFCs", "Payment companies", "Growth-stage teams"].map((item) => (
              <div key={item} className="rounded-xl border border-white/10 bg-black/25 px-3 py-3">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Fintech Capabilities</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {fintechCapabilities.map((item) => (
              <article key={item.title} className="glass-card-soft rounded-2xl p-5">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-slate-200">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">What We Build</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {buildItems.map((item) => (
              <div key={item} className="glass-card-soft rounded-xl px-4 py-3 text-sm text-slate-100">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="glass-card rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-white">Tech Stack</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-cyan-200">Frontend</h3>
              <p className="mt-1 text-slate-200">React, Next.js, TypeScript</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-cyan-200">Backend</h3>
              <p className="mt-1 text-slate-200">Node.js, Python, Go</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-cyan-200">Infra</h3>
              <p className="mt-1 text-slate-200">AWS, GCP, Kubernetes, Kafka</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-cyan-200">Integrations</h3>
              <p className="mt-1 text-slate-200">Stripe, Plaid, Razorpay, Visa APIs, Open Banking APIs</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Our Works</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {caseStudies.map((item) => (
              <article key={item.title} className="glass-card-soft rounded-2xl p-5">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-slate-200">{item.result}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="glass-card rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-white">Why Fintech Teams Choose You</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {[
              "Fast Delivery: Weekly demos and transparent sprints.",
              "Compliance-First: Architecture designed for audits and security reviews.",
              "Scale Ready: Built for high throughput and uptime.",
              "Product Thinking: UX, growth, and operational workflows included.",
            ].map((item) => (
              <p key={item} className="rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-slate-100">
                {item}
              </p>
            ))}
          </div>
        </section>

        <section className="space-y-3 rounded-2xl border border-white/15 bg-black/30 p-6">
          <h2 className="text-2xl font-semibold text-white">Process</h2>
          <p className="text-slate-200">Discover → Architecture → Build → Compliance Review → Launch</p>
          <p className="text-sm text-slate-300">
            Code ownership, documentation, and deployment pipelines included.
          </p>
        </section>

        <section className="glass-card rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-white">FAQ</h2>
          <Accordion type="single" collapsible className="mt-4 space-y-3">
            {faqs.map((question, index) => (
              <AccordionItem
                key={question}
                value={`fintech-faq-${index}`}
                className="rounded-xl border border-white/10 bg-black/30 px-4"
              >
                <AccordionTrigger className="text-left text-slate-100">{question}</AccordionTrigger>
                <AccordionContent className="text-slate-300">
                  We map your current requirements, propose the quickest compliant architecture, and align delivery to
                  your business timeline.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="glass-card rounded-2xl p-6 text-center">
          <h2 className="text-3xl font-semibold text-white md:text-4xl">Building the next fintech category leader?</h2>
          <p className="mx-auto mt-3 max-w-3xl text-slate-200">
            Talk to a team that understands compliance, scale, and shipping velocity.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Button onClick={scrollToForm} className="btn-gloss">
              Get proposal in 24 hours
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={scrollToForm} className="border-white/20 bg-black/20 text-white">
              Schedule consultation
            </Button>
          </div>
        </section>

        <ProjectContactForm
          formHeading="Start your fintech project"
          formSubheading="Fill this form and get your proposal in 24 hours."
        />
      </div>
    </WorkShell>
  );
};

export default FintechLanding;
