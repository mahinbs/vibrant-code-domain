import { founder } from "../data/founder";
import { resolveForbesVideo } from "../lib/forbesVideo";

const IFRAME_CLASS = "h-full w-full border-0";

export function FounderVideoEmbed() {
  const resolved = resolveForbesVideo();

  if (resolved.kind === "mp4") {
    return (
      <video
        aria-label="Forbes interview with Mahin B S, founder of Boostmysites"
        className="h-full w-full bg-black object-cover"
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

  if (resolved.kind === "youtube") {
    return (
      <iframe
        title="Forbes interview"
        src={resolved.embedSrc}
        className={IFRAME_CLASS}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    );
  }

  if (resolved.kind === "iframe") {
    return (
      <iframe
        title="Forbes interview"
        src={resolved.src}
        className={IFRAME_CLASS}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    );
  }

  return null;
}
