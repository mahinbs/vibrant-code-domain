/** Google Ads conversion tracking for Boostmysites-owned lead forms. */

const GOOGLE_ADS_ID = "AW-18249809652";

/**
 * Optional conversion label from Google Ads (Tools -> Conversions -> tag setup),
 * e.g. "AbC-D_efGhIjKlMn". Without it the event still reaches the account, but a
 * label ties it to a specific conversion action for accurate reporting.
 */
const CONVERSION_LABEL = (import.meta.env.VITE_GADS_LEAD_LABEL as string | undefined) || "";

import { BMS_LEAD_SOURCES } from "@/redesign/lib/notifyTelegramLead";

type GtagFn = (...args: unknown[]) => void;

/** Fires after a successful lead submit on Boostmysites-owned pages. */
export function trackGoogleAdsLeadConversion(sourcePage: string): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: GtagFn }).gtag;
  if (typeof gtag !== "function") return;
  // Only Boostmysites-owned pages (homepage etc.) — not /business-automation.
  if (!BMS_LEAD_SOURCES.has((sourcePage || "").trim())) return;

  const sendTo = CONVERSION_LABEL
    ? `${GOOGLE_ADS_ID}/${CONVERSION_LABEL}`
    : GOOGLE_ADS_ID;

  gtag("event", "conversion", {
    send_to: sendTo,
    event_category: "lead",
    event_label: sourcePage,
  });
  // GA4-friendly mirror event for reporting/audiences.
  gtag("event", "generate_lead", { source_page: sourcePage });
}
