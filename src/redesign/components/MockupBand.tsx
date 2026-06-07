import type { CSSProperties } from "react";
import { LazyVideo } from "./LazyVideo";

type MockupBandProps = {
  id?: string;
  src: string;
  poster: string;
  eyebrow: string;
  title: string;
  text: string;
  /** Put the video on the left instead of the right. */
  reverse?: boolean;
};

const GRID_OVERLAY: CSSProperties = {
  backgroundImage:
    "linear-gradient(rgba(120,145,220,.10) 1px, transparent 1px), linear-gradient(90deg, rgba(120,145,220,.10) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
};

export function MockupBand({ id, src, poster, eyebrow, title, text, reverse }: MockupBandProps) {
  return (
    <section
      id={id}
      className="relative mx-auto flex w-full max-w-[1180px] flex-col px-5 py-14 md:px-10 md:py-20"
    >
      <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
        {/* Copy */}
        <div className={reverse ? "md:order-2" : ""}>
          <p className="mb-3 inline-flex w-fit items-center rounded-full border border-white/15 bg-black/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.1em] text-purple backdrop-blur-[5px]">
            {eyebrow}
          </p>
          <h2 className="text-[30px] font-medium -tracking-[0.04em] leading-[1.05em] text-white md:text-[40px]">
            {title}
          </h2>
          <p className="mt-4 max-w-[460px] text-lg leading-[1.5] text-white/65 max-md:text-base">
            {text}
          </p>
        </div>

        {/* Video */}
        <div className={reverse ? "md:order-1" : ""}>
          <div
            className="relative overflow-hidden rounded-[18px] border border-white/12 p-2.5"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.5) 100%)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-0 opacity-40"
              style={GRID_OVERLAY}
            />
            <div className="relative z-[1] overflow-hidden rounded-[12px] border border-white/10">
              <LazyVideo
                src={src}
                poster={poster}
                className="aspect-video w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
