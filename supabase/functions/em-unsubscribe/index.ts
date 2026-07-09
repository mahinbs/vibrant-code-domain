import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { corsHeaders, jsonResponse, createSupabaseAdmin } from "./lib/util.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const url = new URL(req.url);
    const encoded = url.searchParams.get("e") ?? "";
    let email = "";
    try {
      email = atob(decodeURIComponent(encoded));
    } catch {
      return jsonResponse({ ok: false, error: "Invalid token" }, 400);
    }

    const supabase = createSupabaseAdmin();
    const { data: lead } = await supabase
      .from("em_leads")
      .select("id")
      .ilike("email", email)
      .maybeSingle();

    const { data: existing } = await supabase
      .from("em_unsubscribes")
      .select("id")
      .ilike("email", email)
      .maybeSingle();
    if (!existing) {
      await supabase.from("em_unsubscribes").insert({
        email: email.toLowerCase(),
        lead_id: lead?.id,
      });
    }

    if (lead) {
      await supabase
        .from("em_leads")
        .update({ status: "unsubscribed", updated_at: new Date().toISOString() })
        .eq("id", lead.id);
      await supabase
        .from("em_sequence_enrollments")
        .update({ status: "stopped", stopped_reason: "unsubscribed" })
        .eq("lead_id", lead.id)
        .eq("status", "active");
    }

    return new Response(
      "<html><body style='font-family:sans-serif;text-align:center;padding:40px'><h1>Unsubscribed</h1><p>You have been removed from our mailing list.</p></body></html>",
      { headers: { ...corsHeaders, "Content-Type": "text/html" } },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return jsonResponse({ ok: false, error: message }, 500);
  }
});
