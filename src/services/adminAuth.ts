/**
 * Simple built-in admin login (email allowlist + password).
 *
 * Self-contained so it works without any Supabase dashboard setup. NOTE: the
 * credentials ship in the client bundle, so this is "good enough" gating, not
 * hard security — change the password below and rotate it periodically. For real
 * security, move to Supabase Auth (create the user in the dashboard) + apply the
 * reshab_leads authenticated-only RLS.
 */

const ADMIN_EMAIL = "mahinstlucia@gmail.com";
const ADMIN_PASSWORD = "Boostmysites@2026"; // TODO: change this anytime.

const AUTH_KEY = "admin_authenticated";

export const adminAuth = {
  async login(email: string, password: string): Promise<{ ok: boolean; error?: string }> {
    if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_KEY, "true");
      return { ok: true };
    }
    return { ok: false, error: "Invalid email or password." };
  },

  async logout(): Promise<void> {
    localStorage.removeItem(AUTH_KEY);
  },

  isAuthenticated(): boolean {
    return localStorage.getItem(AUTH_KEY) === "true";
  },
};
