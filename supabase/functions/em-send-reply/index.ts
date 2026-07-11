import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { corsHeaders, jsonResponse, createSupabaseAdmin, getSetting } from "./lib/util.ts";
import { pickSendingIdentity, sendViaResend, incrementSenderCount } from "./lib/resend.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createSupabaseAdmin();
    const body = await req.json() as {
      lead_id: string;
      body_text: string;
      subject?: string;
      in_reply_to_message_id?: string;
    };

    if (!body.lead_id || !body.body_text?.trim()) {
      return jsonResponse({ ok: false, error: "lead_id and body_text required" }, 400);
    }

    const { data: lead } = await supabase
      .from("em_leads")
      .select("id, email, name")
      .eq("id", body.lead_id)
      .maybeSingle();
    if (!lead) throw new Error("Lead not found");

    let replySubject = body.subject?.trim() ?? "";
    let inReplyTo: string | undefined;
    let references: string | undefined;

    if (body.in_reply_to_message_id) {
      const { data: prior } = await supabase
        .from("em_email_messages")
        .select("subject, resend_message_id")
        .eq("id", body.in_reply_to_message_id)
        .maybeSingle();
      if (prior) {
        if (!replySubject) {
          replySubject = prior.subject?.match(/^re:/i) ? prior.subject : `Re: ${prior.subject}`;
        }
        if (prior.resend_message_id) {
          const mid = prior.resend_message_id.startsWith("<")
            ? prior.resend_message_id
            : `<${prior.resend_message_id}>`;
          inReplyTo = mid;
          references = mid;
        }
      }
    }

    if (!replySubject) {
      const { data: lastMsg } = await supabase
        .from("em_email_messages")
        .select("subject")
        .eq("lead_id", lead.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      const sub = lastMsg?.subject ?? "your message";
      replySubject = sub.match(/^re:/i) ? sub : `Re: ${sub}`;
    }

    const identity = await pickSendingIdentity();
    if (!identity) throw new Error("No sending identity available (daily cap reached?)");

    const replyTo = String(await getSetting(supabase, "reply_to_email", "leads-in@replies.boostmysites.com")).replace(
      /"/g,
      "",
    );

    const text = body.body_text.trim();
    const html = `<div style="font-family:sans-serif;white-space:pre-wrap">${text.replace(/\n/g, "<br>")}</div>`;

    const headers: Record<string, string> = {};
    if (inReplyTo) headers["In-Reply-To"] = inReplyTo;
    if (references) headers["References"] = references;

    const { data: sendRow } = await supabase
      .from("em_email_sends")
      .insert({
        lead_id: lead.id,
        subject: replySubject,
        to_email: lead.email,
        status: "queued",
        sending_identity_id: identity.id,
      })
      .select("id")
      .single();

    const result = await sendViaResend({
      from: `${identity.display_name} <${identity.email}>`,
      to: lead.email,
      subject: replySubject,
      html,
      text,
      replyTo,
      headers: Object.keys(headers).length ? headers : undefined,
      tags: [
        { name: "lead_id", value: lead.id },
        ...(sendRow ? [{ name: "send_id", value: sendRow.id }] : []),
      ],
    });

    const now = new Date().toISOString();
    if (sendRow) {
      await supabase
        .from("em_email_sends")
        .update({
          status: "sent",
          sent_at: now,
          resend_message_id: result.id,
        })
        .eq("id", sendRow.id);
    }

    const { data: message } = await supabase
      .from("em_email_messages")
      .insert({
        lead_id: lead.id,
        send_id: sendRow?.id ?? null,
        direction: "outbound",
        from_email: identity.email,
        to_email: lead.email,
        subject: replySubject,
        body_html: html,
        body_text: text,
        sending_identity_id: identity.id,
        resend_message_id: result.id,
        sent_at: now,
      })
      .select("id")
      .single();

    await supabase.from("em_email_events").insert({
      send_id: sendRow?.id ?? null,
      lead_id: lead.id,
      message_id: message?.id,
      event_type: "sent",
      occurred_at: now,
    });

    await incrementSenderCount(identity.id);

    return jsonResponse({ ok: true, message_id: result.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return jsonResponse({ ok: false, error: message }, 500);
  }
});
