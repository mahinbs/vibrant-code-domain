import { useMemo, useState } from "react";
import type { EmEmailMessage } from "@/services/emailMarketing/types";
import { stripQuotedReplyBody } from "@/lib/emailBody";
import { Badge } from "@/components/ui/badge";
import { EmActionButton } from "@/components/admin/email-marketing/EmActionButton";
import { format } from "date-fns";

type EmailThreadProps = {
  messages: EmEmailMessage[];
  eventsBySendId?: Record<string, string[]>;
  collapseAfter?: number;
};

function uniqueEvents(events: string[]): string[] {
  return [...new Set(events)];
}

export function EmailThread({
  messages,
  eventsBySendId = {},
  collapseAfter = 3,
}: EmailThreadProps) {
  const [expandedAll, setExpandedAll] = useState(false);
  const [expandedQuotes, setExpandedQuotes] = useState<Record<string, boolean>>({});

  const latestInboundId = useMemo(() => {
    const inbound = messages.filter((m) => m.direction === "inbound");
    return inbound.length ? inbound[inbound.length - 1].id : null;
  }, [messages]);

  const hiddenCount = Math.max(0, messages.length - collapseAfter);
  const shouldCollapse = !expandedAll && hiddenCount > 0;

  if (!messages.length) {
    return <p className="text-gray-500 text-sm">No emails yet.</p>;
  }

  const visible = shouldCollapse ? messages.slice(-collapseAfter) : messages;

  return (
    <div className="space-y-3">
      {shouldCollapse && (
        <EmActionButton
          size="sm"
          variant="ghost"
          className="text-gray-400"
          onClick={() => setExpandedAll(true)}
        >
          Show {hiddenCount} earlier message{hiddenCount === 1 ? "" : "s"}
        </EmActionButton>
      )}
      {expandedAll && hiddenCount > 0 && (
        <EmActionButton
          size="sm"
          variant="ghost"
          className="text-gray-400"
          onClick={() => setExpandedAll(false)}
        >
          Collapse older messages
        </EmActionButton>
      )}

      {visible.map((msg) => {
        const isInbound = msg.direction === "inbound";
        const time = msg.sent_at ?? msg.received_at ?? msg.created_at;
        const events =
          !isInbound && msg.send_id ? uniqueEvents(eventsBySendId[msg.send_id] ?? []) : [];
        const { preview, full } = stripQuotedReplyBody(msg.body_text ?? msg.body_html?.replace(/<[^>]+>/g, "") ?? "");
        const showFull = expandedQuotes[msg.id];
        const isLatestUnread = isInbound && !msg.is_read && msg.id === latestInboundId;

        return (
          <div
            key={msg.id}
            className={`rounded-lg border p-4 ${
              isLatestUnread
                ? "border-amber-500/60 bg-amber-950/20"
                : isInbound
                  ? "border-emerald-500/40 bg-emerald-950/20"
                  : "border-gray-700 bg-gray-900/50"
            }`}
          >
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge variant={isInbound ? "default" : "secondary"}>
                {isInbound ? "Reply" : "Sent"}
              </Badge>
              {!msg.is_read && isInbound && (
                <Badge className="bg-amber-600">Unread</Badge>
              )}
              <span className="text-xs text-gray-500">
                {time ? format(new Date(time), "MMM d, h:mm a") : ""}
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-1">
              {isInbound ? `From ${msg.from_email}` : `To ${msg.to_email} · from ${msg.from_email}`}
            </p>
            <p className="font-medium text-white mb-2">{msg.subject}</p>
            <div className="text-sm text-gray-300 whitespace-pre-wrap">
              {showFull ? full : preview}
            </div>
            {full.length > preview.length && (
              <button
                type="button"
                className="text-xs text-cyan-400 hover:underline mt-2"
                onClick={() =>
                  setExpandedQuotes((prev) => ({ ...prev, [msg.id]: !prev[msg.id] }))
                }
              >
                {showFull ? "Show less" : "Show full quote"}
              </button>
            )}
            {events.length > 0 && (
              <p className="text-xs text-gray-500 mt-2">{events.join(" · ")}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
