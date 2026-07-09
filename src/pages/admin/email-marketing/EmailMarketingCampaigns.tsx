import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EmailMarketingLayout } from "@/components/admin/email-marketing/EmailMarketingLayout";
import { emailMarketingService, type EmCampaign } from "@/services/emailMarketing";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { toast } from "sonner";

export default function EmailMarketingCampaigns() {
  const [campaigns, setCampaigns] = useState<EmCampaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    emailMarketingService
      .listCampaigns()
      .then(setCampaigns)
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <EmailMarketingLayout title="Campaigns">
      <div className="flex justify-end mb-4">
        <Button asChild>
          <Link to="/admin/email-marketing/campaigns/new">New blast</Link>
        </Button>
      </div>

      <div className="rounded-lg border border-gray-800 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800">
              <TableHead className="text-gray-400">Name</TableHead>
              <TableHead className="text-gray-400">Type</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400">Sent</TableHead>
              <TableHead className="text-gray-400">Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((c) => (
              <TableRow key={c.id} className="border-gray-800">
                <TableCell>
                  <Link
                    to={`/admin/email-marketing/campaigns/${c.id}`}
                    className="text-cyan-400 hover:underline"
                  >
                    {c.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{c.type}</Badge>
                </TableCell>
                <TableCell>{c.status}</TableCell>
                <TableCell className="text-gray-400">{c.stats?.sent ?? 0}</TableCell>
                <TableCell className="text-gray-500 text-sm">
                  {format(new Date(c.created_at), "MMM d, yyyy")}
                </TableCell>
              </TableRow>
            ))}
            {!loading && campaigns.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                  No campaigns yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </EmailMarketingLayout>
  );
}
