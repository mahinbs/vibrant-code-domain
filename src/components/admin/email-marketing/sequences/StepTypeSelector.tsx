import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EmSelectContent, EmSelectItem } from "@/components/admin/email-marketing/EmSelectContent";
import { Label } from "@/components/ui/label";
import type { EmStepType } from "@/services/emailMarketing";

const STEP_TYPES: { value: EmStepType; label: string }[] = [
  { value: "template", label: "Template" },
  { value: "ai_draft", label: "AI draft" },
  { value: "case_study", label: "Case study" },
  { value: "hybrid", label: "Hybrid" },
];

type Props = {
  value: EmStepType;
  onChange: (value: EmStepType) => void;
};

export function StepTypeSelector({ value, onChange }: Props) {
  return (
    <div>
      <Label className="text-gray-400 text-xs">Content mode</Label>
      <Select value={value} onValueChange={(v) => onChange(v as EmStepType)}>
        <SelectTrigger className="w-48 bg-gray-800 border-gray-700 mt-1">
          <SelectValue />
        </SelectTrigger>
        <EmSelectContent>
          {STEP_TYPES.map((t) => (
            <EmSelectItem key={t.value} value={t.value}>
              {t.label}
            </EmSelectItem>
          ))}
        </EmSelectContent>
      </Select>
    </div>
  );
}
