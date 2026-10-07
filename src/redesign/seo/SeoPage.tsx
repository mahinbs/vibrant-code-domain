import { Navigate, useParams } from "react-router-dom";
import { BRAND } from "@/lib/seo/brand";
import { SeoShell, absUrl } from "./SeoShell";
import { BlockView, FaqSection, PriceBox, RelatedLinks, SeoHero, SeoLeadForm, faqJsonLd, providerLd } from "./blocks";
import { HUBS, pagePath, type HubKey } from "./registry";
import type { SeoPageData } from "./types";

function serviceJsonLd(page: SeoPageData, path: string): Record<string, unknown> {
  const overseas = page.locale && page.locale.hreflang !== "en-IN";
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    serviceType: page.primaryPhrase,
    description: page.metaDescription,
    url: absUrl(path),
    provider: providerLd,
    areaServed: page.locale ? page.locale.areaServed : ["India", "United Arab Emirates", "United Kingdom", "United States", "Singapore"],
    ...(page.kind === "industry" && page.leadIndustry
      ? { audience: { "@type": "BusinessAudience", audienceType: page.leadIndustry } }
      : {}),
    offers: {
      "@type": "Offer",
      name: "2,500 credits",
      priceCurrency: overseas ? "USD" : "INR",
      price: overseas ? "9.99" : "899",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: overseas ? "9.99" : "899",
        priceCurrency: overseas ? "USD" : "INR",
        referenceQuantity: { "@type": "QuantitativeValue", value: 2500, unitText: "credits" },
        valueAddedTaxIncluded: false,
      },
      url: absUrl("/pricing"),
    },
  };
}

export function SeoPage({ page }: { page: SeoPageData }) {
  const hub = HUBS[page.kind];
  const path = pagePath(page);
  const jsonLd = [...(page.kind === "compare" ? [] : [serviceJsonLd(page, path)]), faqJsonLd(page.faqs)];
  const showOffice = page.locale?.officeAddress;

  return (
    <SeoShell
      title={page.metaTitle}
      description={page.metaDescription}
      path={path}
      crumbs={[{ label: hub.label, href: hub.path }, { label: page.navLabel, href: path }]}
      hreflang={page.locale?.hreflang}
      jsonLd={jsonLd}
    >
      <SeoHero eyebrow={page.eyebrow} h1={page.h1} intro={page.intro} />
      {page.blocks.map((b, i) => (
        <BlockView key={i} block={b} />
      ))}
      {page.kind !== "compare" ? <PriceBox priceLine={page.locale?.priceLine} /> : null}
      {showOffice ? (
        <section className="mx-auto w-full max-w-[860px] px-5 py-6 md:px-10">
          <h2 className="text-[20px] font-medium text-white">Our office</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-white/70">
            {BRAND.legalName}
            <br />
            {page.locale!.officeAddress}
            <br />
            WhatsApp {BRAND.phone}
          </p>
          <iframe
            title="BoostMySites office on Google Maps"
            className="mt-4 h-[260px] w-full rounded-[16px] border border-white/12"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${encodeURIComponent(page.locale!.officeAddress!)}&output=embed`}
          />
        </section>
      ) : null}
      <FaqSection faqs={page.faqs} />
      <RelatedLinks links={page.related} heading="Keep reading" />
      <SeoLeadForm path={path} />
    </SeoShell>
  );
}

/** Route element for /<hub>/:slug — looks the page up, or sends unknown slugs back to the hub. */
export function SeoPageRoute({ hub }: { hub: HubKey }) {
  const { slug } = useParams<{ slug: string }>();
  const page = HUBS[hub].pages.find((p) => p.slug === slug);
  if (!page) return <Navigate to={HUBS[hub].path} replace />;
  return <SeoPage page={page} />;
}

export default SeoPageRoute;
