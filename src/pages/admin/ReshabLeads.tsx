import { useEffect, useState } from "react";
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
import { ArrowLeft, RefreshCw } from "lucide-react";

function tierBadgeClass(tier: string) {
  if (tier === "high") return "bg-emerald-600/90 text-white border-emerald-400/40";
  if (tier === "medium") return "bg-amber-600/90 text-white border-amber-400/40";
  return "bg-zinc-600/90 text-white border-zinc-400/40";
}

const ReshabLeads = () => {
  const [leads, setLeads] = useState<ReshabLeadRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await reshabLeadService.listLeads();
    setLeads(data);
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, []);

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
              High-intent form submissions (homepage, industry landings, services modal).
            </p>
          </div>
          <div className="flex gap-2">
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

        {loading ? (
          <div className="py-20 text-center text-cyan-400/80">Loading…</div>
        ) : leads.length === 0 ? (
          <div className="rounded-lg border border-white/10 bg-white/5 p-10 text-center text-gray-400">
            No leads yet. Submissions from the redesigned lead form will appear here after the{" "}
            <code className="text-cyan-400/90">reshab_leads</code> migration is applied in Supabase.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-white/10">
            <table className="w-full min-w-[800px] text-left text-sm text-gray-300">
              <thead className="border-b border-white/10 bg-black/40 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-4 py-3">Date</th>
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
                {leads.map((row) => (
                  <tr key={row.id} className="border-b border-white/5 hover:bg-white/[0.03]">
                    <td className="whitespace-nowrap px-4 py-3 text-gray-400">
                      {new Date(row.created_at).toLocaleString()}
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
                            View JSON
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-h-[85vh] max-w-3xl overflow-y-auto border-gray-800 bg-gray-950 text-gray-100">
                          <DialogHeader>
                            <DialogTitle>Lead payload</DialogTitle>
                          </DialogHeader>
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
        )}
      </div>
    </AdminLayout>
  );
};

export default ReshabLeads;
