import { supabase } from "@/integrations/supabase/client";

/**
 * Admin login — Supabase Auth first (use your real Supabase user + password),
 * with a built-in allowlist fallback so admin can never get locked out.
 *
 * For full security also apply the reshab_leads authenticated-only RLS — then
 * only the Supabase-session login can read leads (the fallback flag cannot).
 */

const ADMIN_EMAIL = "mahinstlucia@gmail.com";
const FALLBACK_PASSWORD = "Boostmysites@2026"; // backup only — change anytime.
const FLAG = "admin_authenticated";

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
    if (email.trim().toLowerCase() === ADMIN_EMAIL && password === FALLBACK_PASSWORD) {
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
