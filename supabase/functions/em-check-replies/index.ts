import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { ImapFlow } from "npm:imapflow@1.0.164";
import { corsHeaders, jsonResponse, createSupabaseAdmin } from "../_shared/em/util.ts";

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const host = Deno.env.get("IMAP_HOST");
  const user = Deno.env.get("IMAP_USER");
  const password = Deno.env.get("IMAP_PASSWORD");
  if (!host || !user || !password) {
    return jsonResponse({ ok: true, skipped: true, reason: "IMAP not configured" });
  }

  try {
    const supabase = createSupabaseAdmin();
    const { data: state } = await supabase.from("em_imap_state").select("last_uid").eq("id", "default").single();
    const lastUid = state?.last_uid ?? 0;

    const client = new ImapFlow({
      host,
      port: Number(Deno.env.get("IMAP_PORT") ?? 993),
      secure: true,
      auth: { user, pass: password },
      logger: false,
    });

    await client.connect();
    const lock = await client.getMailboxLock("INBOX");
    let maxUid = lastUid;
    let processed = 0;

    try {
      const messages = client.fetch(`${lastUid + 1}:*`, {
        uid: true,
        envelope: true,
        source: true,
      });

      for await (const msg of messages) {
        if (!msg.uid || msg.uid <= lastUid) continue;
        maxUid = Math.max(maxUid, msg.uid);

        const fromAddr = msg.envelope?.from?.[0];
        const fromEmail = fromAddr?.address?.toLowerCase();
        if (!fromEmail) continue;

        const subject = msg.envelope?.subject ?? "";
        let bodyText = "";
        if (msg.source) {
          const raw = new TextDecoder().decode(msg.source);
          const textMatch = raw.match(/Content-Type: text\/plain[\s\S]*?\n\n([\s\S]*?)(?=\n--|\nContent-Type:|$)/i);
          bodyText = textMatch ? textMatch[1].trim() : stripHtml(raw).slice(0, 5000);
        }

        const { data: lead } = await supabase
          .from("em_leads")
          .select("id, status")
          .ilike("email", fromEmail)
          .maybeSingle();

        if (!lead) continue;

        const { data: lastSend } = await supabase
          .from("em_email_sends")
          .select("id")
          .eq("lead_id", lead.id)
          .eq("status", "sent")
          .order("sent_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        const now = new Date().toISOString();
        const { data: message } = await supabase
          .from("em_email_messages")
          .insert({
            lead_id: lead.id,
            send_id: lastSend?.id,
            direction: "inbound",
            from_email: fromEmail,
            to_email: user,
            subject,
            body_text: bodyText.slice(0, 10000),
            received_at: now,
            is_read: false,
          })
          .select()
          .single();

        await supabase.from("em_email_events").insert({
          send_id: lastSend?.id,
          lead_id: lead.id,
          message_id: message?.id,
          event_type: "replied",
          occurred_at: now,
        });

        await supabase
          .from("em_leads")
          .update({ status: "replied", updated_at: now })
          .eq("id", lead.id);

        await supabase
          .from("em_sequence_enrollments")
          .update({ status: "stopped", stopped_reason: "replied" })
          .eq("lead_id", lead.id)
          .eq("status", "active");

        processed++;
      }
    } finally {
      lock.release();
      await client.logout();
    }

    if (maxUid > lastUid) {
      await supabase
        .from("em_imap_state")
        .update({ last_uid: maxUid, updated_at: new Date().toISOString() })
        .eq("id", "default");
    }

    return jsonResponse({ ok: true, processed, last_uid: maxUid });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return jsonResponse({ ok: false, error: message }, 500);
  }
});
