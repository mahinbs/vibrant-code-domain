import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Robust in-page anchor scrolling for the redesign.
 *
 * Sections below the fold (Services, Process, Work, the contact form, …) are
 * lazy-mounted via <DeferredSection>, so a normal `#contact-form` jump finds
 * nothing when clicked from the top. This handler progressively nudges the page
 * down to trigger those lazy mounts, then smooth-scrolls to the target once it
 * exists — accounting for the sticky nav height.
 */

const NAV_OFFSET = 100;

function scrollToId(id: string) {
  if (!id) return;
  let attempts = 0;
  const MAX_ATTEMPTS = 40;

  const settle = () => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    // Correct for layout shifts from sections that mount slightly later.
    window.setTimeout(() => {
      const again = document.getElementById(id);
      if (!again) return;
      const t = again.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
      if (Math.abs(t - window.scrollY) > 6) {
        window.scrollTo({ top: Math.max(0, t), behavior: "smooth" });
      }
    }, 450);
  };

  const tick = () => {
    if (document.getElementById(id)) {
      settle();
      return;
    }
    if (attempts >= MAX_ATTEMPTS) return;
    attempts += 1;
    const step = Math.max(window.innerHeight * 0.85, 600);
    const maxTop = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
    );
    const next = Math.min(window.scrollY + step, maxTop);
    window.scrollTo({ top: next, behavior: "auto" });
    window.setTimeout(tick, 110);
  };

  tick();
}

export function useHashScroll() {
  const { hash } = useLocation();

  // Direct load / router-driven hash (e.g. opening /#contact-form).
  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.replace(/^#/, ""));
    const timer = window.setTimeout(() => scrollToId(id), 90);
    return () => window.clearTimeout(timer);
  }, [hash]);

  // Intercept clicks on same-page hash links so the broken native jump never
  // runs — covers <a href="/#…">, repeat clicks, and lazy targets.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const anchor = (event.target as HTMLElement | null)?.closest?.(
        "a[href]",
      ) as HTMLAnchorElement | null;
      if (!anchor || anchor.target === "_blank") return;

      const raw = anchor.getAttribute("href") || "";
      const hashIndex = raw.indexOf("#");
      if (hashIndex === -1) return;

      const path = raw.slice(0, hashIndex);
      const hashTarget = raw.slice(hashIndex + 1);
      const currentPath = window.location.pathname;
      const samePage =
        path === "" ||
        path === currentPath ||
        (path === "/" && currentPath === "/");
      if (!samePage) return; // let cross-page links navigate normally

      const id = decodeURIComponent(hashTarget);
      if (!id) return;

      event.preventDefault();
      window.history.replaceState(null, "", `#${id}`);
      scrollToId(id);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
}
