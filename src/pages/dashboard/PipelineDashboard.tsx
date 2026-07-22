import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
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
  ],
  unattended: [
    { key: "client", label: "Client" },
    { key: "phone", label: "Contact" },
    { key: "business", label: "Business" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "email", label: "Email" },
    { key: "status", label: "Status", type: "textarea" },
  ],
};

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
    const base: Record<string, string> = {};
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
    const payload = { ...form, tab } as Record<string, unknown>;
    const res = lead
      ? await pipelineLeadService.update(lead.id, payload)
      : await pipelineLeadService.create(payload);
    setSaving(false);
    if (res.error) {
      setError(
        res.error.includes("pipeline_leads") || res.error.includes("relation")
          ? "The pipeline_leads table isn't set up yet — run the SQL in Supabase first."
          : res.error,
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

const ATT_COLS: { key: keyof PipelineLead; label: string; w?: string }[] = [
  { key: "client", label: "Client" },
  { key: "industry", label: "Industry" },
  { key: "description", label: "Description", w: "min-w-[220px]" },
  { key: "estimated_value", label: "Est. Value" },
  { key: "current_stage", label: "Stage" },
  { key: "next_step", label: "Next Step", w: "min-w-[240px]" },
  { key: "expected_closure", label: "Closure" },
  { key: "email", label: "Contact" },
];
const UNATT_COLS: { key: keyof PipelineLead; label: string; w?: string }[] = [
  { key: "client", label: "Client" },
  { key: "phone", label: "Contact" },
  { key: "business", label: "Business", w: "min-w-[200px]" },
  { key: "description", label: "Description", w: "min-w-[220px]" },
  { key: "email", label: "Email" },
  { key: "status", label: "Status", w: "min-w-[180px]" },
];

function exportCsv(rows: PipelineLead[], tab: PipelineTab) {
  const cols = FIELDS[tab].map((f) => f.key as string);
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
  const [tab, setTab] = useState<PipelineTab>("attended");
  const [leads, setLeads] = useState<PipelineLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<{ open: boolean; lead: PipelineLead | null }>({ open: false, lead: null });
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

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return leads
      .filter((l) => l.tab === tab)
      .filter((l) =>
        !q
          ? true
          : `${l.client ?? ""} ${l.industry ?? ""} ${l.business ?? ""} ${l.description ?? ""} ${l.email ?? ""} ${l.phone ?? ""} ${l.current_stage ?? ""} ${l.status ?? ""}`
              .toLowerCase()
              .includes(q),
      );
  }, [leads, tab, search]);

  const stats = useMemo(() => {
    const att = leads.filter((l) => l.tab === "attended");
    const unatt = leads.filter((l) => l.tab === "unattended");
    const pipelineValue = att.reduce((s, l) => s + parseValue(l.estimated_value), 0);
    return { att: att.length, unatt: unatt.length, pipelineValue };
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
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            { label: "Attended leads", value: stats.att },
            { label: "Unattended leads", value: stats.unatt },
            { label: "Pipeline value", value: formatINR(stats.pipelineValue) },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-white/12 bg-white/[0.03] p-4">
              <p className="text-[12px] uppercase tracking-wide text-white/45">{s.label}</p>
              <p className="mt-1 text-2xl font-semibold text-white">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex rounded-lg border border-white/12 bg-white/[0.03] p-1">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                  tab === t.key ? "bg-[#4b78ff] text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {t.label}
                <span className="ml-1.5 text-[12px] opacity-70">
                  {t.key === "attended" ? stats.att : stats.unatt}
                </span>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
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
                            onClick={() => setModal({ open: true, lead: l })}
                            className="flex items-center gap-1.5 text-left font-medium text-white hover:text-[#7aa2ff]"
                          >
                            {l.client || "—"}
                            {(l.attachments?.length ?? 0) > 0 ? (
                              <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] text-white/60" title={`${l.attachments!.length} file(s)`}>
                                📎 {l.attachments!.length}
                              </span>
                            ) : null}
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
