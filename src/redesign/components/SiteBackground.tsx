import { useEffect, useRef } from "react";

const GRID = 80;
const SQUARE_COUNT = 5;
const DROP_COUNT = 3;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function SiteBackground() {
  const squaresRef = useRef<HTMLDivElement>(null);
  const dropsRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const squaresWrap = squaresRef.current;
    const dropsWrap = dropsRef.current;
    if (!squaresWrap || !dropsWrap) return;

    const reduced = prefersReducedMotion();

    function maxCols() {
      return Math.max(1, Math.floor(window.innerWidth / GRID));
    }
    function maxRows() {
      return Math.max(1, Math.floor(window.innerHeight / GRID));
    }
    function randCell(cols: number) {
      return Math.floor(Math.random() * cols) * GRID;
    }
    function randRow(rows: number) {
      return Math.floor(Math.random() * rows) * GRID;
    }

    const squares: HTMLDivElement[] = [];
    for (let i = 0; i < SQUARE_COUNT; i++) {
      const el = document.createElement("div");
      el.className = "site-backdrop__square";
      squaresWrap.appendChild(el);
      squares.push(el);
    }

    function placeSquares() {
      const cols = maxCols();
      const rows = maxRows();
      for (const sq of squares) {
        sq.style.left = `${randCell(cols)}px`;
        sq.style.top = `${randRow(rows)}px`;
        sq.style.opacity = (0.35 + Math.random() * 0.55).toFixed(2);
      }
    }

    placeSquares();

    let interval: number | undefined;
    if (!reduced) {
      interval = window.setInterval(placeSquares, 2000) as unknown as number;
    }

    const dropHandlers: Array<{ el: HTMLDivElement; fn: (e: AnimationEvent) => void }> =
      [];

    function resetDrop(el: HTMLDivElement) {
      const cols = maxCols();
      const duration = `${2 + Math.random() * 2}s`;
      const delay = `${Math.random() * 2}s`;
      el.style.left = `${randCell(cols)}px`;
      el.style.animationDuration = duration;
      el.style.animationDelay = delay;
      el.style.animationName = "none";
      void el.offsetHeight;
      el.style.animationName = "site-backdrop-drop";
    }

    if (!reduced) {
      for (let i = 0; i < DROP_COUNT; i++) {
        const el = document.createElement("div");
        el.className = "site-backdrop__drop";
        const fn = (e: AnimationEvent) => {
          if (e.animationName !== "site-backdrop-drop") return;
          resetDrop(el);
        };
        el.addEventListener("animationend", fn);
        dropsWrap.appendChild(el);
        resetDrop(el);
        dropHandlers.push({ el, fn });
      }
    }

    const onResize = () => placeSquares();
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      if (interval) window.clearInterval(interval);
      window.removeEventListener("resize", onResize);
      for (const { el, fn } of dropHandlers) {
        el.removeEventListener("animationend", fn);
      }
      squaresWrap.replaceChildren();
      dropsWrap.replaceChildren();
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const spot = spotlightRef.current;
    if (!spot) return;

    const handler = (e: PointerEvent) => {
      spot.style.setProperty("--mx", `${e.clientX}px`);
      spot.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", handler, { passive: true });
    return () => window.removeEventListener("pointermove", handler);
  }, []);

  return (
    <div className="site-backdrop" aria-hidden>
      <div className="site-backdrop__grid" />
      <div className="site-backdrop__glow" />
      <div ref={squaresRef} className="site-backdrop__squares" />
      <div ref={dropsRef} className="site-backdrop__drops" />
      <div ref={spotlightRef} className="site-backdrop__spotlight" />
      <div className="site-backdrop__noise" />
    </div>
  );
}
