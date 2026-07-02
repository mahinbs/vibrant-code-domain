import type { CSSProperties, ReactNode } from "react";
import { LazyVideo } from "./LazyVideo";

type MockupBandProps = {
  id?: string;
  src: string;
  poster: string;
  eyebrow: string;
  title: ReactNode;
  text: string;
  /** Put the video on the left instead of the right. */
  reverse?: boolean;
  /** Compact single-column layout for narrow sidebars. */
  variant?: "full" | "sidebar";
};

const GRID_OVERLAY: CSSProperties = {
  backgroundImage:
    "linear-gradient(rgba(120,145,220,.10) 1px, transparent 1px), linear-gradient(90deg, rgba(120,145,220,.10) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
};

function MockupVideo({
  src,
  poster,
  compact,
}: {
  src: string;
  poster: string;
  compact?: boolean;
}) {
  return (
    <div
      className={[
        "relative overflow-hidden border border-white/12",
        compact ? "rounded-[14px] p-2" : "rounded-[18px] p-2.5",
      ].join(" ")}
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.5) 100%)",
        boxShadow: compact ? "0 16px 40px rgba(0,0,0,0.4)" : "0 24px 60px rgba(0,0,0,0.45)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-40"
        style={GRID_OVERLAY}
      />
      <div className="relative z-[1] overflow-hidden rounded-[10px] border border-white/10">
        <LazyVideo src={src} poster={poster} className="aspect-video w-full object-cover" />
      </div>
    </div>
  );
}

export function MockupBand({
  id,
  src,
  poster,
  eyebrow,
  title,
  text,
  reverse,
  variant = "full",
}: MockupBandProps) {
  if (variant === "sidebar") {
    return (
      <div id={id} className="flex h-full min-w-0 w-full flex-col gap-4">
        <div className="shrink-0">
          <p className="mb-2 inline-flex w-fit items-center rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-purple backdrop-blur-[5px]">
            {eyebrow}
          </p>
          <h2 className="text-[22px] font-medium -tracking-[0.04em] leading-[1.1em] text-white lg:text-[26px]">
            {title}
          </h2>
          <p className="mt-2 text-[13px] leading-[1.5] text-white/65">{text}</p>
        </div>
        <div className="mt-auto shrink-0">
          <MockupVideo src={src} poster={poster} compact />
        </div>
      </div>
    );
  }

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
          <MockupVideo src={src} poster={poster} />
        </div>
      </div>
    </section>
  );
}
