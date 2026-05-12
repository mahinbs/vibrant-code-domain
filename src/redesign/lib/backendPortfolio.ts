import type { PortfolioItem } from "../data/portfolio";

type RawPortfolioRow = Record<string, unknown>;

const DEFAULT_GRADIENTS = [
  "radial-gradient(120% 100% at 0% 0%, rgba(72,118,255,0.48), rgba(0,0,0,0.85) 70%)",
  "radial-gradient(120% 100% at 100% 0%, rgba(96,142,255,0.34), rgba(0,0,0,0.85) 70%)",
  "radial-gradient(120% 100% at 100% 100%, rgba(84,130,255,0.28), rgba(0,0,0,0.9) 70%)",
];

type Vertical = "fintech" | "healthcare";

const FINTECH_KEYWORDS = ["fintech", "bank", "payment", "wallet", "lending", "nbfc", "finance"];
const HEALTHCARE_KEYWORDS = ["health", "clinic", "medical", "patient", "telemed", "hospital", "ehr", "emr", "fhir", "hl7"];

function asText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function toSlug(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseStack(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => asText(item)).filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);
  }
  return [];
}

export function normalizeBackendPortfolio(rows: RawPortfolioRow[]): PortfolioItem[] {
  const items: PortfolioItem[] = [];

  rows.forEach((row, index) => {
    const title = asText(row.title);
    if (!title) return;

    const slug = asText(row.slug) || toSlug(title);
    const id = asText(row.id) || slug;
    const industry = asText(row.industry) || "Portfolio";
    const outcome = asText(row.outcome) || asText(row.impact) || asText(row.business_result) || "Delivered measurable results.";
    const description = asText(row.description);
    const stack = parseStack(row.stack ?? row.technologies ?? row.tech_stack);
    const image = asText(row.image) || undefined;
    const serviceId = asText(row.service_id) || undefined;
    const vertical = asText(row.vertical).toLowerCase();
    const category = asText(row.category).toLowerCase();
    const gradient = asText(row.gradient) || DEFAULT_GRADIENTS[index % DEFAULT_GRADIENTS.length];

    items.push({
      id,
      slug,
      title,
      industry: industry || vertical || category || "Portfolio",
      outcome,
      ...(description ? { description } : {}),
      stack,
      image,
      gradient,
      serviceId: serviceId || vertical || category || undefined,
    });
  });

  return items;
}

export function filterPortfolioByVertical(items: PortfolioItem[], vertical: Vertical): PortfolioItem[] {
  const keywords = vertical === "healthcare" ? HEALTHCARE_KEYWORDS : FINTECH_KEYWORDS;
  return items.filter((item) => {
    const service = (item.serviceId ?? "").toLowerCase();
    const industry = item.industry.toLowerCase();

    // Deterministic mapping when backend stores explicit vertical/category.
    if (service === "fintech" || service === "healthcare") {
      return service === vertical;
    }
    if (industry === "fintech" || industry === "healthcare") {
      return industry === vertical;
    }

    // Fallback for legacy rows without explicit vertical.
    const haystack = `${item.title} ${industry} ${service}`.toLowerCase();
    return keywords.some((keyword) => haystack.includes(keyword));
  });
}
