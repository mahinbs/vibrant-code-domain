/** Minimal Resend send for acquisition billing / abandon (no EM DB deps). */

const RESEND_API = "https://api.resend.com";

export function billingFromAddress(): string {
  return (
    Deno.env.get("BMS_BILLING_FROM")?.trim() ||
    "Boostmysites Billing <billing@boostmysites.com>"
  );
}

export function siteOrigin(): string {
  return (Deno.env.get("SITE_ORIGIN")?.trim() || "https://boostmysites.com").replace(/\/$/, "");
}

export async function sendBillingEmail(params: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}): Promise<{ id: string }> {
  const key = Deno.env.get("RESEND_API_KEY");
  if (!key) throw new Error("RESEND_API_KEY not configured");

  const res = await fetch(`${RESEND_API}/emails`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: billingFromAddress(),
      to: [params.to],
      subject: params.subject,
      html: params.html,
      text: params.text,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? data.error ?? "Failed to send email");
  return data as { id: string };
}
