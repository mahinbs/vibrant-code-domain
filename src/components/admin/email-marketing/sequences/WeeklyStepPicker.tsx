import type { EmSequenceStep } from "@/services/emailMarketing";
import { conditionLabel } from "./sequenceGraph";

type Props = {
  steps: EmSequenceStep[];
  selectedStepId: string | null;
  onSelect: (stepId: string) => void;
};

export function WeeklyStepPicker({ steps, selectedStepId, onSelect }: Props) {
  const weekly = steps.filter((s) => s.step_order >= 8).sort((a, b) => a.step_order - b.step_order);
  if (weekly.length === 0) return null;

  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900/40 p-3">
      <p className="text-xs text-gray-400 mb-2">
        Weekly steps — click to jump ({weekly.length} emails)
      </p>
      <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
        {weekly.map((step) => {
          const active = step.id === selectedStepId;
          return (
            <button
              key={step.id}
              type="button"
              title={`${step.subject_template || "No subject"} · ${conditionLabel(step.condition)}`}
              onClick={() => onSelect(step.id)}
              className={`text-left rounded px-2 py-1 text-[11px] border transition-colors max-w-[140px] truncate ${
                active
                  ? "border-cyan-500 bg-cyan-950/50 text-cyan-100"
                  : "border-gray-700 bg-gray-800/60 text-gray-300 hover:border-gray-600"
              }`}
            >
              <span className="font-medium">{step.step_order}</span>
              <span className="text-gray-500 mx-1">·</span>
              <span className="truncate">{step.subject_template || "…"}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
