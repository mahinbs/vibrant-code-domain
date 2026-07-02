import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { trackMetaConversion } from "@/lib/analytics/metaConversion";
import { isMetaConversionSourcePage } from "@/lib/analytics/metaScope";
import { submitStrategyCallLead } from "../lib/submitLead";

export type StrategyCallLeadModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Same attribution as main lead form (e.g. fintech-landing). */
  sourcePage: string;
};

/** Matches `LeadForm` `Field` input + label styling and the industry landing glass cards. */
const fieldClass =
  "w-full border border-white/15 p-3.5 bg-black/40 rounded-lg text-sm text-white placeholder:text-white/40 backdrop-blur-[5px] transition-colors focus:border-white/40 focus:outline-none focus:ring-0";

/** Keeps Radix close button top-right and visible on dark glass modals. */
const DIALOG_CLOSE_BTN =
  "[&>button]:!absolute [&>button]:right-3 [&>button]:top-3 [&>button]:z-30 [&>button]:flex [&>button]:size-9 [&>button]:items-center [&>button]:justify-center [&>button]:rounded-full [&>button]:border [&>button]:border-white/25 [&>button]:bg-black/60 [&>button]:text-white [&>button]:opacity-100 [&>button]:shadow-[0_4px_12px_rgba(0,0,0,0.35)] [&>button]:backdrop-blur-sm [&>button]:hover:bg-white/15 [&>button]:hover:text-white [&>button]:focus:outline-none [&>button]:focus:ring-2 [&>button]:focus:ring-white/30 [&>button_svg]:size-5";

export function StrategyCallLeadModal({ open, onOpenChange, sourcePage }: StrategyCallLeadModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const reset = () => {
    setName("");
    setEmail("");
    setWhatsapp("");
    setError(null);
    setDone(false);
    setSubmitting(false);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) reset();
    onOpenChange(next);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const n = name.trim();
    const em = email.trim();
    const wa = whatsapp.trim();
    if (!n || !em || !wa) {
      setError("Please fill in name, WhatsApp number, and email.");
      return;
    }
    setSubmitting(true);
    const res = await submitStrategyCallLead({ name: n, email: em, phone: wa, sourcePage });
    setSubmitting(false);
    if (!res.ok) {
      setError(res.error ?? "Something went wrong. Please try again.");
      return;
    }
    if (isMetaConversionSourcePage(sourcePage)) {
      trackMetaConversion({
        eventName: "Schedule",
        email: em,
        phone: wa,
        sourcePage,
      });
    }
    setDone(true);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          "max-w-[440px] gap-0 overflow-hidden border border-white/12 bg-[linear-gradient(165deg,rgba(22,36,74,0.88)_0%,rgba(6,10,22,0.96)_55%,rgba(0,0,0,0.94)_100%)] p-0 text-gray-100 shadow-[0_24px_60px_-24px_rgba(60,100,255,0.45)] sm:rounded-[16px]",
          DIALOG_CLOSE_BTN,
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px]"
        />
        <div className="relative z-[1] p-6 pr-12 sm:p-8 sm:pr-14">
          <DialogHeader className="space-y-2 text-left">
            <DialogTitle className="text-[22px] font-medium leading-tight -tracking-[0.02em] text-white sm:text-[24px]">
              Book your strategy call
            </DialogTitle>
            <DialogDescription className="text-[14px] leading-relaxed text-white/65">
              Share how we can reach you, we will follow up on WhatsApp and email.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6">
            {done ? (
              <div className="space-y-5">
                <p className="text-[15px] leading-relaxed text-white/82">
                  You are all set. We have received your details and will be in touch shortly.
                </p>
                <button
                  type="button"
                  onClick={() => handleOpenChange(false)}
                  className="inline-flex w-full items-center justify-center rounded-[10px] border border-white/20 px-4 py-3 text-sm font-medium text-white/90 transition-colors hover:bg-white/5 hover:text-white"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => void onSubmit(e)} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="strategy-call-name" className="text-[12px] font-medium text-white/70">
                    Name *
                  </label>
                  <input
                    id="strategy-call-name"
                    name="name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={fieldClass}
                    placeholder="Your name"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="strategy-call-whatsapp" className="text-[12px] font-medium text-white/70">
                    WhatsApp number *
                  </label>
                  <input
                    id="strategy-call-whatsapp"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className={fieldClass}
                    placeholder="+91 90000 00000"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="strategy-call-email" className="text-[12px] font-medium text-white/70">
                    Email *
                  </label>
                  <input
                    id="strategy-call-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={fieldClass}
                    placeholder="you@company.com"
                  />
                </div>

                {error ? <p className="text-[12px] text-red-300/90">{error}</p> : null}

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-gloss relative mt-1 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-[10px] border border-white/20 bg-purple/70 px-5 py-[15px] text-sm font-medium text-white shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)] transition-opacity disabled:opacity-60"
                >
                  <span className="relative z-[2]">{submitting ? "Sending…" : "Send request"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
