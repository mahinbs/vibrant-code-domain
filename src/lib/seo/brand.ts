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
  /** Legal / display alternates. Some older copy still uses `Boostmysites`. */
  alternateNames: ['Boostmysites', 'Boost My Sites'],
  /** Primary production origin (no trailing slash). */
  siteUrl: 'https://www.boostmysites.com',
  /** Logo used in JSON-LD + OG fallback. */
  logoUrl: 'https://www.boostmysites.com/logo.png',
  /** Default OG image used when a page does not provide its own. */
  defaultOgImage: 'https://www.boostmysites.com/favicon.png',
  /** Year founded — used for Organization schema. */
  foundingYear: 2017,
  /** Country code for Organization address. */
  country: 'IN',
  /** Primary support email. */
  email: 'ceo@boostmysites.com',
  /**
   * The canonical entity one-liner. Use this verbatim wherever a one-line
   * description of BoostMySites is required (footer, OG description fallback,
   * Organization JSON-LD `description`, off-site bios, etc).
   */
  oneLiner:
    'BoostMySites is an AI and fintech development company specializing in trading platforms, pay-in / pay-out systems, AI finance tools, neo-banking, UPI software, and fintech infrastructure for startups and enterprises.',
  /** Default site-wide description used for Helmet meta tag fallbacks. */
  defaultDescription:
    'BoostMySites builds AI-powered fintech products: trading platforms, pay-in / pay-out systems, neo-banks, UPI apps, lending tech, and broker CRMs — engineered for scale, security, and Indian regulatory compliance.',
  /** Off-site profiles used in `sameAs` of Organization JSON-LD. */
  sameAs: [
    'https://www.linkedin.com/company/boostmysites/',
    'https://www.instagram.com/boostmysites/',
    'https://x.com/boostmysites',
    'https://www.youtube.com/@boostmysites',
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
  alternateName: BRAND.alternateNames,
  url: BRAND.siteUrl,
  logo: BRAND.logoUrl,
  image: BRAND.logoUrl,
  description: BRAND.oneLiner,
  foundingDate: String(BRAND.foundingYear),
  email: BRAND.email,
  address: {
    '@type': 'PostalAddress',
    addressCountry: BRAND.country,
  },
  sameAs: BRAND.sameAs,
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
