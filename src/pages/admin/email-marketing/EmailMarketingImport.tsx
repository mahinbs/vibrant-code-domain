import { useEffect, useState } from "react";
import { EmailMarketingLayout } from "@/components/admin/email-marketing/EmailMarketingLayout";
import { emailMarketingService, type EmSequence } from "@/services/emailMarketing";
import { EmActionButton } from "@/components/admin/email-marketing/EmActionButton";
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

function parseCsv(text: string): { email: string; name?: string; company?: string; role?: string }[] {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase().replace(/"/g, ""));
  const emailIdx = headers.findIndex((h) => h === "email" || h === "e-mail");
  const nameIdx = headers.findIndex((h) => h === "name");
  const companyIdx = headers.findIndex((h) => h === "company");
  const roleIdx = headers.findIndex((h) => h === "role");
  if (emailIdx < 0) throw new Error("CSV must have an email column");

  return lines.slice(1).map((line) => {
    const cols = line.match(/("([^"]|"")*"|[^,]*)/g)?.map((c) =>
      c.replace(/^"|"$/g, "").replace(/""/g, '"').trim(),
    ) ?? line.split(",");
    return {
      email: cols[emailIdx] ?? "",
      name: nameIdx >= 0 ? cols[nameIdx] : undefined,
      company: companyIdx >= 0 ? cols[companyIdx] : undefined,
      role: roleIdx >= 0 ? cols[roleIdx] : undefined,
    };
  }).filter((r) => r.email);
}

export default function EmailMarketingImport() {
  const [csv, setCsv] = useState("email,name,company\n");
  const [pipeline, setPipeline] = useState<"cold" | "blast_only">("cold");
  const [sequences, setSequences] = useState<EmSequence[]>([]);
  const [sequenceId, setSequenceId] = useState<string>("");
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    if (pipeline !== "cold") return;
    emailMarketingService
      .listSequences({ pipeline: "cold", is_active: true })
      .then((seqs) => {
        setSequences(seqs);
        const def = seqs.find((s) => s.is_default) ?? seqs[0];
        if (def) setSequenceId(def.id);
      })
      .catch(() => {});
  }, [pipeline]);

  const handleImport = async () => {
    try {
      setImporting(true);
      const rows = parseCsv(csv);
      const count = await emailMarketingService.importLeadsCsv(rows, {
        pipeline,
        sequenceId: pipeline === "cold" ? sequenceId : undefined,
      });
      toast.success(`Imported ${count} leads`);

      if (pipeline === "cold") {
        for (const row of rows.slice(0, 5)) {
          const leads = await emailMarketingService.listLeads({ pipeline: "cold" });
          const lead = leads.find((l) => l.email === row.email.toLowerCase());
          if (lead) {
            try {
              await emailMarketingEdge.researchCompany({ lead_id: lead.id });
            } catch {
              /* research optional if no API key */
            }
          }
        }
        await emailMarketingEdge.triggerProcessSequences();
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Import failed");
    } finally {
      setImporting(false);
    }
  };

  return (
    <EmailMarketingLayout title="Import leads">
      <div className="max-w-2xl space-y-4">
        <p className="text-sm text-gray-400">
          Paste CSV with columns: email (required), name, company, role.
        </p>
        <div>
          <Label className="text-gray-400">Pipeline</Label>
          <Select value={pipeline} onValueChange={(v) => setPipeline(v as "cold" | "blast_only")}>
            <SelectTrigger className="w-48 bg-gray-800 border-gray-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cold">Cold outreach</SelectItem>
              <SelectItem value="blast_only">Blast only</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {pipeline === "cold" && sequences.length > 0 && (
          <div>
            <Label className="text-gray-400">Sequence</Label>
            <Select value={sequenceId} onValueChange={setSequenceId}>
              <SelectTrigger className="w-full max-w-md bg-gray-800 border-gray-700">
                <SelectValue placeholder="Choose sequence" />
              </SelectTrigger>
              <SelectContent>
                {sequences.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.name}
                    {s.is_default ? " (default)" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        <Textarea
          value={csv}
          onChange={(e) => setCsv(e.target.value)}
          rows={14}
          className="font-mono text-sm bg-gray-800 border-gray-700"
        />
        <EmActionButton onClick={handleImport} disabled={importing || (pipeline === "cold" && !sequenceId)}>
          {importing ? "Importing…" : "Import & enroll"}
        </EmActionButton>
      </div>
    </EmailMarketingLayout>
  );
}
