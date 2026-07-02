import { Gauge, IndianRupee, ListOrdered } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowRightIcon, WhatsAppIcon } from "../icons";
import { businessAutomationWhatsappHref } from "../../data/businessAutomationContent";

export type ScoreLandingHeadline = {
  title: string;
  highlight: string;
  titleAfter?: string;
  sub: string;
};

const REPORT_INCLUDES = [
  { icon: Gauge, label: "Automation score", labelShort: "Score" },
  { icon: IndianRupee, label: "Cost breakdown", labelShort: "Cost" },
  { icon: ListOrdered, label: "Top leaks", labelShort: "Leaks" },
] as const;

type AutomationScoreLandingProps = {
  headline: ScoreLandingHeadline;
  onStart: () => void;
};

export function AutomationScoreLanding({ headline, onStart }: AutomationScoreLandingProps) {
  return (
    <div className="flex h-full min-h-0 w-full flex-col px-4 pb-[max(env(safe-area-inset-bottom),0.5rem)] sm:px-6 sm:pb-4 md:px-10 md:pb-5">
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-5 text-center sm:gap-6 md:gap-7">
        <div className="mb-1 flex min-h-0 w-full shrink justify-center sm:mb-2 [@media(max-height:560px)]:hidden">
          <img
            src="/images/automation-report-preview.svg"
            alt="Automation report preview showing time lost, money lost and opportunities lost"
            loading="eager"
            decoding="async"
            width={1152}
            height={768}
            className="h-auto max-h-[30vh] w-auto max-w-full select-none object-contain sm:max-h-[32vh]"
            draggable={false}
          />
        </div>

        <p className="inline-flex w-fit max-w-full items-center rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/80 backdrop-blur-[5px] sm:px-3.5 sm:py-2 sm:text-[11px]">
          Free · 60 seconds · No call needed
        </p>

        <h1 className="max-w-[18ch] text-[clamp(1.65rem,5.5vw,2.75rem)] font-medium leading-[1.08] -tracking-[0.04em] text-white sm:max-w-[22ch]">
          {headline.title}{" "}
          <span className="impact-highlight">{headline.highlight}</span>
          {headline.titleAfter ? <> {headline.titleAfter}</> : null}
        </h1>

        <p className="max-w-[34rem] text-[13px] leading-snug text-white/70 sm:text-[15px] sm:leading-relaxed md:text-[16px]">
          {headline.sub}
        </p>

        <span className="btn-glow-ring mt-1 w-full max-w-md sm:mt-2 sm:w-auto">
          <button
            type="button"
            onClick={onStart}
            className="btn-gloss relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-[10px] border border-white/20 bg-purple/70 px-5 py-3 text-[14px] font-medium text-white shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)] sm:px-7 sm:py-3.5 sm:text-[15px]"
          >
            <span className="relative z-[2]">Answer 4 questions, get my score</span>
            <ArrowRightIcon className="relative z-[2] size-4 shrink-0 text-white" />
          </button>
        </span>

        <div className="mt-2 flex w-full flex-col items-center gap-2.5 sm:mt-3 sm:gap-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45 sm:text-[11px]">
            What you'll receive
          </p>
          <div className="flex w-full max-w-2xl flex-nowrap items-stretch justify-center gap-2 sm:gap-3">
            {REPORT_INCLUDES.map((item) => {
              const Icon = item.icon;
              return (
                <span
                  key={item.label}
                  className="inline-flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full border border-white/12 bg-black/50 px-2.5 py-1.5 text-[10px] text-white/75 sm:flex-none sm:gap-2 sm:px-4 sm:py-2 sm:text-[13px]"
                >
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-purple/40 bg-purple/15 sm:size-6">
                    <Icon className="size-[11px] text-purple sm:size-[13px]" strokeWidth={2} />
                  </span>
                  <span className="whitespace-nowrap sm:hidden">{item.labelShort}</span>
                  <span className="hidden whitespace-nowrap sm:inline">{item.label}</span>
                </span>
              );
            })}
          </div>
        </div>

        <p className="mt-1 text-[10px] text-white/50 sm:mt-2 sm:text-[12px]">
          200+ businesses automated · No sales pitch
        </p>
      </div>

      <div className="mx-auto mt-5 flex w-full max-w-md shrink-0 flex-col items-center gap-2.5 sm:mt-6 sm:gap-3">
        <p className="text-center text-[11px] text-white/45 sm:text-[12px]">
          Want to learn more before taking the score?
        </p>
        <div className="grid w-full grid-cols-2 gap-2.5 sm:gap-3">
          <Link
            to="/business-automation"
            className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-white/10 bg-[#1a1a2e] px-4 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-[#252540] sm:py-3 sm:text-[14px]"
          >
            Learn more
            <ArrowRightIcon className="size-3.5 shrink-0 text-white/80" />
          </Link>
          <a
            href={businessAutomationWhatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#1fa855] bg-[#25D366] px-4 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-[#20bd5a] sm:py-3 sm:text-[14px]"
          >
            <WhatsAppIcon className="size-4 shrink-0 text-white" />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
