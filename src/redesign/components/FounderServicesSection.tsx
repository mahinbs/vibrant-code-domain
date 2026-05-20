import { useState } from "react";
import {
  FOUNDER_SERVICES,
  FOUNDER_SERVICES_INTRO,
} from "../data/founderServicesContent";
import { FounderServiceBackgroundIcon } from "./FounderServiceBackgroundIcon";
import { HighlightText } from "../lib/highlightImpactText";

type FounderServicesSectionProps = {
  label?: string;
  intro?: string;
  className?: string;
};

/** “What we handle for you” — single-open accordion with description + bullets. */
export function FounderServicesSection({
  label = "What we {{handle}} for you",
  intro = FOUNDER_SERVICES_INTRO,
  className = "",
}: FounderServicesSectionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section
      className={`w-full px-6 md:px-10 ${className}`}
      aria-label={label}
    >
      <div className="mx-auto w-full max-w-full">
        <p className="text-[9.5px] font-bold uppercase tracking-[0.24em] text-white/40">
          <HighlightText text={label} />
        </p>
        {intro ? (
          <p className="mt-2 max-w-[42rem] text-[13px] leading-snug text-white/45">
            <HighlightText text={intro} />
          </p>
        ) : null}

        <ul className="mt-3.5 divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {FOUNDER_SERVICES.map((service) => {
            const isOpen = openId === service.id;
            const panelId = `founder-service-panel-${service.id}`;
            const triggerId = `founder-service-trigger-${service.id}`;

            return (
              <li key={service.id}>
                <button
                  type="button"
                  id={triggerId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(service.id)}
                  className="flex w-full cursor-pointer items-center gap-3 py-3.5 text-left transition-colors hover:bg-white/[0.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white/30 md:gap-4 md:py-[13px]"
                >
                  <span
                    className="w-[18px] shrink-0 text-[9.5px] font-bold tracking-[0.04em] text-[#c8820a]/80"
                    aria-hidden
                  >
                    {service.num}
                  </span>
                  <span className="flex min-w-0 flex-1 items-center gap-2 text-[14.5px] font-medium tracking-[0.01em] text-white md:gap-2.5 md:text-[15px]">
                    <span className="min-w-0">
                      <HighlightText text={service.name} />
                    </span>
                    <span
                      aria-hidden
                      className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/15 text-[13px] leading-none text-white/55 transition-transform duration-200 motion-reduce:transition-none ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </span>
                  <span className="ml-auto shrink-0 border border-white/12 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-white/35">
                    {service.tag}
                  </span>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  aria-hidden={!isOpen}
                  className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-200 motion-reduce:transition-none ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className={`min-h-0 ${isOpen ? "" : "invisible"}`}>
                    <div className="relative overflow-hidden pb-4 pl-[30px] pr-1 pt-0 md:pl-[34px] md:pr-2">
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-y-2 right-3 z-0 flex items-center md:right-6"
                      >
                        <FounderServiceBackgroundIcon serviceId={service.id} />
                      </div>
                      <div className="relative z-[1]">
                      <div className="space-y-3">
                        {service.description.map((paragraph) => (
                          <p
                            key={paragraph.slice(0, 32)}
                            className="text-[13.5px] leading-[1.55] text-white/55"
                          >
                            <HighlightText text={paragraph} />
                          </p>
                        ))}
                      </div>
                      <p className="mt-4 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40">
                        How we help
                      </p>
                      <ul className="mt-2 list-disc space-y-1.5 pl-4 text-[13px] leading-snug text-white/60">
                        {service.bullets.map((bullet) => (
                          <li key={bullet}>
                            <HighlightText text={bullet} />
                          </li>
                        ))}
                      </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
