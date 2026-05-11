import { Link } from "react-router-dom";
import {
  WORK_PRIMARY_GLOSS_CTA_H12,
  WORK_PRIMARY_GLOSS_CTA_INNER,
  WORK_SECTION_GLOSS_BADGE_LARGE,
} from "./primitives/ctaStyles";
import { ArrowRightIcon, WhatsAppIcon } from "./primitives/icons";

const WHATSAPP_HREF =
  "https://wa.me/919790035747?text=" +
  encodeURIComponent("Hello BMS, I am looking to develop a project.");

export function WorkCTA() {
  return (
    <section className="w-full px-10 pt-[80px] pb-10 max-md:px-5 max-md:pt-12">
      <div
        className="glass-card relative flex flex-col items-center gap-6 overflow-hidden px-10 py-16 text-center max-md:px-6 max-md:py-12"
        style={{
          background:
            "radial-gradient(80% 120% at 50% 0%, rgba(72,118,255,0.18), rgba(0,0,0,0.55) 60%)",
        }}
      >
        <span className={WORK_SECTION_GLOSS_BADGE_LARGE}>
          <span className={WORK_PRIMARY_GLOSS_CTA_INNER}>Let's build</span>
        </span>
        <h2 className="max-w-[680px] text-[44px] font-medium -tracking-[0.04em] leading-[1.05em] text-white max-md:text-3xl">
          Have a project that deserves the same treatment?
        </h2>
        <p className="max-w-[520px] text-base text-white/65">
          Tell us where you are, and we'll send a same-day plan with a clear
          scope, timeline, and price. No pitch decks.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link to="/contact" className={WORK_PRIMARY_GLOSS_CTA_H12}>
            <span className={WORK_PRIMARY_GLOSS_CTA_INNER}>Get a free consultation</span>
            <ArrowRightIcon
              className={`${WORK_PRIMARY_GLOSS_CTA_INNER} size-4 transition-transform group-hover:translate-x-0.5`}
            />
          </Link>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-[10px] border border-white/20 bg-black/55 px-5 text-[13px] font-semibold text-white/95 transition-colors hover:bg-black/70"
          >
            <WhatsAppIcon />
            <span>WhatsApp us</span>
          </a>
        </div>
      </div>
    </section>
  );
}
