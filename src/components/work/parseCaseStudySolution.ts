/**
 * Turn plain DB `solution` text into structured blocks for clearer hierarchy.
 * Heuristics only — no markdown requirement in Supabase.
 */

export type SolutionParagraphBlock = { type: "paragraph"; text: string };

export type SolutionSubsectionBlock = {
  type: "subsection";
  title: string;
  /** Non-empty lines shown as a bullet list (with or without leading -/•). */
  bullets: string[];
  /** Remaining prose under the subsection (optional). */
  tail?: string;
};

export type SolutionBlock = SolutionParagraphBlock | SolutionSubsectionBlock;

const KNOWN_SUBHEAD =
  /^(delivered product\/service|core implementation summary|implementation details|key outcomes?|what we built|technical highlights|results|scope|architecture|integration)$/i;

function isLikelySubsectionTitle(line: string): boolean {
  const t = line.trim();
  if (!t || t.length > 90) return false;
  if (/[.!?]$/.test(t)) return false;
  if (KNOWN_SUBHEAD.test(t)) return true;
  // Section banners in all caps (no sentence punctuation)
  if (t === t.toUpperCase() && /^[A-Z0-9][A-Z0-9 &/\-]{3,78}$/.test(t) && t.split(/\s+/).length <= 10) return true;
  return false;
}

function stripBulletPrefix(line: string): string {
  return line.replace(/^[-*•]\s*/, "").trim();
}

function isFeatureLine(line: string): boolean {
  const t = line.trim();
  if (!t || t.length > 140) return false;
  if (/^[.!?]+$/.test(t)) return false;
  if (t.endsWith(":")) return false;
  if (/^[-*•]\s*\S/.test(t)) return true;
  if (t.length > 96) return false;
  if (t.includes(". ") || (t.includes(": ") && t.length > 56)) return false;
  if (t.split(/\s+/).length <= 14) return true;
  return false;
}

/**
 * Parse solution body into ordered blocks (paragraphs + titled lists).
 */
export function parseSolutionBody(body: string): SolutionBlock[] {
  const lines = body.replace(/\r\n/g, "\n").split("\n");
  const blocks: SolutionBlock[] = [];
  let paraBuf: string[] = [];

  const flushParagraph = () => {
    const text = paraBuf.join("\n").trim();
    paraBuf = [];
    if (text) blocks.push({ type: "paragraph", text });
  };

  let i = 0;
  while (i < lines.length) {
    const raw = lines[i];
    const line = raw.trim();

    if (!line) {
      flushParagraph();
      i += 1;
      continue;
    }

    if (isLikelySubsectionTitle(line)) {
      flushParagraph();
      const title = line;
      const bullets: string[] = [];
      let j = i + 1;
      while (j < lines.length) {
        const L = lines[j].trim();
        if (!L) break;
        if (isLikelySubsectionTitle(L)) break;
        if (isFeatureLine(L)) {
          bullets.push(stripBulletPrefix(L));
          j += 1;
          continue;
        }
        break;
      }
      let tail: string | undefined;
      const tailLines: string[] = [];
      while (j < lines.length) {
        const L = lines[j].trim();
        if (!L) {
          j += 1;
          if (tailLines.length) break;
          continue;
        }
        if (isLikelySubsectionTitle(L)) break;
        tailLines.push(lines[j]);
        j += 1;
      }
      const tailText = tailLines.join("\n").trim();
      if (tailText) tail = tailText;

      blocks.push({ type: "subsection", title, bullets, tail });
      i = j;
      continue;
    }

    paraBuf.push(raw);
    i += 1;
  }
  flushParagraph();
  return blocks;
}
