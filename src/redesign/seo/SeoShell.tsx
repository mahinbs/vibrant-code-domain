import type { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import JsonLd from "@/components/seo/JsonLd";
import { BRAND } from "@/lib/seo/brand";
import { SiteBackground } from "../components/SiteBackground";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { FloatingWhatsAppButton } from "../components/FloatingWhatsAppButton";
import { SITE_NAV_CTA, SITE_NAV_LINKS } from "../data/siteNav";
import { whatsappHref } from "../data/site";

export type Crumb = { label: string; href: string };

type SeoShellProps = {
  /** Under 60 characters. */
  title: string;
  /** Under 155 characters. */
  description: string;
  /** Absolute path of this page, e.g. "/services/ai-calling". */
  path: string;
  /** Breadcrumb trail after Home (last item is this page). Renders visible crumbs + BreadcrumbList schema. */
  crumbs?: Crumb[];
  /** Page language/region, e.g. "en-AE" — sets <html lang> and a self hreflang. */
  hreflang?: string;
  /** Extra JSON-LD blocks for this page (Service, FAQPage, ...). */
  jsonLd?: Array<Record<string, unknown>>;
  /** Hide from search (e.g. a hub with nothing in it yet). */
  noindex?: boolean;
  children: ReactNode;
};

export const absUrl = (path: string) => `${BRAND.siteUrl}${path === "/" ? "/" : path}`;

export function SeoShell({ title, description, path, crumbs, hreflang, jsonLd = [], noindex, children }: SeoShellProps) {
  const url = absUrl(path);
  const breadcrumbLd =
    crumbs && crumbs.length
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [{ label: "Home", href: "/" }, ...crumbs].map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            item: absUrl(c.href),
          })),
        }
      : null;

  return (
    <>
      <Helmet htmlAttributes={hreflang ? { lang: hreflang } : undefined}>
        <title>{title}</title>
        <meta name="description" content={description} />
        {noindex ? <meta name="robots" content="noindex, follow" /> : null}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={BRAND.defaultOgImage} />
        <meta name="twitter:card" content="summary_large_image" />
        {hreflang ? <link rel="alternate" hrefLang={hreflang} href={url} /> : null}
        {hreflang ? <link rel="alternate" hrefLang="x-default" href={absUrl("/locations")} /> : null}
      </Helmet>
      {breadcrumbLd ? <JsonLd data={breadcrumbLd} id="breadcrumbs" /> : null}
      {jsonLd.map((d, i) => (
        <JsonLd key={i} data={d} id={`page-ld-${i}`} />
      ))}
      <SiteBackground />
      <div className="relative z-10 min-h-screen overflow-x-clip text-white">
        <Nav links={SITE_NAV_LINKS} cta={SITE_NAV_CTA} whatsappHref={whatsappHref} ctaOutsideNav />
        {crumbs && crumbs.length ? (
          <nav aria-label="Breadcrumb" className="mx-auto w-full max-w-[1100px] px-5 pt-4 md:px-10">
            <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-white/45">
              <li>
                <Link to="/" className="hover:text-white">Home</Link>
              </li>
              {crumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-1.5">
                  <span aria-hidden="true">/</span>
                  {i === crumbs.length - 1 ? (
                    <span aria-current="page" className="text-white/70">{c.label}</span>
                  ) : (
                    <Link to={c.href} className="hover:text-white">{c.label}</Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        <main>{children}</main>
        <Footer />
        <FloatingWhatsAppButton href={whatsappHref} />
      </div>
    </>
  );
}
