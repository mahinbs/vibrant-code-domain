import { useEffect, useRef, useState } from "react";

type LazyVideoProps = {
  src: string;
  poster: string;
  className?: string;
};

/**
 * Performance-first looping mockup video:
 * - `preload="none"` + the real `src` is only attached once the element nears
 *   the viewport (no bytes fetched on initial page load).
 * - Plays only while visible and pauses when scrolled away, so off-screen
 *   videos never decode frames — keeps the landing page smooth.
 */
export function LazyVideo({ src, poster, className }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          const p = el.play();
          if (p && typeof p.catch === "function") p.catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.25, rootMargin: "150px 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      src={shouldLoad ? src : undefined}
      muted
      loop
      autoPlay
      playsInline
      preload="none"
      disablePictureInPicture
      controls={false}
      aria-hidden="true"
    />
  );
}
