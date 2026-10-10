import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/** Reshab Google Ads account — must not load sitewide (conflicts with BMS AW-18249809652). */
export const RESHAB_GOOGLE_ADS_ID = "AW-18294430151";

const RESHAB_TAG_PATHS = new Set(["/business-automation", "/thank-you"]);

type GtagFn = (...args: unknown[]) => void;

/**
 * Loads gtag config for AW-18294430151 only on /business-automation and /thank-you.
 * Conversion events still fire separately via trackReshabLeadConversionPageLoad
 * when thank-you return path is /business-automation.
 */
const ReshabGoogleAds = () => {
  const { pathname } = useLocation();
  const configured = useRef(false);

  useEffect(() => {
    const isPreview = /(^|\.)lovable\.app$/i.test(window.location.hostname);
    if (isPreview) return;
    if (!RESHAB_TAG_PATHS.has(pathname)) return;

    const gtag = (window as unknown as { gtag?: GtagFn }).gtag;
    if (typeof gtag !== "function") return;

    // Idempotent: gtag config may be called once per SPA session after first hit.
    if (configured.current) return;
    configured.current = true;
    gtag("config", RESHAB_GOOGLE_ADS_ID);
  }, [pathname]);

  return null;
};

export default ReshabGoogleAds;
