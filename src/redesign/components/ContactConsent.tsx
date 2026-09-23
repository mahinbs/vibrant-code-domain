import { Link } from "react-router-dom";
import {
  CONSENT_REQUIRED_MESSAGE,
  PRIVACY_REQUEST_EMAIL,
  type ContactConsentState,
} from "../lib/contactConsent";

type ContactConsentProps = {
  value: ContactConsentState;
  onChange: (next: ContactConsentState) => void;
  error?: string;
  compact?: boolean;
  idPrefix?: string;
};

export function ContactConsent({
  value,
  onChange,
  error,
  compact = false,
  idPrefix = "consent",
}: ContactConsentProps) {
  const box = compact ? "size-3.5" : "size-4";
  const text = compact ? "text-[11px] leading-snug text-white/70" : "text-[12px] leading-relaxed text-white/70";
  const gap = compact ? "gap-1.5" : "gap-2";

  return (
    <div className={compact ? "flex flex-col gap-2" : "flex flex-col gap-2.5"}>
      <label className={`flex cursor-pointer items-start ${gap}`}>
        <input
          id={`${idPrefix}-whatsapp`}
          type="checkbox"
          checked={value.whatsapp}
          onChange={(e) => onChange({ ...value, whatsapp: e.target.checked })}
          className={`${box} mt-0.5 shrink-0 rounded border-white/30 bg-black/50 text-purple focus:ring-purple`}
        />
        <span className={text}>
          I agree to be contacted on WhatsApp (including automated messages) about this enquiry and
          the Service. I can opt out by replying STOP.{" "}
          <Link to="/privacy-policy" className="text-white/85 underline-offset-2 hover:underline">
            Privacy
          </Link>
          .
        </span>
      </label>
      <label className={`flex cursor-pointer items-start ${gap}`}>
        <input
          id={`${idPrefix}-voice`}
          type="checkbox"
          checked={value.voice}
          onChange={(e) => onChange({ ...value, voice: e.target.checked })}
          className={`${box} mt-0.5 shrink-0 rounded border-white/30 bg-black/50 text-purple focus:ring-purple`}
        />
        <span className={text}>
          I agree to voice calls, including AI-assisted calls, on this number about this enquiry and
          the Service. I can opt out by emailing{" "}
          <a
            href={`mailto:${PRIVACY_REQUEST_EMAIL}`}
            className="text-white/85 underline-offset-2 hover:underline"
          >
            {PRIVACY_REQUEST_EMAIL}
          </a>{" "}
          or asking on the call.{" "}
          <Link to="/privacy-policy" className="text-white/85 underline-offset-2 hover:underline">
            Privacy
          </Link>
          .
        </span>
      </label>
      {error ? (
        <p className={compact ? "text-[11px] text-red-300/90" : "text-[12px] text-red-300/90"}>
          {error || CONSENT_REQUIRED_MESSAGE}
        </p>
      ) : null}
    </div>
  );
}
