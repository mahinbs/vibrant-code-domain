/**
 * Canonical brand / entity data used across SEO + GEO surfaces:
 *  - Helmet `<title>` / OG defaults
 *  - JSON-LD Organization, Service, BlogPosting schemas
 *  - Footer + About copy
 *
 * Edit this file ONCE when corporate facts change. All callers should import
 * from here rather than hardcoding strings — that way the "entity sentence"
 * stays identical across the site, which is what LLMs reward.
 */

export const BRAND = {
  /** Canonical, unambiguous brand name. Used in JSON-LD `name`. */
  name: 'BoostMySites',
  /** MCA registered legal name. Use this as the contracting party. */
  legalName: 'Triple-Seven BoostMySites AI Solutions Private Limited',
  /** Legal / display alternates. Some older copy still uses `Boostmysites`. */
  alternateNames: ['Boostmysites', 'Boost My Sites'],
  /** Primary production origin (no trailing slash). */
  siteUrl: 'https://www.boostmysites.com',
  /** Logo used in JSON-LD + OG fallback. */
  logoUrl: 'https://www.boostmysites.com/logo.png',
  /** Default OG image used when a page does not provide its own. */
  defaultOgImage: 'https://www.boostmysites.com/favicon.png',
  /** Year operations started. MCA incorporation is 2025. */
  foundingYear: 2017,
  incorporatedYear: 2025,
  /** Single public story. Use this everywhere a founding year is mentioned. */
  foundingStory:
    "Operating since 2017. Incorporated in 2025 as Triple-Seven BoostMySites AI Solutions Private Limited.",
  foundingStoryShort: "Operating since 2017. Pvt Ltd 2025.",
  /** Country code for Organization address. */
  country: 'IN',
  /** Primary public contact email (Grievance Officer / chairman). */
  email: 'chairman@boostmysites.com',
  /** GST registration (Karnataka). */
  gstin: '29AAMCT2461M1ZP',
  /** MCA Corporate Identity Number — set it to show it in the footer and About page. */
  cin: '' as string,
  /** Public phone, E.164 display. */
  phone: '+91 96329 53355',
  /** MCA registered office, single line. */
  registeredAddressLine:
    '#137, 3rd Main Cross, Dollars Colony, 4th Phase JP Nagar, Bengaluru, Karnataka 560076',
  registeredAddress: {
    streetAddress: '#137, 3rd Main Cross, Dollars Colony, 4th Phase JP Nagar',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    postalCode: '560076',
    addressCountry: 'IN',
  },
  /**
   * The canonical entity one-liner. Use this verbatim wherever a one-line
   * description of BoostMySites is required (footer, OG description fallback,
   * Organization JSON-LD `description`, off-site bios, etc).
   */
  oneLiner:
    'BoostMySites runs an AI client acquisition system for growing businesses (ads, WhatsApp, AI calling, LinkedIn, email and CRM) and builds AI and fintech software, including trading platforms, pay-in / pay-out systems and UPI software, for startups and enterprises.',
  /** Default site-wide description used for Helmet meta tag fallbacks. */
  defaultDescription:
    'Get more clients with AI: BoostMySites plans and runs your ads, WhatsApp, calls, LinkedIn and email follow-ups. We also build AI and fintech software.',
  /** Off-site profiles used in `sameAs` of Organization JSON-LD. */
  sameAs: [
    'https://www.linkedin.com/company/boostmysites/',
    'https://www.instagram.com/boostmysites/',
    'https://x.com/boostmysitescom',
    'https://www.youtube.com/@boostmysites8847',
    // The product site (same company): sign-up, credits and the app.
    'https://www.boostmysites.in/',
  ],
} as const;

/**
 * Organization JSON-LD payload (schema.org/Organization).
 * Injected once sitewide via the root layout — see App.tsx.
 */
export const organizationJsonLd = (): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${BRAND.siteUrl}/#organization`,
  name: BRAND.name,
  legalName: BRAND.legalName,
  alternateName: BRAND.alternateNames,
  url: BRAND.siteUrl,
  logo: BRAND.logoUrl,
  image: BRAND.logoUrl,
  description: BRAND.oneLiner,
  foundingDate: String(BRAND.foundingYear),
  email: BRAND.email,
  telephone: BRAND.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: BRAND.registeredAddress.streetAddress,
    addressLocality: BRAND.registeredAddress.addressLocality,
    addressRegion: BRAND.registeredAddress.addressRegion,
    postalCode: BRAND.registeredAddress.postalCode,
    addressCountry: BRAND.registeredAddress.addressCountry,
  },
  taxID: BRAND.gstin,
  sameAs: BRAND.sameAs,
});

/** LocalBusiness JSON-LD for the Bengaluru office (homepage and contact page). */
export const localBusinessJsonLd = (): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${BRAND.siteUrl}/#localbusiness`,
  name: BRAND.name,
  parentOrganization: { '@id': `${BRAND.siteUrl}/#organization` },
  url: BRAND.siteUrl,
  image: BRAND.logoUrl,
  telephone: BRAND.phone,
  email: BRAND.email,
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: BRAND.registeredAddress.streetAddress,
    addressLocality: BRAND.registeredAddress.addressLocality,
    addressRegion: BRAND.registeredAddress.addressRegion,
    postalCode: BRAND.registeredAddress.postalCode,
    addressCountry: BRAND.registeredAddress.addressCountry,
  },
  areaServed: ['India', 'United Arab Emirates', 'United Kingdom', 'United States', 'Singapore'],
});

/**
 * WebSite JSON-LD payload (schema.org/WebSite). Helps clients construct the
 * sitelinks search box and gives crawlers a clear root entity.
 */
export const websiteJsonLd = (): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BRAND.siteUrl}/#website`,
  url: BRAND.siteUrl,
  name: BRAND.name,
  description: BRAND.defaultDescription,
  publisher: { '@id': `${BRAND.siteUrl}/#organization` },
  inLanguage: 'en',
});
