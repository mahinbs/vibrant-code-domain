/** Google Ads conversion tracking — routed by lead source page. */

import { BMS_LEAD_SOURCES } from "@/redesign/lib/notifyTelegramLead";

const BMS_GOOGLE_ADS_ID = "AW-18249809652";
const RESHAB_GOOGLE_ADS_ID = "AW-18294430151";

/** Reshab-owned landings (/business-automation, automation score funnel). */
const RESHAB_LEAD_SOURCES = new Set<string>(["business-automation", "automation-score"]);

/**
 * Optional conversion labels from Google Ads (Tools → Conversions → tag setup).
 * Without a label the event still reaches the account, but a label ties it to a
 * specific conversion action for accurate reporting.
 */
const BMS_CONVERSION_LABEL = (import.meta.env.VITE_GADS_LEAD_LABEL as string | undefined) || "";
const RESHAB_CONVERSION_LABEL =
  (import.meta.env.VITE_GADS_RESHAB_LEAD_LABEL as string | undefined) || "";

type GtagFn = (...args: unknown[]) => void;

function adsConfigForSource(sourcePage: string): { adsId: string; label: string } | null {
  const page = (sourcePage || "").trim();
  if (BMS_LEAD_SOURCES.has(page)) {
    return { adsId: BMS_GOOGLE_ADS_ID, label: BMS_CONVERSION_LABEL };
  }
  if (RESHAB_LEAD_SOURCES.has(page)) {
    return { adsId: RESHAB_GOOGLE_ADS_ID, label: RESHAB_CONVERSION_LABEL };
  }
  return null;
}

/** Fires after a successful lead submit on a tracked landing page. */
export function trackGoogleAdsLeadConversion(sourcePage: string): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: GtagFn }).gtag;
  if (typeof gtag !== "function") return;

  const config = adsConfigForSource(sourcePage);
  if (!config) return;

  const sendTo = config.label ? `${config.adsId}/${config.label}` : config.adsId;

  gtag("event", "conversion", {
    send_to: sendTo,
    event_category: "lead",
    event_label: sourcePage,
  });
  gtag("event", "generate_lead", { source_page: sourcePage });
}
