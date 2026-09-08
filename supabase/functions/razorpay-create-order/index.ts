import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import {
  corsHeaders,
  createSupabaseAdmin,
  getPlan,
  jsonResponse,
  publicKeyId,
  razorpayAuthHeader,
} from "../_shared/razorpay.ts";

type Body = {
  planId?: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  gstin?: string;
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return jsonResponse({ ok: false, error: "Method not allowed" }, 405);

  try {
    const body = (await req.json()) as Body;
    const plan = getPlan(String(body.planId ?? ""));
    if (!plan) return jsonResponse({ ok: false, error: "Invalid plan" }, 400);

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const phone = String(body.phone ?? "").replace(/[^\d+]/g, "");
    const company = String(body.company ?? "").trim() || null;
    const gstin = String(body.gstin ?? "").trim().toUpperCase() || null;

    if (!name || !email || !phone) {
      return jsonResponse({ ok: false, error: "Name, email, and phone are required" }, 400);
    }

    const receipt = `acq_${plan.id}_${Date.now()}`.slice(0, 40);
    const orderRes = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: razorpayAuthHeader(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: plan.amountPaise,
        currency: "INR",
        receipt,
        notes: {
          plan_id: plan.id,
          email,
          phone,
          product: "ai-client-acquisition",
        },
      }),
    });

    const order = await orderRes.json();
    if (!orderRes.ok) {
      console.error("[razorpay-create-order]", order);
      return jsonResponse(
        { ok: false, error: order?.error?.description ?? "Could not create Razorpay order" },
        502,
      );
    }

    const supabase = createSupabaseAdmin();
    const { error: insertError } = await supabase.from("acquisition_payments").insert({
      plan_id: plan.id,
      status: "pending",
      name,
      email,
      phone,
      company,
      gstin,
      base_inr: plan.baseInr,
      gst_inr: plan.gstInr,
      total_inr: plan.totalInr,
      amount_paise: plan.amountPaise,
      currency: "INR",
      razorpay_order_id: order.id,
      notes: { receipt },
    });

    if (insertError) {
      console.error("[razorpay-create-order] insert", insertError);
      return jsonResponse({ ok: false, error: "Could not save checkout row" }, 500);
    }

    return jsonResponse({
      ok: true,
      keyId: publicKeyId(),
      orderId: order.id,
      amount: plan.amountPaise,
      currency: "INR",
      planId: plan.id,
      planLabel: plan.label,
      totalInr: plan.totalInr,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[razorpay-create-order]", message);
    return jsonResponse({ ok: false, error: message }, 500);
  }
});
