import { supabase } from "@/integrations/supabase/client";
import type { HighIntentLeadPayload, HighIntentLeadSubmitInput } from "./highIntentLead";
import { scoreAndTier, tierFromScore } from "./scoreLead";
import { BMS_LEAD_SOURCES, notifyTelegramLead } from "./notifyTelegramLead";
import { trackGoogleAdsLeadConversion } from "@/lib/analytics/googleAds";

function leadTableFor(sourcePage: string): "bms_leads" | "reshab_leads" {
  return BMS_LEAD_SOURCES.has((sourcePage || "").trim()) ? "bms_leads" : "reshab_leads";
}

/**
 * Insert into the routed table. If `bms_leads` doesn't exist yet (not created
 * in Supabase), fall back to `reshab_leads` so a lead is never lost.
 */
async function insertLeadRow(
  sourcePage: string,
  row: Record<string, unknown>,
): Promise<{ error: { message?: string; code?: string } | null }> {
  const table = leadTableFor(sourcePage);
  // reshab_leads / bms_leads aren't in the generated Database types.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const client = supabase as any;
  const { error } = await client.from(table).insert(row);
  if (error && table === "bms_leads") {
    const fb = await client.from("reshab_leads").insert(row);
    return { error: fb.error };
  }
  return { error };
}

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
export const RESHAB_SUBMISSION_AUTOMATION_SCORE = "automation_score" as const;

export type StrategyCallLeadInput = {
  name: string;
  email: string;
  /** WhatsApp / phone — stored in `reshab_leads.phone`. */
  phone: string;
  sourcePage: string;
  /** Optional free-text: what the lead wants to automate. */
  requirement?: string;
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
    const { error } = await insertLeadRow(input.sourcePage, {
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
      trackGoogleAdsLeadConversion(input.sourcePage);
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
      trackGoogleAdsLeadConversion(input.sourcePage);
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

export type AutomationScoreSurveyPayload = {
  industry: string;
  industryLabel: string;
  teamSize: string;
  /** Leak labels in the respondent's industry vocabulary (readable in admin/Telegram). */
  leaks: string[];
  leakIds: string[];
  otherLeak?: string | null;
  tools: string[];
  automationScore: number;
  estimatedHoursPerWeek: string;
  estimatedMonthlyCost: string;
};

export type AutomationScoreLeadInput = {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  sourcePage: string;
  survey: AutomationScoreSurveyPayload;
};

const AUTOMATION_TEAM_SIZE_SCORE: Record<string, number> = {
  "1-10": 6,
  "11-50": 16,
  "51-200": 26,
  "200-plus": 30,
};

/** Simple intent score for automation-score leads (0–100, tiered like high-intent). */
function scoreAutomationScoreLead(survey: AutomationScoreSurveyPayload): number {
  let score = survey.leakIds.length * 9;
  score += AUTOMATION_TEAM_SIZE_SCORE[survey.teamSize] ?? 6;
  if (survey.tools.includes("crm") || survey.tools.includes("erp")) score += 10;
  if (survey.tools.includes("none")) score += 6; // greenfield = fast win
  if (survey.otherLeak && survey.otherLeak.trim()) score += 5;
  return Math.min(100, Math.max(0, score));
}

/**
 * Persists /automation-score funnel leads (survey answers + contact gate) to
 * `reshab_leads` with `submission_type = automation_score`.
 */
export async function submitAutomationScoreLead(
  input: AutomationScoreLeadInput,
): Promise<LeadResult> {
  const score = scoreAutomationScoreLead(input.survey);
  const tier = tierFromScore(score);
  const payload: Record<string, unknown> = {
    ...input.survey,
    website: input.website.trim() || null,
  };

  let supabaseError: { message?: string; code?: string } | null = null;

  try {
    const { error } = await insertLeadRow(input.sourcePage, {
      source_page: input.sourcePage,
      submission_type: RESHAB_SUBMISSION_AUTOMATION_SCORE,
      lead_score: score,
      lead_tier: tier,
      name: input.name.trim(),
      email: input.email.trim(),
      phone: input.phone.trim() || null,
      company: input.company.trim() || null,
      payload,
    });

    if (!error) {
      trackGoogleAdsLeadConversion(input.sourcePage);
      notifyTelegramLead({
        leadType: "automation score",
        name: input.name,
        email: input.email,
        phone: input.phone,
        company: input.company || null,
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
          submission_type: RESHAB_SUBMISSION_AUTOMATION_SCORE,
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
      trackGoogleAdsLeadConversion(input.sourcePage);
      notifyTelegramLead({
        leadType: "automation score",
        name: input.name,
        email: input.email,
        phone: input.phone,
        company: input.company || null,
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
  const requirement = input.requirement?.trim() || null;
  const payload: Record<string, unknown> = { quick_form: "strategy_call", requirement };

  let supabaseError: { message?: string; code?: string } | null = null;

  try {
    const { error } = await insertLeadRow(input.sourcePage, {
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
      trackGoogleAdsLeadConversion(input.sourcePage);
      notifyTelegramLead({
        leadType: "strategy call",
        name: input.name,
        email: input.email,
        phone: input.phone,
        sourcePage: input.sourcePage,
        fields: requirement ? { requirement } : undefined,
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
      trackGoogleAdsLeadConversion(input.sourcePage);
      notifyTelegramLead({
        leadType: "strategy call",
        name: input.name,
        email: input.email,
        phone: input.phone,
        sourcePage: input.sourcePage,
        fields: requirement ? { requirement } : undefined,
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
