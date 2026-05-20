import {
  BUDGET_OPTIONS,
  BUILDING_OPTIONS,
  SCENE_META,
  SCENE_ORDER,
  TIMELINE_OPTIONS,
  sceneIndex,
} from "./founderApplicationConfig";
import type { FounderApplicationFormState, FounderSceneId } from "./founderApplicationTypes";

export type FounderDraftSummary = {
  firstName: string;
  progressPercent: number;
  currentStepLabel: string;
  chips: { label: string; value: string }[];
};

function labelFor(
  options: readonly { value: string; label: string }[],
  value: string,
): string | null {
  if (!value) return null;
  return options.find((o) => o.value === value)?.label ?? value;
}

export function buildFounderDraftSummary(
  form: FounderApplicationFormState,
  currentStep: FounderSceneId,
): FounderDraftSummary {
  const idx = sceneIndex(currentStep);
  const progressPercent =
    idx >= 0 ? Math.min(100, Math.round(((idx + 1) / SCENE_ORDER.length) * 100)) : 0;

  const firstName = form.name.trim().split(/\s+/)[0] || "there";

  const chips: { label: string; value: string }[] = [];

  if (form.name.trim()) chips.push({ label: "Name", value: form.name.trim() });
  if (form.email.trim()) chips.push({ label: "Email", value: form.email.trim() });

  const building =
    form.buildingType === "other"
      ? form.buildingTypeOther.trim() || "Something else"
      : labelFor(BUILDING_OPTIONS, form.buildingType);
  if (building) chips.push({ label: "Building", value: building });

  const spark = form.ideaOrigin.trim();
  if (spark) {
    chips.push({
      label: "Spark",
      value: spark.length > 48 ? `${spark.slice(0, 48)}…` : spark,
    });
  }

  const timeline = labelFor(TIMELINE_OPTIONS, form.timeline);
  if (timeline) chips.push({ label: "Timeline", value: timeline });

  const budget = labelFor(BUDGET_OPTIONS, form.budgetInr);
  if (budget) chips.push({ label: "Budget", value: budget });

  const stepMeta = SCENE_META[currentStep];

  return {
    firstName,
    progressPercent,
    currentStepLabel: stepMeta?.headline ?? currentStep,
    chips,
  };
}

export function formatRelativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffMs = now - then;
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} minute${mins === 1 ? "" : "s"} ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}
