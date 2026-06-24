import { Link } from "react-router-dom";
import { footerColumns, type FooterColumn, type FooterLink as FooterLinkItem } from "../data/footerNav";
import { site, whatsappHref } from "../data/site";
import { InstagramIcon, LinkedInIcon, XIcon, YouTubeIcon } from "./icons";

const linkClass =
  "inline-block py-0 text-[11px] leading-tight font-medium text-white/65 transition-colors hover:text-white max-md:py-0 md:text-[13px] md:text-white/70";

const headingClass =
  "text-[9.5px] font-semibold uppercase tracking-[0.1em] text-white/38 md:text-[11px] md:tracking-[0.12em] md:text-white/40";

const socials = [
  { href: site.socials.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: site.socials.twitter, label: "X / Twitter", Icon: XIcon },
  { href: site.socials.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: site.socials.youtube, label: "YouTube", Icon: YouTubeIcon },
] as const;

function isRouterInternal(href: string): boolean {
  if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) return false;
  if (href.startsWith("/#")) return false;
  return href.startsWith("/");
}

function FooterLink({ item }: { item: FooterLinkItem }) {
  if (item.external || item.href.startsWith("http")) {
    return (
      <a href={item.href} className={linkClass} target="_blank" rel="noopener noreferrer">
        {item.label}
      </a>
    );
  }
  if (item.href.startsWith("mailto:") || item.href.startsWith("tel:")) {
    return (
      <a href={item.href} className={linkClass}>
        {item.label}
      </a>
    );
  }
  if (isRouterInternal(item.href)) {
    return (
      <Link to={item.href} className={linkClass}>
        {item.label}
      </Link>
    );
  }
  return (
    <a href={item.href} className={linkClass}>
      {item.label}
    </a>
  );
}

function FooterColumnLinks({ column }: { column: FooterColumn }) {
  const dense = column.links.length > 6;

  return (
    <nav
      className={
        dense
          ? "grid grid-cols-2 gap-x-3 gap-y-0 md:flex md:flex-col md:gap-px"
          : "flex flex-col gap-0 md:gap-px"
      }
      aria-label={column.heading}
    >
      {column.links.map((item) => (
        <FooterLink key={`${column.heading}-${item.label}`} item={item} />
      ))}
    </nav>
  );
}

function FooterColumnMobile({ column }: { column: FooterColumn }) {
  return (
    <details className="group border-b border-white/[0.06] md:hidden">
      <summary
        className={`flex cursor-pointer list-none items-center justify-between gap-2 py-2 ${headingClass} [&::-webkit-details-marker]:hidden`}
      >
        <span className="truncate">{column.heading}</span>
        <span
          aria-hidden
          className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-white/12 text-[10px] leading-none text-white/45 transition-transform duration-200 group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <div className="pb-2 pt-0.5">
        <FooterColumnLinks column={column} />
      </div>
    </details>
  );
}

function FooterColumnDesktop({ column }: { column: FooterColumn }) {
  return (
    <div className="hidden min-w-0 flex-col gap-2 md:flex">
      <span className={headingClass}>{column.heading}</span>
      <FooterColumnLinks column={column} />
    </div>
  );
}

export function Footer({ whatsappHref: whatsappHrefProp }: { whatsappHref?: string } = {}) {
  const waHref = whatsappHrefProp ?? whatsappHref;
  return (
    <footer className="mx-auto w-full max-w-[1920px] border-t border-white/12 px-4 pt-4 pb-5 max-md:px-3.5 max-md:pt-3.5 max-md:pb-4 md:px-10 md:pt-6 md:pb-6">
      <div className="flex flex-col gap-3 max-md:gap-2.5 md:gap-7">
        <div className="grid gap-3 max-md:gap-2 md:gap-5 xl:grid-cols-[minmax(0,260px)_1fr] xl:items-start xl:gap-8">
          <div className="flex flex-col gap-0.5 max-md:pb-0.5">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-[8px] bg-white p-0.5 md:size-[38px] md:rounded-[10px] md:p-1">
                <img
                  src="/bms-logo.png"
                  alt={`${site.brand} logo`}
                  className="size-full object-contain"
                  loading="lazy"
                />
              </span>
              <span className="text-[13px] font-semibold tracking-[-0.01em] text-white md:text-[15px]">
                {site.brand}
              </span>
            </div>
            <p className="text-[9.5px] leading-[1.35] text-white/40 md:max-w-[280px] md:text-[11px] md:leading-snug md:text-white/45">
              <span className="max-md:hidden">Triple-Seven Boostmysites AI Solutions Private Limited</span>
              <span className="md:hidden">Boostmysites AI Solutions Pvt. Ltd.</span>
              <br />
              WeWork Arekere, Bengaluru
            </p>
          </div>

          <div className="min-w-0 max-md:grid max-md:grid-cols-2 max-md:gap-x-2 md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-6 xl:gap-x-6 xl:gap-y-5">
            {footerColumns.map((column) => (
              <div key={column.heading} className="min-w-0">
                <FooterColumnMobile column={column} />
                <FooterColumnDesktop column={column} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: contact + copyright + socials in one tight strip */}
        <div className="border-t border-white/[0.06] pt-2 md:hidden">
          <div className="flex items-start justify-between gap-2">
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] leading-tight">
              <a href={`mailto:${site.email}`} className={linkClass} aria-label={site.email}>
                Email
              </a>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className={linkClass} aria-label={site.phone}>
                Call
              </a>
              <a
                href={waHref}
                className={linkClass}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                WA
              </a>
              <Link to="/app-ideas-lab" className={linkClass}>
                Lab
              </Link>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-6 shrink-0 items-center justify-center rounded border border-white/10 text-white/50 transition-colors hover:border-white/20 hover:text-white"
                >
                  <Icon className="size-2.5 fill-current" />
                </a>
              ))}
            </div>
          </div>
          <p className="mt-1.5 text-[9px] leading-none text-white/32">
            © {new Date().getFullYear()} {site.brand}
          </p>
        </div>

        <div className="hidden flex-col gap-1 border-t border-white/10 pt-5 md:flex md:gap-2">
          <span className={headingClass}>Contact</span>
          <div className="flex flex-wrap gap-x-8 gap-y-1.5">
            <a href={`mailto:${site.email}`} className={linkClass}>
              {site.email}
            </a>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className={linkClass}>
              {site.phone}
            </a>
            <a href={waHref} className={linkClass} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <Link to="/app-ideas-lab" className={linkClass}>
              App Ideas Lab
            </Link>
          </div>
        </div>

        <div className="hidden items-center justify-between gap-3 border-t border-white/10 pt-4 md:flex">
          <span className="text-[12px] text-white/45">
            © {new Date().getFullYear()} {site.brand}. All rights reserved.
          </span>
          <div className="flex shrink-0 items-center gap-1.5">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex size-8 shrink-0 items-center justify-center rounded-md border border-white/10 text-white/60 transition-colors hover:border-white/25 hover:text-white"
              >
                <Icon className="size-4 fill-current" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
