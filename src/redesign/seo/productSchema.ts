import { BRAND } from "@/lib/seo/brand";
import { site } from "../data/site";
import { PRICING } from "./pricing";

/** SoftwareApplication JSON-LD: boostmysites.in is the product of the boostmysites.com organisation. */
export const productJsonLd = (): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${site.productHome}#software`,
  name: "BoostMySites",
  alternateName: "BoostMySites AI client acquisition system",
  url: site.productHome,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "AI agents that plan, launch and optimise ad campaigns in your own ad accounts and follow up every lead on WhatsApp, LinkedIn, email and calls. Pay-per-result credits, no subscription.",
  publisher: { "@id": `${BRAND.siteUrl}/#organization` },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "INR",
    lowPrice: String(Math.min(...PRICING.packsINR.map((p) => p.price))),
    highPrice: String(Math.max(...PRICING.packsINR.map((p) => p.price))),
    offerCount: PRICING.packsINR.length,
    url: site.productHome,
  },
});
