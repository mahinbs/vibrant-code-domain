import { useEffect, useState } from "react";

export type RevealStep =
  | "reset"
  | "triggers"
  | "ingestPaths"
  | "preprocess"
  | "toCorePaths"
  | "core"
  | "routingPaths"
  | "routing"
  | "toActionPaths"
  | "actions"
  | "steady";

const STEP_ORDER: RevealStep[] = [
  "reset",
  "triggers",
  "ingestPaths",
  "preprocess",
  "toCorePaths",
  "core",
  "routingPaths",
  "routing",
  "toActionPaths",
  "actions",
  "steady",
];

const STEP_DELAYS: Record<RevealStep, number> = {
  reset: 0,
  triggers: 400,
  ingestPaths: 500,
  preprocess: 300,
  toCorePaths: 400,
  core: 200,
  routingPaths: 400,
  routing: 300,
  toActionPaths: 500,
  actions: 400,
  steady: 0,
};

function stepIndex(step: RevealStep): number {
  return STEP_ORDER.indexOf(step);
}

export function useWorkflowReveal(reducedMotion: boolean, enabled = true) {
  const [step, setStep] = useState<RevealStep>(
    reducedMotion || enabled ? (reducedMotion ? "steady" : "reset") : "reset",
  );

  useEffect(() => {
    if (!enabled) {
      setStep("reset");
      return;
    }
    if (reducedMotion) {
      setStep("steady");
      return;
    }

    setStep("reset");
    let cancelled = false;
    let current = 0;
    let timeoutId: number | undefined;

    const advance = () => {
      if (cancelled) return;
      current += 1;
      if (current >= STEP_ORDER.length) return;
      const next = STEP_ORDER[current];
      setStep(next);
      if (next !== "steady") {
        timeoutId = window.setTimeout(advance, STEP_DELAYS[next]);
      }
    };

    const t = window.setTimeout(advance, STEP_DELAYS.triggers);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [reducedMotion, enabled]);

  const idx = stepIndex(step);

  return {
    step,
    showTriggers: idx >= stepIndex("triggers"),
    showIngestPaths: idx >= stepIndex("ingestPaths"),
    showPreprocess: idx >= stepIndex("preprocess"),
    showToCorePaths: idx >= stepIndex("toCorePaths"),
    showCore: idx >= stepIndex("core"),
    showRoutingPaths: idx >= stepIndex("routingPaths"),
    showRouting: idx >= stepIndex("routing"),
    showToActionPaths: idx >= stepIndex("toActionPaths"),
    showActions: idx >= stepIndex("actions"),
    showDots: idx >= stepIndex("steady"),
    showRings: idx >= stepIndex("core"),
    isSteady: step === "steady",
  };
}
