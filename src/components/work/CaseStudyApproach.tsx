import type { ApproachStep } from "@/data/workMock";

type Props = {
  steps: ApproachStep[];
};

export function CaseStudyApproach({ steps }: Props) {
  return (
    <section
      className="relative mt-[30px] mb-[30px] w-full overflow-x-hidden px-10 pt-[92px] pb-6 max-md:px-5 max-md:pt-12"
      style={{
        background:
          "radial-gradient(50% 40% at 50% 30%, var(--wk-dark) 0%, rgba(0,0,0,0) 100%)",
      }}
    >
      <div className="relative w-full overflow-visible">
        <p
          aria-hidden
          className="work-watermark pointer-events-none absolute left-0 top-[40%] z-0 mt-[50px] mb-[50px] w-full max-w-none -translate-y-1/2 select-none text-left max-md:top-[36%]"
        >
          HOW WE BUILT IT
        </p>
      </div>

      <div className="relative z-[2] ml-auto mt-[clamp(2.75rem,9vw,6.5rem)] flex max-w-[680px] flex-col items-end gap-5 pt-1 text-right max-md:mx-0 max-md:items-start max-md:text-left">
        <h2 className="text-[40px] font-medium -tracking-[0.04em] leading-[1.05em] text-white max-md:text-3xl">
          Our approach, in four moves.
        </h2>
        <p className="max-w-[540px] text-[15px] leading-[0] text-white/65 md:self-end">
          Tight feedback loops, weekly demos, code you fully own.
        </p>
      </div>

      <div className="relative z-[1] mt-[10px] grid w-full grid-cols-4 gap-5 max-md:mt-14 max-md:grid-cols-2 max-sm:grid-cols-1">
        {steps.map((step, i) => (
          <div
            key={step.number}
            className="glass-card-soft relative flex flex-col gap-4 p-6"
          >
            <div className="flex items-center justify-between">
              <span className="text-[36px] font-medium leading-none -tracking-[0.04em] text-gradient">
                {step.number}
              </span>
              {i < steps.length - 1 ? (
                <span className="text-2xl text-[color:var(--wk-bright)]/60 max-md:hidden">
                  →
                </span>
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
