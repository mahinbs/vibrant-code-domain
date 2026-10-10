import { Link } from "react-router-dom";
import { BRAND } from "@/lib/seo/brand";
import { site } from "../../data/site";
import { footerColumns } from "../../data/footerNav";
import { InstagramIcon, LinkedInIcon, XIcon, YouTubeIcon } from "../icons";
import { CC_WHATSAPP_NUMBER, commandCenterHeader } from "../../data/commandCenterContent";

/**
 * Compact footer for the landing page: brand + contact on one row, the service and
 * company links as two single lines, and the legal identity in two lines of small
 * print. Same links and details as the site-wide footer, about a third of the height.
 */

const socials = [
  { href: site.socials.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: site.socials.twitter, label: "X / Twitter", Icon: XIcon },
  { href: site.socials.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: site.socials.youtube, label: "YouTube", Icon: YouTubeIcon },
] as const;

const legalLinks = [
  { label: "Privacy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms-and-conditions" },
  { label: "Refunds", href: "/refund-policy" },
  { label: "Grievance", href: "/legal/contact" },
  { label: "Data deletion", href: "/user-data-deletion" },
] as const;

/** Keep the two rows short: services as listed, and the core company links only. */
const services = footerColumns.find((c) => c.heading === "Services")?.links ?? [];
const COMPANY_KEEP = ["Pricing", "About us", "Security", "Partner programme", "Careers", "Contact", "Blog", "Case studies"];
const company = footerColumns
  .flatMap((c) => c.links)
  .filter((l, i, all) => COMPANY_KEEP.includes(l.label) && all.findIndex((x) => x.label === l.label) === i)
  .sort((a, b) => COMPANY_KEEP.indexOf(a.label) - COMPANY_KEEP.indexOf(b.label));

function FooterLink({ href, label, external }: { href: string; label: string; external?: boolean }) {
  return external || /^https?:/.test(href) ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {label}
    </a>
  ) : (
    <Link to={href}>{label}</Link>
  );
}

export function CcFooter() {
  return (
    <footer className="cc-foot">
      <div className="cc-wrap">
        <div className="cc-foot-top">
          <Link to="/" className="cc-foot-brand" aria-label={`${site.brand} home`}>
            <img src={commandCenterHeader.logoSrc} alt="" width={30} height={30} loading="lazy" />
            <span>
              {commandCenterHeader.brandDark}
              <em>{commandCenterHeader.brandAccent}</em>
            </span>
          </Link>
          <div className="cc-foot-contact">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={`https://wa.me/${CC_WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
              WhatsApp +91 97900 35747
            </a>
            <a href={site.productUrl} target="_blank" rel="noopener noreferrer">
              Log in
            </a>
          </div>
          <div className="cc-foot-social">
            {socials.map(({ href, label, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <Icon className="cc-foot-icon" />
              </a>
            ))}
          </div>
        </div>

        <nav className="cc-foot-links" aria-label="Footer">
          <div>
            <span className="cc-foot-label">Services</span>
            <ul>
              {services.map((l) => (
                <li key={l.href}>
                  <FooterLink {...l} />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="cc-foot-label">Company</span>
            <ul>
              {company.map((l) => (
                <li key={l.href}>
                  <FooterLink {...l} />
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="cc-foot-legal">
          <p>
            © {new Date().getFullYear()} {BRAND.legalName} · {BRAND.foundingStoryShort} · GSTIN {BRAND.gstin}
            {BRAND.cin ? ` · CIN ${BRAND.cin}` : ""}
            <br />
            {BRAND.registeredAddressLine}
          </p>
          <ul>
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link to={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
