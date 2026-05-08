import type { Metric } from "@/data/workMock";

type Props = {
  metrics: Metric[];
};

export function CaseStudyMetrics({ metrics }: Props) {
  return (
    <section className="w-full px-10 pt-6 pb-6 max-md:px-5">
      <div className="grid grid-cols-4 gap-5 max-md:grid-cols-2">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="glass-card flex flex-col items-start gap-1 px-5 py-6"
          >
            <span className="text-[40px] font-medium leading-none -tracking-[0.04em] text-gradient max-md:text-3xl">
              {m.value}
            </span>
            <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-white/55">
              {m.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
