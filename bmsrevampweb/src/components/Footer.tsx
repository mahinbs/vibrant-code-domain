import { navLinks, site } from "../data/site";
import { InstagramIcon, XIcon, YouTubeIcon } from "./icons";

const socials = [
  { href: site.socials.twitter, label: "X / Twitter", Icon: XIcon },
  { href: site.socials.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: site.socials.youtube, label: "YouTube", Icon: YouTubeIcon },
] as const;

export function Footer() {
  return (
    <footer className="w-full max-w-[min(1500px,96vw)] border-t border-white/12 px-5 pt-10 pb-8 flex flex-col gap-6 max-md:px-4">
      <div className="flex items-start justify-between flex-wrap gap-8 max-md:flex-col">
        <div className="flex flex-col gap-3 max-w-[320px]">
          <div className="flex items-center gap-2.5">
            <img
              src="/logo-B3Maab4W.png"
              alt={`${site.brand} logo`}
              className="size-[38px] rounded-[10px] object-contain"
              loading="lazy"
            />
            <span className="text-[15px] font-semibold tracking-[-0.01em] text-white">
              {site.brand}
            </span>
          </div>
          <p className="text-[13px] text-white/55 leading-[1.5em]">
            Custom software & AI for ambitious teams. 500+ projects delivered
            from offices in Bengaluru, Delhi, Dubai, Bangkok and Hong Kong.
          </p>
        </div>

        <div className="flex items-start gap-12 flex-wrap pt-1 max-md:gap-8">
          <div className="flex flex-col gap-2.5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">
              Sections
            </span>
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-[13px] font-medium text-white/70 transition-colors hover:text-white"
              >
                {label}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-2.5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">
              Reach us
            </span>
            <a
              href={`mailto:${site.email}`}
              className="text-[13px] font-medium text-white/70 transition-colors hover:text-white"
            >
              {site.email}
            </a>
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="text-[13px] font-medium text-white/70 transition-colors hover:text-white"
            >
              {site.phone}
            </a>
            <a
              href={site.appIdeasUrl}
              target="_blank"
              rel="noopener"
              className="text-[13px] font-medium text-white/70 transition-colors hover:text-white"
            >
              App Ideas Lab
            </a>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-white/10 max-md:flex-col max-md:items-start">
        <span className="text-[12px] text-white/45">
          © {new Date().getFullYear()} {site.brand}. All rights reserved.
        </span>
        <div className="flex items-center gap-3">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener"
              aria-label={label}
              className="size-8 flex items-center justify-center rounded-md border border-white/10 text-white/60 transition-colors hover:text-white hover:border-white/25"
            >
              <Icon className="size-4 fill-current" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
