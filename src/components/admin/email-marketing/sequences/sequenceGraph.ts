import type { Edge, Node } from "@xyflow/react";
import type { EmSequenceStep, EmSequenceStepStats } from "@/services/emailMarketing";
import { getSavedCanvasPosition, type WorkflowViewMode } from "@/services/emailMarketing/workflowCanvas";

export type { WorkflowViewMode };

const LANE_X: Record<string, number> = {
  opened: 0,
  main: 280,
  not_opened: 560,
};

const ROW_HEIGHT = 150;
const COMPACT_ROW_HEIGHT = 72;

const CONDITION_LABELS: Record<string, string> = {
  always: "Always",
  no_reply: "No reply",
  no_meeting: "No meeting",
  no_open: "No open",
  opened: "Opened",
  opened_not_replied: "Opened, no reply",
  clicked: "Clicked",
};

export type EmailStepNodeData = {
  step: EmSequenceStep;
  stats?: EmSequenceStepStats;
  selected?: boolean;
  compact?: boolean;
};

export type ForkNodeData = {
  afterStepOrder: number;
  hasBranch: boolean;
  selected?: boolean;
};

export function conditionLabel(condition: string): string {
  return CONDITION_LABELS[condition] ?? condition;
}

function stepLabel(step: EmSequenceStep): string {
  if (step.step_type === "ai_draft") return "AI";
  if (step.step_type === "case_study") return "CS";
  return "Tmpl";
}

export function buildSequenceMinimap(steps: EmSequenceStep[]): string {
  if (!steps.length) return "Empty sequence";
  const maxOrder = Math.max(...steps.map((s) => s.step_order));
  const phase1Orders = [...new Set(steps.filter((s) => s.step_order <= 7).map((s) => s.step_order))].sort(
    (a, b) => a - b,
  );
  const parts: string[] = [];
  for (const order of phase1Orders) {
    const at = steps.filter((s) => s.step_order === order);
    const hasBranch = at.some((s) => s.branch_lane !== "main");
    if (hasBranch) {
      parts.push(`${order}a|${order}b`);
    } else {
      const main = at.find((s) => s.branch_lane === "main") ?? at[0];
      parts.push(`${order} ${stepLabel(main)}`);
    }
  }
  if (maxOrder > 7) {
    const weeklyCount = steps.filter((s) => s.step_order > 7 && s.branch_lane === "main").length;
    parts.push(`weekly ${weeklyCount}× (8–${maxOrder})`);
  }
  return parts.join(" → ");
}

function filterStepsForView(steps: EmSequenceStep[], viewMode: WorkflowViewMode): EmSequenceStep[] {
  if (viewMode === "weekly") {
    return steps.filter((s) => s.step_order >= 8);
  }
  return steps.filter((s) => s.step_order <= 7);
}

function buildGraphForSteps(
  steps: EmSequenceStep[],
  statsByStep: Record<string, EmSequenceStepStats>,
  rowHeight: number,
  compact: boolean,
  viewMode: WorkflowViewMode,
): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  if (!steps.length) return { nodes, edges };

  const orders = [...new Set(steps.map((s) => s.step_order))].sort((a, b) => a - b);
  const nodeIdsAtOrder = new Map<number, string[]>();
  const baseOrder = orders[0];

  for (const order of orders) {
    const atOrder = steps.filter((s) => s.step_order === order);
    const branchSteps = atOrder.filter((s) => s.branch_lane !== "main");
    const hasBranches = branchSteps.length > 0;
    const forkAfter = hasBranches ? branchSteps[0].branch_after_step_order : null;
    const y = (order - baseOrder) * rowHeight;

    if (hasBranches && forkAfter != null) {
      const forkId = `fork-${forkAfter}`;
      if (!nodes.some((n) => n.id === forkId)) {
        nodes.push({
          id: forkId,
          type: "fork",
          position: { x: LANE_X.main, y: y - rowHeight / 2 },
          data: {
            afterStepOrder: forkAfter,
            hasBranch: true,
          } satisfies ForkNodeData,
        });
      }
    }

    const ids: string[] = [];
    for (const step of atOrder) {
      const lane = step.branch_lane ?? "main";
      const saved = getSavedCanvasPosition(step.metadata, viewMode);
      const defaultX = LANE_X[lane] ?? LANE_X.main;
      const defaultY = y;
      nodes.push({
        id: step.id,
        type: "email",
        position: saved ?? { x: defaultX, y: defaultY },
        data: {
          step,
          stats: statsByStep[step.id],
          compact,
        } satisfies EmailStepNodeData,
      });
      ids.push(step.id);

      if (hasBranches && forkAfter != null) {
        edges.push({
          id: `fork-${forkAfter}-to-${step.id}`,
          source: `fork-${forkAfter}`,
          target: step.id,
          type: "smoothstep",
        });
      }
    }
    nodeIdsAtOrder.set(order, ids);
  }

  for (let i = 0; i < orders.length - 1; i++) {
    const currentOrder = orders[i];
    const nextOrder = orders[i + 1];
    const currentIds = nodeIdsAtOrder.get(currentOrder) ?? [];
    const nextIds = nodeIdsAtOrder.get(nextOrder) ?? [];
    const nextMain = steps.find((s) => s.step_order === nextOrder && s.branch_lane === "main");
    const nextHasFork = steps.some(
      (s) => s.step_order === nextOrder && s.branch_lane !== "main",
    );

    for (const sourceId of currentIds) {
      if (nextHasFork) {
        const forkAfter = steps.find((s) => s.step_order === nextOrder)?.branch_after_step_order;
        if (forkAfter != null) {
          edges.push({
            id: `${sourceId}-to-fork-${forkAfter}`,
            source: sourceId,
            target: `fork-${forkAfter}`,
            type: "smoothstep",
          });
        }
      } else if (nextMain) {
        edges.push({
          id: `${sourceId}-to-${nextMain.id}`,
          source: sourceId,
          target: nextMain.id,
          type: "smoothstep",
        });
      } else if (nextIds[0]) {
        edges.push({
          id: `${sourceId}-to-${nextIds[0]}`,
          source: sourceId,
          target: nextIds[0],
          type: "smoothstep",
        });
      }
    }
  }

  return { nodes, edges };
}

export function buildSequenceGraph(
  steps: EmSequenceStep[],
  statsByStep: Record<string, EmSequenceStepStats>,
  viewMode: WorkflowViewMode,
): { nodes: Node[]; edges: Edge[] } {
  const filtered = filterStepsForView(steps, viewMode);
  const compact = viewMode === "weekly";
  const rowHeight = compact ? COMPACT_ROW_HEIGHT : ROW_HEIGHT;

  const { nodes, edges } = buildGraphForSteps(filtered, statsByStep, rowHeight, compact, viewMode);

  if (viewMode === "overview") {
    const weeklySteps = steps.filter((s) => s.step_order >= 8);
    if (weeklySteps.length > 0) {
      const maxOrder = Math.max(...weeklySteps.map((s) => s.step_order));
      const minOrder = Math.min(...weeklySteps.map((s) => s.step_order));
      const summaryId = "weekly-summary";
      nodes.push({
        id: summaryId,
        type: "weeklySummary",
        position: { x: LANE_X.main, y: 7 * ROW_HEIGHT + 40 },
        data: {
          fromOrder: minOrder,
          toOrder: maxOrder,
          stepCount: weeklySteps.length,
        },
      });

      const step7Main = steps.find((s) => s.step_order === 7 && s.branch_lane === "main");
      if (step7Main) {
        edges.push({
          id: `${step7Main.id}-to-weekly-summary`,
          source: step7Main.id,
          target: summaryId,
          type: "smoothstep",
        });
      } else {
        const lastPhase1 = filtered
          .filter((s) => s.step_order === 7)
          .sort((a, b) => (a.branch_lane === "main" ? -1 : 1))[0];
        if (lastPhase1) {
          edges.push({
            id: `${lastPhase1.id}-to-weekly-summary`,
            source: lastPhase1.id,
            target: summaryId,
            type: "smoothstep",
          });
        }
      }
    }
  }

  return { nodes, edges };
}
