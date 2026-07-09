export type CaseStudyManifest = {
  slug: string;
  category: string;
  title: string;
  hook: string;
  metric1: string;
};

export const caseStudyManifest: CaseStudyManifest[] = [
  {
    slug: "lead-capture-qualification",
    category: "Sales & Revenue",
    title: "Lead Capture & Qualification",
    hook: "Never let a hot lead go cold.",
    metric1: "80% faster response time",
  },
  {
    slug: "crm-sales-pipeline-automation",
    category: "Sales & Revenue",
    title: "CRM & Sales Pipeline Automation",
    hook: "Your CRM updates itself.",
    metric1: "15+ hours saved per week",
  },
  {
    slug: "internal-workflow-automation",
    category: "Operations",
    title: "Internal Workflow Automation",
    hook: "Connect the tools that don't talk to each other.",
    metric1: "40% less manual handoffs",
  },
  {
    slug: "ai-customer-support",
    category: "Customer Support",
    title: "AI Customer Support",
    hook: "Answer instantly, around the clock.",
    metric1: "60% tickets auto-resolved",
  },
  {
    slug: "document-data-processing",
    category: "Operations",
    title: "Document & Data Processing",
    hook: "Stop typing what a machine can read.",
    metric1: "90% less manual data entry",
  },
  {
    slug: "reporting-live-dashboards",
    category: "Analytics",
    title: "Reporting & Live Dashboards",
    hook: "Decisions backed by numbers, not guesses.",
    metric1: "Real-time visibility",
  },
];

/** Map vertical / industry keywords to a case study slug */
export const industryToCaseStudySlug: Record<string, string> = {
  real_estate: "lead-capture-qualification",
  realestate: "lead-capture-qualification",
  property: "lead-capture-qualification",
  saas: "crm-sales-pipeline-automation",
  b2b: "crm-sales-pipeline-automation",
  software: "crm-sales-pipeline-automation",
  healthcare: "ai-customer-support",
  health: "ai-customer-support",
  medical: "ai-customer-support",
  operations: "internal-workflow-automation",
  logistics: "document-data-processing",
  finance: "document-data-processing",
  analytics: "reporting-live-dashboards",
};

export function getCaseStudyBySlug(slug: string): CaseStudyManifest | undefined {
  return caseStudyManifest.find((c) => c.slug === slug);
}

export function resolveIndustrySlug(industry?: string | null): string {
  if (!industry) return "lead-capture-qualification";
  const key = industry.toLowerCase().replace(/[\s-]+/g, "_");
  if (industryToCaseStudySlug[key]) return industryToCaseStudySlug[key];
  for (const [k, slug] of Object.entries(industryToCaseStudySlug)) {
    if (key.includes(k) || k.includes(key)) return slug;
  }
  const byCategory = caseStudyManifest.find((c) =>
    c.category.toLowerCase().includes(key) || key.includes(c.category.toLowerCase().split(" ")[0] ?? "")
  );
  return byCategory?.slug ?? "lead-capture-qualification";
}

export type StepCaseStudyInput = {
  case_study_slug?: string | null;
  case_study_url?: string | null;
  case_study_mode?: string | null;
};

export type LeadIndustryInput = {
  metadata?: Record<string, unknown> | null;
  company?: string | null;
  em_companies?: { industry?: string | null } | null;
};

export function resolveCaseStudyForStep(
  step: StepCaseStudyInput,
  lead: LeadIndustryInput,
  siteOrigin: string,
): CaseStudyManifest & { url: string } {
  let slug = step.case_study_slug ?? "";
  if (step.case_study_mode === "auto_industry") {
    const industry =
      (lead.metadata?.industry as string | undefined) ??
      lead.em_companies?.industry ??
      (lead.metadata?.vertical as string | undefined);
    slug = resolveIndustrySlug(industry);
  }
  const cs = getCaseStudyBySlug(slug) ?? caseStudyManifest[0];
  const url = step.case_study_url?.trim() || `${siteOrigin}/automation/${cs.slug}`;
  return { ...cs, url };
}
