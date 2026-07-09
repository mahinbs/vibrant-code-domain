/** X (Twitter) conversion tracking — event snippets beyond base pixel in index.html. */

export const X_LEAD_CONVERSION_EVENT = "tw-oqroz-oqrp1" as const;

type TwqFn = (...args: unknown[]) => void;

const X_DEDUP_PREFIX = "x-lead";

function isXPixelDisabled(): boolean {
  return /(^|\.)lovable\.app$/i.test(window.location.hostname);
}

/**
 * Lead Generation Tracker — fire once on thank-you after a successful form submit.
 * Equivalent to twq('event', 'tw-oqroz-oqrp1', {}) on the confirmation page.
 */
export function trackXLeadConversion(dedupKey = "thank-you"): void {
  if (typeof window === "undefined" || isXPixelDisabled()) return;

  try {
    const storageKey = `${X_DEDUP_PREFIX}:${dedupKey}`;
    if (window.sessionStorage.getItem(storageKey)) return;
    window.sessionStorage.setItem(storageKey, "1");
  } catch {
    /* sessionStorage unavailable — still attempt the hit */
  }

  const twq = (window as unknown as { twq?: TwqFn }).twq;
  if (typeof twq !== "function") return;

  twq("event", X_LEAD_CONVERSION_EVENT, {});
}
