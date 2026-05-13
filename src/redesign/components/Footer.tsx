import { Link } from "react-router-dom";
import { footerColumns, type FooterLink as FooterLinkItem } from "../data/footerNav";
import { site, whatsappHref } from "../data/site";
import { InstagramIcon, LinkedInIcon, XIcon, YouTubeIcon } from "./icons";

const linkClass =
  "inline-block py-0 text-[12.5px] font-medium text-white/70 transition-colors hover:text-white md:text-[13px]";

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

export function Footer() {
  return (
    <footer className="w-full max-w-[1920px] border-t border-white/12 px-5 pt-7 pb-6 max-md:px-4">
      <div className="flex flex-col gap-7">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,260px)_1fr] xl:items-start xl:gap-8">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2.5">
              <img
                src="/logo-B3Maab4W.png"
                alt={`${site.brand} logo`}
                className="size-[38px] rounded-[10px] object-contain"
                loading="lazy"
              />
              <span className="text-[15px] font-semibold tracking-[-0.01em] text-white">{site.brand}</span>
            </div>
            <p className="max-w-[280px] text-[11px] leading-snug text-white/45">
              Triple-Seven Boostmysites AI Solutions Private Limited
              <br />
              WeWork Arekere, Bengaluru
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 xl:gap-x-6 xl:gap-y-5">
            {footerColumns.map((column) => (
              <div key={column.heading} className="flex min-w-0 flex-col gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">
                  {column.heading}
                </span>
                <nav className="flex flex-col gap-px" aria-label={column.heading}>
                  {column.links.map((item) => (
                    <FooterLink key={`${column.heading}-${item.label}`} item={item} />
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 pt-5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">Contact</span>
          <div className="flex flex-wrap gap-x-8 gap-y-1.5">
            <a href={`mailto:${site.email}`} className={linkClass}>
              {site.email}
            </a>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className={linkClass}>
              {site.phone}
            </a>
            <a href={whatsappHref} className={linkClass} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <Link to="/app-ideas-lab" className={linkClass}>
              App Ideas Lab
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 max-md:flex-col max-md:items-stretch">
          <span className="text-[12px] text-white/45">
            © {new Date().getFullYear()} {site.brand}. All rights reserved.
          </span>
          <div className="flex items-center gap-3 max-md:justify-start">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="size-8 flex shrink-0 items-center justify-center rounded-md border border-white/10 text-white/60 transition-colors hover:border-white/25 hover:text-white"
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
