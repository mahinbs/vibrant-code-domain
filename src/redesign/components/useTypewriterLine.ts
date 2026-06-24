import { useEffect, useState } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useTypewriterLine(
  text: string,
  enabled: boolean,
  speed = 30,
  onComplete?: () => void,
) {
  const [display, setDisplay] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setDisplay("");
      setDone(false);
      return;
    }

    if (prefersReducedMotion()) {
      setDisplay(text);
      setDone(true);
      onComplete?.();
      return;
    }

    let cancelled = false;
    let i = 0;
    setDisplay("");
    setDone(false);

    const intervalId = window.setInterval(() => {
      if (cancelled) return;
      i += 1;
      setDisplay(text.slice(0, i));
      if (i >= text.length) {
        window.clearInterval(intervalId);
        setDone(true);
        onComplete?.();
      }
    }, speed);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, [text, enabled, speed, onComplete]);

  return { display, done };
}
