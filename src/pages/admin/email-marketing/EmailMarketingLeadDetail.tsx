import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { EmailMarketingLayout } from "@/components/admin/email-marketing/EmailMarketingLayout";
import { EmailThread } from "@/components/admin/email-marketing/EmailThread";
import {
  emailMarketingService,
  emailMarketingEdge,
  type EmLead,
  type EmEmailMessage,
} from "@/services/emailMarketing";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

export default function EmailMarketingLeadDetail() {
  const { id } = useParams<{ id: string }>();
  const [lead, setLead] = useState<EmLead | null>(null);
  const [messages, setMessages] = useState<EmEmailMessage[]>([]);
  const [events, setEvents] = useState<{ send_id: string | null; event_type: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const [l, m, e] = await Promise.all([
        emailMarketingService.getLead(id),
        emailMarketingService.getLeadMessages(id),
        emailMarketingService.getLeadEvents(id),
      ]);
      setLead(l);
      setMessages(m);
      setEvents(e);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load lead");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const eventsBySendId = useMemo(() => {
    const map: Record<string, string[]> = {};
    for (const ev of events) {
      if (!ev.send_id) continue;
      if (!map[ev.send_id]) map[ev.send_id] = [];
      map[ev.send_id].push(ev.event_type);
    }
    return map;
  }, [events]);

  const updateStatus = async (status: string) => {
    if (!id) return;
    await emailMarketingService.updateLead(id, { status } as Partial<EmLead>);
    toast.success("Status updated");
    load();
  };

  const runResearch = async () => {
    if (!id) return;
    try {
      await emailMarketingEdge.researchCompany({ lead_id: id });
      toast.success("Research complete");
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Research failed");
    }
  };

  if (loading) {
    return (
      <EmailMarketingLayout title="Lead">
        <p className="text-gray-500">Loading…</p>
      </EmailMarketingLayout>
    );
  }

  if (!lead) {
    return (
      <EmailMarketingLayout title="Lead">
        <p className="text-gray-500">Lead not found.</p>
      </EmailMarketingLayout>
    );
  }

  return (
    <EmailMarketingLayout title={lead.name ?? lead.email}>
      <Link
        to="/admin/email-marketing/leads"
        className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to leads
      </Link>

      <div className="flex flex-wrap gap-2 mb-4">
        <Badge>{lead.pipeline}</Badge>
        <Badge variant="secondary">{lead.status}</Badge>
        {lead.company && <span className="text-gray-400 text-sm">{lead.company}</span>}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <Select value={lead.status} onValueChange={updateStatus}>
          <SelectTrigger className="w-40 bg-gray-800 border-gray-700">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {["new", "researched", "contacted", "opened", "replied", "qualified", "dead"].map(
              (s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ),
            )}
          </SelectContent>
        </Select>
        {lead.pipeline === "cold" && (
          <Button size="sm" variant="outline" onClick={runResearch}>
            AI research
          </Button>
        )}
      </div>

      {lead.research_summary && (
        <div className="mb-6 p-4 rounded-lg border border-gray-800 bg-gray-900/50">
          <p className="text-xs text-gray-500 mb-1">Research summary</p>
          <p className="text-sm text-gray-300">{lead.research_summary}</p>
        </div>
      )}

      <h2 className="text-lg font-semibold text-white mb-3">Email thread</h2>
      <EmailThread messages={messages} eventsBySendId={eventsBySendId} />
    </EmailMarketingLayout>
  );
}
