import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import {
  corsHeaders,
  jsonResponse,
  createSupabaseAdmin,
  renderTemplate,
  getSetting,
} from "./lib/util.ts";
import { resolveCaseStudyForStep } from "./lib/caseStudies.ts";

type StepRow = {
  id: string;
  step_order: number;
  delay_days: number;
  delay_hours: number;
  subject_template: string;
  body_template: string;
  ai_generated: boolean;
  condition: string;
  step_type: string;
  ai_angle: string | null;
  ai_instructions: string | null;
  case_study_slug: string | null;
  case_study_url: string | null;
  case_study_mode: string;
  intro_template: string | null;
};

async function evaluateCondition(
  supabase: ReturnType<typeof createSupabaseAdmin>,
  step: StepRow,
  leadId: string,
  enrollmentId: string,
): Promise<boolean> {
  if (step.condition === "always") return true;

  if (step.condition === "no_reply") {
    const { data: reply } = await supabase
      .from("em_email_events")
      .select("id")
      .eq("lead_id", leadId)
      .eq("event_type", "replied")
      .maybeSingle();
    return !reply;
  }

  if (step.condition === "no_meeting") {
    const { data: meeting } = await supabase
      .from("em_meetings")
      .select("id")
      .eq("lead_id", leadId)
      .in("status", ["booked", "reminded", "held"])
      .maybeSingle();
    return !meeting;
  }

  if (step.condition === "no_open") {
    const { data: sends } = await supabase
      .from("em_email_sends")
      .select("id")
      .eq("enrollment_id", enrollmentId)
      .eq("status", "sent");
    if (!sends?.length) return true;
    const sendIds = sends.map((s: { id: string }) => s.id);
    const { data: opens } = await supabase
      .from("em_email_events")
      .select("id")
      .in("send_id", sendIds)
      .eq("event_type", "opened")
      .limit(1);
    return !opens?.length;
  }

  if (step.condition === "opened_not_replied") {
    const { data: sends } = await supabase
      .from("em_email_sends")
      .select("id")
      .eq("enrollment_id", enrollmentId)
      .eq("status", "sent");
    if (!sends?.length) return false;
    const sendIds = sends.map((s: { id: string }) => s.id);
    const { data: opens } = await supabase
      .from("em_email_events")
      .select("id")
      .in("send_id", sendIds)
      .eq("event_type", "opened")
      .limit(1);
    if (!opens?.length) return false;
    const { data: reply } = await supabase
      .from("em_email_events")
      .select("id")
      .eq("lead_id", leadId)
      .eq("event_type", "replied")
      .maybeSingle();
    return !reply;
  }

  return true;
}

async function resolveStepContent(
  supabase: ReturnType<typeof createSupabaseAdmin>,
  step: StepRow,
  lead: {
    id: string;
    email: string;
    name?: string;
    company?: string;
    research_summary?: string;
    metadata?: Record<string, unknown>;
    em_companies?: { industry?: string; research_summary?: string; pain_points?: string[] } | null;
  },
  enrollmentId: string,
  sequenceId: string,
  sequence: { pipeline?: string; name?: string; vertical?: string } | null,
): Promise<{ subject: string; bodyText: string }> {
  const siteOrigin = String(await getSetting(supabase, "site_origin", "https://boostmysites.com")).replace(/"/g, "");
  const stepType = step.step_type ?? (step.ai_generated ? "ai_draft" : "template");

  const baseVars: Record<string, string> = {
    name: lead.name ?? "there",
    company: lead.company ?? "your company",
    email: lead.email,
  };

  if (stepType === "template") {
    return {
      subject: renderTemplate(step.subject_template, baseVars),
      bodyText: renderTemplate(step.body_template, baseVars),
    };
  }

  if (stepType === "case_study") {
    const cs = resolveCaseStudyForStep(step, lead, siteOrigin);
    const vars = {
      ...baseVars,
      case_study_title: cs.title,
      case_study_hook: cs.hook,
      case_study_url: cs.url,
      case_study_metric_1: cs.metric1,
    };
    const intro = step.intro_template ?? step.body_template;
    const body = renderTemplate(intro, vars);
    const subject = renderTemplate(
      step.subject_template || `Case study for ${baseVars.company}`,
      vars,
    );
    return { subject, bodyText: body };
  }

  const needsAi = stepType === "ai_draft" || stepType === "hybrid";
  if (needsAi) {
    const { data: cached } = await supabase
      .from("em_ai_draft_cache")
      .select("subject, body")
      .eq("lead_id", lead.id)
      .eq("step_id", step.id)
      .eq("enrollment_id", enrollmentId)
      .maybeSingle();

    let subject = step.subject_template;
    let bodyText = step.body_template;

    if (cached) {
      subject = cached.subject;
      bodyText = cached.body;
    } else {
      if (sequence?.pipeline === "cold") {
        const research = lead.research_summary ?? lead.em_companies?.research_summary ?? "";
        if (!research && (step.ai_angle === "opener" || !step.ai_angle)) {
          await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/em-research-company`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ lead_id: lead.id }),
          });
        }
      }

      const draftRes = await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/em-draft-email`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lead_id: lead.id,
          step_id: step.id,
          step_order: step.step_order,
          sequence_id: sequenceId,
          enrollment_id: enrollmentId,
          preview: false,
          slot: stepType === "hybrid" ? "body_middle" : undefined,
        }),
      });

      if (draftRes.ok) {
        const draft = await draftRes.json();
        subject = draft.subject ?? subject;
        bodyText = draft.body ?? bodyText;

        await supabase.from("em_ai_draft_cache").upsert({
          lead_id: lead.id,
          step_id: step.id,
          enrollment_id: enrollmentId,
          subject,
          body: bodyText,
        }, { onConflict: "lead_id,step_id,enrollment_id" });
      }
    }

    if (stepType === "hybrid" && step.intro_template) {
      bodyText = renderTemplate(step.intro_template, {
        ...baseVars,
        ai_body: bodyText,
      }).replace(/\{\{ai_body\}\}/g, bodyText);
    }

    return {
      subject: renderTemplate(subject, baseVars),
      bodyText: renderTemplate(bodyText, baseVars),
    };
  }

  return {
    subject: renderTemplate(step.subject_template, baseVars),
    bodyText: renderTemplate(step.body_template, baseVars),
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createSupabaseAdmin();
    const now = new Date().toISOString();

    const { data: due } = await supabase
      .from("em_sequence_enrollments")
      .select("*, em_leads(*, em_companies(*)), em_sequences(*)")
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
        research_summary?: string;
        metadata?: Record<string, unknown>;
        em_companies?: { industry?: string; research_summary?: string; pain_points?: string[] } | null;
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

      const shouldSend = await evaluateCondition(supabase, step as StepRow, lead.id, enrollment.id);
      if (!shouldSend) {
        if (step.condition === "no_reply") {
          const { data: reply } = await supabase
            .from("em_email_events")
            .select("id")
            .eq("lead_id", lead.id)
            .eq("event_type", "replied")
            .maybeSingle();
          if (reply) {
            await supabase
              .from("em_sequence_enrollments")
              .update({ status: "stopped", stopped_reason: "replied" })
              .eq("id", enrollment.id);
            continue;
          }
        }

        const { data: nextStep } = await supabase
          .from("em_sequence_steps")
          .select("delay_days, delay_hours")
          .eq("sequence_id", enrollment.sequence_id)
          .eq("step_order", nextStepOrder + 1)
          .maybeSingle();

        const delayMs =
          ((nextStep?.delay_days ?? 0) * 24 * 60 * 60 + (nextStep?.delay_hours ?? 0) * 60 * 60) * 1000;
        const nextSend = nextStep
          ? new Date(Date.now() + delayMs).toISOString()
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
        continue;
      }

      const sequence = enrollment.em_sequences as { pipeline?: string; name?: string; vertical?: string } | null;
      const { subject, bodyText } = await resolveStepContent(
        supabase,
        step as StepRow,
        lead,
        enrollment.id,
        enrollment.sequence_id,
        sequence,
      );

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
        .select("delay_days, delay_hours")
        .eq("sequence_id", enrollment.sequence_id)
        .eq("step_order", nextStepOrder + 1)
        .maybeSingle();

      const delayMs =
        ((nextStep?.delay_days ?? 0) * 24 * 60 * 60 + (nextStep?.delay_hours ?? 0) * 60 * 60) * 1000;
      const nextSend = nextStep ? new Date(Date.now() + delayMs).toISOString() : null;

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
