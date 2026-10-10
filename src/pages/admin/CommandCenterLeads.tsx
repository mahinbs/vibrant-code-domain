import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { bmsLeadService, type BmsLeadRow } from "@/services/bmsLeadService";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Download, ExternalLink, RefreshCw, Search } from "lucide-react";

/** Leads from the /command-center landing page (stored in `bms_leads`). */
const SOURCE_PAGE = "command-center";

type Payload = Record<string, unknown>;

function payloadOf(row: BmsLeadRow): Payload {
  return row.payload && typeof row.payload === "object" && !Array.isArray(row.payload)
    ? (row.payload as Payload)
    : {};
}

const str = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : "");

function ctaLabel(cta: string) {
  if (!cta) return "Unknown";
  if (cta.startsWith("card-")) return `Poster card · ${cta.slice(5)}`;
  const map: Record<string, string> = {
    "contact-section": "Contact section",
    "sticky-nav": "Sticky nav",
    "goal-band": "Goal picker",
    linkedin: "LinkedIn section",
    whatsapp: "WhatsApp section",
    team: "Human layer",
    "team-secondary": "Human layer",
    pricing: "Pricing",
    "pricing-secondary": "Pricing",
    "use-case": "Who it's for",
    "custom-goal": "Custom goal",
    "final-cta": "Final CTA",
  };
  return map[cta] ?? cta;
}

/** "meta / spring-sale", "google (gclid)", a referrer domain, or "Direct". */
function adSource(p: Payload): string {
  const src = str(p.utm_source);
  const camp = str(p.utm_campaign);
  if (src) return camp ? `${src} / ${camp}` : src;
  if (str(p.gclid)) return "google (gclid)";
  if (str(p.fbclid)) return "meta (fbclid)";
  const ref = str(p.referrer);
  if (ref) {
    try {
      return new URL(ref).hostname.replace(/^www\./, "");
    } catch {
      return ref;
    }
  }
  return "Direct";
}

const sourceKey = (p: Payload) => adSource(p).split(" / ")[0];

function waLink(phone: string | null) {
  const digits = (phone ?? "").replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : null;
}

function csvEscape(v: unknown): string {
  const s = v == null ? "" : typeof v === "object" ? JSON.stringify(v) : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function exportCsv(rows: BmsLeadRow[]) {
  const headers = [
    "created_at",
    "name",
    "company",
    "email",
    "phone",
    "goal",
    "cta",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "gclid",
    "fbclid",
    "referrer",
    "country",
    "ad_budget_ok",
    "ad_budget_min_per_day",
    "consent_whatsapp",
    "consent_voice",
  ];
  const lines = [headers.join(",")];
  for (const r of rows) {
    const p = payloadOf(r);
    lines.push(
      [
        r.created_at,
        r.name,
        r.company,
        r.email,
        r.phone,
        p.requirement,
        p.cta,
        p.utm_source,
        p.utm_medium,
        p.utm_campaign,
        p.utm_term,
        p.utm_content,
        p.gclid,
        p.fbclid,
        p.referrer,
        p.country,
        p.ad_budget_ok ?? "",
        p.ad_budget_min_per_day,
        p.consent_whatsapp ?? false,
        p.consent_voice ?? false,
      ]
        .map(csvEscape)
        .join(","),
    );
  }
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `command-center-leads-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

const CommandCenterLeads = () => {
  const [leads, setLeads] = useState<BmsLeadRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [ctaFilter, setCtaFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");

  const load = async () => {
    setLoading(true);
    const { data, error } = await bmsLeadService.listLeads(SOURCE_PAGE);
    setLeads(data);
    setLoadError(error);
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, []);

  const ctaOptions = useMemo(
    () => Array.from(new Set(leads.map((l) => str(payloadOf(l).cta)).filter(Boolean))).sort(),
    [leads],
  );

  const sourceOptions = useMemo(
    () => Array.from(new Set(leads.map((l) => sourceKey(payloadOf(l))))).sort(),
    [leads],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return leads.filter((r) => {
      const p = payloadOf(r);
      if (ctaFilter !== "all" && str(p.cta) !== ctaFilter) return false;
      if (sourceFilter !== "all" && sourceKey(p) !== sourceFilter) return false;
      if (q) {
        const hay = `${r.name} ${r.email} ${r.phone ?? ""} ${r.company ?? ""} ${str(p.requirement)}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [leads, search, ctaFilter, sourceFilter]);

  const stats = useMemo(() => {
    const now = Date.now();
    const today = new Date().toDateString();
    return {
      total: leads.length,
      today: leads.filter((l) => new Date(l.created_at).toDateString() === today).length,
      week: leads.filter((l) => now - new Date(l.created_at).getTime() < 7 * 864e5).length,
      withGoal: leads.filter((l) => str(payloadOf(l).requirement)).length,
    };
  }, [leads]);

  return (
    <AdminLayout>
      <div className="space-y-6 p-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/admin" className="text-cyan-400 hover:text-cyan-300">
                  Dashboard
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-gray-400">Command Center leads</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-3xl font-bold text-transparent">
              Command Center leads
            </h1>
            <p className="mt-1 text-gray-400">
              Enquiries from the{" "}
              <a
                href="/command-center"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-cyan-400 hover:underline"
              >
                /command-center <ExternalLink className="h-3 w-3" />
              </a>{" "}
              landing page.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, email, goal…"
                className="w-[240px] rounded-md border border-gray-700 bg-black/40 py-2 pl-9 pr-3 text-sm text-gray-200 placeholder:text-gray-500 focus:border-cyan-500/60 focus:outline-none"
              />
            </div>
            <Select value={ctaFilter} onValueChange={setCtaFilter}>
              <SelectTrigger className="w-[190px] border-gray-700 bg-black/40 text-gray-200">
                <SelectValue placeholder="CTA" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All CTAs</SelectItem>
                {ctaOptions.map((c) => (
                  <SelectItem key={c} value={c}>
                    {ctaLabel(c)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-[170px] border-gray-700 bg-black/40 text-gray-200">
                <SelectValue placeholder="Ad source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All sources</SelectItem>
                {sourceOptions.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => exportCsv(filtered)}
              disabled={filtered.length === 0}
              className="border-gray-700 text-gray-300"
            >
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            <Button variant="outline" asChild className="border-gray-700 text-gray-300">
              <Link to="/admin">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
            <Button
              onClick={() => void load()}
              disabled={loading}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Total leads", value: stats.total, accent: "text-white" },
            { label: "Today", value: stats.today, accent: "text-cyan-400" },
            { label: "Last 7 days", value: stats.week, accent: "text-emerald-400" },
            { label: "Shared a goal", value: stats.withGoal, accent: "text-amber-400" },
          ].map((s) => (
            <div key={s.label} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <div className={`text-2xl font-bold ${s.accent}`}>{s.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wide text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>

        {loadError ? (
          <div className="rounded-lg border border-red-500/40 bg-red-950/30 p-6 text-red-200">
            <p className="font-medium">Could not load leads</p>
            <p className="mt-2 text-sm text-red-200/80">{loadError}</p>
          </div>
        ) : null}

        {loading ? (
          <div className="py-20 text-center text-cyan-400/80">Loading…</div>
        ) : !loadError && filtered.length === 0 ? (
          <div className="rounded-lg border border-white/10 bg-white/5 p-10 text-center text-gray-400">
            {leads.length === 0 ? "No Command Center leads yet." : "No leads match this filter."}
          </div>
        ) : !loadError ? (
          <>
            <p className="text-sm text-gray-500">
              Showing {filtered.length} of {leads.length} leads
            </p>
            <div className="overflow-x-auto rounded-lg border border-white/10">
              <table className="w-full min-w-[1120px] text-left text-sm text-gray-300">
                <thead className="border-b border-white/10 bg-black/40 text-xs uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Business</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">WhatsApp</th>
                    <th className="px-4 py-3">Goal</th>
                    <th className="px-4 py-3">CTA</th>
                    <th className="px-4 py-3">Ad source</th>
                    <th className="px-4 py-3">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row) => {
                    const p = payloadOf(row);
                    const goal = str(p.requirement);
                    const wa = waLink(row.phone);
                    return (
                      <tr key={row.id} className="border-b border-white/5 hover:bg-white/[0.03]">
                        <td className="whitespace-nowrap px-4 py-3 text-gray-400">
                          {new Date(row.created_at).toLocaleString()}
                        </td>
                        <td className="px-4 py-3 font-medium text-white">{row.name}</td>
                        <td className="px-4 py-3">{row.company ?? "—"}</td>
                        <td className="px-4 py-3">
                          {row.email ? (
                            <a href={`mailto:${row.email}`} className="text-cyan-400 hover:underline">
                              {row.email}
                            </a>
                          ) : (
                            "—"
                          )}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          {wa ? (
                            <a href={wa} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
                              {row.phone}
                            </a>
                          ) : (
                            "—"
                          )}
                        </td>
                        <td className="max-w-[280px] px-4 py-3" title={goal}>
                          <span className="line-clamp-2">{goal || "—"}</span>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className="border-blue-400/40 bg-blue-950/60 text-blue-200">
                            {ctaLabel(str(p.cta))}
                          </Badge>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-gray-400">{adSource(p)}</td>
                        <td className="px-4 py-3">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300">
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto border-gray-800 bg-gray-950 text-gray-100">
                              <DialogHeader>
                                <DialogTitle>{row.name}</DialogTitle>
                              </DialogHeader>
                              <dl className="grid grid-cols-[140px_1fr] gap-x-4 gap-y-2 text-sm">
                                <dt className="text-gray-500">Submitted</dt>
                                <dd>{new Date(row.created_at).toLocaleString()}</dd>
                                <dt className="text-gray-500">Business</dt>
                                <dd>{row.company ?? "—"}</dd>
                                <dt className="text-gray-500">Email</dt>
                                <dd>{row.email || "—"}</dd>
                                <dt className="text-gray-500">WhatsApp</dt>
                                <dd>{row.phone ?? "—"}</dd>
                                <dt className="text-gray-500">Goal</dt>
                                <dd className="whitespace-pre-wrap">{goal || "—"}</dd>
                                <dt className="text-gray-500">CTA clicked</dt>
                                <dd>{ctaLabel(str(p.cta))}</dd>
                                <dt className="text-gray-500">Ad budget</dt>
                                <dd>
                                  {p.ad_budget_ok === true
                                    ? `Ready to spend ${str(p.ad_budget_min_per_day) || "the minimum"}+ a day`
                                    : "—"}
                                  {str(p.country) ? ` · viewing from ${str(p.country)}` : ""}
                                </dd>
                                <dt className="text-gray-500">Ad source</dt>
                                <dd>{adSource(p)}</dd>
                                <dt className="text-gray-500">Landing URL</dt>
                                <dd className="break-all">{str(p.landing_url) || "—"}</dd>
                                <dt className="text-gray-500">Pre-filled goal</dt>
                                <dd>{str(p.prefilled_goal) || "—"}</dd>
                                <dt className="text-gray-500">Consent</dt>
                                <dd>
                                  WhatsApp {p.consent_whatsapp ? "yes" : "no"} · Voice {p.consent_voice ? "yes" : "no"}
                                  {str(p.consent_at) ? ` · ${new Date(str(p.consent_at)).toLocaleString()}` : ""}
                                </dd>
                              </dl>
                              <pre className="mt-4 whitespace-pre-wrap break-all rounded-md border border-white/10 bg-black/60 p-4 text-xs leading-relaxed">
                                {JSON.stringify(row.payload, null, 2)}
                              </pre>
                            </DialogContent>
                          </Dialog>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : null}
      </div>
    </AdminLayout>
  );
};

export default CommandCenterLeads;
