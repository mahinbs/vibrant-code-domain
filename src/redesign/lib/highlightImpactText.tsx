import { type ReactNode } from "react";

const HIGHLIGHT_MARKER_RE = /\{\{([^}]+)\}\}/g;

/**
 * Renders copy with optional impact highlights.
 * Wrap phrases in `{{double braces}}` in content strings, e.g.
 * `Built by a {{founder}}, for {{founders}}.`
 *
 * Uses `.impact-highlight` in CSS (see index.css) so solid blue wins over
 * `.redesign-shell span { color: inherit }`.
 */
export function HighlightText({ text }: { text: string }): ReactNode {
  if (!text.includes("{{")) return text;

  const parts: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(HIGHLIGHT_MARKER_RE)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      parts.push(text.slice(lastIndex, index));
    }
    parts.push(
      <span key={index} className="impact-highlight">
        {match[1]}
      </span>,
    );
    lastIndex = index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length === 1 ? parts[0] : parts;
}
