import type {
  EmCampaign,
  EmDomain,
  EmEmailMessage,
  EmLead,
  EmOverviewStats,
  EmSendingIdentity,
  EmSequence,
  EmSequenceStep,
} from "./types";
import { emDb } from "./edgeFunctions";

export const emailMarketingService = {
  async listDomains(): Promise<EmDomain[]> {
    const { data, error } = await emDb.from("em_domains").select("*").order("created_at");
    if (error) throw error;
    return data ?? [];
  },

  async listSenders(domainId?: string): Promise<EmSendingIdentity[]> {
    let q = emDb.from("em_sending_identities").select("*").order("rotation_order");
    if (domainId) q = q.eq("domain_id", domainId);
    const { data, error } = await q;
    if (error) throw error;
    return data ?? [];
  },

  async getSettings(): Promise<Record<string, unknown>> {
    const { data, error } = await emDb.from("em_settings").select("key, value");
    if (error) throw error;
    const out: Record<string, unknown> = {};
    for (const row of data ?? []) out[row.key] = row.value;
    return out;
  },

  async listLeads(filters?: { pipeline?: string; status?: string }): Promise<EmLead[]> {
    let q = emDb.from("em_leads").select("*").order("created_at", { ascending: false });
    if (filters?.pipeline) q = q.eq("pipeline", filters.pipeline);
    if (filters?.status) q = q.eq("status", filters.status);
    const { data, error } = await q;
    if (error) throw error;
    return data ?? [];
  },

  async getLead(id: string): Promise<EmLead | null> {
    const { data, error } = await emDb.from("em_leads").select("*").eq("id", id).maybeSingle();
    if (error) throw error;
    return data;
  },

  async updateLead(id: string, patch: Partial<EmLead>): Promise<void> {
    const { error } = await emDb.from("em_leads").update({ ...patch, updated_at: new Date().toISOString() }).eq("id", id);
    if (error) throw error;
  },

  async getLeadMessages(leadId: string): Promise<EmEmailMessage[]> {
    const { data, error } = await emDb
      .from("em_email_messages")
      .select("*")
      .eq("lead_id", leadId)
      .order("created_at", { ascending: true });
    if (error) throw error;
    return data ?? [];
  },

  async getLeadEvents(leadId: string) {
    const { data, error } = await emDb
      .from("em_email_events")
      .select("*")
      .eq("lead_id", leadId)
      .order("occurred_at", { ascending: true });
    if (error) throw error;
    return data ?? [];
  },

  async markMessageRead(messageId: string): Promise<void> {
    await emDb.from("em_email_messages").update({ is_read: true }).eq("id", messageId);
  },

  async listOutboundMessages(limit = 100): Promise<EmEmailMessage[]> {
    const { data, error } = await emDb
      .from("em_email_messages")
      .select("*")
      .eq("direction", "outbound")
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data ?? [];
  },

  async listInboundMessages(unreadOnly = false): Promise<EmEmailMessage[]> {
    let q = emDb
      .from("em_email_messages")
      .select("*")
      .eq("direction", "inbound")
      .order("received_at", { ascending: false });
    if (unreadOnly) q = q.eq("is_read", false);
    const { data, error } = await q;
    if (error) throw error;
    return data ?? [];
  },

  async listCampaigns(): Promise<EmCampaign[]> {
    const { data, error } = await emDb.from("em_campaigns").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  },

  async getCampaign(id: string): Promise<EmCampaign | null> {
    const { data, error } = await emDb.from("em_campaigns").select("*").eq("id", id).maybeSingle();
    if (error) throw error;
    return data;
  },

  async createBlastCampaign(input: {
    name: string;
    subject: string;
    body_text: string;
    segment_filter: Record<string, unknown>;
  }): Promise<string> {
    const { data, error } = await emDb
      .from("em_campaigns")
      .insert({
        type: "blast",
        name: input.name,
        status: "draft",
        created_by: "human",
        subject: input.subject,
        body_text: input.body_text,
        body_html: input.body_text.replace(/\n/g, "<br>"),
        segment_filter: input.segment_filter,
      })
      .select("id")
      .single();
    if (error) throw error;
    return data.id;
  },

  async queueBlast(campaignId: string): Promise<number> {
    const campaign = await this.getCampaign(campaignId);
    if (!campaign) throw new Error("Campaign not found");

    const filter = campaign.segment_filter ?? {};
    let q = emDb.from("em_leads").select("id, email, status, pipeline");
    if (filter.pipeline) q = q.eq("pipeline", filter.pipeline);
    if (filter.status) q = q.eq("status", filter.status);

    const { data: leads, error } = await q;
    if (error) throw error;

    let queued = 0;
    for (const lead of leads ?? []) {
      const { data: unsub } = await emDb
        .from("em_unsubscribes")
        .select("id")
        .ilike("email", lead.email)
        .maybeSingle();
      if (unsub) continue;

      const { error: sendErr } = await emDb.from("em_email_sends").insert({
        lead_id: lead.id,
        campaign_id: campaignId,
        subject: campaign.subject,
        to_email: lead.email,
        status: "queued",
      });
      if (!sendErr) {
        await emDb.from("em_email_messages").insert({
          lead_id: lead.id,
          direction: "outbound",
          from_email: "queued@system",
          to_email: lead.email,
          subject: campaign.subject ?? "",
          body_text: campaign.body_text,
          body_html: campaign.body_html,
        });
        queued++;
      }
    }

    await emDb.from("em_campaigns").update({ status: "sending" }).eq("id", campaignId);
    return queued;
  },

  async getCampaignSends(campaignId: string) {
    const { data, error } = await emDb
      .from("em_email_sends")
      .select("*, em_leads(name, email)")
      .eq("campaign_id", campaignId)
      .order("queued_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  },

  async listSequences(): Promise<EmSequence[]> {
    const { data, error } = await emDb.from("em_sequences").select("*").order("created_at");
    if (error) throw error;
    return data ?? [];
  },

  async getSequenceSteps(sequenceId: string): Promise<EmSequenceStep[]> {
    const { data, error } = await emDb
      .from("em_sequence_steps")
      .select("*")
      .eq("sequence_id", sequenceId)
      .order("step_order");
    if (error) throw error;
    return data ?? [];
  },

  async updateSequenceStep(stepId: string, patch: Partial<EmSequenceStep>): Promise<void> {
    const { error } = await emDb.from("em_sequence_steps").update(patch).eq("id", stepId);
    if (error) throw error;
  },

  async importLeadsCsv(
    rows: { email: string; name?: string; company?: string; role?: string }[],
    pipeline: "cold" | "blast_only" = "cold",
  ): Promise<number> {
    let imported = 0;
    for (const row of rows) {
      if (!row.email?.trim()) continue;
      const { data: lead, error } = await emDb
        .from("em_leads")
        .insert({
          email: row.email.trim().toLowerCase(),
          name: row.name,
          company: row.company,
          role: row.role,
          source: "csv_import",
          pipeline,
          status: "new",
        })
        .select("id")
        .single();
      if (error) {
        if (error.code === "23505") continue;
        throw error;
      }
      if (pipeline === "cold" && lead) {
        const { data: seq } = await emDb
          .from("em_sequences")
          .select("id")
          .eq("pipeline", "cold")
          .eq("is_default", true)
          .maybeSingle();
        if (seq) {
          await emDb.from("em_sequence_enrollments").insert({
            lead_id: lead.id,
            sequence_id: seq.id,
            current_step: 0,
            status: "active",
            next_send_at: new Date().toISOString(),
          });
        }
      }
      imported++;
    }
    return imported;
  },

  async getOverviewStats(): Promise<EmOverviewStats> {
    const today = new Date().toISOString().slice(0, 10);
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const [settings, sentTodayRes, weekEvents, unreadRes, activeSeq, pendingRes, domainRes] =
      await Promise.all([
        this.getSettings(),
        emDb.from("em_email_sends").select("*", { count: "exact", head: true })
          .gte("sent_at", `${today}T00:00:00`).eq("status", "sent"),
        emDb.from("em_email_events").select("event_type").gte("occurred_at", weekAgo),
        emDb.from("em_email_messages").select("*", { count: "exact", head: true })
          .eq("direction", "inbound").eq("is_read", false),
        emDb.from("em_sequence_enrollments").select("*", { count: "exact", head: true })
          .eq("status", "active"),
        emDb.from("em_sequence_enrollments").select("*", { count: "exact", head: true })
          .eq("status", "active").lte("next_send_at", new Date().toISOString()),
        emDb.from("em_domains").select("status").eq("is_primary", true).maybeSingle(),
      ]);

    const events = weekEvents.data ?? [];
    const sent = events.filter((e: { event_type: string }) => e.event_type === "sent").length || 1;
    const opened = events.filter((e: { event_type: string }) => e.event_type === "opened").length;
    const replied = events.filter((e: { event_type: string }) => e.event_type === "replied").length;
    const bounced = events.filter((e: { event_type: string }) => e.event_type === "bounced").length;

    return {
      sentToday: sentTodayRes.count ?? 0,
      dailyCap: Number(settings.global_daily_cap ?? 40),
      openRate: Math.round((opened / sent) * 100),
      replyRate: Math.round((replied / sent) * 100),
      bounceRate: Math.round((bounced / sent) * 100),
      unreadReplies: unreadRes.count ?? 0,
      activeSequences: activeSeq.count ?? 0,
      pendingFollowups: pendingRes.count ?? 0,
      domainStatus: domainRes.data?.status ?? "not_configured",
    };
  },
};
