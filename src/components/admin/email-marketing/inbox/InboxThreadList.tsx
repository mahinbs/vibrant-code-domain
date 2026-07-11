import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import type { EmInboxThread } from "@/services/emailMarketing";

type Props = {
  threads: EmInboxThread[];
  selectedLeadId: string | null;
  onSelect: (thread: EmInboxThread) => void;
  emptyMessage?: string;
};

export function InboxThreadList({ threads, selectedLeadId, onSelect, emptyMessage }: Props) {
  if (!threads.length) {
    return (
      <div className="flex items-center justify-center h-full p-8 text-center">
        <p className="text-gray-500 text-sm">{emptyMessage ?? "No conversations match this filter."}</p>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto h-full divide-y divide-gray-800/80">
      {threads.map((thread) => {
        const isSelected = thread.lead_id === selectedLeadId;
        const label = thread.lead_name ?? thread.lead_email ?? "Unknown";
        const subtitle = thread.lead_company ? ` · ${thread.lead_company}` : "";

        return (
          <button
            key={thread.key}
            type="button"
            onClick={() => onSelect(thread)}
            className={`w-full text-left px-4 py-3 transition-colors hover:bg-gray-900/60 ${
              isSelected ? "bg-cyan-950/30 border-l-2 border-l-cyan-500" : "border-l-2 border-l-transparent"
            } ${thread.unread_count > 0 ? "font-medium" : ""}`}
          >
            <div className="flex items-start justify-between gap-2 mb-1">
              <p className={`text-sm truncate ${thread.unread_count > 0 ? "text-white" : "text-gray-200"}`}>
                {label}
                {subtitle && <span className="text-gray-500 font-normal">{subtitle}</span>}
              </p>
              <span className="text-[10px] text-gray-500 shrink-0 whitespace-nowrap">
                {formatDistanceToNow(new Date(thread.latest_at), { addSuffix: true })}
              </span>
            </div>
            <p className="text-xs text-gray-400 truncate mb-1">{thread.latest_subject}</p>
            <p className="text-xs text-gray-500 line-clamp-1 mb-2">{thread.latest_preview}</p>
            <div className="flex flex-wrap gap-1">
              {thread.needs_reply && (
                <Badge className="text-[10px] px-1.5 py-0 bg-amber-600">Needs reply</Badge>
              )}
              {thread.unread_count > 0 && !thread.needs_reply && (
                <Badge className="text-[10px] px-1.5 py-0 bg-amber-600/80">{thread.unread_count} unread</Badge>
              )}
              {thread.has_active_enrollment && (
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-cyan-700 text-cyan-400">
                  Sequence
                </Badge>
              )}
              {thread.lead_status === "replied" && (
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                  Replied
                </Badge>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
