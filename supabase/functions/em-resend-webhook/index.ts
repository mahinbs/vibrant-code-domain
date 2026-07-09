import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { corsHeaders, jsonResponse, createSupabaseAdmin } from "./lib/util.ts";

const EVENT_MAP: Record<string, string> = {
  "email.sent": "sent",
  "email.delivered": "delivered",
  "email.opened": "opened",
  "email.clicked": "clicked",
  "email.bounced": "bounced",
  "email.complained": "complained",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const payload = await req.json();
    const eventType = EVENT_MAP[payload.type];
    if (!eventType) {
      return jsonResponse({ ok: true, skipped: true });
    }

    const supabase = createSupabaseAdmin();
    const messageId = payload.data?.email_id ?? payload.data?.id;
    if (!messageId) return jsonResponse({ ok: true, skipped: true });

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
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return jsonResponse({ ok: false, error: message }, 500);
  }
});
