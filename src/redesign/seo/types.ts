/**
 * Content schema for the data-driven SEO pages (services, industries, locations,
 * comparisons). One renderer (SeoPage) lays out every page from this shape, so
 * content can be written and reviewed without touching layout code.
 *
 * Content rules (from the SEO site plan):
 * - Every page targets ONE search phrase (`primaryPhrase`) and has at least
 *   ~800 words written for that page alone. Text is never shared between pages.
 * - Only claims we can prove. No invented statistics, client names, quotes,
 *   reviews or results. Numbers come from the product itself (8 AI agents,
 *   20-minute loop, 72 checks a day) or from public pricing.
 */

export type Faq = { q: string; a: string };

export type ContentBlock =
  /** Plain explanatory section: one H2 and 1–4 paragraphs. */
  | { kind: "prose"; heading: string; paragraphs: string[] }
  /** H2 + a short intro + titled points rendered as cards. */
  | { kind: "points"; heading: string; intro?: string; items: { title: string; body: string }[] }
  /** H2 + numbered steps (how it works / the plan we would run). */
  | { kind: "steps"; heading: string; intro?: string; steps: { title: string; body: string }[] }
  /** H2 + a simple table (sample budget split, local ad costs, comparisons). */
  | { kind: "table"; heading: string; intro?: string; columns: string[]; rows: string[][]; note?: string }
  /** H2 + a WhatsApp-style conversation (sample follow-up script). */
  | {
      kind: "chat";
      heading: string;
      intro?: string;
      messages: { from: "business" | "lead"; text: string }[];
    }
  /** Highlighted single message (e.g. "nothing spends until you approve"). */
  | { kind: "callout"; heading: string; body: string };

export type SeoPageKind = "service" | "industry" | "location" | "compare";

export type SeoPageData = {
  kind: SeoPageKind;
  /** URL slug under its hub, e.g. "ai-calling" → /services/ai-calling. */
  slug: string;
  /** Short name for hub cards, footer and related links, e.g. "AI calling agent". */
  navLabel: string;
  /** One-line summary for hub cards (max ~120 chars). */
  cardSummary: string;
  /** <title>, under 60 characters, unique. */
  metaTitle: string;
  /** Meta description, under 155 characters, unique. */
  metaDescription: string;
  /** The one search phrase this page targets. */
  primaryPhrase: string;
  /** Small label above the H1. */
  eyebrow: string;
  /** The page's only H1 — must contain the primary phrase (or a close variant). */
  h1: string;
  /** "What it does in 3 lines" — 2–3 sentences under the H1. */
  intro: string;
  /** Body sections, top to bottom, each with its own H2. */
  blocks: ContentBlock[];
  /** 5 real questions buyers ask, with direct answers (rendered with FAQPage schema). */
  faqs: Faq[];
  /** Internal links to related pages on this site (absolute paths, e.g. "/industries/real-estate"). */
  related: { label: string; href: string }[];
  /** Location pages only. */
  locale?: {
    /** hreflang value, e.g. "en-AE". */
    hreflang: string;
    /** Region shown in schema/areaServed, e.g. "United Arab Emirates". */
    areaServed: string;
    /** Local price line shown in the price box. */
    priceLine: string;
    /** Office address — ONLY where we actually have an office. */
    officeAddress?: string;
  };
  /** Pre-select the industry on the lead form (industry pages). */
  leadIndustry?: string;
};
