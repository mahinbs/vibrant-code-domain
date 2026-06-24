import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { AuditLeadCard } from "./AuditLeadCard";
import type { LeadFormProps } from "./LeadForm";

const CTA_SHELL_BG =
  "radial-gradient(60% 100% at 50% 0%, var(--color-dark-purple) 0%, #000 75%)";

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
          "fixed left-1/2 top-1/2 flex w-[calc(100%-20px)] max-w-[520px] -translate-x-1/2 -translate-y-1/2 flex-col gap-0 overflow-hidden rounded-[16px] border border-white/15 p-0 text-gray-100 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.75)]",
          DIALOG_CLOSE_BTN,
        )}
        style={{ background: CTA_SHELL_BG, maxHeight: "calc(100dvh - 20px)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[0] bg-[length:400px_auto] bg-repeat opacity-70"
          style={{ backgroundImage: "url(/textures/stars.svg)" }}
        />
        <div className="relative z-[1] flex min-h-0 flex-1 flex-col overflow-hidden px-4 py-4 pr-11 sm:px-5 sm:py-5 sm:pr-12">
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
