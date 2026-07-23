import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { pipelineAuth } from "@/services/pipelineAuth";
import {
  pipelineLeadService,
  type PipelineAttachment,
  type PipelineLead,
  type PipelineTab,
} from "@/services/pipelineLeadService";
import { syncDescriptionToSheet } from "@/services/pipelineSheetSync";

const TABS: { key: PipelineTab; label: string }[] = [
  { key: "attended", label: "Attended" },
  { key: "unattended", label: "Unattended" },
];

/** Team members who can own a lead (point of contact). */
const POC_OPTIONS = ["Kavya", "Viaan", "Darshan", "Mahin", "Supreeth"];

/** Responsiveness rating — emoji + colour for visual triage of each lead. */
type Rating = { value: string; emoji: string; label: string; short: string; text: string; chip: string };
const RATINGS: Rating[] = [
  { value: "hot", emoji: "🔥", label: "Hot — responding well", short: "Hot", text: "text-orange-300", chip: "border-orange-400/50 bg-orange-400/15 text-orange-300" },
  { value: "warm", emoji: "🙂", label: "Warm — some interest", short: "Warm", text: "text-amber-300", chip: "border-amber-400/50 bg-amber-400/15 text-amber-300" },
  { value: "cold", emoji: "🧊", label: "Cold — slow to respond", short: "Cold", text: "text-sky-300", chip: "border-sky-400/50 bg-sky-400/15 text-sky-300" },
  { value: "useless", emoji: "🗑️", label: "Useless — not worth chasing", short: "Useless", text: "text-white/40 line-through", chip: "border-white/20 bg-white/5 text-white/45" },
];
const ratingOf = (v: string | null | undefined): Rating | undefined =>
  v ? RATINGS.find((r) => r.value === v) : undefined;

function RatingPicker({ value, onChange }: { value: string | null; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {RATINGS.map((r) => (
        <button
          type="button"
          key={r.value}
          onClick={() => onChange(value === r.value ? "" : r.value)}
          title={r.label}
          className={`rounded-lg border px-3 py-1.5 text-[13px] font-medium transition-colors ${
            value === r.value ? r.chip : "border-white/15 text-white/60 hover:bg-white/5"
          }`}
        >
          <span className="mr-1">{r.emoji}</span>
          {r.short}
        </button>
      ))}
    </div>
  );
}

/** Fields shown in the add/edit form per tab. */
const FIELDS: Record<PipelineTab, { key: keyof PipelineLead; label: string; type?: "textarea" }[]> = {
  attended: [
    { key: "client", label: "Client" },
    { key: "industry", label: "Industry" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "requirement", label: "Requirement notes", type: "textarea" },
    { key: "estimated_value", label: "Estimated Value" },
    { key: "current_stage", label: "Current Stage" },
    { key: "next_step", label: "Next Step", type: "textarea" },
    { key: "expected_closure", label: "Expected Closure" },
    { key: "technical_notes", label: "Technical Notes", type: "textarea" },
    { key: "email", label: "Mail ID" },
    { key: "phone", label: "Phone number" },
    { key: "website", label: "Company website" },
  ],
  unattended: [
    { key: "client", label: "Client" },
    { key: "phone", label: "Contact" },
    { key: "business", label: "Business" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "email", label: "Email" },
    { key: "website", label: "Company website" },
    { key: "status", label: "Status", type: "textarea" },
  ],
};

function formatDate(iso?: string): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  } catch {
    return "—";
  }
}
function formatDateTime(iso?: string): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString("en-IN", {
      day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
    });
  } catch {
    return "—";
  }
}

function parseValue(v: string | null): number {
  if (!v) return 0;
  const n = Number(String(v).replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function formatINR(n: number): string {
  if (!n) return "—";
  return "₹" + n.toLocaleString("en-IN");
}

const inputCls =
  "w-full rounded-lg border border-white/15 bg-black/40 p-2.5 text-sm text-white placeholder:text-white/35 focus:border-[#4b78ff] focus:outline-none";

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function AttachmentsSection({
  lead,
  onChanged,
}: {
  lead: PipelineLead;
  onChanged?: () => void;
}) {
  const [atts, setAtts] = useState<PipelineAttachment[]>(lead.attachments ?? []);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setErr(null);
    setUploading(true);
    let next = [...atts];
    for (const file of Array.from(files)) {
      if (file.size > 15 * 1024 * 1024) {
        setErr(`${file.name} is over 15 MB.`);
        continue;
      }
      const { attachment, error } = await pipelineLeadService.uploadAttachment(lead.id, file);
      if (error) { setErr(error); break; }
      if (attachment) next = [...next, attachment];
    }
    const { error } = await pipelineLeadService.update(lead.id, { attachments: next });
    setUploading(false);
    if (error) { setErr(error); return; }
    setAtts(next);
    onChanged?.();
  }

  async function removeAtt(att: PipelineAttachment) {
    setErr(null);
    await pipelineLeadService.removeAttachment(att.path);
    const next = atts.filter((a) => a.path !== att.path);
    const { error } = await pipelineLeadService.update(lead.id, { attachments: next });
    if (error) { setErr(error); return; }
    setAtts(next);
    onChanged?.();
  }

  return (
    <div className="mt-1 rounded-lg border border-white/12 bg-black/30 p-3">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[13px] font-medium text-white/80">Attachments</p>
        <label className="cursor-pointer rounded-md bg-[#4b78ff] px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-[#3d63d8]">
          {uploading ? "Uploading…" : "+ Upload file"}
          <input
            type="file"
            multiple
            accept="application/pdf,image/*"
            className="hidden"
            disabled={uploading}
            onChange={(e) => onFiles(e.target.files)}
          />
        </label>
      </div>
      <p className="mb-2 text-[11px] text-white/40">Follow-up PDF, chat screenshot, or image · up to 15 MB each</p>
      {atts.length === 0 ? (
        <p className="text-[12px] text-white/35">No files yet.</p>
      ) : (
        <ul className="flex flex-col gap-1.5">
          {atts.map((a) => (
            <li key={a.path} className="flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1.5">
              <span className="text-[13px]">{a.type.startsWith("image/") ? "🖼️" : "📄"}</span>
              <a href={a.url} target="_blank" rel="noopener noreferrer" className="min-w-0 flex-1 truncate text-[12px] text-[#7aa2ff] hover:underline">
                {a.name}
              </a>
              <span className="text-[11px] text-white/35">{formatSize(a.size)}</span>
              <button onClick={() => removeAtt(a)} className="text-[12px] text-red-300/80 hover:underline" type="button">Remove</button>
            </li>
          ))}
        </ul>
      )}
      {err ? <p className="mt-2 text-[12px] text-red-300/90">{err}</p> : null}
    </div>
  );
}

function LeadModal({
  tab,
  lead,
  onClose,
  onSaved,
  onChanged,
}: {
  tab: PipelineTab;
  lead: PipelineLead | null;
  onClose: () => void;
  onSaved: () => void;
  onChanged?: () => void;
}) {
  const [form, setForm] = useState<Record<string, string>>(() => {
    const base: Record<string, string> = {
      responsiveness: (lead?.responsiveness as string) ?? "",
      poc: (lead?.poc as string) ?? "",
    };
    for (const f of FIELDS[tab]) base[f.key as string] = (lead?.[f.key] as string) ?? "";
    return base;
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.client?.trim()) return setError("Client is required.");
    setSaving(true);
    // Save responsiveness + website + poc separately (best-effort) so a missing
    // column can't block the whole save before the ALTER is run.
    const { responsiveness, website, poc, ...fields } = form;
    const payload = { ...fields, tab } as Record<string, unknown>;
    let leadId = lead?.id ?? null;
    let saveError: string | null = null;
    if (lead) {
      saveError = (await pipelineLeadService.update(lead.id, payload)).error;
    } else {
      const created = await pipelineLeadService.create(payload);
      saveError = created.error;
      leadId = created.data?.id ?? null;
    }
    if (!saveError && leadId) {
      if ((responsiveness ?? "") !== (lead?.responsiveness ?? "")) {
        try { await pipelineLeadService.update(leadId, { responsiveness: responsiveness || null }); } catch { /* column may not exist yet */ }
      }
      if ((website ?? "") !== (lead?.website ?? "")) {
        try { await pipelineLeadService.update(leadId, { website: website || null }); } catch { /* column may not exist yet */ }
      }
      if ((poc ?? "") !== (lead?.poc ?? "")) {
        try { await pipelineLeadService.update(leadId, { poc: poc || null }); } catch { /* column may not exist yet */ }
      }
    }
    setSaving(false);
    if (saveError) {
      setError(
        saveError.includes("pipeline_leads") || saveError.includes("relation")
          ? "The pipeline_leads table isn't set up yet — run the SQL in Supabase first."
          : saveError,
      );
      return;
    }
    syncDescriptionToSheet({
      tab,
      sl_no: lead?.sl_no ?? null,
      client: form.client ?? null,
      description: form.description ?? "",
    });
    onSaved();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
      <div className="my-8 w-full max-w-[560px] rounded-2xl border border-white/15 bg-[#0c1020] p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            {lead ? "Edit lead" : "Add lead"} · {tab === "attended" ? "Attended" : "Unattended"}
          </h2>
          <button onClick={onClose} className="text-white/50 hover:text-white" aria-label="Close">✕</button>
        </div>
        <form onSubmit={submit} className="flex flex-col gap-3">
          <label className="text-[13px] text-white/70">
            POC (point of contact)
            <select
              value={form.poc ?? ""}
              onChange={(e) => setForm((p) => ({ ...p, poc: e.target.value }))}
              className={`mt-1 ${inputCls}`}
            >
              <option value="">— Unassigned —</option>
              {POC_OPTIONS.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </label>
          <div className="text-[13px] text-white/70">
            Responsiveness
            <div className="mt-1.5">
              <RatingPicker
                value={form.responsiveness ?? ""}
                onChange={(v) => setForm((p) => ({ ...p, responsiveness: v }))}
              />
            </div>
          </div>
          {FIELDS[tab].map((f) => (
            <label key={f.key as string} className="text-[13px] text-white/70">
              {f.label}
              {f.type === "textarea" ? (
                <textarea
                  rows={3}
                  value={form[f.key as string] ?? ""}
                  onChange={(e) => setForm((p) => ({ ...p, [f.key as string]: e.target.value }))}
                  className={`mt-1 resize-none ${inputCls}`}
                />
              ) : (
                <input
                  value={form[f.key as string] ?? ""}
                  onChange={(e) => setForm((p) => ({ ...p, [f.key as string]: e.target.value }))}
                  className={`mt-1 ${inputCls}`}
                />
              )}
            </label>
          ))}
          {lead ? (
            <AttachmentsSection lead={lead} onChanged={onChanged} />
          ) : (
            <p className="rounded-lg border border-white/10 bg-black/30 p-3 text-[12px] text-white/45">
              Save this lead first, then reopen it to attach follow-up PDFs, images, or chat screenshots.
            </p>
          )}
          {error ? <p className="text-[13px] text-red-300/90">{error}</p> : null}
          <div className="mt-2 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="rounded-lg border border-white/15 px-4 py-2.5 text-sm text-white/80 hover:bg-white/5">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="rounded-lg bg-[#4b78ff] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#3d63d8] disabled:opacity-60">
              {saving ? "Saving…" : lead ? "Save changes" : "Add lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const DETAIL_META: Record<PipelineTab, { key: keyof PipelineLead; label: string }[]> = {
  attended: [
    { key: "industry", label: "Industry" },
    { key: "estimated_value", label: "Estimated Value" },
    { key: "current_stage", label: "Current Stage" },
    { key: "expected_closure", label: "Expected Closure" },
    { key: "email", label: "Mail ID" },
    { key: "phone", label: "Phone" },
    { key: "website", label: "Company website" },
  ],
  unattended: [
    { key: "phone", label: "Contact" },
    { key: "email", label: "Email" },
    { key: "business", label: "Business" },
    { key: "website", label: "Company website" },
  ],
};
const DETAIL_BLOCKS: Record<PipelineTab, { key: keyof PipelineLead; label: string }[]> = {
  attended: [
    { key: "description", label: "Description" },
    { key: "requirement", label: "Requirement notes" },
    { key: "next_step", label: "Next Step" },
    { key: "technical_notes", label: "Technical Notes" },
  ],
  unattended: [
    { key: "status", label: "Status" },
    { key: "description", label: "Description" },
  ],
};

function val(l: PipelineLead, k: keyof PipelineLead): string {
  const v = l[k];
  return v == null ? "" : String(v).trim();
}

function LeadDetailModal({
  lead,
  onClose,
  onEdit,
  onChanged,
}: {
  lead: PipelineLead;
  onClose: () => void;
  onEdit: () => void;
  onChanged: () => void;
}) {
  const meta = DETAIL_META[lead.tab].filter((f) => val(lead, f.key));
  const blocks = DETAIL_BLOCKS[lead.tab].filter((f) => val(lead, f.key));
  const badge = lead.tab === "attended" ? val(lead, "current_stage") : val(lead, "status");
  const initial = (lead.client || "?").trim().charAt(0).toUpperCase();
  const [rating, setRating] = useState<string>(lead.responsiveness ?? "");
  const [poc, setPoc] = useState<string>(lead.poc ?? "");
  const rated = ratingOf(rating);

  async function setRate(v: string) {
    setRating(v);
    await pipelineLeadService.update(lead.id, { responsiveness: v });
    onChanged();
  }

  async function setPocVal(v: string) {
    setPoc(v);
    try { await pipelineLeadService.update(lead.id, { poc: v || null }); } catch { /* column may be missing */ }
    onChanged();
  }

  const [copied, setCopied] = useState(false);
  async function copyLink() {
    const url = `${window.location.origin}/dashboard/lead/${lead.id}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="my-8 w-full max-w-[640px] overflow-hidden rounded-2xl border border-white/15 bg-[#0c1020]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="relative flex items-start gap-4 p-6"
          style={{ background: "radial-gradient(80% 130% at 0% 0%, rgba(75,120,255,0.35) 0%, rgba(12,16,32,0) 60%)" }}
        >
          <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#4b78ff]/25 text-2xl font-semibold text-white ring-1 ring-white/15">
            {initial}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-2xl font-semibold text-white">{lead.client || "—"}</h2>
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/15 bg-black/40 px-2.5 py-0.5 text-[11px] uppercase tracking-wide text-white/60">
                {lead.tab === "attended" ? "Attended" : "Unattended"}
              </span>
              {poc ? (
                <span className="rounded-full border border-[#4b78ff]/40 bg-[#4b78ff]/15 px-2.5 py-0.5 text-[11px] font-medium text-[#9dbaff]">
                  POC: {poc}
                </span>
              ) : null}
              {badge ? (
                <span className="rounded-full border border-[#4b78ff]/40 bg-[#4b78ff]/15 px-2.5 py-0.5 text-[11px] font-medium text-[#9dbaff]">
                  {badge}
                </span>
              ) : null}
              {val(lead, "estimated_value") && lead.tab === "attended" ? (
                <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300">
                  ₹{val(lead, "estimated_value")}
                </span>
              ) : null}
              {rated ? (
                <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${rated.chip}`}>
                  {rated.emoji} {rated.short}
                </span>
              ) : null}
            </div>
          </div>
          <button onClick={onClose} className="shrink-0 text-white/50 hover:text-white" aria-label="Close">✕</button>
        </div>

        <div className="max-h-[65vh] overflow-y-auto px-6 pb-6">
          {/* POC */}
          <div className="border-t border-white/10 pt-5">
            <p className="mb-2 text-[11px] uppercase tracking-wide text-white/40">POC (point of contact)</p>
            <div className="flex flex-wrap gap-2">
              {POC_OPTIONS.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPocVal(poc === n ? "" : n)}
                  className={`rounded-lg border px-3 py-1.5 text-[13px] font-medium transition-colors ${
                    poc === n
                      ? "border-[#4b78ff]/50 bg-[#4b78ff]/15 text-[#9dbaff]"
                      : "border-white/15 text-white/60 hover:bg-white/5"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Responsiveness */}
          <div className="mt-5 border-t border-white/10 pt-5">
            <p className="mb-2 text-[11px] uppercase tracking-wide text-white/40">Responsiveness</p>
            <RatingPicker value={rating} onChange={setRate} />
          </div>

          {/* Meta grid */}
          {meta.length ? (
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/10 pt-5">
              {meta.map((f) => (
                <div key={f.key as string} className="min-w-0">
                  <p className="text-[11px] uppercase tracking-wide text-white/40">{f.label}</p>
                  {f.key === "website" ? (
                    <a
                      href={/^https?:\/\//i.test(val(lead, "website")) ? val(lead, "website") : `https://${val(lead, "website")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-0.5 block break-words text-[14px] text-[#7aa2ff] hover:underline"
                    >
                      {val(lead, "website")} ↗
                    </a>
                  ) : (
                    <p className="mt-0.5 break-words text-[14px] text-white/85">{val(lead, f.key)}</p>
                  )}
                </div>
              ))}
            </div>
          ) : null}

          {/* Long-text blocks */}
          {blocks.map((f) => (
            <div key={f.key as string} className="mt-5 border-t border-white/10 pt-5">
              <p className="mb-1.5 text-[11px] uppercase tracking-wide text-white/40">{f.label}</p>
              <p className="whitespace-pre-wrap break-words text-[14px] leading-relaxed text-white/80">{val(lead, f.key)}</p>
            </div>
          ))}

          {/* Attachments — always visible */}
          <div className="mt-5 border-t border-white/10 pt-5">
            <AttachmentsSection lead={lead} onChanged={onChanged} />
          </div>

          {/* Timestamps */}
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-1 border-t border-white/10 pt-4 text-[12px] text-white/40">
            <span>🕒 Added {formatDateTime(lead.created_at)}</span>
            {lead.updated_at && lead.updated_at !== lead.created_at ? (
              <span>✏️ Last updated {formatDateTime(lead.updated_at)}</span>
            ) : null}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-2 border-t border-white/10 bg-black/20 px-6 py-4">
          <button
            onClick={copyLink}
            className={`rounded-lg border px-3 py-2 text-[13px] font-medium transition-colors ${
              copied ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-300" : "border-white/15 text-white/75 hover:bg-white/5"
            }`}
          >
            {copied ? "✓ Link copied" : "🔗 Copy link"}
          </button>
          <div className="flex gap-2">
            <button onClick={onClose} className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/80 hover:bg-white/5">Close</button>
            <button onClick={onEdit} className="rounded-lg bg-[#4b78ff] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3d63d8]">Edit lead</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const ATT_COLS: { key: keyof PipelineLead; label: string; w?: string }[] = [
  { key: "client", label: "Client" },
  { key: "poc", label: "POC" },
  { key: "industry", label: "Industry" },
  { key: "description", label: "Description", w: "min-w-[220px]" },
  { key: "estimated_value", label: "Est. Value" },
  { key: "current_stage", label: "Stage" },
  { key: "next_step", label: "Next Step", w: "min-w-[240px]" },
  { key: "expected_closure", label: "Closure" },
  { key: "email", label: "Contact" },
  { key: "created_at", label: "Added" },
];
const UNATT_COLS: { key: keyof PipelineLead; label: string; w?: string }[] = [
  { key: "client", label: "Client" },
  { key: "poc", label: "POC" },
  { key: "phone", label: "Contact" },
  { key: "business", label: "Business", w: "min-w-[200px]" },
  { key: "description", label: "Description", w: "min-w-[220px]" },
  { key: "email", label: "Email" },
  { key: "status", label: "Status", w: "min-w-[180px]" },
  { key: "created_at", label: "Added" },
];

function exportCsv(rows: PipelineLead[], tab: PipelineTab) {
  const cols = ["poc", ...FIELDS[tab].map((f) => f.key as string), "responsiveness", "created_at"];
  const esc = (v: unknown) => {
    const s = v == null ? "" : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [["sl_no", ...cols].join(",")];
  rows.forEach((r, i) => lines.push([i + 1, ...cols.map((c) => esc(r[c as keyof PipelineLead]))].join(",")));
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `pipeline-${tab}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
}

export default function PipelineDashboard() {
  const navigate = useNavigate();
  const { id: routeLeadId } = useParams<{ id: string }>();
  const [tab, setTab] = useState<PipelineTab>("attended");
  const [leads, setLeads] = useState<PipelineLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [range, setRange] = useState<"all" | "7" | "30" | "90">("all");
  const [fileFilter, setFileFilter] = useState<"all" | "missing" | "has">("all");
  const [ratingFilter, setRatingFilter] = useState<string>("all");
  const [pocFilter, setPocFilter] = useState<string>("all");
  const [modal, setModal] = useState<{ open: boolean; lead: PipelineLead | null }>({ open: false, lead: null });
  const [detail, setDetail] = useState<PipelineLead | null>(null);
  const [filesModal, setFilesModal] = useState<PipelineLead | null>(null);
  const [descEdit, setDescEdit] = useState<{ id: string; value: string } | null>(null);
  const [descSaving, setDescSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await pipelineLeadService.list();
    setLeads(data);
    setLoadError(
      error && (error.includes("pipeline_leads") || error.includes("relation"))
        ? "The pipeline_leads table isn't set up in Supabase yet. Run the provided SQL, then refresh."
        : error,
    );
    setLoading(false);
  };

  useEffect(() => { void load(); }, []);

  // Open a lead directly from a shared link (/dashboard/lead/:id).
  useEffect(() => {
    if (routeLeadId && leads.length) {
      const l = leads.find((x) => x.id === routeLeadId);
      if (l) setDetail(l);
    }
  }, [routeLeadId, leads]);

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    const cutoff = range === "all" ? 0 : Date.now() - Number(range) * 86400000;
    return leads
      .filter((l) => {
        if (range === "all") return true;
        if (!l.created_at) return false;
        return new Date(l.created_at).getTime() >= cutoff;
      })
      .filter((l) => {
        const has = (l.attachments?.length ?? 0) > 0;
        if (fileFilter === "missing") return !has;
        if (fileFilter === "has") return has;
        return true;
      })
      .filter((l) => (ratingFilter === "all" ? true : (l.responsiveness ?? "") === ratingFilter))
      .filter((l) =>
        pocFilter === "all" ? true : pocFilter === "__none" ? !l.poc : (l.poc ?? "") === pocFilter,
      )
      .filter((l) =>
        !q
          ? true
          : `${l.client ?? ""} ${l.industry ?? ""} ${l.business ?? ""} ${l.description ?? ""} ${l.email ?? ""} ${l.phone ?? ""} ${l.current_stage ?? ""} ${l.status ?? ""}`
              .toLowerCase()
              .includes(q),
      );
  }, [leads, tab, search, range, fileFilter, ratingFilter, pocFilter]);

  const stats = useMemo(() => {
    const att = leads.filter((l) => l.tab === "attended");
    const unatt = leads.filter((l) => l.tab === "unattended");
    const pipelineValue = att.reduce((s, l) => s + parseValue(l.estimated_value), 0);
    const missingFiles = leads.filter((l) => (l.attachments?.length ?? 0) === 0).length;
    return { att: att.length, unatt: unatt.length, pipelineValue, missingFiles };
  }, [leads]);

  const cols = tab === "attended" ? ATT_COLS : UNATT_COLS;

  async function saveDesc(lead: PipelineLead) {
    if (!descEdit) return;
    const value = descEdit.value;
    setDescSaving(true);
    const { error } = await pipelineLeadService.update(lead.id, { description: value });
    setDescSaving(false);
    if (error) { window.alert(error); return; }
    syncDescriptionToSheet({ tab: lead.tab, sl_no: lead.sl_no, client: lead.client, description: value });
    setDescEdit(null);
    void load();
  }

  async function onDelete(lead: PipelineLead) {
    if (!window.confirm(`Delete ${lead.client ?? "this lead"}? This cannot be undone.`)) return;
    const { error } = await pipelineLeadService.remove(lead.id);
    if (error) window.alert(error);
    else void load();
  }

  async function logout() {
    await pipelineAuth.logout();
    navigate("/dashboard/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-[#07080d] text-white">
      <Helmet>
        <title>Sales Pipeline | Boostmysites</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#07080d]/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-5 py-3 md:px-8">
          <div className="flex items-center gap-3">
            <img src="/bms-logo.png" alt="Boostmysites" className="size-8 rounded-lg bg-white p-1" />
            <h1 className="text-base font-semibold">Sales Pipeline</h1>
          </div>
          <button onClick={logout} className="rounded-lg border border-white/15 px-3 py-1.5 text-[13px] text-white/80 hover:bg-white/5">
            Log out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] px-5 py-6 md:px-8">
        {/* Summary */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Total leads", value: stats.att + stats.unatt },
            { label: "Pipeline value", value: formatINR(stats.pipelineValue) },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-white/12 bg-white/[0.03] p-4">
              <p className="text-[12px] uppercase tracking-wide text-white/45">{s.label}</p>
              <p className="mt-1 text-2xl font-semibold text-white">{s.value}</p>
            </div>
          ))}
          <button
            onClick={() => setFileFilter(fileFilter === "missing" ? "all" : "missing")}
            title="Leads with no PDF/image yet — click to filter"
            className={`rounded-xl border p-4 text-left transition-colors ${
              fileFilter === "missing"
                ? "border-amber-400/60 bg-amber-400/15"
                : "border-amber-400/25 bg-amber-400/[0.06] hover:bg-amber-400/10"
            }`}
          >
            <p className="text-[12px] uppercase tracking-wide text-amber-300/80">⚠ Missing file</p>
            <p className="mt-1 text-2xl font-semibold text-amber-200">{stats.missingFiles}</p>
          </button>
        </div>

        {/* Controls */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="rounded-lg border border-white/12 bg-white/[0.03] px-4 py-1.5 text-sm font-medium text-white">
            All leads <span className="ml-1 text-[12px] text-white/50">{rows.length}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={range}
              onChange={(e) => setRange(e.target.value as typeof range)}
              className="rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#4b78ff] focus:outline-none"
              title="Filter by date added"
            >
              <option value="all">All time</option>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
            <select
              value={fileFilter}
              onChange={(e) => setFileFilter(e.target.value as typeof fileFilter)}
              className="rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#4b78ff] focus:outline-none"
              title="Filter by attachment"
            >
              <option value="all">All files</option>
              <option value="missing">⚠ Missing file</option>
              <option value="has">Has file</option>
            </select>
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#4b78ff] focus:outline-none"
              title="Filter by responsiveness"
            >
              <option value="all">All ratings</option>
              {RATINGS.map((r) => (
                <option key={r.value} value={r.value}>{r.emoji} {r.short}</option>
              ))}
            </select>
            <select
              value={pocFilter}
              onChange={(e) => setPocFilter(e.target.value)}
              className="rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#4b78ff] focus:outline-none"
              title="Filter by POC"
            >
              <option value="all">All POC</option>
              <option value="__none">Unassigned</option>
              {POC_OPTIONS.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search…"
              className="w-[200px] rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-[#4b78ff] focus:outline-none"
            />
            <button onClick={() => exportCsv(rows, tab)} className="rounded-lg border border-white/15 px-3 py-2 text-[13px] text-white/80 hover:bg-white/5">
              Export CSV
            </button>
            <button
              onClick={() => setModal({ open: true, lead: null })}
              className="rounded-lg bg-[#4b78ff] px-3 py-2 text-[13px] font-semibold text-white hover:bg-[#3d63d8]"
            >
              + Add lead
            </button>
          </div>
        </div>

        {loadError ? (
          <div className="mb-4 rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-[13px] text-amber-200">
            {loadError}
          </div>
        ) : null}

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-white/12">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-white/[0.04] text-left text-[12px] uppercase tracking-wide text-white/50">
                <th className="px-3 py-3 font-medium">#</th>
                {cols.map((c) => (
                  <th key={c.key as string} className={`px-3 py-3 font-medium ${c.w ?? ""}`}>{c.label}</th>
                ))}
                <th className="px-3 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={cols.length + 2} className="px-3 py-10 text-center text-white/40">Loading…</td></tr>
              ) : rows.length === 0 ? (
                <tr><td colSpan={cols.length + 2} className="px-3 py-10 text-center text-white/40">No leads yet.</td></tr>
              ) : (
                rows.map((l, i) => (
                  <tr key={l.id} className="border-t border-white/8 align-top hover:bg-white/[0.02]">
                    <td className="px-3 py-3 text-white/40">{i + 1}</td>
                    {cols.map((c) => (
                      <td key={c.key as string} className={`px-3 py-3 text-white/85 ${c.w ?? ""}`}>
                        {c.key === "client" ? (
                          <button
                            onClick={() => setDetail(l)}
                            className="flex items-center gap-1.5 text-left font-medium hover:opacity-80"
                          >
                            {ratingOf(l.responsiveness) ? (
                              <span title={ratingOf(l.responsiveness)!.label}>{ratingOf(l.responsiveness)!.emoji}</span>
                            ) : null}
                            <span className={ratingOf(l.responsiveness)?.text ?? "text-white"}>{l.client || "—"}</span>
                            {(l.attachments?.length ?? 0) > 0 ? (
                              <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] text-white/60" title={`${l.attachments!.length} file(s)`}>
                                📎 {l.attachments!.length}
                              </span>
                            ) : (
                              <span
                                className="rounded-full border border-amber-400/40 bg-amber-400/10 px-1.5 py-0.5 text-[10px] font-medium text-amber-300"
                                title="No PDF/image yet — create one and send it to the client"
                              >
                                ⚠ No file
                              </span>
                            )}
                          </button>
                        ) : c.key === "description" ? (
                          descEdit?.id === l.id ? (
                            <div className="flex flex-col gap-1.5">
                              <textarea
                                autoFocus
                                rows={3}
                                value={descEdit.value}
                                onChange={(e) => setDescEdit({ id: l.id, value: e.target.value })}
                                className={`resize-none ${inputCls}`}
                              />
                              <div className="flex gap-2">
                                <button
                                  onClick={() => saveDesc(l)}
                                  disabled={descSaving}
                                  className="rounded-md bg-[#4b78ff] px-2.5 py-1 text-[12px] font-semibold text-white hover:bg-[#3d63d8] disabled:opacity-60"
                                >
                                  {descSaving ? "Saving…" : "Save"}
                                </button>
                                <button
                                  onClick={() => setDescEdit(null)}
                                  className="rounded-md border border-white/15 px-2.5 py-1 text-[12px] text-white/70 hover:bg-white/5"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-start gap-1.5">
                              <span className="min-w-0 flex-1 whitespace-pre-wrap break-words text-white/70">{l.description || "—"}</span>
                              <button
                                onClick={() => setDescEdit({ id: l.id, value: l.description ?? "" })}
                                title="Edit description"
                                className="shrink-0 rounded p-0.5 text-white/40 hover:text-[#7aa2ff]"
                              >
                                ✏️
                              </button>
                            </div>
                          )
                        ) : c.key === "poc" ? (
                          l.poc ? (
                            <span className="whitespace-nowrap rounded-full border border-[#4b78ff]/40 bg-[#4b78ff]/15 px-2 py-0.5 text-[12px] font-medium text-[#9dbaff]">
                              {l.poc}
                            </span>
                          ) : (
                            <span className="text-white/30">—</span>
                          )
                        ) : c.key === "created_at" ? (
                          <span className="whitespace-nowrap text-[13px] text-white/55" title={`Added ${formatDateTime(l.created_at)}`}>
                            {formatDate(l.created_at)}
                          </span>
                        ) : c.key === "email" ? (
                          <span className="whitespace-pre-wrap break-words text-white/70">{l.email || l.phone || "—"}</span>
                        ) : (
                          <span className="whitespace-pre-wrap break-words text-white/70">{(l[c.key] as string) || "—"}</span>
                        )}
                      </td>
                    ))}
                    <td className="px-3 py-3 text-right">
                      <div className="inline-flex gap-2.5">
                        <button onClick={() => setFilesModal(l)} className="text-[13px] text-white/70 hover:text-white">
                          📎 Files{(l.attachments?.length ?? 0) > 0 ? ` (${l.attachments!.length})` : ""}
                        </button>
                        <button onClick={() => setModal({ open: true, lead: l })} className="text-[13px] text-[#7aa2ff] hover:underline">Edit</button>
                        <button onClick={() => onDelete(l)} className="text-[13px] text-red-300/80 hover:underline">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {modal.open ? (
        <LeadModal
          tab={tab}
          lead={modal.lead}
          onClose={() => setModal({ open: false, lead: null })}
          onSaved={() => { setModal({ open: false, lead: null }); void load(); }}
          onChanged={() => void load()}
        />
      ) : null}

      {detail ? (
        <LeadDetailModal
          lead={detail}
          onClose={() => { setDetail(null); if (routeLeadId) navigate("/dashboard", { replace: true }); }}
          onEdit={() => { setModal({ open: true, lead: detail }); setDetail(null); }}
          onChanged={() => void load()}
        />
      ) : null}

      {filesModal ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
          <div className="my-8 w-full max-w-[520px] rounded-2xl border border-white/15 bg-[#0c1020] p-6">
            <div className="mb-1 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Files · {filesModal.client}</h2>
              <button onClick={() => setFilesModal(null)} className="text-white/50 hover:text-white" aria-label="Close">✕</button>
            </div>
            <p className="mb-3 text-[12px] text-white/45">Upload follow-up PDFs, chat screenshots, or images for this lead.</p>
            <AttachmentsSection lead={filesModal} onChanged={() => void load()} />
            <div className="mt-4 flex justify-end">
              <button onClick={() => setFilesModal(null)} className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/80 hover:bg-white/5">Done</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
