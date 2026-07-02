import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GRAPH_API_VERSION = "v21.0";

const ALLOWED_EVENTS = new Set(["PageView", "Contact", "Lead", "Schedule"]);

type CapiRequestBody = {
  event_name?: string;
  event_id?: string;
  event_source_url?: string;
  event_time?: number;
  email?: string;
  phone?: string;
  fbp?: string;
  fbc?: string;
  source_page?: string;
};

async function sha256Hex(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/** Meta CAPI: digits only, including country code. */
function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "");
}

function clientIp(req: Request): string | undefined {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return req.headers.get("x-real-ip") ?? req.headers.get("cf-connecting-ip") ?? undefined;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ ok: false, error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const pixelId = Deno.env.get("META_PIXEL_ID");
  const accessToken = Deno.env.get("META_CAPI_ACCESS_TOKEN");

  if (!pixelId || !accessToken) {
    console.error("[meta-capi] Missing META_PIXEL_ID or META_CAPI_ACCESS_TOKEN");
    return new Response(JSON.stringify({ ok: false, error: "Server not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = (await req.json()) as CapiRequestBody;
    const eventName = body.event_name?.trim();
    const eventId = body.event_id?.trim();
    const eventSourceUrl = body.event_source_url?.trim();

    if (!eventName || !ALLOWED_EVENTS.has(eventName)) {
      return new Response(JSON.stringify({ ok: false, error: "Invalid event_name" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!eventId) {
      return new Response(JSON.stringify({ ok: false, error: "event_id is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!eventSourceUrl) {
      return new Response(JSON.stringify({ ok: false, error: "event_source_url is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userData: Record<string, string | string[]> = {};
    const clientUserAgent = req.headers.get("user-agent");
    const ip = clientIp(req);

    if (ip) userData.client_ip_address = ip;
    if (clientUserAgent) userData.client_user_agent = clientUserAgent;
    if (body.fbp?.trim()) userData.fbp = body.fbp.trim();
    if (body.fbc?.trim()) userData.fbc = body.fbc.trim();

    if (body.email?.trim()) {
      const hashed = await sha256Hex(normalizeEmail(body.email));
      userData.em = [hashed];
    }

    if (body.phone?.trim()) {
      const normalized = normalizePhone(body.phone);
      if (normalized) {
        const hashed = await sha256Hex(normalized);
        userData.ph = [hashed];
      }
    }

    const eventTime =
      typeof body.event_time === "number" && body.event_time > 0
        ? Math.floor(body.event_time)
        : Math.floor(Date.now() / 1000);

    const eventPayload: Record<string, unknown> = {
      event_name: eventName,
      event_time: eventTime,
      event_id: eventId,
      event_source_url: eventSourceUrl,
      action_source: "website",
      user_data: userData,
    };

    const graphBody: Record<string, unknown> = {
      data: [eventPayload],
      access_token: accessToken,
    };

    const testEventCode = Deno.env.get("META_TEST_EVENT_CODE");
    if (testEventCode?.trim()) {
      graphBody.test_event_code = testEventCode.trim();
    }

    const graphRes = await fetch(
      `https://graph.facebook.com/${GRAPH_API_VERSION}/${pixelId}/events`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(graphBody),
      },
    );

    const graphJson = await graphRes.json();

    if (!graphRes.ok) {
      console.error("[meta-capi] Graph API error:", graphJson);
      return new Response(
        JSON.stringify({ ok: false, error: "Meta API rejected event" }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    if (body.source_page) {
      console.log(`[meta-capi] ${eventName} sent (source: ${body.source_page}, id: ${eventId})`);
    }

    return new Response(JSON.stringify({ ok: true, meta: graphJson }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[meta-capi]", message);
    return new Response(JSON.stringify({ ok: false, error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
