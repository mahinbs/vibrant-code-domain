import { supabase } from "@/integrations/supabase/client";

export type PlacementProgramApplication = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
  phone: string;
  program: string;
  background: string;
  message: string | null;
  status: string;
};

export type SubmitPlacementApplicationInput = {
  name: string;
  email: string;
  phone: string;
  program: string;
  background: string;
  message?: string;
};

export type ListPlacementApplicationsResult = {
  data: PlacementProgramApplication[];
  error: string | null;
};

function migrationHint(error: { code?: string; message?: string }) {
  return error.code === "42P01" ||
    error.message?.includes("placement_program_applications")
    ? " Apply the placement_program_applications Supabase migration if this table is missing."
    : "";
}

export const placementProgramService = {
  async submitApplication(
    input: SubmitPlacementApplicationInput
  ): Promise<{ error: string | null }> {
    const { error } = await supabase
      .from("placement_program_applications")
      .insert([
        {
          name: input.name.trim(),
          email: input.email.trim(),
          phone: input.phone.trim(),
          program: input.program,
          background: input.background,
          message: input.message?.trim() || null,
          status: "new",
        },
      ]);

    if (error) {
      console.error("placementProgramService.submitApplication:", error);
      return {
        error: (error.message ?? "Failed to save application.") + migrationHint(error),
      };
    }

    return { error: null };
  },

  async listApplications(): Promise<ListPlacementApplicationsResult> {
    const { data, error } = await supabase
      .from("placement_program_applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("placementProgramService.listApplications:", error);
      return {
        data: [],
        error: (error.message ?? "Failed to load applications.") + migrationHint(error),
      };
    }

    return { data: (data ?? []) as PlacementProgramApplication[], error: null };
  },
};
