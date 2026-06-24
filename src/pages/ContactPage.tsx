import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { CTA } from "@/redesign/components/CTA";
import { Footer } from "@/redesign/components/Footer";
import { Nav } from "@/redesign/components/Nav";
import { SiteBackground } from "@/redesign/components/SiteBackground";
import { useHashScroll } from "@/redesign/lib/useHashScroll";

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
        <title>Contact Us — Boostmysites</title>
        <meta
          name="description"
          content="Book a free automation audit or get in touch with Boostmysites. We'll show you where time and money are leaking — no cost, no commitment."
        />
      </Helmet>
      <SiteBackground />
      <Nav />
      <main className="relative z-10 mx-auto flex w-full max-w-[1920px] flex-col items-center overflow-x-hidden pb-16 pt-20 md:pb-24 md:pt-24">
        <CTA id="contact-form" leadFormProps={{ sourcePage: "contact" }} />
        <Footer />
      </main>
    </>
  );
}
