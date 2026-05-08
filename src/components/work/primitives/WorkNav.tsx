import { Link } from "react-router-dom";
import { WORK_GLASS_BG_BLUR } from "./workChrome";
import { WhatsAppIcon } from "./icons";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/contact" },
];

const WHATSAPP_HREF =
  "https://wa.me/919790035747?text=" +
  encodeURIComponent("Hello BMS, I am looking to develop a project.");

const PRIMARY_CTA_LABEL = "Get free consultation";

export function WorkNav() {
  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 w-[760px] max-w-[calc(100vw-20px)] z-30">
      <nav
        className={`flex items-center justify-between gap-3 p-2 rounded-[14px] border border-white/[0.07] shadow-[0_5px_20px_rgba(0,0,0,0.35)] ${WORK_GLASS_BG_BLUR}`}
      >
        <Link to="/" className="flex items-center gap-2 pl-1 shrink-0">
          <img
            src="/logo.png"
            alt="Boostmysites logo"
            className="size-[38px] rounded-[10px] object-contain"
            loading="eager"
          />
          <span className="text-[15px] font-semibold tracking-[-0.01em] text-white max-sm:hidden">
            Boostmysites
          </span>
        </Link>

        <div className="flex items-center gap-0.5 max-md:hidden">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              to={href}
              className="px-3 py-2 rounded-full text-[13px] font-medium text-white/70 transition-colors hover:text-white hover:bg-white/5"
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp us"
            className="size-9 rounded-lg border border-white/15 bg-white/5 text-white flex items-center justify-center transition-colors hover:bg-white/10 max-sm:hidden"
          >
            <WhatsAppIcon className="size-[18px] fill-white" />
          </a>
          <Link
            to="/contact"
            className="btn-gloss relative overflow-hidden inline-flex items-center px-3.5 py-2 rounded-lg border border-white/15 text-[13px] font-medium text-white shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.18)]"
            style={{ background: "rgba(72, 118, 255, 0.6)" }}
          >
            <span className="relative z-[2]">{PRIMARY_CTA_LABEL}</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
