import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EmSelectContent, EmSelectItem } from "@/components/admin/email-marketing/EmSelectContent";
import { Label } from "@/components/ui/label";
import type { EmAiAngle } from "@/services/emailMarketing";

const ANGLES: { value: EmAiAngle; label: string }[] = [
  { value: "opener", label: "Opener" },
  { value: "niche_followup", label: "Niche follow-up" },
  { value: "breakup", label: "Breakup" },
  { value: "case_study_tease", label: "Case study tease" },
  { value: "custom", label: "Custom instructions" },
];

type Props = {
  angle: EmAiAngle | null;
  instructions: string | null;
  onAngleChange: (angle: EmAiAngle) => void;
  onInstructionsChange: (text: string) => void;
};

export function AiStepConfig({ angle, instructions, onAngleChange, onInstructionsChange }: Props) {
  return (
    <div className="space-y-2">
      <div>
        <Label className="text-gray-400 text-xs">AI angle</Label>
        <Select value={angle ?? "opener"} onValueChange={(v) => onAngleChange(v as EmAiAngle)}>
          <SelectTrigger className="w-56 bg-gray-800 border-gray-700 mt-1">
            <SelectValue />
          </SelectTrigger>
          <EmSelectContent>
            {ANGLES.map((a) => (
              <EmSelectItem key={a.value} value={a.value}>
                {a.label}
              </EmSelectItem>
            ))}
          </EmSelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-gray-400 text-xs">AI instructions (optional)</Label>
        <textarea
          value={instructions ?? ""}
          onChange={(e) => onInstructionsChange(e.target.value)}
          rows={3}
          placeholder="e.g. Reference real estate manual workflows"
          className="mt-1 w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 text-sm text-gray-200 font-mono"
        />
      </div>
    </div>
  );
}
