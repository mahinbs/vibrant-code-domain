import { useState, type ReactNode } from "react";
import { ChevronDown, ChevronRight, HelpCircle } from "lucide-react";

function StatusTag({ children }: { children: string }) {
  return (
    <code className="px-1 py-0.5 rounded bg-gray-800 text-gray-300 text-[10px]">{children}</code>
  );
}

const ROWS: { condition: string; sends: ReactNode; skips: ReactNode }[] = [
  {
    condition: "Always",
    sends: "Every time the sequence reaches this step",
    skips: "Never",
  },
  {
    condition: "If no reply",
    sends: (
      <>
        Lead has <strong className="text-gray-300 font-medium">not replied</strong> since they were
        enrolled in this sequence
      </>
    ),
    skips: "They replied (sequence usually stops)",
  },
  {
    condition: "If no meeting",
    sends: (
      <>
        No Calendly meeting booked (<StatusTag>booked</StatusTag> / <StatusTag>reminded</StatusTag>{" "}
        / <StatusTag>held</StatusTag>)
      </>
    ),
    skips: "They booked a meeting",
  },
  {
    condition: "If no open",
    sends: (
      <>
        The <strong className="text-gray-300 font-medium">previous send</strong> in this enrollment
        was <strong className="text-gray-300 font-medium">not opened</strong>
      </>
    ),
    skips: "Previous email was opened",
  },
  {
    condition: "If opened",
    sends: (
      <>
        The <strong className="text-gray-300 font-medium">previous send</strong> was opened
      </>
    ),
    skips: "Previous email was not opened",
  },
  {
    condition: "If opened, no reply",
    sends: (
      <>
        Previous send was opened <strong className="text-gray-300 font-medium">and</strong> they
        haven&apos;t replied since enrollment
      </>
    ),
    skips: "No open on previous send, or they replied",
  },
  {
    condition: "If clicked",
    sends: (
      <>
        The <strong className="text-gray-300 font-medium">previous send</strong> had a{" "}
        <strong className="text-gray-300 font-medium">click</strong> event (link in that email)
      </>
    ),
    skips: "No click on previous send",
  },
];

type Props = {
  defaultOpen?: boolean;
  compact?: boolean;
};

export function ConditionGuide({ defaultOpen = false, compact = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900/40 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-800/50 transition-colors"
      >
        {open ? (
          <ChevronDown className="h-4 w-4 text-gray-500 shrink-0" />
        ) : (
          <ChevronRight className="h-4 w-4 text-gray-500 shrink-0" />
        )}
        <HelpCircle className="h-4 w-4 text-cyan-500/80 shrink-0" />
        <span className="text-xs font-medium text-gray-300">What do conditions mean?</span>
      </button>
      {open && (
        <div className={`px-3 pb-3 ${compact ? "overflow-x-auto" : ""}`}>
          <p className="text-[11px] text-gray-500 mb-2">
            Conditions <strong className="text-gray-400">skip</strong> a step if not met. Use{" "}
            <strong className="text-gray-400">Split</strong> to send different emails at the same
            step. Open/click checks use the previous send in this enrollment.
          </p>
          <table className="w-full text-[11px] border-collapse">
            <thead>
              <tr className="text-gray-500 text-left border-b border-gray-800">
                <th className="py-1.5 pr-2 font-medium">Condition</th>
                <th className="py-1.5 pr-2 font-medium">Sends this step when…</th>
                <th className="py-1.5 font-medium">Skips when…</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.condition} className="border-b border-gray-800/60 align-top">
                  <td className="py-1.5 pr-2 text-gray-200 whitespace-nowrap">{row.condition}</td>
                  <td className="py-1.5 pr-2 text-gray-400">{row.sends}</td>
                  <td className="py-1.5 text-gray-400">{row.skips}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
