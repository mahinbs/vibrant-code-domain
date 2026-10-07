import { Link } from "react-router-dom";
import { SeoShell, absUrl } from "./SeoShell";
import { HubGrid, PriceBox, Section, SeoHero, SeoLeadForm, EYEBROW } from "./blocks";
import { HUBS, pagePath, type HubKey } from "./registry";

type HubCopy = {
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  /** Optional grouping of cards (by slug) under sub-headings. */
  groups?: { heading: string; slugs: string[] }[];
};

const COPY: Record<HubKey, HubCopy> = {
  service: {
    title: "AI client acquisition services | BoostMySites",
    description:
      "Six services that work as one system: AI ad campaigns, WhatsApp automation, AI calling, LinkedIn outreach, email marketing, and leads and CRM.",
    eyebrow: "Services",
    h1: "AI client acquisition services",
    intro:
      "Six services, one system. Ads bring people in, WhatsApp, calls, LinkedIn and email follow up, and every lead is scored and lands in your CRM. Nothing spends until you approve it.",
  },
  industry: {
    title: "Lead generation by industry | BoostMySites",
    description:
      "How we plan ads and follow-ups for real estate, clinics, education, interior designers, CA firms, e-commerce, SaaS and agencies.",
    eyebrow: "Industries",
    h1: "Lead generation for your industry",
    intro:
      "Every industry gets clients differently. Pick yours to see the problems we usually find, the campaign plan we would run, and a sample WhatsApp follow-up.",
  },
  location: {
    title: "Lead generation by location | BoostMySites",
    description:
      "AI client acquisition for businesses in Dubai, the UK, the USA, Singapore, Bengaluru, Mumbai, Delhi NCR and Hyderabad.",
    eyebrow: "Locations",
    h1: "Lead generation where your customers are",
    intro:
      "We run campaigns for businesses in India and abroad from our Bengaluru office. Each page covers the platforms that matter locally, how billing works, and how we schedule around your hours.",
    groups: [
      { heading: "Overseas", slugs: ["dubai", "uk", "usa", "singapore"] },
      { heading: "India", slugs: ["bengaluru", "mumbai", "delhi-ncr", "hyderabad"] },
    ],
  },
  compare: {
    title: "BoostMySites compared | Agency, HubSpot, DIY",
    description:
      "Honest comparisons of BoostMySites with a marketing agency, HubSpot, and running ads yourself: cost, speed and control.",
    eyebrow: "Comparisons",
    h1: "How BoostMySites compares",
    intro:
      "Side-by-side comparisons with the usual alternatives, including when the alternative is the better choice for you.",
  },
};

/** Software-development pages that lived under the old /services page; kept linked so they stay crawlable. */
const SOFTWARE_LINKS = [
  { label: "Web apps", href: "/web-apps" },
  { label: "Mobile apps", href: "/mobile-apps" },
  { label: "SaaS development", href: "/saas" },
  { label: "AI development", href: "/ai-development" },
  { label: "UX/UI design", href: "/ux-ui-design" },
  { label: "AI automation", href: "/business-automation" },
  { label: "Digital transformation", href: "/digital-transformation" },
  { label: "Fintech development", href: "/fintech-development-company" },
];

export function HubPage({ hub }: { hub: HubKey }) {
  const h = HUBS[hub];
  const copy = COPY[hub];
  const toCard = (slug: string) => {
    const p = h.pages.find((x) => x.slug === slug);
    return p ? { title: p.navLabel, summary: p.cardSummary, href: pagePath(p) } : null;
  };
  const groups = copy.groups ?? [{ heading: "", slugs: h.pages.map((p) => p.slug) }];
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: copy.h1,
    itemListElement: h.pages.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: absUrl(pagePath(p)), name: p.navLabel })),
  };

  return (
    <SeoShell
      title={copy.title}
      description={copy.description}
      path={h.path}
      crumbs={[{ label: h.label, href: h.path }]}
      jsonLd={[itemList]}
    >
      <SeoHero eyebrow={copy.eyebrow} h1={copy.h1} intro={copy.intro} />
      {groups.map((g) => {
        const cards = g.slugs.map(toCard).filter((c): c is NonNullable<typeof c> => !!c);
        return (
          <Section key={g.heading || "all"}>
            {g.heading ? <h2 className="mb-5 text-[22px] font-medium text-white md:text-[26px]">{g.heading}</h2> : null}
            <HubGrid cards={cards} />
          </Section>
        );
      })}
      {hub === "service" ? (
        <Section id="software">
          <p className={EYEBROW}>Software development</p>
          <h2 className="mt-4 text-[22px] font-medium text-white md:text-[26px]">We also build software</h2>
          <p className="mt-3 max-w-[720px] text-[15px] leading-relaxed text-white/65">
            Since 2017 we have built web, mobile, SaaS and fintech products for clients. If you need software rather than clients, start here.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {SOFTWARE_LINKS.map((l) => (
              <li key={l.href}>
                <Link to={l.href} className="inline-flex rounded-full border border-white/15 bg-black/40 px-4 py-2 text-[14px] text-white/80 hover:border-purple/60 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
      {hub !== "compare" ? <PriceBox /> : null}
      <SeoLeadForm path={h.path} />
    </SeoShell>
  );
}

export default HubPage;
