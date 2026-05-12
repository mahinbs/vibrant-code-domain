import type { Metric } from "@/data/workMock";
import { WORK_PRIMARY_GLOSS_CTA_INNER, WORK_SECTION_GLOSS_BADGE } from "./primitives/ctaStyles";

type Props = {
  metrics: Metric[];
};

export function CaseStudyMetricsDetailed({ metrics }: Props) {
  return (
    <section className="relative w-full px-10 pt-[80px] pb-6 max-md:px-5 max-md:pt-12">
      <div className="flex max-w-[680px] flex-col gap-3">
        <span className={`${WORK_SECTION_GLOSS_BADGE} self-start`}>
          <span className={WORK_PRIMARY_GLOSS_CTA_INNER}>Outcomes</span>
        </span>
        <h2 className="text-[36px] font-medium -tracking-[0.04em] leading-[1.05em] text-white max-md:text-2xl">
          The numbers we are proud of.
        </h2>
      </div>

      <div className="mt-8 grid w-full grid-cols-2 gap-5 max-md:grid-cols-1">
        {metrics.map((m, idx) => (
          <article key={`${m.label}-${idx}`} className="glass-card flex flex-col gap-2 p-6">
            <span
              className={`text-[40px] font-medium leading-none -tracking-[0.04em] max-md:text-3xl ${
                m.valueIsPlaceholder === true ? "text-white/40" : "text-white"
              }`}
            >
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
