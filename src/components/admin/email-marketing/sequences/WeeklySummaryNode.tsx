import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Calendar } from "lucide-react";

export type WeeklySummaryNodeData = {
  fromOrder: number;
  toOrder: number;
  stepCount: number;
  selected?: boolean;
};

function WeeklySummaryNodeComponent({ data }: NodeProps) {
  const { fromOrder, toOrder, stepCount } = data as WeeklySummaryNodeData;

  return (
    <div className="rounded-lg border-2 border-dashed border-violet-500/50 bg-violet-950/30 px-4 py-3 min-w-[260px] shadow-lg cursor-pointer hover:border-violet-400/70 transition-colors">
      <Handle type="target" position={Position.Top} className="!bg-violet-500 !w-2 !h-2" />
      <div className="flex items-start gap-2">
        <Calendar className="h-4 w-4 text-violet-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-white">Weekly nurture</p>
          <p className="text-xs text-violet-200/80 mt-0.5">
            Steps {fromOrder}–{toOrder} · {stepCount} emails · 7d apart
          </p>
          <p className="text-[10px] text-gray-500 mt-1">Click to open weekly view</p>
        </div>
      </div>
    </div>
  );
}

export const WeeklySummaryNode = memo(WeeklySummaryNodeComponent);
