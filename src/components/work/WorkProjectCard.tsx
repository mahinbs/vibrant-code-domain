import { Link } from "react-router-dom";
import type { WorkProject } from "@/data/workMock";
import { WORK_PRIMARY_GLOSS_CTA_H10, WORK_PRIMARY_GLOSS_CTA_INNER } from "./primitives/ctaStyles";
import { ArrowRightIcon } from "./primitives/icons";

type Props = {
  project: WorkProject;
};

export function WorkProjectCard({ project }: Props) {
  return (
    <article className="group glass-card relative flex h-full flex-col overflow-hidden transition-transform hover:-translate-y-1">
      <div className="relative h-[200px] w-full overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 z-0"
          style={{ background: project.fallbackGradient }}
        />
        {project.cardImage ? (
          <img
            src={project.cardImage}
            alt={project.title}
            loading="lazy"
            className="absolute inset-0 z-[1] h-full w-full object-cover opacity-80 mix-blend-luminosity transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : null}
        <div
          aria-hidden
          className="absolute inset-0 z-[2]"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.65) 100%)",
          }}
        />
        <div className="absolute left-4 top-4 z-[3]">
          <span className="rounded-full border border-white/15 bg-black/55 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/85 backdrop-blur-[3px]">
            {project.industry}
          </span>
        </div>
        <div className="absolute bottom-3 left-4 z-[3] flex items-center gap-2 text-[11px] text-white/70">
          <span>{project.client}</span>
          <span className="size-1 rounded-full bg-white/40" aria-hidden />
          <span>{project.year}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex flex-col gap-2">
          <h3 className="text-[18px] font-medium -tracking-[0.01em] text-white">
            {project.title}
          </h3>
          <p className="text-[13px] leading-[1.5em] text-white/65">{project.outcome}</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] font-medium text-white/65"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between">
          <Link to={`/work/${project.slug}`} className={WORK_PRIMARY_GLOSS_CTA_H10}>
            <span className={WORK_PRIMARY_GLOSS_CTA_INNER}>View case study</span>
            <ArrowRightIcon
              className={`${WORK_PRIMARY_GLOSS_CTA_INNER} size-3.5 transition-transform group-hover/btn:translate-x-0.5`}
            />
          </Link>
          <span className="text-[11px] uppercase tracking-[0.08em] text-white/45">
            {project.timeline}
          </span>
        </div>
      </div>
    </article>
  );
}
