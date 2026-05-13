import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

export type ReshabLeadRow = {
  id: string;
  created_at: string;
  source_page: string;
  lead_score: number;
  lead_tier: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  payload: Json;
};

export const reshabLeadService = {
  async listLeads(): Promise<ReshabLeadRow[]> {
    const { data, error } = await supabase
      .from("reshab_leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("reshabLeadService.listLeads:", error);
      return [];
    }
    return (data ?? []) as ReshabLeadRow[];
  },
};
