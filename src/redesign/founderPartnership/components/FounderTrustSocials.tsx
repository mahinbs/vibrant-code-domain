import { site } from "../../data/site";
import { InstagramIcon, LinkedInIcon, XIcon, YouTubeIcon } from "../../components/icons";

const socials = [
  { href: site.socials.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: site.socials.twitter, label: "X", Icon: XIcon },
  { href: site.socials.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: site.socials.youtube, label: "YouTube", Icon: YouTubeIcon },
] as const;

export function FounderTrustSocials() {
  return (
    <div className="flex w-full flex-col items-center gap-2">
      <p className="text-[9px] uppercase tracking-[0.18em] text-white/45">Connect</p>
      <div className="flex items-center justify-center gap-2">
        {socials.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex size-9 items-center justify-center rounded-md border border-white/12 text-white/60 transition-colors hover:border-white/25 hover:text-white"
          >
            <Icon className="size-4 fill-current" />
          </a>
        ))}
      </div>
    </div>
  );
}
