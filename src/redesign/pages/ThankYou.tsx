import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SiteBackground } from "../components/SiteBackground";
import { CheckIcon, WhatsAppIcon } from "../components/icons";
import { site, whatsappHref } from "../data/site";
import { consumeLeadThankYouReturnPath } from "../lib/leadThankYou";

const CTA_SHELL_BG =
  "radial-gradient(60% 100% at 50% 0%, var(--color-dark-purple) 0%, #000 75%)";

const REDIRECT_SECONDS = 5;

const TRUST_CHIPS = [
  "Application received",
  "Team notified",
  "Response within 24 hrs",
] as const;

export default function ThankYou() {
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS);
  const [returnPath] = useState(() => consumeLeadThankYouReturnPath());

  useEffect(() => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "form_submission_success",
        page_title: "Thank You — Form Submitted Successfully",
        page_location: window.location.href,
      });
    }
  }, []);

  useEffect(() => {
    const tick = window.setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(tick);
  }, []);

  useEffect(() => {
    if (secondsLeft > 0) return;
    navigate(returnPath, { replace: true });
  }, [secondsLeft, navigate, returnPath]);

  const returnLabel = returnPath === "/" ? "homepage" : "previous page";

  return (
    <>
      <Helmet>
        <title>Thank You | Boostmysites</title>
        <meta
          name="description"
          content="Thanks for reaching out. Our team will review your submission and get back to you within 24 hours."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <SiteBackground />
      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1920px] flex-col items-center justify-center px-5 py-16 md:px-10">
        <div
          className="relative flex w-full max-w-[640px] flex-col items-center gap-8 overflow-hidden rounded-[16px] border border-white/15 bg-black py-12 px-6 text-center md:gap-10 md:px-12 md:py-16"
          style={{
            backgroundColor: "#000",
            backgroundImage: CTA_SHELL_BG,
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1] bg-[length:400px_auto] bg-repeat opacity-40"
            style={{ backgroundImage: "url(/textures/stars.svg)" }}
          />
          <div aria-hidden className="pointer-events-none absolute inset-0 z-[0] bg-black" />

          <div className="relative z-[2] flex flex-col items-center gap-5">
            <div className="flex size-16 items-center justify-center rounded-full border border-purple/40 bg-purple/20 shadow-[0_0_40px_rgba(108,148,255,0.25)]">
              <CheckIcon className="size-7 text-white" />
            </div>
            <p className="inline-flex items-center rounded-full border border-white/15 bg-black/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.1em] text-purple">
              Request received
            </p>
            <h1 className="max-w-[480px] text-[32px] font-medium leading-[1.1] -tracking-[0.04em] text-white md:text-[44px]">
              You&apos;re on the list.
            </h1>
            <p className="max-w-[420px] text-base text-white/65 md:text-lg">
              We&apos;ll reply within 24 hours. Prefer faster? Ping us on WhatsApp.
            </p>
          </div>

          <div className="relative z-[2] flex flex-wrap justify-center gap-2">
            {TRUST_CHIPS.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white/50"
              >
                ✓ {tag}
              </span>
            ))}
          </div>

          <div className="relative z-[2] flex w-full flex-col items-center gap-4">
            <p className="text-sm text-white/50">
              Redirecting to the {returnLabel} in{" "}
              <span className="font-medium text-white">{secondsLeft}</span>…
            </p>
            <Link
              to={returnPath}
              className="btn-gloss relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-[10px] border border-white/20 bg-purple/70 px-6 py-3 text-sm font-medium text-white shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)]"
            >
              {returnPath === "/" ? "Back to homepage" : "Continue browsing"}
            </Link>
          </div>

          <div className="relative z-[2] flex w-full flex-col items-center gap-4">
            <div className="flex items-center gap-4 text-sm text-white/55">
              <span className="h-px w-12 bg-white/15" />
              or
              <span className="h-px w-12 bg-white/15" />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 rounded-[10px] border border-white/15 bg-black/40 px-4 py-2.5 text-sm font-medium text-white/90 backdrop-blur-[5px] transition-colors hover:bg-black/60 hover:text-white"
              >
                <WhatsAppIcon className="size-4 fill-white" />
                WhatsApp us
              </a>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 rounded-[10px] border border-white/15 bg-black/40 px-4 py-2.5 text-sm font-medium text-white/90 backdrop-blur-[5px] transition-colors hover:bg-black/60 hover:text-white"
              >
                {site.email}
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
