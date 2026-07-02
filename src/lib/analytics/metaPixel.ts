/** Fires after a successful lead / registration-style submit (browser pixel only). */
export function trackMetaCompleteRegistration(): void {
  if (typeof window === "undefined") return;
  if (/(^|\.)lovable\.app$/i.test(window.location.hostname)) return;
  if (typeof window.fbq !== "function") return;
  window.fbq("track", "CompleteRegistration");
}

/** Browser pixel with optional event_id for Pixel + CAPI deduplication. */
export function trackMetaPixelEvent(
  eventName: string,
  eventId: string,
  customData: Record<string, unknown> = {},
): void {
  if (typeof window === "undefined") return;
  if (/(^|\.)lovable\.app$/i.test(window.location.hostname)) return;
  if (typeof window.fbq !== "function") return;
  window.fbq("track", eventName, customData, { eventID: eventId });
}
