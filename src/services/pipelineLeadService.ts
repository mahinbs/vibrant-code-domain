import { supabase } from "@/integrations/supabase/client";

export type PipelineTab = "attended" | "unattended";

export type PipelineAttachment = {
  name: string;
  path: string;
  url: string;
  type: string;
  size: number;
  uploaded_at: string;
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
  description: string | null;
  attachments: PipelineAttachment[] | null;
};

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

export const pipelineLeadService = {
  async list(): Promise<{ data: PipelineLead[]; error: string | null }> {
    const { data, error } = await table()
      .select("*")
      .order("tab", { ascending: true })
      .order("sl_no", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: true });
    if (error) return { data: [], error: error.message };
    return { data: (data ?? []) as PipelineLead[], error: null };
  },

  async create(input: Partial<PipelineLeadInput>): Promise<{ data: PipelineLead | null; error: string | null }> {
    const { data, error } = await table().insert(input).select().single();
    if (error) return { data: null, error: error.message };
    return { data: data as PipelineLead, error: null };
  },

  async update(id: string, patch: Partial<PipelineLeadInput>): Promise<{ error: string | null }> {
    const { error } = await table()
      .update({ ...patch, updated_at: new Date().toISOString() })
      .eq("id", id);
    return { error: error ? error.message : null };
  },

  async remove(id: string): Promise<{ error: string | null }> {
    const { error } = await table().delete().eq("id", id);
    return { error: error ? error.message : null };
  },

  /** Upload a follow-up PDF / image / screenshot for a lead. */
  async uploadAttachment(
    leadId: string,
    file: File,
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
      },
      error: null,
    };
  },

  async removeAttachment(path: string): Promise<{ error: string | null }> {
    const { error } = await storage().remove([path]);
    return { error: error ? error.message : null };
  },
};
