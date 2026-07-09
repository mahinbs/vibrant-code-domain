import { supabase } from "@/integrations/supabase/client";

const SUPABASE_URL = "https://upxsbhsamorhvnfebvor.supabase.co";

async function invokeEdge<T>(name: string, body: Record<string, unknown>): Promise<T> {
  const { data: sessionData } = await supabase.auth.getSession();
  const token = sessionData.session?.access_token;
  const res = await fetch(`${SUPABASE_URL}/functions/v1/${name}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token ?? import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok || json.ok === false) {
    throw new Error(json.error ?? `Edge function ${name} failed`);
  }
  return json as T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

export const emailMarketingEdge = {
  addDomain: (domain: string, is_primary?: boolean) =>
    invokeEdge<{ domain: unknown }>("em-manage-domain", { action: "add_domain", domain, is_primary }),
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
  triggerCheckReplies: () => invokeEdge<{ processed: number }>("em-check-replies", {}),
};

export { db as emDb };
