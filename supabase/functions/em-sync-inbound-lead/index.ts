import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { corsHeaders, jsonResponse, createSupabaseAdmin } from "../_shared/em/util.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createSupabaseAdmin();
    const body = await req.json().catch(() => ({}));
    const reshabLeadId = body.reshab_lead_id as string | undefined;

    let query = supabase.from("reshab_leads").select("*");
    if (reshabLeadId) query = query.eq("id", reshabLeadId);
    else query = query.order("created_at", { ascending: false }).limit(50);

    const { data: leads, error } = await query;
    if (error) throw error;

    let synced = 0;
    for (const lead of leads ?? []) {
      const { data: existing } = await supabase
        .from("em_leads")
        .select("id")
        .ilike("email", lead.email)
        .maybeSingle();

      let emLeadId = existing?.id;
      if (!emLeadId) {
        const { data: inserted } = await supabase
          .from("em_leads")
          .insert({
            email: lead.email.toLowerCase().trim(),
            name: lead.name,
            company: lead.company,
            phone: lead.phone,
            source: "inbound_form",
            pipeline: "inbound",
            status: "new",
            reshab_lead_id: lead.id,
            metadata: {
              source_page: lead.source_page,
              submission_type: lead.submission_type,
              lead_score: lead.lead_score,
              lead_tier: lead.lead_tier,
              payload: lead.payload,
            },
          })
          .select("id")
          .single();
        emLeadId = inserted?.id;
      }

      if (emLeadId) {
        const { data: seq } = await supabase
          .from("em_sequences")
          .select("id")
          .eq("pipeline", "inbound")
          .eq("is_default", true)
          .maybeSingle();
        if (seq) {
          await supabase.from("em_sequence_enrollments").upsert(
            {
              lead_id: emLeadId,
              sequence_id: seq.id,
              current_step: 0,
              status: "active",
              next_send_at: new Date().toISOString(),
            },
            { onConflict: "lead_id,sequence_id", ignoreDuplicates: true },
          );
        }
        synced++;
      }
    }

    return jsonResponse({ ok: true, synced });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return jsonResponse({ ok: false, error: message }, 500);
  }
});
