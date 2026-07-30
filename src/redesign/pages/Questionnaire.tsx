import { useState, type FormEvent } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { sendTelegramMessage } from "../lib/notifyTelegramLead";

type FieldType = "short" | "para" | "dropdown" | "radio" | "checkbox";
type Field = { id: string; label: string; type: FieldType; options?: string[]; required?: boolean; placeholder?: string };
type Section = { title: string; fields: Field[] };

const SECTIONS: Section[] = [
  {
    title: "Company",
    fields: [
      { id: "company", label: "Company Name", type: "short", required: true },
      { id: "website", label: "Website", type: "short", placeholder: "example.com" },
      { id: "industry", label: "Industry", type: "dropdown", options: ["IT Services", "Software Development", "Manufacturing", "Healthcare", "Construction", "Government", "Education", "Logistics", "Finance", "Retail", "Other"] },
      { id: "employees", label: "Number of Employees", type: "radio", options: ["1–10", "11–25", "26–50", "51–100", "100–250", "250+"] },
    ],
  },
  {
    title: "Primary Contact",
    fields: [
      { id: "contact_name", label: "Primary Contact Name", type: "short", required: true },
      { id: "designation", label: "Designation", type: "short" },
      { id: "email", label: "Email Address", type: "short", required: true, placeholder: "you@company.com" },
      { id: "phone", label: "Phone Number", type: "short" },
    ],
  },
  {
    title: "About your business",
    fields: [
      { id: "about", label: "Tell us about your business.", type: "para" },
      { id: "services", label: "What services do you provide?", type: "para" },
    ],
  },
  {
    title: "Departments & current software",
    fields: [
      { id: "departments", label: "Which departments would you like us to assess?", type: "checkbox", options: ["Marketing", "Sales", "Customer Support", "HR", "Finance", "Operations", "Software Development", "Project Management", "Administration", "Leadership", "Other"] },
      { id: "sw_crm", label: "Current Software — CRM", type: "checkbox", options: ["HubSpot", "Zoho", "Salesforce", "Freshsales", "None"] },
      { id: "sw_pm", label: "Current Software — Project Management", type: "checkbox", options: ["Jira", "ClickUp", "Asana", "Trello", "Monday", "Notion"] },
      { id: "sw_comm", label: "Current Software — Communication", type: "checkbox", options: ["Slack", "Teams", "WhatsApp", "Google Workspace", "Microsoft 365"] },
      { id: "sw_dev", label: "Current Software — Development", type: "checkbox", options: ["GitHub", "GitLab", "Bitbucket"] },
      { id: "sw_mkt", label: "Current Software — Marketing", type: "checkbox", options: ["Google Ads", "Meta Ads", "LinkedIn Ads", "Mailchimp", "HubSpot"] },
      { id: "sw_other", label: "Other Software", type: "para" },
    ],
  },
  {
    title: "Challenges & AI usage",
    fields: [
      { id: "challenges", label: "Which challenges are affecting your business today?", type: "checkbox", options: ["Too much manual work", "Slow approvals", "Repetitive tasks", "Employee productivity", "Poor reporting", "Lead management", "Customer support delays", "Marketing inefficiency", "Development bottlenecks", "Lack of visibility", "Data duplication", "Other"] },
      { id: "ai_tools", label: "Which AI tools are currently used?", type: "checkbox", options: ["ChatGPT", "Claude", "Gemini", "Microsoft Copilot", "Cursor", "GitHub Copilot", "Make.com", "n8n", "Zapier", "None", "Other"] },
    ],
  },
  {
    title: "Teams",
    fields: [
      { id: "mkt_size", label: "Marketing Team — How many people?", type: "short" },
      { id: "mkt_resp", label: "Marketing Team — Main responsibilities?", type: "para" },
      { id: "sales_size", label: "Sales Team — How many people?", type: "short" },
      { id: "sales_process", label: "Sales Team — Current sales process?", type: "para" },
      { id: "ops_repetitive", label: "Operations Team — Describe repetitive activities.", type: "para" },
      { id: "dev_workflow", label: "Development Team — Describe your current development workflow.", type: "para" },
    ],
  },
  {
    title: "Automation goals",
    fields: [
      { id: "processes", label: "Which business processes would you like to automate?", type: "checkbox", options: ["Lead Generation", "Cold Email", "AI Calling", "CRM Updates", "Proposal Generation", "Reporting", "Customer Support", "HR", "Finance", "Project Management", "Software Development", "Internal Approvals", "Document Processing", "Other"] },
      { id: "outcomes", label: "What are your expected outcomes?", type: "checkbox", options: ["Reduce operational costs", "Save employee time", "Increase revenue", "Improve customer experience", "Scale operations", "Improve reporting", "Reduce manual errors", "Faster delivery", "Better decision making"] },
      { id: "first_process", label: "Describe one business process you would like us to automate first.", type: "para" },
      { id: "has_docs", label: "Do you have any SOPs, workflow diagrams, process documents or screenshots to share?", type: "radio", options: ["Yes", "No"] },
      { id: "anything_else", label: "Is there anything else we should know before preparing your automation proposal?", type: "para" },
    ],
  },
];

type Answers = Record<string, string | string[]>;

const INPUT = "w-full rounded-lg border border-white/15 bg-black/40 p-3 text-sm text-white placeholder:text-white/35 focus:border-[#4b78ff] focus:outline-none";

export default function Questionnaire() {
  const [a, setA] = useState<Answers>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const setVal = (id: string, v: string | string[]) => setA((p) => ({ ...p, [id]: v }));
  const toggle = (id: string, opt: string) => {
    const cur = (a[id] as string[]) || [];
    setVal(id, cur.includes(opt) ? cur.filter((x) => x !== opt) : [...cur, opt]);
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!String(a.company || "").trim()) return setError("Please enter your company name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(a.email || ""))) return setError("Please enter a valid email address.");
    if (!String(a.contact_name || "").trim()) return setError("Please enter the primary contact name.");

    setStatus("submitting");
    const row = {
      company: String(a.company || "").trim(),
      website: String(a.website || "").trim() || null,
      industry: String(a.industry || "") || null,
      contact_name: String(a.contact_name || "").trim(),
      email: String(a.email || "").trim(),
      phone: String(a.phone || "").trim() || null,
      answers: a,
    };
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: err } = await (supabase as any).from("questionnaire_responses").insert(row);
      if (err && import.meta.env.DEV) console.warn("[questionnaire] insert:", err.message);
    } catch (e) {
      if (import.meta.env.DEV) console.warn("[questionnaire] insert threw:", e);
    }
    // Telegram is the guaranteed delivery — fires whether or not the DB table
    // exists yet, so a response is never lost.
    const fmt = (v: string | string[] | undefined) => (Array.isArray(v) ? v.join(", ") : v || "—");
    const lines = [
      "📝 <b>New Automation Discovery Questionnaire</b>",
      `🏢 <b>${row.company}</b>${row.industry ? ` · ${row.industry}` : ""}`,
      row.website ? `🔗 ${row.website}` : "",
      `👤 ${row.contact_name}${a.designation ? ` (${a.designation})` : ""}`,
      `✉️ ${row.email}${row.phone ? ` · 📱 ${row.phone}` : ""}`,
      "",
      `Challenges: ${fmt(a.challenges)}`,
      `Wants to automate: ${fmt(a.processes)}`,
      `First priority: ${fmt(a.first_process)}`,
      `Outcomes: ${fmt(a.outcomes)}`,
    ].filter(Boolean);
    sendTelegramMessage(lines.join("\n"));
    setStatus("done");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (status === "done") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#06070c] px-5 text-white">
        <Helmet><title>Thank you | Boostmysites</title><meta name="robots" content="noindex,nofollow" /></Helmet>
        <div className="w-full max-w-[480px] rounded-2xl border border-emerald-400/30 bg-emerald-400/[0.06] p-8 text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-emerald-400/20 text-3xl">✅</div>
          <h1 className="text-2xl font-medium text-white">Thank you!</h1>
          <p className="mt-2 text-[15px] leading-relaxed text-white/70">
            Your responses are in. Our team will review them and prepare a custom automation proposal —
            we&apos;ll reach out within 24 hours.
          </p>
          <a href="/" className="mt-6 inline-block rounded-lg bg-[#4b78ff] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#3d63d8]">
            Back to Boostmysites
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#06070c] text-white">
      <Helmet>
        <title>AI Automation Discovery Questionnaire | Boostmysites</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="description" content="Tell us about your business so we can map the automations that save you the most time and money." />
      </Helmet>

      <header className="mx-auto flex w-full max-w-[760px] items-center justify-between px-5 py-5">
        <a href="/" className="flex items-center gap-2">
          <img src="/bms-logo.png" alt="Boostmysites" className="size-8 rounded-lg bg-white p-1" />
          <span className="text-sm font-semibold">Boostmysites</span>
        </a>
      </header>

      <main className="mx-auto w-full max-w-[760px] px-5 pb-20">
        <div className="mb-8 text-center">
          <p className="mb-3 inline-flex items-center rounded-full border border-white/15 bg-black/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-purple">Discovery</p>
          <h1 className="text-[32px] font-medium -tracking-[0.03em] leading-[1.1] md:text-[42px]">
            AI Automation <span className="impact-highlight">Discovery Questionnaire</span>
          </h1>
          <p className="mx-auto mt-3 max-w-[560px] text-[15px] text-white/60">
            Please share the following details so we can prepare your custom automation proposal.
          </p>
        </div>

        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-8">
          {SECTIONS.map((section) => (
            <section key={section.title} className="rounded-2xl border border-white/12 bg-white/[0.02] p-6">
              <h2 className="mb-4 text-[15px] font-semibold uppercase tracking-[0.1em] text-purple">{section.title}</h2>
              <div className="flex flex-col gap-5">
                {section.fields.map((f) => (
                  <div key={f.id}>
                    <label className="mb-1.5 block text-[14px] font-medium text-white/85">
                      {f.label}{f.required ? <span className="text-red-400"> *</span> : null}
                    </label>

                    {f.type === "short" ? (
                      <input
                        value={(a[f.id] as string) || ""}
                        onChange={(e) => setVal(f.id, e.target.value)}
                        placeholder={f.placeholder}
                        className={INPUT}
                      />
                    ) : null}

                    {f.type === "para" ? (
                      <textarea
                        rows={3}
                        value={(a[f.id] as string) || ""}
                        onChange={(e) => setVal(f.id, e.target.value)}
                        className={`${INPUT} resize-none`}
                      />
                    ) : null}

                    {f.type === "dropdown" ? (
                      <select value={(a[f.id] as string) || ""} onChange={(e) => setVal(f.id, e.target.value)} className={INPUT}>
                        <option value="">— Select —</option>
                        {f.options!.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    ) : null}

                    {f.type === "radio" ? (
                      <div className="flex flex-wrap gap-2">
                        {f.options!.map((o) => {
                          const on = a[f.id] === o;
                          return (
                            <button
                              type="button"
                              key={o}
                              onClick={() => setVal(f.id, on ? "" : o)}
                              className={`rounded-lg border px-3 py-1.5 text-[13px] transition-colors ${on ? "border-[#4b78ff]/60 bg-[#4b78ff]/15 text-white" : "border-white/15 text-white/65 hover:bg-white/5"}`}
                            >
                              {o}
                            </button>
                          );
                        })}
                      </div>
                    ) : null}

                    {f.type === "checkbox" ? (
                      <div className="flex flex-wrap gap-2">
                        {f.options!.map((o) => {
                          const on = ((a[f.id] as string[]) || []).includes(o);
                          return (
                            <button
                              type="button"
                              key={o}
                              onClick={() => toggle(f.id, o)}
                              className={`rounded-lg border px-3 py-1.5 text-[13px] transition-colors ${on ? "border-emerald-400/50 bg-emerald-400/15 text-emerald-200" : "border-white/15 text-white/65 hover:bg-white/5"}`}
                            >
                              {on ? "✓ " : ""}{o}
                            </button>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          ))}

          {error ? <p className="text-[14px] text-red-300/90">{error}</p> : null}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="btn-gloss relative w-full overflow-hidden rounded-xl border border-white/20 bg-purple/80 px-6 py-4 text-[15px] font-semibold text-white shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)] disabled:opacity-60"
          >
            {status === "submitting" ? "Submitting…" : "Submit questionnaire"}
          </button>
          <p className="text-center text-[12px] text-white/40">Takes ~5 minutes · We reply within 24 hours.</p>
        </form>
      </main>
    </div>
  );
}
