import { useCallback, useEffect, useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  type Node,
  type NodeMouseHandler,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { EmSequenceStep, EmSequenceStepStats } from "@/services/emailMarketing";
import { buildSequenceGraph } from "./sequenceGraph";
import { EmailStepNode } from "./EmailStepNode";
import { ForkNode } from "./ForkNode";

const nodeTypes = {
  email: EmailStepNode,
  fork: ForkNode,
};

type Props = {
  steps: EmSequenceStep[];
  statsByStep: Record<string, EmSequenceStepStats>;
  selectedStepId: string | null;
  selectedForkOrder: number | null;
  onSelectStep: (stepId: string) => void;
  onSelectFork: (afterStepOrder: number) => void;
};

export function SequenceWorkflowCanvas({
  steps,
  statsByStep,
  selectedStepId,
  selectedForkOrder,
  onSelectStep,
  onSelectFork,
}: Props) {
  const graph = useMemo(
    () => buildSequenceGraph(steps, statsByStep, selectedStepId, selectedForkOrder),
    [steps, statsByStep, selectedStepId, selectedForkOrder],
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(graph.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(graph.edges);

  useEffect(() => {
    setNodes(graph.nodes);
    setEdges(graph.edges);
  }, [graph, setNodes, setEdges]);

  const onNodeClick: NodeMouseHandler = useCallback(
    (_evt, node: Node) => {
      if (node.type === "fork") {
        const after = (node.data as { afterStepOrder: number }).afterStepOrder;
        onSelectFork(after);
        return;
      }
      if (node.type === "email") {
        onSelectStep(node.id);
      }
    },
    [onSelectFork, onSelectStep],
  );

  const maxOrder = steps.reduce((m, s) => Math.max(m, s.step_order), 0);

  return (
    <div className="h-[min(70vh,720px)] w-full rounded-lg border border-gray-800 bg-gray-950/80 overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable
        fitView
        fitViewOptions={{ padding: 0.2, maxZoom: 1 }}
        minZoom={0.3}
        maxZoom={1.2}
        proOptions={{ hideAttribution: true }}
        className="bg-gray-950"
      >
        <Background color="#374151" gap={20} />
        <Controls className="!bg-gray-900 !border-gray-700 !shadow-lg [&>button]:!bg-gray-800 [&>button]:!border-gray-700 [&>button]:!text-gray-300" />
        <MiniMap
          className="!bg-gray-900 !border-gray-700"
          nodeColor={(n) => (n.type === "fork" ? "#d97706" : "#0891b2")}
          maskColor="rgb(0,0,0,0.6)"
        />
      </ReactFlow>
      {maxOrder > 8 && (
        <p className="text-[10px] text-gray-500 px-3 py-1 border-t border-gray-800">
          Scroll or zoom out to see all {steps.length} steps (through week 52).
        </p>
      )}
    </div>
  );
}
