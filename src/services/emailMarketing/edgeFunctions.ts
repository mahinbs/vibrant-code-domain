import { supabase } from "@/integrations/supabase/client";

const SUPABASE_URL = "https://upxsbhsamorhvnfebvor.supabase.co";
const EDGE_TIMEOUT_MS = 60_000;

async function invokeEdge<T>(name: string, body: Record<string, unknown>): Promise<T> {
  const { data: sessionData } = await supabase.auth.getSession();
  const token = sessionData.session?.access_token;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), EDGE_TIMEOUT_MS);

  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/${name}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ?? import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    const text = await res.text();
    let json: Record<string, unknown> = {};
    try {
      json = text ? (JSON.parse(text) as Record<string, unknown>) : {};
    } catch {
      throw new Error(
        res.status === 504
          ? `${name} timed out — IMAP is slow, try again in a few seconds`
          : `${name} returned invalid response (${res.status}): ${text.slice(0, 120)}`,
      );
    }

    if (!res.ok || json.ok === false) {
      const errMsg = String(json.error ?? `${name} failed (HTTP ${res.status})`);
      throw new Error(errMsg);
    }
    return json as T;
  } catch (e) {
    if (e instanceof Error) {
      if (e.name === "AbortError") {
        throw new Error(`${name} timed out after ${EDGE_TIMEOUT_MS / 1000}s — try again`);
      }
      if (e.message === "Failed to fetch" || e.message.includes("NetworkError")) {
        throw new Error(
          `${name} could not reach the server — check your connection and try again in a few seconds`,
        );
      }
    }
    throw e;
  } finally {
    clearTimeout(timer);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

export const emailMarketingEdge = {
  addDomain: (domain: string, is_primary?: boolean) =>
    invokeEdge<{ domain: unknown }>("em-manage-domain", { action: "add_domain", domain, is_primary }),
  linkDomain: (domain: string, is_primary?: boolean) =>
    invokeEdge<{ domain: unknown }>("em-manage-domain", { action: "link_domain", domain, is_primary }),
  verifyDomain: (domain_id: string) =>
    invokeEdge<{ domain: unknown }>("em-manage-domain", { action: "verify_domain", domain_id }),
  refreshDomain: (domain_id: string) =>
    invokeEdge<{ domain: unknown }>("em-manage-domain", { action: "refresh_domain", domain_id }),
  addSender: (domain_id: string, local_part: string, display_name?: string, daily_cap?: number) =>
    invokeEdge<{ sender: unknown }>("em-manage-domain", {
      action: "add_sender",
      domain_id,
      local_part,
      display_name,
      daily_cap,
    }),
  sendTest: (sender_id: string, to_email: string) =>
    invokeEdge<{ message_id: string }>("em-manage-domain", { action: "send_test", sender_id, to_email }),
  updateSettings: (settings: Record<string, unknown>) =>
    invokeEdge<{ ok: boolean }>("em-manage-domain", { action: "update_settings", settings }),
  markLeadReplied: (lead_id: string, subject?: string, body_text?: string) =>
    invokeEdge<{ ok: boolean; processed?: boolean }>("em-manage-domain", {
      action: "mark_replied",
      lead_id,
      subject,
      body_text,
    }),
  syncInboundLeads: (reshab_lead_id?: string) =>
    invokeEdge<{ synced: number }>("em-sync-inbound-lead", { reshab_lead_id }),
  researchCompany: (params: { company_id?: string; lead_id?: string }) =>
    invokeEdge<{ company: unknown }>("em-research-company", params),
  triggerSendQueue: () => invokeEdge<{ sent: number }>("em-send-queue", {}),
  triggerProcessSequences: () => invokeEdge<{ processed: number }>("em-process-sequences", {}),
  previewDraft: (params: {
    step_id?: string;
    sequence_id?: string;
    step_order?: number;
    sample_lead?: Record<string, unknown>;
  }) =>
    invokeEdge<{ subject: string; body: string }>("em-draft-email", {
      ...params,
      preview: true,
    }),
  bustDraftCache: (step_id: string) =>
    invokeEdge<{ ok: boolean }>("em-draft-email", { action: "bust_cache", step_id }),
  sendReply: (params: {
    lead_id: string;
    body_text: string;
    subject?: string;
    in_reply_to_message_id?: string;
  }) => invokeEdge<{ ok: boolean; message_id: string }>("em-send-reply", params),
  draftReply: (lead_id: string) =>
    invokeEdge<{ subject: string; body: string }>("em-draft-reply", { lead_id }),
  triggerCheckReplies: () =>
    invokeEdge<{ processed: number; skipped?: number; imap_not_configured?: boolean; reason?: string }>(
      "em-check-replies",
      {},
    ),
};

export { db as emDb };
