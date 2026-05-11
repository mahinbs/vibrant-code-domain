import type { FeatureItem } from "@/data/workMock";
import { WORK_PRIMARY_GLOSS_CTA_INNER, WORK_SECTION_GLOSS_BADGE } from "./primitives/ctaStyles";
import { CheckIcon } from "./primitives/icons";

type Props = {
  features: FeatureItem[];
};

export function CaseStudyFeatures({ features }: Props) {
  return (
    <section className="relative w-full px-10 pt-[80px] pb-6 max-md:px-5 max-md:pt-12">
      <div className="flex max-w-[680px] flex-col gap-3">
        <span className={`${WORK_SECTION_GLOSS_BADGE} self-start`}>
          <span className={WORK_PRIMARY_GLOSS_CTA_INNER}>What we built</span>
        </span>
        <h2 className="text-[36px] font-medium -tracking-[0.04em] leading-[1.05em] text-white max-md:text-2xl">
          Every surface, considered.
        </h2>
      </div>

      <div className="mt-8 grid w-full grid-cols-3 gap-5 max-md:grid-cols-2 max-sm:grid-cols-1">
        {features.map((f) => (
          <article key={f.title} className="glass-card flex flex-col gap-3 p-5">
            <span className="work-icon-tile">
              <CheckIcon />
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="text-[16px] font-medium text-white -tracking-[0.01em]">
                {f.title}
              </h3>
              <p className="text-[13px] leading-[1.5em] text-white/65">
                {f.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
