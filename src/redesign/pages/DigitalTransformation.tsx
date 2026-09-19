import { lazy, Suspense, type ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { Nav, type NavLinkItem } from "../components/Nav";
import { SiteBackground } from "../components/SiteBackground";
import { SectionDivider } from "../components/SectionDivider";
import { FloatingWhatsAppButton } from "../components/FloatingWhatsAppButton";
import { FeaturedInTrustBand } from "../components/FeaturedInTrustBand";
import { ArrowRightIcon } from "../components/icons";
import { site } from "../data/site";
import { businessAutomationPressItems } from "../data/businessAutomationContent";
import { useHashScroll } from "../lib/useHashScroll";

const CTA = lazy(() => import("../components/CTA").then((m) => ({ default: m.CTA })));
const Footer = lazy(() => import("../components/Footer").then((m) => ({ default: m.Footer })));

const SOURCE_PAGE = "digital-transformation";

const whatsappHref = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
  "Hello BMS, I want the Digital Business Transformation package for ₹39,999.",
)}`;

const NAV_LINKS: ReadonlyArray<NavLinkItem> = [
  {
    label: "Services",
    dropdown: [
      { label: "AI Client Acquisition System", href: "/" },
      { label: "AI Automation", href: "/business-automation" },
      { label: "Digital Transformation", href: "/digital-transformation" },
    ],
  },
  { label: "The problem", href: "#problem" },
  { label: "The offer", href: "#offer" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Package", href: "#package" },
];

const PAY_HREF = "/pay?plan=digital";

const NAV_CTA = { label: "Transform My Business", href: PAY_HREF } as const;

const GLOSS =
  "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.5) 100%)";

const EASE = [0.22, 1, 0.36, 1] as const;

const HERO_SYSTEMS = [
  { label: "Website", imageSrc: "/brand/digital-transformation/website.png" },
  { label: "Business app", imageSrc: "/brand/digital-transformation/business-app.png" },
  { label: "CRM", imageSrc: "/brand/digital-transformation/crm.png" },
  { label: "WhatsApp", imageSrc: "/brand/digital-transformation/whatsapp.png" },
] as const;

const WEBSITE_ITEMS = [
  "Modern, responsive design",
  "Business-specific UI and structure",
  "Mobile-first experience",
  "Service/product pages",
  "Lead generation sections",
  "WhatsApp/contact integration",
  "Conversion-focused CTAs",
  "SEO-ready structure",
  "Analytics and tracking setup",
  "Performance optimization",
] as const;

const APP_ITEMS = [
  "Browse your services or products",
  "Book appointments",
  "Request quotations",
  "Track orders",
  "Submit enquiries",
  "Access customer accounts",
  "Manage subscriptions",
  "Communicate with your team",
  "Access your business-specific services",
] as const;

const CRM_ITEMS = [
  "Capture leads",
  "Organize customer information",
  "Track enquiries",
  "Manage sales stages",
  "Assign leads to your team",
  "Track follow-ups",
  "Monitor customer activity",
  "Manage your pipeline",
  "See where opportunities are being lost",
] as const;

const WHATSAPP_ITEMS = [
  "New lead responses",
  "Enquiry acknowledgements",
  "Appointment reminders",
  "Follow-up messages",
  "Lead notifications",
  "Customer updates",
  "Sales follow-ups",
  "Frequently asked questions",
] as const;

const PROBLEM_ITEMS = [
  "An outdated website",
  "Manual customer follow-ups",
  "Leads scattered across WhatsApp",
  "No proper CRM",
  "No dedicated business application",
  "Too many repetitive tasks",
] as const;

const PACKAGE_ITEMS = [
  "Website",
  "App",
  "CRM",
  "WhatsApp Automation",
] as const;

const STEPS = [
  {
    n: "01",
    title: "Tell Us About Your Business",
    body: "Tell us what you do, who you serve and where you want to go.",
    iconSrc: "/brand/digital-transformation/step-1.png",
  },
  {
    n: "02",
    title: "We Design the Digital Experience",
    body: "We determine how your website, app, CRM and automation should work around your business.",
    iconSrc: "/brand/digital-transformation/step-2.png?v=2",
  },
  {
    n: "03",
    title: "We Build It",
    body: "Our team develops the systems and connects them together.",
    iconSrc: "/brand/digital-transformation/step-3.png",
  },
  {
    n: "04",
    title: "You Go Live",
    body: "You get a digital foundation that is ready to support your customers and your growth.",
    iconSrc: "/brand/digital-transformation/step-4.png",
  },
] as const;

const STACK_ROLES = [
  { k: "Website", v: "Brings customers in." },
  { k: "App", v: "Makes your service easier to access." },
  { k: "CRM", v: "Helps your team manage relationships." },
  { k: "WhatsApp", v: "Keeps conversations moving." },
] as const;

const METRICS = [
  { value: "₹39,999", label: "Complete package" },
  { value: "4", label: "Systems included" },
  { value: "1 team", label: "Builds every piece" },
  { value: "Go live", label: "Ready for customers" },
] as const;

function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Watermark({ children }: { children: string }) {
  return (
    <p
      aria-hidden
      className="acq-watermark pointer-events-none hidden min-w-0 flex-1 select-none self-end overflow-hidden whitespace-nowrap text-right font-bold uppercase leading-[0.82] tracking-[0.02em] opacity-[0.55] lg:block"
      style={{
        fontSize: "clamp(2.75rem, 5.5vw, 6.75rem)",
        backgroundImage:
          "linear-gradient(180deg, rgb(196,214,255) 0%, rgb(88,132,255) 48%, rgb(48,82,196) 100%)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "transparent",
      }}
    >
      {children}
    </p>
  );
}

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="acq-eyebrow impact-highlight inline-flex w-fit items-center rounded-full border border-purple/50 bg-black/60 px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.1em] backdrop-blur-[5px]">
      {children}
    </p>
  );
}

function CtaLink({
  href,
  children,
  secondary,
}: {
  href: string;
  children: string;
  secondary?: boolean;
}) {
  const className = secondary
    ? "acq-ghost-btn inline-flex items-center justify-center gap-2 rounded-[10px] border border-white/15 bg-black/40 px-5 py-[15px] text-sm font-semibold text-white/90 backdrop-blur-[5px] transition-colors hover:bg-black/60 hover:text-white"
    : "btn-gloss relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-[10px] border border-white/20 bg-purple/70 px-5 py-[15px] text-sm font-semibold text-white";
  const inner = secondary ? (
    children
  ) : (
    <>
      <span className="relative z-[2]">{children}</span>
      <ArrowRightIcon className="relative z-[2] size-[14px] shrink-0 text-white" />
    </>
  );
  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {inner}
      </a>
    );
  }
  if (href.startsWith("/") && !href.startsWith("/#")) {
    return (
      <Link to={href} className={className}>
        {inner}
      </Link>
    );
  }
  return (
    <a href={href} className={className}>
      {inner}
    </a>
  );
}

function CheckList({ items }: { items: ReadonlyArray<string> }) {
  return (
    <ul className="mt-4 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-[15px] leading-relaxed text-white/70">
          <span className="impact-highlight mt-[2px] shrink-0">✓</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function BulletList({ items }: { items: ReadonlyArray<string> }) {
  return (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-white/70">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function SectionHead({
  eyebrow,
  title,
  watermark,
  copy,
}: {
  eyebrow: string;
  title: ReactNode;
  watermark: string;
  copy?: ReactNode;
}) {
  return (
    <Reveal className="relative z-[1] w-full">
      <div className="relative z-[2] flex w-full items-end justify-between gap-6 pt-1 lg:gap-10">
        <div className="flex min-w-0 max-w-[760px] flex-col items-start gap-4 text-left">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="text-left text-[32px] font-medium leading-[1.1] -tracking-[0.04em] text-white max-md:text-[30px] md:text-[44px]">
            {title}
          </h2>
          {copy}
        </div>
        <Watermark>{watermark}</Watermark>
      </div>
    </Reveal>
  );
}

export default function DigitalTransformation() {
  useHashScroll();

  return (
    <>
      <Helmet>
        <title>Digital Business Transformation | Boostmysites</title>
        <meta
          name="description"
          content="Get a modern website, a business-specific app, a dedicated CRM, and WhatsApp automation. All for ₹39,999."
        />
      </Helmet>
      <SiteBackground />
      <Nav links={NAV_LINKS} cta={NAV_CTA} whatsappHref={whatsappHref} ctaOutsideNav />
      <FloatingWhatsAppButton href={whatsappHref} />

      <main className="relative z-10 mx-auto flex w-full max-w-[1920px] flex-col items-center overflow-x-clip pb-16 md:pb-24">
        <section className="flex w-full items-center justify-center pt-2 max-md:pt-0">
          <div
            className="acq-hero-panel relative mx-auto flex w-full min-w-0 flex-col justify-center gap-10 overflow-hidden rounded-[20px] border border-white/15 px-5 pb-16 pt-16 md:px-10 md:pb-24 md:pt-24 xl:px-16 xl:pb-[110px] xl:pt-[100px]"
            style={{
              background:
                "radial-gradient(108% 100% at 100% 100.6%, var(--color-purple) 12.8%, rgb(8,16,40) 69.1%, #000 98.2%)",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-[2]"
              style={{
                background:
                  "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 72%, rgba(0,0,0,0.72) 100%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-[1] bg-left-top bg-repeat opacity-80 bg-[length:400px_auto]"
              style={{ backgroundImage: "url(/textures/stars.svg)" }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-[3] bg-left-top bg-repeat opacity-60 mix-blend-overlay bg-[length:67px_auto]"
              style={{ backgroundImage: "url(/textures/grid.svg)" }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute right-[-180px] top-[-120px] z-[4] size-[680px] rounded-full opacity-30 max-md:hidden"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(96,142,255,0.42), rgba(72,118,255,0.22) 45%, rgba(0,0,0,0) 75%)",
                filter: "blur(20px)",
              }}
            />

            <div className="relative z-[5] grid w-full grid-cols-1 items-center gap-8 xl:grid-cols-[minmax(0,0.68fr)_minmax(780px,1.2fr)] xl:gap-6">
              <div className="flex flex-col items-start">
                <div className="acq-eyebrow inline-flex w-fit items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3.5 py-2.5 backdrop-blur-[5px]">
                  <span className="rounded-full bg-purple px-1.5 py-1 text-[8px] font-bold uppercase tracking-[0.05em]">
                    NEW
                  </span>
                  <span className="text-sm font-medium leading-[1.4] text-white/90">
                    The stack big companies run
                  </span>
                </div>
                <h1 className="mt-5 max-w-[16ch] text-[40px] font-medium leading-[0.98] -tracking-[0.05em] text-white md:text-[64px]">
                  <span className="mb-3 block md:mb-4">Your Business Has Evolved.</span>
                  Your Digital Presence{" "}
                  <span className="impact-highlight">Should Too.</span>
                </h1>
                <p className="mt-5 max-w-[52ch] border-l-2 border-purple/60 pl-3 font-mono !text-[14px] font-normal !leading-[1.3] tracking-[0.04em] text-white/70 sm:mt-6 sm:pl-4 sm:!text-[15px] md:mt-7 md:pl-6 md:!text-[20px] md:!leading-[1.25] md:tracking-[0.06em]">
                  Get a modern website, a business-specific app, a dedicated CRM, and WhatsApp automation built around the way your business actually works.
                  <br />
                  <br />
                  Everything you need to look more professional, serve customers better, and build a business that is ready for what’s next.
                </p>
                <p className="impact-highlight mt-7 text-[32px] font-medium tracking-[-0.03em] md:text-[44px]">
                  All for ₹39,999
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <CtaLink href={PAY_HREF}>Transform My Business</CtaLink>
                  <CtaLink href="#offer" secondary>
                    See the offer
                  </CtaLink>
                </div>
                <p className="mt-4 text-[14px] leading-relaxed text-white/50">
                  Built specifically for your business. Not another generic template or off-the-shelf system.
                </p>
              </div>

              <div className="grid w-full grid-cols-2 gap-3 md:gap-4">
                {HERO_SYSTEMS.map((card) => (
                  <div
                    key={card.label}
                    className="relative aspect-[3/2] overflow-hidden rounded-[18px] border border-[rgba(120,168,255,0.28)] p-1 md:p-1.5"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(96, 148, 255, 0.28) 0%, rgba(40, 78, 160, 0.38) 48%, rgba(18, 40, 92, 0.55) 100%)",
                      boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
                    }}
                  >
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-left-top bg-repeat opacity-80 bg-[length:44px_44px]"
                      style={{ backgroundImage: "url(/textures/grid.svg)" }}
                    />
                    <img
                      src={card.imageSrc}
                      alt={card.label}
                      className="relative z-[1] h-full w-full scale-[1.08] object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <FeaturedInTrustBand
          pressItems={[...businessAutomationPressItems]}
          metrics={METRICS}
        />

        <SectionDivider />

        <section id="problem" className="w-full px-5 py-12 md:px-10 md:py-16">
          <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-14">
            <div className="min-w-0 lg:w-[54%]">
              <SectionHead
                eyebrow="The problem"
                watermark="THE GAP"
                title={
                  <>
                    Your Customers Have Changed.{" "}
                    <span className="impact-highlight">Has Your Business?</span>
                  </>
                }
              />
              <p className="mt-5 text-[16px] leading-relaxed text-white/70 md:text-[17px]">
                Customers expect businesses to be easy to discover, easy to contact, and easy to work with.
              </p>
              <p className="mt-4 text-[16px] leading-relaxed text-white/70 md:text-[17px]">
                But many businesses are still operating with:
              </p>
              <BulletList items={PROBLEM_ITEMS} />
              <p className="mt-6 text-[16px] leading-relaxed text-white/70 md:text-[17px]">
                You don’t need more complexity.
              </p>
              <p className="mt-2 text-[16px] leading-relaxed text-white/70 md:text-[17px]">
                You need a better digital foundation.
              </p>
              <p className="mt-2 text-[16px] font-medium text-white md:text-[17px]">
                That’s exactly what we are building.
              </p>
            </div>
            <div className="relative min-h-0 overflow-hidden rounded-[20px] max-lg:aspect-[4/5] lg:w-[46%] lg:min-h-0">
              <img
                src="/brand/digital-transformation/problem.png"
                alt="A business owner facing scattered tools: outdated website, WhatsApp leads, no CRM, and too many manual tasks"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </section>

        <SectionDivider />

        <section id="offer" className="relative w-full overflow-x-hidden px-5 py-12 md:px-10 md:py-16">
          <div className="mx-auto w-full max-w-[1400px]">
            <SectionHead
              eyebrow="The offer"
              watermark="THE STACK"
              title={
                <>
                  One Business.{" "}
                  <span className="impact-highlight">One Digital Transformation.</span>
                </>
              }
              copy={
                <p className="max-w-[62ch] text-[16px] leading-relaxed text-white/70 md:text-[17px]">
                  We bring the essential digital systems your business needs together into one complete package.
                </p>
              }
            />
          </div>

          <div className="mx-auto mt-10 grid w-full max-w-[1400px] gap-4 md:grid-cols-2">
            <article className="acq-gloss relative overflow-hidden rounded-[16px] border border-white/12 p-5 transition-colors hover:border-purple/50 md:p-6" style={{ background: GLOSS }}>
              <img
                src="/brand/digital-transformation/watermark-website.png"
                alt=""
                aria-hidden
                className="pointer-events-none absolute bottom-[-18%] right-[-14%] z-0 w-[115%] max-w-none opacity-30"
              />
              <div className="relative z-10">
                <p className="impact-highlight font-mono text-[12px] font-semibold uppercase tracking-[0.12em]">01</p>
                <h3 className="impact-highlight mt-2 text-[22px] font-semibold tracking-[-0.02em]">A Modern Website</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                  Your website should work as hard as you do.
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                  We’ll build or completely revamp your website around your actual business, your customers and your goals.
                </p>
                <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.08em] text-white/45">What’s included:</p>
                <CheckList items={WEBSITE_ITEMS} />
                <p className="mt-5 text-[15px] leading-relaxed text-white/70">
                  Not just a prettier website.
                </p>
                <p className="mt-1 text-[15px] font-medium text-white">
                  A digital front door designed to turn visitors into customers.
                </p>
              </div>
            </article>

            <article className="acq-gloss relative overflow-hidden rounded-[16px] border border-white/12 p-5 transition-colors hover:border-purple/50 md:p-6" style={{ background: GLOSS }}>
              <img
                src="/brand/digital-transformation/watermark-app.png"
                alt=""
                aria-hidden
                className="pointer-events-none absolute bottom-[-6%] right-[-4%] z-0 w-[76%] max-w-none opacity-30"
              />
              <div className="relative z-10">
                <p className="impact-highlight font-mono text-[12px] font-semibold uppercase tracking-[0.12em]">02</p>
                <h3 className="impact-highlight mt-2 text-[22px] font-semibold tracking-[-0.02em]">A Business-Specific App</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                  Give your customers a better way to interact with your business.
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                  We’re not talking about another random app idea.
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                  We’ll build an application specifically around your business model.
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-white/70">
                  Depending on your business, it could help customers:
                </p>
                <CheckList items={APP_ITEMS} />
                <p className="mt-5 text-[15px] font-medium text-white">
                  Your business decides what the app does.
                </p>
                <p className="mt-1 text-[15px] leading-relaxed text-white/70">
                  We build the technology around it.
                </p>
              </div>
            </article>

            <article className="acq-gloss relative overflow-hidden rounded-[16px] border border-white/12 p-5 transition-colors hover:border-purple/50 md:p-6" style={{ background: GLOSS }}>
              <img
                src="/brand/digital-transformation/watermark-crm.png"
                alt=""
                aria-hidden
                className="pointer-events-none absolute bottom-[-6%] right-[-4%] z-0 w-[76%] max-w-none opacity-30"
              />
              <div className="relative z-10">
                <p className="impact-highlight font-mono text-[12px] font-semibold uppercase tracking-[0.12em]">03</p>
                <h3 className="impact-highlight mt-2 text-[22px] font-semibold tracking-[-0.02em]">Your Dedicated CRM</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                  Stop losing customers in spreadsheets and chat windows.
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                  Your CRM becomes the central place to manage your customer journey.
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-white/70">
                  You’ll be able to:
                </p>
                <CheckList items={CRM_ITEMS} />
                <p className="mt-5 text-[15px] font-medium text-white">
                  Every lead has a place. Every customer has a journey.
                </p>
              </div>
            </article>

            <article className="acq-gloss relative overflow-hidden rounded-[16px] border border-white/12 p-5 transition-colors hover:border-purple/50 md:p-6" style={{ background: GLOSS }}>
              <img
                src="/brand/digital-transformation/watermark-whatsapp.png"
                alt=""
                aria-hidden
                className="pointer-events-none absolute bottom-[-14%] right-[-10%] z-0 w-[108%] max-w-none opacity-30"
              />
              <div className="relative z-10">
                <p className="impact-highlight font-mono text-[12px] font-semibold uppercase tracking-[0.12em]">04</p>
                <h3 className="impact-highlight mt-2 text-[22px] font-semibold tracking-[-0.02em]">WhatsApp Automation</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                  Turn WhatsApp into part of your business system.
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                  Your customers are already on WhatsApp.
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                  Let’s make your business ready for them.
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-white/70">
                  Automate repetitive conversations and follow-ups such as:
                </p>
                <CheckList items={WHATSAPP_ITEMS} />
                <p className="mt-5 text-[15px] leading-relaxed text-white/70">
                  Your team spends less time repeating the same conversations.
                </p>
                <p className="mt-1 text-[15px] font-medium text-white">
                  Your customers get faster responses.
                </p>
              </div>
            </article>
          </div>
        </section>

        <SectionDivider />

        <section id="package" className="w-full px-5 py-8 md:px-10 md:py-10">
          <div className="relative mx-auto grid w-full max-w-[1400px] items-end overflow-hidden rounded-[20px] border border-purple/60 bg-[rgba(72,118,255,0.10)] p-5 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-8 md:p-8 md:pl-0 md:pb-0">
            <div className="relative z-10 md:order-2 md:pb-8">
              <Eyebrow>The ₹39,999 section</Eyebrow>
              <h2 className="mt-3 max-w-[34rem] text-[28px] font-medium leading-[1.12] -tracking-[0.04em] text-white md:text-[36px]">
                Imagine Getting All of This.
              </h2>
              <p className="impact-highlight mt-5 text-[32px] font-medium tracking-[-0.03em] md:text-[44px]">
                ₹39,999
              </p>
              <p className="mt-1 text-[16px] font-medium text-white">
                Your Digital Business Transformation Package
              </p>
              <CheckList items={PACKAGE_ITEMS} />
              <div className="mt-5">
                <CtaLink href={PAY_HREF}>Build My Digital Business</CtaLink>
              </div>
              <p className="mt-3 text-[14px] text-white/50">Limited implementation slots available.</p>
            </div>
            <img
              src="/brand/digital-transformation/package.png"
              alt="All four solutions for ₹39,999: website, app, CRM, and WhatsApp automation"
              className="pointer-events-none mt-4 w-[90%] justify-self-center object-contain object-bottom max-md:mx-auto md:order-1 md:mt-0 md:max-h-[480px] md:w-[90%] md:justify-self-start md:self-end"
            />
          </div>
        </section>

        <SectionDivider />

        <section className="relative w-full overflow-x-hidden px-5 py-12 md:px-10 md:py-16">
          <div className="mx-auto w-full max-w-[1400px]">
            <SectionHead
              eyebrow="Why this exists"
              watermark="THE POINT"
              title={
                <>
                  Because Small Businesses Deserve{" "}
                  <span className="impact-highlight">Better Technology Too.</span>
                </>
              }
            />
            <div className="mt-10 grid items-stretch gap-4 lg:grid-cols-2">
              <article
                className="acq-gloss h-full rounded-[16px] border border-white/12 p-5 md:p-6"
                style={{ background: GLOSS }}
              >
                <p className="impact-highlight font-mono text-[12px] font-semibold uppercase tracking-[0.12em]">
                  The belief
                </p>
                <h3 className="mt-2 text-[22px] font-semibold tracking-[-0.02em] text-white">
                  We’re not here to sell you another tool.
                </h3>
                <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-white/70 md:text-[16px]">
                  <p>
                    For years, sophisticated digital systems have largely been accessible to businesses with large technology budgets and dedicated teams.
                  </p>
                  <p>
                    A growing business shouldn’t have to choose between “we need better technology” and “we can’t afford to build it.”
                  </p>
                  <p>That’s why we created this. To look bigger, operate smarter, and compete with confidence.</p>
                  <p className="font-medium text-white">
                    We’re here to help you build the business that comes next.
                  </p>
                </div>
              </article>
              <article
                className="acq-gloss h-full rounded-[16px] border border-white/12 p-5 md:p-6"
                style={{ background: GLOSS }}
              >
                <p className="impact-highlight font-mono text-[12px] font-semibold uppercase tracking-[0.12em]">
                  The stack
                </p>
                <h3 className="mt-2 text-[22px] font-semibold tracking-[-0.02em] text-white">
                  It should solve real problems.
                </h3>
                <ul className="mt-5 space-y-4">
                  {STACK_ROLES.map((row) => (
                    <li key={row.k} className="border-l-2 border-purple/60 pl-4">
                      <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.1em] text-white/45">
                        {row.k}
                      </p>
                      <p className="mt-1 text-[15px] leading-relaxed text-white/80 md:text-[16px]">{row.v}</p>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-[15px] font-medium text-white md:text-[16px]">
                  Together, they become a digital system built around your business.
                </p>
              </article>
            </div>
          </div>
        </section>

        <SectionDivider />

        <section id="how-it-works" className="relative w-full overflow-x-hidden px-5 py-12 md:px-10 md:py-16">
          <div className="mx-auto w-full max-w-[1400px]">
            <SectionHead
              eyebrow="How it works"
              watermark="PROCESS"
              title={
                <>
                  From Your Business Idea to{" "}
                  <span className="impact-highlight">Your Digital System.</span>
                </>
              }
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((step) => (
                <div
                  key={step.n}
                  className="acq-gloss rounded-[16px] border border-white/12 p-5 transition-colors hover:border-purple/50"
                  style={{ background: GLOSS }}
                >
                  <p className="impact-highlight font-mono text-[12px] font-semibold uppercase tracking-[0.12em]">
                    {step.n}
                  </p>
                  <div className="mt-4 flex h-[200px] w-full items-center justify-center overflow-visible">
                    <img
                      src={step.iconSrc}
                      alt=""
                      aria-hidden
                      className="h-full w-full overflow-visible object-contain object-center drop-shadow-[0_16px_32px_rgba(51,102,255,0.35)]"
                    />
                  </div>
                  <h3 className="impact-highlight mt-4 text-[18px] font-semibold">{step.title}</h3>
                  <p className="mt-2 font-mono text-[13px] font-normal leading-relaxed tracking-[0.04em] text-white/70 md:text-[14px]">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider />

        <section className="w-full px-5 py-12 md:px-10 md:py-16">
          <div className="mx-auto grid w-full max-w-[1400px] items-stretch gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
            <div>
              <SectionHead
                eyebrow="The next step"
                watermark="NEXT"
                title={
                  <>
                    Your Business Is Already Moving Forward.
                    <br />
                    Let’s Make Sure Your Digital Infrastructure{" "}
                    <span className="impact-highlight">Moves With It.</span>
                  </>
                }
              />
              <p className="mt-5 text-[16px] leading-relaxed text-white/70 md:text-[17px]">
                Get a modern website, business-specific app, dedicated CRM and WhatsApp automation.
              </p>
              <p className="impact-highlight mt-6 text-[36px] font-medium tracking-[-0.03em] md:text-[48px]">
                ₹39,999
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <CtaLink href={PAY_HREF}>Start My Digital Transformation</CtaLink>
                <CtaLink href={whatsappHref} secondary>
                  Talk to Our Team
                </CtaLink>
              </div>
              <p className="mt-5 text-[15px] leading-relaxed text-white/60">
                Tell us about your business. We’ll tell you what we can build.
              </p>
            </div>
            <img
              src="/brand/digital-transformation/next-step.png"
              alt="Switching from manual operations to a connected website, app, CRM, and WhatsApp system"
              className="w-[110%] max-w-none justify-self-center self-center object-contain drop-shadow-[0_16px_32px_rgba(51,102,255,0.35)]"
            />
          </div>
        </section>

        <Suspense fallback={<div className="h-[40vh] w-full" aria-hidden="true" />}>
          <CTA
            eyebrow="Digital Business Transformation"
            title="Tell us about your business."
            subtitle="We’ll tell you what we can build. Website, app, CRM, and WhatsApp automation for ₹39,999."
            leadFormProps={{ sourcePage: SOURCE_PAGE }}
            whatsappHref={whatsappHref}
          />
          <p className="mx-auto mt-2 max-w-[640px] px-5 text-center font-mono text-[12px] leading-relaxed tracking-[0.04em] text-white/40">
            Built by BoostMySites
            <br />
            Helping businesses build, modernize and scale their digital presence.
          </p>
          <Footer whatsappHref={whatsappHref} />
        </Suspense>
      </main>
    </>
  );
}
