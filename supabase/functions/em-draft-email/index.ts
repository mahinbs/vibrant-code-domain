import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import {
  corsHeaders,
  jsonResponse,
  createSupabaseAdmin,
  getSetting,
} from "./lib/util.ts";
import { resolveCaseStudyForStep } from "./lib/caseStudies.ts";

const ANTHROPIC_API = "https://api.anthropic.com/v1/messages";

async function claude(prompt: string): Promise<string> {
  const key = Deno.env.get("ANTHROPIC_API_KEY");
  if (!key) throw new Error("ANTHROPIC_API_KEY not configured");
  const res = await fetch(ANTHROPIC_API, {
    method: "POST",
    headers: {
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message ?? "Claude API error");
  const block = data.content?.[0];
  return block?.type === "text" ? block.text : "";
}

function anglePrompt(angle: string | null, instructions: string | null): string {
  switch (angle) {
    case "opener":
      return "Write an initial cold outreach email. Research-heavy, under 200 words.";
    case "niche_followup":
      return "Write a follow-up email for their industry. Reference one pain point, use a different angle than previous emails, under 150 words.";
    case "breakup":
      return "Write a polite final breakup email. Under 80 words.";
    case "case_study_tease":
      return "Write 2 short sentences teasing a relevant case study, include {{case_study_url}} placeholder. Under 60 words.";
    case "custom":
      return instructions ?? "Write a concise outreach email.";
    default:
      return instructions ?? "Write a concise outreach email.";
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createSupabaseAdmin();
    const body = await req.json();

    if (body.action === "bust_cache" && body.step_id) {
      await supabase.from("em_ai_draft_cache").delete().eq("step_id", body.step_id);
      return jsonResponse({ ok: true });
    }

    const {
      lead_id,
      step_id,
      step_order = 1,
      sequence_id,
      enrollment_id,
      preview = false,
      slot,
      sample_lead,
    } = body;

    let lead = sample_lead;
    if (!preview && lead_id) {
      const { data } = await supabase
        .from("em_leads")
        .select("*, em_companies(*)")
        .eq("id", lead_id)
        .single();
      lead = data;
    }
    if (!lead) throw new Error("Lead not found");

    let step: {
      ai_angle?: string | null;
      ai_instructions?: string | null;
      step_type?: string;
      case_study_slug?: string | null;
      case_study_url?: string | null;
      case_study_mode?: string;
    } | null = null;

    if (step_id) {
      const { data } = await supabase.from("em_sequence_steps").select("*").eq("id", step_id).maybeSingle();
      step = data;
    } else if (sequence_id && step_order) {
      const { data } = await supabase
        .from("em_sequence_steps")
        .select("*")
        .eq("sequence_id", sequence_id)
        .eq("step_order", step_order)
        .maybeSingle();
      step = data;
    }

    const aiAngle = step?.ai_angle ?? (step_order === 1 ? "opener" : step_order === 2 ? "niche_followup" : "breakup");
    const aiInstructions = step?.ai_instructions ?? null;

    const company = lead.em_companies as {
      name?: string;
      industry?: string;
      research_summary?: string;
      pain_points?: string[];
    } | null;
    const painPoints = (lead.pain_points as string[])?.length
      ? (lead.pain_points as string[])
      : (company?.pain_points as string[]) ?? [];
    const research = lead.research_summary ?? company?.research_summary ?? "";
    const industry =
      company?.industry ??
      (lead.metadata?.industry as string | undefined) ??
      (lead.metadata?.vertical as string | undefined) ??
      "general";

    let threadContext = "";
    if (!preview && lead_id) {
      const { data: messages } = await supabase
        .from("em_email_messages")
        .select("subject, body_text, created_at")
        .eq("lead_id", lead_id)
        .eq("direction", "outbound")
        .order("created_at", { ascending: false })
        .limit(3);
      if (messages?.length) {
        threadContext = messages
          .map((m: { subject: string; body_text?: string }) =>
            `Subject: ${m.subject}\n${(m.body_text ?? "").slice(0, 300)}`
          )
          .join("\n---\n");
      }
    }

    let sequenceName = "";
    let sequenceVertical = "";
    if (sequence_id && !preview) {
      const { data: seq } = await supabase.from("em_sequences").select("name, vertical").eq("id", sequence_id).maybeSingle();
      sequenceName = seq?.name ?? "";
      sequenceVertical = seq?.vertical ?? "";
    }

    const siteOrigin = String(await getSetting(supabase, "site_origin", "https://boostmysites.com")).replace(/"/g, "");
    let caseStudyBlock = "";
    if (step?.step_type === "case_study" || aiAngle === "case_study_tease") {
      const cs = resolveCaseStudyForStep(step ?? {}, lead, siteOrigin);
      caseStudyBlock = `Case study: ${cs.title} — ${cs.hook} (${cs.url})`;
    }

    const brief = anglePrompt(aiAngle, aiInstructions);
    const slotNote = slot === "body_middle"
      ? "Return only the middle paragraph (2-3 sentences) as the body field."
      : "";

    const prompt = `You are drafting email copy for Boostmysites (business automation consultancy).

Task: ${brief}
${slotNote}

Lead: ${lead.name ?? "there"} at ${lead.company ?? company?.name ?? "their company"}
Industry: ${industry}
Sequence: ${sequenceName} (${sequenceVertical})
Research: ${research}
Pain points: ${painPoints.join("; ")}
${caseStudyBlock ? `\n${caseStudyBlock}` : ""}
${threadContext ? `\nPrevious outbound emails (do not repeat):\n${threadContext}` : ""}

Voice: Reshab, founder — direct, raw, no corporate fluff. Short paragraphs.

Respond JSON only:
{"subject": "...", "body": "plain text email body"}`;

    const raw = await claude(prompt);
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : { subject: "Quick question", body: raw };

    if (!preview && enrollment_id && step_id && lead_id) {
      await supabase.from("em_ai_draft_cache").upsert({
        lead_id,
        step_id,
        enrollment_id,
        subject: parsed.subject,
        body: parsed.body,
      }, { onConflict: "lead_id,step_id,enrollment_id" });
    }

    return jsonResponse({ ok: true, subject: parsed.subject, body: parsed.body });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return jsonResponse({ ok: false, error: message }, 500);
  }
});
