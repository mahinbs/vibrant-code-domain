/** Google Ads conversion tracking — routed by lead source page. */

import { BMS_LEAD_SOURCES } from "@/redesign/lib/notifyTelegramLead";

const BMS_GOOGLE_ADS_ID = "AW-18249809652";
const RESHAB_GOOGLE_ADS_ID = "AW-18294430151";

/** Reshab-owned landings (/business-automation, automation score funnel). */
const RESHAB_LEAD_SOURCES = new Set<string>([
  "business-automation",
  "automation-score",
  "automation-case-studies",
]);

/** Default label from Google Ads conversion action "Submit lead form (1)". */
export const RESHAB_LEAD_CONVERSION_SEND_TO =
  "AW-18294430151/DwI_CJ7i2MscEMezu5NE" as const;

const DEFAULT_RESHAB_CONVERSION_LABEL = "DwI_CJ7i2MscEMezu5NE";

/**
 * Optional conversion labels from Google Ads (Tools → Conversions → tag setup).
 * Page-load conversions use the Reshab label on /thank-you and /automation-score/report.
 */
const BMS_CONVERSION_LABEL = (import.meta.env.VITE_GADS_LEAD_LABEL as string | undefined) || "";

type GtagFn = (...args: unknown[]) => void;

function fireConversion(sendTo: string): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: GtagFn }).gtag;
  if (typeof gtag !== "function") return;

  gtag("event", "conversion", {
    send_to: sendTo,
    value: 1.0,
    currency: "INR",
  });
}

function reshabSendTo(): string {
  const label =
    (import.meta.env.VITE_GADS_RESHAB_LEAD_LABEL as string | undefined) ||
    DEFAULT_RESHAB_CONVERSION_LABEL;
  return `${RESHAB_GOOGLE_ADS_ID}/${label}`;
}

const GADS_DEDUP_PREFIX = "gads-reshab-lead";

/**
 * Event snippet for "Submit lead form (1)" — fires once per dedup key per session.
 * Equivalent to Google's recommended snippet on /thank-you and /automation-score/report.
 */
export function trackReshabLeadConversionPageLoad(dedupKey: string): void {
  try {
    const storageKey = `${GADS_DEDUP_PREFIX}:${dedupKey}`;
    if (window.sessionStorage.getItem(storageKey)) return;
    window.sessionStorage.setItem(storageKey, "1");
  } catch {
    /* sessionStorage unavailable — still attempt the hit */
  }
  fireConversion(reshabSendTo());
}

function adsConfigForSource(sourcePage: string): { adsId: string; label: string } | null {
  const page = (sourcePage || "").trim();
  if (BMS_LEAD_SOURCES.has(page)) {
    return { adsId: BMS_GOOGLE_ADS_ID, label: BMS_CONVERSION_LABEL };
  }
  // Reshab conversions fire on dedicated page-load URLs, not on submit.
  if (RESHAB_LEAD_SOURCES.has(page)) {
    return null;
  }
  return null;
}

/** Fires after a successful lead submit on homepage (BMS) forms only. */
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
