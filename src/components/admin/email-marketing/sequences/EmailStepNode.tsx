import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { EmailStepNodeData } from "./sequenceGraph";
import { conditionLabel } from "./sequenceGraph";

const LANE_STYLES: Record<string, string> = {
  main: "border-gray-600 bg-gray-900",
  opened: "border-cyan-500/50 bg-cyan-950/40",
  not_opened: "border-slate-500/50 bg-slate-900/60",
};

const LANE_LABELS: Record<string, string> = {
  opened: "Opened",
  not_opened: "Not opened",
};

function EmailStepNodeComponent({ data }: NodeProps) {
  const { step, stats, selected, compact } = data as EmailStepNodeData;
  const lane = step.branch_lane ?? "main";
  const typeLabel =
    step.step_type === "ai_draft"
      ? "AI"
      : step.step_type === "case_study"
        ? "Case study"
        : step.step_type === "hybrid"
          ? "Hybrid"
          : "Template";

  if (compact) {
    return (
      <div
        className={`rounded border px-2 py-1.5 w-[200px] shadow cursor-grab active:cursor-grabbing ${
          LANE_STYLES[lane] ?? LANE_STYLES.main
        } ${selected ? "ring-2 ring-cyan-400" : ""}`}
      >
        <Handle type="target" position={Position.Top} className="!bg-gray-500 !w-1.5 !h-1.5" />
        <p className="text-[10px] font-medium text-white truncate">
          {step.step_order} · {step.subject_template || "(no subject)"}
        </p>
        <p className="text-[9px] text-gray-500 truncate">
          {typeLabel} · +{step.delay_days}d
        </p>
        <Handle type="source" position={Position.Bottom} className="!bg-gray-500 !w-1.5 !h-1.5" />
      </div>
    );
  }

  return (
    <div
      className={`rounded-lg border px-3 py-2 min-w-[200px] max-w-[240px] shadow-lg cursor-grab active:cursor-grabbing transition-shadow ${
        LANE_STYLES[lane] ?? LANE_STYLES.main
      } ${selected ? "ring-2 ring-cyan-400" : ""}`}
    >
      <Handle type="target" position={Position.Top} className="!bg-gray-500 !w-2 !h-2" />
      <div className="flex items-center justify-between gap-1 mb-1">
        <span className="text-xs font-semibold text-white">Step {step.step_order}</span>
        {lane !== "main" && (
          <span className="text-[10px] text-cyan-300/90 uppercase tracking-wide">
            {LANE_LABELS[lane]}
          </span>
        )}
      </div>
      <p className="text-[11px] text-gray-400 truncate">
        {typeLabel} · {conditionLabel(step.condition)}
      </p>
      <p className="text-xs text-gray-300 truncate mt-1" title={step.subject_template}>
        {step.subject_template || "(no subject)"}
      </p>
      <p className="text-[10px] text-gray-500 mt-1">
        +{step.delay_days}d {step.delay_hours ? `+${step.delay_hours}h` : ""}
        {stats && ` · sent ${stats.sent}`}
      </p>
      <Handle type="source" position={Position.Bottom} className="!bg-gray-500 !w-2 !h-2" />
    </div>
  );
}

export const EmailStepNode = memo(EmailStepNodeComponent);
