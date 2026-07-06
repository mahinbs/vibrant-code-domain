import { useEffect, useRef } from "react";
import { trackReshabLeadConversionPageLoad } from "./googleAds";

/** Fire Reshab Google Ads "Submit lead form" conversion once when a tracked page mounts. */
export function useReshabLeadConversionPageLoad(dedupKey: string, enabled = true): void {
  const fired = useRef(false);

  useEffect(() => {
    if (!enabled || fired.current) return;
    fired.current = true;
    trackReshabLeadConversionPageLoad(dedupKey);
  }, [dedupKey, enabled]);
}
