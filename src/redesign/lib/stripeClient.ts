const SUPABASE_URL = "https://khxkorrvylcscyqfklxi.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoeGtvcnJ2eWxjc2N5cWZrbHhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc2NDk0NjUsImV4cCI6MjEwMzIyNTQ2NX0.ehzhqJe6niwiNcL6gne3T3HEihYCev0Gk4aaLeuzRg0";

const FUNCTIONS = `${SUPABASE_URL}/functions/v1`;

export type CreateStripeCheckoutInput = {
  planId: "digital";
  name: string;
  email: string;
  phone: string;
  company?: string;
};

export type CreateStripeCheckoutResult = {
  ok: true;
  url: string;
  sessionId: string;
  planId: "digital";
  amountUsd: number;
};

export async function createStripeCheckout(
  input: CreateStripeCheckoutInput,
): Promise<CreateStripeCheckoutResult> {
  const res = await fetch(`${FUNCTIONS}/stripe-create-checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok || data?.ok === false) {
    throw new Error(data?.error ?? `Request failed (${res.status})`);
  }
  return data as CreateStripeCheckoutResult;
}
