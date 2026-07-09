import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { EmailMarketingLayout } from "@/components/admin/email-marketing/EmailMarketingLayout";
import { EmailThread } from "@/components/admin/email-marketing/EmailThread";
import {
  emailMarketingService,
  emailMarketingEdge,
  type EmLead,
  type EmEmailMessage,
  type EmSequence,
  type EmSequenceEnrollment,
} from "@/services/emailMarketing";
import { EmActionButton } from "@/components/admin/email-marketing/EmActionButton";
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
import { formatDistanceToNow } from "date-fns";

export default function EmailMarketingLeadDetail() {
  const { id } = useParams<{ id: string }>();
  const [lead, setLead] = useState<EmLead | null>(null);
  const [messages, setMessages] = useState<EmEmailMessage[]>([]);
  const [events, setEvents] = useState<{ send_id: string | null; event_type: string }[]>([]);
  const [enrollment, setEnrollment] = useState<EmSequenceEnrollment | null>(null);
  const [sequences, setSequences] = useState<EmSequence[]>([]);
  const [stepCount, setStepCount] = useState(0);
  const [enrollSequenceId, setEnrollSequenceId] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const [l, m, e, en] = await Promise.all([
        emailMarketingService.getLead(id),
        emailMarketingService.getLeadMessages(id),
        emailMarketingService.getLeadEvents(id),
        emailMarketingService.getLeadEnrollment(id),
      ]);
      setLead(l);
      setMessages(m);
      setEvents(e);
      setEnrollment(en);
      if (l && l.pipeline !== "blast_only") {
        const seqs = await emailMarketingService.listSequences({
          pipeline: l.pipeline as "cold" | "inbound",
          is_active: true,
        });
        setSequences(seqs);
        if (en?.sequence_id) {
          const steps = await emailMarketingService.getSequenceSteps(en.sequence_id);
          setStepCount(steps.length);
        } else {
          setStepCount(0);
        }
      }
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

  const enroll = async () => {
    if (!id || !enrollSequenceId) return;
    try {
      await emailMarketingService.enrollLead(id, enrollSequenceId);
      toast.success("Enrolled in sequence");
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Enroll failed");
    }
  };

  const pauseEnrollment = async () => {
    if (!enrollment) return;
    await emailMarketingService.pauseEnrollment(enrollment.id);
    toast.success("Sequence paused");
    load();
  };

  const resumeEnrollment = async () => {
    if (!enrollment) return;
    await emailMarketingService.resumeEnrollment(enrollment.id);
    toast.success("Sequence resumed");
    load();
  };

  const removeEnrollment = async () => {
    if (!enrollment) return;
    await emailMarketingService.removeEnrollment(enrollment.id);
    toast.success("Removed from sequence");
    load();
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

  const seqName = (enrollment?.em_sequences as EmSequence | undefined)?.name;

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

      {lead.pipeline !== "blast_only" && (
        <div className="mb-6 p-4 rounded-lg border border-gray-800 bg-gray-900/50 space-y-3">
          <h3 className="text-sm font-medium text-white">Sequence enrollment</h3>
          {enrollment ? (
            <div className="text-sm text-gray-400 space-y-1">
              <p>
                <span className="text-gray-300">{seqName ?? "Sequence"}</span>
                {" · "}
                Step {enrollment.current_step} of {stepCount}
                {" · "}
                <Badge variant="outline">{enrollment.status}</Badge>
              </p>
              {enrollment.next_send_at && enrollment.status === "active" && (
                <p>
                  Next send{" "}
                  {formatDistanceToNow(new Date(enrollment.next_send_at), { addSuffix: true })}
                </p>
              )}
              {enrollment.stopped_reason && (
                <p>Stopped: {enrollment.stopped_reason}</p>
              )}
              <div className="flex flex-wrap gap-2 pt-2">
                {enrollment.status === "active" && (
                  <EmActionButton size="sm" variant="outline" onClick={pauseEnrollment}>
                    Pause
                  </EmActionButton>
                )}
                {enrollment.status === "paused" && (
                  <EmActionButton size="sm" variant="outline" onClick={resumeEnrollment}>
                    Resume
                  </EmActionButton>
                )}
                <EmActionButton size="sm" variant="secondary" onClick={removeEnrollment}>
                  Remove from sequence
                </EmActionButton>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Not enrolled in a sequence.</p>
          )}
          <div className="flex flex-wrap gap-2 items-end">
            <div className="min-w-[200px]">
              <Select value={enrollSequenceId} onValueChange={setEnrollSequenceId}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Enroll in sequence…" />
                </SelectTrigger>
                <SelectContent>
                  {sequences.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <EmActionButton size="sm" onClick={enroll} disabled={!enrollSequenceId}>
              Enroll
            </EmActionButton>
          </div>
        </div>
      )}

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
          <EmActionButton size="sm" variant="outline" onClick={runResearch}>
            AI research
          </EmActionButton>
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
