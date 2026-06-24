import { useState } from "react";
import type { BusinessAutomationNiche } from "../data/businessAutomationNiches";
import { businessAutomationNiches } from "../data/businessAutomationNiches";
import { AutopilotTerminal } from "./AutopilotTerminal";
import { NicheCTA } from "./NicheCTA";

const MOBILE_NICHE_LABELS: Record<string, string> = {
  realestate: "Real Estate",
  healthcare: "Healthcare",
  staffing: "Staffing",
  fintech: "Fintech",
  ecommerce: "E-commerce",
  manufacturing: "Manufacturing",
};

function HiddenCostCard({
  niche,
  animKey,
  mobile = false,
}: {
  niche: BusinessAutomationNiche;
  animKey: number;
  mobile?: boolean;
}) {
  const header = (
    <div className="mb-3 flex items-center gap-2">
      <span className="size-2 shrink-0 rounded-full bg-red-400" aria-hidden />
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-red-400">
        The hidden cost
      </span>
    </div>
  );

  const painHeadline = (
    <p
      className={[
        "font-medium leading-snug text-red-100/90",
        mobile ? "text-[15px] leading-[1.35]" : "text-base md:text-lg",
      ].join(" ")}
    >
      {niche.hiddenPain}
    </p>
  );

  const story = (
    <p
      className={[
        "leading-relaxed text-white/55",
        mobile ? "mt-3 line-clamp-2 text-[12px] leading-snug" : "mt-4 text-sm",
      ].join(" ")}
    >
      {niche.beforeStory}
    </p>
  );

  const statsBlock = (
    <div
      className={[
        "flex gap-2 border-t border-red-400/15 pt-4 max-lg:grid max-lg:grid-cols-3 max-lg:gap-2",
        mobile ? "mt-4" : "mt-6",
      ].join(" ")}
    >
      {niche.beforeSymptoms.map((s) => (
        <div
          key={s.label}
          className={[
            "min-w-0 flex-1 rounded-[10px] bg-red-950/30 max-lg:flex-none",
            mobile ? "px-2 py-2" : "px-2 py-3 lg:px-3",
          ].join(" ")}
        >
          <div
            className={[
              "font-semibold leading-none text-red-400",
              mobile ? "text-base" : "text-lg md:text-2xl",
            ].join(" ")}
          >
            {s.value}
          </div>
          <div
            className={[
              "mt-1 leading-snug text-white/50",
              mobile ? "text-[9px]" : "text-[10px] lg:text-[11px]",
            ].join(" ")}
          >
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );

  const manualBlock = (
    <div
      className={[
        "border-t border-red-400/15 pt-4",
        mobile ? "mt-4" : "mt-auto pt-5",
      ].join(" ")}
    >
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-red-400/80">
        Your manual workflow today
      </p>
      <ol className="flex flex-col gap-2">
        {niche.manualSteps.map((step, i) => (
          <li
            key={step}
            className={[
              "flex items-start gap-2 text-white/60",
              mobile ? "text-[12px] leading-snug" : "gap-2.5 text-[13px] leading-snug",
            ].join(" ")}
          >
            <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-red-950/50 text-[9px] font-semibold text-red-400 md:size-5 md:text-[10px]">
              {i + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>
    </div>
  );

  const terminalBlock = mobile ? (
    <div className="mt-4">
      <AutopilotTerminal key={animKey} niche={niche} compact />
    </div>
  ) : null;

  return (
    <div
      className={[
        "flex h-full flex-col rounded-[18px] border border-red-400/20 bg-red-950/15",
        mobile ? "p-4" : "p-6 md:p-7",
      ].join(" ")}
    >
      {header}
      {painHeadline}
      {story}
      {mobile ? (
        <>
          {manualBlock}
          {statsBlock}
          {terminalBlock}
        </>
      ) : (
        <>
          {statsBlock}
          {manualBlock}
        </>
      )}
    </div>
  );
}

export function IndustryPlaybook() {
  const [activeNiche, setActiveNiche] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const niche = businessAutomationNiches[activeNiche];

  function handleTabChange(index: number) {
    setActiveNiche(index);
    setAnimKey((k) => k + 1);
  }

  return (
    <section
      id="industry-playbook"
      className="relative flex w-full max-w-[1920px] flex-col gap-4 overflow-x-hidden px-5 py-12 md:px-10 md:py-24"
      style={{
        background:
          "radial-gradient(50% 40% at 50% 30%, var(--color-dark-purple) 0%, rgba(0,0,0,0) 100%)",
      }}
    >
      <div className="mb-6 text-center md:mb-10">
        <p className="mb-3 inline-flex items-center rounded-full border border-white/15 bg-black/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.1em] text-purple">
          Industry playbook
        </p>
        <h2 className="text-[30px] font-medium -tracking-[0.04em] leading-[1.05em] text-white md:text-[40px]">
          Your hidden costs. <span className="impact-highlight">Our autopilot.</span>
        </h2>
        <p className="mx-auto mt-3 max-w-[560px] text-base text-white/60">
          Pick your industry. See the exact pain we fix — and what it looks like when it runs itself.
        </p>
      </div>

      <div className="mb-5 -mx-5 px-5 md:mb-8 md:mx-0 md:px-0">
        <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1 snap-x snap-mandatory [scrollbar-width:none] lg:flex-wrap lg:justify-center lg:overflow-visible [&::-webkit-scrollbar]:hidden">
          {businessAutomationNiches.map((n, i) => (
            <button
              key={n.id}
              type="button"
              onClick={() => handleTabChange(i)}
              className={[
                "shrink-0 snap-start whitespace-nowrap rounded-full border px-3.5 py-2 text-[12px] font-medium transition-colors lg:px-4 lg:text-[13px]",
                activeNiche === i
                  ? "border-purple/60 bg-purple/80 text-white ring-1 ring-purple/40"
                  : "border-white/12 bg-black/40 text-white/65 hover:border-white/30 hover:text-white/85",
              ].join(" ")}
            >
              <span className="lg:hidden">{MOBILE_NICHE_LABELS[n.id] ?? n.label}</span>
              <span className="hidden lg:inline">{n.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile: single merged card */}
      <div className="lg:hidden">
        <HiddenCostCard niche={niche} animKey={animKey} mobile />
      </div>

      {/* Desktop: two columns */}
      <div className="hidden grid-cols-2 items-stretch gap-4 lg:grid">
        <HiddenCostCard niche={niche} animKey={animKey} />
        <AutopilotTerminal key={animKey} niche={niche} />
      </div>

      <NicheCTA key={niche.id} niche={niche} />
    </section>
  );
}
