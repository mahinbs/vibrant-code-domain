/** Google Ads conversion tracking — routed by lead source page. */

const BMS_GOOGLE_ADS_ID = "AW-18249809652";
const RESHAB_GOOGLE_ADS_ID = "AW-18294430151";

/** Default label from Google Ads conversion action "Submit lead form (1)". */
export const RESHAB_LEAD_CONVERSION_SEND_TO =
  "AW-18294430151/DwI_CJ7i2MscEMezu5NE" as const;

const DEFAULT_RESHAB_CONVERSION_LABEL = "DwI_CJ7i2MscEMezu5NE";

/**
 * Conversion label from the Google Ads lead-form conversion action on
 * AW-18249809652 (env can override). Without a label the event only reaches
 * the account level and the conversion action never records.
 */
const BMS_CONVERSION_LABEL =
  (import.meta.env.VITE_GADS_LEAD_LABEL as string | undefined) || "ePIBCP3oj8EcEPT9l_5D";

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

/**
 * Every lead form on the site reports to the BMS Google Ads account.
 *
 * It used to report only from the homepage and the free-course page. A visitor who came from a
 * BMS ad and sent the form on /contact, a service page or an industry page was never counted, and
 * the account showed 0 conversions on 3,384 clicks. Google credits a conversion only to a visitor
 * who arrived on that account's own ad click, so reporting a lead that came from somewhere else
 * costs nothing and credits nobody. Reshab's account keeps its own page-load conversions.
 */
function adsConfigForSource(_sourcePage: string): { adsId: string; label: string } | null {
  return { adsId: BMS_GOOGLE_ADS_ID, label: BMS_CONVERSION_LABEL };
}

/** Fires after a successful lead submit on any form of the site. */
export function trackGoogleAdsLeadConversion(sourcePage: string): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: GtagFn }).gtag;
  if (typeof gtag !== "function") return;

  const config = adsConfigForSource(sourcePage);
  if (!config) return;

  const sendTo = config.label ? `${config.adsId}/${config.label}` : config.adsId;

  gtag("event", "conversion", {
    send_to: sendTo,
    value: 1.0,
    currency: "INR",
    event_category: "lead",
    event_label: sourcePage,
  });
  gtag("event", "generate_lead", { source_page: sourcePage });
}
