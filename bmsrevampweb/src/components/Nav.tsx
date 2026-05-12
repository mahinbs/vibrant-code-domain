import { navLinks, primaryCta, site, whatsappHref } from "../data/site";
import { WhatsAppIcon } from "./icons";

export function Nav() {
  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 w-[760px] max-w-[calc(100vw-20px)] z-20">
      <nav className="flex items-center justify-between gap-3 p-2 bg-black/70 backdrop-blur-[10px] rounded-[14px] border border-white/15 shadow-[0_5px_20px_rgba(0,0,0,0.35)]">
        <a href="#top" className="flex items-center gap-2 pl-1 shrink-0">
          <img
            src="/logo-B3Maab4W.png"
            alt={`${site.brand} logo`}
            className="size-[38px] rounded-[10px] object-contain"
            loading="eager"
          />
          <span className="text-[15px] font-semibold tracking-[-0.01em] text-white max-sm:hidden">
            {site.brand}
          </span>
        </a>

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
            className="btn-gloss relative overflow-hidden inline-flex items-center px-3.5 py-2 rounded-lg bg-purple/60 border border-white/15 text-[13px] font-medium text-white shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.18)]"
          >
            <span className="relative z-[2]">{primaryCta.label}</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
