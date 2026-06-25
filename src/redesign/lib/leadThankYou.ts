export const LEAD_THANK_YOU_RETURN_KEY = "leadThankYouReturn";

const SAFE_RETURN = /^\/[a-z0-9\-/_]*$/i;

export function saveLeadThankYouReturnPath(): void {
  try {
    const path = `${window.location.pathname}${window.location.search}`;
    if (SAFE_RETURN.test(window.location.pathname)) {
      sessionStorage.setItem(LEAD_THANK_YOU_RETURN_KEY, path);
    }
  } catch {
    // sessionStorage unavailable — fall back to homepage on thank-you page
  }
}

export function consumeLeadThankYouReturnPath(): string {
  try {
    const stored = sessionStorage.getItem(LEAD_THANK_YOU_RETURN_KEY);
    sessionStorage.removeItem(LEAD_THANK_YOU_RETURN_KEY);
    if (stored && SAFE_RETURN.test(stored.split("?")[0] ?? "")) {
      return stored;
    }
  } catch {
    // ignore
  }
  return "/";
}
