import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { trackMetaConversion } from "@/lib/analytics/metaConversion";
import { isMetaConversionSourcePage } from "@/lib/analytics/metaScope";
import {
  computeReport,
  formatHoursRange,
  formatInrRange,
  type SurveyAnswers,
} from "../../data/automationScore/calculator";
import {
  TEAM_SIZE_OPTIONS,
  TOOL_OPTIONS,
  type TeamSizeId,
  type ToolId,
} from "../../data/automationScore/taxonomy";
import {
  getIndustryProfile,
  INDUSTRY_PROFILES,
  processLabelFor,
} from "../../data/automationScore/industryProfiles";
import {
  submitAutomationScoreLead,
  type AutomationScoreLeadInput,
} from "../../lib/submitLead";
import {
  AUTOMATION_SCORE_STORAGE_KEY,
  writeAutomationScoreState,
} from "../../lib/automationScoreStorage";
import { GateForm, type GateContact } from "./GateForm";
import { LeakStep } from "./LeakStep";

const STORAGE_KEY = AUTOMATION_SCORE_STORAGE_KEY;
const PENDING_LEAD_KEY = "bms-automation-score-pending-lead";
const RETRY_DELAYS_MS = [5_000, 20_000, 60_000];

type Phase = "survey" | "gate" | "report";

type StoredState = {
  step: 1 | 2 | 3 | 4;
  industryId: string;
  teamSizeId: TeamSizeId | "";
  leakIds: string[];
  otherLeak: string;
  toolIds: ToolId[];
  phase: Phase;
  contactName: string;
};

function defaultState(initialIndustryId?: string): StoredState {
  return {
    step: initialIndustryId ? 2 : 1,
    industryId: initialIndustryId ?? "",
    teamSizeId: "",
    leakIds: [],
    otherLeak: "",
    toolIds: [],
    phase: "survey",
    contactName: "",
  };
}

function loadState(initialIndustryId?: string): StoredState {
  if (typeof window === "undefined") return defaultState(initialIndustryId);
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState(initialIndustryId);
    const parsed = JSON.parse(raw) as Partial<StoredState>;
    return { ...defaultState(initialIndustryId), ...parsed };
  } catch {
    return defaultState(initialIndustryId);
  }
}

/** Fire-and-retry lead submission: never blocks or re-gates the report. */
function submitLeadInBackground(input: AutomationScoreLeadInput, attempt = 0): void {
  void submitAutomationScoreLead(input).then((res) => {
    if (res.ok) {
      try {
        window.localStorage.removeItem(PENDING_LEAD_KEY);
      } catch {
        /* storage unavailable */
      }
      return;
    }
    try {
      window.localStorage.setItem(PENDING_LEAD_KEY, JSON.stringify(input));
    } catch {
      /* storage unavailable */
    }
    if (attempt < RETRY_DELAYS_MS.length) {
      window.setTimeout(
        () => submitLeadInBackground(input, attempt + 1),
        RETRY_DELAYS_MS[attempt],
      );
    }
  });
}

function StepPill({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-xl border px-4 py-3.5 text-left text-[14px] font-medium transition-colors",
        selected
          ? "border-purple/80 bg-purple/30 text-white"
          : "border-white/15 bg-white/[0.04] text-white/85 hover:border-white/35 hover:text-white",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function NavButtons({
  onBack,
  onNext,
  nextLabel,
  nextDisabled,
}: {
  onBack?: () => void;
  onNext: () => void;
  nextLabel: string;
  nextDisabled?: boolean;
}) {
  return (
    <div className="mt-1 flex items-center gap-2">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center justify-center rounded-[10px] border border-white/20 px-4 py-[13px] text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white"
        >
          Back
        </button>
      ) : null}
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className="btn-gloss relative inline-flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-[10px] border border-white/20 bg-purple/70 px-5 py-[15px] text-sm font-medium text-white shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)] transition-opacity disabled:opacity-50"
      >
        <span className="relative z-[2]">{nextLabel}</span>
      </button>
    </div>
  );
}

const STEP_TITLES: Record<1 | 2 | 3 | 4, string> = {
  1: "What industry are you in?",
  2: "How big is your team?",
  3: "Where does your team lose the most time?",
  4: "What tools do you run on today?",
};

export function SurveyFlow({
  sourcePage,
  initialIndustryId,
}: {
  sourcePage: string;
  initialIndustryId?: string;
}) {
  const navigate = useNavigate();
  const [state, setState] = useState<StoredState>(() => loadState(initialIndustryId));
  const flowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.phase !== "report") return;
    navigate("/automation-score/report", { replace: true });
  }, [state.phase, navigate]);

  useEffect(() => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable */
    }
  }, [state]);

  // Flush a lead that failed to send in a previous session.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(PENDING_LEAD_KEY);
      if (raw) submitLeadInBackground(JSON.parse(raw) as AutomationScoreLeadInput);
    } catch {
      /* storage unavailable / corrupt */
    }
  }, []);

  const update = (patch: Partial<StoredState>) => {
    setState((prev) => ({ ...prev, ...patch }));
    flowRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const industry = useMemo(
    () => getIndustryProfile(state.industryId || "other"),
    [state.industryId],
  );

  const answers: SurveyAnswers | null =
    state.industryId && state.teamSizeId
      ? {
          industryId: state.industryId,
          teamSizeId: state.teamSizeId,
          selectedProcessIds: state.leakIds,
          otherLeakText: state.otherLeak,
          toolIds: state.toolIds,
        }
      : null;

  const report = useMemo(
    () => (answers && state.phase !== "survey" ? computeReport(answers) : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.phase, state.industryId, state.teamSizeId, state.leakIds, state.otherLeak, state.toolIds],
  );

  function toggleLeak(id: string) {
    setState((prev) => ({
      ...prev,
      leakIds: prev.leakIds.includes(id)
        ? prev.leakIds.filter((x) => x !== id)
        : [...prev.leakIds, id],
    }));
  }

  function toggleTool(id: ToolId) {
    setState((prev) => ({
      ...prev,
      toolIds: prev.toolIds.includes(id)
        ? prev.toolIds.filter((x) => x !== id)
        : [...prev.toolIds, id],
    }));
  }

  function goToGate() {
    update({ phase: "gate" });
    // Upper-funnel signal: survey completed, gate shown (no PII yet, fbp/fbc only).
    if (isMetaConversionSourcePage(sourcePage)) {
      trackMetaConversion({ eventName: "Contact", sourcePage });
    }
  }

  function onUnlock(contact: GateContact) {
    if (!answers || !report) return;

    const nextState: StoredState = {
      ...state,
      phase: "report",
      contactName: contact.name.trim(),
    };
    writeAutomationScoreState(nextState);
    setState(nextState);

    if (isMetaConversionSourcePage(sourcePage)) {
      trackMetaConversion({
        eventName: "Lead",
        email: contact.email,
        phone: contact.phone,
        sourcePage,
      });
    }

    submitLeadInBackground({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      company: contact.company,
      website: contact.website,
      sourcePage,
      survey: {
        industry: state.industryId,
        industryLabel: industry.label,
        teamSize: state.teamSizeId,
        leaks: state.leakIds.map((id) => processLabelFor(industry, id)),
        leakIds: state.leakIds,
        otherLeak: state.otherLeak.trim() || null,
        tools: state.toolIds,
        automationScore: report.automationScore,
        estimatedHoursPerWeek: formatHoursRange(report.totalHoursPerWeek),
        estimatedMonthlyCost: formatInrRange(report.monthlyCostInr),
      },
    });

    navigate("/automation-score/report");
  }

  if (state.phase === "report") {
    return null;
  }

  if (state.phase === "gate") {
    return (
      <div ref={flowRef} className="flex w-full max-w-[560px] flex-col gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="rounded-full border border-emerald-400/40 bg-emerald-400/15 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-emerald-300">
            Report generated
          </span>
          <h2 className="text-[28px] font-medium leading-[1.1] -tracking-[0.03em] text-white md:text-[36px]">
            Your automation report is <span className="impact-highlight">ready</span>
          </h2>
          <p className="max-w-[440px] text-[14px] leading-relaxed text-white/60">
            Tell us where to link it and it opens instantly, hours lost, monthly
            cost, and exactly what we&apos;d automate first.
          </p>
        </div>

        {/* Blurred teaser: the report exists, it just needs unlocking. */}
        <div
          aria-hidden
          className="pointer-events-none relative flex flex-col gap-3 overflow-hidden rounded-xl border border-white/15 bg-black/40 p-5"
        >
          <div className="flex flex-col gap-3 blur-[7px]">
            <div className="h-7 w-2/3 rounded-md bg-white/25" />
            <div className="h-4 w-1/2 rounded-md bg-white/15" />
            <div className="h-3 w-full rounded-full bg-purple/50" />
            <div className="h-3 w-3/4 rounded-full bg-white/20" />
            <div className="h-3 w-1/3 rounded-full bg-emerald-400/50" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/70 px-4 py-2 text-[13px] font-medium text-white/90 backdrop-blur-[3px]">
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-3.5 text-white/70"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Unlocks below
            </span>
          </div>
        </div>

        <GateForm onUnlock={onUnlock} />

        <button
          type="button"
          onClick={() => update({ phase: "survey", step: 4 })}
          className="w-fit self-center text-[13px] font-medium text-white/50 underline decoration-white/25 underline-offset-4 hover:text-white/80"
        >
          ← Back to my answers
        </button>
      </div>
    );
  }

  const { step } = state;
  const canSkipIndustryStep = Boolean(initialIndustryId);
  const firstStep: 1 | 2 = canSkipIndustryStep ? 2 : 1;

  return (
    <div ref={flowRef} className="flex w-full max-w-[640px] flex-col gap-5">
      <div className="flex items-center justify-between text-[12px] text-white/65">
        <span>
          Step {canSkipIndustryStep ? step - 1 : step} of {canSkipIndustryStep ? 3 : 4}
        </span>
        <span>
          {Math.round(
            ((canSkipIndustryStep ? step - 1 : step) / (canSkipIndustryStep ? 3 : 4)) * 100,
          )}
          % complete
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-purple transition-all duration-300"
          style={{
            width: `${((canSkipIndustryStep ? step - 1 : step) / (canSkipIndustryStep ? 3 : 4)) * 100}%`,
          }}
        />
      </div>

      <h2 className="text-[24px] font-medium leading-[1.15] -tracking-[0.02em] text-white md:text-[30px]">
        {STEP_TITLES[step]}
      </h2>

      {step === 1 ? (
        <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
          {INDUSTRY_PROFILES.map((p) => (
            <StepPill
              key={p.id}
              label={p.label}
              selected={state.industryId === p.id}
              onClick={() => update({ industryId: p.id, step: 2 })}
            />
          ))}
        </div>
      ) : null}

      {step === 2 ? (
        <>
          <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
            {TEAM_SIZE_OPTIONS.map((t) => (
              <StepPill
                key={t.id}
                label={t.label}
                selected={state.teamSizeId === t.id}
                onClick={() => update({ teamSizeId: t.id, step: 3 })}
              />
            ))}
          </div>
          {!canSkipIndustryStep ? (
            <button
              type="button"
              onClick={() => update({ step: 1 })}
              className="w-fit text-[13px] font-medium text-white/50 underline decoration-white/25 underline-offset-4 hover:text-white/80"
            >
              ← Back
            </button>
          ) : null}
        </>
      ) : null}

      {step === 3 ? (
        <>
          <LeakStep
            industry={industry}
            selectedIds={state.leakIds}
            onToggle={toggleLeak}
            otherText={state.otherLeak}
            onOtherTextChange={(text) => setState((prev) => ({ ...prev, otherLeak: text }))}
          />
          <NavButtons
            onBack={() => update({ step: 2 })}
            onNext={() => update({ step: 4 })}
            nextLabel="Continue"
            nextDisabled={state.leakIds.length === 0}
          />
        </>
      ) : null}

      {step === 4 ? (
        <>
          <p className="-mt-2 text-[13px] text-white/55">
            Optional, helps us gauge how much is already connected.
          </p>
          <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
            {TOOL_OPTIONS.map((t) => (
              <StepPill
                key={t.id}
                label={t.label}
                selected={state.toolIds.includes(t.id)}
                onClick={() => toggleTool(t.id)}
              />
            ))}
          </div>
          <NavButtons
            onBack={() => update({ step: 3 })}
            onNext={goToGate}
            nextLabel="Generate my report →"
          />
        </>
      ) : null}

      {step === firstStep && state.phase === "survey" ? (
        <p className="text-center text-[12px] text-white/45">
          Takes under 60 seconds · Personalized to your answers
        </p>
      ) : null}
    </div>
  );
}
