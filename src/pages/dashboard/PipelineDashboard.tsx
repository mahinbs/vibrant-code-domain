import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { pipelineAuth } from "@/services/pipelineAuth";
import {
  pipelineLeadService,
  PIPELINE_STAGES,
  LOST_STAGE,
  stageDef,
  stageIndex,
  followupCount,
  type PipelineStage,
  type FollowupProof,
  type PipelineAttachment,
  type PipelineLead,
  type PipelineTab,
} from "@/services/pipelineLeadService";
import { syncDescriptionToSheet } from "@/services/pipelineSheetSync";
import { PdfPreview } from "@/components/dashboard/PdfPreview";

const TABS: { key: PipelineTab; label: string }[] = [
  { key: "attended", label: "Attended" },
  { key: "unattended", label: "Unattended" },
];

/** Team members who can own a lead (point of contact). */
const POC_OPTIONS = ["Kavya", "Viaan", "Darshan", "Mahin", "Supreeth", "Reshab", "Sawan"];

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

function formatMeeting(v?: string | null): string {
  if (!v) return "";
  try {
    return new Date(v).toLocaleString("en-IN", {
      weekday: "short", day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit",
    });
  } catch {
    return v;
  }
}
function meetingTime(v?: string | null): number {
  if (!v) return 0;
  const t = new Date(v).getTime();
  return Number.isFinite(t) ? t : 0;
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
  const [uploader, setUploader] = useState<string>("");
  // Previews are open by default — collapse individually with "Hide".
  const [closedPreviews, setClosedPreviews] = useState<Set<string>>(new Set());
  const togglePreview = (path: string) =>
    setClosedPreviews((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });

  async function onFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    if (!uploader) {
      setErr("Select who is uploading (team member or AI) first.");
      return;
    }
    setErr(null);
    setUploading(true);
    let next = [...atts];
    for (const file of Array.from(files)) {
      if (file.size > 15 * 1024 * 1024) {
        setErr(`${file.name} is over 15 MB.`);
        continue;
      }
      const { attachment, error } = await pipelineLeadService.uploadAttachment(lead.id, file, uploader);
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
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <p className="text-[13px] font-medium text-white/80">Attachments</p>
        <div className="flex items-center gap-2">
          <select
            value={uploader}
            onChange={(e) => { setUploader(e.target.value); if (err) setErr(null); }}
            className="rounded-md border border-white/15 bg-black/40 px-2 py-1.5 text-[12px] text-white focus:border-[#4b78ff] focus:outline-none"
            title="Who is uploading this file?"
          >
            <option value="">Uploaded by…</option>
            {POC_OPTIONS.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
            <option value="AI">🤖 AI</option>
          </select>
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
      </div>
      <p className="mb-2 text-[11px] text-white/40">Follow-up PDF, chat screenshot, or image · up to 15 MB each</p>
      {atts.length === 0 ? (
        <p className="text-[12px] text-white/35">No files yet.</p>
      ) : (
        <ul className="flex flex-col gap-1.5">
          {atts.map((a) => {
            const canPreview = a.type.startsWith("image/") || a.type === "application/pdf";
            const isOpen = canPreview && !closedPreviews.has(a.path);
            return (
              <li key={a.path} className="rounded-md border border-white/10 bg-white/[0.03]">
                <div className="flex items-center gap-2 px-2.5 py-1.5">
                  <span className="text-[13px]">{a.type.startsWith("image/") ? "🖼️" : "📄"}</span>
                  <button
                    type="button"
                    onClick={() => (canPreview ? togglePreview(a.path) : window.open(a.url, "_blank"))}
                    className="min-w-0 flex-1 truncate text-left text-[12px] text-[#7aa2ff] hover:underline"
                    title={canPreview ? (isOpen ? "Hide preview" : "Show preview") : "Open"}
                  >
                    {a.name}
                  </button>
                  {a.uploaded_by ? (
                    <span
                      className={`whitespace-nowrap rounded-full border px-1.5 py-0.5 text-[10px] font-medium ${
                        a.uploaded_by === "AI"
                          ? "border-amber-400/50 bg-amber-400/15 text-amber-300"
                          : "border-white/15 bg-white/5 text-white/55"
                      }`}
                    >
                      {a.uploaded_by === "AI" ? "🤖 AI" : `by ${a.uploaded_by}`}
                    </span>
                  ) : null}
                  <span className="text-[11px] text-white/35">{formatSize(a.size)}</span>
                  {canPreview ? (
                    <button
                      type="button"
                      onClick={() => togglePreview(a.path)}
                      className="text-[12px] text-white/60 hover:text-white"
                    >
                      {isOpen ? "Hide" : "👁 Preview"}
                    </button>
                  ) : null}
                  <a
                    href={`${a.url}?download=${encodeURIComponent(a.name)}`}
                    className="text-[12px] text-white/60 hover:text-white"
                    title={`Download ${a.name}`}
                  >
                    ⬇ Download
                  </a>
                  <a href={a.url} target="_blank" rel="noopener noreferrer" className="text-[12px] text-white/45 hover:text-white" title="Open in new tab">↗</a>
                  <button onClick={() => removeAtt(a)} className="text-[12px] text-red-300/80 hover:underline" type="button">Remove</button>
                </div>
                {a.uploaded_by === "AI" ? (
                  <p className="border-t border-amber-400/20 bg-amber-400/10 px-2.5 py-1.5 text-[12px] text-amber-200">
                    ⚠️ 🤖 PDF created by AI — please send it to the client with a follow-up message on WhatsApp.
                  </p>
                ) : null}
                {isOpen ? (
                  <div className="border-t border-white/10 bg-black/40 p-2">
                    {a.type.startsWith("image/") ? (
                      <img src={a.url} alt={a.name} className="mx-auto max-h-[420px] w-auto max-w-full rounded-md object-contain" />
                    ) : (
                      <PdfPreview url={a.url} name={a.name} />
                    )}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
      {err ? <p className="mt-2 text-[12px] text-red-300/90">{err}</p> : null}
    </div>
  );
}

const MAX_FOLLOWUPS = 30;

/** Numbered follow-up proof log (up to 30) — each entry is an attachment + note/owner/date. */
function FollowupsSection({ lead, onChanged }: { lead: PipelineLead; onChanged?: () => void }) {
  const [items, setItems] = useState<FollowupProof[]>(lead.followups ?? []);
  const [note, setNote] = useState("");
  const [by, setBy] = useState("");
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  // New proofs are tagged by where the lead is in the pipeline:
  // before the meeting stage → pre-call (target 3); meeting onwards → post-meeting (target 7).
  const curPhase: "pre_call" | "post_meeting" =
    stageIndex(lead.pipeline_stage) >= stageIndex("meeting") ? "post_meeting" : "pre_call";
  const preCount = items.filter((f) => (f.phase ?? "pre_call") === "pre_call").length;
  const postCount = items.filter((f) => f.phase === "post_meeting").length;

  async function addFollowup(files: FileList | null) {
    if (!files || !files.length) return;
    if (items.length >= MAX_FOLLOWUPS) { setErr(`Maximum ${MAX_FOLLOWUPS} follow-ups reached.`); return; }
    const file = files[0];
    if (file.size > 15 * 1024 * 1024) { setErr(`${file.name} is over 15 MB.`); return; }
    setErr(null);
    setUploading(true);
    const { attachment, error } = await pipelineLeadService.uploadAttachment(lead.id, file, by || undefined);
    if (error || !attachment) { setErr(error || "Upload failed."); setUploading(false); return; }
    const entry: FollowupProof = {
      n: items.length + 1,
      note: note.trim() || null,
      by: by || null,
      at: new Date().toISOString(),
      file: attachment,
      phase: curPhase,
    };
    const next = [...items, entry];
    const { error: e2 } = await pipelineLeadService.update(lead.id, { followups: next });
    setUploading(false);
    if (e2) {
      setErr(/followups|column/.test(e2) ? "Follow-ups aren't set up yet — run the SQL in Supabase." : e2);
      return;
    }
    setItems(next);
    setNote("");
    onChanged?.();
  }

  async function removeFollowup(idx: number) {
    const entry = items[idx];
    await pipelineLeadService.removeAttachment(entry.file.path);
    const next = items.filter((_, i) => i !== idx).map((x, i) => ({ ...x, n: i + 1 }));
    const { error } = await pipelineLeadService.update(lead.id, { followups: next });
    if (error) { setErr(error); return; }
    setItems(next);
    onChanged?.();
  }

  return (
    <div className="rounded-lg border border-white/12 bg-black/30 p-3">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <p className="text-[13px] font-medium text-white/80">
          Follow-up proofs <span className="text-white/45">{items.length}/{MAX_FOLLOWUPS}</span>
        </p>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className={`rounded-full border px-2 py-0.5 text-[11px] font-medium tabular-nums ${preCount >= 3 ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300" : "border-cyan-400/40 bg-cyan-400/10 text-cyan-300"}`} title="Follow-ups before the call (target 3)">
            🔁 Pre-call {preCount}/3
          </span>
          <span className={`rounded-full border px-2 py-0.5 text-[11px] font-medium tabular-nums ${postCount >= 7 ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300" : "border-amber-400/40 bg-amber-400/10 text-amber-300"}`} title="Follow-ups after the meeting (target 7)">
            🔂 Post-meeting {postCount}/7
          </span>
          {items.length === 0 ? (
            <span className="rounded-full border border-red-400/45 bg-red-400/10 px-2 py-0.5 text-[11px] font-semibold text-red-300">⚠ Not started</span>
          ) : null}
        </div>
      </div>

      {items.length === 0 ? (
        <p className="mb-3 text-[12px] text-white/35">No follow-up proofs yet. Log each follow-up with its screenshot / PDF below.</p>
      ) : (
        <ol className="mb-3 flex flex-col gap-1.5">
          {items.map((f, idx) => (
            <li key={f.file.path} className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-2">
              <div className="flex items-center gap-2">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#4b78ff]/25 text-[11px] font-semibold text-[#9dbaff]">{f.n}</span>
                <span className="text-[13px]">{f.file.type.startsWith("image/") ? "🖼️" : "📄"}</span>
                <a href={f.file.url} target="_blank" rel="noopener noreferrer" className="min-w-0 flex-1 truncate text-[12px] text-[#7aa2ff] hover:underline">{f.file.name}</a>
                <span className={`rounded-full border px-1.5 py-0.5 text-[10px] font-medium ${(f.phase ?? "pre_call") === "post_meeting" ? "border-amber-400/40 bg-amber-400/10 text-amber-300" : "border-cyan-400/40 bg-cyan-400/10 text-cyan-300"}`} title={(f.phase ?? "pre_call") === "post_meeting" ? "After-meeting follow-up" : "Before-call follow-up"}>
                  {(f.phase ?? "pre_call") === "post_meeting" ? "🔂 post" : "🔁 pre"}
                </span>
                {f.by ? <span className="rounded-full border border-white/15 bg-white/5 px-1.5 py-0.5 text-[10px] text-white/55">{f.by === "AI" ? "🤖 AI" : f.by}</span> : null}
                <a href={`${f.file.url}?download=${encodeURIComponent(f.file.name)}`} className="text-[11px] text-white/50 hover:text-white" title="Download">⬇</a>
                <button onClick={() => removeFollowup(idx)} className="text-[11px] text-red-300/80 hover:underline" type="button">Remove</button>
              </div>
              {(f.note || f.at) ? (
                <p className="ml-7 mt-0.5 text-[11px] text-white/45">
                  {f.at ? formatDateTime(f.at) : ""}{f.note ? ` · ${f.note}` : ""}
                </p>
              ) : null}
            </li>
          ))}
        </ol>
      )}

      {items.length < MAX_FOLLOWUPS ? (
        <div className="flex flex-col gap-2 border-t border-white/10 pt-2">
          <div className="flex flex-wrap gap-2">
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={`Follow-up #${items.length + 1} note (e.g. WhatsApp reminder sent)`}
              className={`min-w-[160px] flex-1 ${inputCls}`}
            />
            <select value={by} onChange={(e) => setBy(e.target.value)} className={inputCls} style={{ maxWidth: 130 }} title="Done by">
              <option value="">By…</option>
              {POC_OPTIONS.map((n) => <option key={n} value={n}>{n}</option>)}
              <option value="AI">🤖 AI</option>
            </select>
            <label className="cursor-pointer whitespace-nowrap rounded-md bg-[#4b78ff] px-3 py-2 text-[12px] font-semibold text-white hover:bg-[#3d63d8]">
              {uploading ? "Uploading…" : "+ Add proof"}
              <input type="file" accept="application/pdf,image/*" className="hidden" disabled={uploading} onChange={(e) => addFollowup(e.target.files)} />
            </label>
          </div>
          <p className="text-[11px] text-white/35">
            Attach the screenshot / PDF of this follow-up · up to 15 MB · counts toward{" "}
            <span className={curPhase === "post_meeting" ? "font-semibold text-amber-300" : "font-semibold text-cyan-300"}>
              {curPhase === "post_meeting" ? "🔂 post-meeting (7)" : "🔁 pre-call (3)"}
            </span>
          </p>
        </div>
      ) : (
        <p className="text-[12px] text-emerald-300/80">All {MAX_FOLLOWUPS} follow-up slots used.</p>
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
      meeting_at: (lead?.meeting_at as string) ?? "",
      meeting_notes: (lead?.meeting_notes as string) ?? "",
      meeting_owner: (lead?.meeting_owner as string) ?? "",
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
    if (!form.poc) return setError("POC is required — select who owns this lead.");
    setSaving(true);
    try {
    // Save responsiveness + website + poc + meeting separately (best-effort) so
    // a missing column can't block the whole save before the ALTER is run.
    const { responsiveness, website, poc, meeting_at, meeting_notes, meeting_owner, ...fields } = form;
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
      if (
        (meeting_at ?? "") !== (lead?.meeting_at ?? "") ||
        (meeting_notes ?? "") !== (lead?.meeting_notes ?? "") ||
        (meeting_owner ?? "") !== (lead?.meeting_owner ?? "")
      ) {
        try {
          await pipelineLeadService.update(leadId, {
            meeting_at: meeting_at || null,
            meeting_notes: meeting_notes || null,
            meeting_owner: meeting_owner || null,
          });
        } catch { /* columns may not exist yet */ }
      }
    }
    if (saveError) {
      setError(
        saveError.includes("pipeline_leads") || saveError.includes("relation")
          ? "The pipeline_leads table isn't set up yet — run the SQL in Supabase first."
          : saveError,
      );
      return;
    }
    try {
      syncDescriptionToSheet({
        tab,
        sl_no: lead?.sl_no ?? null,
        client: form.client ?? null,
        description: form.description ?? "",
      });
    } catch { /* sheet sync is best-effort */ }
    onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't save — check your connection and try again.");
    } finally {
      setSaving(false);
    }
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
            POC (point of contact) *
            <select
              value={form.poc ?? ""}
              onChange={(e) => setForm((p) => ({ ...p, poc: e.target.value }))}
              className={`mt-1 ${inputCls}`}
            >
              <option value="">— Select POC —</option>
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
          <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
            <label className="text-[13px] text-white/70">
              📅 Meeting scheduled
              <input
                type="datetime-local"
                value={form.meeting_at ?? ""}
                onChange={(e) => setForm((p) => ({ ...p, meeting_at: e.target.value }))}
                onClick={(e) => e.currentTarget.showPicker?.()}
                className={`mt-1 cursor-pointer [color-scheme:dark] ${inputCls}`}
              />
            </label>
            <label className="text-[13px] text-white/70">
              Meeting taken by
              <select
                value={form.meeting_owner ?? ""}
                onChange={(e) => setForm((p) => ({ ...p, meeting_owner: e.target.value }))}
                className={`mt-1 ${inputCls}`}
              >
                <option value="">— Select —</option>
                {POC_OPTIONS.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="text-[13px] text-white/70">
            Meeting notes
            <input
              value={form.meeting_notes ?? ""}
              onChange={(e) => setForm((p) => ({ ...p, meeting_notes: e.target.value }))}
              placeholder="Agenda, link, location…"
              className={`mt-1 ${inputCls}`}
            />
          </label>
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

/** Horizontal 6-step pipeline stepper with manual advance (skipping allowed) + Lost off-ramp. */
function StageStepper({ lead, onChanged }: { lead: PipelineLead; onChanged: () => void }) {
  const [stage, setStage] = useState<PipelineStage>((lead.pipeline_stage as PipelineStage) ?? "lead");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const idx = stage === "lost" ? -1 : stageIndex(stage);
  const preCount = followupCount(lead, "pre_call");
  const postCount = followupCount(lead, "post_meeting");

  async function moveTo(v: PipelineStage) {
    if (saving || v === stage) return;
    const prev = stage;
    setStage(v);
    setSaving(true);
    setErr(null);
    const { error } = await pipelineLeadService.update(lead.id, { pipeline_stage: v });
    setSaving(false);
    if (error) {
      setStage(prev);
      setErr(/pipeline_stage|column/i.test(error) ? "Stages aren't set up yet — run the pipeline_stage SQL in Supabase." : error);
      return;
    }
    onChanged();
  }

  const counterFor = (v: PipelineStage) =>
    v === "pre_call" ? `${preCount}/3` : v === "post_meeting" ? `${postCount}/7` : null;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-wide text-white/40">Pipeline stage</p>
        {stage === "lost" ? (
          <button onClick={() => moveTo("lead")} className="text-[11px] font-semibold text-[#7aa2ff] hover:underline">↩ Reopen as Lead</button>
        ) : (
          <button onClick={() => moveTo("lost")} className="text-[11px] font-semibold text-red-300/80 hover:text-red-300 hover:underline">✕ Mark Lost</button>
        )}
      </div>

      {stage === "lost" ? (
        <div className="rounded-lg border border-red-400/40 bg-red-400/10 px-3 py-2.5 text-[13px] font-semibold text-red-300">
          ✕ This lead is marked Lost. Reopen it to continue the pipeline.
        </div>
      ) : (
        <div className="flex items-start">
          {PIPELINE_STAGES.map((s, i) => {
            const done = i < idx;
            const current = i === idx;
            const counter = counterFor(s.value);
            const underTarget = current && s.target != null && (s.value === "pre_call" ? preCount : postCount) < s.target;
            return (
              <div key={s.value} className="flex min-w-0 flex-1 flex-col items-center">
                <div className="flex w-full items-center">
                  <div className={`h-0.5 flex-1 ${i === 0 ? "opacity-0" : done || current ? s.dot : "bg-white/10"}`} />
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => moveTo(s.value)}
                    title={`${s.label}${counter ? ` · ${counter}` : ""} — click to set stage`}
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full border text-[13px] transition-all ${
                      done
                        ? `border-transparent ${s.dot} text-white`
                        : current
                          ? `border-white/70 bg-white/10 ring-2 ring-white/25 ${underTarget ? "ring-amber-400/60" : ""}`
                          : "border-white/15 bg-white/[0.03] text-white/40 hover:border-white/40 hover:text-white"
                    }`}
                  >
                    {done ? "✓" : s.icon}
                  </button>
                  <div className={`h-0.5 flex-1 ${i === PIPELINE_STAGES.length - 1 ? "opacity-0" : done ? PIPELINE_STAGES[i + 1].dot : "bg-white/10"}`} />
                </div>
                <p className={`mt-1.5 px-0.5 text-center text-[10px] leading-tight ${current ? "font-bold text-white" : done ? "text-white/70" : "text-white/35"}`}>
                  {s.short}
                </p>
                {counter ? (
                  <p className={`text-[10px] font-semibold tabular-nums ${current && underTarget ? "text-amber-300" : "text-white/45"}`}>{counter}</p>
                ) : null}
              </div>
            );
          })}
        </div>
      )}

      {/* Stage-aware next action */}
      {stage !== "lost" && stage !== "sale" ? (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {stage === "pre_call" && preCount < 3 ? (
            <span className="text-[12px] text-amber-300/90">⚠ {3 - preCount} more follow-up{3 - preCount === 1 ? "" : "s"} before the call — attach proof below.</span>
          ) : stage === "post_meeting" && postCount < 7 ? (
            <span className="text-[12px] text-amber-300/90">⚠ {7 - postCount} more follow-up{7 - postCount === 1 ? "" : "s"} after the meeting — attach proof below.</span>
          ) : null}
          <button
            onClick={() => moveTo(PIPELINE_STAGES[Math.min(idx + 1, PIPELINE_STAGES.length - 1)].value)}
            disabled={saving}
            className="ml-auto rounded-lg bg-[#4b78ff] px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-[#3d63d8] disabled:opacity-60"
          >
            {saving ? "Saving…" : `${PIPELINE_STAGES[Math.min(idx + 1, PIPELINE_STAGES.length - 1)].icon} Mark ${PIPELINE_STAGES[Math.min(idx + 1, PIPELINE_STAGES.length - 1)].short} →`}
          </button>
        </div>
      ) : null}
      {err ? <p className="mt-2 text-[12px] text-red-300/90">{err}</p> : null}
    </div>
  );
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
          {/* Pipeline stage stepper */}
          <div className="border-t border-white/10 pt-5">
            <StageStepper lead={lead} onChanged={onChanged} />
          </div>

          {/* POC */}
          <div className="mt-5 border-t border-white/10 pt-5">
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

          {/* Follow-up proof log (up to 30) */}
          <div className="mt-5 border-t border-white/10 pt-5">
            <FollowupsSection lead={lead} onChanged={onChanged} />
          </div>

          {/* Meeting */}
          {lead.meeting_at ? (
            <div className="mt-5 border-t border-white/10 pt-5">
              <p className="mb-1.5 text-[11px] uppercase tracking-wide text-white/40">📅 Meeting scheduled</p>
              <p className="text-[15px] font-medium text-emerald-300">
                {formatMeeting(lead.meeting_at)}
                {lead.meeting_owner ? (
                  <span className="ml-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2 py-0.5 text-[12px] font-medium">
                    🎙 Taken by {lead.meeting_owner}
                  </span>
                ) : null}
              </p>
              {lead.meeting_notes ? (
                <p className="mt-1 text-[13px] text-white/60">{lead.meeting_notes}</p>
              ) : null}
            </div>
          ) : null}

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

/** Schedule a meeting by picking an existing lead. */
function ScheduleMeetingModal({
  leads,
  onClose,
  onSaved,
}: {
  leads: PipelineLead[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const [leadId, setLeadId] = useState<string>("");
  const [when, setWhen] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [owner, setOwner] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const options = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads
      .filter((l) => (l.client ?? "").trim())
      .filter((l) => (!q ? true : `${l.client ?? ""} ${l.industry ?? ""} ${l.poc ?? ""}`.toLowerCase().includes(q)))
      .sort((a, b) => (a.client ?? "").localeCompare(b.client ?? ""));
  }, [leads, query]);

  const chosen = leads.find((l) => l.id === leadId) ?? null;

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!leadId) return setError("Pick a lead first — meetings are always attached to an existing lead.");
    if (!when) return setError("Pick a date & time for the meeting.");
    if (!owner) return setError("Pick who is taking the meeting.");
    setSaving(true);
    const { error: err } = await pipelineLeadService.update(leadId, {
      meeting_at: when,
      meeting_notes: notes.trim() || null,
      meeting_owner: owner,
    });
    setSaving(false);
    if (err) {
      setError(/meeting_at|column/.test(err) ? "Meeting columns aren't set up yet — run the meetings SQL in Supabase." : err);
      return;
    }
    onSaved();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
      <div className="my-8 w-full max-w-[520px] rounded-2xl border border-white/15 bg-[#0c1020] p-6">
        <div className="mb-1 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">📅 Schedule meeting</h2>
          <button onClick={onClose} className="text-white/50 hover:text-white" aria-label="Close">✕</button>
        </div>
        <p className="mb-4 text-[12px] text-white/45">
          Pick one of your existing leads — if the client isn&apos;t in the leads list yet, add them there first.
        </p>
        <form onSubmit={submit} className="flex flex-col gap-3">
          <label className="text-[13px] text-white/70">
            Find lead
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type to filter leads…"
              className={`mt-1 ${inputCls}`}
            />
          </label>
          <label className="text-[13px] text-white/70">
            Lead *
            <select value={leadId} onChange={(e) => setLeadId(e.target.value)} className={`mt-1 ${inputCls}`}>
              <option value="">— Select a lead ({options.length}) —</option>
              {options.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.client}{l.poc ? ` · POC ${l.poc}` : ""}{l.meeting_at ? " · has meeting" : ""}
                </option>
              ))}
            </select>
          </label>
          {chosen ? (
            <div className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-[12px] text-white/55">
              {chosen.industry || chosen.business || "—"}
              {chosen.email || chosen.phone ? ` · ${chosen.email || chosen.phone}` : ""}
              {chosen.meeting_at ? (
                <span className="text-amber-300"> · already has a meeting on {formatMeeting(chosen.meeting_at)} (will be replaced)</span>
              ) : null}
            </div>
          ) : null}
          <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
            <label className="text-[13px] text-white/70">
              Date &amp; time *
              <input
                type="datetime-local"
                value={when}
                onChange={(e) => setWhen(e.target.value)}
                onClick={(e) => e.currentTarget.showPicker?.()}
                className={`mt-1 cursor-pointer [color-scheme:dark] ${inputCls}`}
              />
            </label>
            <label className="text-[13px] text-white/70">
              Meeting taken by *
              <select value={owner} onChange={(e) => setOwner(e.target.value)} className={`mt-1 ${inputCls}`}>
                <option value="">— Select —</option>
                {POC_OPTIONS.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="text-[13px] text-white/70">
            Notes
            <input
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Agenda, meet link, location…"
              className={`mt-1 ${inputCls}`}
            />
          </label>
          {error ? <p className="text-[13px] text-red-300/90">{error}</p> : null}
          <div className="mt-2 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="rounded-lg border border-white/15 px-4 py-2.5 text-sm text-white/80 hover:bg-white/5">Cancel</button>
            <button type="submit" disabled={saving} className="rounded-lg bg-[#4b78ff] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#3d63d8] disabled:opacity-60">
              {saving ? "Scheduling…" : "Schedule meeting"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/** Daily team report — per-person activity computed from lead data. */
function DailyReport({ leads }: { leads: PipelineLead[] }) {
  const [win, setWin] = useState<"today" | "yesterday" | "7">("today");

  const { rows, totals, label } = useMemo(() => {
    const now = Date.now();
    const midnight = new Date();
    midnight.setHours(0, 0, 0, 0);
    let start: number, end: number, label: string;
    if (win === "today") { start = midnight.getTime(); end = now; label = "Today"; }
    else if (win === "yesterday") { end = midnight.getTime(); start = end - 86400000; label = "Yesterday"; }
    else { start = now - 7 * 86400000; end = now; label = "Last 7 days"; }
    const inWin = (iso?: string | null) => {
      if (!iso) return false;
      const t = new Date(iso).getTime();
      return Number.isFinite(t) && t >= start && t < end;
    };

    const rows = POC_OPTIONS.map((name) => {
      const owned = leads.filter((l) => l.poc === name);
      const updated = owned.filter((l) => inWin(l.updated_at)).length;
      const added = owned.filter((l) => inWin(l.created_at)).length;
      const meetingsTaken = leads.filter(
        (l) => l.meeting_owner === name && l.meeting_at && inWin(l.meeting_at) && meetingTime(l.meeting_at) <= now,
      ).length;
      const meetingsUpcoming = leads.filter(
        (l) => l.meeting_owner === name && meetingTime(l.meeting_at) > now,
      ).length;
      const hotTotal = owned.filter((l) => l.responsiveness === "hot").length;
      const hotNew = owned.filter((l) => l.responsiveness === "hot" && inWin(l.updated_at)).length;
      const filesUploaded = owned.filter(
        (l) => (l.attachments ?? []).some((a) => inWin(a.uploaded_at)),
      ).length;
      const score = updated + added + meetingsTaken * 3 + hotNew * 2 + filesUploaded;
      return { name, owned: owned.length, updated, added, meetingsTaken, meetingsUpcoming, hotTotal, hotNew, filesUploaded, score };
    }).sort((a, b) => b.score - a.score);

    const totals = {
      updated: leads.filter((l) => inWin(l.updated_at)).length,
      added: leads.filter((l) => inWin(l.created_at)).length,
      meetingsConducted: leads.filter((l) => l.meeting_at && inWin(l.meeting_at) && meetingTime(l.meeting_at) <= now).length,
      meetingsUpcoming: leads.filter((l) => meetingTime(l.meeting_at) > now).length,
      hotNew: leads.filter((l) => l.responsiveness === "hot" && inWin(l.updated_at)).length,
      hotTotal: leads.filter((l) => l.responsiveness === "hot").length,
    };
    return { rows, totals, label };
  }, [leads, win]);

  const top = rows[0]?.score > 0 ? rows[0] : null;

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-white">📊 Team report · {label}</h2>
        <div className="inline-flex rounded-lg border border-white/12 bg-white/[0.03] p-1">
          {([["today", "Today"], ["yesterday", "Yesterday"], ["7", "Last 7 days"]] as const).map(([k, lbl]) => (
            <button
              key={k}
              onClick={() => setWin(k)}
              className={`rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors ${
                win === k ? "bg-[#4b78ff] text-white" : "text-white/60 hover:text-white"
              }`}
            >
              {lbl}
            </button>
          ))}
        </div>
      </div>

      {/* Day totals */}
      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {[
          { label: "Leads updated", value: totals.updated },
          { label: "New leads added", value: totals.added },
          { label: "Meetings conducted", value: totals.meetingsConducted },
          { label: "Meetings upcoming", value: totals.meetingsUpcoming },
          { label: "🔥 New hot leads", value: totals.hotNew },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-white/12 bg-white/[0.03] p-4">
            <p className="text-[11px] uppercase tracking-wide text-white/45">{s.label}</p>
            <p className="mt-1 text-2xl font-semibold text-white">{s.value}</p>
          </div>
        ))}
      </div>

      {top ? (
        <div className="mb-4 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4">
          <p className="text-[14px] text-emerald-200">
            🏆 <span className="font-semibold">{top.name}</span> is leading {label.toLowerCase()} —{" "}
            {top.updated} lead update{top.updated === 1 ? "" : "s"}, {top.meetingsTaken} meeting{top.meetingsTaken === 1 ? "" : "s"} taken,
            {" "}{top.hotNew} new hot lead{top.hotNew === 1 ? "" : "s"}.
          </p>
        </div>
      ) : (
        <div className="mb-4 rounded-xl border border-white/12 bg-white/[0.03] p-4 text-[13px] text-white/50">
          No activity recorded {label.toLowerCase()} yet.
        </div>
      )}

      {/* Per-person table */}
      <div className="overflow-x-auto rounded-xl border border-white/12">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-white/[0.04] text-left text-[12px] uppercase tracking-wide text-white/50">
              <th className="px-3 py-3 font-medium">Rank</th>
              <th className="px-3 py-3 font-medium">Team member</th>
              <th className="px-3 py-3 font-medium">Leads owned</th>
              <th className="px-3 py-3 font-medium">Updated</th>
              <th className="px-3 py-3 font-medium">New leads</th>
              <th className="px-3 py-3 font-medium">Meetings taken</th>
              <th className="px-3 py-3 font-medium">Upcoming</th>
              <th className="px-3 py-3 font-medium">🔥 Hot (new)</th>
              <th className="px-3 py-3 font-medium">Files</th>
              <th className="px-3 py-3 font-medium">Score</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.name} className={`border-t border-white/8 ${i === 0 && r.score > 0 ? "bg-emerald-400/[0.06]" : ""}`}>
                <td className="px-3 py-3 text-white/50">{i === 0 && r.score > 0 ? "🏆" : `#${i + 1}`}</td>
                <td className="px-3 py-3 font-medium text-white">{r.name}</td>
                <td className="px-3 py-3 text-white/70">{r.owned}</td>
                <td className="px-3 py-3 text-white/70">{r.updated}</td>
                <td className="px-3 py-3 text-white/70">{r.added}</td>
                <td className="px-3 py-3 text-white/70">{r.meetingsTaken}</td>
                <td className="px-3 py-3 text-white/70">{r.meetingsUpcoming}</td>
                <td className="px-3 py-3 text-white/70">{r.hotTotal}{r.hotNew ? <span className="text-orange-300"> (+{r.hotNew})</span> : ""}</td>
                <td className="px-3 py-3 text-white/70">{r.filesUploaded}</td>
                <td className="px-3 py-3 font-semibold text-white">{r.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[11px] text-white/35">
        Score = lead updates + new leads + meetings taken ×3 + new hot leads ×2 + files uploaded. Unassigned-lead activity isn&apos;t attributed to anyone.
      </p>
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

/* ---------- Redesign helpers ---------- */

const POC_PALETTE = ["#4b78ff", "#7c5cff", "#00b8a9", "#f59e0b", "#ec4899", "#10b981", "#38bdf8", "#f43f5e"];
function pocColor(name?: string | null): string {
  if (!name) return "#64748b";
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return POC_PALETTE[h % POC_PALETTE.length];
}

function PocCell({ name }: { name?: string | null }) {
  if (!name) return <span className="text-white/30">—</span>;
  const c = pocColor(name);
  return (
    <span className="inline-flex items-center gap-2">
      <span className="flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white" style={{ backgroundColor: c }}>
        {name[0].toUpperCase()}
      </span>
      <span className="text-[13px] font-medium text-white/85">{name}</span>
    </span>
  );
}

/** Colour a stage badge by matching keywords in the free-text stage. */
function stageBadge(stage?: string | null): { cls: string; label: string } {
  const s = (stage ?? "").toLowerCase();
  const map: [RegExp, string][] = [
    [/won|closed win|close won/, "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"],
    [/lost|dead|drop/, "border-red-400/40 bg-red-400/10 text-red-300"],
    [/negotiat/, "border-orange-400/40 bg-orange-400/10 text-orange-300"],
    [/propos|pricing|quote/, "border-violet-400/40 bg-violet-400/10 text-violet-300"],
    [/qualif/, "border-cyan-400/40 bg-cyan-400/10 text-cyan-300"],
    [/discov|new|contact|prospect/, "border-blue-400/40 bg-blue-400/10 text-blue-300"],
  ];
  const hit = map.find(([re]) => re.test(s));
  return { cls: hit ? hit[1] : "border-white/15 bg-white/5 text-white/60", label: stage || "—" };
}

function NavItem({ icon, label, active, badge, onClick }: { icon: string; label: string; active?: boolean; badge?: string | number; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-[13.5px] transition-colors ${
        active ? "bg-[#4b78ff]/15 font-semibold text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
      }`}
    >
      <span className={`w-5 text-center text-[15px] ${active ? "" : "opacity-80"}`}>{icon}</span>
      <span className="flex-1 truncate">{label}</span>
      {badge != null ? (
        <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${active ? "bg-[#4b78ff] text-white" : "bg-white/10 text-white/60"}`}>{badge}</span>
      ) : null}
      {active ? <span className="h-1.5 w-1.5 rounded-full bg-[#4b78ff]" /> : null}
    </button>
  );
}

function StatCard({ icon, tint, label, value, sub, subTone, onClick, active }: {
  icon: string; tint: string; label: string; value: string | number; sub?: string; subTone?: string; onClick?: () => void; active?: boolean;
}) {
  const Comp = onClick ? "button" : "div";
  return (
    <Comp
      onClick={onClick}
      className={`flex items-start gap-4 rounded-2xl border p-4 text-left transition-colors ${
        active ? "border-[#4b78ff]/50 bg-[#4b78ff]/10" : "border-white/10 bg-white/[0.03]"
      } ${onClick ? "hover:border-white/20 hover:bg-white/[0.05]" : ""}`}
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl text-[20px]" style={{ backgroundColor: tint }}>{icon}</span>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-white/45">{label}</p>
        <p className="mt-0.5 text-[22px] font-bold leading-tight text-white">{value}</p>
        {sub ? <p className={`mt-0.5 text-[12px] font-medium ${subTone ?? "text-white/45"}`}>{sub}</p> : null}
      </div>
    </Comp>
  );
}

function RailCard({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[11px] font-bold uppercase tracking-wider text-white/50">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
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
  const [stageFilter, setStageFilter] = useState<string>("all");
  const [view, setView] = useState<"leads" | "meetings" | "report">("leads");
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [modal, setModal] = useState<{ open: boolean; lead: PipelineLead | null }>({ open: false, lead: null });
  const [detail, setDetail] = useState<PipelineLead | null>(null);
  const [filesModal, setFilesModal] = useState<PipelineLead | null>(null);
  const [navOpen, setNavOpen] = useState(false);

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
      .filter((l) => (stageFilter === "all" ? true : (l.pipeline_stage ?? "lead") === stageFilter))
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
  }, [leads, tab, search, range, fileFilter, ratingFilter, pocFilter, stageFilter]);

  const meetings = useMemo(() => {
    const q = search.trim().toLowerCase();
    return leads
      .filter((l) => l.meeting_at)
      .filter((l) => (!q ? true : `${l.client ?? ""} ${l.poc ?? ""} ${l.meeting_notes ?? ""}`.toLowerCase().includes(q)))
      .sort((a, b) => meetingTime(a.meeting_at) - meetingTime(b.meeting_at));
  }, [leads, search]);

  const stats = useMemo(() => {
    const att = leads.filter((l) => l.tab === "attended");
    const unatt = leads.filter((l) => l.tab === "unattended");
    const pipelineValue = att.reduce((s, l) => s + parseValue(l.estimated_value), 0);
    const missingFiles = leads.filter((l) => (l.attachments?.length ?? 0) === 0).length;
    const now = Date.now();
    const upcomingMeetings = leads.filter((l) => l.meeting_at && meetingTime(l.meeting_at) >= now).length;
    return { att: att.length, unatt: unatt.length, pipelineValue, missingFiles, upcomingMeetings };
  }, [leads]);

  // Right-rail: structured 6-stage funnel + conversion (+ lost).
  const overview = useMemo(() => {
    const counts = new Map<string, number>();
    for (const l of leads) {
      const s = (l.pipeline_stage as string) || "lead";
      counts.set(s, (counts.get(s) ?? 0) + 1);
    }
    const list = PIPELINE_STAGES.map((s) => ({ def: s, n: counts.get(s.value) ?? 0 }));
    const lost = counts.get("lost") ?? 0;
    const won = counts.get("sale") ?? 0;
    const max = list.reduce((m, x) => Math.max(m, x.n), 1);
    const conversion = leads.length ? Math.round((won / leads.length) * 1000) / 10 : 0;
    return { list, max, conversion, won, lost };
  }, [leads]);

  const upcomingTasks = useMemo(() => {
    const now = Date.now();
    return leads
      .filter((l) => l.meeting_at && meetingTime(l.meeting_at) >= now)
      .sort((a, b) => meetingTime(a.meeting_at) - meetingTime(b.meeting_at))
      .slice(0, 4);
  }, [leads]);

  const recentActivity = useMemo(() => {
    return [...leads]
      .filter((l) => l.updated_at || l.created_at)
      .sort((a, b) => new Date(b.updated_at || b.created_at || 0).getTime() - new Date(a.updated_at || a.created_at || 0).getTime())
      .slice(0, 4);
  }, [leads]);

  const quickStats = useMemo(() => {
    const weekAgo = Date.now() - 7 * 86400000;
    const now = Date.now();
    const leadsThisWeek = leads.filter((l) => l.created_at && new Date(l.created_at).getTime() >= weekAgo).length;
    const meetingsHeld = leads.filter((l) => l.meeting_at && meetingTime(l.meeting_at) <= now).length;
    const filesTotal = leads.reduce((s, l) => s + (l.attachments?.length ?? 0), 0);
    const followupsTotal = leads.reduce((s, l) => s + (l.followups?.length ?? 0), 0);
    return { leadsThisWeek, meetingsHeld, filesTotal, followupsTotal };
  }, [leads]);

  const addedThisMonth = useMemo(() => {
    const monthAgo = Date.now() - 30 * 86400000;
    return leads.filter((l) => l.created_at && new Date(l.created_at).getTime() >= monthAgo).length;
  }, [leads]);

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
    <div className="min-h-screen bg-[#070b14] text-white">
      <Helmet>
        <title>Sales Pipeline | Boostmysites</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      {/* Slim horizontal scrollers for long lead cells */}
      <style>{`
        .hscroll { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.28) transparent; }
        .hscroll::-webkit-scrollbar { height: 5px; }
        .hscroll::-webkit-scrollbar-track { background: transparent; }
        .hscroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.22); border-radius: 9999px; }
        .hscroll:hover::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.4); }
      `}</style>

      {/* Mobile sidebar backdrop */}
      {navOpen ? <div onClick={() => setNavOpen(false)} className="fixed inset-0 z-30 bg-black/60 lg:hidden" /> : null}

      <div className="flex">
        {/* ===== Sidebar ===== */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 flex w-[248px] flex-col border-r border-white/8 bg-[#0a0f1c] transition-transform lg:static lg:translate-x-0 ${
            navOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center gap-2.5 px-5 py-4">
            <img src="/bms-logo.png" alt="Boostmysites" className="size-8 rounded-lg bg-white p-1" />
            <span className="text-[15px] font-bold tracking-tight">BOOSTMYSITES</span>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
            <NavItem icon="🏠" label="Dashboard" active={view === "leads" && fileFilter !== "missing"} onClick={() => { setView("leads"); setFileFilter("all"); setPocFilter("all"); setNavOpen(false); }} />
            <NavItem icon="👥" label="All Leads" badge={stats.att + stats.unatt} active={view === "leads" && fileFilter !== "missing"} onClick={() => { setView("leads"); setFileFilter("all"); setNavOpen(false); }} />
            <NavItem icon="📅" label="Meetings" badge={meetings.length} active={view === "meetings"} onClick={() => { setView("meetings"); setNavOpen(false); }} />
            <NavItem icon="📊" label="Reports" active={view === "report"} onClick={() => { setView("report"); setNavOpen(false); }} />
            <NavItem icon="📁" label="Missing files" badge={stats.missingFiles} active={view === "leads" && fileFilter === "missing"} onClick={() => { setView("leads"); setFileFilter("missing"); setNavOpen(false); }} />
            <Link to="/dashboard/invoice" onClick={() => setNavOpen(false)} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13.5px] text-white/60 transition-colors hover:bg-white/5 hover:text-white">
              <span className="w-5 text-center text-[15px] opacity-80">🧾</span>
              <span className="flex-1">Invoice</span>
            </Link>

            <p className="px-3 pb-1 pt-4 text-[10px] font-bold uppercase tracking-wider text-white/35">Team · POC</p>
            <NavItem icon="🌐" label="Everyone" active={pocFilter === "all"} onClick={() => { setView("leads"); setPocFilter("all"); setNavOpen(false); }} />
            {POC_OPTIONS.map((n) => (
              <button
                key={n}
                onClick={() => { setView("leads"); setPocFilter(n); setNavOpen(false); }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-[13.5px] transition-colors ${
                  pocFilter === n ? "bg-white/8 font-semibold text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: pocColor(n) }}>{n[0]}</span>
                <span className="flex-1 truncate">{n}</span>
                <span className="text-[11px] text-white/40">{leads.filter((l) => l.poc === n).length}</span>
              </button>
            ))}
          </nav>

          <div className="m-3 rounded-xl border border-[#4b78ff]/25 bg-gradient-to-br from-[#4b78ff]/15 to-transparent p-4">
            <p className="text-[13px] font-semibold text-white">Add a new lead</p>
            <p className="mt-0.5 text-[11.5px] text-white/50">Capture a prospect in seconds.</p>
            <button onClick={() => { setModal({ open: true, lead: null }); setNavOpen(false); }} className="mt-2.5 w-full rounded-lg bg-[#4b78ff] px-3 py-2 text-[12.5px] font-semibold text-white hover:bg-[#3d63d8]">+ Add Lead</button>
          </div>
        </aside>

        {/* ===== Right of sidebar ===== */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Top bar */}
          <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-white/8 bg-[#070b14]/90 px-4 py-3 backdrop-blur md:px-6 xl:px-8">
            <div className="flex items-center gap-3">
              <button onClick={() => setNavOpen(true)} className="rounded-lg border border-white/12 p-1.5 text-white/70 hover:bg-white/5 lg:hidden" aria-label="Menu">☰</button>
              <h1 className="text-lg font-bold tracking-tight">Sales Pipeline</h1>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setModal({ open: true, lead: null })} className="rounded-lg bg-[#4b78ff] px-3.5 py-2 text-[13px] font-semibold text-white hover:bg-[#3d63d8]">+ Add Lead</button>
              <Link to="/dashboard/invoice" className="hidden items-center gap-1.5 rounded-lg border border-white/12 px-3 py-2 text-[13px] text-white/80 hover:bg-white/5 sm:inline-flex">🧾 Invoice</Link>
              <button onClick={() => setView("meetings")} title={`${stats.upcomingMeetings} upcoming meetings`} className="relative rounded-lg border border-white/12 p-2 text-white/70 hover:bg-white/5">
                🔔
                {stats.upcomingMeetings > 0 ? <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-[#f43f5e] text-[9px] font-bold text-white">{stats.upcomingMeetings}</span> : null}
              </button>
              <button onClick={logout} title="Log out" className="flex size-9 items-center justify-center rounded-full bg-[#4b78ff] text-[13px] font-bold text-white hover:bg-[#3d63d8]">S</button>
            </div>
          </header>

          <div className="flex flex-1 gap-5 px-4 py-5 md:px-6 xl:px-8">
            {/* ===== Main column ===== */}
            <main className="min-w-0 flex-1">
        {/* Stat cards */}
        <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard icon="👥" tint="rgba(75,120,255,0.15)" label="Total Leads" value={stats.att + stats.unatt} sub={`↑ ${addedThisMonth} added · last 30 days`} subTone="text-emerald-400" />
          <StatCard icon="💰" tint="rgba(124,92,255,0.15)" label="Pipeline Value" value={formatINR(stats.pipelineValue)} sub="Attended leads" />
          <StatCard icon="📅" tint="rgba(0,184,169,0.15)" label="Upcoming Meetings" value={stats.upcomingMeetings} sub="Click to view" onClick={() => setView("meetings")} active={view === "meetings"} />
          <StatCard icon="📁" tint="rgba(245,158,11,0.15)" label="Missing Files" value={stats.missingFiles} sub="Requires attention" subTone="text-amber-400" onClick={() => { setView("leads"); setFileFilter(fileFilter === "missing" ? "all" : "missing"); }} active={view === "leads" && fileFilter === "missing"} />
        </div>

        {/* Controls */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex rounded-lg border border-white/12 bg-white/[0.03] p-1">
            <button
              onClick={() => setView("leads")}
              className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                view === "leads" ? "bg-[#4b78ff] text-white" : "text-white/60 hover:text-white"
              }`}
            >
              All leads <span className="ml-1 text-[12px] opacity-70">{rows.length}</span>
            </button>
            <button
              onClick={() => setView("meetings")}
              className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                view === "meetings" ? "bg-[#4b78ff] text-white" : "text-white/60 hover:text-white"
              }`}
            >
              📅 Meetings <span className="ml-1 text-[12px] opacity-70">{meetings.length}</span>
            </button>
            <button
              onClick={() => setView("report")}
              className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                view === "report" ? "bg-[#4b78ff] text-white" : "text-white/60 hover:text-white"
              }`}
            >
              📊 Report
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {view === "leads" ? (
            <>
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
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#4b78ff] focus:outline-none"
              title="Filter by pipeline stage"
            >
              <option value="all">All stages</option>
              {PIPELINE_STAGES.map((s) => (
                <option key={s.value} value={s.value}>{s.icon} {s.short}</option>
              ))}
              <option value="lost">✕ Lost</option>
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
            </>
            ) : null}
            {view !== "report" ? (
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search…"
                className="w-[200px] rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-[#4b78ff] focus:outline-none"
              />
            ) : null}
            {view === "leads" ? (
              <>
                <button onClick={() => exportCsv(rows, tab)} className="rounded-lg border border-white/15 px-3 py-2 text-[13px] text-white/80 hover:bg-white/5">
                  Export CSV
                </button>
                <button
                  onClick={() => setModal({ open: true, lead: null })}
                  className="rounded-lg bg-[#4b78ff] px-3 py-2 text-[13px] font-semibold text-white hover:bg-[#3d63d8]"
                >
                  + Add lead
                </button>
              </>
            ) : view === "meetings" ? (
              <button
                onClick={() => setScheduleOpen(true)}
                className="rounded-lg bg-[#4b78ff] px-3 py-2 text-[13px] font-semibold text-white hover:bg-[#3d63d8]"
              >
                + Schedule meeting
              </button>
            ) : null}
          </div>
        </div>

        {loadError ? (
          <div className="mb-4 rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-[13px] text-amber-200">
            {loadError}
          </div>
        ) : null}

        {/* Meetings view */}
        {view === "report" ? <DailyReport leads={leads} /> : null}

        {view === "meetings" ? (
          <div className="overflow-x-auto rounded-xl border border-white/12">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-white/[0.04] text-left text-[12px] uppercase tracking-wide text-white/50">
                  <th className="px-3 py-3 font-medium">When</th>
                  <th className="px-3 py-3 font-medium">Client</th>
                  <th className="px-3 py-3 font-medium">Taken by</th>
                  <th className="px-3 py-3 font-medium">POC</th>
                  <th className="px-3 py-3 font-medium min-w-[220px]">Notes</th>
                  <th className="px-3 py-3 font-medium">Contact</th>
                  <th className="px-3 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {meetings.length === 0 ? (
                  <tr><td colSpan={7} className="px-3 py-10 text-center text-white/40">No meetings scheduled yet — click “+ Schedule meeting” and pick a lead.</td></tr>
                ) : (
                  meetings.map((l) => {
                    const past = meetingTime(l.meeting_at) < Date.now();
                    return (
                      <tr key={l.id} className="border-t border-white/8 align-top hover:bg-white/[0.02]">
                        <td className="px-3 py-3">
                          <span className={`whitespace-nowrap rounded-full border px-2.5 py-1 text-[12px] font-medium ${
                            past ? "border-white/15 bg-white/5 text-white/45" : "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                          }`}>
                            {past ? "✓ " : "📅 "}{formatMeeting(l.meeting_at)}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          <button onClick={() => setDetail(l)} className="font-medium text-white hover:text-[#7aa2ff]">
                            {l.client || "—"}
                          </button>
                        </td>
                        <td className="px-3 py-3">
                          {l.meeting_owner ? (
                            <span className="whitespace-nowrap rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2 py-0.5 text-[12px] font-medium text-emerald-300">🎙 {l.meeting_owner}</span>
                          ) : <span className="text-white/30">—</span>}
                        </td>
                        <td className="px-3 py-3">
                          {l.poc ? (
                            <span className="whitespace-nowrap rounded-full border border-[#4b78ff]/40 bg-[#4b78ff]/15 px-2 py-0.5 text-[12px] font-medium text-[#9dbaff]">{l.poc}</span>
                          ) : <span className="text-white/30">—</span>}
                        </td>
                        <td className="px-3 py-3 text-white/70">{l.meeting_notes || "—"}</td>
                        <td className="px-3 py-3 text-white/70">{l.email || l.phone || "—"}</td>
                        <td className="px-3 py-3 text-right">
                          <button onClick={() => setModal({ open: true, lead: l })} className="text-[13px] text-[#7aa2ff] hover:underline">Edit</button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        ) : view === "leads" ? (
        <div className="overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02]">
          {/* Header — Client pinned; each lead row below scrolls on its own */}
          <div className="flex border-b border-white/8 bg-white/[0.04] text-[11px] font-semibold uppercase tracking-wider text-white/45">
            <div className="sticky left-0 z-10 w-[240px] shrink-0 bg-[#11151f] px-4 py-3 shadow-[1px_0_0_rgba(255,255,255,0.06)]">Client</div>
            <div className="w-[150px] shrink-0 px-4 py-3">POC</div>
            <div className="w-[230px] shrink-0 px-4 py-3">Industry</div>
            <div className="w-[150px] shrink-0 px-4 py-3">Stage</div>
            <div className="w-[230px] shrink-0 px-4 py-3">Next Step</div>
            <div className="w-[130px] shrink-0 px-4 py-3">Est. Value</div>
            <div className="w-[120px] shrink-0 px-4 py-3">Added</div>
            <div className="w-[200px] shrink-0 px-4 py-3">Contact</div>
            <div className="w-[170px] shrink-0 px-4 py-3 text-right">Actions</div>
          </div>

          {loading ? (
            <div className="px-4 py-12 text-center text-white/40">Loading…</div>
          ) : rows.length === 0 ? (
            <div className="px-4 py-12 text-center text-white/40">No leads match these filters.</div>
          ) : (
            rows.map((l) => {
              const sd = stageDef(l.pipeline_stage);
              const spre = followupCount(l, "pre_call");
              const spost = followupCount(l, "post_meeting");
              const sCounter = sd.value === "pre_call" ? `${spre}/3` : sd.value === "post_meeting" ? `${spost}/7` : null;
              const sUnder = (sd.value === "pre_call" && spre < 3) || (sd.value === "post_meeting" && spost < 7);
              const rating = ratingOf(l.responsiveness);
              const hasFile = (l.attachments?.length ?? 0) > 0;
              const nFollow = l.followups?.length ?? 0;
              const cell = "shrink-0 px-4 py-2.5 text-[12.5px]";
              return (
                <div key={l.id} className="hscroll group flex overflow-x-auto border-b border-white/[0.06]">
                  {/* Client — pinned so you always know which lead you're scrolling */}
                  <div className="sticky left-0 z-10 flex w-[240px] shrink-0 items-center bg-[#0a0e18] px-4 py-2.5 shadow-[1px_0_0_rgba(255,255,255,0.06)] group-hover:bg-[#0e131f]">
                    <button onClick={() => setDetail(l)} className="flex min-w-0 items-center gap-1.5 text-left">
                      {rating ? <span className="shrink-0" title={rating.label}>{rating.emoji}</span> : null}
                      <span className={`truncate font-semibold hover:text-[#9dbaff] ${rating?.text ?? "text-white"}`} title={l.client ?? ""}>{l.client || "—"}</span>
                      <span className="ml-1 flex shrink-0 items-center gap-1">
                        {(l.attachments ?? []).some((a) => a.uploaded_by === "AI") ? (
                          <span className="text-[11px]" title="AI-generated PDF — send it to the client">🤖</span>
                        ) : null}
                        {nFollow > 0 ? (
                          <span className="text-[11px]" title={`${nFollow} follow-up proof(s)`}>🔁{nFollow}</span>
                        ) : (
                          <span className="text-[11px] text-red-400" title="No follow-up logged yet">⚠</span>
                        )}
                        {hasFile ? (
                          <span className="text-[11px] text-white/50" title={`${l.attachments!.length} file(s)`}>📎{l.attachments!.length}</span>
                        ) : (
                          <span className="text-[11px] text-amber-400" title="No file uploaded yet">📄</span>
                        )}
                      </span>
                    </button>
                  </div>
                  {/* POC */}
                  <div className={`${cell} flex w-[150px] items-center`}><PocCell name={l.poc} /></div>
                  {/* Industry */}
                  <div className={`${cell} w-[230px] truncate text-white/70`} title={l.industry || l.business || ""}>{l.industry || l.business || "—"}</div>
                  {/* Stage */}
                  <div className={`${cell} w-[150px]`}>
                    <span
                      className={`inline-flex max-w-full items-center gap-1 truncate rounded-md border px-2 py-1 text-[11px] font-semibold ${sd.chip}`}
                      title={`${sd.label}${sCounter ? ` · ${sCounter}` : ""}${l.current_stage ? ` · notes: ${l.current_stage}` : ""}`}
                    >
                      {sd.icon} {sd.short}
                      {sCounter ? <span className={`tabular-nums ${sUnder ? "text-amber-300" : ""}`}>· {sCounter}</span> : null}
                      {sUnder ? "⚠" : null}
                    </span>
                  </div>
                  {/* Next step */}
                  <div className={`${cell} w-[230px] truncate text-white/70`} title={l.next_step || l.status || ""}>{l.next_step || l.status || "—"}</div>
                  {/* Est value */}
                  <div className={`${cell} w-[130px] whitespace-nowrap font-semibold tabular-nums text-white`}>{l.estimated_value ? formatINR(parseValue(l.estimated_value)) : "—"}</div>
                  {/* Added */}
                  <div className={`${cell} w-[120px] whitespace-nowrap text-white/55`} title={`Added ${formatDateTime(l.created_at)}`}>{formatDate(l.created_at)}</div>
                  {/* Contact */}
                  <div className={`${cell} w-[200px] truncate text-white/65`} title={l.email || l.phone || ""}>{l.email || l.phone || "—"}</div>
                  {/* Actions */}
                  <div className={`${cell} flex w-[170px] items-center justify-end gap-0.5`}>
                    <button onClick={() => setDetail(l)} title="View" className="rounded-md p-1.5 text-white/55 hover:bg-white/8 hover:text-white">👁</button>
                    <button onClick={() => setFilesModal(l)} title="Files" className="rounded-md p-1.5 text-white/55 hover:bg-white/8 hover:text-white">📎</button>
                    <button onClick={() => setModal({ open: true, lead: l })} title="Edit" className="rounded-md p-1.5 text-white/55 hover:bg-white/8 hover:text-[#9dbaff]">✎</button>
                    <button onClick={() => onDelete(l)} title="Delete" className="rounded-md p-1.5 text-white/55 hover:bg-white/8 hover:text-red-300">🗑</button>
                  </div>
                </div>
              );
            })
          )}

          {!loading && rows.length > 0 ? (
            <div className="flex items-center justify-between border-t border-white/8 px-4 py-3 text-[12.5px] text-white/45">
              <span>Showing {rows.length} lead{rows.length === 1 ? "" : "s"} · scroll a row → to see its details</span>
              <button onClick={() => exportCsv(rows, tab)} className="rounded-lg border border-white/12 px-3 py-1.5 text-white/75 hover:bg-white/5">⬇ Export CSV</button>
            </div>
          ) : null}
        </div>
        ) : null}
            </main>

            {/* ===== Right rail ===== */}
            <aside className="hidden w-[300px] shrink-0 space-y-4 xl:block">
              <RailCard title="Pipeline Overview" action={<span className="text-[11px] font-semibold text-emerald-400">{overview.conversion}% conv.</span>}>
                {leads.length === 0 ? (
                  <p className="text-[12.5px] text-white/40">No leads yet.</p>
                ) : (
                  <div className="space-y-2.5">
                    {overview.list.map(({ def, n }) => (
                      <button
                        key={def.value}
                        onClick={() => { setView("leads"); setStageFilter(stageFilter === def.value ? "all" : def.value); }}
                        className="block w-full text-left"
                        title={`${def.label} — click to filter`}
                      >
                        <div className="mb-1 flex items-center justify-between text-[12px]">
                          <span className={`truncate ${stageFilter === def.value ? "font-bold text-white" : "text-white/70"}`}>{def.icon} {def.short}</span>
                          <span className="font-semibold tabular-nums text-white/90">{n}</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/8">
                          <div className={`h-full rounded-full ${def.dot}`} style={{ width: `${Math.max(4, (n / overview.max) * 100)}%` }} />
                        </div>
                      </button>
                    ))}
                    {overview.lost > 0 ? (
                      <button
                        onClick={() => { setView("leads"); setStageFilter(stageFilter === "lost" ? "all" : "lost"); }}
                        className="flex w-full items-center justify-between pt-1 text-[12px]"
                      >
                        <span className={stageFilter === "lost" ? "font-bold text-red-300" : "text-red-300/70"}>✕ Lost</span>
                        <span className="font-semibold tabular-nums text-red-300/90">{overview.lost}</span>
                      </button>
                    ) : null}
                  </div>
                )}
              </RailCard>

              <RailCard title="Upcoming Tasks" action={<button onClick={() => setView("meetings")} className="text-[11px] font-semibold text-[#7aa2ff] hover:underline">View all</button>}>
                {upcomingTasks.length === 0 ? (
                  <p className="text-[12.5px] text-white/40">No upcoming meetings.</p>
                ) : (
                  <ul className="space-y-3">
                    {upcomingTasks.map((l) => (
                      <li key={l.id} className="flex gap-2.5">
                        <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-[#4b78ff]/15 text-[12px]">📅</span>
                        <button onClick={() => setDetail(l)} className="min-w-0 text-left">
                          <p className="truncate text-[13px] font-medium text-white/90 hover:text-[#9dbaff]">{l.client || "Meeting"}</p>
                          <p className="text-[11.5px] text-white/45">{formatMeeting(l.meeting_at)}{l.meeting_owner ? ` · ${l.meeting_owner}` : ""}</p>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </RailCard>

              <RailCard title="Recent Activity">
                {recentActivity.length === 0 ? (
                  <p className="text-[12.5px] text-white/40">Nothing yet.</p>
                ) : (
                  <ul className="space-y-3">
                    {recentActivity.map((l) => (
                      <li key={l.id} className="flex gap-2.5">
                        <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: pocColor(l.poc) }}>{(l.poc ?? "•")[0]}</span>
                        <button onClick={() => setDetail(l)} className="min-w-0 text-left">
                          <p className="text-[12.5px] leading-snug text-white/75"><span className="font-semibold text-white/90">{l.poc || "Someone"}</span> updated <span className="text-white/90">{l.client || "a lead"}</span></p>
                          <p className="text-[11px] text-white/40">{formatDateTime(l.updated_at || l.created_at)}</p>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </RailCard>

              <RailCard title="Quick Stats">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: "✳️", label: "Leads / week", value: quickStats.leadsThisWeek },
                    { icon: "📅", label: "Meetings held", value: quickStats.meetingsHeld },
                    { icon: "📎", label: "Files", value: quickStats.filesTotal },
                    { icon: "🔁", label: "Follow-ups", value: quickStats.followupsTotal },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl border border-white/8 bg-white/[0.02] p-3">
                      <p className="text-[15px]">{s.icon}</p>
                      <p className="mt-1 text-[19px] font-bold text-white">{s.value}</p>
                      <p className="text-[11px] text-white/45">{s.label}</p>
                    </div>
                  ))}
                </div>
              </RailCard>
            </aside>
          </div>
        </div>
      </div>

      {modal.open ? (
        <LeadModal
          tab={tab}
          lead={modal.lead}
          onClose={() => setModal({ open: false, lead: null })}
          onSaved={() => { setModal({ open: false, lead: null }); void load(); }}
          onChanged={() => void load()}
        />
      ) : null}

      {scheduleOpen ? (
        <ScheduleMeetingModal
          leads={leads}
          onClose={() => setScheduleOpen(false)}
          onSaved={() => { setScheduleOpen(false); void load(); }}
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
