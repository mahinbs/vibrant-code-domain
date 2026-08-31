import { supabase } from "@/integrations/supabase/client";

export type PipelineTab = "attended" | "unattended";

export type PipelineAttachment = {
  name: string;
  path: string;
  url: string;
  type: string;
  size: number;
  uploaded_at: string;
  /** Who uploaded it — a team member name, or "AI" for agent-generated PDFs. */
  uploaded_by?: string | null;
};

export type PipelineLead = {
  id: string;
  created_at?: string;
  updated_at?: string;
  tab: PipelineTab;
  sl_no: number | null;
  client: string | null;
  industry: string | null;
  requirement: string | null;
  estimated_value: string | null;
  current_stage: string | null;
  next_step: string | null;
  expected_closure: string | null;
  technical_notes: string | null;
  business: string | null;
  status: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  description: string | null;
  /** Staged pipeline position: lead → pre_call → call → meeting → post_meeting → sale (or lost). */
  pipeline_stage: PipelineStage | null;
  /** When the lead entered its current stage (for stuck-too-long alerts). */
  stage_at: string | null;
  /** Full log of stage changes: when the lead entered each stage (and who moved it). */
  stage_history: StageEvent[] | null;
  /** Up to 30 numbered follow-up proofs (attachment + note/date/owner). */
  followups: FollowupProof[] | null;
  /** Point of contact (team member handling this lead). */
  poc: string | null;
  /** Scheduled meeting datetime (ISO / datetime-local string) + notes. */
  meeting_at: string | null;
  meeting_notes: string | null;
  /** Who takes / scheduled the meeting (may differ from the lead's POC). */
  meeting_owner: string | null;
  /** Manual responsiveness rating: 'hot' | 'warm' | 'cold' | 'useless' | null */
  responsiveness: string | null;
  attachments: PipelineAttachment[] | null;
};

/** One numbered follow-up proof: an attachment + note/date/owner. */
export type FollowupProof = {
  n: number;
  note: string | null;
  by: string | null;
  at: string;
  file: PipelineAttachment;
  /** Which pipeline phase this follow-up belongs to (pre-call target 3, post-meeting target 7). */
  phase?: "pre_call" | "post_meeting";
};

/* ---------- Staged pipeline ---------- */

export type PipelineStage = "lead" | "pre_call" | "call" | "meeting" | "post_meeting" | "sale" | "lost";

/** One entry in a lead's stage log: it entered `stage` at `at` (ISO), moved by `by`. */
export type StageEvent = { stage: PipelineStage; at: string; by?: string | null };

export type StageDef = {
  value: PipelineStage;
  label: string;
  short: string;
  icon: string;
  /** Follow-up target while in this stage (pre_call: 3, post_meeting: 7). */
  target?: number;
  /** Chip classes for badges. */
  chip: string;
  /** Solid dot / bar colour. */
  dot: string;
};

/** The ordered main path (lost is an off-ramp, not part of the path). */
export const PIPELINE_STAGES: StageDef[] = [
  { value: "lead", label: "Lead", short: "Lead", icon: "🟡", chip: "border-blue-400/40 bg-blue-400/10 text-blue-300", dot: "bg-blue-400" },
  { value: "pre_call", label: "Follow-ups before call", short: "Pre-call", icon: "🔁", target: 3, chip: "border-cyan-400/40 bg-cyan-400/10 text-cyan-300", dot: "bg-cyan-400" },
  { value: "call", label: "Call", short: "Call", icon: "📞", chip: "border-violet-400/40 bg-violet-400/10 text-violet-300", dot: "bg-violet-400" },
  { value: "meeting", label: "Meeting", short: "Meeting", icon: "📅", chip: "border-orange-400/40 bg-orange-400/10 text-orange-300", dot: "bg-orange-400" },
  { value: "post_meeting", label: "Follow-ups after meeting", short: "Post-meeting", icon: "🔂", target: 7, chip: "border-amber-400/40 bg-amber-400/10 text-amber-300", dot: "bg-amber-400" },
  { value: "sale", label: "Sale", short: "Sale", icon: "✅", chip: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300", dot: "bg-emerald-400" },
];

export const LOST_STAGE: StageDef = { value: "lost", label: "Lost", short: "Lost", icon: "✕", chip: "border-red-400/40 bg-red-400/10 text-red-300", dot: "bg-red-400" };

export function stageDef(v?: string | null): StageDef {
  if (v === "lost") return LOST_STAGE;
  return PIPELINE_STAGES.find((s) => s.value === v) ?? PIPELINE_STAGES[0];
}

export function stageIndex(v?: string | null): number {
  const i = PIPELINE_STAGES.findIndex((s) => s.value === v);
  return i === -1 ? 0 : i;
}

/** Count follow-ups for one phase. Untagged legacy entries count toward pre_call. */
export function followupCount(lead: Pick<PipelineLead, "followups">, phase: "pre_call" | "post_meeting"): number {
  return (lead.followups ?? []).filter((f) => (f.phase ?? "pre_call") === phase).length;
}

/** Days a lead may sit in each stage before it counts as "stuck". */
const STUCK_AFTER_DAYS: Partial<Record<PipelineStage, number>> = {
  lead: 3,
  pre_call: 5,
  call: 3,
  meeting: 5,
  post_meeting: 10,
};

/** Whole days the lead has been in its current stage, and whether that's too long. */
export function stageAge(lead: Pick<PipelineLead, "pipeline_stage" | "stage_at" | "updated_at" | "created_at">): { days: number; stuck: boolean } {
  const since = lead.stage_at || lead.updated_at || lead.created_at;
  if (!since) return { days: 0, stuck: false };
  const days = Math.floor((Date.now() - new Date(since).getTime()) / 86400000);
  const limit = STUCK_AFTER_DAYS[(lead.pipeline_stage as PipelineStage) ?? "lead"];
  return { days, stuck: limit != null && days > limit };
}

export type PipelineLeadInput = Omit<PipelineLead, "id" | "created_at" | "updated_at">;

const BUCKET = "pipeline-files";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const storage = () => (supabase as any).storage.from(BUCKET);

function sanitize(name: string): string {
  return name.replace(/[^\w.\-]+/g, "_").slice(-80);
}

// pipeline_leads isn't in the generated Database types.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const table = () => (supabase as any).from("pipeline_leads");

/** Turn raw Supabase / fetch errors into a friendly, actionable message. */
function friendlyError(raw?: string | null): string {
  const m = (raw || "").trim() || "Something went wrong. Please try again.";
  if (/load failed|failed to fetch|network\s?error|network request failed|typeerror/i.test(m)) {
    return "Couldn't reach the server — check your internet connection and try again.";
  }
  return m;
}

const asMessage = (e: unknown): string => (e instanceof Error ? e.message : String(e));

export const pipelineLeadService = {
  async list(): Promise<{ data: PipelineLead[]; error: string | null }> {
    try {
      const { data, error } = await table()
        .select("*")
        .order("created_at", { ascending: false, nullsFirst: false });
      if (error) return { data: [], error: friendlyError(error.message) };
      return { data: (data ?? []) as PipelineLead[], error: null };
    } catch (e) {
      return { data: [], error: friendlyError(asMessage(e)) };
    }
  },

  async create(input: Partial<PipelineLeadInput>): Promise<{ data: PipelineLead | null; error: string | null }> {
    try {
      const { data, error } = await table().insert(input).select().single();
      if (error) return { data: null, error: friendlyError(error.message) };
      return { data: data as PipelineLead, error: null };
    } catch (e) {
      return { data: null, error: friendlyError(asMessage(e)) };
    }
  },

  async update(id: string, patch: Partial<PipelineLeadInput>): Promise<{ error: string | null }> {
    try {
      const { error } = await table()
        .update({ ...patch, updated_at: new Date().toISOString() })
        .eq("id", id);
      return { error: error ? friendlyError(error.message) : null };
    } catch (e) {
      return { error: friendlyError(asMessage(e)) };
    }
  },

  async remove(id: string): Promise<{ error: string | null }> {
    try {
      const { error } = await table().delete().eq("id", id);
      return { error: error ? friendlyError(error.message) : null };
    } catch (e) {
      return { error: friendlyError(asMessage(e)) };
    }
  },

  /** Change a lead's pipeline stage: sets stage, stamps stage_at, appends to stage_history. */
  async changeStage(
    lead: Pick<PipelineLead, "id" | "stage_history" | "pipeline_stage" | "stage_at" | "created_at">,
    v: PipelineStage,
    by?: string | null,
  ): Promise<{ error: string | null }> {
    const { error } = await pipelineLeadService.update(lead.id, { pipeline_stage: v });
    if (error) return { error };
    const now = new Date().toISOString();
    // Seed an empty log with the stage being left so the change is undoable.
    const base: StageEvent[] = lead.stage_history?.length
      ? lead.stage_history
      : [{ stage: (lead.pipeline_stage as PipelineStage) ?? "lead", at: lead.stage_at ?? lead.created_at ?? now, by: null }];
    const history: StageEvent[] = [...base, { stage: v, at: now, by: by ?? null }];
    // Best-effort: history/timestamp columns may not exist until their SQL is run.
    try { await pipelineLeadService.update(lead.id, { stage_at: now, stage_history: history }); } catch { /* ignore */ }
    return { error: null };
  },

  /** Upload a follow-up PDF / image / screenshot for a lead. */
  async uploadAttachment(
    leadId: string,
    file: File,
    uploadedBy?: string,
  ): Promise<{ attachment: PipelineAttachment | null; error: string | null }> {
    const path = `${leadId}/${Date.now()}-${sanitize(file.name)}`;
    const { error } = await storage().upload(path, file, {
      upsert: false,
      contentType: file.type || "application/octet-stream",
    });
    if (error) {
      const msg = /bucket|not found|does not exist/i.test(error.message)
        ? "Storage isn't set up yet — create the 'pipeline-files' bucket (run the provided SQL)."
        : error.message;
      return { attachment: null, error: msg };
    }
    const { data } = storage().getPublicUrl(path);
    return {
      attachment: {
        name: file.name,
        path,
        url: data.publicUrl,
        type: file.type || "application/octet-stream",
        size: file.size,
        uploaded_at: new Date().toISOString(),
        uploaded_by: uploadedBy || null,
      },
      error: null,
    };
  },

  async removeAttachment(path: string): Promise<{ error: string | null }> {
    const { error } = await storage().remove([path]);
    return { error: error ? error.message : null };
  },
};
