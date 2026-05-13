import { useEffect, useState } from "react";
import { services } from "../data/services";
import { site, whatsappHref } from "../data/site";
import { workUrl } from "../lib/mainSiteWorkUrl";
import { LeadForm } from "./LeadForm";
import { ArrowRightIcon, CheckIcon, OrbIcon, WhatsAppIcon } from "./icons";
import { serviceIconMap } from "./serviceIconMap";

function mapServiceIdToWhatBuilding(serviceId: string): string {
  if (serviceId === "ai-automation" || serviceId === "ai-calling") return "ai-automation";
  return "custom-software";
}

export function Services() {
  const [selectedService, setSelectedService] = useState<{
    id: string;
    title: string;
  } | null>(null);

  useEffect(() => {
    if (!selectedService) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [selectedService]);

  return (
    <>
      <section
        id="services"
        className="relative flex w-full max-w-[1920px] flex-col gap-4 overflow-x-hidden px-5 py-16 md:px-10 md:py-24"
        style={{
          background:
            "radial-gradient(50% 40% at 50% 30%, var(--color-dark-purple) 0%, rgba(0,0,0,0) 100%)",
        }}
      >
        <div className="relative z-[1] w-full overflow-visible">
        {/* Large watermark — blue gradient, behind headline */}
        <p
          aria-hidden
          className="pointer-events-none absolute left-0 top-[40%] z-0 hidden w-full max-w-none -translate-y-1/2 select-none text-left font-bold uppercase leading-[0.88] tracking-[0.02em] opacity-[0.32] md:block"
          style={{
            fontSize: "clamp(2.5rem, min(12vw, 11rem), 11rem)",
            /* Top → bottom: brighter blue → deeper navy (letters only) */
            backgroundImage:
              "linear-gradient(180deg, rgb(140, 178, 255) 0%, rgb(88, 132, 255) 28%, rgb(48, 88, 210) 58%, rgb(18, 32, 72) 88%, rgb(8, 14, 36) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          WHAT WE BUILD
        </p>

        <div className="relative z-[2] ml-auto flex max-w-[680px] flex-col items-end gap-5 pt-1 text-right md:mt-[clamp(2.75rem,9vw,6.5rem)] max-md:items-start max-md:text-left">
          <h2 className="text-[44px] font-medium -tracking-[0.04em] leading-[1.05em] text-white max-md:text-3xl">
            One studio. Six ways to ship.
          </h2>
          <p className="max-w-[540px] text-lg text-white/60 max-md:text-base">
            Hand-picked teams, modern stacks, and a 24-hour reply guarantee. No
            bloat, no agency theatre.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5 w-full relative z-[1] max-md:grid-cols-2 max-sm:grid-cols-1">
        {services.map((s) => {
          const Icon = serviceIconMap[s.id as keyof typeof serviceIconMap];
          return (
            <article
              key={s.id}
              className="group relative flex flex-col gap-5 p-6 rounded-[14px] border border-white/12 transition-colors hover:border-white/25"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.5) 100%)",
              }}
            >
              <div className="flex items-center justify-between">
                <div
                  className="size-10 rounded-[10px] border border-white/15 flex items-center justify-center text-white"
                  style={{
                    background:
                      "radial-gradient(120% 100% at 50% 0%, rgba(72,118,255,0.45), rgba(0,0,0,0.6))",
                  }}
                >
                  {Icon ? <Icon /> : null}
                </div>
                <span className="text-[11px] font-medium px-2 py-1 rounded-full border border-white/15 text-white/70 bg-black/40">
                  {s.duration}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-xl font-medium -tracking-[0.01em] text-white">
                    {s.title}
                  </h3>
                  {s.isNew ? (
                    <span className="bg-purple rounded-full py-[3px] px-1.5 text-[8px] font-bold tracking-[0.06em] uppercase text-black">
                      NEW
                    </span>
                  ) : null}
                </div>
                <p className="text-sm text-white/65 leading-[1.5em]">
                  {s.blurb}
                </p>
              </div>

              <ul className="flex flex-col gap-2">
                {s.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2 text-[13px] text-white/75 leading-[1.4em]"
                  >
                    <CheckIcon className="size-[14px] text-purple mt-[3px]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 pt-1 mt-auto">
                {s.stack.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-medium px-2 py-1 rounded-md border border-white/10 text-white/60 bg-white/5"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-2 flex items-center gap-2">
                <a
                  href={workUrl(s.id)}
                  rel="noopener"
                  className="inline-flex h-11 shrink-0 items-center justify-center rounded-[10px] border border-white/20 bg-black/55 px-3 text-[12px] font-semibold text-white/95 transition-colors hover:bg-black/70"
                >
                  View portfolio
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedService({ id: s.id, title: s.title })}
                  className="btn-gloss relative inline-flex h-11 min-w-0 flex-1 items-center justify-center gap-1.5 overflow-hidden rounded-[10px] border border-[#4b78ff]/70 bg-[linear-gradient(180deg,#2f5eff_0%,#254dcf_100%)] px-4 text-[12px] font-semibold text-white shadow-[inset_0_0_8px_2px_rgba(255,255,255,0.18)] transition-opacity hover:opacity-95"
                >
                  <span className="truncate">Build me {s.title}</span>
                  <ArrowRightIcon className="size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </article>
          );
        })}
      </div>
      </section>

      {selectedService ? (
        <div
          className="fixed inset-0 z-[140] flex items-center justify-center bg-black/70 p-4 backdrop-blur-[2px]"
          onClick={() => setSelectedService(null)}
          role="presentation"
        >
          <div
            className="relative max-h-[92vh] w-full max-w-[900px] overflow-y-auto rounded-[16px] border border-white/15 bg-[radial-gradient(60%_100%_at_50%_0%,var(--color-dark-purple)_0%,#000_75%)] p-8 max-md:p-5"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`Contact form for ${selectedService.title}`}
          >
            <button
              type="button"
              onClick={() => setSelectedService(null)}
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-lg text-white/85 hover:bg-black/60"
              aria-label="Close contact form"
            >
              x
            </button>

            <div className="relative z-[2] flex flex-col items-center gap-5 text-center">
              <div
                className="size-[72px] rounded-[20px] border border-white/15 flex items-center justify-center"
                style={{
                  background:
                    "radial-gradient(126% 86% at 84.8% 0%, #555 0%, #000 100%)",
                  boxShadow:
                    "inset 0 0 6px rgba(255,255,255,0.2), inset 0 0 15px rgba(255,255,255,0.1), 0 20px 25px rgba(0,0,0,0.4)",
                }}
              >
                <OrbIcon />
              </div>

              <h2 className="text-[42px] font-medium -tracking-[0.04em] leading-[1.05em] text-white max-md:text-[30px]">
                Tell us about your project.
                <br />
                <span className="text-white/65">Proposal in 24 hours.</span>
              </h2>
              <p className="text-base text-white/65">
                Service selected:{" "}
                <span className="font-medium text-white">{selectedService.title}</span>
              </p>
            </div>

            <div className="relative z-[2] mt-6 flex flex-col items-center gap-5">
              <LeadForm
                key={selectedService.id}
                sourcePage="services-modal"
                vertical="none"
                initialWhatBuildingValue={mapServiceIdToWhatBuilding(selectedService.id)}
                lockWhatBuilding
                serviceModal={{ id: selectedService.id, title: selectedService.title }}
              />

              <div className="flex items-center gap-4 text-sm text-white/55">
                <span className="h-px w-12 bg-white/15" />
                or
                <span className="h-px w-12 bg-white/15" />
              </div>

              <div className="flex items-center gap-3 flex-wrap justify-center">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] bg-black/40 border border-white/15 text-sm font-medium text-white/90 backdrop-blur-[5px] transition-colors hover:bg-black/60 hover:text-white"
                >
                  <WhatsAppIcon className="size-4 fill-white" />
                  WhatsApp us
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] bg-black/40 border border-white/15 text-sm font-medium text-white/90 backdrop-blur-[5px] transition-colors hover:bg-black/60 hover:text-white"
                >
                  {site.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
