import { useMemo, useState } from "react";
import {
  categoriesForCluster,
  PROCESS_CLUSTERS,
  type ProcessCategory,
} from "../../data/automationScore/taxonomy";
import {
  processLabelFor,
  type IndustryProfile,
} from "../../data/automationScore/industryProfiles";

export const MAX_LEAK_SELECTIONS = 6;

type LeakStepProps = {
  industry: IndustryProfile;
  selectedIds: string[];
  onToggle: (id: string) => void;
  otherText: string;
  onOtherTextChange: (text: string) => void;
};

function LeakPill({
  label,
  selected,
  disabled,
  onClick,
}: {
  label: string;
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={[
        "rounded-full border px-3.5 py-2 text-left text-[13px] font-medium transition-colors",
        selected
          ? "border-purple/80 bg-purple/30 text-white shadow-[inset_0_0_6px_2px_rgba(255,255,255,0.12)]"
          : "border-white/15 bg-white/[0.04] text-white/80 hover:border-white/35 hover:text-white",
        disabled && !selected ? "cursor-not-allowed opacity-40" : "",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

/**
 * Step 3, "where does the time leak?". Shows the industry's emphasized
 * processes first (in its own vocabulary), with every remaining universal
 * category available under a grouped expander so no niche is ever left out.
 */
export function LeakStep({
  industry,
  selectedIds,
  onToggle,
  otherText,
  onOtherTextChange,
}: LeakStepProps) {
  const [showAll, setShowAll] = useState(false);

  const emphasizedSet = useMemo(
    () => new Set<string>(industry.emphasizedProcesses),
    [industry],
  );

  const atCap = selectedIds.length >= MAX_LEAK_SELECTIONS;
  const isDisabled = (id: string) => atCap && !selectedIds.includes(id);

  const remainingByCluster = useMemo(
    () =>
      PROCESS_CLUSTERS.map((cluster) => ({
        cluster,
        categories: categoriesForCluster(cluster.id).filter(
          (c: ProcessCategory) => !emphasizedSet.has(c.id),
        ),
      })).filter((g) => g.categories.length > 0),
    [emphasizedSet],
  );

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-medium text-white/70">
          Pick your worst {MAX_LEAK_SELECTIONS} (or fewer)
        </span>
        <span
          className={[
            "rounded-full border px-2.5 py-1 text-[11px] font-semibold",
            atCap
              ? "border-purple/70 bg-purple/25 text-white"
              : "border-white/15 bg-black/40 text-white/60",
          ].join(" ")}
        >
          {selectedIds.length}/{MAX_LEAK_SELECTIONS}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {industry.emphasizedProcesses.map((id) => (
          <LeakPill
            key={id}
            label={processLabelFor(industry, id)}
            selected={selectedIds.includes(id)}
            disabled={isDisabled(id)}
            onClick={() => onToggle(id)}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => setShowAll((v) => !v)}
        aria-expanded={showAll}
        className={[
          "flex w-full items-center justify-between rounded-xl border px-4 py-3.5 text-left text-[14px] font-medium transition-colors",
          showAll
            ? "border-white/30 bg-white/10 text-white"
            : "border-dashed border-white/30 bg-white/[0.04] text-white hover:border-white/50 hover:bg-white/10",
        ].join(" ")}
      >
        <span>
          {showAll
            ? "Hide other areas"
            : "See all areas, sales, marketing, finance, HR, production & more"}
        </span>
        <span
          className={[
            "flex size-6 shrink-0 items-center justify-center rounded-full bg-purple/60 text-[13px] font-semibold text-white transition-transform",
            showAll ? "rotate-45" : "",
          ].join(" ")}
          aria-hidden
        >
          +
        </span>
      </button>

      {showAll ? (
        <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
          {remainingByCluster.map(({ cluster, categories }) => (
            <div key={cluster.id} className="flex flex-col gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/45">
                {cluster.label}
              </span>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <LeakPill
                    key={c.id}
                    label={processLabelFor(industry, c.id)}
                    selected={selectedIds.includes(c.id)}
                    disabled={isDisabled(c.id)}
                    onClick={() => onToggle(c.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="other-leak"
          className="text-[12px] font-medium text-white/70"
        >
          Something else eating your team&apos;s time? (optional)
        </label>
        <input
          id="other-leak"
          type="text"
          value={otherText}
          onChange={(e) => onOtherTextChange(e.target.value)}
          placeholder="Tell us in a few words…"
          className="w-full rounded-lg border border-white/15 bg-white/[0.04] p-3 text-sm text-white placeholder:text-white/40 transition-colors focus:border-white/40 focus:outline-none"
        />
      </div>
    </div>
  );
}
