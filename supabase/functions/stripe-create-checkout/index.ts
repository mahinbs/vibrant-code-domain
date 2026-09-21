import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { corsHeaders, createSupabaseAdmin, getPlan, jsonResponse } from "../_shared/razorpay.ts";
import {
  DIGITAL_USD,
  DIGITAL_USD_CENTS,
  stripeForm,
  stripePriceId,
  stripeProductId,
} from "../_shared/stripe.ts";
import { siteOrigin } from "../_shared/billingResend.ts";

type Body = {
  planId?: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
};

async function resolvePriceId(): Promise<string | null> {
  const fromEnv = stripePriceId();
  if (fromEnv) return fromEnv;

  const product = stripeProductId();
  const listed = await stripeForm(
    "prices",
    { product, active: "true", limit: "20" },
    "GET",
  );
  const data = Array.isArray(listed.json.data) ? listed.json.data : [];
  const match = data.find((row) => {
    const price = row as {
      id?: string;
      currency?: string;
      unit_amount?: number;
      type?: string;
    };
    return (
      price.currency === "usd" &&
      price.unit_amount === DIGITAL_USD_CENTS &&
      price.type !== "recurring"
    );
  }) as { id?: string } | undefined;
  return match?.id ?? null;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return jsonResponse({ ok: false, error: "Method not allowed" }, 405);

  try {
    const body = (await req.json()) as Body;
    if (String(body.planId ?? "") !== "digital") {
      return jsonResponse({ ok: false, error: "Stripe is only available for the digital package" }, 400);
    }

    const plan = getPlan("digital");
    if (!plan) return jsonResponse({ ok: false, error: "Invalid plan" }, 400);

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const phone = String(body.phone ?? "").replace(/[^\d+]/g, "");
    const company = String(body.company ?? "").trim() || null;

    if (!name || !email || !phone) {
      return jsonResponse({ ok: false, error: "Name, email, and phone are required" }, 400);
    }

    const origin = siteOrigin();
    const priceId = await resolvePriceId();

    const params: Record<string, string> = {
      mode: "payment",
      customer_email: email,
      client_reference_id: `digital_${Date.now()}`,
      success_url: `${origin}/pay/success?session_id={CHECKOUT_SESSION_ID}&plan=digital`,
      cancel_url: `${origin}/pay/failed?plan=digital`,
      "line_items[0][quantity]": "1",
      "metadata[plan_id]": "digital",
      "metadata[name]": name,
      "metadata[email]": email,
      "metadata[phone]": phone,
      "metadata[product]": "digital-transformation",
      "payment_intent_data[metadata][plan_id]": "digital",
      "payment_intent_data[metadata][name]": name,
      "payment_intent_data[metadata][phone]": phone,
    };

    if (company) {
      params["metadata[company]"] = company;
    }

    if (priceId) {
      params["line_items[0][price]"] = priceId;
    } else {
      params["line_items[0][price_data][currency]"] = "usd";
      params["line_items[0][price_data][product]"] = stripeProductId();
      params["line_items[0][price_data][unit_amount]"] = String(DIGITAL_USD_CENTS);
    }

    const sessionRes = await stripeForm("checkout/sessions", params);
    const session = sessionRes.json as {
      id?: string;
      url?: string;
      error?: { message?: string };
    };

    if (!sessionRes.ok || !session.id || !session.url) {
      console.error("[stripe-create-checkout]", session);
      return jsonResponse(
        { ok: false, error: session.error?.message ?? "Could not create Stripe checkout" },
        502,
      );
    }

    const supabase = createSupabaseAdmin();
    const { error: insertError } = await supabase.from("acquisition_payments").insert({
      plan_id: "digital",
      status: "pending",
      provider: "stripe",
      name,
      email,
      phone,
      company,
      gstin: null,
      base_inr: 0,
      gst_inr: 0,
      total_inr: 0,
      amount_paise: DIGITAL_USD_CENTS,
      amount_usd: DIGITAL_USD,
      currency: "USD",
      stripe_checkout_session_id: session.id,
      notes: { origin },
    });

    if (insertError) {
      console.error("[stripe-create-checkout] insert", insertError);
      return jsonResponse({ ok: false, error: "Could not save checkout row" }, 500);
    }

    return jsonResponse({
      ok: true,
      url: session.url,
      sessionId: session.id,
      planId: "digital",
      amountUsd: DIGITAL_USD,
      planLabel: plan.label,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[stripe-create-checkout]", message);
    return jsonResponse({ ok: false, error: message }, 500);
  }
});
