import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import {
  corsHeaders,
  jsonResponse,
  createSupabaseAdmin,
  getSetting,
  renderTemplate,
} from "./lib/util.ts";
import {
  pickSendingIdentity,
  sendViaResend,
  incrementSenderCount,
  getEffectiveDailyCap,
} from "./lib/resend.ts";

async function processQueuedSend(supabase: ReturnType<typeof createSupabaseAdmin>): Promise<number> {
  const cap = await getEffectiveDailyCap();
  const todayStart = new Date().toISOString().slice(0, 10);

  const { count: sentToday } = await supabase
    .from("em_email_sends")
    .select("*", { count: "exact", head: true })
    .gte("sent_at", `${todayStart}T00:00:00`)
    .eq("status", "sent");

  const remaining = cap - (sentToday ?? 0);
  if (remaining <= 0) return 0;

  const { data: queued } = await supabase
    .from("em_email_sends")
    .select("*")
    .eq("status", "queued")
    .order("queued_at", { ascending: true })
    .limit(Math.min(remaining, 10));

  if (!queued?.length) return 0;

  const replyTo = String(await getSetting(supabase, "reply_to_email", "replies@boostmysites.com")).replace(
    /"/g,
    "",
  );
  const siteOrigin = String(await getSetting(supabase, "site_origin", "https://boostmysites.com")).replace(
    /"/g,
    "",
  );

  let sent = 0;
  for (const item of queued) {
    const { data: lead } = await supabase
      .from("em_leads")
      .select("id, email, name, company, status")
      .eq("id", item.lead_id)
      .maybeSingle();
    if (!lead) continue;
    if (lead.status === "unsubscribed" || lead.status === "bounced") {
      await supabase.from("em_email_sends").update({ status: "cancelled" }).eq("id", item.id);
      continue;
    }

    const { data: unsub } = await supabase
      .from("em_unsubscribes")
      .select("id")
      .ilike("email", lead.email)
      .maybeSingle();
    if (unsub) continue;

    const identity = await pickSendingIdentity();
    if (!identity) break;

    const vars = {
      name: lead.name ?? "there",
      company: lead.company ?? "your company",
      email: lead.email,
    };
    const subject = renderTemplate(item.subject, vars);
    const { data: msgRow } = await supabase
      .from("em_email_messages")
      .select("body_text")
      .eq("send_id", item.id)
      .maybeSingle();
    const bodyText = renderTemplate(msgRow?.body_text ?? item.subject, vars);
    const unsubLink = `${siteOrigin}/unsubscribe?e=${encodeURIComponent(btoa(lead.email))}`;
    const html = `<div style="font-family:sans-serif;white-space:pre-wrap">${bodyText.replace(/\n/g, "<br>")}</div><hr><p style="font-size:12px;color:#666"><a href="${unsubLink}">Unsubscribe</a></p>`;

    try {
      const result = await sendViaResend({
        from: `${identity.display_name} <${identity.email}>`,
        to: lead.email,
        subject,
        html,
        text: bodyText,
        replyTo,
        tags: [
          { name: "send_id", value: item.id },
          { name: "lead_id", value: lead.id },
        ],
      });

      const now = new Date().toISOString();
      await supabase
        .from("em_email_sends")
        .update({
          status: "sent",
          sent_at: now,
          resend_message_id: result.id,
          sending_identity_id: identity.id,
        })
        .eq("id", item.id);

      const { data: existingMsg } = await supabase
        .from("em_email_messages")
        .select("id")
        .eq("send_id", item.id)
        .maybeSingle();

      if (existingMsg) {
        await supabase
          .from("em_email_messages")
          .update({
            from_email: identity.email,
            body_html: html,
            body_text: bodyText,
            sending_identity_id: identity.id,
            resend_message_id: result.id,
            sent_at: now,
          })
          .eq("id", existingMsg.id);
      } else {
        await supabase.from("em_email_messages").insert({
          lead_id: lead.id,
          send_id: item.id,
          direction: "outbound",
          from_email: identity.email,
          to_email: lead.email,
          subject,
          body_html: html,
          body_text: bodyText,
          sending_identity_id: identity.id,
          resend_message_id: result.id,
          sent_at: now,
        });
      }

      await supabase.from("em_email_events").insert({
        send_id: item.id,
        lead_id: lead.id,
        event_type: "sent",
        occurred_at: now,
      });

      await supabase
        .from("em_leads")
        .update({ status: "contacted", updated_at: now })
        .eq("id", lead.id)
        .in("status", ["new", "researched"]);

      await incrementSenderCount(identity.id);

      if (item.campaign_id) {
        const { data: campaign } = await supabase
          .from("em_campaigns")
          .select("stats")
          .eq("id", item.campaign_id)
          .single();
        if (campaign) {
          const stats = (campaign.stats as Record<string, number>) ?? {};
          stats.sent = (stats.sent ?? 0) + 1;
          await supabase.from("em_campaigns").update({ stats }).eq("id", item.campaign_id);
        }
      }

      sent++;
    } catch (e) {
      await supabase
        .from("em_email_sends")
        .update({
          status: "failed",
          error_message: e instanceof Error ? e.message : "Send failed",
        })
        .eq("id", item.id);
    }
  }
  return sent;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createSupabaseAdmin();
    const sent = await processQueuedSend(supabase);
    return jsonResponse({ ok: true, sent });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return jsonResponse({ ok: false, error: message }, 500);
  }
});
