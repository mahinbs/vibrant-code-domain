import { supabase } from "@/integrations/supabase/client";

/**
 * Admin authentication backed by Supabase Auth (email + password).
 * Replaces the old hard-coded client-side credentials. Access to admin data
 * (e.g. reshab_leads SELECT) is gated by RLS requiring an authenticated session.
 */
export const adminAuth = {
  async login(email: string, password: string): Promise<{ ok: boolean; error?: string }> {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  },

  async logout(): Promise<void> {
    await supabase.auth.signOut();
  },

  async isAuthenticated(): Promise<boolean> {
    const { data } = await supabase.auth.getSession();
    return !!data.session;
  },

  async getEmail(): Promise<string | null> {
    const { data } = await supabase.auth.getSession();
    return data.session?.user?.email ?? null;
  },
};
