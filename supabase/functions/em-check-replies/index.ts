import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { ImapFlow } from "npm:imapflow@1.0.164";
import { corsHeaders, jsonResponse, createSupabaseAdmin } from "./lib/util.ts";

const CONNECT_MS = 8_000;
const GREETING_MS = 6_000;
const SOCKET_MS = 15_000;
const WALL_CLOCK_MS = 45_000;
const CONNECT_PHASE_MS = 12_000;
const LOOKBACK_DAYS = 7;
const MAX_MESSAGES_PER_RUN = 10;
const MAX_RECIPIENT_SEARCHES = 25;

type OutboundCtx = { leadId: string | null; sendId: string | null };

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function decodeQuotedPrintable(text: string): string {
  return text
    .replace(/=\r?\n/g, "")
    .replace(/=([0-9A-F]{2})/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}

function extractBodyText(raw: string): string {
  const headerEnd = raw.search(/\r?\n\r?\n/);
  const bodySection = headerEnd >= 0 ? raw.slice(headerEnd).replace(/^\r?\n\r?\n/, "") : raw;

  const boundaryMatch = raw.match(/boundary="?([^"\s;]+)"?/i);
  if (boundaryMatch) {
    const boundary = boundaryMatch[1];
    const parts = bodySection.split(`--${boundary}`);
    for (const part of parts) {
      if (/Content-Type:\s*text\/plain/i.test(part)) {
        const content = part.replace(/^[\s\S]*?\r?\n\r?\n/, "");
        const decoded = decodeQuotedPrintable(content).trim();
        if (decoded && !decoded.startsWith("Return-Path:")) return decoded.slice(0, 5000);
      }
    }
    for (const part of parts) {
      if (/Content-Type:\s*text\/html/i.test(part)) {
        const content = part.replace(/^[\s\S]*?\r?\n\r?\n/, "");
        const decoded = stripHtml(decodeQuotedPrintable(content)).trim();
        if (decoded) return decoded.slice(0, 5000);
      }
    }
  }

  const textMatch = bodySection.match(
    /Content-Type:\s*text\/plain[\s\S]*?\r?\n\r?\n([\s\S]*?)(?=\r?\n--|\r?\nContent-Type:|$)/i,
  );
  if (textMatch) {
    const decoded = decodeQuotedPrintable(textMatch[1]).trim();
    if (decoded && !decoded.startsWith("Return-Path:")) return decoded.slice(0, 5000);
  }

  const htmlMatch = bodySection.match(
    /Content-Type:\s*text\/html[\s\S]*?\r?\n\r?\n([\s\S]*?)(?=\r?\n--|\r?\nContent-Type:|$)/i,
  );
  if (htmlMatch) return stripHtml(decodeQuotedPrintable(htmlMatch[1])).slice(0, 5000);

  const simple = bodySection.trim();
  if (simple && !/^Return-Path:/m.test(simple) && !/^Received:/m.test(simple)) {
    return simple.slice(0, 5000);
  }
  return "";
}

function extractMessageId(raw: string): string | null {
  const match = raw.match(/^Message-ID:\s*(.+)$/im);
  return match ? match[1].trim() : null;
}

function isReplyEmail(raw: string, subject: string): boolean {
  if (/^\s*(re|fw|fwd|aw):\s*/i.test(subject.trim())) return true;
  if (/^in-reply-to:/im.test(raw)) return true;
  if (/^references:/im.test(raw)) return true;
  return false;
}

function envelopeDate(envelope: { date?: Date | string | null } | undefined): string {
  if (!envelope?.date) return new Date().toISOString();
  const d = envelope.date instanceof Date ? envelope.date : new Date(envelope.date);
  return Number.isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

async function loadSkippedUids(supabase: ReturnType<typeof createSupabaseAdmin>): Promise<Set<number>> {
  const { data } = await supabase
    .from("em_settings")
    .select("value")
    .eq("key", "imap_skipped_uids")
    .maybeSingle();
  const arr = Array.isArray(data?.value) ? data.value : [];
  return new Set(arr.filter((n): n is number => typeof n === "number"));
}

async function saveSkippedUids(supabase: ReturnType<typeof createSupabaseAdmin>, skipped: Set<number>) {
  const trimmed = [...skipped].sort((a, b) => b - a).slice(0, 2000);
  await supabase.from("em_settings").upsert({
    key: "imap_skipped_uids",
    value: trimmed,
    updated_at: new Date().toISOString(),
  });
}

async function loadImportedUids(supabase: ReturnType<typeof createSupabaseAdmin>): Promise<Set<number>> {
  const { data } = await supabase
    .from("em_email_messages")
    .select("resend_message_id")
    .like("resend_message_id", "imap-uid:%");
  return new Set(
    (data ?? [])
      .map((row) => parseInt(String(row.resend_message_id).replace("imap-uid:", ""), 10))
      .filter((n) => !Number.isNaN(n)),
  );
}

async function loadSentToMap(supabase: ReturnType<typeof createSupabaseAdmin>): Promise<Map<string, OutboundCtx>> {
  const map = new Map<string, OutboundCtx>();
  const { data } = await supabase
    .from("em_email_sends")
    .select("id, lead_id, to_email")
    .eq("status", "sent")
    .order("sent_at", { ascending: false })
    .limit(500);
  for (const row of data ?? []) {
    const email = String(row.to_email).toLowerCase();
    if (!map.has(email)) {
      map.set(email, { sendId: row.id, leadId: row.lead_id });
    }
  }
  return map;
}

async function searchFromRecipients(
  client: ImapFlow,
  recipientEmails: string[],
  since: Date,
): Promise<number[]> {
  const uids = new Set<number>();
  for (const email of recipientEmails.slice(0, MAX_RECIPIENT_SEARCHES)) {
    const found = (await client.search({ since, from: email }, { uid: true })) ?? [];
    for (const uid of found) uids.add(uid);
    if (uids.size >= MAX_MESSAGES_PER_RUN * 3) break;
  }
  return [...uids];
}

function imapUnreachableMessage(host: string): string {
  const hints = [
    "Supabase could not reach your IMAP server in time.",
    `Current IMAP_HOST: ${host}.`,
    "If ceo@ is Microsoft 365 / GoDaddy 365, set IMAP_HOST=outlook.office365.com in Supabase secrets.",
    "If legacy GoDaddy, use IMAP_HOST=imap.secureserver.net.",
    "GoDaddy sometimes blocks cloud servers — Apple Mail on your phone works because it is on your network, not Supabase.",
  ];
  return hints.join(" ");
}

function imapErrorHint(message: string, host: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("sync timed out") || lower.includes("connection not available")) {
    return imapUnreachableMessage(host);
  }
  if (lower.includes("auth") || lower.includes("invalid credentials") || lower.includes("login")) {
    return `${message} — check IMAP_USER is the full email and IMAP_PASSWORD is correct.`;
  }
  if (lower.includes("timeout") || lower.includes("timed out") || lower.includes("econnrefused")) {
    if (host.includes("secureserver")) {
      return `${message} — if ceo@ is Microsoft 365, set IMAP_HOST=outlook.office365.com instead of imap.secureserver.net.`;
    }
    return `${message} — verify IMAP_HOST and that GoDaddy allows IMAP access.`;
  }
  return message;
}

function withWallClock<T>(ms: number, promise: Promise<T>): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`IMAP sync timed out after ${ms / 1000}s`)), ms)
    ),
  ]);
}

async function runReplyCheck(): Promise<Response> {
  const host = Deno.env.get("IMAP_HOST");
  const user = Deno.env.get("IMAP_USER");
  const password = Deno.env.get("IMAP_PASSWORD");
  if (!host || !user || !password) {
    return jsonResponse({
      ok: true,
      imap_not_configured: true,
      processed: 0,
      reason: "IMAP not configured — set IMAP_HOST, IMAP_USER, IMAP_PASSWORD in Supabase secrets",
    });
  }

  const imapUser = user.toLowerCase();
  const port = Number(Deno.env.get("IMAP_PORT") ?? 993);
  let client: ImapFlow | null = null;

  try {
    const supabase = createSupabaseAdmin();
    const [{ data: state }, skippedUidSet, importedUids, sentToMap] = await Promise.all([
      supabase.from("em_imap_state").select("last_uid").eq("id", "default").single(),
      loadSkippedUids(supabase),
      loadImportedUids(supabase),
      loadSentToMap(supabase),
    ]);
    const lastUid = state?.last_uid ?? 0;
    const newlySkipped: number[] = [];
    let checked = 0;
    let processed = 0;
    let skipped = 0;
    let maxUid = lastUid;

    const recipientEmails = [...sentToMap.keys()];
    if (!recipientEmails.length) {
      return jsonResponse({
        ok: true,
        processed: 0,
        skipped: 0,
        checked: 0,
        last_uid: lastUid,
        reason: "No sent emails yet — send a blast first, then check replies.",
      });
    }

    client = new ImapFlow({
      host,
      port,
      secure: port === 993,
      servername: host,
      auth: { user, pass: password },
      logger: false,
      connectionTimeout: CONNECT_MS,
      greetingTimeout: GREETING_MS,
      socketTimeout: SOCKET_MS,
    });

    await withWallClock(CONNECT_PHASE_MS, client.connect());
    const lock = await client.getMailboxLock("INBOX");

    try {
      const since = new Date();
      since.setDate(since.getDate() - LOOKBACK_DAYS);

      const fromRecipientUids = await searchFromRecipients(client, recipientEmails, since);
      const candidateUids = fromRecipientUids
        .filter((uid) => !skippedUidSet.has(uid) && !importedUids.has(uid))
        .sort((a, b) => b - a)
        .slice(0, MAX_MESSAGES_PER_RUN * 2);

      checked = candidateUids.length;
      if (!candidateUids.length) {
        return jsonResponse({ ok: true, processed: 0, skipped: 0, last_uid: lastUid, checked: 0 });
      }

      const toFetchSource: Array<{
        uid: number;
        fromEmail: string;
        subject: string;
        envelope: Awaited<ReturnType<ImapFlow["fetchOne"]>>["envelope"];
      }> = [];

      const envelopeStream = client.fetch(
        candidateUids.join(","),
        { uid: true, envelope: true },
        { uid: true },
      );

      for await (const msg of envelopeStream) {
        if (!msg.uid) continue;
        maxUid = Math.max(maxUid, msg.uid);

        const fromEmail = msg.envelope?.from?.[0]?.address?.toLowerCase();
        if (!fromEmail || fromEmail === imapUser) {
          skipped++;
          newlySkipped.push(msg.uid);
          continue;
        }

        const subject = msg.envelope?.subject ?? "";
        const outbound = sentToMap.get(fromEmail);
        const looksLikeReply = /^\s*(re|fw|fwd|aw):/i.test(subject.trim());

        if (!outbound || !looksLikeReply) {
          skipped++;
          newlySkipped.push(msg.uid);
          continue;
        }

        toFetchSource.push({ uid: msg.uid, fromEmail, subject, envelope: msg.envelope });
        if (toFetchSource.length >= MAX_MESSAGES_PER_RUN) break;
      }

      for (const item of toFetchSource) {
        const full = await client.fetchOne(
          item.uid,
          { uid: true, envelope: true, source: true },
          { uid: true },
        );
        if (!full?.source) continue;

        const raw = new TextDecoder().decode(full.source);
        if (!isReplyEmail(raw, item.subject)) {
          skipped++;
          newlySkipped.push(item.uid);
          continue;
        }

        const messageId = extractMessageId(raw);
        if (messageId) {
          const { data: existingByMid } = await supabase
            .from("em_email_messages")
            .select("id")
            .eq("resend_message_id", messageId)
            .maybeSingle();
          if (existingByMid) {
            skipped++;
            newlySkipped.push(item.uid);
            continue;
          }
        }

        const outbound = sentToMap.get(item.fromEmail)!;
        const uidKey = `imap-uid:${item.uid}`;
        const bodyText = extractBodyText(raw);
        const receivedAt = envelopeDate(item.envelope);

        const { data: message, error: insertError } = await supabase
          .from("em_email_messages")
          .insert({
            lead_id: outbound.leadId,
            send_id: outbound.sendId,
            direction: "inbound",
            from_email: item.fromEmail,
            to_email: user,
            subject: item.subject,
            body_text: bodyText.slice(0, 10000),
            received_at: receivedAt,
            is_read: false,
            resend_message_id: messageId ?? uidKey,
          })
          .select()
          .single();

        if (insertError) {
          console.error("Failed to insert inbound message", insertError);
          skipped++;
          continue;
        }

        if (outbound.leadId) {
          await supabase.from("em_email_events").insert({
            send_id: outbound.sendId,
            lead_id: outbound.leadId,
            message_id: message?.id,
            event_type: "replied",
            occurred_at: receivedAt,
          });

          await supabase
            .from("em_leads")
            .update({ status: "replied", updated_at: receivedAt })
            .eq("id", outbound.leadId);

          await supabase
            .from("em_sequence_enrollments")
            .update({ status: "stopped", stopped_reason: "replied" })
            .eq("lead_id", outbound.leadId)
            .eq("status", "active");
        }

        processed++;
      }
    } finally {
      lock.release();
    }

    if (newlySkipped.length) {
      for (const uid of newlySkipped) skippedUidSet.add(uid);
      await saveSkippedUids(supabase, skippedUidSet);
    }

    if (maxUid > lastUid) {
      await supabase
        .from("em_imap_state")
        .update({ last_uid: maxUid, updated_at: new Date().toISOString() })
        .eq("id", "default");
    }

    return jsonResponse({ ok: true, processed, skipped, last_uid: maxUid, checked });
  } catch (err) {
    const raw = err instanceof Error ? err.message : "Unknown error";
    const message = imapErrorHint(raw, host ?? "");
    console.error("em-check-replies failed:", message);
    return jsonResponse({ ok: false, error: message }, 500);
  } finally {
    if (client) {
      try {
        await client.logout();
      } catch {
        // ignore logout errors
      }
    }
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    return await withWallClock(WALL_CLOCK_MS, runReplyCheck());
  } catch (err) {
    const raw = err instanceof Error ? err.message : "Unknown error";
    const host = Deno.env.get("IMAP_HOST") ?? "";
    const message = imapErrorHint(raw, host);
    console.error("em-check-replies wall clock:", message);
    return jsonResponse({ ok: false, error: message }, 500);
  }
});
