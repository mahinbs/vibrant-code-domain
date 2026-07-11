import { useEffect, useRef, useState, type RefObject } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { EmActionButton } from "@/components/admin/email-marketing/EmActionButton";
import { emailMarketingEdge, type EmEmailMessage } from "@/services/emailMarketing";
import { toast } from "sonner";

type Props = {
  leadId: string;
  messages: EmEmailMessage[];
  lastInboundMessage: EmEmailMessage | null | undefined;
  onSent: () => void;
  showMarkReplied?: boolean;
  leadStatus?: string | null;
  composerRef?: RefObject<HTMLTextAreaElement | null>;
};

export function InboxReplyComposer({
  leadId,
  messages,
  lastInboundMessage,
  onSent,
  showMarkReplied = true,
  leadStatus,
  composerRef,
}: Props) {
  const internalRef = useRef<HTMLTextAreaElement>(null);
  const textareaRef = composerRef ?? internalRef;
  const [replySubject, setReplySubject] = useState("");
  const [replyBody, setReplyBody] = useState("");
  const [sendingReply, setSendingReply] = useState(false);
  const [draftingReply, setDraftingReply] = useState(false);

  useEffect(() => {
    if (!messages.length) return;
    const base =
      lastInboundMessage?.subject ??
      messages[messages.length - 1]?.subject ??
      "your message";
    setReplySubject(base.match(/^re:/i) ? base : `Re: ${base}`);
  }, [leadId, messages, lastInboundMessage]);

  const sendReply = async () => {
    if (!replyBody.trim()) return;
    try {
      setSendingReply(true);
      await emailMarketingEdge.sendReply({
        lead_id: leadId,
        body_text: replyBody.trim(),
        subject: replySubject.trim() || undefined,
        in_reply_to_message_id: lastInboundMessage?.id,
      });
      toast.success("Reply sent");
      setReplyBody("");
      onSent();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Send failed");
    } finally {
      setSendingReply(false);
    }
  };

  const generateAiReply = async () => {
    try {
      setDraftingReply(true);
      const draft = await emailMarketingEdge.draftReply(leadId);
      setReplySubject(draft.subject);
      setReplyBody(draft.body);
      toast.success("AI draft ready — review and send");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "AI draft failed");
    } finally {
      setDraftingReply(false);
    }
  };

  const markReplied = async () => {
    try {
      await emailMarketingEdge.markLeadReplied(leadId);
      toast.success("Marked as replied — sequence stopped");
      onSent();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to mark as replied");
    }
  };

  return (
    <div className="border-t border-gray-800 bg-gray-900/80 p-4 space-y-3 shrink-0">
      <h3 className="text-sm font-medium text-white">Reply</h3>
      <div>
        <Label className="text-gray-400 text-xs">Subject</Label>
        <Input
          value={replySubject}
          onChange={(e) => setReplySubject(e.target.value)}
          className="bg-gray-800 border-gray-700 mt-1"
        />
      </div>
      <div>
        <Label className="text-gray-400 text-xs">Message</Label>
        <Textarea
          ref={textareaRef}
          value={replyBody}
          onChange={(e) => setReplyBody(e.target.value)}
          rows={5}
          placeholder="Write your reply…"
          className="bg-gray-800 border-gray-700 mt-1 resize-none"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <EmActionButton onClick={sendReply} disabled={sendingReply || !replyBody.trim()}>
          {sendingReply ? "Sending…" : "Send reply"}
        </EmActionButton>
        <EmActionButton variant="secondary" onClick={generateAiReply} disabled={draftingReply}>
          {draftingReply ? "Generating…" : "Generate AI reply"}
        </EmActionButton>
        {showMarkReplied && leadStatus !== "replied" && (
          <EmActionButton variant="outline" onClick={markReplied}>
            Mark as replied
          </EmActionButton>
        )}
      </div>
    </div>
  );
}
