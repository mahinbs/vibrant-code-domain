import type { Metric } from "@/data/workMock";

type Props = {
  metrics: Metric[];
};

export function CaseStudyMetricsDetailed({ metrics }: Props) {
  return (
    <section className="relative w-full px-10 pt-[80px] pb-6 max-md:px-5 max-md:pt-12">
      <div className="flex max-w-[680px] flex-col gap-3">
        <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-[color:var(--wk-bright)] backdrop-blur-[5px]">
          Outcomes
        </span>
        <h2 className="text-[36px] font-medium -tracking-[0.04em] leading-[1.05em] text-white max-md:text-2xl">
          The numbers we are proud of.
        </h2>
      </div>

      <div className="mt-8 grid w-full grid-cols-2 gap-5 max-md:grid-cols-1">
        {metrics.map((m) => (
          <article key={m.label} className="glass-card flex flex-col gap-2 p-6">
            <span className="text-[40px] font-medium leading-none -tracking-[0.04em] text-gradient max-md:text-3xl">
              {m.value}
            </span>
            <span className="text-[13px] font-semibold uppercase tracking-[0.1em] text-white/65">
              {m.label}
            </span>
            {m.description ? (
              <p className="mt-1 text-[13px] leading-[1.55em] text-white/60">
                {m.description}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
