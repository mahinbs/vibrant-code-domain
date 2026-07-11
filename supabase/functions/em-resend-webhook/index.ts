import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { corsHeaders, jsonResponse, createSupabaseAdmin } from "./lib/util.ts";
import { getReceivedEmail } from "./lib/resend.ts";
import { recordInboundReply, stripHtml } from "./lib/inboundReply.ts";

const EVENT_MAP: Record<string, string> = {
  "email.sent": "sent",
  "email.delivered": "delivered",
  "email.opened": "opened",
  "email.clicked": "clicked",
  "email.bounced": "bounced",
  "email.complained": "complained",
};

async function handleOutboundEvent(
  supabase: ReturnType<typeof createSupabaseAdmin>,
  payload: { type: string; data?: Record<string, unknown> },
) {
  const eventType = EVENT_MAP[payload.type];
  if (!eventType) {
    return jsonResponse({ ok: true, skipped: true });
  }

  const messageId = payload.data?.email_id ?? payload.data?.id;
  if (!messageId || typeof messageId !== "string") {
    return jsonResponse({ ok: true, skipped: true });
  }

  const { data: send } = await supabase
    .from("em_email_sends")
    .select("id, lead_id")
    .eq("resend_message_id", messageId)
    .maybeSingle();

  if (!send) return jsonResponse({ ok: true, skipped: true });

  await supabase.from("em_email_events").insert({
    send_id: send.id,
    lead_id: send.lead_id,
    event_type: eventType,
    metadata: payload.data ?? {},
    occurred_at: new Date().toISOString(),
  });

  if (eventType === "opened" && send.lead_id) {
    await supabase
      .from("em_leads")
      .update({ status: "opened", updated_at: new Date().toISOString() })
      .eq("id", send.lead_id)
      .in("status", ["new", "researched", "contacted"]);
  }

  if (eventType === "bounced" && send.lead_id) {
    await supabase
      .from("em_leads")
      .update({ status: "bounced", updated_at: new Date().toISOString() })
      .eq("id", send.lead_id);
    await supabase
      .from("em_sequence_enrollments")
      .update({ status: "stopped", stopped_reason: "bounced" })
      .eq("lead_id", send.lead_id)
      .eq("status", "active");
  }

  if (send.lead_id && send.id) {
    const { data: campaignSends } = await supabase
      .from("em_email_sends")
      .select("campaign_id")
      .eq("id", send.id)
      .maybeSingle();
    if (campaignSends?.campaign_id) {
      const { data: campaign } = await supabase
        .from("em_campaigns")
        .select("stats")
        .eq("id", campaignSends.campaign_id)
        .single();
      if (campaign) {
        const stats = (campaign.stats as Record<string, number>) ?? {};
        const key = eventType === "opened" ? "opened"
          : eventType === "clicked" ? "clicked"
          : eventType === "bounced" ? "bounced"
          : null;
        if (key) {
          stats[key] = (stats[key] ?? 0) + 1;
          await supabase
            .from("em_campaigns")
            .update({ stats })
            .eq("id", campaignSends.campaign_id);
        }
      }
    }
  }

  return jsonResponse({ ok: true });
}

async function handleEmailReceived(
  supabase: ReturnType<typeof createSupabaseAdmin>,
  payload: { type: string; created_at?: string; data?: Record<string, unknown> },
) {
  const data = payload.data;
  const emailId = data?.email_id;
  if (!emailId || typeof emailId !== "string") {
    return jsonResponse({ ok: true, skipped: true });
  }

  const fromEmail = String(data.from ?? "");
  const toList = Array.isArray(data.to) ? data.to : [];
  const toEmail = String(toList[0] ?? "");
  const subject = String(data.subject ?? "");
  const receivedAt = String(data.created_at ?? payload.created_at ?? new Date().toISOString());
  const messageId = typeof data.message_id === "string" ? data.message_id.trim() : "";
  const dedupeKey = messageId || `inbound:${emailId}`;

  let bodyText = "";
  let bodyHtml: string | null = null;

  try {
    const received = await getReceivedEmail(emailId);
    bodyText = received.text ?? "";
    bodyHtml = received.html ?? null;
    if (!bodyText && bodyHtml) {
      bodyText = stripHtml(bodyHtml);
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : "fetch failed";
    console.warn(`em-resend-webhook: could not fetch body for ${emailId}:`, msg);
  }

  const result = await recordInboundReply(supabase, {
    fromEmail,
    toEmail,
    subject,
    bodyText,
    bodyHtml,
    receivedAt,
    dedupeKey,
  });

  return jsonResponse(result);
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const payload = await req.json();
    const supabase = createSupabaseAdmin();

    if (payload.type === "email.received") {
      return await handleEmailReceived(supabase, payload);
    }

    return await handleOutboundEvent(supabase, payload);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return jsonResponse({ ok: false, error: message }, 500);
  }
});
