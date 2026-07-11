import type { createSupabaseAdmin } from "./util.ts";

type Supabase = ReturnType<typeof createSupabaseAdmin>;

export function parseEmailAddress(raw: string): string {
  const trimmed = raw.trim();
  const angle = trimmed.match(/<([^>]+)>/);
  return (angle ? angle[1] : trimmed).trim().toLowerCase();
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export type InboundReplyInput = {
  fromEmail: string;
  toEmail: string;
  subject: string;
  bodyText?: string;
  bodyHtml?: string | null;
  receivedAt?: string;
  dedupeKey: string;
  leadId?: string | null;
  sendId?: string | null;
};

export type InboundReplyResult =
  | { ok: true; processed: true; message_id: string; lead_id: string | null }
  | { ok: true; processed: false; reason: string };

export async function findOutboundContext(
  supabase: Supabase,
  senderEmail: string,
): Promise<{ leadId: string | null; sendId: string | null } | null> {
  const email = parseEmailAddress(senderEmail);

  const { data: send } = await supabase
    .from("em_email_sends")
    .select("id, lead_id")
    .eq("status", "sent")
    .ilike("to_email", email)
    .order("sent_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (send) {
    return { leadId: send.lead_id, sendId: send.id };
  }

  const { data: lead } = await supabase
    .from("em_leads")
    .select("id")
    .ilike("email", email)
    .maybeSingle();

  if (lead) {
    return { leadId: lead.id, sendId: null };
  }

  return null;
}

export async function recordInboundReply(
  supabase: Supabase,
  input: InboundReplyInput,
): Promise<InboundReplyResult> {
  const fromEmail = parseEmailAddress(input.fromEmail);
  const receivedAt = input.receivedAt ?? new Date().toISOString();

  const { data: existing } = await supabase
    .from("em_email_messages")
    .select("id")
    .eq("resend_message_id", input.dedupeKey)
    .maybeSingle();

  if (existing) {
    return { ok: true, processed: false, reason: "duplicate" };
  }

  let leadId = input.leadId ?? null;
  let sendId = input.sendId ?? null;

  if (!leadId) {
    const ctx = await findOutboundContext(supabase, fromEmail);
    if (!ctx) {
      return { ok: true, processed: false, reason: "no_matching_lead" };
    }
    leadId = ctx.leadId;
    sendId = ctx.sendId;
  } else if (!sendId) {
    const { data: send } = await supabase
      .from("em_email_sends")
      .select("id")
      .eq("lead_id", leadId)
      .eq("status", "sent")
      .order("sent_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    sendId = send?.id ?? null;
  }

  const { data: message, error: insertError } = await supabase
    .from("em_email_messages")
    .insert({
      lead_id: leadId,
      send_id: sendId,
      direction: "inbound",
      from_email: fromEmail,
      to_email: input.toEmail,
      subject: input.subject,
      body_text: (input.bodyText ?? "").slice(0, 10000),
      body_html: input.bodyHtml?.slice(0, 50000) ?? null,
      received_at: receivedAt,
      is_read: false,
      resend_message_id: input.dedupeKey,
    })
    .select("id")
    .single();

  if (insertError) {
    throw new Error(insertError.message);
  }

  if (leadId) {
    await supabase.from("em_email_events").insert({
      send_id: sendId,
      lead_id: leadId,
      message_id: message?.id,
      event_type: "replied",
      occurred_at: receivedAt,
    });

    await supabase
      .from("em_leads")
      .update({ status: "replied", updated_at: receivedAt })
      .eq("id", leadId);

    await supabase
      .from("em_sequence_enrollments")
      .update({ status: "stopped", stopped_reason: "replied" })
      .eq("lead_id", leadId)
      .eq("status", "active");
  }

  return { ok: true, processed: true, message_id: message!.id, lead_id: leadId };
}
