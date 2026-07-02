import { supabase } from "@/integrations/supabase/client";

/**
 * Admin login — Supabase Auth first (use your real Supabase user + password),
 * with a built-in allowlist fallback so admin can never get locked out.
 *
 * For full security also apply the reshab_leads authenticated-only RLS — then
 * only the Supabase-session login can read leads (the fallback flag cannot).
 */

/** Backup panel logins — only work for UI; Reshab leads need a real Supabase session. */
const FALLBACK_ADMINS: Record<string, string> = {
  "ceo@boostmysites.com": "BoostAdmin2026",
  "mahinstlucia@gmail.com": "Boostmysites@2026",
};

const FLAG = "admin_authenticated";

function isFallbackAdmin(email: string, password: string): boolean {
  const key = email.trim().toLowerCase();
  return FALLBACK_ADMINS[key] === password;
}

export const adminAuth = {
  async login(email: string, password: string): Promise<{ ok: boolean; error?: string }> {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (!error) {
      localStorage.removeItem(FLAG); // real session — no need for the flag
      return { ok: true };
    }

    // Backup path so admin is never locked out if the Supabase user/login fails.
    if (isFallbackAdmin(email, password)) {
      localStorage.setItem(FLAG, "true");
      return { ok: true };
    }

    return { ok: false, error: error.message || "Invalid email or password." };
  },

  async logout(): Promise<void> {
    localStorage.removeItem(FLAG);
    await supabase.auth.signOut();
  },

  hasFlag(): boolean {
    return localStorage.getItem(FLAG) === "true";
  },

  async hasSession(): Promise<boolean> {
    const { data } = await supabase.auth.getSession();
    return !!data.session;
  },
};
