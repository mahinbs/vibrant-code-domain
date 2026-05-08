import { Link } from "react-router-dom";
import type { WorkProject } from "@/data/workMock";
import { serviceMeta } from "./primitives/serviceMeta";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ExternalLinkIcon,
} from "./primitives/icons";
import { WorkHeroFrame } from "./primitives/WorkHeroFrame";

type Props = {
  project: WorkProject;
};

export function CaseStudyHero({ project }: Props) {
  const meta = serviceMeta[project.serviceId];

  return (
    <section className="w-full px-10 pb-2 pt-[40px] max-md:px-5 max-md:pt-6">
      <WorkHeroFrame
        className="min-h-[760px] max-md:min-h-0"
        contentClassName="gap-10"
      >
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-[12px] text-white/55"
        >
          <Link
            to="/work"
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors hover:bg-white/5 hover:text-white"
          >
            <ArrowLeftIcon className="size-3.5" />
            Work
          </Link>
          <span className="text-white/30">/</span>
          <Link
            to={`/work?service=${project.serviceId}`}
            className="rounded-md px-2 py-1 transition-colors hover:bg-white/5 hover:text-white"
          >
            {meta.title}
          </Link>
          <span className="text-white/30">/</span>
          <span className="rounded-md px-2 py-1 text-white/85">{project.title}</span>
        </nav>

        <div className="grid grid-cols-12 gap-8 max-lg:grid-cols-1">
          <div className="col-span-7 flex flex-col justify-center gap-6 max-lg:col-span-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/15 bg-black/55 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/85">
                {project.industry}
              </span>
              <span className="rounded-full border border-white/15 bg-black/55 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[color:var(--wk-bright)]">
                {meta.shortLabel}
              </span>
            </div>

            <h1 className="max-w-[760px] text-[52px] font-medium -tracking-[0.04em] leading-[1.05em] text-white max-md:text-4xl">
              {project.title}
            </h1>

            <p className="max-w-[560px] text-lg text-white/65 max-md:text-base">
              {project.description}
            </p>

            <dl className="mt-2 grid grid-cols-4 gap-3 max-md:grid-cols-2">
              <MetaCell label="Client" value={project.client} />
              <MetaCell label="Timeline" value={project.timeline} />
              <MetaCell label="Team" value={project.team} />
              <MetaCell label="Year" value={project.year} />
            </dl>

            <div className="mt-2 flex flex-wrap items-center gap-3">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gloss group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-[10px] border border-[#4b78ff]/70 bg-[linear-gradient(180deg,#2f5eff_0%,#254dcf_100%)] px-5 text-[13px] font-semibold text-white shadow-[inset_0_0_8px_2px_rgba(255,255,255,0.18)] transition-opacity hover:opacity-95"
                >
                  <span className="relative z-[2]">Visit live site</span>
                  <ExternalLinkIcon className="relative z-[2] size-4" />
                </a>
              ) : null}
              <Link
                to="/contact"
                className="inline-flex h-12 items-center gap-2 rounded-[10px] border border-white/20 bg-black/55 px-5 text-[13px] font-semibold text-white/95 transition-colors hover:bg-black/70"
              >
                <span>Build me something similar</span>
                <ArrowRightIcon className="size-4" />
              </Link>
            </div>
          </div>

          <div className="col-span-5 max-lg:col-span-1">
            <div className="glass-card relative h-full min-h-[340px] overflow-hidden">
              <div
                aria-hidden
                className="absolute inset-0 z-0"
                style={{ background: project.fallbackGradient }}
              />
              {project.heroImage ? (
                <img
                  src={project.heroImage}
                  alt={project.title}
                  className="absolute inset-0 z-[1] h-full w-full object-cover opacity-90 mix-blend-luminosity"
                />
              ) : null}
              <div
                aria-hidden
                className="absolute inset-0 z-[2]"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.55) 100%)",
                }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-5 max-md:grid-cols-2">
          {project.topMetrics.map((metric) => (
            <div
              key={metric.label}
              className="glass-card flex flex-col items-start gap-1 px-5 py-6"
            >
              <span className="text-[40px] font-medium leading-none -tracking-[0.04em] text-gradient max-md:text-3xl">
                {metric.value}
              </span>
              <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-white/55">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </WorkHeroFrame>
    </section>
  );
}

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-card flex flex-col gap-1 px-4 py-3">
      <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/45">
        {label}
      </dt>
      <dd className="text-sm font-medium text-white">{value}</dd>
    </div>
  );
}
