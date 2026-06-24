import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { AuditLeadCard, type AuditLeadCardProps } from "./AuditLeadCard";

/** Keeps Radix close button top-right and visible on dark glass modals. */
const DIALOG_CLOSE_BTN =
  "[&>button]:!absolute [&>button]:right-3 [&>button]:top-3 [&>button]:z-30 [&>button]:flex [&>button]:size-9 [&>button]:items-center [&>button]:justify-center [&>button]:rounded-full [&>button]:border [&>button]:border-white/25 [&>button]:bg-black/60 [&>button]:text-white [&>button]:opacity-100 [&>button]:shadow-[0_4px_12px_rgba(0,0,0,0.35)] [&>button]:backdrop-blur-sm [&>button]:hover:bg-white/15 [&>button]:hover:text-white [&>button]:focus:outline-none [&>button]:focus:ring-2 [&>button]:focus:ring-white/30 [&>button_svg]:size-5";

export type AuditLeadModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
} & Omit<AuditLeadCardProps, "inDialog">;

export function AuditLeadModal({
  open,
  onOpenChange,
  title = "What's holding your business back?",
  ...cardProps
}: AuditLeadModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "fixed left-1/2 top-1/2 z-50 flex w-[calc(100%-16px)] max-w-[520px] -translate-x-1/2 -translate-y-1/2 gap-0 overflow-hidden rounded-[16px] border-0 bg-transparent p-0 shadow-none",
          DIALOG_CLOSE_BTN,
        )}
        style={{ maxHeight: "calc(100dvh - 16px)" }}
      >
        <DialogTitle className="sr-only">{typeof title === "string" ? title : "Free AI Audit"}</DialogTitle>
        <div className="max-h-[calc(100dvh-16px)] overflow-y-auto overscroll-contain">
          <AuditLeadCard {...cardProps} title={title} inDialog />
        </div>
      </DialogContent>
    </Dialog>
  );
}
