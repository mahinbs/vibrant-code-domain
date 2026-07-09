import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { corsHeaders, jsonResponse, createSupabaseAdmin, renderTemplate } from "../_shared/em/util.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createSupabaseAdmin();
    const now = new Date().toISOString();

    const { data: due } = await supabase
      .from("em_sequence_enrollments")
      .select("*, em_leads(*), em_sequences(*)")
      .eq("status", "active")
      .lte("next_send_at", now);

    let processed = 0;

    for (const enrollment of due ?? []) {
      const lead = enrollment.em_leads as {
        id: string;
        email: string;
        name?: string;
        company?: string;
        status: string;
      } | null;
      if (!lead || ["unsubscribed", "bounced", "replied"].includes(lead.status)) {
        await supabase
          .from("em_sequence_enrollments")
          .update({ status: "stopped", stopped_reason: lead?.status === "replied" ? "replied" : "manual" })
          .eq("id", enrollment.id);
        continue;
      }

      const nextStepOrder = enrollment.current_step + 1;
      const { data: step } = await supabase
        .from("em_sequence_steps")
        .select("*")
        .eq("sequence_id", enrollment.sequence_id)
        .eq("step_order", nextStepOrder)
        .maybeSingle();

      if (!step) {
        await supabase
          .from("em_sequence_enrollments")
          .update({ status: "completed", stopped_reason: "completed" })
          .eq("id", enrollment.id);
        continue;
      }

      if (step.condition === "no_meeting") {
        const { data: meeting } = await supabase
          .from("em_meetings")
          .select("id")
          .eq("lead_id", lead.id)
          .in("status", ["booked", "reminded", "held"])
          .maybeSingle();
        if (meeting) {
          await supabase
            .from("em_sequence_enrollments")
            .update({ status: "stopped", stopped_reason: "manual" })
            .eq("id", enrollment.id);
          continue;
        }
      }

      if (step.condition === "no_reply") {
        const { data: reply } = await supabase
          .from("em_email_events")
          .select("id")
          .eq("lead_id", lead.id)
          .eq("event_type", "replied")
          .maybeSingle();
        if (reply) continue;
      }

      let subject = step.subject_template;
      let bodyText = step.body_template;

      const sequence = enrollment.em_sequences as { pipeline?: string } | null;

      if (step.ai_generated) {
        if (sequence?.pipeline === "cold") {
          await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/em-research-company`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ lead_id: lead.id }),
          });
        }
        const draftRes = await fetch(
          `${Deno.env.get("SUPABASE_URL")}/functions/v1/em-draft-email`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              lead_id: lead.id,
              step_order: nextStepOrder,
              sequence_id: enrollment.sequence_id,
            }),
          },
        );
        if (draftRes.ok) {
          const draft = await draftRes.json();
          subject = draft.subject ?? subject;
          bodyText = draft.body ?? bodyText;
        }
      }

      const vars = {
        name: lead.name ?? "there",
        company: lead.company ?? "your company",
        email: lead.email,
      };
      subject = renderTemplate(subject, vars);
      bodyText = renderTemplate(bodyText, vars);

      const { data: sendRow } = await supabase
        .from("em_email_sends")
        .insert({
          lead_id: lead.id,
          enrollment_id: enrollment.id,
          step_id: step.id,
          subject,
          to_email: lead.email,
          status: "queued",
        })
        .select()
        .single();

      if (sendRow) {
        await supabase.from("em_email_messages").insert({
          lead_id: lead.id,
          send_id: sendRow.id,
          direction: "outbound",
          from_email: "queued@system",
          to_email: lead.email,
          subject,
          body_text: bodyText,
        });
      }

      const { data: nextStep } = await supabase
        .from("em_sequence_steps")
        .select("delay_days")
        .eq("sequence_id", enrollment.sequence_id)
        .eq("step_order", nextStepOrder + 1)
        .maybeSingle();

      const nextSend = nextStep
        ? new Date(Date.now() + nextStep.delay_days * 24 * 60 * 60 * 1000).toISOString()
        : null;

      await supabase
        .from("em_sequence_enrollments")
        .update({
          current_step: nextStepOrder,
          next_send_at: nextSend,
          status: nextSend ? "active" : "completed",
          stopped_reason: nextSend ? null : "completed",
        })
        .eq("id", enrollment.id);

      processed++;
    }

    return jsonResponse({ ok: true, processed });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return jsonResponse({ ok: false, error: message }, 500);
  }
});
