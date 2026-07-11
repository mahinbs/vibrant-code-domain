export type WorkflowViewMode = "overview" | "phase1" | "weekly";

export type CanvasPosition = { x: number; y: number };

const VIEW_KEYS: Record<WorkflowViewMode, string> = {
  overview: "canvas_overview",
  phase1: "canvas_phase1",
  weekly: "canvas_weekly",
};

export function canvasMetaKey(viewMode: WorkflowViewMode): string {
  return VIEW_KEYS[viewMode];
}

export function getSavedCanvasPosition(
  metadata: Record<string, unknown> | null | undefined,
  viewMode: WorkflowViewMode,
): CanvasPosition | null {
  const raw = metadata?.[canvasMetaKey(viewMode)];
  if (raw && typeof raw === "object" && raw !== null) {
    const { x, y } = raw as { x?: unknown; y?: unknown };
    if (typeof x === "number" && typeof y === "number") return { x, y };
  }
  return null;
}

export function withCanvasPosition(
  metadata: Record<string, unknown> | null | undefined,
  viewMode: WorkflowViewMode,
  position: CanvasPosition,
): Record<string, unknown> {
  return {
    ...(metadata ?? {}),
    [canvasMetaKey(viewMode)]: position,
  };
}
