import { site } from "../data/site";
import { GLOSS } from "./blocks";
import { PRICING } from "./pricing";

/**
 * Links from boostmysites.com to the product on boostmysites.in.
 *
 * Only indexable .in pages are linked (the homepage and /how-it-works);
 * /app is blocked by .in's robots.txt, so links there pass nothing.
 * Wording and anchor text vary by page so the links read naturally
 * rather than as a repeated exact-match pattern.
 */

const LINK = "font-medium text-[#9dbaff] underline underline-offset-2 hover:text-white";

type Variant = { lead: string; anchor: string; href: string; tail: string };

const VARIANTS: Variant[] = [
  {
    lead: "Prefer to run this yourself? Everything on this page works inside ",
    anchor: "boostmysites.in",
    href: site.productHome,
    tail: ", our product. Start with 2,500 credits and pay only when something is done.",
  },
  {
    lead: "Want to see it before you talk to anyone? ",
    anchor: "Watch how the product works",
    href: site.productHowItWorks,
    tail: " on boostmysites.in: you set a goal, review the plan, and nothing spends until you approve.",
  },
  {
    lead: "All of this runs in ",
    anchor: "the BoostMySites app",
    href: site.productHome,
    tail: " on boostmysites.in, with pay-per-result credits instead of a retainer.",
  },
  {
    lead: "You can also start on your own with our ",
    anchor: "AI client acquisition software",
    href: site.productHome,
    tail: `. ${PRICING.starter}, and credits never expire.`,
  },
  {
    lead: "Curious what each step costs? ",
    anchor: "See how credits work on boostmysites.in",
    href: site.productHowItWorks,
    tail: ": a qualified lead is 12 credits, a WhatsApp conversation 10, a campaign built 150.",
  },
];

/** Stable pick per page, so a page always shows the same wording. */
function pick(seed: string): Variant {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return VARIANTS[h % VARIANTS.length];
}

export function ProductLinkBox({ seed }: { seed: string }) {
  const v = pick(seed);
  return (
    <section className="mx-auto w-full max-w-[860px] px-5 py-6 md:px-10" aria-label="The product">
      <p className="rounded-[16px] border border-white/12 p-5 text-[15px] leading-relaxed text-white/75 md:p-6" style={{ background: GLOSS }}>
        {v.lead}
        <a href={v.href} target="_blank" rel="noopener" className={LINK}>
          {v.anchor}
        </a>
        {v.tail}
      </p>
    </section>
  );
}

/** "Run this for real" call to action under each free tool. */
export function ToolProductCta({ label, body }: { label: string; body: string }) {
  return (
    <div className="mt-6 flex flex-col gap-4 rounded-[16px] border border-purple/50 bg-[rgba(72,118,255,0.08)] p-5 md:flex-row md:items-center md:justify-between md:p-6">
      <p className="max-w-[620px] text-[15px] leading-relaxed text-white/75">{body}</p>
      <a
        href={site.productHome}
        target="_blank"
        rel="noopener"
        className="btn-gloss inline-flex shrink-0 items-center justify-center rounded-[10px] border border-white/20 bg-purple/70 px-5 py-3 text-[15px] font-semibold text-white"
      >
        {label}
      </a>
    </div>
  );
}
