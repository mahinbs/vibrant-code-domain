import type { Json } from "@/integrations/supabase/types";
import {
  PSYCH_CONVICTION_OPTIONS,
  PSYCH_STAKE_OPTIONS,
} from "@/redesign/founderPartnership/founderApplicationConfig";

type FounderProfile = {
  archetype?: string;
  partnerFit?: string;
};

function labelFor(
  options: readonly { value: string; label: string }[],
  value: string,
): string {
  return options.find((o) => o.value === value)?.label ?? (value || "—");
}

export function FounderLeadSummary({ payload }: { payload: Json }) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return null;
  const p = payload as Record<string, unknown>;
  const version = p.form_version;
  if (version !== "v2" && version !== "v2.1" && version !== "v2.2") return null;

  const profile = p.founder_profile as FounderProfile | undefined;
  const ideaOrigin = String(p.ideaOrigin ?? "").slice(0, 200);
  const vision = String(p.vision3Year ?? "").slice(0, 200);
  const mindset = String(p.founderMindset ?? "").slice(0, 200);
  const psychStake = String(p.psychStake ?? "");
  const psychConviction = String(p.psychConviction ?? "");
  const building =
    p.buildingType === "other"
      ? String(p.buildingTypeOther ?? "Something else")
      : String(p.buildingType ?? "—");

  return (
    <div className="mb-4 space-y-3 rounded-md border border-violet-500/30 bg-violet-950/20 p-4 text-sm">
      <p className="font-medium text-violet-200">Founder application summary</p>
      <dl className="grid gap-2 text-gray-300">
        <Row label="Archetype" value={profile?.archetype ?? "—"} capitalize />
        <Row label="Partner fit" value={profile?.partnerFit ?? "—"} capitalize />
        <Row label="Building" value={building} />
        <Row label="Revenue" value={String(p.revenueModel ?? "—")} />
        <Row label="Validation" value={String(p.validationStage ?? "—")} />
        <Row label="Timeline" value={String(p.timeline ?? "—")} />
        <Row label="Budget" value={String(p.budgetInr ?? "—")} />
        <Row label="Commitment" value={`${String(p.commitmentLevel ?? "—")} / 5`} />
        {psychStake ? (
          <Row label="At stake" value={labelFor(PSYCH_STAKE_OPTIONS, psychStake)} />
        ) : null}
        {psychConviction ? (
          <Row label="Conviction" value={labelFor(PSYCH_CONVICTION_OPTIONS, psychConviction)} />
        ) : null}
      </dl>
      {ideaOrigin ? <Excerpt title="What sparked it" text={ideaOrigin} /> : null}
      {vision ? <Excerpt title="Vision" text={vision} /> : null}
      {mindset ? <Excerpt title="Why it matters" text={mindset} /> : null}
    </div>
  );
}

function Row({
  label,
  value,
  capitalize,
}: {
  label: string;
  value: string;
  capitalize?: boolean;
}) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-gray-500">{label}</dt>
      <dd className={`text-right ${capitalize ? "capitalize" : ""}`}>{value}</dd>
    </div>
  );
}

function Excerpt({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-gray-500">{title}</p>
      <p className="mt-1 text-gray-400">
        {text}
        {text.length >= 160 ? "…" : ""}
      </p>
    </div>
  );
}
