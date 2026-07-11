import type {
  EmCampaign,
  EmCaseStudyOption,
  EmDomain,
  EmEmailMessage,
  EmLead,
  EmOverviewStats,
  EmSendingIdentity,
  EmSequence,
  EmSequenceEnrollment,
  EmSequenceStep,
  EmSequenceStepStats,
  EmSequenceTemplate,
} from "./types";
import {
  COLD_OUTREACH_12_MONTH_DESCRIPTION,
  COLD_OUTREACH_12_MONTH_NAME,
  getColdOutreach12MonthSteps,
} from "./coldOutreach12MonthTemplate";
import { isBranchesMigrationMissing } from "./emErrors";
import { emDb } from "./edgeFunctions";
import { automationCaseStudies, caseStudyPath } from "@/redesign/data/automationCaseStudies";
import {
  effectiveMessageAt,
  filterThreadMessages,
  sortMessagesChronologically,
  stripQuotedReplyBody,
} from "@/lib/emailBody";

export type EmReplyConversation = {
  key: string;
  lead_id: string | null;
  lead_name: string | null;
  from_email: string;
  latest_subject: string;
  latest_preview: string;
  latest_at: string;
  unread_count: number;
  messages: EmEmailMessage[];
};

export { stripQuotedReplyBody, sortMessagesChronologically, filterThreadMessages, effectiveMessageAt };

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
      .eq("lead_id", leadId);
    if (error) throw error;
    const rows = data ?? [];
    return sortMessagesChronologically(filterThreadMessages(rows));
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
      .limit(limit);
    if (error) throw error;
    return sortMessagesChronologically(filterThreadMessages(data ?? [])).reverse();
  },

  async listInboundMessages(unreadOnly = false): Promise<EmEmailMessage[]> {
    let q = emDb.from("em_email_messages").select("*").eq("direction", "inbound");
    if (unreadOnly) q = q.eq("is_read", false);
    const { data, error } = await q;
    if (error) throw error;
    return sortMessagesChronologically(data ?? []).reverse();
  },

  async listReplyConversations(): Promise<EmReplyConversation[]> {
    const inbound = await this.listInboundMessages();
    const leadIds = [...new Set(inbound.map((m) => m.lead_id).filter(Boolean))] as string[];
    const leadMap = new Map<string, EmLead>();
    if (leadIds.length) {
      const { data: leads } = await emDb.from("em_leads").select("id, name, email").in("id", leadIds);
      for (const l of leads ?? []) leadMap.set(l.id, l as EmLead);
    }

    const groups = new Map<string, EmEmailMessage[]>();
    for (const msg of inbound) {
      const key = msg.lead_id ?? `email:${msg.from_email.toLowerCase()}`;
      const list = groups.get(key) ?? [];
      list.push(msg);
      groups.set(key, list);
    }

    const conversations: EmReplyConversation[] = [];
    for (const [key, messages] of groups) {
      const sorted = sortMessagesChronologically(messages);
      const latest = sorted[sorted.length - 1];
      const lead = latest.lead_id ? leadMap.get(latest.lead_id) : null;
      const { preview } = stripQuotedReplyBody(latest.body_text ?? "");
      conversations.push({
        key,
        lead_id: latest.lead_id,
        lead_name: lead?.name ?? null,
        from_email: latest.from_email,
        latest_subject: latest.subject,
        latest_preview: preview,
        latest_at: latest.received_at ?? latest.created_at,
        unread_count: messages.filter((m) => !m.is_read).length,
        messages: sorted.slice(-5),
      });
    }

    return conversations.sort(
      (a, b) => new Date(b.latest_at).getTime() - new Date(a.latest_at).getTime(),
    );
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

      const { data: sendRow, error: sendErr } = await emDb.from("em_email_sends").insert({
        lead_id: lead.id,
        campaign_id: campaignId,
        subject: campaign.subject,
        to_email: lead.email,
        status: "queued",
      }).select("id").single();
      if (!sendErr && sendRow) {
        await emDb.from("em_email_messages").insert({
          lead_id: lead.id,
          send_id: sendRow.id,
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

  async listSequences(filters?: { pipeline?: string; is_active?: boolean }): Promise<EmSequence[]> {
    let q = emDb.from("em_sequences").select("*").order("created_at");
    if (filters?.pipeline) q = q.eq("pipeline", filters.pipeline);
    if (filters?.is_active !== undefined) q = q.eq("is_active", filters.is_active);
    const { data, error } = await q;
    if (error) throw error;
    return data ?? [];
  },

  async getSequence(id: string): Promise<EmSequence | null> {
    const { data, error } = await emDb.from("em_sequences").select("*").eq("id", id).maybeSingle();
    if (error) throw error;
    return data;
  },

  async createSequence(input: {
    name: string;
    pipeline: "cold" | "inbound";
    description?: string;
    vertical?: string;
  }): Promise<string> {
    const { data, error } = await emDb
      .from("em_sequences")
      .insert({
        name: input.name,
        pipeline: input.pipeline,
        description: input.description ?? null,
        vertical: input.vertical ?? null,
        is_default: false,
        is_active: true,
      })
      .select("id")
      .single();
    if (error) throw error;

    await emDb.from("em_sequence_steps").insert({
      sequence_id: data.id,
      step_order: 1,
      delay_days: 0,
      step_type: "template",
      condition: "always",
      subject_template: "",
      body_template: "",
    });

    return data.id;
  },

  async duplicateSequence(id: string): Promise<string> {
    const seq = await this.getSequence(id);
    if (!seq) throw new Error("Sequence not found");
    const steps = await this.getSequenceSteps(id);

    const { data: newSeq, error } = await emDb
      .from("em_sequences")
      .insert({
        name: `${seq.name} (copy)`,
        pipeline: seq.pipeline,
        description: seq.description,
        vertical: seq.vertical,
        is_default: false,
        is_active: true,
        cloned_from_id: id,
        settings: seq.settings,
      })
      .select("id")
      .single();
    if (error) throw error;

    if (steps.length > 0) {
      const { error: stepsErr } = await emDb.from("em_sequence_steps").insert(
        steps.map((s) => ({
          sequence_id: newSeq.id,
          step_order: s.step_order,
          delay_days: s.delay_days,
          delay_hours: s.delay_hours ?? 0,
          subject_template: s.subject_template,
          body_template: s.body_template,
          ai_generated: s.ai_generated,
          condition: s.condition,
          step_type: s.step_type ?? (s.ai_generated ? "ai_draft" : "template"),
          ai_angle: s.ai_angle,
          ai_instructions: s.ai_instructions,
          case_study_slug: s.case_study_slug,
          case_study_url: s.case_study_url,
          case_study_mode: s.case_study_mode ?? "fixed",
          intro_template: s.intro_template,
          branch_lane: s.branch_lane ?? "main",
          branch_after_step_order: s.branch_after_step_order,
          metadata: s.metadata ?? {},
        })),
      );
      if (stepsErr) throw stepsErr;
    }

    return newSeq.id;
  },

  async updateSequence(id: string, patch: Partial<EmSequence>): Promise<void> {
    const { id: _id, created_at: _c, ...rest } = patch as EmSequence & { id?: string };
    if (patch.is_default === true) {
      const seq = await this.getSequence(id);
      if (seq) {
        await emDb
          .from("em_sequences")
          .update({ is_default: false })
          .eq("pipeline", seq.pipeline)
          .neq("id", id);
      }
    }
    const { error } = await emDb.from("em_sequences").update(rest).eq("id", id);
    if (error) throw error;
  },

  async deleteSequence(id: string): Promise<void> {
    const { count, error: countErr } = await emDb
      .from("em_sequence_enrollments")
      .select("*", { count: "exact", head: true })
      .eq("sequence_id", id)
      .eq("status", "active");
    if (countErr) throw countErr;
    if ((count ?? 0) > 0) throw new Error("Cannot delete sequence with active enrollments");

    const { error } = await emDb.from("em_sequences").delete().eq("id", id);
    if (error) throw error;
  },

  async getSequenceSteps(sequenceId: string): Promise<EmSequenceStep[]> {
    const { data, error } = await emDb
      .from("em_sequence_steps")
      .select("*")
      .eq("sequence_id", sequenceId)
      .order("step_order");
    if (error) throw error;
    const laneOrder: Record<string, number> = { opened: 0, main: 1, not_opened: 2 };
    return (data ?? []).sort((a, b) => {
      if (a.step_order !== b.step_order) return a.step_order - b.step_order;
      return (laneOrder[a.branch_lane ?? "main"] ?? 9) - (laneOrder[b.branch_lane ?? "main"] ?? 9);
    });
  },

  async checkBranchesMigrationReady(): Promise<boolean> {
    const { error } = await emDb.from("em_sequence_steps").select("branch_lane").limit(1);
    if (!error) return true;
    return !isBranchesMigrationMissing(error);
  },

  async installColdOutreach12MonthTemplate(): Promise<string> {
    const ready = await this.checkBranchesMigrationReady();
    if (!ready) {
      throw new Error(
        "Run migration 20260711120000_sequence_branches.sql in Supabase SQL editor before installing this template.",
      );
    }

    const { data: existing } = await emDb
      .from("em_sequences")
      .select("id")
      .eq("name", COLD_OUTREACH_12_MONTH_NAME)
      .maybeSingle();
    if (existing) return existing.id;

    const { data: seq, error: seqErr } = await emDb
      .from("em_sequences")
      .insert({
        name: COLD_OUTREACH_12_MONTH_NAME,
        pipeline: "cold",
        description: COLD_OUTREACH_12_MONTH_DESCRIPTION,
        vertical: "automation",
        is_default: false,
        is_active: true,
      })
      .select("id")
      .single();
    if (seqErr) throw seqErr;

    const rows = getColdOutreach12MonthSteps().map((s) => ({
      sequence_id: seq.id,
      step_order: s.step_order,
      branch_lane: s.branch_lane,
      branch_after_step_order: s.branch_after_step_order ?? null,
      delay_days: s.delay_days,
      delay_hours: 0,
      condition: s.condition,
      step_type: s.step_type,
      ai_angle: s.ai_angle ?? null,
      ai_instructions: s.ai_instructions ?? null,
      subject_template: s.subject_template,
      body_template: s.body_template,
      case_study_mode: s.case_study_mode ?? "fixed",
      ai_generated: s.ai_generated ?? (s.step_type === "ai_draft" || s.step_type === "hybrid"),
    }));

    const { error: stepsErr } = await emDb.from("em_sequence_steps").insert(rows);
    if (stepsErr) throw stepsErr;
    return seq.id;
  },

  hasOpenBranchAfter(steps: EmSequenceStep[], afterStepOrder: number): boolean {
    return steps.some(
      (s) => s.step_order === afterStepOrder + 1 && s.branch_lane !== "main",
    );
  },

  async createOpenBranch(sequenceId: string, afterStepOrder: number): Promise<void> {
    const steps = await this.getSequenceSteps(sequenceId);
    if (this.hasOpenBranchAfter(steps, afterStepOrder)) {
      throw new Error("Open branch already exists after this step");
    }

    const branchOrder = afterStepOrder + 1;
    for (const s of [...steps].sort((a, b) => b.step_order - a.step_order)) {
      if (s.step_order >= branchOrder) {
        await emDb
          .from("em_sequence_steps")
          .update({ step_order: s.step_order + 1 })
          .eq("id", s.id);
      }
    }

    const { error } = await emDb.from("em_sequence_steps").insert([
      {
        sequence_id: sequenceId,
        step_order: branchOrder,
        branch_lane: "opened",
        branch_after_step_order: afterStepOrder,
        delay_days: 3,
        step_type: "case_study",
        condition: "opened_not_replied",
        subject_template: "Case study for {{company}}",
        body_template: "",
        case_study_mode: "auto_industry",
      },
      {
        sequence_id: sequenceId,
        step_order: branchOrder,
        branch_lane: "not_opened",
        branch_after_step_order: afterStepOrder,
        delay_days: 3,
        step_type: "template",
        condition: "no_open",
        subject_template: "Re: quick question",
        body_template: "Bumping this — still relevant?",
      },
    ]);
    if (error) throw error;
  },

  async updateSequenceStep(stepId: string, patch: Partial<EmSequenceStep>): Promise<void> {
    const normalized = { ...patch };
    if (patch.step_type) {
      normalized.ai_generated = patch.step_type === "ai_draft" || patch.step_type === "hybrid";
    }
    const { error } = await emDb.from("em_sequence_steps").update(normalized).eq("id", stepId);
    if (error) throw error;
    if (patch.ai_instructions !== undefined || patch.ai_angle !== undefined || patch.step_type !== undefined) {
      await emDb.from("em_ai_draft_cache").delete().eq("step_id", stepId);
    }
  },

  async createSequenceStep(sequenceId: string, afterOrder?: number): Promise<string> {
    const steps = await this.getSequenceSteps(sequenceId);
    const newOrder = afterOrder != null ? afterOrder + 1 : steps.length + 1;

    for (const s of [...steps].sort((a, b) => b.step_order - a.step_order)) {
      if (s.step_order >= newOrder) {
        await emDb
          .from("em_sequence_steps")
          .update({ step_order: s.step_order + 1 })
          .eq("id", s.id);
      }
    }

    const { data, error } = await emDb
      .from("em_sequence_steps")
      .insert({
        sequence_id: sequenceId,
        step_order: newOrder,
        branch_lane: "main",
        delay_days: 3,
        step_type: "template",
        condition: "no_reply",
        subject_template: "",
        body_template: "",
      })
      .select("id")
      .single();
    if (error) throw error;
    return data.id;
  },

  async deleteSequenceStep(stepId: string): Promise<void> {
    const { data: step, error: fetchErr } = await emDb
      .from("em_sequence_steps")
      .select("sequence_id, step_order")
      .eq("id", stepId)
      .single();
    if (fetchErr) throw fetchErr;

    const { error } = await emDb.from("em_sequence_steps").delete().eq("id", stepId);
    if (error) throw error;

    const steps = await this.getSequenceSteps(step.sequence_id);
    for (const s of steps) {
      if (s.step_order > step.step_order) {
        await emDb.from("em_sequence_steps").update({ step_order: s.step_order - 1 }).eq("id", s.id);
      }
    }
  },

  async reorderSequenceSteps(sequenceId: string, orderedStepIds: string[]): Promise<void> {
    for (let i = 0; i < orderedStepIds.length; i++) {
      await emDb
        .from("em_sequence_steps")
        .update({ step_order: 1000 + i })
        .eq("id", orderedStepIds[i])
        .eq("sequence_id", sequenceId);
    }
    for (let i = 0; i < orderedStepIds.length; i++) {
      await emDb
        .from("em_sequence_steps")
        .update({ step_order: i + 1 })
        .eq("id", orderedStepIds[i]);
    }
  },

  async getSequenceEnrollmentCount(sequenceId: string): Promise<number> {
    const { count, error } = await emDb
      .from("em_sequence_enrollments")
      .select("*", { count: "exact", head: true })
      .eq("sequence_id", sequenceId)
      .eq("status", "active");
    if (error) throw error;
    return count ?? 0;
  },

  async getLeadEnrollment(leadId: string): Promise<EmSequenceEnrollment | null> {
    const { data, error } = await emDb
      .from("em_sequence_enrollments")
      .select("*, em_sequences(*)")
      .eq("lead_id", leadId)
      .in("status", ["active", "paused"])
      .order("enrolled_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async enrollLead(leadId: string, sequenceId: string): Promise<void> {
    const seq = await this.getSequence(sequenceId);
    if (!seq) throw new Error("Sequence not found");
    if (!seq.is_active) throw new Error("Sequence is not active");

    const { data: activeEnrollments } = await emDb
      .from("em_sequence_enrollments")
      .select("id, em_sequences(pipeline)")
      .eq("lead_id", leadId)
      .eq("status", "active");

    for (const en of activeEnrollments ?? []) {
      const enPipeline = (en.em_sequences as { pipeline?: string } | null)?.pipeline;
      if (enPipeline === seq.pipeline) {
        await emDb
          .from("em_sequence_enrollments")
          .update({ status: "stopped", stopped_reason: "manual" })
          .eq("id", en.id);
      }
    }

    const { error } = await emDb.from("em_sequence_enrollments").insert({
      lead_id: leadId,
      sequence_id: sequenceId,
      current_step: 0,
      status: "active",
      next_send_at: new Date().toISOString(),
    });
    if (error) {
      if (error.code === "23505") {
        await emDb
          .from("em_sequence_enrollments")
          .update({
            current_step: 0,
            status: "active",
            next_send_at: new Date().toISOString(),
            stopped_reason: null,
          })
          .eq("lead_id", leadId)
          .eq("sequence_id", sequenceId);
        return;
      }
      throw error;
    }
  },

  async pauseEnrollment(enrollmentId: string): Promise<void> {
    const { error } = await emDb
      .from("em_sequence_enrollments")
      .update({ status: "paused" })
      .eq("id", enrollmentId);
    if (error) throw error;
  },

  async resumeEnrollment(enrollmentId: string): Promise<void> {
    const { error } = await emDb
      .from("em_sequence_enrollments")
      .update({
        status: "active",
        next_send_at: new Date().toISOString(),
      })
      .eq("id", enrollmentId);
    if (error) throw error;
  },

  async removeEnrollment(enrollmentId: string): Promise<void> {
    const { error } = await emDb
      .from("em_sequence_enrollments")
      .update({ status: "stopped", stopped_reason: "manual" })
      .eq("id", enrollmentId);
    if (error) throw error;
  },

  async bulkEnrollLeads(leadIds: string[], sequenceId: string): Promise<number> {
    let enrolled = 0;
    for (const leadId of leadIds) {
      try {
        await this.enrollLead(leadId, sequenceId);
        enrolled++;
      } catch {
        /* skip failed */
      }
    }
    return enrolled;
  },

  listCaseStudies(): EmCaseStudyOption[] {
    return automationCaseStudies.map((c) => ({
      slug: c.slug,
      category: c.category,
      title: c.title,
      hook: c.hook,
      path: caseStudyPath(c.slug),
    }));
  },

  async listSequenceTemplates(): Promise<EmSequenceTemplate[]> {
    const { data, error } = await emDb
      .from("em_sequence_templates")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  },

  async getSequenceStepStats(sequenceId: string): Promise<EmSequenceStepStats[]> {
    const steps = await this.getSequenceSteps(sequenceId);
    const stats: EmSequenceStepStats[] = [];

    for (const step of steps) {
      const { data: sends } = await emDb
        .from("em_email_sends")
        .select("id")
        .eq("step_id", step.id)
        .eq("status", "sent");

      const sendIds = (sends ?? []).map((s: { id: string }) => s.id);
      let opened = 0;
      let replied = 0;

      if (sendIds.length > 0) {
        const { data: events } = await emDb
          .from("em_email_events")
          .select("event_type, send_id")
          .in("send_id", sendIds);

        const openedSends = new Set<string>();
        const repliedSends = new Set<string>();
        for (const ev of events ?? []) {
          if (ev.event_type === "opened") openedSends.add(ev.send_id);
          if (ev.event_type === "replied") repliedSends.add(ev.send_id);
        }
        opened = openedSends.size;
        replied = repliedSends.size;
      }

      stats.push({
        step_id: step.id,
        step_order: step.step_order,
        sent: sendIds.length,
        opened,
        replied,
      });
    }

    return stats;
  },

  async importLeadsCsv(
    rows: { email: string; name?: string; company?: string; role?: string }[],
    options: { pipeline?: "cold" | "blast_only"; sequenceId?: string } = {},
  ): Promise<number> {
    const pipeline = options.pipeline ?? "cold";
    let sequenceId = options.sequenceId;

    if (pipeline === "cold" && !sequenceId) {
      const { data: seq } = await emDb
        .from("em_sequences")
        .select("id")
        .eq("pipeline", "cold")
        .eq("is_default", true)
        .maybeSingle();
      sequenceId = seq?.id;
    }

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
      if (pipeline === "cold" && lead && sequenceId) {
        await this.enrollLead(lead.id, sequenceId);
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
