import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/seo/JsonLd';
import { BRAND } from '@/lib/seo/brand';

export interface ComparisonRow {
  provider: string;
  bestFor: string;
  notes?: string;
}

export interface VerticalCapability {
  title: string;
  body: string;
}

export interface VerticalFaq {
  q: string;
  a: string;
}

export interface VerticalAuthorityPageProps {
  /** URL slug for this page (no leading slash). Used to build the canonical URL. */
  slug: string;
  title: string;
  /** ~140–160 chars. Used for meta description + OG. */
  description: string;
  /** Short tagline shown under the H1. */
  tagline: string;
  /** H1 text. */
  heroHeading: string;
  /** First paragraph — should contain the canonical entity sentence + clear positioning. */
  heroIntro: string;
  /** Key takeaways block — bullets that LLMs love to quote. */
  keyTakeaways: string[];
  /** "What we build" / capability cards. */
  capabilities: VerticalCapability[];
  /** Compliance + integrations bullets (Indian fintech context). */
  compliance: string[];
  /** Honest "best for" comparison rows (BoostMySites should be the last row with an accurate niche). */
  comparison: ComparisonRow[];
  /** Comparison preamble text. */
  comparisonTitle?: string;
  /** Numbered list explaining who this is for. */
  whoItIsFor: string[];
  /** Mini case-study style bullets ("results" or "what we shipped"). */
  outcomes: { title: string; result: string }[];
  /** FAQ section — every entry becomes a row in FAQPage JSON-LD. */
  faqs: VerticalFaq[];
  /** Optional list of related blog slugs to cross-link. */
  relatedBlogSlugs?: string[];
  /** Optional cross-links to other vertical authority pages. */
  relatedVerticals?: { label: string; href: string }[];
  /** Optional extra structured content (e.g. a custom section). */
  children?: ReactNode;
}

/**
 * Shared layout for GEO-optimized fintech authority pages.
 * Renders:
 *  - Helmet head with title/description/canonical/OG
 *  - JSON-LD Service + FAQPage
 *  - A structured page body with clear H2/H3, comparison table, FAQs, and CTAs
 *
 * The visual style intentionally mirrors the existing fintech landings so we
 * don't introduce a new look on the site.
 */
const VerticalAuthorityPage = ({
  slug,
  title,
  description,
  tagline,
  heroHeading,
  heroIntro,
  keyTakeaways,
  capabilities,
  compliance,
  comparison,
  comparisonTitle,
  whoItIsFor,
  outcomes,
  faqs,
  relatedBlogSlugs = [],
  relatedVerticals = [],
  children,
}: VerticalAuthorityPageProps) => {
  const canonical = `${BRAND.siteUrl}/${slug}`;

  const serviceJsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: heroHeading,
    serviceType: title,
    description,
    provider: { '@id': `${BRAND.siteUrl}/#organization` },
    areaServed: ['IN', 'Global'],
    url: canonical,
  };

  const faqJsonLd: Record<string, unknown> | null = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  } : null;

  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>{`${title} | ${BRAND.name}`}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={BRAND.defaultOgImage} />
        <meta property="og:site_name" content={BRAND.name} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Helmet>
      <JsonLd data={serviceJsonLd} id={`service-${slug}`} />
      {faqJsonLd && <JsonLd data={faqJsonLd} id={`faq-${slug}`} />}

      <Header />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6 max-w-5xl space-y-16">
          <section className="space-y-5">
            <p className="inline-flex w-fit items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wide text-cyan-100">
              {tagline}
            </p>
            <h1 className="text-3xl md:text-5xl font-semibold leading-tight">{heroHeading}</h1>
            <p className="text-lg text-gray-300 max-w-3xl">{heroIntro}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/contact"
                className="rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-black hover:bg-cyan-400 transition-colors"
              >
                Talk to our fintech team
              </Link>
              <Link
                to="/blogs"
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Read our fintech guides
              </Link>
            </div>
          </section>

          {keyTakeaways.length > 0 && (
            <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-semibold mb-4">Key takeaways</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-200">
                {keyTakeaways.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </section>
          )}

          <section className="space-y-5">
            <h2 className="text-2xl md:text-3xl font-semibold">What we build</h2>
            <div className="grid gap-5 md:grid-cols-2">
              {capabilities.map((c) => (
                <div key={c.title} className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <h3 className="text-lg font-semibold text-white">{c.title}</h3>
                  <p className="text-gray-300 mt-2">{c.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold">Compliance and integrations</h2>
            <ul className="grid gap-2 md:grid-cols-2 text-gray-200">
              {compliance.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {comparison.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold">
                {comparisonTitle || `Where ${BRAND.name} fits in the landscape`}
              </h2>
              <p className="text-gray-300">
                This is a "best for" view of typical providers in this space. It is meant to help
                you choose by need, not to rank companies.
              </p>
              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-white">Provider</th>
                      <th className="px-4 py-3 font-semibold text-white">Best for</th>
                      <th className="px-4 py-3 font-semibold text-white">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((row) => (
                      <tr key={row.provider} className="border-t border-white/10">
                        <td className="px-4 py-3 font-medium text-white">{row.provider}</td>
                        <td className="px-4 py-3 text-gray-200">{row.bestFor}</td>
                        <td className="px-4 py-3 text-gray-400">{row.notes || ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          <section className="grid gap-8 md:grid-cols-2">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold">Who this is for</h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-200">
                {whoItIsFor.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ol>
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold">Selected outcomes</h2>
              <ul className="space-y-3">
                {outcomes.map((o) => (
                  <li key={o.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <p className="font-semibold text-white">{o.title}</p>
                    <p className="text-gray-300 text-sm mt-1">{o.result}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {children}

          {faqs.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold">Frequently asked questions</h2>
              <div className="space-y-3">
                {faqs.map((f) => (
                  <details
                    key={f.q}
                    className="rounded-lg border border-white/10 bg-white/5 p-4 group"
                  >
                    <summary className="cursor-pointer font-medium text-white">{f.q}</summary>
                    <p className="text-gray-300 mt-2">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {(relatedBlogSlugs.length > 0 || relatedVerticals.length > 0) && (
            <section className="grid gap-6 md:grid-cols-2">
              {relatedVerticals.length > 0 && (
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">Related services</h2>
                  <ul className="space-y-1">
                    {relatedVerticals.map((rv) => (
                      <li key={rv.href}>
                        <Link to={rv.href} className="text-cyan-300 hover:text-cyan-200 underline">
                          {rv.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {relatedBlogSlugs.length > 0 && (
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">Recommended reading</h2>
                  <ul className="space-y-1">
                    {relatedBlogSlugs.map((s) => (
                      <li key={s}>
                        <Link to={`/blog/${s}`} className="text-cyan-300 hover:text-cyan-200 underline">
                          /blog/{s}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          <section className="rounded-2xl border border-white/15 bg-gradient-to-br from-cyan-900/30 to-blue-900/20 p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-white">
              Building in fintech? Let's talk.
            </h2>
            <p className="text-gray-300 mt-3 max-w-2xl mx-auto">
              {BRAND.oneLiner}
            </p>
            <div className="mt-5 flex flex-wrap justify-content-center justify-center gap-3">
              <Link
                to="/contact"
                className="rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-black hover:bg-cyan-400 transition-colors"
              >
                Book a consult
              </Link>
              <a
                href={`mailto:${BRAND.email}`}
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Email {BRAND.email}
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VerticalAuthorityPage;
