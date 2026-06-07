import { problems } from "../data/problems";
import { ArrowRightIcon } from "./icons";

export function ProblemSolution() {
  return (
    <section className="flex w-full max-w-[1920px] flex-col items-center gap-12 px-5 py-16 md:px-10 md:py-24">
      <div className="flex max-w-[640px] flex-col items-center gap-5 text-center">
        <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3.5 py-2 text-[12px] font-medium uppercase tracking-[0.08em] text-purple backdrop-blur-[5px]">
          The challenge
        </div>
        <h2 className="text-[36px] font-medium leading-[1.05] -tracking-[0.04em] text-white md:text-[44px]">
          You didn&apos;t start your business to babysit spreadsheets.
          <br />
          <span className="text-white/60">
            It&apos;s not a people problem — it&apos;s a systems problem. Here&apos;s where the week actually goes.
          </span>
        </h2>
      </div>

      <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
        {problems.map((p) => (
          <article
            key={p.problem}
            className="relative grid gap-4 rounded-[16px] border border-white/10 p-6 md:grid-cols-[1fr_auto_1fr] md:items-start md:gap-8 md:p-8"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.5) 100%)",
            }}
          >
            <div className="min-w-0">
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">
                The pain
              </span>
              <p className="mt-2 text-lg font-medium leading-snug text-white">
                {p.problem}
              </p>
            </div>

            <ArrowRightIcon
              aria-hidden
              className="hidden self-center size-5 text-purple/70 md:block"
            />

            {/* Mobile divider so the two halves read as separate even when stacked */}
            <div
              aria-hidden
              className="h-px w-full bg-white/10 md:hidden"
            />

            <div className="min-w-0">
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-purple">
                What we do
              </span>
              <p className="mt-2 text-base leading-relaxed text-white/80">
                {p.solution}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
