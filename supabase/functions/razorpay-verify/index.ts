import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import {
  corsHeaders,
  createSupabaseAdmin,
  hmacSha256Hex,
  jsonResponse,
  timingSafeEqual,
} from "../_shared/razorpay.ts";
import { maybeSendGstInvoice } from "../_shared/sendAcquisitionInvoice.ts";

type Body = {
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return jsonResponse({ ok: false, error: "Method not allowed" }, 405);

  try {
    const body = (await req.json()) as Body;
    const orderId = String(body.razorpay_order_id ?? "").trim();
    const paymentId = String(body.razorpay_payment_id ?? "").trim();
    const signature = String(body.razorpay_signature ?? "").trim();

    if (!orderId || !paymentId || !signature) {
      return jsonResponse({ ok: false, error: "Missing payment fields" }, 400);
    }

    const keySecret = Deno.env.get("RAZORPAY_KEY_SECRET");
    if (!keySecret) return jsonResponse({ ok: false, error: "Server not configured" }, 500);

    const expected = await hmacSha256Hex(keySecret, `${orderId}|${paymentId}`);
    if (!timingSafeEqual(expected, signature)) {
      return jsonResponse({ ok: false, error: "Invalid payment signature" }, 400);
    }

    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from("acquisition_payments")
      .update({
        status: "paid",
        razorpay_payment_id: paymentId,
        razorpay_signature: signature,
        updated_at: new Date().toISOString(),
      })
      .eq("razorpay_order_id", orderId)
      .select("id, plan_id, email, total_inr, name")
      .maybeSingle();

    if (error) {
      console.error("[razorpay-verify]", error);
      return jsonResponse({ ok: false, error: "Could not update payment" }, 500);
    }

    try {
      await maybeSendGstInvoice(supabase, orderId);
    } catch (invErr) {
      console.error("[razorpay-verify] invoice", invErr);
    }

    return jsonResponse({
      ok: true,
      payment: data,
      redirect: `/pay/success?order_id=${encodeURIComponent(orderId)}&payment_id=${encodeURIComponent(paymentId)}`,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[razorpay-verify]", message);
    return jsonResponse({ ok: false, error: message }, 500);
  }
});
