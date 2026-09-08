import { Link } from "react-router-dom";
import { site, whatsappHref } from "../data/site";
import { InstagramIcon, LinkedInIcon, XIcon, YouTubeIcon } from "./icons";

const linkClass =
  "text-[13px] text-white/50 transition-colors hover:text-white";

const socials = [
  { href: site.socials.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: site.socials.twitter, label: "X / Twitter", Icon: XIcon },
  { href: site.socials.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: site.socials.youtube, label: "YouTube", Icon: YouTubeIcon },
] as const;

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
] as const;

const legalLinks = [
  { label: "Privacy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms-and-conditions" },
] as const;

export function Footer({ whatsappHref: whatsappHrefProp }: { whatsappHref?: string } = {}) {
  const waHref = whatsappHrefProp ?? whatsappHref;

  return (
    <footer className="mx-auto w-full max-w-[1920px] border-t border-white/[0.08] px-5 py-10 md:px-10 md:py-12">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/" className="inline-flex items-center gap-2.5" aria-label={`${site.brand} home`}>
            <span className="flex size-8 items-center justify-center rounded-[8px] bg-white p-0.5">
              <img
                src="/bms-logo.png"
                alt=""
                className="size-full object-contain"
                loading="lazy"
              />
            </span>
            <span className="text-[15px] font-semibold tracking-[-0.01em] text-white">
              {site.brand}
            </span>
          </Link>

          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center gap-x-5 gap-y-2"
          >
            {navLinks.map((item) => (
              <Link key={item.href} to={item.href} className={linkClass}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-5 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href={`mailto:${site.email}`} className={linkClass}>
              {site.email}
            </a>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className={linkClass}>
              {site.phone}
            </a>
            <a
              href={waHref}
              className={linkClass}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </div>

          <div className="flex items-center gap-2">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex size-8 items-center justify-center rounded-md text-white/40 transition-colors hover:text-white"
              >
                <Icon className="size-3.5 fill-current" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-white/35">
            © {new Date().getFullYear()} {site.brand}
          </p>
          <div className="flex items-center gap-4">
            {legalLinks.map((item) => (
              <Link key={item.href} to={item.href} className="text-[12px] text-white/35 transition-colors hover:text-white/70">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
