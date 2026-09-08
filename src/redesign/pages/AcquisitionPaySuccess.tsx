import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SiteBackground } from "../components/SiteBackground";
import { Nav } from "../components/Nav";
import { whatsappHref, site } from "../data/site";

export default function AcquisitionPaySuccess() {
  const [params] = useSearchParams();
  const paymentId = params.get("payment_id");
  const orderId = params.get("order_id");

  return (
    <>
      <Helmet>
        <title>Payment received · Boostmysites</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <SiteBackground />
      <Nav
        links={[{ label: "Home", href: "/" }]}
        cta={{ label: "WhatsApp us", href: whatsappHref }}
        whatsappHref={whatsappHref}
      />
      <main className="relative z-10 mx-auto flex w-full max-w-[640px] flex-col px-5 py-16 md:py-24">
        <p className="acq-eyebrow impact-highlight inline-flex w-fit items-center rounded-full border border-purple/50 bg-black/60 px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.1em]">
          Payment successful
        </p>
        <h1 className="mt-4 text-[32px] font-medium leading-[1.1] -tracking-[0.04em] text-white md:text-[40px]">
          You’re in. We’ll start setup shortly.
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-white/60">
          Thanks for paying for the AI Client Acquisition System. Our team will reach out on WhatsApp
          / email within 24 hours to connect your accounts. A GST tax invoice has been emailed to the
          address you used at checkout.
        </p>
        {(paymentId || orderId) && (
          <dl className="mt-6 space-y-2 rounded-[12px] border border-white/12 bg-black/40 p-4 font-mono text-[12px] text-white/55">
            {paymentId ? (
              <div className="flex justify-between gap-4">
                <dt>Payment ID</dt>
                <dd className="text-white/80">{paymentId}</dd>
              </div>
            ) : null}
            {orderId ? (
              <div className="flex justify-between gap-4">
                <dt>Order ID</dt>
                <dd className="text-white/80">{orderId}</dd>
              </div>
            ) : null}
          </dl>
        )}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/"
            className="btn-gloss relative inline-flex items-center justify-center overflow-hidden rounded-[10px] border border-white/20 bg-purple/70 px-5 py-3 text-[14px] font-semibold text-white"
          >
            <span className="relative z-[2]">Back to homepage</span>
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-[10px] border border-white/15 bg-black/40 px-5 py-3 text-[14px] font-medium text-white/85"
          >
            WhatsApp {site.brand}
          </a>
        </div>
      </main>
    </>
  );
}
