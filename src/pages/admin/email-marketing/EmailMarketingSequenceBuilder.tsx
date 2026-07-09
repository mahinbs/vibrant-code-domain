import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { EmailMarketingLayout } from "@/components/admin/email-marketing/EmailMarketingLayout";
import { SequenceHeader } from "@/components/admin/email-marketing/sequences/SequenceHeader";
import { SequenceStepCard } from "@/components/admin/email-marketing/sequences/SequenceStepCard";
import {
  emailMarketingService,
  emailMarketingEdge,
  type EmSequence,
  type EmSequenceStep,
  type EmSequenceStepStats,
  type EmSequenceTemplate,
} from "@/services/emailMarketing";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function EmailMarketingSequenceBuilder() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [sequence, setSequence] = useState<EmSequence | null>(null);
  const [steps, setSteps] = useState<EmSequenceStep[]>([]);
  const [stats, setStats] = useState<EmSequenceStepStats[]>([]);
  const [templates, setTemplates] = useState<EmSequenceTemplate[]>([]);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState<{ subject: string; body: string } | null>(null);
  const caseStudies = emailMarketingService.listCaseStudies();

  const load = async () => {
    if (!id) return;
    const [seq, stepList, stepStats, tmpl] = await Promise.all([
      emailMarketingService.getSequence(id),
      emailMarketingService.getSequenceSteps(id),
      emailMarketingService.getSequenceStepStats(id),
      emailMarketingService.listSequenceTemplates(),
    ]);
    if (!seq) {
      toast.error("Sequence not found");
      navigate("/admin/email-marketing/sequences");
      return;
    }
    setSequence(seq);
    setSteps(stepList);
    setStats(stepStats);
    setTemplates(tmpl);
  };

  useEffect(() => {
    load().catch((e) => toast.error(e.message));
  }, [id]);

  const updateStepLocal = (stepId: string, patch: Partial<EmSequenceStep>) => {
    setSteps((prev) => prev.map((s) => (s.id === stepId ? { ...s, ...patch } : s)));
  };

  const saveSequence = async () => {
    if (!sequence || !id) return;
    setSaving(true);
    try {
      await emailMarketingService.updateSequence(id, {
        name: sequence.name,
        description: sequence.description,
        vertical: sequence.vertical,
        is_active: sequence.is_active,
      });
      toast.success("Sequence saved");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const saveStep = async (step: EmSequenceStep) => {
    try {
      await emailMarketingService.updateSequenceStep(step.id, step);
      toast.success(`Step ${step.step_order} saved`);
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    }
  };

  const addStep = async () => {
    if (!id) return;
    try {
      await emailMarketingService.createSequenceStep(id);
      if (steps.length >= 15) {
        toast.info("Long sequences may affect deliverability — consider keeping under 12 steps.");
      }
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to add step");
    }
  };

  const deleteStep = async (stepId: string) => {
    if (!confirm("Delete this step?")) return;
    try {
      await emailMarketingService.deleteSequenceStep(stepId);
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Delete failed");
    }
  };

  const moveStep = async (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= steps.length || !id) return;
    const ordered = [...steps];
    const [moved] = ordered.splice(index, 1);
    ordered.splice(newIndex, 0, moved);
    await emailMarketingService.reorderSequenceSteps(id, ordered.map((s) => s.id));
    load();
  };

  const previewStep = async (step: EmSequenceStep) => {
    try {
      const result = await emailMarketingEdge.previewDraft({
        step_id: step.id,
        sequence_id: id,
        step_order: step.step_order,
        sample_lead: {
          name: "Alex",
          company: "Acme Corp",
          metadata: { industry: sequence?.vertical ?? "saas" },
          research_summary: "Growing B2B team, manual ops workflows.",
          pain_points: ["slow lead follow-up", "spreadsheet chaos"],
        },
      });
      setPreview({ subject: result.subject, body: result.body });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Preview failed");
    }
  };

  if (!sequence) {
    return (
      <EmailMarketingLayout title="Sequence builder">
        <p className="text-gray-500">Loading…</p>
      </EmailMarketingLayout>
    );
  }

  const statsByStep = Object.fromEntries(stats.map((s) => [s.step_id, s]));

  return (
    <EmailMarketingLayout title={sequence.name}>
      <Link
        to="/admin/email-marketing/sequences"
        className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-1" /> All sequences
      </Link>

      <SequenceHeader
        sequence={sequence}
        onChange={(patch) => setSequence({ ...sequence, ...patch })}
        onSave={saveSequence}
        saving={saving}
      />

      <div className="space-y-4">
        {steps.map((step, index) => (
          <SequenceStepCard
            key={step.id}
            step={step}
            caseStudies={caseStudies}
            templates={templates}
            stats={statsByStep[step.id]}
            canMoveUp={index > 0}
            canMoveDown={index < steps.length - 1}
            onChange={(patch) => updateStepLocal(step.id, patch)}
            onSave={() => {
              const current = steps.find((s) => s.id === step.id);
              if (current) saveStep(current);
            }}
            onDelete={() => deleteStep(step.id)}
            onMoveUp={() => moveStep(index, -1)}
            onMoveDown={() => moveStep(index, 1)}
            onPreview={() => previewStep(step)}
            onRegenerate={async () => {
              try {
                await emailMarketingEdge.bustDraftCache(step.id);
                toast.success("Draft cache cleared for this step");
              } catch (e) {
                toast.error(e instanceof Error ? e.message : "Failed");
              }
            }}
            onInsertTemplate={(t) =>
              updateStepLocal(step.id, { subject_template: t.subject, body_template: t.body })
            }
          />
        ))}
      </div>

      <Button variant="outline" className="mt-4" onClick={addStep}>
        <Plus className="h-4 w-4 mr-1" /> Add step
      </Button>

      <Dialog open={!!preview} onOpenChange={() => setPreview(null)}>
        <DialogContent className="bg-gray-900 border-gray-800 max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-white">AI draft preview</DialogTitle>
          </DialogHeader>
          {preview && (
            <div className="space-y-2 text-sm">
              <p className="text-gray-400">
                Subject: <span className="text-white">{preview.subject}</span>
              </p>
              <pre className="whitespace-pre-wrap text-gray-300 font-mono text-xs bg-gray-800 p-3 rounded">
                {preview.body}
              </pre>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </EmailMarketingLayout>
  );
}
