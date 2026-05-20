import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { reshabLeadService, type ReshabLeadRow } from "@/services/reshabLeadService";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { FounderLeadSummary } from "./founderLeadSummary";

function tierBadgeClass(tier: string) {
  if (tier === "high") return "bg-emerald-600/90 text-white border-emerald-400/40";
  if (tier === "medium") return "bg-amber-600/90 text-white border-amber-400/40";
  return "bg-zinc-600/90 text-white border-zinc-400/40";
}

function submissionTypeLabel(t: string) {
  if (t === "strategy_call") return "Strategy call";
  if (t === "founder_partnership") return "Founder application";
  if (t === "high_intent") return "Full form";
  return t || "—";
}

function submissionBadgeClass(t: string) {
  if (t === "strategy_call") return "border-cyan-400/50 bg-cyan-950/80 text-cyan-200";
  if (t === "founder_partnership") return "border-violet-400/50 bg-violet-950/80 text-violet-200";
  return "border-white/20 bg-white/10 text-gray-200";
}

const ReshabLeads = () => {
  const [leads, setLeads] = useState<ReshabLeadRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const load = async () => {
    setLoading(true);
    const { data, error } = await reshabLeadService.listLeads();
    setLeads(data);
    setLoadError(error);
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, []);

  const filtered = useMemo(() => {
    if (typeFilter === "all") return leads;
    return leads.filter((r) => (r.submission_type ?? "high_intent") === typeFilter);
  }, [leads, typeFilter]);

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
              <BreadcrumbPage className="text-gray-400">Reshab leads</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Reshab leads
            </h1>
            <p className="mt-1 text-gray-400">
              High-intent forms, strategy calls, and founder applications.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[200px] border-gray-700 bg-black/40 text-gray-200">
                <SelectValue placeholder="Filter form type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All forms</SelectItem>
                <SelectItem value="high_intent">Full form</SelectItem>
                <SelectItem value="strategy_call">Strategy call</SelectItem>
                <SelectItem value="founder_partnership">Founder application</SelectItem>
              </SelectContent>
            </Select>
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
            No leads match this filter.
          </div>
        ) : !loadError ? (
          <div className="overflow-x-auto rounded-lg border border-white/10">
            <table className="w-full min-w-[920px] text-left text-sm text-gray-300">
              <thead className="border-b border-white/10 bg-black/40 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Form</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Source</th>
                  <th className="px-4 py-3">Score</th>
                  <th className="px-4 py-3">Tier</th>
                  <th className="px-4 py-3">Payload</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr key={row.id} className="border-b border-white/5 hover:bg-white/[0.03]">
                    <td className="whitespace-nowrap px-4 py-3 text-gray-400">
                      {new Date(row.created_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className={submissionBadgeClass(row.submission_type ?? "high_intent")}
                      >
                        {submissionTypeLabel(row.submission_type ?? "high_intent")}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 font-medium text-white">{row.name}</td>
                    <td className="px-4 py-3">
                      <a href={`mailto:${row.email}`} className="text-cyan-400 hover:underline">
                        {row.email}
                      </a>
                    </td>
                    <td className="px-4 py-3">{row.phone ?? "—"}</td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-400">{row.source_page}</td>
                    <td className="px-4 py-3 tabular-nums text-white">{row.lead_score}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={tierBadgeClass(row.lead_tier)}>
                        {row.lead_tier}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300">
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-h-[85vh] max-w-3xl overflow-y-auto border-gray-800 bg-gray-950 text-gray-100">
                          <DialogHeader>
                            <DialogTitle>Lead details</DialogTitle>
                          </DialogHeader>
                          <FounderLeadSummary payload={row.payload} />
                          <pre className="whitespace-pre-wrap break-all rounded-md border border-white/10 bg-black/60 p-4 text-xs leading-relaxed">
                            {JSON.stringify(row.payload, null, 2)}
                          </pre>
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </AdminLayout>
  );
};

export default ReshabLeads;
