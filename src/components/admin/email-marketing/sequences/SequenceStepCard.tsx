import { EmActionButton } from "@/components/admin/email-marketing/EmActionButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StepTypeSelector } from "./StepTypeSelector";
import { AiStepConfig } from "./AiStepConfig";
import { CaseStudyPicker } from "./CaseStudyPicker";
import { TemplateEditor } from "./TemplateEditor";
import type {
  EmAiAngle,
  EmCaseStudyMode,
  EmCaseStudyOption,
  EmSequenceStep,
  EmSequenceStepStats,
  EmSequenceTemplate,
  EmStepCondition,
  EmStepType,
} from "@/services/emailMarketing";
import { EmActionButton } from "@/components/admin/email-marketing/EmActionButton";

const CONDITIONS: { value: EmStepCondition; label: string }[] = [
  { value: "always", label: "Always" },
  { value: "no_reply", label: "If no reply" },
  { value: "no_meeting", label: "If no meeting" },
  { value: "no_open", label: "If no open" },
  { value: "opened_not_replied", label: "If opened, no reply" },
];

type Props = {
  step: EmSequenceStep;
  caseStudies: EmCaseStudyOption[];
  templates: EmSequenceTemplate[];
  stats?: EmSequenceStepStats;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onChange: (patch: Partial<EmSequenceStep>) => void;
  onSave: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onPreview: () => void;
  onRegenerate?: () => void;
  onInsertTemplate: (template: EmSequenceTemplate) => void;
};

export function SequenceStepCard({
  step,
  caseStudies,
  templates,
  stats,
  canMoveUp,
  canMoveDown,
  onChange,
  onSave,
  onDelete,
  onMoveUp,
  onMoveDown,
  onPreview,
  onRegenerate,
  onInsertTemplate,
}: Props) {
  const stepType = (step.step_type ?? (step.ai_generated ? "ai_draft" : "template")) as EmStepType;

  return (
    <div className="border border-gray-800 rounded-lg p-4 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium text-white">
          Step {step.step_order}
          {stats && (
            <span className="text-gray-500 font-normal ml-2">
              · sent {stats.sent} · opened {stats.opened} · replied {stats.replied}
            </span>
          )}
        </p>
        <div className="flex gap-1 flex-wrap">
          <EmActionButton size="sm" variant="outline" disabled={!canMoveUp} onClick={onMoveUp}>
            Up
          </EmActionButton>
          <EmActionButton size="sm" variant="outline" disabled={!canMoveDown} onClick={onMoveDown}>
            Down
          </EmActionButton>
          <EmActionButton
            size="sm"
            variant="outline"
            className="text-red-400 border-red-800 hover:bg-red-950"
            onClick={onDelete}
          >
            Delete
          </EmActionButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="w-24">
          <Label className="text-gray-400 text-xs">+ Days</Label>
          <Input
            type="number"
            min={0}
            value={step.delay_days}
            onChange={(e) => onChange({ delay_days: Number(e.target.value) })}
            className="bg-gray-800 border-gray-700 mt-1"
          />
        </div>
        <div className="w-24">
          <Label className="text-gray-400 text-xs">+ Hours</Label>
          <Input
            type="number"
            min={0}
            value={step.delay_hours ?? 0}
            onChange={(e) => onChange({ delay_hours: Number(e.target.value) })}
            className="bg-gray-800 border-gray-700 mt-1"
          />
        </div>
        <div className="w-48">
          <Label className="text-gray-400 text-xs">Condition</Label>
          <Select
            value={step.condition}
            onValueChange={(v) => onChange({ condition: v as EmStepCondition })}
          >
            <SelectTrigger className="bg-gray-800 border-gray-700 mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CONDITIONS.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <StepTypeSelector
          value={stepType}
          onChange={(v) =>
            onChange({
              step_type: v,
              ai_generated: v === "ai_draft" || v === "hybrid",
              ai_angle: v === "ai_draft" && !step.ai_angle ? "opener" : step.ai_angle,
            })
          }
        />
      </div>

      {templates.length > 0 && stepType === "template" && (
        <div className="w-64">
          <Label className="text-gray-400 text-xs">Insert from library</Label>
          <Select
            onValueChange={(id) => {
              const t = templates.find((x) => x.id === id);
              if (t) onInsertTemplate(t);
            }}
          >
            <SelectTrigger className="bg-gray-800 border-gray-700 mt-1">
              <SelectValue placeholder="Choose template…" />
            </SelectTrigger>
            <SelectContent>
              {templates.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {(stepType === "ai_draft" || stepType === "hybrid") && (
        <AiStepConfig
          angle={(step.ai_angle as EmAiAngle) ?? "opener"}
          instructions={step.ai_instructions}
          onAngleChange={(angle) => onChange({ ai_angle: angle })}
          onInstructionsChange={(text) => onChange({ ai_instructions: text || null })}
        />
      )}

      {stepType === "case_study" && (
        <>
          <CaseStudyPicker
            caseStudies={caseStudies}
            mode={(step.case_study_mode as EmCaseStudyMode) ?? "fixed"}
            slug={step.case_study_slug}
            url={step.case_study_url}
            onModeChange={(mode) => onChange({ case_study_mode: mode })}
            onSlugChange={(slug) => onChange({ case_study_slug: slug })}
            onUrlChange={(url) => onChange({ case_study_url: url || null })}
          />
          <TemplateEditor
            subject={step.subject_template}
            body={step.body_template}
            intro={step.intro_template}
            showIntro
            onSubjectChange={(v) => onChange({ subject_template: v })}
            onBodyChange={(v) => onChange({ body_template: v })}
            onIntroChange={(v) => onChange({ intro_template: v })}
          />
        </>
      )}

      {stepType === "template" && (
        <TemplateEditor
          subject={step.subject_template}
          body={step.body_template}
          onSubjectChange={(v) => onChange({ subject_template: v })}
          onBodyChange={(v) => onChange({ body_template: v })}
        />
      )}

      {stepType === "hybrid" && (
        <TemplateEditor
          subject={step.subject_template}
          body={step.body_template}
          intro={step.intro_template}
          showIntro
          onSubjectChange={(v) => onChange({ subject_template: v })}
          onBodyChange={(v) => onChange({ body_template: v })}
          onIntroChange={(v) => onChange({ intro_template: v || "{{ai_body}}" })}
        />
      )}

      {stepType === "ai_draft" && (
        <TemplateEditor
          subject={step.subject_template}
          body={step.body_template}
          onSubjectChange={(v) => onChange({ subject_template: v })}
          onBodyChange={(v) => onChange({ body_template: v })}
        />
      )}

      <div className="flex flex-wrap gap-2">
        <EmActionButton size="sm" variant="secondary" onClick={onSave}>
          Save step
        </EmActionButton>
        {(stepType === "ai_draft" || stepType === "hybrid") && (
          <>
            <EmActionButton size="sm" variant="outline" onClick={onPreview}>
              Preview AI draft
            </EmActionButton>
            {onRegenerate && (
              <EmActionButton size="sm" variant="outline" onClick={onRegenerate}>
                Regenerate cache
              </EmActionButton>
            )}
          </>
        )}
      </div>
    </div>
  );
}
