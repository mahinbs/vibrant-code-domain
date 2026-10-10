import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { CC_WHATSAPP_NUMBER, ccOffer } from "../../data/commandCenterContent";
import { useLeadCta } from "./CcLeadForm";
import { captureAttribution, ccTrack, hasSubmitted } from "./ccTracking";
import { sendTelegramMessage } from "../../lib/notifyTelegramLead";
import { trackMetaConversion } from "@/lib/analytics/metaConversion";

const WA_TEXT = "Hi Boostmysites, I'd like to book a free demo and claim the 2,500 credits for $1 offer.";
const waHref = `https://wa.me/${CC_WHATSAPP_NUMBER}?text=${encodeURIComponent(WA_TEXT)}`;

function onWhatsAppClick(placement: string) {
  ccTrack("cc_whatsapp_click", { placement });
  trackMetaConversion({ eventName: "Contact", sourcePage: "command-center" });
  sendTelegramMessage(`💬 <b>WhatsApp click</b> on /command-center (${placement}). Watch for a new chat.`);
}

/** Thin offer strip above the poster: an offer and a CTA on the very first screen. */
export function CcOfferRibbon() {
  const { openLead } = useLeadCta();
  return (
    <a
      href="#contact"
      className="cc-ribbon"
      onClick={(e) => {
        e.preventDefault();
        openLead({ source: "offer-ribbon" });
      }}
    >
      <Sparkles size={15} aria-hidden="true" />
      <span>{ccOffer.ribbon}</span>
      <strong>
        Book <ArrowRight size={14} aria-hidden="true" />
      </strong>
    </a>
  );
}

/**
 * Always-available ways to enquire: a floating WhatsApp button on desktop and a
 * sticky bottom bar on phones. Both step aside while a form is on screen.
 * Also records ad attribution and runs a one-time exit-intent offer on desktop.
 */
export function CcConversion() {
  const { openLead, modalOpen } = useLeadCta();
  const [scrolled, setScrolled] = useState(false);
  const [formInView, setFormInView] = useState(false);

  useEffect(() => {
    captureAttribution();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = document.getElementById("contact");
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setFormInView(entry.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Exit intent: desktop only, once per session, never after a submission.
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine) and (min-width: 900px)").matches) return;
    const KEY = "cc-exit-shown";
    const shown = () => {
      try {
        return sessionStorage.getItem(KEY) === "1";
      } catch {
        return true;
      }
    };
    const armedAt = Date.now();
    const onLeave = (e: MouseEvent) => {
      if (e.clientY > 8 || e.relatedTarget || Date.now() - armedAt < 8000) return;
      if (shown() || hasSubmitted() || document.querySelector(".cc-modal")) return;
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {
        /* ignore */
      }
      openLead({ source: "exit-intent" });
    };
    document.addEventListener("mouseout", onLeave);
    return () => document.removeEventListener("mouseout", onLeave);
  }, [openLead]);

  const hidden = modalOpen || formInView;

  return (
    <>
      <a
        className={`cc-wa-float${hidden ? " is-hidden" : ""}`}
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        onClick={() => onWhatsAppClick("floating")}
      >
        <FaWhatsapp size={28} aria-hidden="true" />
        <span className="cc-wa-float-label">Chat on WhatsApp</span>
      </a>

      <div className={`cc-mobile-bar${scrolled && !hidden ? " is-visible" : ""}`} aria-hidden={!scrolled || hidden}>
        <a
          href="#contact"
          className="cc-btn is-primary cc-mobile-bar-cta"
          tabIndex={scrolled && !hidden ? 0 : -1}
          onClick={(e) => {
            e.preventDefault();
            openLead({ source: "mobile-bar" });
          }}
        >
          <Sparkles size={16} aria-hidden="true" />
          <span>{ccOffer.cta}</span>
        </a>
        <a
          href={waHref}
          className="cc-mobile-bar-wa"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          tabIndex={scrolled && !hidden ? 0 : -1}
          onClick={() => onWhatsAppClick("mobile-bar")}
        >
          <FaWhatsapp size={24} aria-hidden="true" />
        </a>
      </div>
    </>
  );
}
