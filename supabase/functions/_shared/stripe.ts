import { createSupabaseAdmin, jsonResponse } from "./razorpay.ts";

export { createSupabaseAdmin, jsonResponse };

export const DIGITAL_USD = 399;
export const DIGITAL_USD_CENTS = DIGITAL_USD * 100;
export const DIGITAL_STRIPE_PRODUCT_ID = "prod_VIfT6c7x55nw9p";

export function stripeSecretKey(): string {
  const key = Deno.env.get("STRIPE_SECRET_KEY")?.trim();
  if (!key) throw new Error("STRIPE_SECRET_KEY not configured");
  return key;
}

export function stripeProductId(): string {
  return Deno.env.get("STRIPE_PRODUCT_ID")?.trim() || DIGITAL_STRIPE_PRODUCT_ID;
}

export const DIGITAL_STRIPE_PRICE_ID = "price_1UI48JDKKVuJs8Adz9lMUKJZ";

export function stripePriceId(): string | undefined {
  return Deno.env.get("STRIPE_PRICE_ID")?.trim() || DIGITAL_STRIPE_PRICE_ID;
}

export async function stripeForm(
  path: string,
  params: Record<string, string>,
  method = "POST",
): Promise<{ ok: boolean; status: number; json: Record<string, unknown> }> {
  const url =
    method === "GET"
      ? `https://api.stripe.com/v1/${path}?${new URLSearchParams(params).toString()}`
      : `https://api.stripe.com/v1/${path}`;
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${stripeSecretKey()}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: method === "GET" ? undefined : new URLSearchParams(params).toString(),
  });
  const json = (await res.json()) as Record<string, unknown>;
  return { ok: res.ok, status: res.status, json };
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

/** Stripe-Signature: t=timestamp,v1=hex */
export async function verifyStripeSignature(
  payload: string,
  header: string,
  secret: string,
  toleranceSec = 300,
): Promise<boolean> {
  const items = header.split(",").map((part) => part.trim());
  let timestamp = "";
  const signatures: string[] = [];
  for (const item of items) {
    const eq = item.indexOf("=");
    if (eq === -1) continue;
    const key = item.slice(0, eq);
    const value = item.slice(eq + 1);
    if (key === "t") timestamp = value;
    if (key === "v1") signatures.push(value);
  }
  if (!timestamp || signatures.length === 0) return false;

  const ts = Number(timestamp);
  if (!Number.isFinite(ts)) return false;
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - ts) > toleranceSec) return false;

  const expected = await hmacSha256Hex(secret, `${timestamp}.${payload}`);
  return signatures.some((sig) => timingSafeEqual(expected, sig));
}
