import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { AuditLeadCard } from "./AuditLeadCard";
import type { LeadFormProps } from "./LeadForm";

/** Keeps Radix close button top-right and visible on dark glass modals. */
const DIALOG_CLOSE_BTN =
  "[&>button]:!absolute [&>button]:right-3 [&>button]:top-3 [&>button]:z-30 [&>button]:flex [&>button]:size-9 [&>button]:items-center [&>button]:justify-center [&>button]:rounded-full [&>button]:border [&>button]:border-white/25 [&>button]:bg-black/60 [&>button]:text-white [&>button]:opacity-100 [&>button]:shadow-[0_4px_12px_rgba(0,0,0,0.35)] [&>button]:backdrop-blur-sm [&>button]:hover:bg-white/15 [&>button]:hover:text-white [&>button]:focus:outline-none [&>button]:focus:ring-2 [&>button]:focus:ring-white/30 [&>button_svg]:size-5";

export type AuditLeadModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  whatsappHref?: string;
  leadFormProps?: Partial<LeadFormProps>;
};

export function AuditLeadModal({
  open,
  onOpenChange,
  eyebrow = "Free AI Audit",
  title = "What's holding your business back?",
  subtitle = "Book a free 30-minute AI Audit. We'll identify 3 things your team does manually that can be automated this month.",
  whatsappHref,
  leadFormProps,
}: AuditLeadModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "max-h-[min(92vh,900px)] w-[95%] max-w-[560px] gap-0 overflow-y-auto border border-white/15 bg-[linear-gradient(165deg,rgba(22,36,74,0.88)_0%,rgba(6,10,22,0.96)_55%,rgba(0,0,0,0.94)_100%)] p-0 text-gray-100 shadow-[0_24px_60px_-24px_rgba(60,100,255,0.45)] sm:rounded-[16px]",
          DIALOG_CLOSE_BTN,
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[length:400px_auto] bg-repeat opacity-40"
          style={{ backgroundImage: "url(/textures/stars.svg)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px]"
        />
        <div className="relative z-[1] p-6 pr-12 sm:p-8 sm:pr-14">
          <DialogTitle className="sr-only">{title}</DialogTitle>
          <AuditLeadCard
            variant="modal"
            eyebrow={eyebrow}
            title={title}
            subtitle={subtitle}
            whatsappHref={whatsappHref}
            leadFormProps={leadFormProps}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
