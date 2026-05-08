import type { TechStackGroup } from "@/data/workMock";

type Props = {
  groups: TechStackGroup[];
};

export function CaseStudyTechStack({ groups }: Props) {
  return (
    <section className="relative w-full px-10 pt-[80px] pb-6 max-md:px-5 max-md:pt-12">
      <div className="flex max-w-[680px] flex-col gap-3">
        <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-[color:var(--wk-bright)] backdrop-blur-[5px]">
          Tech stack
        </span>
        <h2 className="text-[36px] font-medium -tracking-[0.04em] leading-[1.05em] text-white max-md:text-2xl">
          What's under the hood.
        </h2>
      </div>

      <div className="mt-8 grid w-full grid-cols-2 gap-5 max-md:grid-cols-1">
        {groups.map((g) => (
          <div key={g.category} className="glass-card flex items-start gap-5 p-5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45 min-w-[88px]">
              {g.category}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {g.technologies.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-white/12 bg-white/5 px-2 py-1 text-[12px] font-medium text-white/80"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
