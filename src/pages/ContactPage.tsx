import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { CTA } from "@/redesign/components/CTA";
import { Footer } from "@/redesign/components/Footer";
import { Nav } from "@/redesign/components/Nav";
import { SiteBackground } from "@/redesign/components/SiteBackground";
import { useHashScroll } from "@/redesign/lib/useHashScroll";
import { FloatingWhatsAppButton } from "@/redesign/components/FloatingWhatsAppButton";
import { SITE_NAV_CTA, SITE_NAV_LINKS } from "@/redesign/data/siteNav";
import { whatsappHref } from "@/redesign/data/site";
import JsonLd from "@/components/seo/JsonLd";
import { BRAND, localBusinessJsonLd } from "@/lib/seo/brand";

/** Legacy `/contact#form` links from service pages. */
function useLegacyFormHash() {
  useEffect(() => {
    if (window.location.hash !== "#form") return;
    window.history.replaceState(null, "", "#contact-form");
    window.setTimeout(() => {
      const el = document.getElementById("contact-form");
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }, 120);
  }, []);
}

export default function ContactPage() {
  useHashScroll();
  useLegacyFormHash();

  return (
    <>
      <Helmet>
        <title>Contact BoostMySites | Bengaluru office and WhatsApp</title>
        <meta
          name="description"
          content="Get your client acquisition plan, WhatsApp us on +91 96329 53355,, email us, or visit our Bengaluru office in JP Nagar."
        />
      </Helmet>
      <JsonLd data={localBusinessJsonLd()} id="localbusiness" />
      <SiteBackground />
      <Nav links={SITE_NAV_LINKS} cta={SITE_NAV_CTA} whatsappHref={whatsappHref} ctaOutsideNav />
      <FloatingWhatsAppButton href={whatsappHref} />
      <main className="relative z-10 mx-auto flex w-full max-w-[1920px] flex-col items-center overflow-x-hidden pb-16 pt-20 md:pb-24 md:pt-24">
        <h1 className="sr-only">Contact BoostMySites</h1>
        <CTA id="contact-form" leadFormProps={{ sourcePage: "contact" }} />
        <section className="mx-auto grid w-full max-w-[1100px] gap-6 px-5 py-10 md:grid-cols-2 md:px-10" aria-label="Office and contact details">
          <div className="text-[15px] leading-relaxed text-white/75">
            <h2 className="text-[22px] font-medium text-white">Our office</h2>
            <p className="mt-3">
              {BRAND.legalName}
              <br />
              {BRAND.registeredAddressLine}
            </p>
            <p className="mt-3">
              WhatsApp / phone: <a className="underline underline-offset-2" href={whatsappHref}>{BRAND.phone}</a>
              <br />
              Email: <a className="underline underline-offset-2" href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
              <br />
              GSTIN: {BRAND.gstin}
              {BRAND.cin ? <><br />CIN: {BRAND.cin}</> : null}
            </p>
          </div>
          <iframe
            title="BoostMySites office on Google Maps"
            className="h-[280px] w-full rounded-[16px] border border-white/12"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${encodeURIComponent(BRAND.registeredAddressLine)}&output=embed`}
          />
        </section>
        <Footer />
      </main>
    </>
  );
}
