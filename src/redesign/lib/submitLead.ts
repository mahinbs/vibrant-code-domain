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
        body: JSON.stringify({ ...input, lead_score: score, lead_tier: tier, payload }),
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
