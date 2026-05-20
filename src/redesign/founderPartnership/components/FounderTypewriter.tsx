import { useEffect, useState } from "react";

export const FOUNDER_HERO_TYPEWRITER_KEY = "founder_hero_typewriter_done";
export const FOUNDER_HERO_TYPEWRITER_SPEED = 45;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function hasHeroTypewriterPlayed(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(FOUNDER_HERO_TYPEWRITER_KEY) === "1";
}

export function markHeroTypewriterPlayed() {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(FOUNDER_HERO_TYPEWRITER_KEY, "1");
}

type Props = {
  text: string;
  /** ms per character */
  speed?: number;
  className?: string;
  onComplete?: () => void;
  startDelay?: number;
  /** If set, skip animation when session key is already set */
  playOnceKey?: string;
};

export function FounderTypewriter({
  text,
  speed = FOUNDER_HERO_TYPEWRITER_SPEED,
  className = "",
  onComplete,
  startDelay = 0,
  playOnceKey,
}: Props) {
  const skipAnimation =
    prefersReducedMotion() || (playOnceKey ? hasHeroTypewriterPlayed() : false);

  const [display, setDisplay] = useState(skipAnimation ? text : "");

  useEffect(() => {
    if (skipAnimation) {
      setDisplay(text);
      onComplete?.();
      return;
    }

    let cancelled = false;
    let intervalId: number | undefined;
    const startTimer = window.setTimeout(() => {
      let i = 0;
      setDisplay("");
      intervalId = window.setInterval(() => {
        if (cancelled) return;
        i += 1;
        setDisplay(text.slice(0, i));
        if (i >= text.length) {
          window.clearInterval(intervalId);
          if (playOnceKey) markHeroTypewriterPlayed();
          onComplete?.();
        }
      }, speed);
    }, startDelay);

    return () => {
      cancelled = true;
      window.clearTimeout(startTimer);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [text, speed, startDelay, onComplete, playOnceKey, skipAnimation]);

  return (
    <span className={className} aria-live="polite">
      {display}
      {!skipAnimation && display.length < text.length ? (
        <span className="founder-typewriter-caret" aria-hidden />
      ) : null}
    </span>
  );
}
