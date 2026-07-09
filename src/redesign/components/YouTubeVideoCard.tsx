import { useState, type CSSProperties, type ReactNode } from "react";
import type { AutomationCaseVideo } from "../data/automationCaseStudyVideos";

const GRID_OVERLAY: CSSProperties = {
  backgroundImage:
    "linear-gradient(rgba(120,145,220,.10) 1px, transparent 1px), linear-gradient(90deg, rgba(120,145,220,.10) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
};

export type YouTubeVideoCardProps = {
  video: Pick<AutomationCaseVideo, "id" | "title" | "tag" | "aspect">;
  className?: string;
  /** Render copy above the player (case study page). */
  header?: ReactNode;
  compact?: boolean;
};

function VideoPlayerShell({
  video,
  compact,
}: {
  video: Pick<AutomationCaseVideo, "id" | "title" | "tag" | "aspect">;
  compact?: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const vertical = video.aspect === "9:16";
  const thumb = `https://i.ytimg.com/vi/${video.id}/${vertical ? "hq2" : "hqdefault"}.jpg`;
  const embed = `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&playsinline=1`;

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-[16px] border border-white/12 p-2.5 transition-colors hover:border-white/25"
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.5) 100%)",
        boxShadow: compact ? "0 8px 24px rgba(0,0,0,0.35)" : "0 16px 40px rgba(0,0,0,0.4)",
      }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 opacity-40" style={GRID_OVERLAY} />
      <div
        className={[
          "relative z-[1] w-full overflow-hidden rounded-[10px] border border-white/10 bg-black",
          vertical ? "aspect-[9/16]" : "aspect-video",
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
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/10" />
            <span
              className={[
                "absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/60 backdrop-blur-[4px] transition-transform group-hover:scale-110",
                compact ? "size-12" : "size-14 md:size-16",
              ].join(" ")}
            >
              <span
                className={[
                  "ml-1 inline-block border-y-transparent border-l-white",
                  compact
                    ? "border-y-[8px] border-l-[14px]"
                    : "border-y-[10px] border-l-[16px] md:border-y-[11px] md:border-l-[18px]",
                ].join(" ")}
              />
            </span>
            <span className="absolute left-3 top-3 inline-flex max-w-[calc(100%-1.5rem)] items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white/85 backdrop-blur-[5px]">
              <span className="size-1.5 shrink-0 rounded-full bg-[#ff4d4d]" />
              <span className="truncate">{video.tag}</span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

export function YouTubeVideoCard({ video, className = "", header, compact }: YouTubeVideoCardProps) {
  return (
    <article className={["flex flex-col gap-4", className].join(" ")}>
      {header}
      <VideoPlayerShell video={video} compact={compact} />
    </article>
  );
}

type CaseStudyVideoHeaderProps = {
  video: AutomationCaseVideo;
  size?: "default" | "compact";
};

export function CaseStudyVideoHeader({ video, size = "default" }: CaseStudyVideoHeaderProps) {
  const compact = size === "compact";

  return (
    <header className="flex flex-col gap-2.5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-white/12 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-white/55">
          {video.industry}
        </span>
        {video.workflowsAutomated ? (
          <span className="rounded-full border border-purple/35 bg-purple/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-purple">
            {video.workflowsAutomated} workflows automated
          </span>
        ) : null}
      </div>
      <h3
        className={[
          "font-medium leading-snug text-white",
          compact ? "text-[14px] md:text-[15px]" : "text-[18px] md:text-[22px]",
        ].join(" ")}
      >
        {video.title}
      </h3>
      <p
        className={[
          "leading-relaxed text-white/60",
          compact ? "text-[12px] md:text-[13px]" : "text-[14px] md:text-[15px]",
        ].join(" ")}
      >
        {video.description}
      </p>
      {video.outcomeLabel ? (
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-medium text-emerald-300">
          <span aria-hidden>✓</span>
          {video.outcomeLabel}
        </span>
      ) : null}
    </header>
  );
}

/** Shorts row: video first, tight caption footer — less text clutter above the player. */
export function ShortCaseStudyCard({
  video,
  className = "",
}: {
  video: AutomationCaseVideo;
  className?: string;
}) {
  return (
    <article
      className={[
        "flex h-full flex-col overflow-hidden rounded-[16px] border border-white/10 bg-white/[0.02] transition-colors hover:border-white/20",
        className,
      ].join(" ")}
    >
      <div className="p-2 pb-0">
        <VideoPlayerShell video={video} compact />
      </div>
      <div className="flex flex-1 flex-col gap-2 px-3.5 py-3.5">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-white/45">
            {video.industry}
          </span>
          {video.workflowsAutomated ? (
            <>
              <span className="text-white/20" aria-hidden>
                ·
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-purple/90">
                {video.workflowsAutomated} workflows
              </span>
            </>
          ) : null}
        </div>
        <h3 className="line-clamp-2 text-[13px] font-medium leading-snug text-white">
          {video.title}
        </h3>
        {video.outcomeLabel ? (
          <span className="mt-auto inline-flex w-fit items-center gap-1 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
            <span aria-hidden>✓</span>
            {video.outcomeLabel}
          </span>
        ) : null}
      </div>
    </article>
  );
}
