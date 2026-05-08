import { forwardRef } from "react";
import type { WorkProject } from "@/data/workMock";
import { serviceMeta, type ServiceId } from "./primitives/serviceMeta";
import { WorkProjectCard } from "./WorkProjectCard";

type Props = {
  serviceId: ServiceId;
  projects: WorkProject[];
  /** True if this section is the focused one (deep-linked from homepage). */
  isFocused?: boolean;
};

export const WorkCategorySection = forwardRef<HTMLElement, Props>(
  function WorkCategorySection({ serviceId, projects, isFocused }, ref) {
    const meta = serviceMeta[serviceId];
    const Icon = meta.icon;

    if (projects.length === 0) {
      return (
        <section
          ref={ref}
          id={`work-${serviceId}`}
          aria-label={meta.title}
          className="relative w-full px-10 pt-[80px] pb-6 max-md:px-5 max-md:pt-12"
        >
          <SectionHeader meta={meta} Icon={Icon} count={0} isFocused={isFocused} />
          <div className="glass-card mt-6 flex flex-col items-center gap-2 px-6 py-12 text-center">
            <p className="text-base text-white/75">
              We're cooking up case studies for {meta.title.toLowerCase()}.
            </p>
            <p className="text-sm text-white/55">
              Reach out to see private work and references from this practice.
            </p>
          </div>
        </section>
      );
    }

    return (
      <section
        ref={ref}
        id={`work-${serviceId}`}
        aria-label={meta.title}
        className="relative w-full overflow-x-hidden px-10 pt-[80px] pb-6 max-md:px-5 max-md:pt-12"
      >
        <div className="relative w-full overflow-visible">
          <p
            aria-hidden
            className="work-watermark pointer-events-none absolute right-0 top-[50%] z-0 w-full max-w-none -translate-y-1/2 select-none text-right max-md:top-[40%]"
          >
            {meta.watermark}
          </p>

          <div className="relative z-[2] flex max-w-[680px] flex-col gap-3 pt-1">
            <SectionHeader meta={meta} Icon={Icon} count={projects.length} isFocused={isFocused} />
          </div>
        </div>

        <div className="mt-8 grid w-full grid-cols-3 gap-5 max-md:grid-cols-2 max-sm:grid-cols-1">
          {projects.map((p) => (
            <WorkProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>
    );
  },
);

function SectionHeader({
  meta,
  Icon,
  count,
  isFocused,
}: {
  meta: { title: string; blurb: string };
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  count: number;
  isFocused?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <span className="work-icon-tile">
          <Icon />
        </span>
        <div className="flex flex-col">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/55">
            {count} {count === 1 ? "project" : "projects"}
            {isFocused ? " · Focused" : ""}
          </span>
          <h2 className="text-[32px] font-medium -tracking-[0.02em] leading-[1.1em] text-white max-md:text-2xl">
            {meta.title}
          </h2>
        </div>
      </div>
      <p className="max-w-[560px] text-[15px] leading-[1.5em] text-white/65">
        {meta.blurb}
      </p>
    </div>
  );
}
