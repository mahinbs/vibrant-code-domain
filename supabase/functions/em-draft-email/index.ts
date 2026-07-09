import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { corsHeaders, jsonResponse, createSupabaseAdmin } from "./lib/util.ts";

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

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createSupabaseAdmin();
    const { lead_id, step_order = 1, sequence_id } = await req.json();

    const { data: lead } = await supabase
      .from("em_leads")
      .select("*, em_companies(*)")
      .eq("id", lead_id)
      .single();
    if (!lead) throw new Error("Lead not found");

    const company = lead.em_companies as { name?: string; research_summary?: string; pain_points?: string[] } | null;
    const painPoints = (lead.pain_points as string[])?.length
      ? (lead.pain_points as string[])
      : (company?.pain_points as string[]) ?? [];
    const research = lead.research_summary ?? company?.research_summary ?? "";

    const stepLabel = step_order === 1 ? "initial cold outreach" : step_order === 2 ? "follow-up #2 (different angle, shorter)" : "breakup email (final, polite)";

    const prompt = `Write a ${stepLabel} email for Boostmysites (business automation consultancy).

Lead: ${lead.name ?? "there"} at ${lead.company ?? company?.name ?? "their company"}
Research: ${research}
Pain points: ${painPoints.join("; ")}

Voice: Reshab, founder — direct, raw, no corporate fluff. Short paragraphs. Under 150 words for follow-ups, under 200 for initial.

Respond JSON only:
{"subject": "...", "body": "plain text email body"}`;

    const raw = await claude(prompt);
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : { subject: "Quick question", body: raw };

    return jsonResponse({ ok: true, subject: parsed.subject, body: parsed.body });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return jsonResponse({ ok: false, error: message }, 500);
  }
});
