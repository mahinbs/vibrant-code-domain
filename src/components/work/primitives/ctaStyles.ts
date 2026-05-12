/**
 * Primary CTA styling aligned with redesign Nav “Get free consultation”
 * (purple gloss). Keep in sync with src/redesign/components/Nav.tsx.
 */
const GLOSS_CORE =
  "btn-gloss relative overflow-hidden inline-flex items-center bg-purple/60 border border-white/15 text-white shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.18)]";

/** Nav pill: compact height, matches Nav.tsx primary link. */
export const WORK_PRIMARY_GLOSS_CTA_NAV = `${GLOSS_CORE} px-3.5 py-2 rounded-lg text-[13px] font-medium`;

/** Case study hero / WorkCTA / not-found: h-12, icon gap. */
export const WORK_PRIMARY_GLOSS_CTA_H12 = `${GLOSS_CORE} group h-12 gap-2 rounded-[10px] px-5 text-[13px] font-semibold transition-opacity hover:opacity-95`;

/** Work project cards: shorter control. */
export const WORK_PRIMARY_GLOSS_CTA_H10 = `${GLOSS_CORE} group/btn h-10 gap-1.5 rounded-[10px] px-3 text-[12px] font-semibold transition-opacity hover:opacity-95`;

/** Wrap label + icons so they sit above btn-gloss overlay. */
export const WORK_PRIMARY_GLOSS_CTA_INNER = "relative z-[2]";

/** Section kicker pills (Outcomes, What we shipped, etc.) — same gloss language as Nav CTA, pill shape. */
export const WORK_SECTION_GLOSS_BADGE = `${GLOSS_CORE} rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em]`;

/** Slightly larger pill (WorkCTA “Let’s build”, not-found). */
export const WORK_SECTION_GLOSS_BADGE_LARGE = `${GLOSS_CORE} rounded-full px-3.5 py-2 text-[12px] font-semibold uppercase tracking-[0.08em]`;
