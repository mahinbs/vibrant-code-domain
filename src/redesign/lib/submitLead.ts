import { site } from "../data/site";
import { supabase } from "@/integrations/supabase/client";

export type LeadInput = {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  projectType: string;
  budgetRange: string;
  timeline: string;
  decisionRole: string;
  problemStatement: string;
  expectedOutcome: string;
  gotOtherQuote: string;
};

export type LeadResult = {
  ok: boolean;
  via: "endpoint" | "mailto" | "noop";
  error?: string;
};

/**
 * Pluggable lead submitter.
 *
 * Order of operations:
 *   1. If `VITE_LEAD_ENDPOINT` is configured, POST JSON there.
 *   2. Otherwise, fall back to opening a pre-filled mailto: draft so the
 *      submission still reaches the team without a backend.
 *
 * Swapping in a real backend later is a single env-var change; this file
 * does not need to be touched.
 */
export async function submitLead(input: LeadInput): Promise<LeadResult> {
  const [firstName = "", ...rest] = input.name.trim().split(/\s+/);
  const lastName = rest.join(" ").trim() || "-";
  const message = [
    `Website: ${input.website}`,
    `Decision role: ${input.decisionRole}`,
    "",
    `Problem statement: ${input.problemStatement}`,
    "",
    `Expected outcome: ${input.expectedOutcome}`,
    "",
    `Contacted other company and received quote: ${input.gotOtherQuote}`,
  ].join("\n");

  try {
    const { error } = await supabase.from("customer_inquiries").insert({
      first_name: firstName,
      last_name: lastName,
      email: input.email,
      phone: input.phone,
      company: input.company,
      service_interest: input.projectType,
      budget_range: input.budgetRange,
      project_timeline: input.timeline,
      message,
      source_page: "new_homepage_preview_form",
    });

    if (!error) {
      return { ok: true, via: "endpoint" };
    }
  } catch {
    // Fallbacks below handle temporary connectivity issues.
  }

  const endpoint = import.meta.env.VITE_LEAD_ENDPOINT as string | undefined;

  if (endpoint) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
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
    const subject = encodeURIComponent(
      `New project inquiry from ${input.name}`,
    );
    const body = encodeURIComponent(
      [
        `Name: ${input.name}`,
        `Email: ${input.email}`,
        `Phone: ${input.phone}`,
        `Company: ${input.company}`,
        `Website: ${input.website}`,
        "",
        `Project type: ${input.projectType}`,
        `Budget range: ${input.budgetRange}`,
        `Timeline: ${input.timeline}`,
        `Decision role: ${input.decisionRole}`,
        "",
        `Problem statement: ${input.problemStatement}`,
        `Expected outcome: ${input.expectedOutcome}`,
        `Contacted other company and received quote: ${input.gotOtherQuote}`,
      ].join("\n"),
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    return { ok: true, via: "mailto" };
  }

  return { ok: true, via: "noop" };
}
