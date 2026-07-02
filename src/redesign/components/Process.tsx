import type { ReactNode } from "react";
import type { ProcessStep } from "../data/process";
import { processSteps } from "../data/process";

type ProcessProps = {
  steps?: ProcessStep[];
  title?: ReactNode;
  subtitle?: string;
  watermark?: string;
  columns?: 3 | 4;
  align?: "left" | "right";
  tightSpacing?: boolean;
  contentMaxWidth?: string;
  /** Renders inside a parent section (e.g. Process + Mockup split). */
  embedded?: boolean;
};

export function Process({
  steps = processSteps,
  title = "From audit to autopilot in four steps.",
  subtitle = "Three steps, zero headaches. You stay in the loop without lifting a finger.",
  watermark = "HOW WE WORK",
  columns = 4,
  align = "right",
  tightSpacing = false,
  contentMaxWidth = "100%",
  embedded = false,
}: ProcessProps) {
  const gridClass =
    columns === 3
      ? embedded
        ? "grid-cols-1 gap-4 sm:grid-cols-3"
        : "grid-cols-3 max-md:grid-cols-1"
      : "grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1";

  const shellClass = embedded
    ? "relative flex h-full min-w-0 w-full flex-col gap-4 overflow-hidden"
    : [
        "relative flex w-full max-w-[1920px] flex-col gap-4 overflow-x-hidden px-5 md:px-10",
        tightSpacing ? "py-10 md:py-14" : "py-16 md:py-24",
      ].join(" ");

  const content = (
    <>
      <div className="relative z-[1] w-full overflow-visible">
        <p
          aria-hidden
          className={[
            "pointer-events-none absolute left-0 z-0 hidden w-full max-w-none select-none text-left font-bold uppercase leading-[0.88] tracking-[0.02em] opacity-[0.32] md:block",
            embedded ? "top-0 -translate-y-0" : "top-[40%] -translate-y-1/2",
          ].join(" ")}
          style={{
            fontSize: "clamp(2.5rem, min(12vw, 11rem), 11rem)",
            backgroundImage:
              "linear-gradient(180deg, rgb(140, 178, 255) 0%, rgb(88, 132, 255) 28%, rgb(48, 88, 210) 58%, rgb(18, 32, 72) 88%, rgb(8, 14, 36) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {watermark}
        </p>

        <div
          className={[
            "relative z-[2] flex max-w-[680px] flex-col gap-5 pt-1",
            embedded ? "md:mt-[clamp(5rem,12vw,9rem)]" : "md:mt-[clamp(5.5rem,14vw,10rem)]",
            align === "left"
              ? "items-start text-left"
              : "ml-auto items-end text-right max-md:items-start max-md:text-left",
          ].join(" ")}
        >
          <h2
            className={[
              "font-medium -tracking-[0.04em] leading-[1.05em] text-white",
              embedded ? "text-[32px] lg:text-[36px]" : "text-[44px] max-md:text-3xl",
            ].join(" ")}
          >
            {title}
          </h2>
          <p
            className={[
              "text-white/60",
              embedded ? "max-w-none text-base" : "max-w-[540px] text-lg max-md:text-base",
            ].join(" ")}
          >
            {subtitle}
          </p>
        </div>
      </div>

      <div
        className={`relative z-[1] mx-auto grid w-full items-stretch gap-5 ${gridClass}`}
        style={{ maxWidth: contentMaxWidth }}
      >
        {steps.map((step, i) => {
          const card = step.illustrationSrc ? (
            <div
              className="relative flex min-h-[132px] flex-row overflow-hidden rounded-[14px] border border-white/12 sm:grid sm:min-h-[250px] sm:grid-rows-[auto_1fr]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.45) 100%)",
              }}
            >
              <div className="relative z-[2] flex min-w-0 flex-1 flex-col gap-2 p-4 sm:gap-3 sm:p-5">
                <span
                  className={[
                    "impact-highlight font-medium leading-none -tracking-[0.04em]",
                    embedded ? "text-[28px]" : "text-[36px]",
                  ].join(" ")}
                >
                  {step.number}
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-base font-medium text-white -tracking-[0.01em] md:text-lg">
                    {step.title}
                  </h3>
                  <p className="text-[12px] leading-[1.5em] text-white/65 md:text-[13px]">
                    {step.description}
                  </p>
                </div>
              </div>

              <div className="relative flex w-[42%] max-w-[160px] shrink-0 items-stretch justify-end overflow-hidden sm:w-full sm:max-w-none sm:min-h-[120px] sm:items-end sm:justify-center sm:px-2 sm:pb-2">
                <img
                  src={step.illustrationSrc}
                  alt={step.illustrationAlt ?? ""}
                  loading="lazy"
                  decoding="async"
                  width={400}
                  height={300}
                  className="h-full w-full object-contain object-right select-none sm:object-bottom"
                  draggable={false}
                />
              </div>
            </div>
          ) : (
            <div
              className={[
                "relative flex h-full flex-col gap-4 rounded-[14px] border border-white/12",
                embedded ? "p-4 md:p-5" : "p-6",
              ].join(" ")}
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.45) 100%)",
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className={[
                    "impact-highlight font-medium leading-none -tracking-[0.04em]",
                    embedded ? "text-[28px]" : "text-[36px]",
                  ].join(" ")}
                >
                  {step.number}
                </span>
                {!embedded && i < steps.length - 1 ? (
                  <span className="text-2xl text-purple/60 max-md:hidden">→</span>
                ) : null}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-medium text-white -tracking-[0.01em]">{step.title}</h3>
                <p className="text-[13px] leading-[1.5em] text-white/65">{step.description}</p>
              </div>
            </div>
          );

          return (
            <div key={step.number} className="min-w-0">
              {card}
            </div>
          );
        })}
      </div>
    </>
  );

  if (embedded) {
    return <div className={shellClass}>{content}</div>;
  }

  return (
    <section
      id="process"
      className={shellClass}
      style={{
        background:
          "radial-gradient(50% 40% at 50% 30%, var(--color-dark-purple) 0%, rgba(0,0,0,0) 100%)",
      }}
    >
      {content}
    </section>
  );
}
