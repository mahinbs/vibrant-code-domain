import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { corsHeaders, jsonResponse, createSupabaseAdmin } from "./lib/util.ts";
import { geminiGenerate } from "./lib/gemini.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createSupabaseAdmin();
    const { company_id, lead_id } = await req.json();

    let company: {
      id: string;
      name: string;
      domain?: string | null;
      industry?: string | null;
      research_summary?: string | null;
    } | null = null;
    if (company_id) {
      const { data } = await supabase.from("em_companies").select("*").eq("id", company_id).single();
      company = data;
    } else if (lead_id) {
      const { data: lead } = await supabase.from("em_leads").select("*, em_companies(*)").eq("id", lead_id).single();
      company = lead?.em_companies ?? null;
      if (!company && lead) {
        const { data: created } = await supabase
          .from("em_companies")
          .insert({
            name: lead.company ?? lead.name ?? "Unknown",
            domain: (lead.metadata as { website?: string })?.website,
            source: "manual",
          })
          .select()
          .single();
        company = created;
        if (company) {
          await supabase.from("em_leads").update({ company_id: company.id }).eq("id", lead_id);
        }
      }
    }

    if (!company) throw new Error("Company not found");

    if (company.research_summary) {
      return jsonResponse({ ok: true, cached: true, company });
    }

    const prompt = `Research the company "${company.name}"${company.domain ? ` (${company.domain})` : ""}${company.industry ? ` in ${company.industry}` : ""}.

Identify 2-3 likely operational pain points that could be solved with business automation (not generic — be specific to their industry).

Respond in JSON only:
{
  "research_summary": "2-3 sentence company overview",
  "pain_points": ["pain point 1", "pain point 2", "pain point 3"]
}`;

    const raw = await geminiGenerate(prompt);
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : { research_summary: raw, pain_points: [] };

    const { data: updated } = await supabase
      .from("em_companies")
      .update({
        research_summary: parsed.research_summary,
        pain_points: parsed.pain_points,
        status: "researched",
        updated_at: new Date().toISOString(),
      })
      .eq("id", company.id)
      .select()
      .single();

    if (lead_id) {
      await supabase
        .from("em_leads")
        .update({
          research_summary: parsed.research_summary,
          pain_points: parsed.pain_points,
          status: "researched",
          updated_at: new Date().toISOString(),
        })
        .eq("id", lead_id);
    }

    return jsonResponse({ ok: true, company: updated });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return jsonResponse({ ok: false, error: message }, 500);
  }
});
