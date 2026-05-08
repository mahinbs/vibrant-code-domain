import { stats } from "../data/stats";

export function Stats() {
  return (
    <section className="w-full max-w-[min(1600px,96vw)] pt-[80px] pb-0 flex flex-col items-center max-md:pt-12 max-md:px-5">
      <div
        className="relative w-full rounded-[16px] border border-white/15 overflow-hidden"
        style={{
          background:
            "radial-gradient(80% 120% at 50% 0%, rgba(22,36,74,0.58) 0%, rgba(0,0,0,0.9) 70%)",
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-50 bg-repeat bg-[length:400px_auto]"
          style={{ backgroundImage: "url(/textures/stars.svg)" }}
        />
        <div className="relative z-[1] grid grid-cols-5 max-lg:grid-cols-3 max-md:grid-cols-2">
          {stats.map((s) => (
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
