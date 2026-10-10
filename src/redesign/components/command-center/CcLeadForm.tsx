import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Link } from "react-router-dom";
import { ArrowRight, Check, ChevronDown, CircleCheck, Clock, Loader2, Lock, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { COUNTRIES, DEFAULT_COUNTRY, dialFor } from "../PhoneInput";
import { CC_WHATSAPP_NUMBER, appHref, ccOffer } from "../../data/commandCenterContent";
import { ccTrack, markSubmitted, readAttribution } from "./ccTracking";
import { CcJourney } from "./CcJourney";
import { budgetFor, guessCountry } from "./ccBudget";
import { submitStrategyCallLead } from "../../lib/submitLead";
import {
  CONSENT_REQUIRED_MESSAGE,
  PRIVACY_REQUEST_EMAIL,
  bothConsentsGiven,
  contactConsentSnapshot,
  emptyContactConsent,
} from "../../lib/contactConsent";
import { trackMetaConversion } from "@/lib/analytics/metaConversion";

export const CC_SOURCE_PAGE = "command-center";

/* ---------------------------------------------------------------------------
 * CTA routing: every CTA leads to the enquiry form. When the inline form is
 * close by we scroll to it; otherwise the same form opens in a modal.
 * ------------------------------------------------------------------------- */

export type LeadIntent = { goal?: string; source: string };

type LeadCtx = {
  openLead: (intent: LeadIntent) => void;
  inline: (LeadIntent & { nonce: number }) | null;
  /** True while the popup form is open (sticky bars hide themselves). */
  modalOpen: boolean;
};

const Ctx = createContext<LeadCtx | null>(null);

export function useLeadCta() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLeadCta must be used inside <CcLeadProvider>");
  return ctx;
}

/** How close (in viewport heights) the inline form must be to scroll instead of opening the modal. */
const NEAR_VIEWPORTS = 1.5;

export function CcLeadProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<LeadIntent | null>(null);
  const [inline, setInline] = useState<LeadCtx["inline"]>(null);

  const openLead = useCallback((intent: LeadIntent) => {
    ccTrack("cc_cta_click", { cta: intent.source });
    const target = document.getElementById("contact");
    if (target) {
      const r = target.getBoundingClientRect();
      const vh = window.innerHeight;
      const near = r.top < vh * NEAR_VIEWPORTS && r.bottom > -vh * (NEAR_VIEWPORTS - 1);
      if (near) {
        setInline({ ...intent, nonce: Date.now() });
        const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
        document
          .getElementById("cc-lead-inline")
          ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
        return;
      }
    }
    ccTrack("cc_form_open", { cta: intent.source });
    setModal(intent);
  }, []);

  const value = useMemo(() => ({ openLead, inline, modalOpen: !!modal }), [openLead, inline, modal]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <Dialog.Root open={!!modal} onOpenChange={(o) => !o && setModal(null)}>
        <Dialog.Portal container={typeof document !== "undefined" ? document.getElementById("top") : undefined}>
          <Dialog.Overlay className="cc-modal-overlay" />
          <Dialog.Content className="cc-modal" aria-describedby={undefined}>
            <Dialog.Close className="cc-modal-close" aria-label="Close">
              <X size={20} />
            </Dialog.Close>
            <span className="cc-offer-badge">{ccOffer.badge}</span>
            <Dialog.Title className="cc-form-title">Book your free demo</Dialog.Title>
            <p className="cc-form-sub">
              On the call you get your 90%-off code: your first 2,500 credits for {ccOffer.price} instead of{" "}
              {ccOffer.was}.
            </p>
            <CcJourney compact className="cc-modal-journey" />
            {modal ? <CcLeadForm goal={modal.goal} source={modal.source} idPrefix="cc-modal" autoFocus /> : null}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Ctx.Provider>
  );
}

/** Inline form in the contact section; picks up goals sent by nearby CTAs. */
export function CcInlineLeadForm() {
  const { inline } = useLeadCta();
  return (
    <div id="cc-lead-inline" className="cc-form-card">
      <CcLeadForm
        goal={inline?.goal}
        source={inline?.source ?? "contact-section"}
        idPrefix="cc-inline"
        focusNonce={inline?.nonce}
      />
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * The form
 * ------------------------------------------------------------------------- */

type Errors = Partial<Record<"name" | "email" | "phone" | "budget" | "consent" | "form", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function CcLeadForm({
  goal,
  source,
  idPrefix,
  autoFocus,
  focusNonce,
}: {
  goal?: string;
  source: string;
  idPrefix: string;
  autoFocus?: boolean;
  /** Changes each time a nearby CTA sends the visitor here: refresh the goal and focus. */
  focusNonce?: number;
}) {
  const uid = useId();
  const id = (k: string) => `${idPrefix}-${k}-${uid}`;
  const nameRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({ name: "", company: "", email: "", goal: goal ?? "" });
  // The country the visitor is viewing from (time zone) sets the budget currency and the
  // default dial code; if it can't be told, the phone picker's country is used instead.
  const [viewCountry] = useState<string | null>(() => guessCountry());
  const [country, setCountry] = useState<string>(() => viewCountry ?? DEFAULT_COUNTRY);
  const budget = budgetFor(viewCountry ?? country);
  const [budgetOk, setBudgetOk] = useState(false);
  const [number, setNumber] = useState("");
  const [consent, setConsent] = useState(emptyContactConsent);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const started = useRef(false);
  const onFirstInput = () => {
    if (started.current) return;
    started.current = true;
    ccTrack("cc_form_start", { cta: source });
  };

  useEffect(() => {
    if (!autoFocus && !focusNonce) return;
    if (focusNonce && goal) setForm((p) => ({ ...p, goal }));
    // Wait for the scroll / modal animation before focusing, without jumping the page.
    const t = setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 450);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once per CTA click, not per keystroke
  }, [autoFocus, focusNonce]);

  const phone = number ? `${dialFor(country)} ${number}` : "";
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => {
    setForm((p) => ({ ...p, [k]: e.target.value }));
    if (errors[k as keyof Errors]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next: Errors = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (form.email.trim() && !EMAIL_RE.test(form.email.trim())) next.email = "Check this email, or leave it blank.";
    if (number.replace(/\D/g, "").length < 7) next.phone = "Enter a valid WhatsApp number.";
    if (!budgetOk) next.budget = `The offer is for businesses ready to spend at least ${budget.label} a day on ads.`;
    if (!bothConsentsGiven(consent)) next.consent = CONSENT_REQUIRED_MESSAGE;
    setErrors(next);
    if (Object.keys(next).length) return;

    const snapshot = contactConsentSnapshot(consent);
    setStatus("submitting");
    const res = await submitStrategyCallLead({
      name: form.name,
      // Email is optional here; the table column is NOT NULL, so blank is stored as "".
      email: form.email.trim(),
      phone,
      company: form.company,
      sourcePage: CC_SOURCE_PAGE,
      requirement: form.goal,
      consent_whatsapp: snapshot?.consent_whatsapp,
      consent_voice: snapshot?.consent_voice,
      consent_at: snapshot?.consent_at,
      extra: { cta: source, prefilled_goal: goal ?? null, offer: "2500-credits-for-1-usd",
        country: viewCountry ?? country,
        ad_budget_ok: budgetOk,
        ad_budget_min_per_day: budget.label,
        ...readAttribution(),
      },
    });
    if (!res.ok) {
      setStatus("idle");
      setErrors({ form: res.error ?? "That did not go through. Please try again." });
      return;
    }
    trackMetaConversion({ eventName: "Lead", email: form.email.trim() || undefined, phone, sourcePage: CC_SOURCE_PAGE });
    ccTrack("cc_form_submit", { cta: source });
    markSubmitted();
    setStatus("success");
  }

  if (status === "success") {
    const msg = `Hi Boostmysites, I just booked a free demo and want to claim the 2,500 credits for $1 offer.

Name: ${form.name}
Business: ${form.company.trim() || "-"}
WhatsApp: ${phone}
Goal: ${form.goal.trim() || "-"}`;
    return (
      <div className="cc-form-success" role="status">
        <span className="cc-form-success-icon" aria-hidden="true">
          <CircleCheck size={30} />
        </span>
        <h3 className="cc-form-title">Thank you, {form.name.trim().split(" ")[0]}.</h3>
        <p className="cc-form-sub">
          Our team will message <strong>{phone}</strong> on WhatsApp, usually within a working day, to fix your demo
          time. On the call you get your 90%-off code for 2,500 credits and we start your onboarding.
        </p>
        <a
          className="cc-form-wa"
          href={`https://wa.me/${CC_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp size={20} />
          Want it sooner? Message us now
        </a>
        <a className="cc-form-link" href={appHref(form.goal.trim() || undefined)}>
          Or start in the app yourself <ArrowRight size={15} />
        </a>
      </div>
    );
  }

  const busy = status === "submitting";

  return (
    <form className="cc-form" onSubmit={onSubmit} onInput={onFirstInput} noValidate>
      <div className="cc-form-row">
        <Field id={id("name")} label="Your name" error={errors.name}>
          <input
            ref={nameRef}
            id={id("name")}
            value={form.name}
            onChange={set("name")}
            autoComplete="name"
            placeholder="Priya Sharma"
            aria-invalid={!!errors.name}
            maxLength={80}
          />
        </Field>
        <Field id={id("phone")} label="WhatsApp number" error={errors.phone}>
          <div className={`cc-phone-field${errors.phone ? " is-invalid" : ""}`}>
            <span className="cc-select">
              <select
                aria-label="Country code"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.dial}
                  </option>
                ))}
              </select>
              <ChevronDown size={15} aria-hidden="true" />
            </span>
            <input
              id={id("phone")}
              type="tel"
              inputMode="tel"
              value={number}
              onChange={(e) => {
                setNumber(e.target.value.replace(/[^\d ]/g, ""));
                if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
              }}
              autoComplete="tel-national"
              placeholder="98765 43210"
              aria-invalid={!!errors.phone}
              maxLength={20}
            />
          </div>
        </Field>
      </div>
      <div className="cc-form-row">
        <Field id={id("company")} label="Business name" optional>
          <input
            id={id("company")}
            value={form.company}
            onChange={set("company")}
            autoComplete="organization"
            placeholder="Sharma Dental Clinic"
            maxLength={120}
          />
        </Field>
        <Field id={id("email")} label="Email" optional error={errors.email}>
          <input
            id={id("email")}
            type="email"
            value={form.email}
            onChange={set("email")}
            autoComplete="email"
            placeholder="you@business.com"
            aria-invalid={!!errors.email}
            maxLength={120}
          />
        </Field>
      </div>
      <Field id={id("goal")} label="What do you want to achieve?" optional>
        <textarea
          id={id("goal")}
          value={form.goal}
          onChange={set("goal")}
          rows={3}
          placeholder="e.g. 200 qualified leads a month on WhatsApp"
          maxLength={500}
        />
      </Field>

      <label className={`cc-budget${errors.budget ? " is-invalid" : ""}`}>
        <input
          type="checkbox"
          checked={budgetOk}
          onChange={(e) => {
            setBudgetOk(e.target.checked);
            setErrors((p) => ({ ...p, budget: undefined }));
          }}
        />
        <span className="cc-check" aria-hidden="true">
          <Check size={13} strokeWidth={3.2} />
        </span>
        <span>
          I&apos;m ready to spend at least <strong>{budget.label} a day</strong> on ads
          <small>Paid to Meta or Google directly, from your own ad account.</small>
        </span>
      </label>
      {errors.budget ? <p className="cc-field-error">{errors.budget}</p> : null}

      <fieldset className="cc-consent">
        <legend className="cc-sr">Contact consent</legend>
        <label>
          <input
            type="checkbox"
            checked={consent.whatsapp}
            onChange={(e) => {
              setConsent((c) => ({ ...c, whatsapp: e.target.checked }));
              setErrors((p) => ({ ...p, consent: undefined }));
            }}
          />
          <span className="cc-check" aria-hidden="true">
            <Check size={13} strokeWidth={3.2} />
          </span>
          <span>
            I agree to be contacted on WhatsApp (including automated messages) about this enquiry and the Service. I
            can opt out by replying STOP. <Link to="/privacy-policy">Privacy</Link>.
          </span>
        </label>
        <label>
          <input
            type="checkbox"
            checked={consent.voice}
            onChange={(e) => {
              setConsent((c) => ({ ...c, voice: e.target.checked }));
              setErrors((p) => ({ ...p, consent: undefined }));
            }}
          />
          <span className="cc-check" aria-hidden="true">
            <Check size={13} strokeWidth={3.2} />
          </span>
          <span>
            I agree to voice calls, including AI-assisted calls, on this number about this enquiry and the Service. I
            can opt out by emailing <a href={`mailto:${PRIVACY_REQUEST_EMAIL}`}>{PRIVACY_REQUEST_EMAIL}</a> or asking
            on the call. <Link to="/privacy-policy">Privacy</Link>.
          </span>
        </label>
        {errors.consent ? <p className="cc-field-error">{errors.consent}</p> : null}
      </fieldset>

      {errors.form ? (
        <p className="cc-field-error is-form" role="alert">
          {errors.form}
        </p>
      ) : null}

      <button type="submit" className="cc-btn is-primary is-lg cc-form-submit" disabled={busy}>
        {busy ? <Loader2 size={18} className="cc-spin" /> : null}
        <span>{busy ? "Sending…" : "Book my free demo"}</span>
        {busy ? null : <ArrowRight size={18} />}
      </button>

      <ul className="cc-form-trust">
        <li>
          <Clock size={14} aria-hidden="true" /> Reply within a working day
        </li>
        <li>
          <Lock size={14} aria-hidden="true" /> Nothing spends until you approve
        </li>
      </ul>
    </form>
  );
}

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className={`cc-field${error ? " is-invalid" : ""}`}>
      <label htmlFor={id}>
        {label}
        {optional ? <span> (optional)</span> : null}
      </label>
      {children}
      {error ? <p className="cc-field-error">{error}</p> : null}
    </div>
  );
}
