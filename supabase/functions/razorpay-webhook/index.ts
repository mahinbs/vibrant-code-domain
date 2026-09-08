import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import {
  corsHeaders,
  createSupabaseAdmin,
  hmacSha256Hex,
  jsonResponse,
  timingSafeEqual,
} from "../_shared/razorpay.ts";
import { maybeSendGstInvoice } from "../_shared/sendAcquisitionInvoice.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return jsonResponse({ ok: false, error: "Method not allowed" }, 405);

  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature") ?? "";
    const webhookSecret = Deno.env.get("RAZORPAY_WEBHOOK_SECRET");

    if (!webhookSecret) {
      console.error("[razorpay-webhook] RAZORPAY_WEBHOOK_SECRET missing");
      return jsonResponse({ ok: false, error: "Server not configured" }, 500);
    }

    const expected = await hmacSha256Hex(webhookSecret, rawBody);
    if (!signature || !timingSafeEqual(expected, signature)) {
      return jsonResponse({ ok: false, error: "Invalid webhook signature" }, 400);
    }

    const event = JSON.parse(rawBody) as {
      event?: string;
      id?: string;
      payload?: {
        payment?: { entity?: Record<string, unknown> };
        order?: { entity?: Record<string, unknown> };
      };
    };

    const eventName = event.event ?? "";
    const payment = event.payload?.payment?.entity;
    const order = event.payload?.order?.entity;
    const orderId = String(payment?.order_id ?? order?.id ?? "");
    const paymentId = payment?.id ? String(payment.id) : null;

    if (!orderId) {
      return jsonResponse({ ok: true, skipped: true, reason: "no order id" });
    }

    const supabase = createSupabaseAdmin();

    if (eventName === "payment.captured" || eventName === "order.paid") {
      await supabase
        .from("acquisition_payments")
        .update({
          status: "paid",
          razorpay_payment_id: paymentId,
          webhook_event_id: event.id ? String(event.id) : null,
          updated_at: new Date().toISOString(),
        })
        .eq("razorpay_order_id", orderId)
        .neq("status", "paid");

      try {
        await maybeSendGstInvoice(supabase, orderId);
      } catch (invErr) {
        console.error("[razorpay-webhook] invoice", invErr);
      }
    }

    if (eventName === "payment.failed") {
      await supabase
        .from("acquisition_payments")
        .update({
          status: "failed",
          razorpay_payment_id: paymentId,
          webhook_event_id: event.id ? String(event.id) : null,
          updated_at: new Date().toISOString(),
        })
        .eq("razorpay_order_id", orderId)
        .neq("status", "paid");
    }

    return jsonResponse({ ok: true, event: eventName });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[razorpay-webhook]", message);
    return jsonResponse({ ok: false, error: message }, 500);
  }
});
