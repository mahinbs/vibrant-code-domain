import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { corsHeaders, jsonResponse, createSupabaseAdmin } from "../_shared/em/util.ts";
import {
  createResendDomain,
  verifyResendDomain,
  getResendDomain,
  sendViaResend,
} from "../_shared/em/resend.ts";

type Action =
  | { action: "add_domain"; domain: string; is_primary?: boolean }
  | { action: "verify_domain"; domain_id: string }
  | { action: "refresh_domain"; domain_id: string }
  | { action: "add_sender"; domain_id: string; local_part: string; display_name?: string; daily_cap?: number }
  | { action: "send_test"; sender_id: string; to_email: string }
  | { action: "update_settings"; settings: Record<string, unknown> };

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createSupabaseAdmin();
    const body = (await req.json()) as Action;

    if (body.action === "add_domain") {
      const domain = body.domain.trim().toLowerCase();
      const resendData = await createResendDomain(domain);
      const { data, error } = await supabase
        .from("em_domains")
        .insert({
          domain,
          resend_domain_id: resendData.id,
          status: resendData.status === "verified" ? "verified" : "pending",
          dns_records: resendData.records ?? [],
          is_primary: body.is_primary ?? false,
        })
        .select()
        .single();
      if (error) throw error;
      return jsonResponse({ ok: true, domain: data });
    }

    if (body.action === "verify_domain" || body.action === "refresh_domain") {
      const { data: row, error } = await supabase
        .from("em_domains")
        .select("*")
        .eq("id", body.domain_id)
        .single();
      if (error || !row) throw new Error("Domain not found");
      if (!row.resend_domain_id) throw new Error("No Resend domain id");

      if (body.action === "verify_domain") {
        await verifyResendDomain(row.resend_domain_id);
      }
      const resendData = await getResendDomain(row.resend_domain_id);
      const status = resendData.status === "verified" ? "verified" : "pending";
      const { data: updated } = await supabase
        .from("em_domains")
        .update({
          status,
          dns_records: resendData.records ?? row.dns_records,
          verified_at: status === "verified" ? new Date().toISOString() : row.verified_at,
        })
        .eq("id", body.domain_id)
        .select()
        .single();
      return jsonResponse({ ok: true, domain: updated });
    }

    if (body.action === "add_sender") {
      const { data: domain } = await supabase
        .from("em_domains")
        .select("domain")
        .eq("id", body.domain_id)
        .single();
      if (!domain) throw new Error("Domain not found");
      const email = `${body.local_part.trim().toLowerCase()}@${domain.domain}`;
      const { count } = await supabase
        .from("em_sending_identities")
        .select("*", { count: "exact", head: true });
      const { data: sender, error } = await supabase
        .from("em_sending_identities")
        .insert({
          domain_id: body.domain_id,
          email,
          display_name: body.display_name ?? "Boostmysites",
          daily_cap: body.daily_cap ?? 20,
          rotation_order: count ?? 0,
        })
        .select()
        .single();
      if (error) throw error;
      return jsonResponse({ ok: true, sender });
    }

    if (body.action === "send_test") {
      const { data: sender } = await supabase
        .from("em_sending_identities")
        .select("email, display_name")
        .eq("id", body.sender_id)
        .single();
      if (!sender) throw new Error("Sender not found");
      const replyTo = String(
        (await supabase.from("em_settings").select("value").eq("key", "reply_to_email").maybeSingle())
          .data?.value ?? "replies@boostmysites.com",
      ).replace(/"/g, "");
      const result = await sendViaResend({
        from: `${sender.display_name} <${sender.email}>`,
        to: body.to_email,
        subject: "BoostMySites Email Marketing — test send",
        html: "<p>This is a test email from your Email Marketing system. If you received this, sending is configured correctly.</p>",
        replyTo,
      });
      return jsonResponse({ ok: true, message_id: result.id });
    }

    if (body.action === "update_settings") {
      for (const [key, value] of Object.entries(body.settings)) {
        await supabase
          .from("em_settings")
          .upsert({ key, value, updated_at: new Date().toISOString() });
      }
      return jsonResponse({ ok: true });
    }

    return jsonResponse({ ok: false, error: "Unknown action" }, 400);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return jsonResponse({ ok: false, error: message }, 500);
  }
});
