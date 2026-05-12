import { processSteps } from "../data/process";

export function Process() {
  return (
    <section
      id="process"
      className="relative flex w-full max-w-[min(1920px,96vw)] flex-col gap-4 overflow-x-hidden px-10 pb-10 pt-[120px] max-md:px-5 max-md:pt-20"
      style={{
        background:
          "radial-gradient(50% 40% at 50% 30%, var(--color-dark-purple) 0%, rgba(0,0,0,0) 100%)",
      }}
    >
      <div className="relative z-[1] w-full overflow-visible">
        {/* Large watermark — same treatment as Services “What we build” */}
        <p
          aria-hidden
          className="pointer-events-none absolute left-0 top-[40%] z-0 w-full max-w-none -translate-y-1/2 select-none text-left font-bold uppercase leading-[0.88] tracking-[0.02em] opacity-[0.32] max-md:top-[36%] max-md:opacity-[0.26]"
          style={{
            fontSize: "clamp(2.5rem, min(12vw, 11rem), 11rem)",
            backgroundImage:
              "linear-gradient(180deg, rgb(140, 178, 255) 0%, rgb(88, 132, 255) 28%, rgb(48, 88, 210) 58%, rgb(18, 32, 72) 88%, rgb(8, 14, 36) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          HOW WE WORK
        </p>

        <div className="relative z-[2] ml-auto mt-[clamp(5.5rem,14vw,10rem)] flex max-w-[680px] flex-col items-end gap-5 pt-1 text-right">
          <h2 className="text-[44px] font-medium -tracking-[0.04em] leading-[1.05em] text-white max-md:text-3xl">
            From kickoff to launch in four steps.
          </h2>
          <p className="max-w-[540px] text-lg text-white/60 max-md:text-base">
            Tight feedback loops, weekly demos, and code you fully own.
          </p>
        </div>
      </div>

      <div className="relative z-[1] grid w-full grid-cols-4 gap-5 max-md:grid-cols-2 max-sm:grid-cols-1">
        {processSteps.map((step, i) => (
          <div
            key={step.number}
            className="relative flex flex-col gap-4 rounded-[14px] border border-white/12 p-6"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.45) 100%)",
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[36px] font-medium leading-none -tracking-[0.04em] text-gradient">
                {step.number}
              </span>
              {i < processSteps.length - 1 ? (
                <span className="text-2xl text-purple/60 max-md:hidden">→</span>
              ) : null}
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-medium text-white -tracking-[0.01em]">
                {step.title}
              </h3>
              <p className="text-[13px] leading-[1.5em] text-white/65">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
