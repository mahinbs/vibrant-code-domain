/**
 * OG-preview endpoint for shared lead links (/dashboard/lead/:id).
 *
 * Social crawlers (WhatsApp, Slack, Telegram, …) don't run the SPA's JS, so
 * vercel.json routes ONLY crawler user-agents here; humans still get the app.
 * Returns minimal HTML whose OG tags describe the lead.
 */
const SUPABASE_URL = "https://upxsbhsamorhvnfebvor.supabase.co";
const ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVweHNiaHNhbW9yaHZuZmVidm9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4OTIyODQsImV4cCI6MjA2NDQ2ODI4NH0.dQGmD8Zo5-PoJj5INy2xM1eUotayKMiGsf5EEkMrB1U";

const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]),
  );

export default async function handler(req, res) {
  const id = String(req.query.id || "");
  const uuidOk = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

  let title = "Sales Pipeline | Boostmysites";
  let desc = "Lead details on the Boostmysites sales pipeline.";

  if (uuidOk) {
    try {
      const r = await fetch(
        `${SUPABASE_URL}/rest/v1/pipeline_leads?id=eq.${id}&select=client,industry,business,current_stage,status,estimated_value,poc,meeting_at,attachments`,
        { headers: { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` } },
      );
      const [lead] = await r.json();
      if (lead) {
        title = `${lead.client || "Lead"} — Sales Pipeline`;
        const bits = [
          lead.industry || lead.business,
          lead.current_stage || lead.status,
          lead.estimated_value ? `₹${lead.estimated_value}` : null,
          lead.poc ? `POC: ${lead.poc}` : null,
          Array.isArray(lead.attachments) && lead.attachments.length
            ? `📎 ${lead.attachments.length} file(s)`
            : "⚠ no file yet",
        ].filter(Boolean);
        desc = bits.join(" · ") || desc;
      }
    } catch {
      /* fall back to defaults */
    }
  }

  const url = `https://www.boostmysites.com/dashboard/lead/${esc(id)}`;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=300");
  res.status(200).send(`<!doctype html>
<html><head>
<meta charset="utf-8">
<title>${esc(title)}</title>
<meta property="og:type" content="website">
<meta property="og:site_name" content="Boostmysites Sales Pipeline">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="https://www.boostmysites.com/bms-logo.png">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta http-equiv="refresh" content="0;url=${url}">
</head><body>${esc(title)}</body></html>`);
}
