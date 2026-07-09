import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmailMarketingLayout } from "@/components/admin/email-marketing/EmailMarketingLayout";
import { emailMarketingService } from "@/services/emailMarketing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { emailMarketingEdge } from "@/services/emailMarketing";

export default function EmailMarketingCampaignNew() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [pipeline, setPipeline] = useState("all");
  const [status, setStatus] = useState("all");
  const [sending, setSending] = useState(false);

  const handleCreate = async (andSend: boolean) => {
    if (!name || !subject || !body) {
      toast.error("Fill in name, subject, and body");
      return;
    }
    try {
      setSending(true);
      const segment_filter: Record<string, unknown> = {};
      if (pipeline !== "all") segment_filter.pipeline = pipeline;
      if (status !== "all") segment_filter.status = status;

      const id = await emailMarketingService.createBlastCampaign({
        name,
        subject,
        body_text: body,
        segment_filter,
      });

      if (andSend) {
        const queued = await emailMarketingService.queueBlast(id);
        await emailMarketingEdge.triggerSendQueue();
        toast.success(`Blast queued for ${queued} recipients`);
      } else {
        toast.success("Campaign saved as draft");
      }
      navigate(`/admin/email-marketing/campaigns/${id}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to create campaign");
    } finally {
      setSending(false);
    }
  };

  return (
    <EmailMarketingLayout title="New blast">
      <div className="max-w-2xl space-y-4">
        <div>
          <Label className="text-gray-400">Campaign name</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-800 border-gray-700"
          />
        </div>
        <div>
          <Label className="text-gray-400">Subject</Label>
          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="bg-gray-800 border-gray-700"
          />
        </div>
        <div>
          <Label className="text-gray-400">Body</Label>
          <Textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={12}
            className="bg-gray-800 border-gray-700 font-mono text-sm"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-gray-400">Pipeline filter</Label>
            <Select value={pipeline} onValueChange={setPipeline}>
              <SelectTrigger className="bg-gray-800 border-gray-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="inbound">Inbound</SelectItem>
                <SelectItem value="cold">Cold</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-gray-400">Status filter</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="bg-gray-800 border-gray-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="opened">Opened</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => handleCreate(true)} disabled={sending}>
            {sending ? "Sending…" : "Send blast"}
          </Button>
          <Button variant="outline" onClick={() => handleCreate(false)} disabled={sending}>
            Save draft
          </Button>
        </div>
      </div>
    </EmailMarketingLayout>
  );
}
