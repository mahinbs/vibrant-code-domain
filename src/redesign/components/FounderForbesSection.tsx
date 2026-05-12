import { founder } from "../data/founder";
import { resolveForbesVideo } from "../lib/forbesVideo";
import { primaryCta } from "../data/site";
import { workUrl } from "../lib/mainSiteWorkUrl";

function FounderVideoEmbed() {
  const resolved = resolveForbesVideo();

  if (resolved?.kind === "mp4") {
    return (
      <video
        className="absolute inset-0 size-full bg-black object-cover"
        controls
        playsInline
        preload="metadata"
        poster={founder.imageSrc}
      >
        <source src={resolved.src} type="video/mp4" />
        Your browser does not support embedded video.
      </video>
    );
  }

  if (resolved?.kind === "youtube") {
    return (
      <iframe
        title="Forbes interview"
        src={resolved.embedSrc}
        className="absolute inset-0 size-full border-0 bg-black"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    );
  }

  if (resolved?.kind === "iframe") {
    return (
      <iframe
        title="Forbes interview"
        src={resolved.src}
        className="absolute inset-0 size-full border-0 bg-black"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    );
  }

  return (
    <div className="flex h-full min-h-[160px] flex-col items-center justify-center gap-2 p-4 text-center lg:min-h-[200px] lg:p-6">
      <div className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-medium text-white/55 lg:text-xs">
        Video placeholder
      </div>
      <p className="max-w-[220px] text-[11px] leading-snug text-white/40 lg:max-w-none lg:text-xs">
        Add{" "}
        <code className="rounded bg-white/10 px-1 py-0.5 text-[10px] text-white/65">
          VITE_FORBES_VIDEO
        </code>{" "}
        or{" "}
        <code className="rounded bg-white/10 px-1 py-0.5 text-[10px] text-white/65">
          VITE_FORBES_VIDEO_MP4
        </code>{" "}
        in <code className="rounded bg-white/10 px-1 py-0.5 text-[10px] text-white/65">.env</code>
      </p>
      <a
        href={workUrl()}
        rel="noopener"
        className="text-[11px] font-medium text-purple hover:text-white lg:text-xs"
      >
        Portfolio →
      </a>
    </div>
  );
}

export function FounderForbesSection() {
  return (
    <section
      id="founder"
      className="relative flex w-full max-w-[1920px] flex-col gap-4 overflow-x-hidden px-5 py-16 md:px-10 md:py-24"
      style={{
        background:
          "radial-gradient(50% 40% at 50% 30%, var(--color-dark-purple) 0%, rgba(0,0,0,0) 100%)",
      }}
    >
      {/* Display watermark only (no secondary headline / intro) */}
      <div className="relative z-[1] w-full min-h-[clamp(160px,24vw,260px)] overflow-visible">
        <p
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[40%] z-0 w-full max-w-none -translate-y-1/2 select-none text-right font-bold uppercase leading-[0.88] tracking-[0.02em] opacity-[0.32] max-md:top-[36%] max-md:opacity-[0.26]"
          style={{
            fontSize: "clamp(2.5rem, min(12vw, 11rem), 11rem)",
            backgroundImage:
              "linear-gradient(180deg, rgb(140, 178, 255) 0%, rgb(88, 132, 255) 28%, rgb(48, 88, 210) 58%, rgb(18, 32, 72) 88%, rgb(8, 14, 36) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          MEET OUR FOUNDER
        </p>
      </div>

      {/* One horizontal band: quote | photo | video */}
      <div className="relative z-[1] overflow-hidden rounded-[20px] border border-white/12 bg-[#0a0a0c]">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(240px,340px)_minmax(0,1.1fr)] lg:items-stretch">
          {/* 1 — Quote & CTAs */}
          <div className="flex flex-col justify-center gap-5 border-b border-white/10 p-8 max-md:order-1 lg:border-b-0 lg:border-r lg:p-10">
            <div className="inline-flex w-fit items-center rounded-full border border-white/20 bg-white px-3 py-1.5">
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-black">
                {founder.badge}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-semibold tracking-tight text-white lg:text-3xl">
                {founder.firstName} {founder.lastName}
              </p>
              <p className="text-base text-white/75 lg:text-lg">
                {founder.role}, {founder.company}
              </p>
            </div>
            <blockquote className="border-l-2 border-purple/80 pl-4 text-base leading-relaxed text-white/80 lg:text-lg">
              &ldquo;{founder.quote}&rdquo;
            </blockquote>
            <p className="text-sm leading-relaxed text-white/45">{founder.intro}</p>
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href="#founder-video"
                className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition-opacity hover:opacity-90"
              >
                Watch interview
              </a>
              <a
                href={primaryCta.href}
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/90 backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                Let&apos;s work together
              </a>
            </div>
          </div>

          {/* 2 — Portrait */}
          <div className="relative flex min-h-[300px] items-center justify-center border-b border-white/10 bg-gradient-to-br from-[#2a2d35] to-[#12141a] max-md:order-2 lg:min-h-0 lg:border-b-0 lg:border-r">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage: "url(/textures/grid.svg)",
                backgroundSize: "48px auto",
              }}
            />
            <div className="relative z-[1] aspect-[3/4] w-[min(100%,280px)] overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(72,118,255,0.15),transparent_55%)]" />
              <img
                src={founder.imageSrc}
                alt={founder.imageAlt}
                className="relative z-[1] size-full object-cover object-[center_15%]"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* 3 — Video */}
          <div
            id="founder-video"
            className="flex scroll-mt-24 flex-col justify-center gap-3 p-6 max-md:order-3 lg:p-8"
          >
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-purple">
                Forbes interview
              </p>
              <p className="mt-1 text-sm text-white/50">
                {founder.firstName} {founder.lastName}
              </p>
            </div>
            <div className="relative aspect-video w-full min-h-[180px] overflow-hidden rounded-xl border border-white/10 bg-[#111318] lg:min-h-0">
              <FounderVideoEmbed />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
