import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { corsHeaders, jsonResponse, createSupabaseAdmin, getSetting } from "./lib/util.ts";
import { geminiGenerate } from "./lib/gemini.ts";
import { stripQuotedReplyBody } from "./lib/emailBody.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createSupabaseAdmin();
    const { lead_id } = await req.json() as { lead_id?: string };
    if (!lead_id) return jsonResponse({ ok: false, error: "lead_id required" }, 400);

    const { data: lead } = await supabase
      .from("em_leads")
      .select("id, email, name, company, research_summary")
      .eq("id", lead_id)
      .maybeSingle();
    if (!lead) throw new Error("Lead not found");

    const { data: messages } = await supabase
      .from("em_email_messages")
      .select("direction, subject, body_text, from_email, sent_at, received_at, created_at")
      .eq("lead_id", lead_id)
      .order("created_at", { ascending: true })
      .limit(20);

    const thread = (messages ?? []).map((m) => {
      const who = m.direction === "inbound" ? m.from_email : "us";
      const body = stripQuotedReplyBody(m.body_text ?? "").preview;
      return `[${m.direction}] ${who}: ${body}`;
    }).join("\n");

    const lastInbound = [...(messages ?? [])].reverse().find((m) => m.direction === "inbound");
    const baseSubject = lastInbound?.subject ?? messages?.[messages.length - 1]?.subject ?? "your message";
    const replySubject = baseSubject.match(/^re:/i) ? baseSubject : `Re: ${baseSubject}`;

    const knowledgeBase = String(await getSetting(supabase, "reply_knowledge_base", "")).replace(/"/g, "");

    const systemInstruction = `You are the CEO of BoostMySites, a business automation consultancy. Write concise, human email replies. Follow the knowledge base strictly. Do not invent pricing or promises not in the KB. Under 150 words. Output only the email body text, no subject line.`;

    const prompt = `Knowledge base:
${knowledgeBase || "(No knowledge base configured — be helpful and professional, suggest booking a call.)"}

Lead: ${lead.name ?? "there"} at ${lead.company ?? "their company"} (${lead.email})
Research: ${lead.research_summary ?? "none"}

Conversation:
${thread || "(no prior messages)"}

Write a reply to their latest message. Reference what they said specifically.`;

    const body = await geminiGenerate(prompt, systemInstruction);
    if (!body) throw new Error("AI returned empty reply");

    return jsonResponse({ ok: true, subject: replySubject, body });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return jsonResponse({ ok: false, error: message }, 500);
  }
});
