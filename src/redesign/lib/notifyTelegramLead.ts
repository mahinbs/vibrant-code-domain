/**
 * Sends a formatted Telegram message to the Boostmysites leads bot whenever a
 * new lead is captured. Fire-and-forget: never blocks or fails the submission.
 *
 * NOTE: this runs in the browser, so the bot token ships in the client bundle.
 * That's acceptable for a write-only "send me a notification" bot, but for a
 * hardened setup move this to a Supabase Edge Function / DB webhook and keep the
 * token in a server secret. Token + chat id can be overridden via env:
 *   VITE_TELEGRAM_BOT_TOKEN, VITE_TELEGRAM_CHAT_ID
 */

const BOT_TOKEN =
  (import.meta.env.VITE_TELEGRAM_BOT_TOKEN as string | undefined) ||
  "8986968844:AAG5LYjYSfkZHOOwx5rXepiCzR4MRgfhpVc";

// Mahin (@mahinbstech) — private chat with the leads bot.
const CHAT_ID =
  (import.meta.env.VITE_TELEGRAM_CHAT_ID as string | undefined) || "6656403690";

export type TelegramLead = {
  leadType: string;
  name: string;
  email: string;
  phone?: string;
  company?: string | null;
  sourcePage: string;
  score?: number;
  tier?: string;
  fields?: Record<string, unknown>;
};

const esc = (v: unknown) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const pretty = (key: string) =>
  key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase());

const prettyVal = (v: unknown) => {
  if (Array.isArray(v)) return v.length ? v.map((x) => prettyVal(x)).join(", ") : "—";
  if (v === null || v === undefined || v === "") return "—";
  if (typeof v === "object") return JSON.stringify(v);
  return String(v).replace(/[-_]/g, " ");
};

function formatMessage(lead: TelegramLead): string {
  const lines: string[] = [];
  lines.push(`🔔 <b>New lead</b> — ${esc(pretty(lead.leadType))}`);
  if (lead.tier || typeof lead.score === "number") {
    const tier = lead.tier ? `${esc(lead.tier.toUpperCase())}` : "";
    const score = typeof lead.score === "number" ? ` · score ${lead.score}` : "";
    lines.push(`⭐ <b>${tier}</b>${score}`);
  }
  lines.push("");
  lines.push(`👤 <b>${esc(lead.name)}</b>`);
  lines.push(`✉️ ${esc(lead.email)}`);
  if (lead.phone) lines.push(`📱 ${esc(lead.phone)}`);
  if (lead.company) lines.push(`🏢 ${esc(lead.company)}`);
  lines.push(`🔗 ${esc(lead.sourcePage)}`);

  if (lead.fields) {
    const entries = Object.entries(lead.fields).filter(
      ([, v]) => v !== null && v !== undefined && v !== "" && !(Array.isArray(v) && v.length === 0),
    );
    if (entries.length) {
      lines.push("");
      lines.push("<b>Details</b>");
      for (const [k, v] of entries) {
        lines.push(`• ${esc(pretty(k))}: ${esc(prettyVal(v))}`);
      }
    }
  }

  return lines.join("\n");
}

export function notifyTelegramLead(lead: TelegramLead): void {
  if (!BOT_TOKEN || !CHAT_ID || CHAT_ID === "__SET_CHAT_ID__") return;

  const body = JSON.stringify({
    chat_id: CHAT_ID,
    text: formatMessage(lead),
    parse_mode: "HTML",
    disable_web_page_preview: true,
  });

  // Fire-and-forget; swallow all errors so a failed notify never breaks submit.
  void fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}
