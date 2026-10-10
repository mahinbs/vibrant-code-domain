/**
 * Funnel events and ad attribution for the /command-center landing page.
 * Only CTA identifiers and campaign tags are sent — never personal data.
 */

type GtagFn = (cmd: "event", name: string, params?: Record<string, unknown>) => void;

export type CcEvent = "cc_cta_click" | "cc_form_open" | "cc_form_start" | "cc_form_submit" | "cc_whatsapp_click";

export function ccTrack(event: CcEvent, data: Record<string, string | number | undefined> = {}): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: GtagFn }).gtag;
  if (typeof gtag === "function") gtag("event", event, { page: "command-center", ...data });
}

const ATTR_KEY = "cc-attribution";
const ATTR_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"];

export type Attribution = Partial<Record<(typeof ATTR_PARAMS)[number] | "referrer" | "landing_url", string>>;

/** Remember the first ad click of the session (later visits without tags keep it). */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const found: Attribution = {};
    for (const k of ATTR_PARAMS) {
      const v = params.get(k);
      if (v) found[k] = v.slice(0, 200);
    }
    const existing = readAttribution();
    if (Object.keys(found).length || !existing.landing_url) {
      const next: Attribution = {
        ...found,
        referrer: document.referrer ? document.referrer.slice(0, 300) : undefined,
        landing_url: window.location.href.slice(0, 500),
      };
      sessionStorage.setItem(ATTR_KEY, JSON.stringify(next));
    }
  } catch {
    /* storage blocked: attribution is best-effort */
  }
}

export function readAttribution(): Attribution {
  try {
    const raw = sessionStorage.getItem(ATTR_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}

const SUBMITTED_KEY = "cc-lead-submitted";

export function markSubmitted(): void {
  try {
    sessionStorage.setItem(SUBMITTED_KEY, "1");
  } catch {
    /* ignore */
  }
}

export function hasSubmitted(): boolean {
  try {
    return sessionStorage.getItem(SUBMITTED_KEY) === "1";
  } catch {
    return false;
  }
}
