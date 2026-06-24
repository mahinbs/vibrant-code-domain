import { useCallback, useEffect, useRef, useState } from "react";
import type { BusinessAutomationNiche, NicheLogEntry } from "../data/businessAutomationNiches";
import { TerminalLine } from "./TerminalLine";
import { slugifyLabel, TerminalStatValue } from "./TerminalStatValue";
import "./autopilot-terminal.css";

type Phase = "booting" | "running" | "summary" | "complete";

type AutopilotTerminalProps = {
  niche: BusinessAutomationNiche;
  compact?: boolean;
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function normalizeEntry(entry: NicheLogEntry): Required<
  Pick<NicheLogEntry, "time" | "command" | "output">
> & { status: NonNullable<NicheLogEntry["status"]> } {
  if (entry.command && entry.output) {
    return {
      time: entry.time,
      command: entry.command,
      output: entry.output,
      status: entry.status ?? "ok",
    };
  }
  return {
    time: entry.time,
    command: entry.text ?? "",
    output: "",
    status: entry.status ?? "ok",
  };
}

function bootLines(niche: BusinessAutomationNiche): string[] {
  const ruleCount = niche.log.length;
  return [
    "[boot] Initializing autopilot engine...",
    "[boot] Connected to integrations... OK",
    `[boot] Loaded ${ruleCount} workflow rules for ${niche.label}... OK`,
  ];
}

export function AutopilotTerminal({ niche, compact = false }: AutopilotTerminalProps) {
  const instant = prefersReducedMotion();
  const entries = niche.log.map(normalizeEntry);
  const boots = bootLines(niche);

  const [phase, setPhase] = useState<Phase>(instant ? "complete" : "booting");
  const [bootCount, setBootCount] = useState(instant ? boots.length : 0);
  const [activeLine, setActiveLine] = useState(instant ? entries.length : -1);
  const [completedLines, setCompletedLines] = useState(instant ? entries.length : 0);
  const [showSummary, setShowSummary] = useState(instant);

  const logRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    const el = logRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [bootCount, completedLines, activeLine, showSummary, phase, scrollToBottom]);

  useEffect(() => {
    if (instant) return;
    if (phase !== "booting") return;
    if (bootCount >= boots.length) {
      const t = window.setTimeout(() => {
        setPhase("running");
        setActiveLine(0);
      }, 200);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => setBootCount((c) => c + 1), 120);
    return () => window.clearTimeout(t);
  }, [phase, bootCount, boots.length, instant]);

  const handleLineComplete = useCallback(() => {
    setCompletedLines((prev) => {
      const next = prev + 1;
      if (next >= entries.length) {
        setActiveLine(-1);
        setPhase("summary");
        setShowSummary(true);
        window.setTimeout(() => setPhase("complete"), 800);
      } else {
        setActiveLine(next);
      }
      return next;
    });
  }, [entries.length]);

  const visibleBootLines = instant ? boots : boots.slice(0, bootCount);

  return (
    <div
      className={[
        "relative flex flex-col overflow-hidden rounded-[12px] border border-white/10 bg-[#05070a]",
        compact ? "min-h-0" : "min-h-[480px]",
      ].join(" ")}
      aria-label="Automation terminal showing live workflow execution"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay bg-repeat"
        style={{ backgroundImage: "url(/textures/grid.svg)", backgroundSize: "44px auto" }}
      />

      <div className="relative z-[1] flex items-center justify-between gap-3 border-b border-white/10 bg-white/[0.04] px-4 py-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="font-mono text-[11px] text-white/50">autopilot@vibrant</span>
        </div>
        <span className="font-mono text-[11px] text-white/45">uptime 99.9%</span>
      </div>

      <div
        ref={logRef}
        className={[
          "relative z-[1] flex-1 overflow-y-auto px-4 py-4 font-mono text-[11px] leading-[1.65] md:text-[12px]",
          compact ? "max-h-[160px]" : "max-h-[420px]",
        ].join(" ")}
        aria-live="polite"
      >
        <p className="mb-4 text-white/70">
          <span className="text-[#5dcaa5]/80">$</span> autopilot run --niche={niche.id}
        </p>

        {visibleBootLines.map((line) => (
          <p key={line} className="autopilot-terminal-line-in mb-1.5 text-white/55">
            {line}
          </p>
        ))}

        {entries.map((entry, i) => {
          const isComplete = instant || i < completedLines;
          const isActive = !instant && phase === "running" && activeLine === i;
          if (!instant && i > activeLine && !isComplete) return null;

          return (
            <TerminalLine
              key={`${entry.time}-${entry.command}-${i}`}
              entry={entry}
              active={isActive}
              complete={isComplete}
              instant={instant}
              onComplete={handleLineComplete}
            />
          );
        })}

        {showSummary ? (
          <div className="mt-2 border-t border-white/10 pt-4">
            <p className="text-white/35">{"─".repeat(40)}</p>
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">
              METRICS
            </p>
            <div className="mt-3 flex flex-col gap-1.5">
              {niche.afterStats.map((stat) => {
                const slug = slugifyLabel(stat.label);
                const dots = ".".repeat(
                  Math.max(2, 28 - slug.length - stat.value.length),
                );
                return (
                  <p key={stat.label} className="text-white/65">
                    <span className="text-white/50">{slug}</span>
                    <span className="text-white/25"> {dots} </span>
                    <span className="text-[#5dcaa5]">
                      <TerminalStatValue
                        value={stat.value}
                        animate={phase === "summary" || phase === "complete"}
                      />
                    </span>
                  </p>
                );
              })}
            </div>
            <p className="mt-4 text-white/35">{"─".repeat(40)}</p>
            <p className="mt-3 flex items-center gap-2 text-[#5dcaa5]/90">
              <span
                className="size-2 shrink-0 rounded-full bg-[#5dcaa5] autopilot-pulse-ring"
                aria-hidden
              />
              Autopilot idle — all workflows complete
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
