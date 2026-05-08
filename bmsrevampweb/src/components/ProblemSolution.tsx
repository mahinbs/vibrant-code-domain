import { problems } from "../data/problems";

export function ProblemSolution() {
  return (
    <section className="w-full max-w-[min(1500px,96vw)] pt-[120px] px-10 pb-10 flex flex-col items-center gap-12 max-md:pt-20 max-md:px-5">
      <div className="flex flex-col items-center gap-5 text-center max-w-[640px]">
        <div className="inline-flex items-center gap-1.5 bg-black/60 border border-white/15 rounded-full py-2 px-3.5 backdrop-blur-[5px] text-[12px] font-medium text-purple uppercase tracking-[0.08em] w-fit">
          The challenge
        </div>
        <h2 className="text-[44px] font-medium -tracking-[0.04em] leading-[1.05em] text-white max-md:text-3xl">
          Tech holding your business back?
          <br />
          <span className="text-white/60">We've fixed it 500+ times.</span>
        </h2>
        <p className="text-base text-white/60 max-w-[520px]">
          Hover any card to see the way out.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-5 w-full max-md:grid-cols-2 max-sm:grid-cols-1">
        {problems.map((p, i) => (
          <FlipCard key={i} problem={p.problem} solution={p.solution} />
        ))}
      </div>
    </section>
  );
}

function FlipCard({
  problem,
  solution,
}: {
  problem: string;
  solution: string;
}) {
  return (
    <div className="group relative h-[200px] [perspective:1000px]">
      <div className="relative size-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]">
        {/* Front */}
        <div
          className="absolute inset-0 [backface-visibility:hidden] rounded-[14px] border border-white/15 p-6 flex flex-col justify-between bg-black/40 backdrop-blur-[3px]"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.5) 100%)",
          }}
        >
          <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/40">
            Problem
          </span>
          <p className="text-xl font-medium -tracking-[0.01em] leading-[1.25em] text-white">
            {problem}
          </p>
          <span className="text-[12px] text-white/50">
            Hover to see solution
          </span>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-[14px] border border-purple/40 p-6 flex flex-col justify-between"
          style={{
            background:
              "radial-gradient(120% 100% at 0% 0%, rgba(72,118,255,0.5), rgba(6,10,22,0.95) 70%)",
          }}
        >
          <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white">
            Solution
          </span>
          <p className="text-xl font-medium -tracking-[0.01em] leading-[1.25em] text-white">
            {solution}
          </p>
          <span className="text-[12px] text-white/70">By Boostmysites</span>
        </div>
      </div>
    </div>
  );
}
