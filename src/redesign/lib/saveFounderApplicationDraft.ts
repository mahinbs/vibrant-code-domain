import { supabase } from "@/integrations/supabase/client";
import type { FounderApplicationFormState, FounderSceneId } from "../founderPartnership/founderApplicationTypes";
import { DRAFT_STORAGE_KEY, FOUNDER_SOURCE_PAGE } from "../founderPartnership/founderApplicationConfig";

export type DraftSaveResult = {
  ok: boolean;
  resumeToken?: string;
  error?: string;
};

export type LoadedDraft = {
  ok: boolean;
  form?: FounderApplicationFormState;
  currentStep?: FounderSceneId;
  updatedAt?: string;
  error?: string;
  expired?: boolean;
};

function generateToken(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID().replace(/-/g, "");
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
}

export function getStoredResumeToken(): string | null {
  if (typeof window === "undefined") return null;
  return (
    sessionStorage.getItem(DRAFT_STORAGE_KEY) ||
    localStorage.getItem(DRAFT_STORAGE_KEY) ||
    new URLSearchParams(window.location.search).get("resume")
  );
}

export function storeResumeToken(token: string) {
  sessionStorage.setItem(DRAFT_STORAGE_KEY, token);
  localStorage.setItem(DRAFT_STORAGE_KEY, token);
}

export function clearResumeTokens() {
  sessionStorage.removeItem(DRAFT_STORAGE_KEY);
  localStorage.removeItem(DRAFT_STORAGE_KEY);
  if (typeof window !== "undefined") {
    const url = new URL(window.location.href);
    if (url.searchParams.has("resume")) {
      url.searchParams.delete("resume");
      window.history.replaceState({}, "", url.pathname + url.search);
    }
  }
}

export async function saveFounderApplicationDraft(
  token: string | null,
  currentStep: FounderSceneId,
  form: FounderApplicationFormState,
  email: string,
): Promise<DraftSaveResult> {
  const resumeToken = token || generateToken();
  const payload = { ...form, current_step: currentStep };

  try {
    const { error } = await supabase.from("founder_application_drafts").upsert(
      {
        resume_token: resumeToken,
        email: email.trim(),
        name: form.name.trim() || null,
        phone: form.phone.trim() || null,
        source_page: FOUNDER_SOURCE_PAGE,
        current_step: currentStep,
        payload,
        status: "in_progress",
        updated_at: new Date().toISOString(),
      },
      { onConflict: "resume_token" },
    );

    if (error) {
      return { ok: false, error: error.message };
    }

    storeResumeToken(resumeToken);
    return { ok: true, resumeToken };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Could not save progress",
    };
  }
}

export async function loadFounderApplicationDraft(resumeToken: string): Promise<LoadedDraft> {
  try {
    const { data, error } = await supabase
      .from("founder_application_drafts")
      .select("payload, current_step, status, updated_at")
      .eq("resume_token", resumeToken)
      .eq("status", "in_progress")
      .maybeSingle();

    if (error || !data) {
      return { ok: false, error: error?.message ?? "Draft not found", expired: true };
    }

    const p = data.payload as FounderApplicationFormState & { current_step?: FounderSceneId };
    const { current_step: _ignored, ...form } = p;

    return {
      ok: true,
      form: form as FounderApplicationFormState,
      currentStep: (data.current_step as FounderSceneId) || undefined,
      updatedAt: data.updated_at as string,
    };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Could not load draft",
    };
  }
}

export async function abandonFounderApplicationDraft(resumeToken: string | null): Promise<void> {
  if (!resumeToken) {
    clearResumeTokens();
    return;
  }
  try {
    await supabase
      .from("founder_application_drafts")
      .update({ status: "abandoned", updated_at: new Date().toISOString() })
      .eq("resume_token", resumeToken);
  } catch {
    /* non-blocking */
  }
  clearResumeTokens();
}

export async function completeFounderApplicationDraft(resumeToken: string | null) {
  if (!resumeToken) return;
  try {
    await supabase
      .from("founder_application_drafts")
      .update({ status: "completed", updated_at: new Date().toISOString() })
      .eq("resume_token", resumeToken);
    clearResumeTokens();
  } catch {
    /* non-blocking */
  }
}
