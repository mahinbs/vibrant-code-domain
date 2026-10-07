/**
 * Marketing attribution for lead forms: UTM tags, ad click ids, landing page and
 * referrer. First touch is kept across visits (localStorage); last touch is the
 * current visit (sessionStorage). Both are attached to every lead row's payload.
 */

const FIRST_KEY = "bms_attr_first";
const LAST_KEY = "bms_attr_last";
const PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid", "msclkid"] as const;

export type Touch = Partial<Record<(typeof PARAMS)[number], string>> & {
  landing_page: string;
  referrer: string | null;
  at: string;
};

function read(storage: Storage, key: string): Touch | null {
  try {
    return JSON.parse(storage.getItem(key) || "null");
  } catch {
    return null;
  }
}

/** Call once on page load. Records this visit's touch; first touch is never overwritten. */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    const url = new URL(window.location.href);
    const touch: Touch = {
      landing_page: url.pathname + url.search,
      referrer: document.referrer || null,
      at: new Date().toISOString(),
    };
    let tagged = false;
    for (const p of PARAMS) {
      const v = url.searchParams.get(p);
      if (v) {
        touch[p] = v.slice(0, 200);
        tagged = true;
      }
    }
    // A new tagged click replaces the visit's touch; an untagged page view inside the same visit does not.
    if (tagged || !read(sessionStorage, LAST_KEY)) sessionStorage.setItem(LAST_KEY, JSON.stringify(touch));
    if (!read(localStorage, FIRST_KEY)) localStorage.setItem(FIRST_KEY, JSON.stringify(touch));
  } catch {
    /* storage blocked — attribution is best-effort */
  }
}

export function getAttribution(): { first: Touch | null; last: Touch | null } | null {
  if (typeof window === "undefined") return null;
  try {
    const first = read(localStorage, FIRST_KEY);
    const last = read(sessionStorage, LAST_KEY);
    return first || last ? { first, last } : null;
  } catch {
    return null;
  }
}
