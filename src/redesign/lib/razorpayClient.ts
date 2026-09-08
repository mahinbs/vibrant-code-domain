const SUPABASE_URL = "https://khxkorrvylcscyqfklxi.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoeGtvcnJ2eWxjc2N5cWZrbHhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc2NDk0NjUsImV4cCI6MjEwMzIyNTQ2NX0.ehzhqJe6niwiNcL6gne3T3HEihYCev0Gk4aaLeuzRg0";

const FUNCTIONS = `${SUPABASE_URL}/functions/v1`;

export type CreateOrderInput = {
  planId: import("./razorpayPlans").PayPlanId;
  name: string;
  email: string;
  phone: string;
  company?: string;
  gstin?: string;
};

export type CreateOrderResult = {
  ok: true;
  keyId: string;
  orderId: string;
  amount: number;
  currency: string;
  planId: import("./razorpayPlans").PayPlanId;
  planLabel: string;
  totalInr: number;
};

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${FUNCTIONS}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok || data?.ok === false) {
    throw new Error(data?.error ?? `Request failed (${res.status})`);
  }
  return data as T;
}

export function createRazorpayOrder(input: CreateOrderInput) {
  return postJson<CreateOrderResult>("razorpay-create-order", input);
}

export function verifyRazorpayPayment(input: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}) {
  return postJson<{ ok: true; redirect: string }>("razorpay-verify", input);
}
