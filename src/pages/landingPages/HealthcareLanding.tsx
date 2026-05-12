import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { WorkShell } from "@/components/work/primitives/WorkShell";
import { WorkHeroFrame } from "@/components/work/primitives/WorkHeroFrame";
import SimpleContactForm from "@/components/forms/SimpleContactForm";

const scrollToForm = () => {
  document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const healthcareSolutions = [
  {
    title: "Telemedicine Platforms",
    body: "Video consultations, secure messaging, prescriptions, and appointment systems.",
  },
  {
    title: "EHR / EMR Integrations",
    body: "FHIR APIs, HL7 interoperability, and medical record synchronization.",
  },
  {
    title: "Remote Patient Monitoring",
    body: "Wearables integration, health tracking, alerts, and realtime monitoring.",
  },
  {
    title: "Patient Portals",
    body: "Scheduling, reports, billing, and communication systems for patients and staff.",
  },
  {
    title: "AI in Healthcare",
    body: "Voice agents, intake automation, document extraction, and clinical workflows.",
  },
];

const buildItems = [
  "Telehealth apps",
  "Clinic management systems",
  "Hospital dashboards",
  "Mental health platforms",
  "ePrescription systems",
  "Patient engagement apps",
  "AI medical assistants",
  "Healthcare SaaS products",
];

const caseStudies = [
  { title: "AI Receptionist for Clinics", result: "Booked 4,200+ appointments automatically." },
  { title: "Remote Monitoring App", result: "Improved patient adherence by 38%." },
  { title: "Telehealth Platform", result: "Scaled to 100k+ monthly consultations." },
];

const faqs = [
  "Do you sign BAAs?",
  "Can you integrate with existing EMRs?",
  "How do you secure patient data?",
  "Do you support telemedicine workflows?",
  "Can you modernize legacy healthcare software?",
];

const HealthcareLanding = () => {
  return (
    <WorkShell documentTitle="Healthcare Software Development | Boostmysites">
      <Helmet>
        <title>Healthcare Software Development | Boostmysites</title>
        <meta
          name="description"
          content="Healthcare software built for patients, providers, and compliance. Build secure, interoperable products faster."
        />
      </Helmet>

      <div className="w-full max-w-6xl space-y-6 px-4 py-6 md:px-6 md:py-10">
        <WorkHeroFrame>
          <div className="space-y-5">
            <p className="inline-flex w-fit items-center rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wide text-cyan-100">
              Healthcare product engineering
            </p>
            <h1 className="max-w-4xl text-3xl font-semibold leading-tight text-white md:text-5xl">
              Healthcare software built for patients, providers, and compliance.
            </h1>
            <p className="max-w-3xl text-base text-slate-200 md:text-lg">
              We design and develop HIPAA-ready healthcare platforms, telemedicine products, and interoperable health
              systems.
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
            {["HIPAA-ready workflows", "HL7 & FHIR integrations", "25+ healthcare products shipped", "24/7 support coverage"].map(
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
          <p className="text-slate-200">Trusted by healthcare innovators and care providers globally.</p>
          <div className="grid grid-cols-2 gap-3 text-center text-sm text-slate-300 md:grid-cols-4">
            {["Healthcare startups", "Clinics", "Hospitals", "Wellness brands"].map((item) => (
              <div key={item} className="rounded-xl border border-white/10 bg-black/25 px-3 py-3">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Healthcare Solutions</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {healthcareSolutions.map((item) => (
              <article key={item.title} className="glass-card-soft rounded-2xl p-5">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-slate-200">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="glass-card rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-white">Patient data security built into every layer.</h2>
          <p className="mt-3 text-slate-200">
            Audit logging, role-based access control, secure infrastructure, and encrypted health data pipelines.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
            {["HIPAA", "HL7 FHIR", "DISHA", "ISO 13485", "GDPR", "End-to-end encryption"].map((item) => (
              <div key={item} className="rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-sm text-slate-100">
                {item}
              </div>
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
          <h2 className="text-2xl font-semibold text-white">Healthcare systems that actually talk to each other.</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {["HL7 integration", "FHIR APIs", "EHR synchronization", "Insurance workflows", "Lab integrations", "Pharmacy integrations"].map(
              (item) => (
                <div key={item} className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-slate-100">
                  {item}
                </div>
              ),
            )}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Case Studies</h2>
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
          <h2 className="text-2xl font-semibold text-white">Why Healthcare Teams Choose You</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {[
              "HIPAA-Ready Architecture: Built with healthcare compliance in mind.",
              "Better Patient Experiences: Simple UX for patients and providers.",
              "Interoperability Expertise: Deep experience with healthcare standards.",
              "Reliable Delivery: Fast execution with production-grade systems.",
            ].map((item) => (
              <p key={item} className="rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-slate-100">
                {item}
              </p>
            ))}
          </div>
        </section>

        <section className="space-y-3 rounded-2xl border border-white/15 bg-black/30 p-6">
          <h2 className="text-2xl font-semibold text-white">Process</h2>
          <p className="text-slate-200">Discovery → UX & Compliance → Development → Security Testing → Launch & Support</p>
          <p className="text-sm text-slate-300">From MVPs to enterprise healthcare systems.</p>
        </section>

        <section className="glass-card rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-white">FAQ</h2>
          <Accordion type="single" collapsible className="mt-4 space-y-3">
            {faqs.map((question, index) => (
              <AccordionItem
                key={question}
                value={`healthcare-faq-${index}`}
                className="rounded-xl border border-white/10 bg-black/30 px-4"
              >
                <AccordionTrigger className="text-left text-slate-100">{question}</AccordionTrigger>
                <AccordionContent className="text-slate-300">
                  We scope your workflows, align security and interoperability requirements early, and deliver in
                  production-ready weekly milestones.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="glass-card rounded-2xl p-6 text-center">
          <h2 className="text-3xl font-semibold text-white md:text-4xl">Building the future of digital healthcare?</h2>
          <p className="mx-auto mt-3 max-w-3xl text-slate-200">
            Partner with a product team experienced in healthcare compliance, interoperability, and patient-first UX.
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

        <section id="contact-form" className="glass-card rounded-2xl p-6">
          <div className="mb-4 text-center">
            <h2 className="text-2xl font-semibold text-white">Start your healthcare project</h2>
            <p className="mt-2 text-slate-300">Share your use case and we will map your roadmap in 24 hours.</p>
          </div>
          <SimpleContactForm sourcePage="healthcare-landing" />
        </section>
      </div>
    </WorkShell>
  );
};

export default HealthcareLanding;
