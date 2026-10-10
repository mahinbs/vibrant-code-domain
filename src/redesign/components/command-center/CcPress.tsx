import type { CSSProperties } from "react";
import { businessAutomationPressItems } from "../../data/businessAutomationContent";

/**
 * "Featured in" press strip under the poster. Same press list as the other landing
 * pages (businessAutomationPressItems), drawn as ink wordmarks on the poster paper.
 * Paid brand-studio pieces are labelled "Brand feature" rather than passed off as editorial.
 */

const SERIF: CSSProperties = { fontFamily: "'Times New Roman', Georgia, serif" };

function Wordmark({ name }: { name: string }) {
  const n = name.toLowerCase();
  if (n.includes("forbes")) return <span className="cc-press-mark is-serif is-xl" style={SERIF}>Forbes</span>;
  if (n.includes("entrepreneur")) return <span className="cc-press-mark is-heavy">Entrepreneur</span>;
  if (n.includes("times of india"))
    return (
      <span className="cc-press-mark is-serif" style={SERIF}>
        The Times of India
      </span>
    );
  if (n.includes("business insider")) return <span className="cc-press-mark is-heavy is-tight">Business Insider</span>;
  if (n.includes("outlook"))
    return (
      <span className="cc-press-mark is-serif" style={SERIF}>
        Outlook<em> India</em>
      </span>
    );
  if (n.includes("quint")) return <span className="cc-press-mark is-heavy">The Quint</span>;
  return <span className="cc-press-mark">{name}</span>;
}

export function CcPress() {
  const items = [...businessAutomationPressItems];
  return (
    <section className="cc-press" aria-label="Featured in">
      <div className="cc-wrap">
        <p className="cc-press-label">Boostmysites and our founder, featured in</p>
        <ul className="cc-press-list">
          {items.map((item) => (
            <li key={item.href}>
              <a href={item.href} target="_blank" rel="noopener noreferrer">
                <Wordmark name={item.publication} />
                <span className="cc-press-meta">
                  {item.isPartnerContent ? `Brand feature · ${item.yearLabel}` : item.yearLabel}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
