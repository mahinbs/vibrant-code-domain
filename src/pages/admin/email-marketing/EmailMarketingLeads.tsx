import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EmailMarketingLayout } from "@/components/admin/email-marketing/EmailMarketingLayout";
import { emailMarketingService, type EmLead } from "@/services/emailMarketing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { emailMarketingEdge } from "@/services/emailMarketing";
import { toast } from "sonner";

export default function EmailMarketingLeads() {
  const [leads, setLeads] = useState<EmLead[]>([]);
  const [search, setSearch] = useState("");
  const [pipeline, setPipeline] = useState("all");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const data = await emailMarketingService.listLeads(
        pipeline !== "all" ? { pipeline } : undefined,
      );
      setLeads(data);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [pipeline]);

  const filtered = leads.filter((l) => {
    const q = search.toLowerCase();
    return (
      !q ||
      l.email.toLowerCase().includes(q) ||
      (l.name?.toLowerCase().includes(q) ?? false) ||
      (l.company?.toLowerCase().includes(q) ?? false)
    );
  });

  const syncInbound = async () => {
    try {
      const { synced } = await emailMarketingEdge.syncInboundLeads();
      toast.success(`Synced ${synced} inbound leads`);
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Sync failed");
    }
  };

  return (
    <EmailMarketingLayout title="Leads">
      <div className="flex flex-wrap gap-2 mb-4">
        <Input
          placeholder="Search…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs bg-gray-800 border-gray-700"
        />
        <Select value={pipeline} onValueChange={setPipeline}>
          <SelectTrigger className="w-40 bg-gray-800 border-gray-700">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All pipelines</SelectItem>
            <SelectItem value="inbound">Inbound</SelectItem>
            <SelectItem value="cold">Cold</SelectItem>
            <SelectItem value="blast_only">Blast only</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={load} disabled={loading}>
          Refresh
        </Button>
        <Button variant="secondary" onClick={syncInbound}>
          Sync from Reshab leads
        </Button>
      </div>

      <div className="rounded-lg border border-gray-800 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800">
              <TableHead className="text-gray-400">Name</TableHead>
              <TableHead className="text-gray-400">Email</TableHead>
              <TableHead className="text-gray-400">Pipeline</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400">Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((lead) => (
              <TableRow key={lead.id} className="border-gray-800">
                <TableCell>
                  <Link
                    to={`/admin/email-marketing/leads/${lead.id}`}
                    className="text-cyan-400 hover:underline"
                  >
                    {lead.name ?? "—"}
                  </Link>
                </TableCell>
                <TableCell className="text-gray-300">{lead.email}</TableCell>
                <TableCell>
                  <Badge variant="outline">{lead.pipeline}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{lead.status}</Badge>
                </TableCell>
                <TableCell className="text-gray-500 text-sm">
                  {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true })}
                </TableCell>
              </TableRow>
            ))}
            {!loading && filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                  No leads yet. Sync inbound or import a CSV.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </EmailMarketingLayout>
  );
}
