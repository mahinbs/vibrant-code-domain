import { sendMetaCapiEvent, type MetaCapiEventName } from "./metaCapi";
import { createMetaEventId } from "./metaEventIds";

export type TrackMetaConversionInput = {
  eventName: MetaCapiEventName;
  eventSourceUrl?: string;
  email?: string;
  phone?: string;
  sourcePage?: string;
  /** When true, index.html already fired Pixel PageView — send CAPI only. */
  skipPixel?: boolean;
};

function isPreviewHost(): boolean {
  return typeof window !== "undefined" && /(^|\.)lovable\.app$/i.test(window.location.hostname);
}

/**
 * Single entry for Pixel + CAPI with shared event_id deduplication.
 * Returns the event id, or undefined when tracking is skipped.
 */
export function trackMetaConversion(input: TrackMetaConversionInput): string | undefined {
  if (typeof window === "undefined" || isPreviewHost()) return undefined;

  const eventId = createMetaEventId(input.eventName);
  const eventSourceUrl = input.eventSourceUrl ?? window.location.href;

  if (!input.skipPixel && typeof window.fbq === "function") {
    window.fbq("track", input.eventName, {}, { eventID: eventId });
  }

  sendMetaCapiEvent({
    eventName: input.eventName,
    eventId,
    eventSourceUrl,
    email: input.email,
    phone: input.phone,
    sourcePage: input.sourcePage,
  });

  return eventId;
}
