import { useState, type CSSProperties } from "react";

/**
 * "Real examples" explorer — ten concrete AI automations without cluttering the
 * page: a numbered rail on desktop with one rich detail panel (image + wow),
 * an accordion on mobile. Only the selected example's image is loaded.
 */

type Example = {
  title: string;
  tag: string;
  desc: string;
  wow: string;
  img: string;
  imgAlt: string;
};

const IMG = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=70`;

const EXAMPLES: Example[] = [
  {
    title: "The Morning CEO Briefing",
    tag: "Every founder",
    desc:
      "Sales, ads, bank, inventory and support all feed one AI that calls or WhatsApps you at 7am: “Yesterday: $18,400 revenue, up 12%. Two big invoices cleared. Ad cost per lead jumped 40% on Meta — I paused the worst ad set. Three things need your decision today.”",
    wow: "The business talks to you.",
    img: IMG("1512428559087-560fa5ceab42"),
    imgAlt: "Morning coffee with a phone briefing",
  },
  {
    title: "The Self-Filling CRM",
    tag: "Sales teams",
    desc:
      "Every sales call and meeting is transcribed, summarised and logged. Deal stages update themselves, and follow-up drafts appear ready to send.",
    wow: "Your manager opens the CRM on Monday — it's already complete.",
    img: IMG("1460925895917-afdab827c52f"),
    imgAlt: "CRM dashboard with charts on a laptop",
  },
  {
    title: "The 5-Minute Proposal Machine",
    tag: "Agencies · manufacturers · contractors",
    desc:
      "An RFQ lands by email. AI reads the specs, pulls pricing from your ERP or rate card, and a branded, ready-to-sign proposal is in your approval queue before your competitor has even opened the email.",
    wow: "You quote in minutes, not days.",
    img: IMG("1450101499163-c8848c66ca85"),
    imgAlt: "Signing a business proposal",
  },
  {
    title: "The Document-Eating Robot",
    tag: "Accounts teams & CFOs",
    desc:
      "Invoices, POs, receipts and delivery notes arrive as PDFs, photos and WhatsApp forwards. AI extracts, validates against orders, flags mismatches, and posts clean entries to your accounting system.",
    wow: "Month-end close drops from five days to five hours.",
    img: IMG("1554224155-6726b3ff858f"),
    imgAlt: "Accounting documents and calculator",
  },
  {
    title: "The Churn Radar",
    tag: "Subscription & repeat-order businesses",
    desc:
      "AI watches customer behaviour — order frequency dropping, logins fading, complaint tone shifting — predicts who's about to leave, and quietly triggers a personal win-back: a call, a tailored offer, or a drafted message for the account manager.",
    wow: "Save a customer before they knew they were leaving.",
    img: IMG("1551288049-bebda4e38f71"),
    imgAlt: "Analytics radar of customer behaviour",
  },
  {
    title: "The AI Hiring Funnel",
    tag: "Growing teams",
    desc:
      "Job post goes up. AI screens every resume against real criteria, phone-interviews the shortlist within hours of applying, scores them, and books the top five straight into your calendar.",
    wow: "Three weeks of admin becomes a calendar full of good candidates.",
    img: IMG("1521791136064-7986c2920216"),
    imgAlt: "Interview handshake",
  },
  {
    title: "Inventory Autopilot",
    tag: "E-commerce & distribution",
    desc:
      "AI forecasts demand per SKU from history, seasonality and current trends, then drafts purchase orders to suppliers for one-click approval.",
    wow: "Never a stockout on the bestseller, no cash buried in dead stock.",
    img: IMG("1553413077-190dd305871c"),
    imgAlt: "Warehouse aisles with stock",
  },
  {
    title: "The Dispatcher Brain",
    tag: "Field-service firms",
    desc:
      "Incoming jobs are auto-scheduled by location, skill and urgency. Techs get a morning briefing with routes and job history; customers get live “your technician arrives at 2:15” updates.",
    wow: "The office coordinator's entire day, done by 8am.",
    img: IMG("1581092160562-40aa08e78837"),
    imgAlt: "Field technician at work",
  },
  {
    title: "Collections + Cash Crystal Ball",
    tag: "Every owner who's felt cash anxiety",
    desc:
      "AI learns each client's payment behaviour, predicts who'll pay late this month, escalates the right ones the right way — and shows you a 60-day cash-flow forecast that's actually accurate.",
    wow: "Cash clarity instead of cash anxiety.",
    img: IMG("1526304640581-d334cdbbf45e"),
    imgAlt: "Cash flow and finances",
  },
  {
    title: "The Complaint-to-Delight Loop",
    tag: "Reputation-critical brands",
    desc:
      "Every negative signal — bad review, angry email, support ticket, social mention — is caught in minutes, triaged by severity, answered with a drafted response in your voice, and escalated with full context if it's serious.",
    wow: "Fires are out before you even smell smoke.",
    img: IMG("1556745757-8d76bdb6984b"),
    imgAlt: "Customer support resolving an issue",
  },
];

const GRID_OVERLAY: CSSProperties = {
  backgroundImage:
    "linear-gradient(rgba(120,145,220,.10) 1px, transparent 1px), linear-gradient(90deg, rgba(120,145,220,.10) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
};

function DetailPanel({ ex }: { ex: Example }) {
  return (
    <div
      className="relative flex h-full flex-col overflow-hidden rounded-[16px] border border-white/12"
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.55) 100%)",
      }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 opacity-30" style={GRID_OVERLAY} />
      <div className="relative z-[1] h-[240px] w-full overflow-hidden md:h-[280px]">
        <img
          key={ex.img}
          src={ex.img}
          alt={ex.imgAlt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(4,8,20,0.15) 0%, rgba(4,8,20,0.55) 70%, rgba(2,4,12,0.95) 100%)",
          }}
        />
        <span className="absolute bottom-4 left-4 inline-flex items-center rounded-full border border-white/15 bg-black/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.1em] text-purple backdrop-blur-[5px]">
          {ex.tag}
        </span>
      </div>
      <div className="relative z-[1] flex flex-1 flex-col gap-3 p-6 md:p-7">
        <h3 className="text-[24px] font-medium -tracking-[0.02em] text-white md:text-[28px]">
          {ex.title}
        </h3>
        <p className="text-[15px] leading-relaxed text-white/70">{ex.desc}</p>
        <p className="mt-auto pt-2 text-[15px] font-medium">
          <span className="text-purple">The wow: </span>
          <span className="text-gradient">{ex.wow}</span>
        </p>
      </div>
    </div>
  );
}

export function AutomationExamples() {
  const [active, setActive] = useState(0);
  const [openMobile, setOpenMobile] = useState<number | null>(0);

  return (
    <section
      id="automation-examples"
      className="relative flex w-full max-w-[1920px] flex-col gap-4 overflow-x-hidden px-5 py-16 md:px-10 md:py-24"
      style={{
        background:
          "radial-gradient(50% 40% at 50% 30%, var(--color-dark-purple) 0%, rgba(0,0,0,0) 100%)",
      }}
    >
      <div className="relative z-[1] w-full overflow-visible">
        <p
          aria-hidden
          className="pointer-events-none absolute left-0 top-[40%] z-0 hidden w-full max-w-none -translate-y-1/2 select-none text-left font-bold uppercase leading-[0.88] tracking-[0.02em] opacity-[0.3] md:block"
          style={{
            fontSize: "clamp(2.5rem, min(12vw, 11rem), 11rem)",
            backgroundImage:
              "linear-gradient(180deg, rgb(140, 178, 255) 0%, rgb(88, 132, 255) 28%, rgb(48, 88, 210) 58%, rgb(18, 32, 72) 88%, rgb(8, 14, 36) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          REAL EXAMPLES
        </p>

        <div className="relative z-[2] ml-auto flex max-w-[680px] flex-col items-end gap-5 pt-1 text-right md:mt-[clamp(2.75rem,9vw,6.5rem)] max-md:items-start max-md:text-left">
          <h2 className="text-[44px] font-medium -tracking-[0.04em] leading-[1.05em] text-white max-md:text-3xl">
            Ten automations owners ask us to <span className="impact-highlight">install first</span>.
          </h2>
          <p className="max-w-[540px] text-lg text-white/60 max-md:text-base">
            Pick one and imagine it running in your business tomorrow. Every one of
            these is live for a client today.
          </p>
        </div>
      </div>

      {/* Desktop: rail + detail panel */}
      <div className="relative z-[1] hidden w-full grid-cols-[minmax(300px,380px)_1fr] gap-5 lg:grid">
        <div
          className="flex max-h-[640px] flex-col overflow-y-auto rounded-[16px] border border-white/12 p-2"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.5) 100%)",
          }}
        >
          {EXAMPLES.map((ex, i) => {
            const selected = i === active;
            return (
              <button
                key={ex.title}
                type="button"
                onClick={() => setActive(i)}
                className={[
                  "flex items-center gap-3 rounded-[12px] px-4 py-3 text-left transition-colors",
                  selected ? "bg-[#4b78ff]/15 ring-1 ring-[#4b78ff]/40" : "hover:bg-white/5",
                ].join(" ")}
              >
                <span
                  className={[
                    "w-7 shrink-0 text-[15px] font-semibold tabular-nums",
                    selected ? "text-gradient" : "text-white/35",
                  ].join(" ")}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span
                    className={[
                      "block truncate text-[15px] font-medium",
                      selected ? "text-white" : "text-white/75",
                    ].join(" ")}
                  >
                    {ex.title}
                  </span>
                  <span className="block truncate text-[12px] text-white/45">{ex.tag}</span>
                </span>
              </button>
            );
          })}
        </div>

        <DetailPanel ex={EXAMPLES[active]} />
      </div>

      {/* Mobile: accordion */}
      <div className="relative z-[1] flex w-full flex-col gap-3 lg:hidden">
        {EXAMPLES.map((ex, i) => {
          const open = openMobile === i;
          return (
            <div
              key={ex.title}
              className="overflow-hidden rounded-[14px] border border-white/12"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.5) 100%)",
              }}
            >
              <button
                type="button"
                onClick={() => setOpenMobile(open ? null : i)}
                className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
              >
                <span className={`w-7 shrink-0 text-[15px] font-semibold tabular-nums ${open ? "text-gradient" : "text-white/35"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-medium text-white">{ex.title}</span>
                  <span className="block truncate text-[12px] text-white/45">{ex.tag}</span>
                </span>
                <span
                  className={`shrink-0 text-white/50 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                  aria-hidden
                >
                  ▾
                </span>
              </button>
              {open ? (
                <div className="border-t border-white/10">
                  <div className="relative h-[180px] w-full overflow-hidden">
                    <img
                      src={ex.img}
                      alt={ex.imgAlt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(4,8,20,0.1) 0%, rgba(2,4,12,0.9) 100%)",
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-2.5 p-4">
                    <p className="text-[14px] leading-relaxed text-white/70">{ex.desc}</p>
                    <p className="text-[14px] font-medium">
                      <span className="text-purple">The wow: </span>
                      <span className="text-gradient">{ex.wow}</span>
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
