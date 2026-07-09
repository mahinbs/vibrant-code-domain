import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { EmailMarketingLayout } from "@/components/admin/email-marketing/EmailMarketingLayout";
import { emailMarketingService, type EmCampaign } from "@/services/emailMarketing";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { EmActionButton } from "@/components/admin/email-marketing/EmActionButton";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { emailMarketingEdge } from "@/services/emailMarketing";

type SendRow = {
  id: string;
  to_email: string;
  status: string;
  sent_at: string | null;
  em_leads?: { name?: string; email: string };
};

export default function EmailMarketingCampaignDetail() {
  const { id } = useParams<{ id: string }>();
  const [campaign, setCampaign] = useState<EmCampaign | null>(null);
  const [sends, setSends] = useState<SendRow[]>([]);

  const load = async () => {
    if (!id) return;
    try {
      const [c, s] = await Promise.all([
        emailMarketingService.getCampaign(id),
        emailMarketingService.getCampaignSends(id),
      ]);
      setCampaign(c);
      setSends(s);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load");
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const exportCsv = () => {
    const headers = ["Name", "Email", "Status", "Sent at"];
    const lines = [
      headers.join(","),
      ...sends.map((s) =>
        [
          s.em_leads?.name ?? "",
          s.to_email,
          s.status,
          s.sent_at ?? "",
        ].join(","),
      ),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `campaign-${id}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!campaign) {
    return (
      <EmailMarketingLayout title="Campaign">
        <p className="text-gray-500">Loading…</p>
      </EmailMarketingLayout>
    );
  }

  const stats = campaign.stats ?? {};

  return (
    <EmailMarketingLayout title={campaign.name}>
      <Link
        to="/admin/email-marketing/campaigns"
        className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-1" /> Back
      </Link>

      <div className="flex flex-wrap gap-4 mb-4 text-sm">
        <span className="text-gray-400">
          Sent: <strong className="text-white">{stats.sent ?? sends.length}</strong>
        </span>
        <span className="text-gray-400">
          Opened: <strong className="text-white">{stats.opened ?? 0}</strong>
        </span>
        <span className="text-gray-400">
          Replied: <strong className="text-white">{stats.replied ?? 0}</strong>
        </span>
        <span className="text-gray-400">
          Bounced: <strong className="text-white">{stats.bounced ?? 0}</strong>
        </span>
        <Badge>{campaign.status}</Badge>
      </div>

      <div className="flex gap-2 mb-4">
        <EmActionButton size="sm" variant="outline" onClick={exportCsv}>
          Export CSV
        </EmActionButton>
        {campaign.status === "draft" && id && (
          <EmActionButton
            size="sm"
            onClick={async () => {
              const n = await emailMarketingService.queueBlast(id);
              await emailMarketingEdge.triggerSendQueue();
              toast.success(`Queued ${n} emails`);
              load();
            }}
          >
            Send now
          </EmActionButton>
        )}
      </div>

      {campaign.subject && (
        <div className="mb-4 p-3 rounded border border-gray-800 text-sm">
          <p className="text-gray-500">Subject: {campaign.subject}</p>
        </div>
      )}

      <div className="rounded-lg border border-gray-800 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800">
              <TableHead className="text-gray-400">Name</TableHead>
              <TableHead className="text-gray-400">Email</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400">Sent at</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sends.map((s) => (
              <TableRow key={s.id} className="border-gray-800">
                <TableCell className="text-gray-300">{s.em_leads?.name ?? "—"}</TableCell>
                <TableCell>{s.to_email}</TableCell>
                <TableCell>
                  <Badge variant="outline">{s.status}</Badge>
                </TableCell>
                <TableCell className="text-gray-500 text-sm">{s.sent_at ?? "—"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </EmailMarketingLayout>
  );
}
