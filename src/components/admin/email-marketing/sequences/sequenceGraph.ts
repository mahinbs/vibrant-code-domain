import type { Edge, Node } from "@xyflow/react";
import type { EmSequenceStep, EmSequenceStepStats } from "@/services/emailMarketing";

const LANE_X: Record<string, number> = {
  opened: 0,
  main: 280,
  not_opened: 560,
};

const ROW_HEIGHT = 160;

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
};

export type ForkNodeData = {
  afterStepOrder: number;
  hasBranch: boolean;
  selected?: boolean;
};

export function conditionLabel(condition: string): string {
  return CONDITION_LABELS[condition] ?? condition;
}

export function buildSequenceMinimap(steps: EmSequenceStep[]): string {
  if (!steps.length) return "Empty sequence";
  const orders = [...new Set(steps.map((s) => s.step_order))].sort((a, b) => a - b);
  const parts: string[] = [];
  for (const order of orders) {
    const at = steps.filter((s) => s.step_order === order);
    const hasBranch = at.some((s) => s.branch_lane !== "main");
    if (hasBranch) {
      parts.push(`[${order}a|${order}b]`);
    } else {
      const main = at.find((s) => s.branch_lane === "main") ?? at[0];
      const label =
        main.step_type === "ai_draft"
          ? "AI"
          : main.step_type === "case_study"
            ? "CS"
            : "Tmpl";
      parts.push(`[${order} ${label}]`);
    }
  }
  return parts.join(" → ");
}

export function buildSequenceGraph(
  steps: EmSequenceStep[],
  statsByStep: Record<string, EmSequenceStepStats>,
  selectedStepId: string | null,
  selectedForkOrder: number | null,
): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  if (!steps.length) return { nodes, edges };

  const orders = [...new Set(steps.map((s) => s.step_order))].sort((a, b) => a - b);
  const nodeIdsAtOrder = new Map<number, string[]>();

  for (const order of orders) {
    const atOrder = steps.filter((s) => s.step_order === order);
    const branchSteps = atOrder.filter((s) => s.branch_lane !== "main");
    const hasBranches = branchSteps.length > 0;
    const forkAfter = hasBranches ? branchSteps[0].branch_after_step_order : null;

    if (hasBranches && forkAfter != null) {
      const forkId = `fork-${forkAfter}`;
      if (!nodes.some((n) => n.id === forkId)) {
        nodes.push({
          id: forkId,
          type: "fork",
          position: { x: LANE_X.main, y: order * ROW_HEIGHT - ROW_HEIGHT / 2 },
          data: {
            afterStepOrder: forkAfter,
            hasBranch: true,
            selected: selectedForkOrder === forkAfter,
          } satisfies ForkNodeData,
        });
      }
    }

    const ids: string[] = [];
    for (const step of atOrder) {
      const lane = step.branch_lane ?? "main";
      nodes.push({
        id: step.id,
        type: "email",
        position: { x: LANE_X[lane] ?? LANE_X.main, y: order * ROW_HEIGHT },
        data: {
          step,
          stats: statsByStep[step.id],
          selected: selectedStepId === step.id,
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
