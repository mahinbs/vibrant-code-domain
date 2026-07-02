import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  formatHoursRange,
  formatInr,
  formatInrRange,
  type AutomationReport,
} from "../../data/automationScore/calculator";
import { StrategyCallLeadModal } from "../StrategyCallLeadModal";
import { ArrowRightIcon } from "../icons";

type ReportViewProps = {
  report: AutomationReport;
  firstName?: string;
};

const PURPLE = "rgb(72, 118, 255)";
const BRIGHT_PURPLE = "rgb(108, 148, 255)";
const EMERALD = "rgb(52, 211, 153)";

const mid = (r: { low: number; high: number }) => (r.low + r.high) / 2;

function scoreColor(score: number): string {
  if (score < 40) return "rgb(248, 113, 113)";
  if (score < 65) return "rgb(251, 191, 36)";
  return EMERALD;
}

/** Semicircular score gauge (SVG; no chart lib needed). */
function ScoreGauge({ score }: { score: number }) {
  const r = 80;
  const arcLength = Math.PI * r;
  const filled = (score / 100) * arcLength;
  const color = scoreColor(score);
  return (
    <div className="relative mx-auto w-[220px]">
      <svg viewBox="0 0 200 110" className="w-full">
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke={color}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${arcLength}`}
          style={{ transition: "stroke-dasharray 900ms ease" }}
        />
      </svg>
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center">
        <span className="text-[40px] font-semibold leading-none -tracking-[0.02em] text-white">
          {score}
        </span>
        <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/50">
          / 100
        </span>
      </div>
    </div>
  );
}

type TooltipPayloadItem = { name?: string; value?: number | string; color?: string };

function ChartTooltip({
  active,
  payload,
  label,
  valueFormatter,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string | number;
  valueFormatter: (v: number) => string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-white/15 bg-black/90 px-3 py-2 text-[12px] text-white shadow-xl">
      {label !== undefined ? <div className="mb-1 font-medium text-white/70">{label}</div> : null}
      {payload.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <span
            className="size-2 rounded-full"
            style={{ background: item.color ?? PURPLE }}
            aria-hidden
          />
          <span className="text-white/70">{item.name}:</span>
          <span className="font-semibold">
            {typeof item.value === "number" ? valueFormatter(item.value) : item.value}
          </span>
        </div>
      ))}
    </div>
  );
}

const truncate = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);

const PROJECTION_MID_INDEX = 5;
const PROJECTION_END_INDEX = 11;

function projectionMilestones(compact: boolean): number[] {
  return compact ? [PROJECTION_END_INDEX] : [PROJECTION_MID_INDEX, PROJECTION_END_INDEX];
}

function makeProjectionDot(compact: boolean, stroke: string) {
  return function ProjectionDot(props: { cx?: number; cy?: number; index?: number }) {
    const { cx, cy, index } = props;
    if (cx == null || cy == null || index == null) return null;
    if (!projectionMilestones(compact).includes(index)) return null;
    return (
      <circle
        cx={cx}
        cy={cy}
        r={4}
        fill={stroke}
        stroke="rgba(0,0,0,0.65)"
        strokeWidth={1.5}
      />
    );
  };
}

function makeProjectionLabel(
  series: "nothing" | "automation",
  compact: boolean,
) {
  const color = series === "nothing" ? "rgb(248, 113, 113)" : BRIGHT_PURPLE;

  return function ProjectionLabel(props: {
    x?: number;
    y?: number;
    index?: number;
    value?: number;
  }) {
    const { x, y, index, value } = props;
    if (x == null || y == null || index == null || value == null) return null;
    if (!projectionMilestones(compact).includes(index)) return null;

    const isEnd = index === PROJECTION_END_INDEX;
    const offsetY = series === "nothing" ? -11 : 17;
    const textAnchor = isEnd ? "start" : "middle";
    const dx = isEnd ? 7 : 0;

    return (
      <text
        x={x + dx}
        y={y + offsetY}
        fill={color}
        fontSize={compact ? 10 : 11}
        fontWeight={600}
        textAnchor={textAnchor}
      >
        {formatInr(value)}
      </text>
    );
  };
}

/** Charts need concrete pixel widths for axes; track the small-screen breakpoint. */
function useCompactCharts(): boolean {
  const [compact, setCompact] = useState<boolean>(
    () => typeof window !== "undefined" && window.innerWidth < 640,
  );
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 639px)");
    const onChange = () => setCompact(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return compact;
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-white/15 bg-black/40 p-5">
      <span className="text-[12px] font-medium uppercase tracking-[0.06em] text-white/50">
        {title}
      </span>
      {children}
    </div>
  );
}

/** The personalized payoff screen, computed entirely client-side from survey answers. */
export function ReportView({ report, firstName }: ReportViewProps) {
  const [auditModalOpen, setAuditModalOpen] = useState(false);
  const compactCharts = useCompactCharts();

  const topLeak = report.topLeaks[0];
  const projectionEnd = report.projection[report.projection.length - 1];
  const yearOneGap = projectionEnd
    ? projectionEnd.doingNothing - projectionEnd.withAutomation
    : 0;

  const barData = report.topLeaks.map((p) => ({
    name: truncate(p.label, compactCharts ? 17 : 26),
    fullName: p.label,
    hours: Math.round(p.hoursPerWeek),
  }));

  const projectionData = report.projection.map((p) => ({
    month: `M${p.month}`,
    "Doing nothing": p.doingNothing,
    "With automation": p.withAutomation,
  }));

  return (
    <div className="flex w-full flex-col gap-8">
      {/* ── Score + headline insight ─────────────────────────────── */}
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="rounded-full border border-white/15 bg-black/60 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-white/70">
          {report.industry.label} · {report.teamSizeLabel}
        </span>
        <ScoreGauge score={report.automationScore} />
        <h2 className="text-[26px] font-medium leading-[1.1] -tracking-[0.03em] text-white md:text-[34px]">
          {firstName ? `${firstName}, your` : "Your"} automation score
        </h2>
        <p className="max-w-[560px] text-[15px] leading-relaxed text-white/65">
          Lower score = more untapped opportunity.
          {topLeak ? (
            <>
              {" "}
              Your single biggest leak is{" "}
              <span className="font-medium text-white">{topLeak.label.toLowerCase()}</span> , 
              roughly <span className="font-medium text-white">{report.topLeakSharePct}%</span> of
              everything you&apos;re losing.
            </>
          ) : null}
        </p>
      </div>

      {/* ── Stat cards ───────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-3 max-md:grid-cols-1">
        <div className="flex flex-col gap-1 rounded-xl border border-white/15 bg-black/40 p-5">
          <span className="text-[12px] font-medium uppercase tracking-[0.06em] text-white/50">
            Time lost
          </span>
          <span className="text-[26px] font-semibold -tracking-[0.02em] text-white">
            {formatHoursRange(report.totalHoursPerWeek)}
            <span className="text-[14px] font-normal text-white/55"> /week</span>
          </span>
          <span className="text-[13px] text-white/55">
            across the {report.processes.length} areas you selected
          </span>
        </div>
        <div className="flex flex-col gap-1 rounded-xl border border-white/15 bg-black/40 p-5">
          <span className="text-[12px] font-medium uppercase tracking-[0.06em] text-white/50">
            Monthly cost
          </span>
          <span className="text-[26px] font-semibold -tracking-[0.02em] text-white">
            {formatInrRange(report.monthlyCostInr)}
          </span>
          <span className="text-[13px] text-white/55">
            savings potential: {formatInrRange(report.monthlySavingsInr)}/mo
          </span>
        </div>
        <div className="flex flex-col gap-1 rounded-xl border border-purple/40 bg-purple/10 p-5">
          <span className="text-[12px] font-medium uppercase tracking-[0.06em] text-white/60">
            Over a year
          </span>
          <span className="text-[26px] font-semibold -tracking-[0.02em] text-white">
            {formatInrRange(report.annualCostInr)}
          </span>
          <span className="text-[13px] text-white/60">walking out the door annually</span>
        </div>
      </div>

      {/* ── Insight strip: automatable share + payback ───────────── */}
      <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
        <div className="flex items-center gap-4 rounded-xl border border-white/15 bg-black/40 p-4">
          <span className="text-[30px] font-semibold -tracking-[0.02em] text-emerald-300">
            {report.recoverableSharePct}%
          </span>
          <span className="text-[13px] leading-snug text-white/65">
            of your lost time is realistically automatable with today&apos;s tools
          </span>
        </div>
        {report.paybackWeeks ? (
          <div className="flex items-center gap-4 rounded-xl border border-white/15 bg-black/40 p-4">
            <span className="whitespace-nowrap text-[30px] font-semibold -tracking-[0.02em] text-white">
              {report.paybackWeeks.low}–{report.paybackWeeks.high}
              <span className="text-[15px] font-normal text-white/55"> wks</span>
            </span>
            <span className="text-[13px] leading-snug text-white/65">
              typical time for an automation project to pay for itself at your savings rate
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-4 rounded-xl border border-white/15 bg-black/40 p-4">
            <span className="text-[13px] leading-snug text-white/65">
              Start with your single biggest leak, small scope, fast payback, then expand.
            </span>
          </div>
        )}
      </div>

      {/* ── Hours per leak (bar chart) ───────────────────────────── */}
      <SectionCard title="Where the hours go, your leaks, ranked">
        <div style={{ height: Math.max(120, barData.length * 46) }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} layout="vertical" margin={{ left: 0, right: 44, top: 0, bottom: 0 }}>
              <CartesianGrid horizontal={false} stroke="rgba(255,255,255,0.08)" />
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                width={compactCharts ? 118 : 190}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "rgba(255,255,255,0.75)", fontSize: compactCharts ? 11 : 12 }}
              />
              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.05)" }}
                content={
                  <ChartTooltip valueFormatter={(v) => `~${v} hrs/week`} />
                }
              />
              <Bar
                dataKey="hours"
                name="Hours lost"
                radius={[0, 6, 6, 0]}
                barSize={18}
                label={{
                  position: "right",
                  fill: "rgba(255,255,255,0.85)",
                  fontSize: 12,
                  formatter: (v: number) => `${v}h`,
                }}
              >
                {barData.map((_, i) => (
                  <Cell key={i} fill={i === 0 ? BRIGHT_PURPLE : "rgba(255,255,255,0.22)"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-[13px] text-white/50">
          Weekly hours estimated from industry benchmarks × your team size. The highlighted bar
          is where we&apos;d start.
        </p>
      </SectionCard>

      {/* ── 12-month projection (area chart) ─────────────────────── */}
      <SectionCard title="The next 12 months, cost of waiting">
        <p className="-mt-2 text-[13px] text-white/50">
          Cumulative cost if you keep waiting vs. automating
        </p>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={projectionData}
              margin={{
                left: 8,
                right: compactCharts ? 50 : 60,
                top: 20,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="gradNothing" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(248,113,113)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="rgb(248,113,113)" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="gradAuto" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={PURPLE} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={PURPLE} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.08)" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 11 }}
                interval={compactCharts ? 2 : 1}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 10 }}
                tickFormatter={(v: number) => formatInr(v)}
                width={compactCharts ? 44 : 54}
              />
              <Tooltip
                content={<ChartTooltip valueFormatter={(v) => formatInr(v)} />}
              />
              <Area
                type="monotone"
                dataKey="Doing nothing"
                stroke="rgb(248,113,113)"
                strokeWidth={2}
                fill="url(#gradNothing)"
                dot={makeProjectionDot(compactCharts, "rgb(248,113,113)")}
                activeDot={{ r: 5 }}
              >
                <LabelList content={makeProjectionLabel("nothing", compactCharts)} />
              </Area>
              <Area
                type="monotone"
                dataKey="With automation"
                stroke={BRIGHT_PURPLE}
                strokeWidth={2}
                fill="url(#gradAuto)"
                dot={makeProjectionDot(compactCharts, BRIGHT_PURPLE)}
                activeDot={{ r: 5 }}
              >
                <LabelList content={makeProjectionLabel("automation", compactCharts)} />
              </Area>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-[12px] text-white/60">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[rgb(248,113,113)]" aria-hidden /> Doing
              nothing
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full" style={{ background: BRIGHT_PURPLE }} aria-hidden />{" "}
              With automation
            </span>
          </div>
          <span className="text-[13px] font-medium text-white/80">
            Gap by month 12: <span className="text-emerald-300">~{formatInr(yearOneGap)} kept</span>
          </span>
        </div>
      </SectionCard>

      {/* ── Maturity readout ─────────────────────────────────────── */}
      <div className="flex flex-col gap-2 rounded-xl border border-white/15 bg-black/40 p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[12px] font-medium uppercase tracking-[0.06em] text-white/50">
            Your automation maturity
          </span>
          <span className="text-[12px] font-semibold text-white/70">
            Stage {report.maturity.stage} of 4
          </span>
        </div>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={[
                "h-1.5 flex-1 rounded-full",
                s <= report.maturity.stage ? "bg-purple" : "bg-white/10",
              ].join(" ")}
              aria-hidden
            />
          ))}
        </div>
        <span className="text-[15px] font-medium text-white">{report.maturity.label}</span>
        <p className="text-[13px] leading-relaxed text-white/60">{report.maturity.blurb}</p>
      </div>

      {/* ── What we'd automate first ─────────────────────────────── */}
      <div className="flex flex-col gap-3">
        <span className="text-[12px] font-medium uppercase tracking-[0.06em] text-white/50">
          What we&apos;d automate first for you
        </span>
        <div className="flex flex-col gap-2">
          {report.topLeaks.map((p, i) => (
            <div
              key={p.id}
              className="flex flex-col gap-1.5 rounded-xl border border-white/15 bg-black/40 px-4 py-3.5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-purple/40 text-[12px] font-semibold text-white">
                    {i + 1}
                  </span>
                  <span className="rounded-full border border-purple/50 bg-purple/20 px-3 py-1.5 text-[13px] font-medium text-white">
                    {p.reportTag}
                  </span>
                </div>
                <span className="text-[12px] font-semibold text-white/60">
                  ~{Math.round(p.recoverableHoursPerWeek)} hrs/wk back
                </span>
              </div>
              <p className="pl-[34px] text-[13px] leading-relaxed text-white/60">
                {p.automationExample}
              </p>
            </div>
          ))}
        </div>
        <p className="text-[13px] text-white/55">
          Get a complete automation audit for free below.
        </p>
      </div>

      {/* ── Audit CTA ────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-[14px] border border-white/[0.08] bg-[linear-gradient(140deg,rgba(22,36,74,0.55)_0%,rgba(8,14,32,0.88)_55%,rgba(0,0,0,0.92)_100%)] p-6 md:p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-16 bottom-0 z-0 h-[240px] w-[240px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(108,148,255,0.35),transparent_70%)] blur-[50px]"
        />
        <div className="relative z-[1] flex flex-col items-center gap-4 text-center">
          <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/55">
            1:1 with the Chief Executive Officer
          </span>
          <h3 className="text-[24px] font-medium leading-[1.12] -tracking-[0.02em] text-white md:text-[28px]">
            Book your <span className="impact-highlight">free automation audit</span>
          </h3>
          <p className="max-w-[480px] text-[14px] leading-[1.55] text-white/70 md:text-[15px]">
            Walk through this report with us on a free 30-minute call. We&apos;ll map
            your top leaks to concrete automations, most clients go live in 30 days.
          </p>
          <button
            type="button"
            onClick={() => setAuditModalOpen(true)}
            className="btn-gloss relative inline-flex w-full max-w-sm items-center justify-center overflow-hidden rounded-[10px] border border-white/20 bg-purple/70 px-7 py-[15px] text-[15px] font-medium text-white shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)] sm:w-auto"
          >
            <span className="relative z-[2]">Book my free audit</span>
          </button>
          <p className="text-[11px] uppercase tracking-[0.16em] text-white/45">
            Free · 30 minutes · No sales pitch
          </p>
          <Link
            to="/business-automation"
            className="inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-[10px] border border-white/10 bg-[#1a1a2e] px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-[#252540] sm:w-auto"
          >
            Go to website
            <ArrowRightIcon className="size-3.5 shrink-0 text-white/80" />
          </Link>
        </div>
      </div>

      <StrategyCallLeadModal
        open={auditModalOpen}
        onOpenChange={setAuditModalOpen}
        sourcePage="automation-score"
      />

      <p className="text-center text-[12px] text-white/40">
        Estimates use industry-benchmarked time multipliers and a loaded hourly cost of
        ₹{report.industry.hourlyCostLoaded}/hr for {report.industry.label.toLowerCase()} teams.
        Your audit call refines these against your real numbers.
      </p>
    </div>
  );
}
