/**
 * India checkout plans for AI Client Acquisition System.
 * Amounts are GST-exclusive; totals include 18% GST.
 * Razorpay expects integer paise.
 */

export const GST_RATE = 0.18;

export type PayPlanId = "monthly" | "yearly";

export type PayPlan = {
  id: PayPlanId;
  label: string;
  period: string;
  /** Base price in INR rupees (before GST). */
  baseInr: number;
  blurb: string;
  highlights: readonly string[];
  badge?: string;
};

const SHARED_HIGHLIGHTS = [
  "Full ad stack — Meta, Google, LinkedIn & more",
  "8 AI agents plan, launch, optimize & follow up",
  "WhatsApp + email follow-ups",
  "Nothing spends until you approve",
  "Plain-English weekly reporting",
] as const;

export const PAY_PLANS: readonly PayPlan[] = [
  {
    id: "monthly",
    label: "1 month",
    period: "Billed monthly",
    baseInr: 33_333,
    blurb: "Full stack for one month. Pause anytime before the next cycle.",
    highlights: [...SHARED_HIGHLIGHTS],
  },
  {
    id: "yearly",
    label: "1 year",
    period: "Billed once a year",
    baseInr: 99_999,
    blurb: "Best value — run the full acquisition stack for twelve months.",
    highlights: [
      ...SHARED_HIGHLIGHTS,
      "Priority onboarding",
      "Save vs paying month-to-month",
    ],
    badge: "Best value",
  },
] as const;

export function gstAmountInr(baseInr: number, rate = GST_RATE): number {
  return Math.round(baseInr * rate);
}

export function totalInr(baseInr: number, rate = GST_RATE): number {
  return baseInr + gstAmountInr(baseInr, rate);
}

/** Razorpay amount unit. */
export function toPaise(inr: number): number {
  return Math.round(inr * 100);
}

export function formatInr(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getPlan(id: PayPlanId): PayPlan {
  const plan = PAY_PLANS.find((p) => p.id === id);
  if (!plan) throw new Error(`Unknown plan: ${id}`);
  return plan;
}

export function parsePayPlanId(value: string | null | undefined): PayPlanId | null {
  if (value === "monthly" || value === "yearly") return value;
  return null;
}

/** Public key only — never put Key Secret here. */
export function getRazorpayKeyId(): string | undefined {
  const key = (import.meta.env.VITE_RAZORPAY_KEY_ID as string | undefined)?.trim();
  return key && !key.includes("PLACEHOLDER") ? key : undefined;
}
