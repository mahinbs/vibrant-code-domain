/** Strip Gmail/Outlook quoted reply history for display. */
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

export function effectiveMessageAt(msg: {
  sent_at?: string | null;
  received_at?: string | null;
  created_at: string;
}): number {
  const t = msg.sent_at ?? msg.received_at ?? msg.created_at;
  return new Date(t).getTime();
}

export function sortMessagesChronologically<T extends {
  sent_at?: string | null;
  received_at?: string | null;
  created_at: string;
}>(messages: T[]): T[] {
  return [...messages].sort((a, b) => effectiveMessageAt(a) - effectiveMessageAt(b));
}

/** Hide queued placeholder when a real send row exists for the same send_id. */
export function filterThreadMessages<
  T extends {
    direction: string;
    from_email: string;
    send_id: string | null;
    sent_at?: string | null;
  },
>(messages: T[]): T[] {
  const sentSendIds = new Set(
    messages
      .filter((m) => m.direction === "outbound" && m.from_email !== "queued@system" && m.send_id)
      .map((m) => m.send_id as string),
  );
  return messages.filter((m) => {
    if (m.from_email === "queued@system" && m.send_id && sentSendIds.has(m.send_id)) {
      return false;
    }
    return true;
  });
}
