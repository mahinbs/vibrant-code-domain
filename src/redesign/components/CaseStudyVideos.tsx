import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import { ArrowRightIcon } from "./icons";
import { YouTubeVideoCard } from "./YouTubeVideoCard";
import { homepageTeaserVideos } from "../data/automationCaseStudyVideos";

const GRID_OVERLAY: CSSProperties = {
  backgroundImage:
    "linear-gradient(rgba(120,145,220,.10) 1px, transparent 1px), linear-gradient(90deg, rgba(120,145,220,.10) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
};

export function CaseStudyVideos() {
  const videos = homepageTeaserVideos();

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
            Real automations we&apos;ve built, on video — so you can see exactly what your business
            gets before you book the audit.
          </p>
          <Link
            to="/automation-case-studies"
            className="inline-flex items-center gap-2 text-sm font-medium text-purple transition-colors hover:text-white"
          >
            View all case studies
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      </div>

      <div className="relative z-[1] grid w-full grid-cols-[1fr_1fr_minmax(0,320px)] items-start gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {videos.map((v) => (
          <YouTubeVideoCard key={v.id} video={v} />
        ))}
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 opacity-20" style={GRID_OVERLAY} />
    </section>
  );
}
