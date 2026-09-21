import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { corsHeaders, createSupabaseAdmin, jsonResponse } from "../_shared/razorpay.ts";
import { verifyStripeSignature } from "../_shared/stripe.ts";

type StripeSession = {
  id?: string;
  payment_status?: string;
  payment_intent?: string | { id?: string };
};

function paymentIntentId(session: StripeSession): string | null {
  if (typeof session.payment_intent === "string") return session.payment_intent;
  if (session.payment_intent?.id) return session.payment_intent.id;
  return null;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return jsonResponse({ ok: false, error: "Method not allowed" }, 405);

  try {
    const rawBody = await req.text();
    const signature = req.headers.get("stripe-signature") ?? "";
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET")?.trim();

    if (!webhookSecret) {
      console.error("[stripe-webhook] STRIPE_WEBHOOK_SECRET missing");
      return jsonResponse({ ok: false, error: "Server not configured" }, 500);
    }

    const valid = await verifyStripeSignature(rawBody, signature, webhookSecret);
    if (!valid) {
      return jsonResponse({ ok: false, error: "Invalid webhook signature" }, 400);
    }

    const event = JSON.parse(rawBody) as {
      type?: string;
      id?: string;
      data?: { object?: Record<string, unknown> };
    };

    const eventName = event.type ?? "";
    const object = (event.data?.object ?? {}) as StripeSession & {
      id?: string;
      last_payment_error?: { message?: string };
    };

    const supabase = createSupabaseAdmin();
    const sessionId = object.id ? String(object.id) : "";

    if (eventName === "checkout.session.completed") {
      if (!sessionId) return jsonResponse({ ok: true, skipped: true });
      if (object.payment_status && object.payment_status !== "paid") {
        return jsonResponse({ ok: true, skipped: true, reason: object.payment_status });
      }

      const details = (object as { customer_details?: Record<string, unknown>; customer_email?: string; metadata?: Record<string, string> });
      const metadata = details.metadata ?? {};
      const customer = details.customer_details ?? {};
      const email = String(details.customer_email ?? customer.email ?? metadata.email ?? "").trim().toLowerCase() || "unknown@stripe";
      const name = String(customer.name ?? metadata.name ?? "Stripe customer").trim() || "Stripe customer";
      const phone = String(customer.phone ?? metadata.phone ?? "").replace(/[^\d+]/g, "") || "n/a";

      const { data: updated } = await supabase
        .from("acquisition_payments")
        .update({
          status: "paid",
          stripe_payment_intent_id: paymentIntentId(object),
          webhook_event_id: event.id ? String(event.id) : null,
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_checkout_session_id", sessionId)
        .neq("status", "paid")
        .select("id")
        .maybeSingle();

      if (!updated) {
        await supabase.from("acquisition_payments").insert({
          plan_id: metadata.plan_id === "digital" ? "digital" : "digital",
          status: "paid",
          provider: "stripe",
          name,
          email,
          phone,
          company: metadata.company ?? null,
          gstin: null,
          base_inr: 0,
          gst_inr: 0,
          total_inr: 0,
          amount_paise: 39900,
          amount_usd: 399,
          currency: "USD",
          stripe_checkout_session_id: sessionId,
          stripe_payment_intent_id: paymentIntentId(object),
          webhook_event_id: event.id ? String(event.id) : null,
          notes: { source: "stripe-payment-link" },
        });
      }

      return jsonResponse({ ok: true, event: eventName });
    }

    if (eventName === "checkout.session.expired" || eventName === "checkout.session.async_payment_failed") {
      if (!sessionId) return jsonResponse({ ok: true, skipped: true });
      await supabase
        .from("acquisition_payments")
        .update({
          status: "failed",
          webhook_event_id: event.id ? String(event.id) : null,
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_checkout_session_id", sessionId)
        .neq("status", "paid");
      return jsonResponse({ ok: true, event: eventName });
    }

    if (eventName === "payment_intent.payment_failed") {
      const intentId = object.id ? String(object.id) : "";
      if (!intentId) return jsonResponse({ ok: true, skipped: true });
      await supabase
        .from("acquisition_payments")
        .update({
          status: "failed",
          stripe_payment_intent_id: intentId,
          webhook_event_id: event.id ? String(event.id) : null,
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_payment_intent_id", intentId)
        .neq("status", "paid");
      return jsonResponse({ ok: true, event: eventName });
    }

    return jsonResponse({ ok: true, event: eventName, ignored: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[stripe-webhook]", message);
    return jsonResponse({ ok: false, error: message }, 500);
  }
});
