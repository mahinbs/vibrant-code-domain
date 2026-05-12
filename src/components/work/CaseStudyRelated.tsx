import type { WorkProject } from "@/data/workMock";
import { WORK_PRIMARY_GLOSS_CTA_INNER, WORK_SECTION_GLOSS_BADGE } from "./primitives/ctaStyles";
import { WorkProjectCard } from "./WorkProjectCard";

type Props = {
  projects: WorkProject[];
};

export function CaseStudyRelated({ projects }: Props) {
  if (projects.length === 0) return null;

  return (
    <section className="relative w-full px-10 pt-[80px] pb-6 max-md:px-5 max-md:pt-12">
      <div className="flex max-w-[680px] flex-col gap-3">
        <span className={`${WORK_SECTION_GLOSS_BADGE} self-start`}>
          <span className={WORK_PRIMARY_GLOSS_CTA_INNER}>More work</span>
        </span>
        <h2 className="text-[36px] font-medium -tracking-[0.04em] leading-[1.05em] text-white max-md:text-2xl">
          Keep exploring.
        </h2>
      </div>

      <div className="mt-8 grid w-full grid-cols-3 gap-5 max-md:grid-cols-2 max-sm:grid-cols-1">
        {projects.map((p) => (
          <WorkProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}
