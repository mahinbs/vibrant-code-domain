/** Fires after a successful lead / registration-style submit (browser pixel only). */
export function trackMetaCompleteRegistration(): void {
  if (typeof window === "undefined") return;
  if (/(^|\.)lovable\.app$/i.test(window.location.hostname)) return;
  if (typeof window.fbq !== "function") return;
  window.fbq("track", "CompleteRegistration");
}
