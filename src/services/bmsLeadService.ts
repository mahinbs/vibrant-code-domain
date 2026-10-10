import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

/** Row in `bms_leads` (Boostmysites-owned pages: homepage, command-center, course…). */
export type BmsLeadRow = {
  id: string;
  created_at: string;
  source_page: string;
  submission_type: string;
  lead_score: number;
  lead_tier: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  payload: Json;
};

export type ListBmsLeadsResult = {
  data: BmsLeadRow[];
  error: string | null;
};

export const bmsLeadService = {
  /** All leads, newest first; pass `sourcePage` to limit to one landing page. */
  async listLeads(sourcePage?: string): Promise<ListBmsLeadsResult> {
    // bms_leads isn't in the generated Database types.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query = (supabase as any).from("bms_leads").select("*").order("created_at", { ascending: false });
    if (sourcePage) query = query.eq("source_page", sourcePage);
    const { data, error } = await query;

    if (error) {
      console.error("bmsLeadService.listLeads:", error);
      const hint =
        error.code === "42P01" || error.message?.includes("bms_leads")
          ? " Apply the bms_leads Supabase migration if this table is missing."
          : "";
      return { data: [], error: (error.message ?? "Failed to load leads.") + hint };
    }
    return { data: (data ?? []) as BmsLeadRow[], error: null };
  },
};
