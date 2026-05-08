import { testimonials } from "../data/testimonials";
import { StarIcon } from "./icons";

export function Testimonial() {
  return (
    <section className="w-full max-w-[min(1920px,96vw)] pt-[120px] px-10 pb-10 flex flex-col items-center gap-12 max-md:pt-20 max-md:px-5">
      <div className="flex flex-col items-center gap-5 text-center max-w-[640px]">
        <div className="inline-flex items-center gap-1.5 bg-black/60 border border-white/15 rounded-full py-2 px-3.5 backdrop-blur-[5px] text-[12px] font-medium text-purple uppercase tracking-[0.08em] w-fit">
          Voices
        </div>
        <h2 className="text-[44px] font-medium -tracking-[0.04em] leading-[1.05em] text-white max-md:text-3xl">
          Loved by founders & operators.
        </h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center text-[#ffd166]">
            <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
          </div>
          <span className="text-sm font-medium text-white">4.9/5</span>
          <span className="text-sm text-white/50">from 500+ reviews</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5 w-full max-md:grid-cols-1">
        {testimonials.map((t, i) => (
          <article
            key={i}
            className="relative flex flex-col gap-5 p-7 rounded-[14px] border border-white/12 overflow-hidden"
            style={{
              background:
                i === 1
                  ? "radial-gradient(120% 100% at 50% 0%, rgba(72,118,255,0.42), rgba(0,0,0,0.85) 65%)"
                  : "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.5) 100%)",
            }}
          >
            <div className="flex items-center text-[#ffd166] gap-0.5">
              <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
            </div>

            <p className="text-base font-normal text-white/90 leading-[1.5em] -tracking-[0.005em]">
              "{t.quote}"
            </p>

            <span className="self-start text-[12px] font-medium text-purple px-2.5 py-1 rounded-full border border-purple/40 bg-purple/15">
              {t.metric}
            </span>

            <div className="flex items-center gap-3 pt-2 mt-auto border-t border-white/10">
              <div
                className="size-10 rounded-full border border-white/15 flex items-center justify-center text-sm font-semibold text-white"
                style={{
                  background:
                    "radial-gradient(120% 100% at 50% 0%, rgba(96,142,255,0.42), rgba(72,118,255,0.35), rgba(0,0,0,0.6))",
                }}
              >
                {t.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-white">{t.name}</span>
                <span className="text-[12px] text-white/55">{t.role}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
