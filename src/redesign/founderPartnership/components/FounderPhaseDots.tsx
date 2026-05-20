import { PHASE_ORDER } from "../founderApplicationConfig";
import type { FounderPhaseId } from "../founderApplicationTypes";

type Props = {
  activePhase: FounderPhaseId;
  className?: string;
};

export function FounderPhaseDots({ activePhase, className = "" }: Props) {
  const activeIndex = PHASE_ORDER.indexOf(activePhase);

  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      aria-label={`Chapter ${activeIndex + 1} of ${PHASE_ORDER.length}`}
    >
      {PHASE_ORDER.map((phase, i) => (
        <span
          key={phase}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            i <= activeIndex ? "w-5 bg-purple" : "w-1.5 bg-white/25"
          }`}
        />
      ))}
    </div>
  );
}
