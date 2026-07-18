import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { EmailMarketingLayout } from "@/components/admin/email-marketing/EmailMarketingLayout";
import { InboxSearchBar, type InboxFilter } from "@/components/admin/email-marketing/inbox/InboxSearchBar";
import { InboxThreadList } from "@/components/admin/email-marketing/inbox/InboxThreadList";
import { InboxConversationPane } from "@/components/admin/email-marketing/inbox/InboxConversationPane";
import { EmActionButton } from "@/components/admin/email-marketing/EmActionButton";
import {
  emailMarketingService,
  emailMarketingEdge,
  type EmEmailMessage,
  type EmInboxThread,
  type EmLead,
} from "@/services/emailMarketing";
import { toast } from "sonner";

function matchesFilter(thread: EmInboxThread, filter: InboxFilter): boolean {
  switch (filter) {
    case "needs_reply":
      return thread.needs_reply;
    case "unread":
      return thread.unread_count > 0;
    case "waiting":
      return thread.last_direction === "outbound" && thread.lead_status !== "replied";
    case "replied":
      return thread.lead_status === "replied";
    default:
      return true;
  }
}

function matchesSearch(thread: EmInboxThread, q: string): boolean {
  if (!q.trim()) return true;
  const haystack = [
    thread.lead_name,
    thread.lead_email,
    thread.lead_company,
    thread.latest_subject,
    thread.latest_preview,
    ...thread.messages.map((m) => m.body_text ?? ""),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(q.toLowerCase());
}

export default function EmailMarketingInbox() {
  const [threads, setThreads] = useState<EmInboxThread[]>([]);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [selectedThread, setSelectedThread] = useState<EmInboxThread | null>(null);
  const [lead, setLead] = useState<EmLead | null>(null);
  const [messages, setMessages] = useState<EmEmailMessage[]>([]);
  const [events, setEvents] = useState<{ send_id: string | null; event_type: string }[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<InboxFilter>("needs_reply");
  const [loading, setLoading] = useState(true);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const composerRef = useRef<HTMLTextAreaElement>(null);
  const autoSelectedRef = useRef(false);

  const loadThreads = useCallback(async () => {
    try {
      setLoading(true);
      const data = await emailMarketingService.listInboxThreads();
      setThreads(data);
      return data;
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load inbox");
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredThreads = useMemo(() => {
    return threads.filter((t) => matchesFilter(t, filter) && matchesSearch(t, search));
  }, [threads, filter, search]);

  const loadConversation = useCallback(async (thread: EmInboxThread) => {
    if (!thread.lead_id) return;
    const [l, m, e] = await Promise.all([
      emailMarketingService.getLead(thread.lead_id),
      emailMarketingService.getLeadMessages(thread.lead_id),
      emailMarketingService.getLeadEvents(thread.lead_id),
    ]);
    setLead(l);
    setMessages(m);
    setEvents(e);

    const unreadInbound = m.filter((msg) => msg.direction === "inbound" && !msg.is_read);
    await Promise.all(unreadInbound.map((msg) => emailMarketingService.markMessageRead(msg.id)));

    if (unreadInbound.length) {
      setThreads((prev) =>
        prev.map((t) =>
          t.lead_id === thread.lead_id
            ? {
                ...t,
                unread_count: 0,
                needs_reply: false,
                messages: t.messages.map((msg) =>
                  msg.direction === "inbound" ? { ...msg, is_read: true } : msg,
                ),
              }
            : t,
        ),
      );
    }
  }, []);

  const selectThread = useCallback(
    async (thread: EmInboxThread) => {
      if (!thread.lead_id) {
        toast.error("This conversation is not linked to a lead yet.");
        return;
      }
      setSelectedLeadId(thread.lead_id);
      setSelectedThread(thread);
      await loadConversation(thread);
    },
    [loadConversation],
  );

  useEffect(() => {
    loadThreads().then((data) => {
      if (autoSelectedRef.current) return;
      const needsReply = data.filter((t) => t.needs_reply && t.lead_id);
      if (needsReply.length) {
        autoSelectedRef.current = true;
        selectThread(needsReply[0]);
      }
    });
  }, [loadThreads, selectThread]);

  const refreshAll = async () => {
    const data = await loadThreads();
    if (selectedLeadId) {
      const thread = data.find((t) => t.lead_id === selectedLeadId);
      if (thread) {
        setSelectedThread(thread);
        await loadConversation(thread);
      }
    }
  };

  const onConversationSent = async () => {
    await refreshAll();
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (e.key === "/" && !isTyping) {
        e.preventDefault();
        searchInputRef.current?.focus();
        return;
      }

      if (isTyping && e.key !== "Escape") return;

      if (e.key === "j" || e.key === "k") {
        e.preventDefault();
        const idx = filteredThreads.findIndex((t) => t.lead_id === selectedLeadId);
        const next =
          e.key === "j"
            ? Math.min(idx + 1, filteredThreads.length - 1)
            : Math.max(idx - 1, 0);
        const thread = filteredThreads[next];
        if (thread) selectThread(thread);
        return;
      }

      if (e.key === "r" && selectedLeadId) {
        e.preventDefault();
        composerRef.current?.focus();
        return;
      }

      if (e.key === "Escape" && selectedLeadId) {
        setSelectedLeadId(null);
        setSelectedThread(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [filteredThreads, selectedLeadId, selectThread]);

  const emptyListMessage =
    filter === "needs_reply" ? "All caught up — no replies waiting." : "No conversations match this filter.";

  return (
    <EmailMarketingLayout title="Inbox" fullWidth>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <p className="text-xs text-gray-500">
          Unified threads — select a conversation to read and reply inline.
        </p>
        <div className="flex flex-wrap gap-2">
          <EmActionButton
            variant="outline"
            size="sm"
            onClick={async () => {
              try {
                const r = await emailMarketingEdge.triggerProcessSequences();
                toast.success(`Sequence processor — ${r.processed} queued`);
                refreshAll();
              } catch (e) {
                toast.error(e instanceof Error ? e.message : "Sequence processor failed");
              }
            }}
          >
            Run sequence processor
          </EmActionButton>
          <EmActionButton
            variant="outline"
            size="sm"
            onClick={async () => {
              try {
                const r = await emailMarketingEdge.triggerSendQueue();
                toast.success(`Send queue processed — ${r.sent} sent`);
                refreshAll();
              } catch (e) {
                toast.error(e instanceof Error ? e.message : "Send queue failed");
              }
            }}
          >
            Process send queue
          </EmActionButton>
        </div>
      </div>

      <div className="rounded-lg border border-gray-800 bg-gray-950/50 overflow-hidden flex flex-col h-[calc(100vh-14rem)] min-h-[480px]">
        <div className="p-3 border-b border-gray-800 shrink-0">
          <InboxSearchBar
            search={search}
            onSearchChange={setSearch}
            filter={filter}
            onFilterChange={setFilter}
            onRefresh={refreshAll}
            loading={loading}
            searchInputRef={searchInputRef}
          />
        </div>

        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[minmax(280px,36%)_1fr]">
          <div
            className={`border-r border-gray-800 min-h-0 flex flex-col ${
              selectedLeadId ? "hidden lg:flex" : "flex"
            }`}
          >
            <InboxThreadList
              threads={filteredThreads}
              selectedLeadId={selectedLeadId}
              onSelect={selectThread}
              emptyMessage={loading ? "Loading…" : emptyListMessage}
            />
          </div>

          <div className={`min-h-0 flex flex-col ${selectedLeadId ? "flex" : "hidden lg:flex"}`}>
            <InboxConversationPane
              thread={selectedThread}
              lead={lead}
              messages={messages}
              events={events}
              onSent={onConversationSent}
              onBack={() => {
                setSelectedLeadId(null);
                setSelectedThread(null);
              }}
              showBack
              composerRef={composerRef}
            />
          </div>
        </div>
      </div>
    </EmailMarketingLayout>
  );
}
