import type { ReactNode } from "react";
import { ccJourney } from "../../data/commandCenterContent";

/**
 * Renders "*highlighted*" parts of a heading in the band's opposite colour
 * (blue on white headings, ink on blue headings). Plain text otherwise.
 */
export function Highlight({ text }: { text: string }): ReactNode {
  const parts = text.split(/\*([^*]+)\*/g);
  // Plain strings between the highlights: no Fragment wrappers (dev taggers add props to them).
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <em key={i} className="cc-hl">
        {part}
      </em>
    ) : (
      part
    ),
  );
}

/**
 * What happens after any CTA: free demo → see it on your business → 90% code → onboarding.
 * `compact` is a single numbered row (offer box, popup); otherwise a vertical list.
 */
export function CcJourney({ compact, className }: { compact?: boolean; className?: string }) {
  return (
    <ol className={`cc-journey${compact ? " is-compact" : ""}${className ? ` ${className}` : ""}`}>
      {ccJourney.map((step, i) => (
        <li key={step.title}>
          <span className="cc-journey-num" aria-hidden="true">
            {i + 1}
          </span>
          <div>
            <strong>{step.title}</strong>
            {compact ? null : <span>{step.body}</span>}
          </div>
        </li>
      ))}
    </ol>
  );
}
