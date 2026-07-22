import { supabase } from "@/integrations/supabase/client";

/**
 * Standalone auth for the Sales Pipeline dashboard (/dashboard) — kept separate
 * from the /admin panel: its own session flag and its own login list.
 *
 * Sign in with any Supabase Auth user (add them in Supabase → Authentication),
 * or one of the built-in fallback logins below so you're never locked out.
 */
const FALLBACK_LOGINS: Record<string, string> = {
  "chairman@boostmysites.com": "Pipeline@2026",
  "sales@boostmysites.com": "Boostmysites@2026",
};

const FLAG = "bms_dashboard_auth";

function isFallback(email: string, password: string): boolean {
  return FALLBACK_LOGINS[email.trim().toLowerCase()] === password;
}

export const pipelineAuth = {
  async login(email: string, password: string): Promise<{ ok: boolean; error?: string }> {
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (!error) {
      localStorage.setItem(FLAG, "true");
      return { ok: true };
    }
    if (isFallback(email, password)) {
      localStorage.setItem(FLAG, "true");
      return { ok: true };
    }
    return { ok: false, error: error.message || "Invalid email or password." };
  },

  async logout(): Promise<void> {
    localStorage.removeItem(FLAG);
    await supabase.auth.signOut();
  },

  isAuthed(): boolean {
    return localStorage.getItem(FLAG) === "true";
  },
};
