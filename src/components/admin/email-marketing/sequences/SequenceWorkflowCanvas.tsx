import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  useReactFlow,
  type Node,
  type NodeDragHandler,
  type NodeMouseHandler,
} from "@xyflow/react";
import type { CanvasPosition } from "@/services/emailMarketing/workflowCanvas";
import "@xyflow/react/dist/style.css";
import type { EmSequenceStep, EmSequenceStepStats } from "@/services/emailMarketing";
import {
  buildSequenceGraph,
  type WorkflowViewMode,
} from "./sequenceGraph";
import { EmailStepNode } from "./EmailStepNode";
import { ForkNode } from "./ForkNode";
import { WeeklySummaryNode } from "./WeeklySummaryNode";

const nodeTypes = {
  email: EmailStepNode,
  fork: ForkNode,
  weeklySummary: WeeklySummaryNode,
};

type CanvasProps = {
  steps: EmSequenceStep[];
  statsByStep: Record<string, EmSequenceStepStats>;
  viewMode: WorkflowViewMode;
  selectedStepId: string | null;
  selectedForkOrder: number | null;
  onSelectStep: (stepId: string) => void;
  onSelectFork: (afterStepOrder: number) => void;
  onViewModeChange: (mode: WorkflowViewMode) => void;
  onSaveNodePosition?: (stepId: string, position: CanvasPosition, viewMode: WorkflowViewMode) => void;
};

function WorkflowCanvasInner({
  steps,
  statsByStep,
  viewMode,
  selectedStepId,
  selectedForkOrder,
  onSelectStep,
  onSelectFork,
  onViewModeChange,
  onSaveNodePosition,
}: CanvasProps) {
  const { fitView } = useReactFlow();
  const structureKey = useMemo(
    () =>
      `${viewMode}:${steps.map((s) => `${s.id}:${s.step_order}:${s.branch_lane}`).join("|")}`,
    [steps, viewMode],
  );

  const graph = useMemo(
    () => buildSequenceGraph(steps, statsByStep, viewMode),
    [steps, statsByStep, viewMode],
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(graph.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(graph.edges);
  const lastStructureKey = useRef(structureKey);
  const lastViewMode = useRef(viewMode);

  useEffect(() => {
    if (lastStructureKey.current !== structureKey) {
      setNodes(graph.nodes);
      setEdges(graph.edges);
      const viewChanged = lastViewMode.current !== viewMode;
      lastStructureKey.current = structureKey;
      lastViewMode.current = viewMode;
      // Only auto-fit when switching views or step structure changes — not on every click/edit
      if (viewChanged) {
        const timer = setTimeout(() => {
          fitView({ padding: 0.2, maxZoom: viewMode === "weekly" ? 0.85 : 1, duration: 200 });
        }, 50);
        return () => clearTimeout(timer);
      }
    }
  }, [structureKey, graph, setNodes, setEdges, fitView, viewMode]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((n) => {
        if (n.type === "email") {
          return { ...n, data: { ...n.data, selected: n.id === selectedStepId } };
        }
        if (n.type === "fork") {
          const after = (n.data as { afterStepOrder: number }).afterStepOrder;
          return { ...n, data: { ...n.data, selected: selectedForkOrder === after } };
        }
        return n;
      }),
    );
  }, [selectedStepId, selectedForkOrder, setNodes]);

  const onNodeClick: NodeMouseHandler = useCallback(
    (_evt, node: Node) => {
      if (node.type === "weeklySummary") {
        onViewModeChange("weekly");
        return;
      }
      if (node.type === "fork") {
        onSelectFork((node.data as { afterStepOrder: number }).afterStepOrder);
        return;
      }
      if (node.type === "email") {
        onSelectStep(node.id);
      }
    },
    [onSelectFork, onSelectStep, onViewModeChange],
  );

  const onNodeDragStop: NodeDragHandler = useCallback(
    (_evt, node) => {
      if (node.type !== "email" || !onSaveNodePosition) return;
      onSaveNodePosition(node.id, { x: node.position.x, y: node.position.y }, viewMode);
    },
    [onSaveNodePosition, viewMode],
  );

  const canvasHeight =
    viewMode === "weekly" ? "min(75vh, 900px)" : viewMode === "overview" ? "min(65vh, 640px)" : "min(65vh, 600px)";

  return (
    <div
      className="w-full rounded-lg border border-gray-800 bg-gray-950/80 overflow-hidden flex flex-col"
      style={{ height: canvasHeight }}
    >
      <div className="flex flex-wrap items-center gap-2 px-3 py-2 border-b border-gray-800 bg-gray-900/60">
        <span className="text-xs text-gray-500 mr-1">View:</span>
        {(
          [
            ["overview", "Overview"],
            ["phase1", "Phase 1 (days 0–30)"],
            ["weekly", "Weekly (steps 8+)"],
          ] as const
        ).map(([mode, label]) => (
          <button
            key={mode}
            type="button"
            onClick={() => onViewModeChange(mode)}
            className={`text-xs px-2.5 py-1 rounded border transition-colors ${
              viewMode === mode
                ? "border-cyan-500/60 bg-cyan-950/40 text-cyan-100"
                : "border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-200"
            }`}
          >
            {label}
          </button>
        ))}
        <span className="text-[10px] text-gray-600 ml-auto hidden sm:inline">
          Drag nodes to rearrange (saved per view) · scroll to pan · +/- to zoom
        </span>
      </div>

      <div className="flex-1 min-h-0">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onNodeDragStop={onNodeDragStop}
          nodeTypes={nodeTypes}
          nodesDraggable
          nodesConnectable={false}
          elementsSelectable
          panOnScroll
          zoomOnScroll
          minZoom={0.35}
          maxZoom={1.4}
          defaultViewport={{ x: 40, y: 20, zoom: viewMode === "weekly" ? 0.75 : 0.95 }}
          proOptions={{ hideAttribution: true }}
          className="bg-gray-950"
        >
          <Background color="#374151" gap={20} />
          <Controls
            position="bottom-left"
            className="!bg-gray-900 !border-gray-700 !shadow-lg [&>button]:!bg-gray-800 [&>button]:!border-gray-700 [&>button]:!text-gray-300"
          />
          {viewMode !== "weekly" && (
            <MiniMap
              className="!bg-gray-900 !border-gray-700 !w-28 !h-20"
              nodeColor={(n) =>
                n.type === "fork" ? "#d97706" : n.type === "weeklySummary" ? "#8b5cf6" : "#0891b2"
              }
              maskColor="rgb(0,0,0,0.6)"
              pannable
              zoomable
            />
          )}
        </ReactFlow>
      </div>
    </div>
  );
}

type Props = Omit<CanvasProps, "onViewModeChange"> & {
  onViewModeChange: (mode: WorkflowViewMode) => void;
};

export function SequenceWorkflowCanvas(props: Props) {
  return (
    <ReactFlowProvider>
      <WorkflowCanvasInner {...props} />
    </ReactFlowProvider>
  );
}

export type { WorkflowViewMode };
