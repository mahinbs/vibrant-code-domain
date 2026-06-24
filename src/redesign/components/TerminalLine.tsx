import { useEffect, useRef, useState } from "react";
import type { NicheLogEntry } from "../data/businessAutomationNiches";
import { useTypewriterLine } from "./useTypewriterLine";

const BRAILLE_FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

type LinePhase = "hidden" | "prompt" | "typing" | "spinning" | "done" | "output";

type TerminalLineProps = {
  entry: Required<Pick<NicheLogEntry, "time" | "command" | "output">> & {
    status?: NicheLogEntry["status"];
  };
  active: boolean;
  complete: boolean;
  instant?: boolean;
  onComplete?: () => void;
};

function statusLabel(status: NicheLogEntry["status"]) {
  if (status === "warn") return "[WARN]";
  if (status === "info") return "[INFO]";
  return "[OK]";
}

function statusClass(status: NicheLogEntry["status"]) {
  if (status === "warn") return "text-amber-400";
  if (status === "info") return "text-blue-400/80";
  return "text-[#5dcaa5]";
}

export function TerminalLine({
  entry,
  active,
  complete,
  instant = false,
  onComplete,
}: TerminalLineProps) {
  const status = entry.status ?? "ok";
  const [phase, setPhase] = useState<LinePhase>(complete || instant ? "output" : "hidden");
  const [spinnerFrame, setSpinnerFrame] = useState(0);
  const [showOutput, setShowOutput] = useState(complete || instant);
  const completedRef = useRef(false);

  const typingEnabled = phase === "typing" && !instant;
  const { display: typedCommand, done: typingDone } = useTypewriterLine(
    entry.command,
    typingEnabled,
    30,
  );

  useEffect(() => {
    if (complete || instant) {
      setPhase("output");
      setShowOutput(true);
      return;
    }
    if (!active) {
      setPhase("hidden");
      setShowOutput(false);
      completedRef.current = false;
      return;
    }
    completedRef.current = false;
    setPhase("prompt");
    setShowOutput(false);
  }, [active, complete, instant, entry.command]);

  useEffect(() => {
    if (instant || complete || !active) return;
    if (phase !== "prompt") return;
    const t = window.setTimeout(() => setPhase("typing"), 80);
    return () => window.clearTimeout(t);
  }, [phase, active, instant, complete]);

  useEffect(() => {
    if (instant || complete || !active) return;
    if (phase !== "typing" || !typingDone) return;
    setPhase("spinning");
  }, [phase, typingDone, active, instant, complete]);

  useEffect(() => {
    if (phase !== "spinning" || instant) return;
    const intervalId = window.setInterval(() => {
      setSpinnerFrame((f) => (f + 1) % BRAILLE_FRAMES.length);
    }, 80);
    const t = window.setTimeout(() => {
      window.clearInterval(intervalId);
      setPhase("done");
    }, 500);
    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(t);
    };
  }, [phase, instant]);

  useEffect(() => {
    if (instant || complete || !active) return;
    if (phase !== "done") return;
    const t = window.setTimeout(() => {
      setShowOutput(true);
      setPhase("output");
    }, 150);
    return () => window.clearTimeout(t);
  }, [phase, active, instant, complete]);

  useEffect(() => {
    if (instant || complete || !active) return;
    if (phase !== "output" || !showOutput) return;
    if (completedRef.current) return;
    completedRef.current = true;
    const t = window.setTimeout(() => onComplete?.(), 300);
    return () => window.clearTimeout(t);
  }, [phase, showOutput, active, instant, complete, onComplete]);

  if (phase === "hidden" && !complete) return null;

  const commandText = complete || instant || phase === "output" || phase === "done" || phase === "spinning"
    ? entry.command
    : typedCommand;

  const showBadge = phase === "done" || phase === "output" || complete || instant;
  const showSpinner = phase === "spinning" && !instant;

  return (
    <div className="autopilot-terminal-line-in mb-3">
      <div className="flex flex-wrap items-start gap-x-2 gap-y-0.5">
        <span className="shrink-0 text-[#5dcaa5]/70">[{entry.time}]</span>
        <span className="min-w-0 flex-1 break-all text-white/90">
          {commandText}
          {phase === "typing" && !typingDone && !instant ? (
            <span className="autopilot-terminal-caret" aria-hidden />
          ) : null}
        </span>
        {showSpinner ? (
          <span className="shrink-0 text-white/45">
            {BRAILLE_FRAMES[spinnerFrame]} running...
          </span>
        ) : null}
        {showBadge ? (
          <span className={`shrink-0 ${statusClass(status)}`}>{statusLabel(status)}</span>
        ) : null}
      </div>
      {showOutput && entry.output ? (
        <p className="mt-1 pl-4 text-white/55">
          <span className="text-white/30">└─ </span>
          {entry.output}
        </p>
      ) : null}
    </div>
  );
}
