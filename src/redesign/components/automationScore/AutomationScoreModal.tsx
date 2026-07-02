import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { SurveyFlow } from "./SurveyFlow";

export type AutomationScoreModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Attribution for leads captured through this modal. */
  sourcePage: string;
};

/** Matches StrategyCallLeadModal close-button treatment on dark glass. */
const DIALOG_CLOSE_BTN =
  "[&>button]:!absolute [&>button]:right-3 [&>button]:top-3 [&>button]:z-30 [&>button]:flex [&>button]:size-9 [&>button]:items-center [&>button]:justify-center [&>button]:rounded-full [&>button]:border [&>button]:border-white/25 [&>button]:bg-black/60 [&>button]:text-white [&>button]:opacity-100 [&>button]:shadow-[0_4px_12px_rgba(0,0,0,0.35)] [&>button]:backdrop-blur-sm [&>button]:hover:bg-white/15 [&>button]:hover:text-white [&>button]:focus:outline-none [&>button]:focus:ring-2 [&>button]:focus:ring-white/30 [&>button_svg]:size-5";

/**
 * The automation-score funnel (survey → gate → report) in a popup, so landing
 * pages can capture leads without navigating away. Progress persists in
 * sessionStorage, so closing and reopening resumes where the visitor left off.
 */
export function AutomationScoreModal({
  open,
  onOpenChange,
  sourcePage,
}: AutomationScoreModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "flex max-h-[92dvh] w-[calc(100vw-24px)] max-w-[760px] flex-col gap-0 overflow-hidden border border-white/15 bg-black p-0 text-gray-100 shadow-[0_24px_60px_-24px_rgba(60,100,255,0.45)] sm:rounded-[16px]",
          DIALOG_CLOSE_BTN,
        )}
        style={{
          background:
            "radial-gradient(120% 90% at 100% 110%, var(--color-purple) 0%, rgb(8,16,40) 42%, #000 78%)",
        }}
      >
        {/* Radix requires a title for accessibility; visually the survey has its own headings. */}
        <DialogTitle className="sr-only">Get your automation score</DialogTitle>
        <div className="relative z-[1] flex flex-1 flex-col items-center overflow-y-auto overscroll-contain px-4 py-8 sm:px-8 sm:py-10">
          {open ? <SurveyFlow sourcePage={sourcePage} /> : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
