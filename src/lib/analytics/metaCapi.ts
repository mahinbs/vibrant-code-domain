import { getMetaBrowserIds } from "./metaCookies";

export type MetaCapiEventName = "PageView" | "Contact" | "Lead" | "Schedule";

export type SendMetaCapiInput = {
  eventName: MetaCapiEventName;
  eventId: string;
  eventSourceUrl: string;
  email?: string;
  phone?: string;
  sourcePage?: string;
};

function isPreviewHost(): boolean {
  return typeof window !== "undefined" && /(^|\.)lovable\.app$/i.test(window.location.hostname);
}

function capiEndpoint(): string | undefined {
  return import.meta.env.VITE_META_CAPI_ENDPOINT as string | undefined;
}

function supabaseAnonKey(): string | undefined {
  return import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;
}

/** Fire-and-forget POST to the meta-capi edge function. Never throws to callers. */
export function sendMetaCapiEvent(input: SendMetaCapiInput): void {
  if (typeof window === "undefined" || isPreviewHost()) return;

  const endpoint = capiEndpoint();
  if (!endpoint) {
    if (import.meta.env.DEV) {
      console.warn("[meta-capi] VITE_META_CAPI_ENDPOINT is not set");
    }
    return;
  }

  const { fbp, fbc } = getMetaBrowserIds();
  const anonKey = supabaseAnonKey();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (anonKey) {
    headers.Authorization = `Bearer ${anonKey}`;
    headers.apikey = anonKey;
  }

  void fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({
      event_name: input.eventName,
      event_id: input.eventId,
      event_source_url: input.eventSourceUrl,
      event_time: Math.floor(Date.now() / 1000),
      email: input.email?.trim() || undefined,
      phone: input.phone?.trim() || undefined,
      fbp,
      fbc,
      source_page: input.sourcePage,
    }),
    keepalive: true,
  }).catch((err) => {
    if (import.meta.env.DEV) {
      console.warn("[meta-capi] request failed:", err);
    }
  });
}
