import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

type RenderPhase = 1 | 2 | 3;

type ProgressiveRenderResult = {
  phase: RenderPhase;
  sentinelRef: RefObject<HTMLDivElement>;
};

type ProgressiveRenderOptions = {
  phase2DelayMs?: number;
  phase2IdleTimeoutMs?: number;
  phase3RootMargin?: string;
  phase3TimeoutMs?: number;
};

/**
 * Progressive 3-phase rendering:
 * 1) Critical above-the-fold shell
 * 2) Deferred hero/decorative effects after first paint/idle
 * 3) Below-the-fold content when visible (or timeout fallback)
 */
export function useProgressiveRender(
  options: ProgressiveRenderOptions = {}
): ProgressiveRenderResult {
  const {
    phase2DelayMs = 2200,
    phase2IdleTimeoutMs = 2400,
    phase3RootMargin = "320px 0px",
    phase3TimeoutMs = 12000,
  } = options;

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
        .requestIdleCallback(() => {
          window.setTimeout(promotePhase2, phase2DelayMs);
        }, { timeout: phase2IdleTimeoutMs });
    } else {
      window.setTimeout(promotePhase2, phase2DelayMs);
    }

    return () => {
      cancelled = true;
    };
  }, [phase2DelayMs, phase2IdleTimeoutMs]);

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
      { rootMargin: phase3RootMargin, threshold: 0.01 }
    );

    observer.observe(el);
    const timeoutId = window.setTimeout(promotePhase3, phase3TimeoutMs);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeoutId);
    };
  }, [phase3RootMargin, phase3TimeoutMs]);

  return { phase, sentinelRef };
}

