import { costOfInactionStats } from "../../data/reshabBusinessAutomationContent";
import { ReshabLiveLossCTA } from "./ReshabLiveLossCTA";

const GLOSS =
  "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.5) 100%)";

export function ReshabCostOfInaction() {
  return (
    <section
      id="cost-of-inaction"
      className="relative flex w-full max-w-[1920px] flex-col overflow-x-hidden px-5 pb-12 pt-8 md:px-10 md:pb-16 md:pt-12"
      style={{
        background:
          "radial-gradient(50% 40% at 50% 20%, rgba(80,20,30,0.12) 0%, rgba(0,0,0,0) 100%)",
      }}
    >
      <div className="relative z-[1] grid w-full items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10 xl:gap-14">
        {/* Badge + heading — mobile order 1 */}
        <div className="order-1 flex min-w-0 flex-col items-start gap-5 text-left lg:col-start-1 lg:row-start-1">
          <p className="inline-flex w-fit items-center rounded-full border border-red-400/50 bg-black/60 px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.1em] text-red-400 backdrop-blur-[5px]">
            The cost of doing nothing
          </p>
          <h2 className="max-w-[22ch] text-left text-[32px] font-medium leading-[1.1] -tracking-[0.04em] text-white max-md:text-[30px] md:text-[44px]">
            Every day <span className="loss-highlight-red">without automation</span> is{" "}
            <span className="loss-highlight-red">money</span> and{" "}
            <span className="loss-highlight-red">time</span> your team can&apos;t get back.
          </h2>
        </div>

        {/* Illustration — mobile order 2 (right after heading) */}
        <div className="order-2 relative flex min-w-0 items-center justify-center lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:justify-end">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-[5%] rounded-full"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(120,30,40,0.22) 0%, rgba(0,0,0,0) 70%)",
            }}
          />
          <img
            src="/images/wasted-time.svg"
            alt="Frustrated business owner at a laptop surrounded by wasted time, lost money and stuck growth"
            loading="lazy"
            decoding="async"
            width={1152}
            height={768}
            className="relative w-full max-w-[640px] select-none lg:max-w-none"
            draggable={false}
          />
        </div>

        {/* Stat cards — mobile order 3 */}
        <div className="order-3 mt-2 grid w-full grid-cols-2 items-stretch gap-4 sm:grid-cols-3 md:mt-4 lg:col-start-1 lg:row-start-2">
          {costOfInactionStats.map((s, index) => {
            const Icon = s.icon;
            const isThirdCard = index === 2;

            const card = (
              <div
                className={[
                  "flex h-full min-w-0 flex-col gap-3 rounded-[16px] border border-white/12 p-5 shadow-[inset_0_1px_0_rgba(255,100,100,0.06)] sm:items-start sm:text-left md:p-6",
                  isThirdCard
                    ? "items-center text-center"
                    : "items-start text-left",
                ].join(" ")}
                style={{ background: GLOSS }}
              >
                <span className="flex size-10 items-center justify-center rounded-full border border-red-400/40 bg-red-950/30">
                  <Icon className="size-[18px] text-red-400" strokeWidth={2} />
                </span>
                <div className="loss-stat-value text-[32px] font-semibold leading-none md:text-[40px]">
                  {s.stat}
                </div>
                <p className="text-[13px] leading-snug text-white/70 md:text-[14px]">
                  {s.label}
                </p>
              </div>
            );

            if (isThirdCard) {
              return (
                <div key={s.stat} className="col-span-2 min-w-0 sm:col-span-1">
                  {card}
                </div>
              );
            }

            return (
              <div key={s.stat} className="h-full min-w-0">
                {card}
              </div>
            );
          })}
        </div>
      </div>

      <ReshabLiveLossCTA />
    </section>
  );
}
