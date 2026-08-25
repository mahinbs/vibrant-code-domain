// Daily keep-alive ping — runs a trivial read against Supabase so the
// free-tier project never pauses from inactivity. Scheduled in vercel.json.
const SUPABASE_URL = "https://khxkorrvylcscyqfklxi.supabase.co";
const ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoeGtvcnJ2eWxjc2N5cWZrbHhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc2NDk0NjUsImV4cCI6MjEwMzIyNTQ2NX0.ehzhqJe6niwiNcL6gne3T3HEihYCev0Gk4aaLeuzRg0";

export default async function handler(_req, res) {
  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/pipeline_leads?select=id&limit=1`, {
      headers: { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` },
    });
    res.status(200).json({ ok: r.ok, status: r.status, at: new Date().toISOString() });
  } catch (e) {
    res.status(200).json({ ok: false, error: String(e), at: new Date().toISOString() });
  }
}
