import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { BRAND } from "@/lib/seo/brand";
import { ArrowRightIcon } from "../components/icons";
import { CTA } from "../components/CTA";
import { whatsappHref } from "../data/site";
import type { ContentBlock, Faq } from "./types";
import { PRICING } from "./pricing";

export const GLOSS = "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.5) 100%)";

const H2 = "text-[26px] font-medium leading-[1.15] -tracking-[0.03em] text-white md:text-[34px]";
const BODY = "text-[15px] leading-[1.7] text-white/70 md:text-[16px]";
export const EYEBROW =
  "acq-eyebrow impact-highlight inline-flex w-fit items-center rounded-full border border-purple/50 bg-black/60 px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.1em] backdrop-blur-[5px]";

export function Section({ children, id, narrow }: { children: ReactNode; id?: string; narrow?: boolean }) {
  return (
    <section id={id} className={`mx-auto w-full px-5 py-10 md:px-10 md:py-14 ${narrow ? "max-w-[860px]" : "max-w-[1100px]"}`}>
      {children}
    </section>
  );
}

export function PrimaryButton({ href, children }: { href: string; children: ReactNode }) {
  const cls =
    "btn-gloss relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-[10px] border border-white/20 bg-purple/70 px-5 py-3.5 text-sm font-semibold text-white md:text-[15px]";
  const inner = (
    <>
      <span className="relative z-[2]">{children}</span>
      <ArrowRightIcon className="relative z-[2] size-4 shrink-0 text-white" />
    </>
  );
  return href.startsWith("http") ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">{inner}</a>
  ) : href.includes("#") ? (
    <a href={href} className={cls}>{inner}</a>
  ) : (
    <Link to={href} className={cls}>{inner}</Link>
  );
}

export function GhostButton({ href, children }: { href: string; children: ReactNode }) {
  const cls =
    "inline-flex items-center justify-center gap-2 rounded-[10px] border border-white/15 bg-black/40 px-5 py-3.5 text-sm font-medium text-white/85 hover:bg-white/5 md:text-[15px]";
  return href.startsWith("http") ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">{children}</a>
  ) : (
    <Link to={href} className={cls}>{children}</Link>
  );
}

/** Page hero: eyebrow, the page's single H1, a 2–3 line intro and the primary actions. */
export function SeoHero({ eyebrow, h1, intro, actions }: { eyebrow: string; h1: string; intro: string; actions?: ReactNode }) {
  return (
    <Section>
      <p className={EYEBROW}>{eyebrow}</p>
      <h1 className="mt-5 max-w-[900px] text-[36px] font-medium leading-[1.05] -tracking-[0.04em] text-white md:text-[58px]">{h1}</h1>
      <p className="mt-5 max-w-[760px] text-[17px] leading-relaxed text-white/75 md:text-[19px]">{intro}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        {actions ?? (
          <>
            <PrimaryButton href="#contact-form">Get my client acquisition plan</PrimaryButton>
            <GhostButton href={whatsappHref}>WhatsApp us</GhostButton>
          </>
        )}
      </div>
    </Section>
  );
}

export function BlockView({ block }: { block: ContentBlock }) {
  switch (block.kind) {
    case "prose":
      return (
        <Section narrow>
          <h2 className={H2}>{block.heading}</h2>
          <div className="mt-5 space-y-4">
            {block.paragraphs.map((p, i) => (
              <p key={i} className={BODY}>{p}</p>
            ))}
          </div>
        </Section>
      );
    case "points":
      return (
        <Section>
          <h2 className={H2}>{block.heading}</h2>
          {block.intro ? <p className={`mt-4 max-w-[760px] ${BODY}`}>{block.intro}</p> : null}
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {block.items.map((it) => (
              <div key={it.title} className="rounded-[16px] border border-white/12 p-5 md:p-6" style={{ background: GLOSS }}>
                <h3 className="text-[17px] font-medium text-white">{it.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-white/65">{it.body}</p>
              </div>
            ))}
          </div>
        </Section>
      );
    case "steps":
      return (
        <Section>
          <h2 className={H2}>{block.heading}</h2>
          {block.intro ? <p className={`mt-4 max-w-[760px] ${BODY}`}>{block.intro}</p> : null}
          <ol className="mt-8 grid gap-4 md:grid-cols-2">
            {block.steps.map((s, i) => (
              <li key={s.title} className="flex gap-4 rounded-[16px] border border-white/12 p-5 md:p-6" style={{ background: GLOSS }}>
                <span className="impact-highlight shrink-0 font-mono text-[13px] font-semibold">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-[17px] font-medium text-white">{s.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-white/65">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>
      );
    case "table":
      return (
        <Section>
          <h2 className={H2}>{block.heading}</h2>
          {block.intro ? <p className={`mt-4 max-w-[760px] ${BODY}`}>{block.intro}</p> : null}
          <div className="mt-8 overflow-x-auto rounded-[16px] border border-white/12" style={{ background: GLOSS }}>
            <table className="w-full min-w-[560px] border-collapse text-left text-[14.5px]">
              <thead>
                <tr className="border-b border-white/12">
                  {block.columns.map((c) => (
                    <th key={c} scope="col" className="px-4 py-3 font-mono text-[11.5px] font-semibold uppercase tracking-[0.08em] text-white/55">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((r, i) => (
                  <tr key={i} className="border-b border-white/[0.07] last:border-0">
                    {r.map((cell, j) => (
                      <td key={j} className={`px-4 py-3 align-top ${j === 0 ? "font-medium text-white" : "text-white/70"}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.note ? <p className="mt-3 font-mono text-[12px] tracking-[0.02em] text-white/45">{block.note}</p> : null}
        </Section>
      );
    case "chat":
      return (
        <Section narrow>
          <h2 className={H2}>{block.heading}</h2>
          {block.intro ? <p className={`mt-4 ${BODY}`}>{block.intro}</p> : null}
          <div className="mt-6 space-y-2.5 rounded-[16px] border border-white/12 bg-[#0b141a] p-4 md:p-6">
            {block.messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "business" ? "justify-end" : "justify-start"}`}>
                <p
                  className={`max-w-[85%] rounded-[12px] px-3.5 py-2.5 text-[14px] leading-relaxed ${
                    m.from === "business" ? "rounded-br-[4px] bg-[#005c4b] text-white" : "rounded-bl-[4px] bg-[#202c33] text-white/90"
                  }`}
                >
                  <span className="sr-only">{m.from === "business" ? "Business: " : "Lead: "}</span>
                  {m.text}
                </p>
              </div>
            ))}
          </div>
        </Section>
      );
    case "callout":
      return (
        <Section narrow>
          <div className="rounded-[16px] border border-purple/50 bg-[rgba(72,118,255,0.10)] p-6 md:p-8">
            <h2 className="text-[22px] font-medium leading-tight text-white md:text-[26px]">{block.heading}</h2>
            <p className={`mt-3 ${BODY}`}>{block.body}</p>
          </div>
        </Section>
      );
  }
}

export function faqJsonLd(faqs: Faq[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function FaqSection({ faqs, heading = "Questions buyers ask" }: { faqs: Faq[]; heading?: string }) {
  if (!faqs.length) return null;
  return (
    <Section narrow id="faq">
      <h2 className={H2}>{heading}</h2>
      <div className="mt-6 divide-y divide-white/10 rounded-[16px] border border-white/12" style={{ background: GLOSS }}>
        {faqs.map((f) => (
          <details key={f.q} className="group p-5 md:p-6">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[16px] font-medium text-white">
              <h3 className="text-[16px] font-medium">{f.q}</h3>
              <span aria-hidden="true" className="mt-0.5 shrink-0 text-white/50 transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-[15px] leading-relaxed text-white/70">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}

/** Price line shown on every service/industry/location page (prices only from PRICING). */
export function PriceBox({ priceLine }: { priceLine?: string }) {
  return (
    <Section narrow id="price">
      <div className="flex flex-col gap-5 rounded-[16px] border border-white/12 p-6 md:flex-row md:items-center md:justify-between md:p-8" style={{ background: GLOSS }}>
        <div>
          <p className="font-mono text-[11.5px] font-semibold uppercase tracking-[0.12em] text-white/50">Price</p>
          <p className="mt-2 text-[22px] font-medium text-white md:text-[26px]">{priceLine ?? PRICING.teaser}</p>
          <p className="mt-2 max-w-[520px] text-[14px] leading-relaxed text-white/60">{PRICING.creditsNote}</p>
        </div>
        <div className="shrink-0">
          <GhostButton href="/pricing">See full pricing</GhostButton>
        </div>
      </div>
    </Section>
  );
}

export function RelatedLinks({ links, heading = "Related" }: { links: { label: string; href: string }[]; heading?: string }) {
  if (!links.length) return null;
  return (
    <Section>
      <h2 className="text-[20px] font-medium text-white md:text-[24px]">{heading}</h2>
      <ul className="mt-5 flex flex-wrap gap-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link to={l.href} className="inline-flex rounded-full border border-white/15 bg-black/40 px-4 py-2 text-[14px] text-white/80 hover:border-purple/60 hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** The plan form (writes to the CRM and fires the Lead event). sourcePage "seo:<path>" routes it to bms_leads. */
export function SeoLeadForm({ path, title, subtitle }: { path: string; title?: string; subtitle?: string }) {
  return (
    <CTA
      eyebrow="Free campaign plan"
      title={title ?? "See your campaign plan before you spend."}
      subtitle={
        subtitle ??
        "Tell us what you sell and who you want to reach. We'll show you the plan: budget split, audiences, ad copy. Nothing goes live until you approve it."
      }
      leadFormProps={{ sourcePage: `seo:${path}` }}
      whatsappHref={whatsappHref}
    />
  );
}

export type HubCard = { title: string; summary: string; href: string; meta?: string };

export function HubGrid({ cards }: { cards: HubCard[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((c) => (
        <Link
          key={c.href}
          to={c.href}
          className="group flex flex-col rounded-[16px] border border-white/12 p-5 transition-colors hover:border-purple/60 md:p-6"
          style={{ background: GLOSS }}
        >
          {c.meta ? <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-white/45">{c.meta}</span> : null}
          <h2 className="mt-1 text-[19px] font-medium text-white">{c.title}</h2>
          <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-white/65">{c.summary}</p>
          <span className="impact-highlight mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium">
            Read more <ArrowRightIcon className="size-3.5" />
          </span>
        </Link>
      ))}
    </div>
  );
}

export const providerLd = {
  "@type": "Organization",
  name: BRAND.legalName,
  alternateName: "BoostMySites",
  url: BRAND.siteUrl,
};
