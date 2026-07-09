export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, resend-signature",
};

export function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

export function createSupabaseAdmin() {
  return createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } },
  );
}

export async function getSetting(
  supabase: ReturnType<typeof createSupabaseAdmin>,
  key: string,
  fallback: unknown = null,
): Promise<unknown> {
  const { data } = await supabase.from("em_settings").select("value").eq("key", key).maybeSingle();
  return data?.value ?? fallback;
}

export function renderTemplate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => vars[key] ?? "");
}

export function unsubscribeFooter(siteOrigin: string, email: string): string {
  const token = encodeURIComponent(btoa(email));
  return `\n\n---\n<a href="${siteOrigin}/api/unsubscribe?e=${token}">Unsubscribe</a>`;
}
