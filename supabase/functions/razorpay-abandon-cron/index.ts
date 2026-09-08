import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import {
  corsHeaders,
  createSupabaseAdmin,
  jsonResponse,
} from "../_shared/razorpay.ts";
import { sendBillingEmail, siteOrigin } from "../_shared/billingResend.ts";

const WHATSAPP =
  Deno.env.get("BMS_WHATSAPP_HREF")?.trim() ||
  "https://wa.me/919632953355?text=" +
    encodeURIComponent("Hello BMS, I'd like to finish my AI Client Acquisition checkout.");

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return jsonResponse({ ok: false, error: "Method not allowed" }, 405);

  try {
    const supabase = createSupabaseAdmin();
    const cutoff = new Date(Date.now() - 60 * 60 * 1000).toISOString();

    const { data: rows, error } = await supabase
      .from("acquisition_payments")
      .select("id, name, email, plan_id, base_inr, gst_inr, total_inr, abandon_email_count")
      .eq("status", "pending")
      .lt("created_at", cutoff)
      .lt("abandon_email_count", 1)
      .order("created_at", { ascending: true })
      .limit(50);

    if (error) {
      console.error("[razorpay-abandon-cron]", error);
      return jsonResponse({ ok: false, error: error.message }, 500);
    }

    const origin = siteOrigin();
    let sent = 0;

    for (const row of rows ?? []) {
      const planLabel = row.plan_id === "yearly" ? "1 year" : "1 month";
      const payUrl = `${origin}/pay?plan=${row.plan_id}`;
      const html = `<!DOCTYPE html>
<html><body style="font-family:Arial,Helvetica,sans-serif;color:#111;padding:24px;background:#f4f4f5;">
  <div style="max-width:520px;margin:0 auto;background:#fff;border:1px solid #e4e4e7;padding:28px;">
    <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:#71717a;">Checkout reminder</p>
    <h1 style="margin:0 0 12px;font-size:20px;">Hi ${escapeHtml(row.name)}, your acquisition stack is waiting</h1>
    <p style="margin:0 0 16px;font-size:14px;line-height:1.5;color:#3f3f46;">
      You started checkout for the <strong>AI Client Acquisition System (${escapeHtml(planLabel)})</strong>
      — ₹${Number(row.base_inr).toLocaleString("en-IN")} + GST
      (total ₹${Number(row.total_inr).toLocaleString("en-IN")}) — but payment wasn’t completed.
    </p>
    <p style="margin:0 0 20px;">
      <a href="${payUrl}" style="display:inline-block;background:#4e78ff;color:#fff;text-decoration:none;padding:12px 18px;border-radius:8px;font-weight:600;font-size:14px;">
        Complete payment
      </a>
    </p>
    <p style="margin:0;font-size:13px;color:#71717a;">
      Questions? <a href="${WHATSAPP}" style="color:#4e78ff;">WhatsApp us</a>
    </p>
  </div>
</body></html>`;

      try {
        await sendBillingEmail({
          to: row.email,
          subject: "Your acquisition stack checkout is waiting",
          html,
          text: `Hi ${row.name}, finish your AI Client Acquisition (${planLabel}) payment: ${payUrl}`,
        });

        await supabase
          .from("acquisition_payments")
          .update({
            abandon_email_sent_at: new Date().toISOString(),
            abandon_email_count: (row.abandon_email_count ?? 0) + 1,
            updated_at: new Date().toISOString(),
          })
          .eq("id", row.id)
          .eq("status", "pending");

        sent += 1;
      } catch (err) {
        console.error("[razorpay-abandon-cron] send", row.id, err);
      }
    }

    return jsonResponse({ ok: true, scanned: rows?.length ?? 0, sent });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[razorpay-abandon-cron]", message);
    return jsonResponse({ ok: false, error: message }, 500);
  }
});

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
