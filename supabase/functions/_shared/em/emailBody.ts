/** Strip Gmail/Outlook quoted reply history for display and AI context. */
export function stripQuotedReplyBody(raw: string): { preview: string; full: string } {
  const full = raw.trim();
  if (!full) return { preview: "", full: "" };

  let cut = full;
  const onWrote = cut.search(/\r?\nOn .+wrote:\s*\r?\n/i);
  if (onWrote > 0) cut = cut.slice(0, onWrote).trim();

  const original = cut.search(/\r?\n-{3,}\s*Original Message\s*-{3,}/i);
  if (original > 0) cut = cut.slice(0, original).trim();

  const lines = cut.split(/\r?\n/);
  const kept: string[] = [];
  for (const line of lines) {
    if (/^\s*>/.test(line)) break;
    kept.push(line);
  }
  const preview = kept.join("\n").trim();
  return { preview: preview || full.slice(0, 500), full };
}
