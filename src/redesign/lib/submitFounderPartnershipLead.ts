import { supabase } from "@/integrations/supabase/client";
import type { FounderApplicationSubmitInput } from "../founderPartnership/founderApplicationTypes";
import { FORM_VERSION, FOUNDER_SOURCE_PAGE } from "../founderPartnership/founderApplicationConfig";
import { scoreFounderPartnershipLead } from "./scoreFounderPartnershipLead";
import type { LeadResult } from "./submitLead";

export const RESHAB_SUBMISSION_FOUNDER_PARTNERSHIP = "founder_partnership" as const;

function captureAttribution(): { utm?: Record<string, string>; referrer?: string } {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
    const v = params.get(key);
    if (v) utm[key.replace("utm_", "")] = v;
  }
  return {
    utm: Object.keys(utm).length ? utm : undefined,
    referrer: document.referrer || undefined,
  };
}

function buildPayload(input: FounderApplicationSubmitInput) {
  const { score, tier, profile } = scoreFounderPartnershipLead(input);
  const attribution = captureAttribution();

  const payload: Record<string, unknown> = {
    form_version: FORM_VERSION,
    buildingType: input.buildingType,
    buildingTypeOther: input.buildingTypeOther?.trim() || null,
    ideaOrigin: input.ideaOrigin.trim(),
    launchBlockers: input.launchBlockers,
    exploredNoCode: input.exploredNoCode,
    technicalSupport: input.technicalSupport,
    revenueModel: input.revenueModel,
    validationStage: input.validationStage,
    commitmentLevel: input.commitmentLevel,
    timeline: input.timeline,
    budgetInr: input.budgetInr,
    partnershipTypes: input.partnershipTypes,
    vision3Year: input.vision3Year.trim(),
    founderMindset: input.founderMindset.trim(),
    psychStake: input.psychStake,
    psychConviction: input.psychConviction,
    phoneCountry: input.phoneCountry,
    founder_profile: profile,
    lead_score_computed: score,
    lead_tier_computed: tier,
    ...attribution,
  };

  return { payload, score, tier };
}

function supabaseErrorMessage(error: { message?: string; code?: string } | null): string {
  if (!error) {
    return "Could not save your application. Please try again or contact us directly.";
  }
  const hint =
    error.code === "42P01" || error.message?.includes("reshab_leads")
      ? " The leads database may need the reshab_leads migration applied."
      : "";
  return (error.message ?? "Could not save your application.") + hint;
}

export async function submitFounderPartnershipLead(
  input: FounderApplicationSubmitInput,
): Promise<LeadResult> {
  const { payload, score, tier } = buildPayload(input);

  let supabaseError: { message?: string; code?: string } | null = null;

  try {
    const { error } = await supabase.from("reshab_leads").insert({
      source_page: input.sourcePage || FOUNDER_SOURCE_PAGE,
      submission_type: RESHAB_SUBMISSION_FOUNDER_PARTNERSHIP,
      lead_score: score,
      lead_tier: tier,
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      phone: input.phone.trim() || null,
      company: null,
      payload,
    });

    if (!error) {
      void notifyTeam(input, payload, score, tier);
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
          submission_type: RESHAB_SUBMISSION_FOUNDER_PARTNERSHIP,
          lead_score: score,
          lead_tier: tier,
          payload,
        }),
      });
      if (!res.ok) {
        return { ok: false, via: "endpoint", error: `Submission failed (${res.status})` };
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

  return { ok: false, via: "noop", error: supabaseErrorMessage(supabaseError) };
}

async function notifyTeam(
  input: FounderApplicationSubmitInput,
  payload: Record<string, unknown>,
  score: number,
  tier: string,
) {
  const profile = payload.founder_profile as { archetype?: string; partnerFit?: string } | undefined;
  try {
    await fetch("https://send-mail-redirect-boostmysites.vercel.app/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: "reshab@boostmysites.com",
        subject: `Founder Application — ${input.name} (${tier})`,
        name: "Boostmysites",
        body: [
          `Name: ${input.name}`,
          `Email: ${input.email}`,
          `Phone: ${input.phone}`,
          `Score: ${score} (${tier})`,
          `Archetype: ${profile?.archetype ?? "—"}`,
          `Partner fit: ${profile?.partnerFit ?? "—"}`,
          `Building: ${input.buildingType}`,
          `Budget: ${input.budgetInr}`,
          `Timeline: ${input.timeline}`,
        ].join("\n"),
      }),
    });
  } catch {
    /* non-blocking */
  }
}
