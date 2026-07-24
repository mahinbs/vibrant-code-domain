/**
 * Daily sales report — computed from pipeline_leads and sent to Telegram.
 * Triggered by Vercel cron (see vercel.json); can also be opened manually:
 * /api/daily-report (add ?dry=1 to preview without sending).
 */
const SUPABASE_URL = "https://upxsbhsamorhvnfebvor.supabase.co";
const ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVweHNiaHNhbW9yaHZuZmVidm9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4OTIyODQsImV4cCI6MjA2NDQ2ODI4NH0.dQGmD8Zo5-PoJj5INy2xM1eUotayKMiGsf5EEkMrB1U";
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "8986968844:AAG5LYjYSfkZHOOwx5rXepiCzR4MRgfhpVc";
const CHAT_ID = process.env.TELEGRAM_CHAT_ID || "6656403690";
const TEAM = ["Kavya", "Viaan", "Darshan", "Mahin", "Supreeth"];

export default async function handler(req, res) {
  try {
    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/pipeline_leads?select=client,poc,responsiveness,meeting_at,meeting_owner,created_at,updated_at,attachments,estimated_value`,
      { headers: { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` } },
    );
    const leads = await r.json();
    if (!Array.isArray(leads)) throw new Error("bad leads payload");

    const now = Date.now();
    const start = now - 24 * 3600 * 1000; // last 24h
    const inWin = (iso) => {
      if (!iso) return false;
      const t = new Date(iso).getTime();
      return Number.isFinite(t) && t >= start && t <= now;
    };
    const mt = (iso) => {
      if (!iso) return 0;
      const t = new Date(iso).getTime();
      return Number.isFinite(t) ? t : 0;
    };

    const totals = {
      updated: leads.filter((l) => inWin(l.updated_at)).length,
      added: leads.filter((l) => inWin(l.created_at)).length,
      meetings: leads.filter((l) => l.meeting_at && inWin(l.meeting_at) && mt(l.meeting_at) <= now).length,
      upcoming: leads.filter((l) => mt(l.meeting_at) > now).length,
      hotNew: leads.filter((l) => l.responsiveness === "hot" && inWin(l.updated_at)).length,
      hotTotal: leads.filter((l) => l.responsiveness === "hot").length,
    };

    const people = TEAM.map((name) => {
      const owned = leads.filter((l) => l.poc === name);
      const updated = owned.filter((l) => inWin(l.updated_at)).length;
      const added = owned.filter((l) => inWin(l.created_at)).length;
      const meetings = leads.filter(
        (l) => l.meeting_owner === name && l.meeting_at && inWin(l.meeting_at) && mt(l.meeting_at) <= now,
      ).length;
      const upcoming = leads.filter((l) => l.meeting_owner === name && mt(l.meeting_at) > now).length;
      const hotNew = owned.filter((l) => l.responsiveness === "hot" && inWin(l.updated_at)).length;
      const files = owned.filter((l) => (l.attachments || []).some((a) => inWin(a.uploaded_at))).length;
      const score = updated + added + meetings * 3 + hotNew * 2 + files;
      return { name, owned: owned.length, updated, added, meetings, upcoming, hotNew, files, score };
    }).sort((a, b) => b.score - a.score);

    const top = people[0] && people[0].score > 0 ? people[0] : null;
    const dateStr = new Date().toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata", weekday: "short", day: "2-digit", month: "short", year: "numeric",
    });

    const lines = [
      `📊 <b>Daily Sales Report</b> — ${dateStr}`,
      "",
      `<b>Last 24 hours</b>`,
      `✏️ Leads updated: <b>${totals.updated}</b>`,
      `➕ New leads: <b>${totals.added}</b>`,
      `📅 Meetings conducted: <b>${totals.meetings}</b> (upcoming: ${totals.upcoming})`,
      `🔥 New hot leads: <b>${totals.hotNew}</b> (total hot: ${totals.hotTotal})`,
      "",
      top
        ? `🏆 <b>Top performer: ${top.name}</b> — ${top.updated} updates, ${top.meetings} meetings, ${top.hotNew} new hot`
        : `😴 No team activity recorded in the last 24 hours.`,
      "",
      `<b>Team</b> (leads · upd · meet · hot · score)`,
      ...people.map(
        (p, i) =>
          `${i === 0 && p.score > 0 ? "🏆" : "▫️"} ${p.name}: ${p.owned} · ${p.updated} · ${p.meetings} · ${p.hotNew} · <b>${p.score}</b>`,
      ),
      "",
      `→ www.boostmysites.com/dashboard`,
    ];
    const text = lines.join("\n");

    if (req.query.dry) {
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      return res.status(200).send(text.replace(/<\/?b>/g, ""));
    }

    const tg = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: "HTML", disable_web_page_preview: true }),
    });
    const out = await tg.json();
    res.status(200).json({ sent: !!out.ok });
  } catch (e) {
    res.status(500).json({ error: String(e && e.message) });
  }
}
