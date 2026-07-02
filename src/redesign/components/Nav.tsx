import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getNavPageLabel } from "../data/navPageLabels";
import {
  navLinks,
  primaryCta,
  site,
  whatsappHref,
} from "../data/site";
import { WhatsAppIcon } from "./icons";

export type NavLinkItem = { label: string; href: string };
export type NavCta = { label: string; href: string };

type NavProps = {
  links?: ReadonlyArray<NavLinkItem>;
  cta?: NavCta;
  whatsappHref?: string;
  /** When set, primary nav CTA opens the audit modal instead of navigating. */
  onCtaClick?: () => void;
  /** Desktop: render CTA button outside the nav pill (business automation landing). */
  ctaOutsideNav?: boolean;
};

export function Nav({
  links = navLinks,
  cta = primaryCta,
  whatsappHref: whatsappHrefProp,
  onCtaClick,
  ctaOutsideNav = false,
}: NavProps) {
  const waHref = whatsappHrefProp ?? whatsappHref;
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const pageLabel = getNavPageLabel(pathname);

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

  const ctaButtonClass =
    "btn-gloss relative overflow-hidden inline-flex items-center rounded-lg bg-purple/60 border border-white/15 text-[13px] font-medium text-white shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.18)]";

  const renderCtaButton = (className: string) =>
    onCtaClick ? (
      <button type="button" onClick={onCtaClick} className={className}>
        <span className="relative z-[2]">{cta.label}</span>
      </button>
    ) : cta.href.startsWith("/") && !cta.href.includes("#") ? (
      <Link to={cta.href} className={className}>
        <span className="relative z-[2]">{cta.label}</span>
      </Link>
    ) : (
      <a href={cta.href} className={className}>
        <span className="relative z-[2]">{cta.label}</span>
      </a>
    );

  return (
    <>
      {/* Sticky avoids iOS Safari's `position: fixed` re-anchoring bug when an
       *  ancestor has transform/filter/backdrop-filter/will-change. Outer
       *  wrapper is pointer-events-none so the gap above the pill never
       *  blocks taps on hero CTAs. */}
      <div className="sticky top-0 z-40 w-full pointer-events-none pt-[max(env(safe-area-inset-top),0.35rem)] pb-1.5">
        <div
          className={[
            "pointer-events-auto mx-auto flex max-w-[calc(100vw-20px)] items-center gap-2",
            ctaOutsideNav ? "justify-center md:max-w-none md:gap-2.5" : "justify-center",
          ].join(" ")}
        >
          <nav
            className={[
              "flex items-center justify-between gap-2 p-2 bg-black/85 backdrop-blur-[10px] rounded-[14px] border border-white/15 shadow-[0_5px_20px_rgba(0,0,0,0.35)]",
              ctaOutsideNav ? "w-full max-w-[calc(100vw-20px)] md:w-auto md:max-w-none md:shrink-0" : "w-[760px] max-w-[calc(100vw-20px)]",
            ].join(" ")}
          >
          <Link to="/" className="flex min-w-0 items-center gap-2 pl-1 shrink-0" aria-label={`${site.brand} home`}>
            <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-white p-1 shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
              <img
                src="/bms-logo.png"
                alt={`${site.brand} logo`}
                className="size-full object-contain"
                loading="eager"
              />
            </span>
            {pageLabel ? (
              <span className="hidden text-[15px] font-semibold tracking-[-0.01em] text-white md:inline">
                {site.brand}
              </span>
            ) : (
              <span className="text-[14px] font-semibold tracking-[-0.01em] text-white sm:text-[15px]">
                {site.brand}
              </span>
            )}
          </Link>

          {pageLabel ? (
            <p
              className={[
                "min-w-0 flex-1 truncate px-1 text-center text-[12px] font-medium tracking-[0.02em] text-white/85 sm:text-[13px]",
                ctaOutsideNav ? "md:hidden" : "md:max-w-[280px] md:flex-none md:px-3 md:text-left",
              ].join(" ")}
              aria-current="page"
            >
              {pageLabel}
            </p>
          ) : null}

          <div className="flex items-center gap-0.5 max-md:hidden md:ml-auto">
            {links.map(({ label, href }) => (
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
              href={waHref}
              target="_blank"
              rel="noopener"
              aria-label="WhatsApp us"
              className="size-9 rounded-lg border border-white/15 bg-white/5 text-white flex items-center justify-center transition-colors hover:bg-white/10 max-sm:hidden"
            >
              <WhatsAppIcon className="size-[18px] fill-white" />
            </a>
            {ctaOutsideNav ? null : onCtaClick ? (
              <button
                type="button"
                onClick={onCtaClick}
                className={`${ctaButtonClass} px-3.5 py-2 max-md:hidden`}
              >
                <span className="relative z-[2]">{cta.label}</span>
              </button>
            ) : (
              renderCtaButton(`${ctaButtonClass} px-3.5 py-2 max-md:hidden`)
            )}

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
          {ctaOutsideNav
            ? renderCtaButton(`${ctaButtonClass} hidden shrink-0 whitespace-nowrap px-4 py-2.5 md:inline-flex`)
            : null}
        </div>
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
              {links.map(({ label, href }) => (
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
                href={waHref}
                target="_blank"
                rel="noopener"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-3 text-[14px] font-medium text-white"
              >
                <WhatsAppIcon className="size-[16px] fill-white" />
                WhatsApp us
              </a>
              {onCtaClick ? (
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onCtaClick();
                  }}
                  className="btn-gloss relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-purple/60 px-3 py-3 text-[14px] font-medium text-white shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.18)]"
                >
                  <span className="relative z-[2]">{cta.label}</span>
                </button>
              ) : (
                <span onClick={() => setOpen(false)} className="contents">
                  {renderCtaButton(
                    "btn-gloss relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-purple/60 px-3 py-3 text-[14px] font-medium text-white shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.18)]",
                  )}
                </span>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
