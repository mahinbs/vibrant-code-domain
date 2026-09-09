import { createClient, type SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

export const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-razorpay-signature",
};

export function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

export const GST_RATE = 0.18;

export type PlanId = "monthly" | "yearly";

const PLANS: Record<PlanId, { label: string; baseInr: number }> = {
  monthly: { label: "1 month", baseInr: 33_333 },
  yearly: { label: "1 year", baseInr: 89_999 },
};

export function getPlan(planId: string) {
  if (planId !== "monthly" && planId !== "yearly") return null;
  const plan = PLANS[planId];
  const gstInr = Math.round(plan.baseInr * GST_RATE);
  const totalInr = plan.baseInr + gstInr;
  return {
    id: planId as PlanId,
    label: plan.label,
    baseInr: plan.baseInr,
    gstInr,
    totalInr,
    amountPaise: totalInr * 100,
  };
}

export function razorpayAuthHeader() {
  const keyId = Deno.env.get("RAZORPAY_KEY_ID") ?? Deno.env.get("VITE_RAZORPAY_KEY_ID");
  const keySecret = Deno.env.get("RAZORPAY_KEY_SECRET");
  if (!keyId || !keySecret) {
    throw new Error("RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET not configured");
  }
  return "Basic " + btoa(`${keyId}:${keySecret}`);
}

export function publicKeyId() {
  return Deno.env.get("RAZORPAY_KEY_ID") ?? Deno.env.get("VITE_RAZORPAY_KEY_ID") ?? "";
}

export async function hmacSha256Hex(secret: string, body: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(body));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

export function createSupabaseAdmin(): SupabaseClient {
  const url = Deno.env.get("SUPABASE_URL") ?? "";
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  if (!url || !key) throw new Error("Supabase admin env missing");
  return createClient(url, key, { auth: { persistSession: false } });
}
