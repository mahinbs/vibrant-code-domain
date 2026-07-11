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
  branch_lane?: string;
  branch_after_step_order?: number | null;
};

const LANE_PRIORITY: Record<string, number> = {
  opened: 0,
  main: 1,
  not_opened: 2,
};

function sortLanes(steps: StepRow[]): StepRow[] {
  return [...steps].sort(
    (a, b) => (LANE_PRIORITY[a.branch_lane ?? "main"] ?? 9) - (LANE_PRIORITY[b.branch_lane ?? "main"] ?? 9),
  );
}

function needsEngagementCheck(condition: string): boolean {
  return ["no_open", "opened_not_replied", "opened", "clicked"].includes(condition);
}

async function getPreviousSend(
  supabase: ReturnType<typeof createSupabaseAdmin>,
  enrollmentId: string,
  currentStepOrder: number,
) {
  const { data: sends } = await supabase
    .from("em_email_sends")
    .select("id, sent_at, step_id")
    .eq("enrollment_id", enrollmentId)
    .eq("status", "sent")
    .order("sent_at", { ascending: false });

  for (const send of sends ?? []) {
    if (!send.step_id) continue;
    const { data: stepRow } = await supabase
      .from("em_sequence_steps")
      .select("step_order")
      .eq("id", send.step_id)
      .maybeSingle();
    if (stepRow && stepRow.step_order < currentStepOrder) {
      return send as { id: string; sent_at: string | null; step_id: string };
    }
  }
  return null;
}

async function hasRepliedSinceEnrollment(
  supabase: ReturnType<typeof createSupabaseAdmin>,
  leadId: string,
  enrolledAt: string,
): Promise<boolean> {
  const { data } = await supabase
    .from("em_email_events")
    .select("id")
    .eq("lead_id", leadId)
    .eq("event_type", "replied")
    .gte("occurred_at", enrolledAt)
    .limit(1);
  return (data?.length ?? 0) > 0;
}

async function hasEventOnSend(
  supabase: ReturnType<typeof createSupabaseAdmin>,
  sendId: string,
  eventType: string,
): Promise<boolean> {
  const { data } = await supabase
    .from("em_email_events")
    .select("id")
    .eq("send_id", sendId)
    .eq("event_type", eventType)
    .limit(1);
  return (data?.length ?? 0) > 0;
}

async function ensureDelayForEval(
  supabase: ReturnType<typeof createSupabaseAdmin>,
  enrollmentId: string,
  step: StepRow,
  enrolledAt: string,
): Promise<boolean> {
  if (!needsEngagementCheck(step.condition)) return true;

  const prevSend = await getPreviousSend(supabase, enrollmentId, step.step_order);
  const baseTime = prevSend?.sent_at ?? enrolledAt;
  const delayMs =
    (step.delay_days * 24 * 60 * 60 + (step.delay_hours ?? 0) * 60 * 60) * 1000;
  const readyAt = new Date(baseTime).getTime() + delayMs;

  if (Date.now() < readyAt) {
    await supabase
      .from("em_sequence_enrollments")
      .update({ next_send_at: new Date(readyAt).toISOString() })
      .eq("id", enrollmentId);
    return false;
  }
  return true;
}

async function evaluateCondition(
  supabase: ReturnType<typeof createSupabaseAdmin>,
  step: StepRow,
  leadId: string,
  enrollmentId: string,
  enrolledAt: string,
): Promise<boolean> {
  if (step.condition === "always") return true;

  if (step.condition === "no_reply") {
    return !(await hasRepliedSinceEnrollment(supabase, leadId, enrolledAt));
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

  const prevSend = await getPreviousSend(supabase, enrollmentId, step.step_order);

  if (step.condition === "no_open") {
    if (!prevSend) return true;
    return !(await hasEventOnSend(supabase, prevSend.id, "opened"));
  }

  if (step.condition === "opened") {
    if (!prevSend) return false;
    return await hasEventOnSend(supabase, prevSend.id, "opened");
  }

  if (step.condition === "clicked") {
    if (!prevSend) return false;
    return await hasEventOnSend(supabase, prevSend.id, "clicked");
  }

  if (step.condition === "opened_not_replied") {
    if (!prevSend) return false;
    if (!(await hasEventOnSend(supabase, prevSend.id, "opened"))) return false;
    return !(await hasRepliedSinceEnrollment(supabase, leadId, enrolledAt));
  }

  return true;
}

async function recordSkip(
  supabase: ReturnType<typeof createSupabaseAdmin>,
  enrollmentId: string,
  stepOrder: number,
  condition: string,
) {
  await supabase
    .from("em_sequence_enrollments")
    .update({
      last_skip_reason: `condition_not_met:${condition}`,
      last_skip_step_order: stepOrder,
    })
    .eq("id", enrollmentId);
}

async function getNextStepOrder(
  supabase: ReturnType<typeof createSupabaseAdmin>,
  sequenceId: string,
  afterOrder: number,
): Promise<number | null> {
  const { data } = await supabase
    .from("em_sequence_steps")
    .select("step_order")
    .eq("sequence_id", sequenceId)
    .gt("step_order", afterOrder)
    .order("step_order", { ascending: true })
    .limit(1)
    .maybeSingle();
  return data?.step_order ?? null;
}

async function getDelayForStepOrder(
  supabase: ReturnType<typeof createSupabaseAdmin>,
  sequenceId: string,
  stepOrder: number,
) {
  const { data: main } = await supabase
    .from("em_sequence_steps")
    .select("delay_days, delay_hours")
    .eq("sequence_id", sequenceId)
    .eq("step_order", stepOrder)
    .eq("branch_lane", "main")
    .maybeSingle();
  if (main) return main;

  const { data: anyStep } = await supabase
    .from("em_sequence_steps")
    .select("delay_days, delay_hours")
    .eq("sequence_id", sequenceId)
    .eq("step_order", stepOrder)
    .limit(1)
    .maybeSingle();
  return anyStep;
}

async function advanceEnrollment(
  supabase: ReturnType<typeof createSupabaseAdmin>,
  enrollmentId: string,
  sequenceId: string,
  completedStepOrder: number,
) {
  const nextOrder = await getNextStepOrder(supabase, sequenceId, completedStepOrder);
  if (!nextOrder) {
    await supabase
      .from("em_sequence_enrollments")
      .update({
        current_step: completedStepOrder,
        next_send_at: null,
        status: "completed",
        stopped_reason: "completed",
      })
      .eq("id", enrollmentId);
    return;
  }

  const nextStep = await getDelayForStepOrder(supabase, sequenceId, nextOrder);
  const delayMs =
    ((nextStep?.delay_days ?? 0) * 24 * 60 * 60 + (nextStep?.delay_hours ?? 0) * 60 * 60) * 1000;
  const nextSend = new Date(Date.now() + delayMs).toISOString();

  await supabase
    .from("em_sequence_enrollments")
    .update({
      current_step: completedStepOrder,
      next_send_at: nextSend,
      status: "active",
      stopped_reason: null,
    })
    .eq("id", enrollmentId);
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
    calendly_url: String(await getSetting(supabase, "calendly_url", "")).replace(/"/g, ""),
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

async function queueStepSend(
  supabase: ReturnType<typeof createSupabaseAdmin>,
  step: StepRow,
  lead: { id: string; email: string },
  enrollmentId: string,
  sequenceId: string,
  sequence: { pipeline?: string; name?: string; vertical?: string } | null,
): Promise<boolean> {
  const { subject, bodyText } = await resolveStepContent(
    supabase,
    step,
    lead,
    enrollmentId,
    sequenceId,
    sequence,
  );

  const { data: sendRow } = await supabase
    .from("em_email_sends")
    .insert({
      lead_id: lead.id,
      enrollment_id: enrollmentId,
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
  return !!sendRow;
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
      const { data: stepsAtOrder } = await supabase
        .from("em_sequence_steps")
        .select("*")
        .eq("sequence_id", enrollment.sequence_id)
        .eq("step_order", nextStepOrder);

      if (!stepsAtOrder?.length) {
        await supabase
          .from("em_sequence_enrollments")
          .update({ status: "completed", stopped_reason: "completed" })
          .eq("id", enrollment.id);
        continue;
      }

      const lanes = sortLanes(stepsAtOrder as StepRow[]);
      const hasMultipleLanes = lanes.length > 1 && lanes.some((s) => s.branch_lane !== "main");
      const enrolledAt = enrollment.enrolled_at as string;
      const sequence = enrollment.em_sequences as { pipeline?: string; name?: string; vertical?: string } | null;

      const delayOk = await ensureDelayForEval(supabase, enrollment.id, lanes[0], enrolledAt);
      if (!delayOk) continue;

      let stepToSend: StepRow | null = null;

      if (hasMultipleLanes) {
        for (const lane of lanes) {
          if (await evaluateCondition(supabase, lane, lead.id, enrollment.id, enrolledAt)) {
            stepToSend = lane;
            break;
          }
        }
        if (!stepToSend) {
          await recordSkip(supabase, enrollment.id, nextStepOrder, "no_matching_lane");
          if (await hasRepliedSinceEnrollment(supabase, lead.id, enrolledAt)) {
            await supabase
              .from("em_sequence_enrollments")
              .update({ status: "stopped", stopped_reason: "replied" })
              .eq("id", enrollment.id);
            continue;
          }
          await advanceEnrollment(supabase, enrollment.id, enrollment.sequence_id, nextStepOrder);
          continue;
        }
      } else {
        const step = lanes[0];
        const shouldSend = await evaluateCondition(supabase, step, lead.id, enrollment.id, enrolledAt);
        if (!shouldSend) {
          await recordSkip(supabase, enrollment.id, nextStepOrder, step.condition);
          if (step.condition === "no_reply" && await hasRepliedSinceEnrollment(supabase, lead.id, enrolledAt)) {
            await supabase
              .from("em_sequence_enrollments")
              .update({ status: "stopped", stopped_reason: "replied" })
              .eq("id", enrollment.id);
            continue;
          }
          await advanceEnrollment(supabase, enrollment.id, enrollment.sequence_id, nextStepOrder);
          continue;
        }
        stepToSend = step;
      }

      const queued = await queueStepSend(
        supabase,
        stepToSend,
        lead,
        enrollment.id,
        enrollment.sequence_id,
        sequence,
      );
      if (queued) {
        await supabase
          .from("em_sequence_enrollments")
          .update({ last_skip_reason: null, last_skip_step_order: null })
          .eq("id", enrollment.id);
        await advanceEnrollment(supabase, enrollment.id, enrollment.sequence_id, nextStepOrder);
        processed++;
      }
    }

    return jsonResponse({ ok: true, processed });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return jsonResponse({ ok: false, error: message }, 500);
  }
});
