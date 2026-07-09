import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { corsHeaders, jsonResponse, createSupabaseAdmin } from "./lib/util.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createSupabaseAdmin();
    const payload = await req.json();

    const inviteeEmail = payload.payload?.invitee?.email
      ?? payload.payload?.email
      ?? payload.email;
    const eventStart = payload.payload?.scheduled_event?.start_time
      ?? payload.payload?.start_time
      ?? payload.start_time;
    const eventId = payload.payload?.scheduled_event?.uri
      ?? payload.event_id
      ?? String(Date.now());

    if (!inviteeEmail) {
      return jsonResponse({ ok: true, skipped: true });
    }

    const { data: lead } = await supabase
      .from("em_leads")
      .select("id")
      .ilike("email", inviteeEmail)
      .maybeSingle();

    if (!lead) {
      return jsonResponse({ ok: true, skipped: true, reason: "lead not found" });
    }

    const meetingAt = eventStart ? new Date(eventStart).toISOString() : null;
    await supabase.from("em_meetings").insert({
      lead_id: lead.id,
      source: "strategy_call",
      cal_event_id: eventId,
      booked_at: new Date().toISOString(),
      meeting_at: meetingAt,
      status: "booked",
    });

    await supabase
      .from("em_sequence_enrollments")
      .update({ status: "stopped", stopped_reason: "manual" })
      .eq("lead_id", lead.id)
      .eq("status", "active");

    const subject = "Your strategy call is confirmed";
    const bodyText = `Hi,\n\nYour meeting is confirmed${meetingAt ? ` for ${new Date(meetingAt).toLocaleString()}` : ""}.\n\nLooking forward to speaking with you.\n\nReshab`;

    await supabase.from("em_email_sends").insert({
      lead_id: lead.id,
      subject,
      to_email: inviteeEmail,
      status: "queued",
    });

    return jsonResponse({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return jsonResponse({ ok: false, error: message }, 500);
  }
});
