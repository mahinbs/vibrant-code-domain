import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { buildEmail, pickTier, type DraftPayload } from "./templates.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SEND_EMAIL_URL = "https://send-mail-redirect-boostmysites.vercel.app/send-email";
const SITE_ORIGIN = Deno.env.get("SITE_ORIGIN") ?? "https://boostmysites.com";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } },
    );

    const { data: drafts, error } = await supabaseAdmin
      .from("founder_application_drafts")
      .select(
        "id, email, name, resume_token, current_step, payload, reminder_count, updated_at, recovery_sent_at, ego_email_sent_at",
      )
      .eq("status", "in_progress")
      .not("email", "is", null);

    if (error) throw error;

    const now = Date.now();
    let sent = 0;

    for (const row of drafts ?? []) {
      if (!row.email || !row.resume_token) continue;

      const draft: DraftPayload = {
        name: row.name,
        email: row.email,
        current_step: row.current_step,
        resume_token: row.resume_token,
        reminder_count: row.reminder_count ?? 0,
        updated_at: row.updated_at,
        payload: row.payload as Record<string, unknown>,
      };

      const tier = pickTier(draft, now);
      if (!tier) continue;

      if (tier === "r4_ego" && row.ego_email_sent_at) continue;

      const resumeUrl = `${SITE_ORIGIN}/founder-partnership?resume=${row.resume_token}`;
      const { subject, body } = buildEmail(draft, tier, resumeUrl);

      const mailRes = await fetch(SEND_EMAIL_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: row.email,
          subject,
          name: "Boostmysites",
          body,
        }),
      });

      if (!mailRes.ok) continue;

      const nextCount = (row.reminder_count ?? 0) + 1;
      const update: Record<string, unknown> = {
        reminder_count: nextCount,
        last_reminder_at: new Date().toISOString(),
        last_reminder_tier: tier,
      };

      if (tier === "r1" && !row.recovery_sent_at) {
        update.recovery_sent_at = new Date().toISOString();
      }
      if (tier === "r4_ego") {
        update.ego_email_sent_at = new Date().toISOString();
      }

      await supabaseAdmin.from("founder_application_drafts").update(update).eq("id", row.id);

      sent += 1;
    }

    return new Response(JSON.stringify({ ok: true, sent }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ ok: false, error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
