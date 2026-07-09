import { createSupabaseAdmin, getSetting } from "./util.ts";

const RESEND_API = "https://api.resend.com";

export function getResendKey(): string {
  const key = Deno.env.get("RESEND_API_KEY");
  if (!key) throw new Error("RESEND_API_KEY not configured");
  return key;
}

export async function resendFetch(path: string, options: RequestInit = {}): Promise<Response> {
  return fetch(`${RESEND_API}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${getResendKey()}`,
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string> ?? {}),
    },
  });
}

export type ResendDomainRecord = {
  record: string;
  name: string;
  type: string;
  value: string;
  priority?: number;
  status?: string;
};

export async function createResendDomain(domain: string) {
  const res = await resendFetch("/domains", {
    method: "POST",
    body: JSON.stringify({ name: domain }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? data.error ?? "Failed to create domain");
  return data as { id: string; name: string; records?: ResendDomainRecord[]; status?: string };
}

export async function verifyResendDomain(resendDomainId: string) {
  const res = await resendFetch(`/domains/${resendDomainId}/verify`, { method: "POST" });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? data.error ?? "Failed to verify domain");
  return data;
}

export async function getResendDomain(resendDomainId: string) {
  const res = await resendFetch(`/domains/${resendDomainId}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? data.error ?? "Failed to get domain");
  return data as {
    id: string;
    name: string;
    status: string;
    records?: ResendDomainRecord[];
  };
}

export type SendEmailParams = {
  from: string;
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  tags?: { name: string; value: string }[];
};

export async function sendViaResend(params: SendEmailParams): Promise<{ id: string }> {
  const res = await resendFetch("/emails", {
    method: "POST",
    body: JSON.stringify({
      from: params.from,
      to: [params.to],
      subject: params.subject,
      html: params.html,
      text: params.text,
      reply_to: params.replyTo,
      tags: params.tags,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? data.error ?? "Failed to send email");
  return data as { id: string };
}

export async function pickSendingIdentity(): Promise<{
  id: string;
  email: string;
  display_name: string;
} | null> {
  const supabase = createSupabaseAdmin();
  await supabase.rpc("em_reset_sender_daily_counts");

  const globalCap = Number(await getSetting(supabase, "global_daily_cap", 40));
  const { count: sentToday } = await supabase
    .from("em_email_sends")
    .select("*", { count: "exact", head: true })
    .gte("sent_at", new Date().toISOString().slice(0, 10));

  if ((sentToday ?? 0) >= globalCap) return null;

  const { data: identities } = await supabase
    .from("em_sending_identities")
    .select("id, email, display_name, daily_cap, sent_today, warmup_status")
    .eq("is_active", true)
    .order("rotation_order", { ascending: true });

  if (!identities?.length) return null;

  for (const id of identities) {
    if (id.sent_today < id.daily_cap && id.warmup_status !== "paused") {
      return { id: id.id, email: id.email, display_name: id.display_name };
    }
  }
  return null;
}

export async function incrementSenderCount(identityId: string): Promise<void> {
  const supabase = createSupabaseAdmin();
  const { data } = await supabase
    .from("em_sending_identities")
    .select("sent_today")
    .eq("id", identityId)
    .single();
  await supabase
    .from("em_sending_identities")
    .update({
      sent_today: (data?.sent_today ?? 0) + 1,
      last_sent_at: new Date().toISOString(),
    })
    .eq("id", identityId);
}

export async function getEffectiveDailyCap(): Promise<number> {
  const supabase = createSupabaseAdmin();
  const warmupEnabled = await getSetting(supabase, "warmup_enabled", true);
  if (!warmupEnabled) {
    return Number(await getSetting(supabase, "global_daily_cap", 40));
  }
  const schedule = (await getSetting(supabase, "warmup_schedule", [10, 20, 30, 40])) as number[];
  const { data: domain } = await supabase
    .from("em_domains")
    .select("warmup_started_at")
    .eq("is_primary", true)
    .maybeSingle();
  if (!domain?.warmup_started_at) return schedule[0] ?? 10;
  const days = Math.floor(
    (Date.now() - new Date(domain.warmup_started_at).getTime()) / (1000 * 60 * 60 * 24),
  );
  const week = Math.min(Math.floor(days / 7), schedule.length - 1);
  return schedule[week] ?? schedule[schedule.length - 1];
}
