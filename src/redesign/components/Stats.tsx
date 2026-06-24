import { stats, type Stat } from "../data/stats";

type StatsProps = {
  items?: readonly Stat[];
};

export function Stats({ items = stats }: StatsProps) {
  return (
    <section className="flex w-full max-w-[1920px] flex-col items-center pb-0 pt-[80px] max-md:px-5 max-md:pt-12">
      <div
        className="relative w-full overflow-hidden rounded-[16px] border border-white/15"
        style={{
          background:
            "radial-gradient(80% 120% at 50% 0%, rgba(22,36,74,0.58) 0%, rgba(0,0,0,0.9) 70%)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-repeat opacity-50 bg-[length:400px_auto]"
          style={{ backgroundImage: "url(/textures/stars.svg)" }}
        />
        <div
          className={[
            "relative z-[1] grid",
            items.length <= 4
              ? "grid-cols-4 max-md:grid-cols-2"
              : "grid-cols-5 max-lg:grid-cols-3 max-md:grid-cols-2",
          ].join(" ")}
        >
          {items.map((s) => (
            <div
              key={s.label}
              className={[
                "flex flex-col items-center justify-center text-center p-8 gap-2 border border-white/10",
              ].join(" ")}
            >
              <span className="text-[44px] font-medium -tracking-[0.04em] leading-none text-white max-md:text-3xl">
                {s.value}
              </span>
              <span className="text-sm font-medium text-white/85">
                {s.label}
              </span>
              {s.sublabel ? (
                <span className="text-[12px] text-white/50">{s.sublabel}</span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
