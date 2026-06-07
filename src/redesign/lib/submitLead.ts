import { supabase } from "@/integrations/supabase/client";
import type { HighIntentLeadPayload, HighIntentLeadSubmitInput } from "./highIntentLead";
import { scoreAndTier } from "./scoreLead";
import { notifyTelegramLead } from "./notifyTelegramLead";

export type { HighIntentLeadPayload, HighIntentLeadSubmitInput } from "./highIntentLead";

export type LeadResult = {
  ok: boolean;
  via: "supabase" | "endpoint" | "noop";
  error?: string;
};

/** Stored in `reshab_leads.submission_type` — keep in sync with DB default + admin filters. */
export const RESHAB_SUBMISSION_HIGH_INTENT = "high_intent" as const;
export const RESHAB_SUBMISSION_STRATEGY_CALL = "strategy_call" as const;
export const RESHAB_SUBMISSION_FOUNDER_PARTNERSHIP = "founder_partnership" as const;

export type StrategyCallLeadInput = {
  name: string;
  email: string;
  /** WhatsApp / phone — stored in `reshab_leads.phone`. */
  phone: string;
  sourcePage: string;
};

function buildPayloadRecord(
  input: HighIntentLeadSubmitInput,
): Record<string, unknown> {
  const p: Record<string, unknown> = {
    industry: input.industry,
    whatBuilding: input.whatBuilding,
    projectStage: input.projectStage,
    userScale: input.userScale,
    complianceNeeds: input.complianceNeeds,
    timeline: input.timeline,
    budgetInr: input.budgetInr,
    decisionRole: input.decisionRole,
    technicalChallenge: input.technicalChallenge?.trim() || null,
    company: input.company?.trim() || null,
    website: input.website?.trim() || null,
  };
  if (input.serviceModal) {
    p.service_modal = input.serviceModal;
  }
  return p;
}

function supabaseErrorMessage(error: { message?: string; code?: string } | null): string {
  if (!error) {
    return "Could not save your submission. Please try again or contact us directly.";
  }
  if (import.meta.env.DEV) {
    console.error("[submitLead] Supabase insert failed:", error);
  }
  const hint =
    error.code === "42P01" || error.message?.includes("reshab_leads")
      ? " The leads database may need the reshab_leads migration applied."
      : "";
  return (error.message ?? "Could not save your submission.") + hint;
}

/**
 * Persists high-intent leads to `reshab_leads`, with score/tier from `scoreLead`.
 * Falls back to VITE_LEAD_ENDPOINT POST on insert failure.
 */
export async function submitLead(input: HighIntentLeadSubmitInput): Promise<LeadResult> {
  const payloadForScore: HighIntentLeadPayload = {
    industry: input.industry,
    whatBuilding: input.whatBuilding,
    projectStage: input.projectStage,
    userScale: input.userScale,
    complianceNeeds: input.complianceNeeds,
    timeline: input.timeline,
    budgetInr: input.budgetInr,
    decisionRole: input.decisionRole,
    technicalChallenge: input.technicalChallenge,
    company: input.company,
    website: input.website,
  };
  const { score, tier } = scoreAndTier(payloadForScore);
  const payload = buildPayloadRecord(input);

  let supabaseError: { message?: string; code?: string } | null = null;

  try {
    const { error } = await supabase.from("reshab_leads").insert({
      source_page: input.sourcePage,
      submission_type: RESHAB_SUBMISSION_HIGH_INTENT,
      lead_score: score,
      lead_tier: tier,
      name: input.name.trim(),
      email: input.email.trim(),
      phone: input.phone.trim() || null,
      company: (input.company && input.company.trim()) || null,
      payload,
    });

    if (!error) {
      notifyTelegramLead({
        leadType: "automation audit",
        name: input.name,
        email: input.email,
        phone: input.phone,
        company: input.company ?? null,
        sourcePage: input.sourcePage,
        score,
        tier,
        fields: payload,
      });
      return { ok: true, via: "supabase" };
    }
    supabaseError = error;
  } catch (err) {
    supabaseError = err instanceof Error ? { message: err.message } : { message: "Unknown error" };
  }

  const endpoint = import.meta.env.VITE_LEAD_ENDPOINT as string | undefined;
  if (endpoint) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...input,
          submission_type: RESHAB_SUBMISSION_HIGH_INTENT,
          lead_score: score,
          lead_tier: tier,
          payload,
        }),
      });
      if (!res.ok) {
        return {
          ok: false,
          via: "endpoint",
          error: `Submission failed (${res.status})`,
        };
      }
      notifyTelegramLead({
        leadType: "automation audit",
        name: input.name,
        email: input.email,
        phone: input.phone,
        company: input.company ?? null,
        sourcePage: input.sourcePage,
        score,
        tier,
        fields: payload,
      });
      return { ok: true, via: "endpoint" };
    } catch (err) {
      return {
        ok: false,
        via: "endpoint",
        error: err instanceof Error ? err.message : "Network error",
      };
    }
  }

  return {
    ok: false,
    via: "noop",
    error: supabaseErrorMessage(supabaseError),
  };
}

/**
 * Quick “book strategy call” capture (name, WhatsApp, email) into `reshab_leads`.
 * Uses `submission_type = strategy_call` so admin can filter separately from the full form.
 */
export async function submitStrategyCallLead(input: StrategyCallLeadInput): Promise<LeadResult> {
  const payload: Record<string, unknown> = { quick_form: "strategy_call" };

  let supabaseError: { message?: string; code?: string } | null = null;

  try {
    const { error } = await supabase.from("reshab_leads").insert({
      source_page: input.sourcePage.trim(),
      submission_type: RESHAB_SUBMISSION_STRATEGY_CALL,
      lead_score: 0,
      lead_tier: "low",
      name: input.name.trim(),
      email: input.email.trim(),
      phone: input.phone.trim() || null,
      company: null,
      payload,
    });

    if (!error) {
      notifyTelegramLead({
        leadType: "strategy call",
        name: input.name,
        email: input.email,
        phone: input.phone,
        sourcePage: input.sourcePage,
      });
      return { ok: true, via: "supabase" };
    }
    supabaseError = error;
  } catch (err) {
    supabaseError = err instanceof Error ? { message: err.message } : { message: "Unknown error" };
  }

  const endpoint = import.meta.env.VITE_LEAD_ENDPOINT as string | undefined;
  if (endpoint) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...input,
          submission_type: RESHAB_SUBMISSION_STRATEGY_CALL,
          lead_score: 0,
          lead_tier: "low",
          payload,
        }),
      });
      if (!res.ok) {
        return {
          ok: false,
          via: "endpoint",
          error: `Submission failed (${res.status})`,
        };
      }
      notifyTelegramLead({
        leadType: "strategy call",
        name: input.name,
        email: input.email,
        phone: input.phone,
        sourcePage: input.sourcePage,
      });
      return { ok: true, via: "endpoint" };
    } catch (err) {
      return {
        ok: false,
        via: "endpoint",
        error: err instanceof Error ? err.message : "Network error",
      };
    }
  }

  return {
    ok: false,
    via: "noop",
    error: supabaseErrorMessage(supabaseError),
  };
}
