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

    const maxCols = () => Math.max(1, Math.floor(window.innerWidth / GRID));
    const maxRows = () => Math.max(1, Math.floor(window.innerHeight / GRID));
    const randCell = (cols: number) => Math.floor(Math.random() * cols) * GRID;
    const randRow = (rows: number) => Math.floor(Math.random() * rows) * GRID;

    const squares: HTMLDivElement[] = [];
    for (let i = 0; i < SQUARE_COUNT; i++) {
      const el = document.createElement("div");
      el.className = "work-backdrop__square";
      squaresWrap.appendChild(el);
      squares.push(el);
    }

    const placeSquares = () => {
      const cols = maxCols();
      const rows = maxRows();
      for (const sq of squares) {
        sq.style.left = `${randCell(cols)}px`;
        sq.style.top = `${randRow(rows)}px`;
        sq.style.opacity = (0.35 + Math.random() * 0.55).toFixed(2);
      }
    };

    placeSquares();

    let interval: number | undefined;
    if (!reduced) interval = window.setInterval(placeSquares, 2000);

    const dropHandlers: Array<{ el: HTMLDivElement; fn: (e: AnimationEvent) => void }> = [];

    const resetDrop = (el: HTMLDivElement) => {
      const cols = maxCols();
      el.style.left = `${randCell(cols)}px`;
      el.style.animationDuration = `${2 + Math.random() * 2}s`;
      el.style.animationDelay = `${Math.random() * 2}s`;
      el.style.animationName = "none";
      void el.offsetHeight;
      el.style.animationName = "work-drop";
    };

    if (!reduced) {
      for (let i = 0; i < DROP_COUNT; i++) {
        const el = document.createElement("div");
        el.className = "work-backdrop__drop";
        const fn = (e: AnimationEvent) => {
          if (e.animationName !== "work-drop") return;
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
      for (const { el, fn } of dropHandlers) el.removeEventListener("animationend", fn);
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
    <div className="work-backdrop" aria-hidden>
      <div className="work-backdrop__grid" />
      <div className="work-backdrop__glow" />
      <div ref={squaresRef} className="work-backdrop__squares" />
      <div ref={dropsRef} className="work-backdrop__drops" />
      <div ref={spotlightRef} className="work-backdrop__spotlight" />
      <div className="work-backdrop__noise" />
    </div>
  );
}
