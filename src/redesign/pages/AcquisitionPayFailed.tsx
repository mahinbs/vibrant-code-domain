import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SiteBackground } from "../components/SiteBackground";
import { Nav } from "../components/Nav";
import { whatsappHref } from "../data/site";

export default function AcquisitionPayFailed() {
  return (
    <>
      <Helmet>
        <title>Payment failed · Boostmysites</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <SiteBackground />
      <Nav
        links={[{ label: "Home", href: "/" }]}
        cta={{ label: "Try again", href: "/pay" }}
        whatsappHref={whatsappHref}
      />
      <main className="relative z-10 mx-auto flex w-full max-w-[640px] flex-col px-5 py-16 md:py-24">
        <p className="inline-flex w-fit items-center rounded-full border border-red-400/50 bg-black/60 px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.1em] text-red-400">
          Payment not completed
        </p>
        <h1 className="mt-4 text-[32px] font-medium leading-[1.1] -tracking-[0.04em] text-white md:text-[40px]">
          That payment didn’t go through.
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-white/60">
          No charge was completed. You can try again, or WhatsApp us and we’ll help you finish checkout.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/pay"
            className="btn-gloss relative inline-flex items-center justify-center overflow-hidden rounded-[10px] border border-white/20 bg-purple/70 px-5 py-3 text-[14px] font-semibold text-white"
          >
            <span className="relative z-[2]">Try again</span>
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-[10px] border border-white/15 bg-black/40 px-5 py-3 text-[14px] font-medium text-white/85"
          >
            WhatsApp us
          </a>
        </div>
      </main>
    </>
  );
}
