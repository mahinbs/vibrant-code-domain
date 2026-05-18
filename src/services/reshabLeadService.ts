import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

export type ReshabLeadRow = {
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

export type ListReshabLeadsResult = {
  data: ReshabLeadRow[];
  error: string | null;
};

export const reshabLeadService = {
  async listLeads(): Promise<ListReshabLeadsResult> {
    const { data, error } = await supabase
      .from("reshab_leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("reshabLeadService.listLeads:", error);
      const hint =
        error.code === "42P01" || error.message?.includes("reshab_leads")
          ? " Apply the reshab_leads Supabase migrations if this table is missing."
          : "";
      return { data: [], error: (error.message ?? "Failed to load leads.") + hint };
    }
    return { data: (data ?? []) as ReshabLeadRow[], error: null };
  },
};
