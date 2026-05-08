type Props = {
  totalProjects: number;
  totalIndustries: number;
};

export function WorkHero({ totalProjects, totalIndustries }: Props) {
  return (
    <section
      className="w-full overflow-x-hidden px-10 pb-10 pt-4 max-md:px-5 max-md:pt-3"
      style={{
        background:
          "radial-gradient(50% 40% at 50% 30%, var(--wk-dark) 0%, rgba(0,0,0,0) 100%)",
      }}
    >
      <div className="relative z-[2] mx-auto flex max-w-[min(1500px,96vw)] flex-col gap-6">
        <p
          aria-hidden
          className="work-watermark pointer-events-none select-none whitespace-nowrap text-left leading-none"
          style={{ fontSize: "clamp(2rem, 10vw, 8.5rem)" }}
        >
          OUR PORTFOLIO
        </p>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="flex min-w-0 flex-1 flex-col gap-5 text-left">
            <h1 className="px-[5px] text-[56px] font-medium -tracking-[0.04em] leading-[1.05em] text-white max-md:text-4xl">
              Real products. Real results.
            </h1>
            <p className="max-w-[560px] px-[5px] text-lg text-white/65 max-md:text-base">
              A snapshot from 500+ launches across fintech, healthtech, SaaS, AI,
              and consumer mobile. Pick a category to dive in.
            </p>
          </div>

          <div className="grid min-w-0 shrink-0 grid-cols-3 gap-2 sm:gap-3 lg:w-auto lg:max-w-[min(100%,480px)]">
            <div className="glass-card flex flex-col items-center justify-center gap-1 px-3 py-4 sm:px-4">
              <span className="text-[28px] font-medium leading-none text-gradient">
                {totalProjects}+
              </span>
              <span className="text-center text-[12px] font-medium uppercase tracking-[0.08em] text-white/55">
                Projects shipped
              </span>
            </div>
            <div className="glass-card flex flex-col items-center justify-center gap-1 px-3 py-4 sm:px-4">
              <span className="text-[28px] font-medium leading-none text-gradient">
                {totalIndustries}
              </span>
              <span className="text-center text-[12px] font-medium uppercase tracking-[0.08em] text-white/55">
                Industries served
              </span>
            </div>
            <div className="glass-card flex flex-col items-center justify-center gap-1 px-3 py-4 sm:px-4">
              <span className="text-[28px] font-medium leading-none text-gradient">
                4.9★
              </span>
              <span className="text-center text-[12px] font-medium uppercase tracking-[0.08em] text-white/55">
                Avg. client rating
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
