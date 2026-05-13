import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { navLinks, primaryCta, site, whatsappHref } from "../data/site";
import { WhatsAppIcon } from "./icons";

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <>
      {/* Sticky avoids iOS Safari's `position: fixed` re-anchoring bug when an
       *  ancestor has transform/filter/backdrop-filter/will-change. Outer
       *  wrapper is pointer-events-none so the gap above the pill never
       *  blocks taps on hero CTAs. */}
      <div className="sticky top-0 z-40 w-full pointer-events-none pt-[max(env(safe-area-inset-top),0.35rem)] pb-1.5">
        <nav className="pointer-events-auto mx-auto flex w-[760px] max-w-[calc(100vw-20px)] items-center justify-between gap-3 p-2 bg-black/85 backdrop-blur-[10px] rounded-[14px] border border-white/15 shadow-[0_5px_20px_rgba(0,0,0,0.35)]">
          <Link to="/" className="flex items-center gap-2 pl-1 shrink-0" aria-label={`${site.brand} home`}>
            <img
              src="/logo-B3Maab4W.png"
              alt={`${site.brand} logo`}
              className="size-9 object-contain"
              loading="eager"
            />
            <span className="text-[15px] font-semibold tracking-[-0.01em] text-white max-sm:hidden">
              {site.brand}
            </span>
          </Link>

          <div className="flex items-center gap-0.5 max-md:hidden">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="px-3 py-2 rounded-full text-[13px] font-medium text-white/70 transition-colors hover:text-white hover:bg-white/5"
              >
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener"
              aria-label="WhatsApp us"
              className="size-9 rounded-lg border border-white/15 bg-white/5 text-white flex items-center justify-center transition-colors hover:bg-white/10 max-sm:hidden"
            >
              <WhatsAppIcon className="size-[18px] fill-white" />
            </a>
            <a
              href={primaryCta.href}
              className="btn-gloss relative overflow-hidden inline-flex items-center px-3.5 py-2 rounded-lg bg-purple/60 border border-white/15 text-[13px] font-medium text-white shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.18)] max-md:hidden"
            >
              <span className="relative z-[2]">{primaryCta.label}</span>
            </a>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="redesign-mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="md:hidden size-10 rounded-lg border border-white/15 bg-white/5 text-white flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-[18px]"
                aria-hidden
              >
                {open ? (
                  <>
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="6" y1="18" x2="18" y2="6" />
                  </>
                ) : (
                  <>
                    <line x1="4" y1="7" x2="20" y2="7" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="17" x2="20" y2="17" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {open ? (
        <div
          id="redesign-mobile-menu"
          className="fixed inset-0 z-[45] md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div
            className="absolute inset-0 min-h-[100dvh] bg-black/80 backdrop-blur-[6px]"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 right-0 top-[calc(env(safe-area-inset-top,0px)+88px)] mx-3 rounded-[14px] border border-white/15 bg-black/85 p-3 shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
            <div className="flex flex-col">
              {navLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-[15px] font-medium text-white/85 hover:bg-white/5 hover:text-white"
                >
                  {label}
                </a>
              ))}
            </div>
            <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-3 text-[14px] font-medium text-white"
              >
                <WhatsAppIcon className="size-[16px] fill-white" />
                WhatsApp us
              </a>
              <a
                href={primaryCta.href}
                onClick={() => setOpen(false)}
                className="btn-gloss relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-purple/60 px-3 py-3 text-[14px] font-medium text-white shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.18)]"
              >
                <span className="relative z-[2]">{primaryCta.label}</span>
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
