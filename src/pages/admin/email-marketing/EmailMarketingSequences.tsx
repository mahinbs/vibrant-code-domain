import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EmailMarketingLayout } from "@/components/admin/email-marketing/EmailMarketingLayout";
import { EmActionButton } from "@/components/admin/email-marketing/EmActionButton";
import { emailMarketingService, emailMarketingEdge, emErrorMessage, type EmSequence } from "@/services/emailMarketing";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Plus } from "lucide-react";

type SeqRow = EmSequence & { stepCount: number; enrolled: number };

export default function EmailMarketingSequences() {
  const navigate = useNavigate();
  const [sequences, setSequences] = useState<SeqRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [newOpen, setNewOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPipeline, setNewPipeline] = useState<"cold" | "inbound">("cold");

  const load = async () => {
    setLoading(true);
    const seqs = await emailMarketingService.listSequences();
    const rows: SeqRow[] = [];
    for (const s of seqs) {
      const steps = await emailMarketingService.getSequenceSteps(s.id);
      const enrolled = await emailMarketingService.getSequenceEnrollmentCount(s.id);
      rows.push({ ...s, stepCount: steps.length, enrolled });
    }
    setSequences(rows);
    setLoading(false);
  };

  useEffect(() => {
    load().catch((e) => toast.error(e.message));
  }, []);

  const createSequence = async () => {
    if (!newName.trim()) return;
    try {
      const id = await emailMarketingService.createSequence({
        name: newName.trim(),
        pipeline: newPipeline,
      });
      setNewOpen(false);
      setNewName("");
      navigate(`/admin/email-marketing/sequences/${id}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Create failed");
    }
  };

  const duplicate = async (id: string) => {
    try {
      const newId = await emailMarketingService.duplicateSequence(id);
      toast.success("Sequence duplicated");
      navigate(`/admin/email-marketing/sequences/${newId}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Duplicate failed");
    }
  };

  const toggleActive = async (seq: EmSequence) => {
    try {
      await emailMarketingService.updateSequence(seq.id, { is_active: !seq.is_active });
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Update failed");
    }
  };

  const remove = async (seq: EmSequence) => {
    if (!confirm(`Delete "${seq.name}"?`)) return;
    try {
      await emailMarketingService.deleteSequence(seq.id);
      toast.success("Deleted");
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Delete failed");
    }
  };

  return (
    <EmailMarketingLayout title="Sequences">
      <div className="flex flex-wrap gap-2 mb-4">
        <Button onClick={() => setNewOpen(true)}>
          <Plus className="h-4 w-4 mr-1" /> New sequence
        </Button>
        <EmActionButton
          variant="outline"
          onClick={async () => {
            try {
              const seqId = await emailMarketingService.installColdOutreach12MonthTemplate();
              toast.success("12-month cold template ready");
              navigate(`/admin/email-marketing/sequences/${seqId}`);
            } catch (e) {
              toast.error(emErrorMessage(e));
            }
          }}
        >
          Install 12-month cold template
        </EmActionButton>
        <EmActionButton
          variant="outline"
          onClick={async () => {
            try {
              const result = await emailMarketingService.refreshColdOutreach12MonthTemplateCopy();
              const parts = [
                result.updated ? `${result.updated} updated` : null,
                result.inserted ? `${result.inserted} added` : null,
                result.skipped ? `${result.skipped} locked (skipped)` : null,
              ].filter(Boolean);
              toast.success(
                parts.length ? `12-month copy synced — ${parts.join(", ")}` : "12-month copy already up to date",
              );
              navigate(`/admin/email-marketing/sequences/${result.sequenceId}`);
            } catch (e) {
              toast.error(emErrorMessage(e));
            }
          }}
        >
          Refresh 12-month copy
        </EmActionButton>
        <EmActionButton
          variant="outline"
          size="sm"
          onClick={async () => {
            try {
              const r = await emailMarketingEdge.triggerProcessSequences();
              toast.success(`Processed ${r.processed} sequence steps`);
            } catch (e) {
              toast.error(e instanceof Error ? e.message : "Failed");
            }
          }}
        >
          Run sequence processor
        </EmActionButton>
      </div>

      <div className="rounded-lg border border-gray-800 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800">
              <TableHead className="text-gray-400">Name</TableHead>
              <TableHead className="text-gray-400">Pipeline</TableHead>
              <TableHead className="text-gray-400">Vertical</TableHead>
              <TableHead className="text-gray-400">Steps</TableHead>
              <TableHead className="text-gray-400">Enrolled</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sequences.map((seq) => (
              <TableRow key={seq.id} className="border-gray-800">
                <TableCell className="text-white">
                  <Link
                    to={`/admin/email-marketing/sequences/${seq.id}`}
                    className="hover:text-cyan-400"
                  >
                    {seq.name}
                  </Link>
                  {seq.is_default && (
                    <Badge className="ml-2" variant="outline">
                      Default
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{seq.pipeline}</Badge>
                </TableCell>
                <TableCell className="text-gray-400">{seq.vertical ?? "—"}</TableCell>
                <TableCell className="text-gray-300">{seq.stepCount}</TableCell>
                <TableCell className="text-gray-300">{seq.enrolled}</TableCell>
                <TableCell>
                  <Badge variant={seq.is_active ? "default" : "secondary"}>
                    {seq.is_active ? "Active" : "Paused"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end flex-wrap gap-1">
                    <EmActionButton size="sm" variant="outline" asChild>
                      <Link to={`/admin/email-marketing/sequences/${seq.id}`}>Edit</Link>
                    </EmActionButton>
                    <EmActionButton size="sm" variant="outline" onClick={() => duplicate(seq.id)}>
                      Copy
                    </EmActionButton>
                    <EmActionButton size="sm" variant="outline" onClick={() => toggleActive(seq)}>
                      {seq.is_active ? "Pause" : "Activate"}
                    </EmActionButton>
                    {!seq.is_default && (
                      <EmActionButton
                        size="sm"
                        variant="outline"
                        className="text-red-400 border-red-800 hover:bg-red-950"
                        onClick={() => remove(seq)}
                      >
                        Delete
                      </EmActionButton>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {!loading && sequences.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                  No sequences yet.{" "}
                  <button
                    type="button"
                    className="text-cyan-400 hover:underline"
                    onClick={() => setNewOpen(true)}
                  >
                    Create your first sequence
                  </button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={newOpen} onOpenChange={setNewOpen}>
        <DialogContent className="bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-white">New sequence</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label className="text-gray-400">Name</Label>
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Real estate cold"
                className="bg-gray-800 border-gray-700 mt-1"
              />
            </div>
            <div>
              <Label className="text-gray-400">Pipeline</Label>
              <Select value={newPipeline} onValueChange={(v) => setNewPipeline(v as "cold" | "inbound")}>
                <SelectTrigger className="bg-gray-800 border-gray-700 mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cold">Cold outreach</SelectItem>
                  <SelectItem value="inbound">Inbound nurture</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <EmActionButton variant="outline" onClick={() => setNewOpen(false)}>
              Cancel
            </EmActionButton>
            <Button onClick={createSequence}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </EmailMarketingLayout>
  );
}
