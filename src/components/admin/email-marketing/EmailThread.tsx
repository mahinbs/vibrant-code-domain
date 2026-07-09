import type { EmEmailMessage } from "@/services/emailMarketing/types";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

type EmailThreadProps = {
  messages: EmEmailMessage[];
  eventsBySendId?: Record<string, string[]>;
};

export function EmailThread({ messages, eventsBySendId = {} }: EmailThreadProps) {
  if (!messages.length) {
    return <p className="text-gray-500 text-sm">No emails yet.</p>;
  }

  return (
    <div className="space-y-4">
      {messages.map((msg) => {
        const isInbound = msg.direction === "inbound";
        const time = msg.sent_at ?? msg.received_at ?? msg.created_at;
        const events = msg.send_id ? eventsBySendId[msg.send_id] ?? [] : [];

        return (
          <div
            key={msg.id}
            className={`rounded-lg border p-4 ${
              isInbound
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
              {msg.body_text ?? msg.body_html?.replace(/<[^>]+>/g, "") ?? ""}
            </div>
            {events.length > 0 && (
              <p className="text-xs text-gray-500 mt-2">{events.join(" · ")}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
