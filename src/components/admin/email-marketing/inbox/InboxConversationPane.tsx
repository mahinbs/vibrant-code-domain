import { useMemo, type RefObject } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { EmailThread } from "@/components/admin/email-marketing/EmailThread";
import { InboxReplyComposer } from "./InboxReplyComposer";
import { Badge } from "@/components/ui/badge";
import type { EmEmailMessage, EmInboxThread, EmLead } from "@/services/emailMarketing";

type Props = {
  thread: EmInboxThread | null;
  lead: EmLead | null;
  messages: EmEmailMessage[];
  events: { send_id: string | null; event_type: string }[];
  onSent: () => void;
  onBack?: () => void;
  showBack?: boolean;
  composerRef?: RefObject<HTMLTextAreaElement | null>;
};

export function InboxConversationPane({
  thread,
  lead,
  messages,
  events,
  onSent,
  onBack,
  showBack,
  composerRef,
}: Props) {
  const eventsBySendId = useMemo(() => {
    const map: Record<string, string[]> = {};
    for (const ev of events) {
      if (!ev.send_id) continue;
      if (!map[ev.send_id]) map[ev.send_id] = [];
      map[ev.send_id].push(ev.event_type);
    }
    return map;
  }, [events]);

  const lastInboundMessage = useMemo(
    () => [...messages].reverse().find((m) => m.direction === "inbound"),
    [messages],
  );

  if (!thread || !thread.lead_id) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <p className="text-gray-500 text-sm">Select a conversation to view the thread and reply.</p>
      </div>
    );
  }

  const displayName = lead?.name ?? thread.lead_name ?? thread.lead_email ?? "Lead";

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="shrink-0 px-4 py-3 border-b border-gray-800 bg-gray-900/40">
        <div className="flex items-start gap-2">
          {showBack && onBack && (
            <button
              type="button"
              onClick={onBack}
              className="lg:hidden p-1 text-gray-400 hover:text-white shrink-0 mt-0.5"
              aria-label="Back to list"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          )}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base font-semibold text-white truncate">{displayName}</h2>
              {lead?.status && <Badge variant="secondary">{lead.status}</Badge>}
              {thread.has_active_enrollment && (
                <Badge variant="outline" className="border-cyan-700 text-cyan-400">
                  Sequence active
                </Badge>
              )}
            </div>
            <p className="text-xs text-gray-500 truncate">{thread.lead_email}</p>
            {thread.lead_company && (
              <p className="text-xs text-gray-400 truncate">{thread.lead_company}</p>
            )}
          </div>
          <Link
            to={`/admin/email-marketing/leads/${thread.lead_id}`}
            className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:underline shrink-0"
          >
            View lead profile
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto p-4">
        <EmailThread messages={messages} eventsBySendId={eventsBySendId} />
      </div>

      <InboxReplyComposer
        leadId={thread.lead_id}
        messages={messages}
        lastInboundMessage={lastInboundMessage}
        onSent={onSent}
        leadStatus={lead?.status ?? thread.lead_status}
        composerRef={composerRef}
      />
    </div>
  );
}
