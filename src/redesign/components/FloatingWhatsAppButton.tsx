import { WhatsAppIcon } from "./icons";

type FloatingWhatsAppButtonProps = {
  href: string;
  className?: string;
};

/** Fixed WhatsApp FAB — mobile only by default. */
export function FloatingWhatsAppButton({ href, className = "" }: FloatingWhatsAppButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={[
        "fixed bottom-5 right-5 z-[120] flex size-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_8px_24px_rgba(0,0,0,0.45)] ring-1 ring-black/10 transition-transform hover:scale-105 active:scale-95 md:hidden",
        className,
      ].join(" ")}
    >
      <WhatsAppIcon className="size-7 fill-white" />
    </a>
  );
}
