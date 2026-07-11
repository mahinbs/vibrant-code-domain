import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { EmailMarketingLayout } from "@/components/admin/email-marketing/EmailMarketingLayout";
import { SequenceHeader } from "@/components/admin/email-marketing/sequences/SequenceHeader";
import { SequenceStepCard } from "@/components/admin/email-marketing/sequences/SequenceStepCard";
import { SequenceWorkflowCanvas, type WorkflowViewMode } from "@/components/admin/email-marketing/sequences/SequenceWorkflowCanvas";
import { WeeklyStepPicker } from "@/components/admin/email-marketing/sequences/WeeklyStepPicker";
import { buildSequenceMinimap } from "@/components/admin/email-marketing/sequences/sequenceGraph";
import {
  emailMarketingService,
  emailMarketingEdge,
  emErrorMessage,
  type EmSequence,
  type EmSequenceStep,
  type EmSequenceStepStats,
  type EmSequenceTemplate,
} from "@/services/emailMarketing";
import { EmActionButton } from "@/components/admin/email-marketing/EmActionButton";
import { toast } from "sonner";
import { AlertTriangle, ArrowLeft, Plus, X } from "lucide-react";
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
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);
  const [selectedForkOrder, setSelectedForkOrder] = useState<number | null>(null);
  const [migrationReady, setMigrationReady] = useState<boolean | null>(null);
  const [workflowView, setWorkflowView] = useState<WorkflowViewMode>("overview");
  const caseStudies = emailMarketingService.listCaseStudies();

  const load = async () => {
    if (!id) return;
    const [seq, stepList, stepStats, tmpl, branchesOk] = await Promise.all([
      emailMarketingService.getSequence(id),
      emailMarketingService.getSequenceSteps(id),
      emailMarketingService.getSequenceStepStats(id),
      emailMarketingService.listSequenceTemplates(),
      emailMarketingService.checkBranchesMigrationReady(),
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
    setMigrationReady(branchesOk);
    if (selectedStepId && !stepList.some((s) => s.id === selectedStepId)) {
      setSelectedStepId(stepList[0]?.id ?? null);
    }
  };

  useEffect(() => {
    load().catch((e) => toast.error(emErrorMessage(e)));
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
      toast.error(emErrorMessage(e));
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
      toast.error(emErrorMessage(e));
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
      toast.error(emErrorMessage(e));
    }
  };

  const deleteStep = async (stepId: string) => {
    if (!confirm("Delete this step?")) return;
    try {
      await emailMarketingService.deleteSequenceStep(stepId);
      if (selectedStepId === stepId) setSelectedStepId(null);
      load();
    } catch (e) {
      toast.error(emErrorMessage(e));
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

  const splitBranch = async (afterStepOrder: number) => {
    if (!id) return;
    try {
      await emailMarketingService.createOpenBranch(id, afterStepOrder);
      toast.success("Added opened / not-opened branch");
      setSelectedForkOrder(null);
      load();
    } catch (e) {
      toast.error(emErrorMessage(e));
    }
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
      toast.error(emErrorMessage(e));
    }
  };

  const statsByStep = useMemo(
    () => Object.fromEntries(stats.map((s) => [s.step_id, s])),
    [stats],
  );

  const minimap = useMemo(() => buildSequenceMinimap(steps), [steps]);

  const selectedStep = steps.find((s) => s.id === selectedStepId) ?? null;
  const selectedStepIndex = selectedStep ? steps.findIndex((s) => s.id === selectedStep.id) : -1;

  const forkSplitTarget =
    selectedForkOrder ??
    (selectedStep?.branch_lane === "main" ? selectedStep.step_order : null);

  const canSplitFork =
    forkSplitTarget != null &&
    migrationReady === true &&
    !emailMarketingService.hasOpenBranchAfter(steps, forkSplitTarget);

  if (!sequence) {
    return (
      <EmailMarketingLayout title="Sequence builder">
        <p className="text-gray-500">Loading…</p>
      </EmailMarketingLayout>
    );
  }

  return (
    <EmailMarketingLayout title={sequence.name}>
      <Link
        to="/admin/email-marketing/sequences"
        className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-1" /> All sequences
      </Link>

      {migrationReady === false && (
        <div className="mb-4 flex items-start gap-2 rounded-lg border border-amber-500/40 bg-amber-950/30 px-4 py-3 text-sm text-amber-200">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
          <p>
            Branch columns missing — run{" "}
            <code className="text-amber-100">20260711120000_sequence_branches.sql</code> in the
            Supabase SQL editor. Split and the 12-month template will not work until then.
          </p>
        </div>
      )}

      <SequenceHeader
        sequence={sequence}
        minimap={minimap}
        onChange={(patch) => setSequence({ ...sequence, ...patch })}
        onSave={saveSequence}
        saving={saving}
      />

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_min(400px,38vw)] gap-4 items-start">
        <div className="space-y-3 min-w-0">
          <SequenceWorkflowCanvas
            steps={steps}
            statsByStep={statsByStep}
            viewMode={workflowView}
            selectedStepId={selectedStepId}
            selectedForkOrder={selectedForkOrder}
            onViewModeChange={setWorkflowView}
            onSelectStep={(stepId) => {
              setSelectedStepId(stepId);
              setSelectedForkOrder(null);
              const step = steps.find((s) => s.id === stepId);
              if (step && step.step_order >= 8) setWorkflowView("weekly");
            }}
            onSelectFork={(order) => {
              setSelectedForkOrder(order);
              setSelectedStepId(null);
            }}
          />
          {(workflowView === "weekly" || steps.some((s) => s.step_order >= 8)) && (
            <WeeklyStepPicker
              steps={steps}
              selectedStepId={selectedStepId}
              onSelect={(stepId) => {
                setSelectedStepId(stepId);
                setSelectedForkOrder(null);
                setWorkflowView("weekly");
              }}
            />
          )}
          <div className="flex flex-wrap gap-2">
            <EmActionButton variant="outline" onClick={addStep}>
              <Plus className="h-4 w-4 mr-1" /> Add step
            </EmActionButton>
            {canSplitFork && (
              <EmActionButton variant="outline" onClick={() => splitBranch(forkSplitTarget!)}>
                Split: opened / not opened (after step {forkSplitTarget})
              </EmActionButton>
            )}
          </div>
        </div>

        <div className="xl:sticky xl:top-4 xl:self-start max-h-[calc(100vh-6rem)] overflow-y-auto">
          {selectedStep ? (
            <div className="relative">
              <button
                type="button"
                className="absolute right-2 top-2 z-10 text-gray-500 hover:text-white"
                onClick={() => setSelectedStepId(null)}
                aria-label="Close editor"
              >
                <X className="h-4 w-4" />
              </button>
              <SequenceStepCard
                step={selectedStep}
                caseStudies={caseStudies}
                templates={templates}
                stats={statsByStep[selectedStep.id]}
                canMoveUp={selectedStepIndex > 0}
                canMoveDown={selectedStepIndex < steps.length - 1}
                canSplitBranch={
                  migrationReady === true &&
                  selectedStep.branch_lane === "main" &&
                  !emailMarketingService.hasOpenBranchAfter(steps, selectedStep.step_order)
                }
                onChange={(patch) => updateStepLocal(selectedStep.id, patch)}
                onSave={() => {
                  const current = steps.find((s) => s.id === selectedStep.id);
                  if (current) saveStep(current);
                }}
                onDelete={() => deleteStep(selectedStep.id)}
                onMoveUp={() => moveStep(selectedStepIndex, -1)}
                onMoveDown={() => moveStep(selectedStepIndex, 1)}
                onSplitBranch={() => splitBranch(selectedStep.step_order)}
                onPreview={() => previewStep(selectedStep)}
                onRegenerate={async () => {
                  try {
                    await emailMarketingEdge.bustDraftCache(selectedStep.id);
                    toast.success("Draft cache cleared for this step");
                  } catch (e) {
                    toast.error(emErrorMessage(e));
                  }
                }}
                onInsertTemplate={(t) =>
                  updateStepLocal(selectedStep.id, {
                    subject_template: t.subject,
                    body_template: t.body,
                  })
                }
              />
            </div>
          ) : selectedForkOrder != null ? (
            <div className="border border-gray-800 rounded-lg p-4 space-y-3 bg-gray-900/50">
              <h3 className="text-sm font-medium text-white">Open / not-opened fork</h3>
              <p className="text-sm text-gray-400">
                After step {selectedForkOrder}, leads who opened get one email; those who did not
                get another — at the same step position.
              </p>
              {canSplitFork ? (
                <EmActionButton onClick={() => splitBranch(selectedForkOrder)}>
                  Create split here
                </EmActionButton>
              ) : (
                <p className="text-xs text-gray-500">Branch already exists after this step.</p>
              )}
            </div>
          ) : (
            <div className="border border-dashed border-gray-700 rounded-lg p-8 text-center text-gray-500 text-sm">
              Click a step or fork node in the workflow to edit.
            </div>
          )}
        </div>
      </div>

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
