import { useEffect } from "react";

/**
 * Scroll reveal for the landing sections. Content blocks fade and rise into place
 * as they enter the viewport, cards in a row stagger, media frames settle in from
 * a slight zoom, and section headings sharpen from a soft blur.
 *
 * Progressive: nothing is hidden until this runs, it is skipped entirely for
 * prefers-reduced-motion, and each element drops its reveal attribute once shown
 * so hover effects and layout behave exactly as before.
 */

const GROUPS: { selector: string; kind: "head" | "up" | "zoom"; stagger?: boolean }[] = [
  { selector: ".cc-cards > .cc-card", kind: "up", stagger: true },
  { selector: ".cc-also", kind: "up" },
  { selector: ".cc-press-list > li", kind: "up", stagger: true },
  { selector: ".cc-sec .cc-head", kind: "head" },
  { selector: ".cc-offer-box", kind: "zoom" },
  { selector: ".cc-split-copy > :not(.cc-head)", kind: "up", stagger: true },
  { selector: ".cc-goal-picker > *", kind: "up", stagger: true },
  { selector: ".cc-frame-16x9, .cc-shot, .cc-phone, .cc-form-card", kind: "zoom" },
  {
    selector:
      ".cc-channel, .cc-usecase, .cc-mode, .cc-steps > li, .cc-stats > div, .cc-trust-bar > li, .cc-faq > details",
    kind: "up",
    stagger: true,
  },
  { selector: ".cc-builder-panel, .cc-price, .cc-compare-wrap, .cc-custom-goal, .cc-platforms", kind: "up" },
];

const MAX_STAGGER = 6;
const CLEANUP_MS = 1400;
/** Whatever happens (observer starved, odd webview), nothing stays hidden longer than this. */
const SAFETY_MS = 6000;

export function useCcReveal(rootId = "top") {
  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const targets: HTMLElement[] = [];
    for (const g of GROUPS) {
      root.querySelectorAll<HTMLElement>(g.selector).forEach((el) => {
        if (el.dataset.reveal || el.closest(".cc-top, .cc-modal, .cc-nav")) return;
        el.dataset.reveal = g.kind;
        if (g.stagger && el.parentElement) {
          const siblings = Array.from(el.parentElement.children).filter((c) => (c as HTMLElement).matches(g.selector));
          el.style.setProperty("--rv-i", String(Math.min(siblings.indexOf(el), MAX_STAGGER)));
        }
        targets.push(el);
      });
    }

    root.classList.add("cc-reveal-on");

    const timers: number[] = [];
    const pending = new Set(targets);

    const show = (el: HTMLElement) => {
      if (!pending.has(el)) return;
      pending.delete(el);
      io.unobserve(el);
      el.classList.add("is-in");
      const delay = Number(el.style.getPropertyValue("--rv-i") || 0) * 90;
      // Once shown, hand the element back to its normal styles (hover lifts etc.).
      timers.push(
        window.setTimeout(() => {
          el.removeAttribute("data-reveal");
          el.classList.remove("is-in");
          el.style.removeProperty("--rv-i");
        }, CLEANUP_MS + delay),
      );
    };

    // The observer reports every target once right away; if that never happens it is starved.
    let observerAlive = false;
    const io = new IntersectionObserver(
      (entries) => {
        observerAlive = true;
        entries.forEach((e) => e.isIntersecting && show(e.target as HTMLElement));
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    targets.forEach((el) => io.observe(el));

    // Fallback for environments where the observer is throttled: check positions on scroll.
    let scrollTimer = 0;
    const checkPositions = () => {
      scrollTimer = 0;
      const vh = window.innerHeight;
      pending.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.95 && r.bottom > 0) show(el);
      });
    };
    const onScroll = () => {
      if (!scrollTimer) scrollTimer = window.setTimeout(checkPositions, 150);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const safety = window.setTimeout(() => {
      if (!observerAlive) pending.forEach(show);
    }, SAFETY_MS);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(scrollTimer);
      window.clearTimeout(safety);
      timers.forEach((t) => window.clearTimeout(t));
      root.classList.remove("cc-reveal-on");
      targets.forEach((el) => {
        el.removeAttribute("data-reveal");
        el.classList.remove("is-in");
        el.style.removeProperty("--rv-i");
      });
    };
  }, [rootId]);
}
