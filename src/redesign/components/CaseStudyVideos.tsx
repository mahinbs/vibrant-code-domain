import { useState, type CSSProperties } from "react";

/**
 * YouTube case-study videos for the homepage — customers see real automations
 * in action. Click-to-play facade: only a thumbnail loads up front; the iframe
 * is injected on tap, so the landing page stays fast.
 */

type CaseVideo = {
  id: string;
  title: string;
  tag: string;
  /** YouTube Short (vertical 9:16) vs regular 16:9. */
  vertical?: boolean;
};

const VIDEOS: CaseVideo[] = [
  { id: "c1Bg46GO9PU", title: "Automation case study", tag: "Case study" },
  { id: "cXhRjw1myAo", title: "Automation case study", tag: "Case study" },
  { id: "okVZBouBuZ4", title: "Automation in 60 seconds", tag: "Quick look", vertical: true },
];

const GRID_OVERLAY: CSSProperties = {
  backgroundImage:
    "linear-gradient(rgba(120,145,220,.10) 1px, transparent 1px), linear-gradient(90deg, rgba(120,145,220,.10) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
};

function VideoCard({ video }: { video: CaseVideo }) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
  const embed = `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&playsinline=1`;

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-[16px] border border-white/12 p-2.5 transition-colors hover:border-white/25"
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.5) 100%)",
        boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
      }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 opacity-40" style={GRID_OVERLAY} />
      <div
        className={[
          "relative z-[1] w-full overflow-hidden rounded-[10px] border border-white/10 bg-black",
          video.vertical ? "aspect-[9/16]" : "aspect-video",
        ].join(" ")}
      >
        {playing ? (
          <iframe
            src={embed}
            title={video.title}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play: ${video.title}`}
            className="absolute inset-0 h-full w-full"
          >
            <img
              src={thumb}
              alt={video.title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/10" />
            {/* Play button */}
            <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/60 backdrop-blur-[4px] transition-transform group-hover:scale-110">
              <span className="ml-1 inline-block border-y-[11px] border-l-[18px] border-y-transparent border-l-white" />
            </span>
            <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white/85 backdrop-blur-[5px]">
              <span className="size-1.5 rounded-full bg-[#ff4d4d]" />
              {video.tag}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

export function CaseStudyVideos() {
  return (
    <section
      id="case-studies"
      className="relative flex w-full max-w-[1920px] flex-col gap-4 overflow-x-hidden px-5 py-16 md:px-10 md:py-24"
      style={{
        background:
          "radial-gradient(50% 40% at 50% 30%, var(--color-dark-purple) 0%, rgba(0,0,0,0) 100%)",
      }}
    >
      <div className="relative z-[1] w-full overflow-visible">
        <p
          aria-hidden
          className="pointer-events-none absolute left-0 top-[40%] z-0 hidden w-full max-w-none -translate-y-1/2 select-none text-left font-bold uppercase leading-[0.88] tracking-[0.02em] opacity-[0.3] md:block"
          style={{
            fontSize: "clamp(2.5rem, min(12vw, 11rem), 11rem)",
            backgroundImage:
              "linear-gradient(180deg, rgb(140, 178, 255) 0%, rgb(88, 132, 255) 28%, rgb(48, 88, 210) 58%, rgb(18, 32, 72) 88%, rgb(8, 14, 36) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          CASE STUDIES
        </p>

        <div className="relative z-[2] ml-auto flex max-w-[680px] flex-col items-end gap-5 pt-1 text-right md:mt-[clamp(2.75rem,9vw,6.5rem)] max-md:items-start max-md:text-left">
          <h2 className="text-[44px] font-medium -tracking-[0.04em] leading-[1.05em] text-white max-md:text-3xl">
            Watch how it <span className="impact-highlight">actually works</span>.
          </h2>
          <p className="max-w-[540px] text-lg text-white/60 max-md:text-base">
            Real automations we&apos;ve built, on video — so you can see exactly what
            your business gets before you book the audit.
          </p>
        </div>
      </div>

      <div className="relative z-[1] grid w-full grid-cols-[1fr_1fr_minmax(0,320px)] items-start gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {VIDEOS.map((v) => (
          <VideoCard key={v.id} video={v} />
        ))}
      </div>
    </section>
  );
}
