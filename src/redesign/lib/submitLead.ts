import { site } from "../data/site";
import { supabase } from "@/integrations/supabase/client";
import type { HighIntentLeadPayload, HighIntentLeadSubmitInput } from "./highIntentLead";
import { scoreAndTier } from "./scoreLead";

export type { HighIntentLeadPayload, HighIntentLeadSubmitInput } from "./highIntentLead";

export type LeadResult = {
  ok: boolean;
  via: "supabase" | "endpoint" | "mailto" | "noop";
  error?: string;
};

/** Stored in `reshab_leads.submission_type` — keep in sync with DB default + admin filters. */
export const RESHAB_SUBMISSION_HIGH_INTENT = "high_intent" as const;
export const RESHAB_SUBMISSION_STRATEGY_CALL = "strategy_call" as const;

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

/**
 * Persists high-intent leads to `reshab_leads`, with score/tier from `scoreLead`.
 * Falls back to VITE_LEAD_ENDPOINT POST, then mailto, on insert failure.
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
      return { ok: true, via: "supabase" };
    }
  } catch {
    // fall through
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
      return { ok: true, via: "endpoint" };
    } catch (err) {
      return {
        ok: false,
        via: "endpoint",
        error: err instanceof Error ? err.message : "Network error",
      };
    }
  }

  if (typeof window !== "undefined") {
    const subject = encodeURIComponent(`High-intent lead: ${input.name}`);
    const body = encodeURIComponent(
      [
        `Source: ${input.sourcePage}`,
        `Score: ${score} (${tier})`,
        "",
        `Name: ${input.name}`,
        `Email: ${input.email}`,
        `WhatsApp/Phone: ${input.phone}`,
        "",
        JSON.stringify(payload, null, 2),
      ].join("\n"),
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    return { ok: true, via: "mailto" };
  }

  return { ok: true, via: "noop" };
}

/**
 * Quick “book strategy call” capture (name, WhatsApp, email) into `reshab_leads`.
 * Uses `submission_type = strategy_call` so admin can filter separately from the full form.
 */
export async function submitStrategyCallLead(input: StrategyCallLeadInput): Promise<LeadResult> {
  const payload: Record<string, unknown> = { quick_form: "strategy_call" };

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
      return { ok: true, via: "supabase" };
    }
  } catch {
    // fall through
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
      return { ok: true, via: "endpoint" };
    } catch (err) {
      return {
        ok: false,
        via: "endpoint",
        error: err instanceof Error ? err.message : "Network error",
      };
    }
  }

  if (typeof window !== "undefined") {
    const subject = encodeURIComponent(`Strategy call request: ${input.name}`);
    const body = encodeURIComponent(
      [
        `Source: ${input.sourcePage}`,
        `Submission: ${RESHAB_SUBMISSION_STRATEGY_CALL}`,
        "",
        `Name: ${input.name}`,
        `Email: ${input.email}`,
        `WhatsApp: ${input.phone}`,
      ].join("\n"),
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    return { ok: true, via: "mailto" };
  }

  return { ok: true, via: "noop" };
}
