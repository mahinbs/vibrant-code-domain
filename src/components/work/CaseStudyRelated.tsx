import type { WorkProject } from "@/data/workMock";
import { WorkProjectCard } from "./WorkProjectCard";

type Props = {
  projects: WorkProject[];
};

export function CaseStudyRelated({ projects }: Props) {
  if (projects.length === 0) return null;

  return (
    <section className="relative w-full px-10 pt-[80px] pb-6 max-md:px-5 max-md:pt-12">
      <div className="flex max-w-[680px] flex-col gap-3">
        <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-[color:var(--wk-bright)] backdrop-blur-[5px]">
          More work
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
