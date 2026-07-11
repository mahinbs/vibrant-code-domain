import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EmailMarketingLayout } from "@/components/admin/email-marketing/EmailMarketingLayout";
import {
  emailMarketingService,
  type EmEmailMessage,
  type EmReplyConversation,
} from "@/services/emailMarketing";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { format } from "date-fns";
import { emailMarketingEdge } from "@/services/emailMarketing";
import { stripQuotedReplyBody } from "@/lib/emailBody";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";

export default function EmailMarketingActivity() {
  const [sent, setSent] = useState<EmEmailMessage[]>([]);
  const [conversations, setConversations] = useState<EmReplyConversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [openKeys, setOpenKeys] = useState<Record<string, boolean>>({});

  const load = async () => {
    try {
      setLoading(true);
      const [outbound, convos] = await Promise.all([
        emailMarketingService.listOutboundMessages(),
        emailMarketingService.listReplyConversations(),
      ]);
      setSent(outbound);
      setConversations(convos);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load activity");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const unreadCount = conversations.reduce((n, c) => n + c.unread_count, 0);

  return (
    <EmailMarketingLayout title="Activity">
      <div className="flex flex-wrap gap-2 mb-4">
        <EmActionButton variant="outline" size="sm" onClick={load} disabled={loading}>
          Refresh
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
            Replies ({conversations.length})
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
            {conversations.map((convo) => {
              const label = convo.lead_name ?? convo.from_email;
              const isOpen = openKeys[convo.key] ?? false;
              return (
                <Collapsible
                  key={convo.key}
                  open={isOpen}
                  onOpenChange={(open) => setOpenKeys((prev) => ({ ...prev, [convo.key]: open }))}
                >
                  <div
                    className={`border rounded-lg ${
                      convo.unread_count > 0
                        ? "border-amber-500/50 bg-amber-950/10"
                        : "border-gray-800"
                    }`}
                  >
                    <CollapsibleTrigger className="w-full p-4 flex items-start justify-between gap-3 text-left hover:bg-gray-900/40 rounded-lg">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-white font-medium">{label}</p>
                          {convo.unread_count > 0 && (
                            <Badge className="bg-amber-600">{convo.unread_count} unread</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-400 truncate">{convo.latest_subject}</p>
                        <p className="text-sm text-gray-300 mt-1 line-clamp-1">{convo.latest_preview}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs text-gray-500">
                          {format(new Date(convo.latest_at), "MMM d, h:mm a")}
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-4 pb-4 space-y-2 border-t border-gray-800">
                      {convo.messages.map((m) => {
                        const { preview } = stripQuotedReplyBody(m.body_text ?? "");
                        return (
                          <div
                            key={m.id}
                            className={`rounded p-3 text-sm ${
                              !m.is_read ? "bg-amber-950/20 border border-amber-500/30" : "bg-gray-900/50"
                            }`}
                          >
                            <p className="text-gray-400 text-xs mb-1">
                              {format(new Date(m.received_at ?? m.created_at), "MMM d, h:mm a")} · {m.subject}
                            </p>
                            <p className="text-gray-300 line-clamp-2">{preview}</p>
                          </div>
                        );
                      })}
                      {convo.lead_id && (
                        <Link
                          to={`/admin/email-marketing/leads/${convo.lead_id}`}
                          className="inline-block text-cyan-400 text-sm hover:underline mt-2"
                          onClick={() => {
                            for (const m of convo.messages) {
                              if (!m.is_read) emailMarketingService.markMessageRead(m.id);
                            }
                          }}
                        >
                          View full thread & reply
                        </Link>
                      )}
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              );
            })}
            {!loading && conversations.length === 0 && (
              <p className="text-gray-500 text-sm">
                No replies yet. Replies appear when leads respond to marketing emails.
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </EmailMarketingLayout>
  );
}
