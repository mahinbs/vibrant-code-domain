import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { GitBranch } from "lucide-react";
import type { ForkNodeData } from "./sequenceGraph";

function ForkNodeComponent({ data }: NodeProps) {
  const { afterStepOrder, selected } = data as ForkNodeData;

  return (
    <div
      className={`flex flex-col items-center justify-center w-24 h-24 rotate-45 border-2 border-amber-500/60 bg-amber-950/50 rounded-lg shadow-lg cursor-pointer ${
        selected ? "ring-2 ring-amber-400" : ""
      }`}
    >
      <Handle type="target" position={Position.Top} className="!bg-amber-500 !w-2 !h-2 !-top-1" />
      <div className="-rotate-45 flex flex-col items-center text-center px-1">
        <GitBranch className="h-4 w-4 text-amber-400 mb-0.5" />
        <span className="text-[10px] font-medium text-amber-200 leading-tight">
          Opened?
        </span>
        <span className="text-[9px] text-amber-400/80">after {afterStepOrder}</span>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-amber-500 !w-2 !h-2 !-bottom-1" />
      <Handle
        type="source"
        position={Position.Left}
        id="left"
        className="!bg-cyan-500 !w-2 !h-2 !-left-1"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="!bg-slate-400 !w-2 !h-2 !-right-1"
      />
    </div>
  );
}

export const ForkNode = memo(ForkNodeComponent);
