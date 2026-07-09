import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EmailMarketingLayout } from "@/components/admin/email-marketing/EmailMarketingLayout";
import { emailMarketingService, type EmEmailMessage } from "@/services/emailMarketing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { format } from "date-fns";
import { emailMarketingEdge } from "@/services/emailMarketing";
import { toast } from "sonner";

export default function EmailMarketingActivity() {
  const [sent, setSent] = useState<EmEmailMessage[]>([]);
  const [replies, setReplies] = useState<EmEmailMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const [outbound, inbound] = await Promise.all([
        emailMarketingService.listOutboundMessages(),
        emailMarketingService.listInboundMessages(),
      ]);
      setSent(outbound);
      setReplies(inbound);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load activity");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const checkReplies = async () => {
    try {
      const res = await emailMarketingEdge.triggerCheckReplies();
      toast.success(`Checked replies — ${res.processed} new`);
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Reply check failed");
    }
  };

  const unreadCount = replies.filter((r) => !r.is_read).length;

  return (
    <EmailMarketingLayout title="Activity">
      <div className="flex flex-wrap gap-2 mb-4">
        <EmActionButton variant="outline" size="sm" onClick={load} disabled={loading}>
          Refresh
        </EmActionButton>
        <EmActionButton variant="secondary" size="sm" onClick={checkReplies}>
          Check replies (IMAP)
        </EmActionButton>
        <EmActionButton
          variant="secondary"
          size="sm"
          onClick={async () => {
            try {
              const r = await emailMarketingEdge.triggerSendQueue();
              toast.success(`Send queue processed — ${r.sent} sent`);
              load();
            } catch (e) {
              toast.error(e instanceof Error ? e.message : "Send queue failed");
            }
          }}
        >
          Process send queue
        </EmActionButton>
      </div>

      <Tabs defaultValue="sent">
        <TabsList className="bg-gray-900 border border-gray-800">
          <TabsTrigger value="sent">Sent ({sent.length})</TabsTrigger>
          <TabsTrigger value="replies">
            Replies ({replies.length})
            {unreadCount > 0 && (
              <Badge className="ml-2 bg-amber-600">{unreadCount} unread</Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sent" className="mt-4">
          <div className="rounded-lg border border-gray-800 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800">
                  <TableHead className="text-gray-400">To</TableHead>
                  <TableHead className="text-gray-400">Subject</TableHead>
                  <TableHead className="text-gray-400">Sent</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sent.map((m) => (
                  <TableRow key={m.id} className="border-gray-800">
                    <TableCell className="text-gray-300">{m.to_email}</TableCell>
                    <TableCell className="text-white">{m.subject}</TableCell>
                    <TableCell className="text-gray-500 text-sm">
                      {m.sent_at ? format(new Date(m.sent_at), "MMM d, h:mm a") : "—"}
                    </TableCell>
                  </TableRow>
                ))}
                {!loading && sent.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-gray-500 py-8">
                      No emails sent yet.{" "}
                      <Link to="/admin/email-marketing/settings" className="text-cyan-400 hover:underline">
                        Verify your domain in Settings
                      </Link>
                      , then import leads.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="replies" className="mt-4">
          <div className="space-y-3">
            {replies.map((m) => (
              <div
                key={m.id}
                className={`border rounded-lg p-4 ${
                  m.is_read ? "border-gray-800" : "border-amber-500/50 bg-amber-950/10"
                }`}
              >
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <p className="text-white font-medium">{m.from_email}</p>
                    <p className="text-sm text-gray-400">{m.subject}</p>
                    <p className="text-sm text-gray-300 mt-2 line-clamp-2">
                      {m.body_text ?? ""}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-gray-500">
                      {m.received_at
                        ? format(new Date(m.received_at), "MMM d, h:mm a")
                        : ""}
                    </p>
                    {m.lead_id && (
                      <Link
                        to={`/admin/email-marketing/leads/${m.lead_id}`}
                        className="text-cyan-400 text-sm hover:underline"
                        onClick={() => emailMarketingService.markMessageRead(m.id)}
                      >
                        View thread
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {!loading && replies.length === 0 && (
              <p className="text-gray-500 text-sm">No replies yet.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </EmailMarketingLayout>
  );
}
