/**
 * Optional: mirror a lead's description back into the LeadList Google Sheet.
 *
 * Set VITE_PIPELINE_SHEET_WEBHOOK to a Google Apps Script Web App URL (see the
 * script provided with this feature). When set, every description save POSTs
 * { tab, sl_no, client, description } to it and the script writes it into the
 * matching row. When unset, this is a no-op — the dashboard still works.
 */
const WEBHOOK = import.meta.env.VITE_PIPELINE_SHEET_WEBHOOK as string | undefined;

export type SheetDescriptionSync = {
  tab: "attended" | "unattended";
  sl_no: number | null;
  client: string | null;
  description: string;
};

export function syncDescriptionToSheet(payload: SheetDescriptionSync): void {
  if (!WEBHOOK) return;
  try {
    // no-cors + text/plain avoids a CORS preflight Apps Script can't answer.
    void fetch(WEBHOOK, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
  } catch {
    /* fire-and-forget */
  }
}
