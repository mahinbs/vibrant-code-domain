import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

type RenderPhase = 1 | 2 | 3;

type ProgressiveRenderResult = {
  phase: RenderPhase;
  sentinelRef: RefObject<HTMLDivElement>;
};

/**
 * Progressive 3-phase rendering:
 * 1) Critical above-the-fold shell
 * 2) Deferred hero/decorative effects after first paint/idle
 * 3) Below-the-fold content when visible (or timeout fallback)
 */
export function useProgressiveRender(): ProgressiveRenderResult {
  const [phase, setPhase] = useState<RenderPhase>(1);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    const promotePhase2 = () => {
      if (cancelled) return;
      setPhase((prev) => (prev >= 2 ? prev : 2));
    };

    if ("requestIdleCallback" in window) {
      (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number })
        .requestIdleCallback(promotePhase2, { timeout: 1200 });
    } else {
      window.setTimeout(promotePhase2, 700);
    }

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const promotePhase3 = () => {
      setPhase((prev) => (prev >= 3 ? prev : 3));
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        promotePhase3();
        observer.disconnect();
      },
      { rootMargin: "320px 0px", threshold: 0.01 }
    );

    observer.observe(el);
    const timeoutId = window.setTimeout(promotePhase3, 2600);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeoutId);
    };
  }, []);

  return { phase, sentinelRef };
}

