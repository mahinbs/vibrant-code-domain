import { costOfInactionStats } from "../data/businessAutomationContent";
import { LiveLossCTA } from "./LiveLossCTA";

const GLOSS =
  "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.5) 100%)";

export function CostOfInaction() {
  return (
    <section
      id="cost-of-inaction"
      className="relative flex w-full max-w-[1920px] flex-col overflow-x-hidden px-5 pb-12 pt-5 md:px-10 md:pb-16 md:pt-6"
      style={{
        background:
          "radial-gradient(50% 40% at 50% 20%, rgba(80,20,30,0.12) 0%, rgba(0,0,0,0) 100%)",
      }}
    >
      <div className="relative z-[1] w-full overflow-visible">
        <p
          aria-hidden
          className="pointer-events-none absolute right-0 top-[4%] z-0 hidden w-full max-w-none select-none text-right font-bold uppercase leading-[0.88] tracking-[0.02em] opacity-[0.16] md:block"
          style={{
            fontSize: "clamp(2.5rem, min(12vw, 11rem), 11rem)",
            backgroundImage:
              "linear-gradient(180deg, rgb(255, 140, 140) 0%, rgb(200, 60, 60) 40%, rgb(80, 20, 20) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          THE COST
        </p>

        <div className="relative z-[2] flex max-w-[680px] flex-col items-start gap-4 pt-1 text-left md:mt-2">
          <p className="inline-flex w-fit items-center rounded-full border border-red-400/50 bg-black/60 px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.1em] text-red-400 backdrop-blur-[5px]">
            The cost of doing nothing
          </p>
          <h2 className="text-left text-[32px] font-medium leading-[1.1] -tracking-[0.04em] text-white max-md:text-[30px] md:text-[44px]">
            Every day <span className="loss-highlight-red">without automation</span> is{" "}
            <span className="loss-highlight-red">money</span>
            <br />
            and <span className="loss-highlight-red">time</span> your team can&apos;t get back.
          </h2>
        </div>
      </div>

      <div className="relative z-[1] mx-auto mt-10 grid w-full max-w-[1200px] grid-cols-2 gap-4 md:mt-14 md:grid-cols-3 md:gap-6">
        {costOfInactionStats.map((s, index) => (
          <div
            key={s.stat}
            className={[
              "rounded-[16px] border border-white/12 p-5 shadow-[inset_0_1px_0_rgba(255,100,100,0.06)] md:p-8",
              index === 2
                ? "col-span-2 flex flex-col items-center text-center md:col-span-1"
                : "text-left",
            ].join(" ")}
            style={{ background: GLOSS }}
          >
            <div className="loss-stat-value text-[36px] font-semibold leading-none md:text-[50px]">
              {s.stat}
            </div>
            <p
              className={[
                "mt-2 max-w-[22ch] text-[12px] leading-snug text-white/70 md:mt-3 md:text-[14px]",
                index === 2 ? "" : "mx-auto",
              ].join(" ")}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>

      <LiveLossCTA ctaHref="#contact-form" />
    </section>
  );
}
