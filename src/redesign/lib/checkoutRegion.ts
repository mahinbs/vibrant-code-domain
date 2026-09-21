import { useEffect, useState } from "react";

export type CheckoutProvider = "razorpay" | "stripe";

function payOverride(): CheckoutProvider | null {
  if (typeof window === "undefined") return null;
  const value = new URLSearchParams(window.location.search).get("pay");
  if (value === "razorpay" || value === "stripe") return value;
  return null;
}

export function indiaFromTimezone(): boolean {
  if (typeof Intl === "undefined") return false;
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return tz === "Asia/Kolkata" || tz === "Asia/Calcutta";
}

async function countryFromIp(): Promise<string | null> {
  const ctrl = new AbortController();
  const timer = window.setTimeout(() => ctrl.abort(), 2500);
  try {
    const res = await fetch("https://api.country.is/", { signal: ctrl.signal });
    if (!res.ok) return null;
    const data = (await res.json()) as { country?: string };
    return typeof data.country === "string" ? data.country.toUpperCase() : null;
  } catch {
    return null;
  } finally {
    window.clearTimeout(timer);
  }
}

/**
 * India → Razorpay. Anywhere else → Stripe.
 * Instant timezone hint, then IP country. `?pay=razorpay` or `?pay=stripe` overrides.
 */
export function useCheckoutRegion(): {
  ready: boolean;
  isIndia: boolean;
  provider: CheckoutProvider;
} {
  const [isIndia, setIsIndia] = useState(() => {
    const override = payOverride();
    if (override === "razorpay") return true;
    if (override === "stripe") return false;
    return indiaFromTimezone();
  });
  const [ready, setReady] = useState(() => payOverride() !== null || indiaFromTimezone());

  useEffect(() => {
    const override = payOverride();
    if (override) {
      setIsIndia(override === "razorpay");
      setReady(true);
      return;
    }

    if (indiaFromTimezone()) {
      setIsIndia(true);
      setReady(true);
      return;
    }

    let cancelled = false;
    countryFromIp().then((country) => {
      if (cancelled) return;
      setIsIndia(country === "IN");
      setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    ready,
    isIndia,
    provider: isIndia ? "razorpay" : "stripe",
  };
}
