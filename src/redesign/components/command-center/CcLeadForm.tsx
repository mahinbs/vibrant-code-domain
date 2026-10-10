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
import { ArrowLeft, ArrowRight, Check, ChevronDown, CircleCheck, Clock, Loader2, Lock, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { COUNTRIES, DEFAULT_COUNTRY, dialFor } from "../PhoneInput";
import { CC_WHATSAPP_NUMBER, ccOffer } from "../../data/commandCenterContent";
import { ccTrack, markSubmitted, readAttribution } from "./ccTracking";
import { CcJourney } from "./CcJourney";
import {
  GOALS,
  MARKETING_TODAY,
  RUNS_ADS,
  SALES_TEAM,
  budgetTiers,
  goalFromText,
  guessCountry,
  scoreLead,
  type BudgetKey,
  type GoalKey,
  type MarketingKey,
  type RunsAdsKey,
  type SalesKey,
} from "./ccBudget";
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
 * After a submission, a confirmation popup says we'll be in touch.
 * ------------------------------------------------------------------------- */

export type LeadIntent = { goal?: string; source: string };

type Confirmation = { firstName: string; phone: string; waText: string };

type LeadCtx = {
  openLead: (intent: LeadIntent) => void;
  inline: (LeadIntent & { nonce: number }) | null;
  /** True while the popup form or the confirmation is open (sticky bars hide themselves). */
  modalOpen: boolean;
  showConfirmation: (c: Confirmation) => void;
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
  const [confirm, setConfirm] = useState<Confirmation | null>(null);

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

  // Close the form popup first, then open the confirmation, so the two never stack.
  const showConfirmation = useCallback((c: Confirmation) => {
    setModal(null);
    window.setTimeout(() => setConfirm(c), 60);
  }, []);

  const value = useMemo(
    () => ({ openLead, inline, modalOpen: !!modal || !!confirm, showConfirmation }),
    [openLead, inline, modal, confirm, showConfirmation],
  );

  const container = typeof document !== "undefined" ? document.getElementById("top") : undefined;

  return (
    <Ctx.Provider value={value}>
      {children}

      <Dialog.Root open={!!modal} onOpenChange={(o) => !o && setModal(null)}>
        <Dialog.Portal container={container}>
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

      <Dialog.Root open={!!confirm} onOpenChange={(o) => !o && setConfirm(null)}>
        <Dialog.Portal container={container}>
          <Dialog.Overlay className="cc-modal-overlay" />
          <Dialog.Content className="cc-modal cc-confirm" aria-describedby="cc-confirm-body">
            <Dialog.Close className="cc-modal-close" aria-label="Close">
              <X size={20} />
            </Dialog.Close>
            {confirm ? (
              <>
                <span className="cc-confirm-icon" aria-hidden="true">
                  <CircleCheck size={34} />
                </span>
                <Dialog.Title className="cc-form-title">Thank you, {confirm.firstName}!</Dialog.Title>
                <p id="cc-confirm-body" className="cc-form-sub">
                  Your demo request is in. <strong>We&apos;ll contact you shortly</strong> on WhatsApp at{" "}
                  <strong>{confirm.phone}</strong>, usually within a working day, to fix your demo time. On the call you
                  get your 90%-off code for 2,500 credits.
                </p>
                <CcJourney compact className="cc-modal-journey" />
                <a
                  className="cc-form-wa"
                  href={`https://wa.me/${CC_WHATSAPP_NUMBER}?text=${encodeURIComponent(confirm.waText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp size={20} />
                  Want it sooner? Message us now
                </a>
                <Dialog.Close className="cc-btn is-ghost cc-confirm-done">Done</Dialog.Close>
              </>
            ) : null}
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
 * The form: step 1 qualifies, step 2 collects contact details
 * ------------------------------------------------------------------------- */

type ErrorKey =
  | "runsAds"
  | "budget"
  | "goals"
  | "marketing"
  | "sales"
  | "name"
  | "company"
  | "email"
  | "website"
  | "phone"
  | "consent"
  | "form";
type Errors = Partial<Record<ErrorKey, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** A domain or URL: sharmaclinic.com, www.x.in/page, https://x.co … */
const WEBSITE_RE = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(:\d+)?(\/\S*)?$/i;
const normaliseWebsite = (v: string) => {
  const t = v.trim();
  return /^https?:\/\//i.test(t) ? t : `https://${t}`;
};
const labelOf = (list: readonly { key: string; label: string }[], key: string) =>
  list.find((o) => o.key === key)?.label ?? key;

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
  const { showConfirmation } = useLeadCta();
  const uid = useId();
  const id = (k: string) => `${idPrefix}-${k}-${uid}`;
  const formRef = useRef<HTMLFormElement>(null);
  const stepHeadRef = useRef<HTMLDivElement>(null);

  // The country the visitor is viewing from sets the budget currency and the default dial code.
  const [viewCountry] = useState<string | null>(() => guessCountry());
  const [country, setCountry] = useState<string>(() => viewCountry ?? DEFAULT_COUNTRY);
  const tiers = budgetTiers(viewCountry ?? country);

  const [step, setStep] = useState<1 | 2>(1);
  const [runsAds, setRunsAds] = useState<RunsAdsKey | "">("");
  const [budget, setBudget] = useState<BudgetKey | "">("");
  const [goals, setGoals] = useState<GoalKey[]>(() => {
    const g = goalFromText(goal);
    return g ? [g] : [];
  });
  const [marketing, setMarketing] = useState<MarketingKey | "">("");
  const [sales, setSales] = useState<SalesKey | "">("");
  const [form, setForm] = useState({ name: "", company: "", email: "", website: "", note: goal ?? "" });
  const [noWebsite, setNoWebsite] = useState(false);
  const [number, setNumber] = useState("");
  const [consent, setConsent] = useState(emptyContactConsent);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting">("idle");

  const started = useRef(false);
  const onFirstInput = () => {
    if (started.current) return;
    started.current = true;
    ccTrack("cc_form_start", { cta: source });
  };

  const clear = (k: ErrorKey) => setErrors((p) => (p[k] ? { ...p, [k]: undefined } : p));

  const focusStep = () =>
    window.setTimeout(() => {
      stepHeadRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
      stepHeadRef.current?.focus({ preventScroll: true });
    }, 30);

  useEffect(() => {
    if (!autoFocus && !focusNonce) return;
    if (focusNonce && goal) {
      setForm((p) => ({ ...p, note: goal }));
      const g = goalFromText(goal);
      if (g) setGoals((prev) => (prev.includes(g) ? prev : [...prev, g]));
    }
    // Wait for the scroll / modal animation, then put focus on the step heading.
    const t = window.setTimeout(() => stepHeadRef.current?.focus({ preventScroll: true }), 450);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once per CTA click, not per keystroke
  }, [autoFocus, focusNonce]);

  const phone = number ? `${dialFor(country)} ${number}` : "";

  /* Smart rules: answers that rule other answers out.
   * - Not running ads yet  → marketing is locked to "Not doing marketing yet"; "Lower cost per lead" is off.
   * - Running ads          → "Not doing marketing yet" would contradict, so it is off.
   * - "Not doing marketing yet" picked first → "Do you run ads?" becomes "Not yet". */
  const noAds = runsAds === "not-yet";
  const runsSomeAds = runsAds === "regularly" || runsAds === "tried";
  const marketingLocked = noAds;
  const marketingDisabled: string[] = noAds
    ? MARKETING_TODAY.filter((o) => o.key !== "none").map((o) => o.key)
    : runsSomeAds
      ? ["none"]
      : [];
  const goalsDisabled: string[] = noAds ? ["cpl"] : [];

  function chooseRunsAds(v: RunsAdsKey) {
    setRunsAds(v);
    clear("runsAds");
    if (v === "not-yet") {
      setMarketing("none");
      clear("marketing");
      setGoals((prev) => prev.filter((g) => g !== "cpl"));
    } else if (marketing === "none") {
      setMarketing("");
    }
  }

  function chooseMarketing(v: MarketingKey) {
    setMarketing(v);
    clear("marketing");
    if (v === "none" && !runsAds) {
      setRunsAds("not-yet");
      clear("runsAds");
      setGoals((prev) => prev.filter((g) => g !== "cpl"));
    }
  }

  function goToStep2() {
    const next: Errors = {};
    if (!runsAds) next.runsAds = "Pick one.";
    if (!budget) next.budget = "Choose a daily budget, or 'Not sure yet'.";
    if (!goals.length) next.goals = "Pick at least one goal.";
    if (!marketing) next.marketing = "Pick one.";
    if (!sales) next.sales = "Pick one.";
    setErrors(next);
    if (Object.keys(next).length) {
      window.setTimeout(
        () => formRef.current?.querySelector(".cc-q.is-invalid")?.scrollIntoView({ block: "center", behavior: "smooth" }),
        20,
      );
      return;
    }
    setStep(2);
    ccTrack("cc_form_step", { step: 2, cta: source });
    focusStep();
  }

  function reset() {
    setStep(1);
    setRunsAds("");
    setBudget("");
    setGoals([]);
    setMarketing("");
    setSales("");
    setForm({ name: "", company: "", email: "", website: "", note: "" });
    setNoWebsite(false);
    setNumber("");
    setConsent(emptyContactConsent());
    setErrors({});
    started.current = false;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step === 1) return goToStep2();
    if (!runsAds || !budget || !marketing || !sales || !goals.length) return setStep(1);

    const next: Errors = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (number.replace(/\D/g, "").length < 7) next.phone = "Enter a valid WhatsApp number.";
    if (!form.company.trim()) next.company = "Please enter your business name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!EMAIL_RE.test(form.email.trim())) next.email = "Check this email address.";
    if (!noWebsite) {
      if (!form.website.trim()) next.website = "Enter your website, or tick “I don't have a website yet”.";
      else if (!WEBSITE_RE.test(form.website.trim())) next.website = "Check this website address, e.g. yourbusiness.com";
    }
    if (!bothConsentsGiven(consent)) next.consent = CONSENT_REQUIRED_MESSAGE;
    setErrors(next);
    if (Object.keys(next).length) return;

    const { score, tier } = scoreLead({ runsAds, budget, goals, marketing, sales });
    const budgetLabel = tiers.find((t) => t.key === budget)?.label ?? budget;
    const goalLabels = goals.map((g) => labelOf(GOALS, g));
    const snapshot = contactConsentSnapshot(consent);

    setStatus("submitting");
    const res = await submitStrategyCallLead({
      name: form.name,
      email: form.email.trim(),
      phone,
      company: form.company,
      sourcePage: CC_SOURCE_PAGE,
      requirement: form.note,
      consent_whatsapp: snapshot?.consent_whatsapp,
      consent_voice: snapshot?.consent_voice,
      consent_at: snapshot?.consent_at,
      leadScore: score,
      leadTier: tier,
      extra: {
        form_version: "v2",
        cta: source,
        prefilled_goal: goal ?? null,
        offer: "2500-credits-for-1-usd",
        country: viewCountry ?? country,
        runs_ads: runsAds,
        daily_budget_key: budget,
        daily_budget_label: budgetLabel,
        budget_currency_country: viewCountry ?? country,
        goals,
        marketing_today: marketing,
        sales_team: sales,
        website: noWebsite ? null : normaliseWebsite(form.website),
        has_website: !noWebsite,
        note: form.note.trim() || null,
        ...readAttribution(),
      },
      notifyFields: {
        tier: `${tier.toUpperCase()} (${score}/100)`,
        budget: budgetLabel,
        runs_ads: labelOf(RUNS_ADS, runsAds),
        goals: goalLabels.join(", "),
        marketing_today: labelOf(MARKETING_TODAY, marketing),
        sales_team: labelOf(SALES_TEAM, sales),
        website: noWebsite ? "No website yet" : normaliseWebsite(form.website),
      },
    });
    setStatus("idle");
    if (!res.ok) {
      setErrors({ form: res.error ?? "That did not go through. Please try again." });
      return;
    }

    trackMetaConversion({ eventName: "Lead", email: form.email.trim() || undefined, phone, sourcePage: CC_SOURCE_PAGE });
    ccTrack("cc_form_submit", { cta: source });
    markSubmitted();

    showConfirmation({
      firstName: form.name.trim().split(/\s+/)[0],
      phone,
      waText: `Hi Boostmysites, I just booked a free demo and want to claim the 2,500 credits for $1 offer.

Name: ${form.name}
Business: ${form.company.trim()}
Website: ${noWebsite ? "No website yet" : normaliseWebsite(form.website)}
Daily ad budget: ${budgetLabel}
Goals: ${goalLabels.join(", ")}`,
    });
    reset();
  }

  const busy = status === "submitting";

  return (
    <form ref={formRef} className="cc-form" onSubmit={onSubmit} onInput={onFirstInput} noValidate>
      <div className="cc-step-head" ref={stepHeadRef} tabIndex={-1}>
        <div className="cc-step-meta">
          <span>Step {step} of 2</span>
          <strong>{step === 1 ? "About your marketing" : "Where do we reach you?"}</strong>
        </div>
        <div className="cc-step-bar" aria-hidden="true">
          <i className="is-on" />
          <i className={step === 2 ? "is-on" : undefined} />
        </div>
      </div>

      {step === 1 ? (
        <>
          <ChoiceGroup
            num={1}
            name={id("runs")}
            legend="Do you currently run ads?"
            options={RUNS_ADS}
            value={runsAds}
            onChange={(v) => chooseRunsAds(v as RunsAdsKey)}
            error={errors.runsAds}
            columns={3}
          />

          <div className={`cc-q${errors.budget ? " is-invalid" : ""}`}>
            <label className="cc-q-legend" htmlFor={id("budget")}>
              <span className="cc-q-num" aria-hidden="true">
                2
              </span>
              What daily ad budget can you invest?
            </label>
            <span className="cc-select-field">
              <select
                id={id("budget")}
                value={budget}
                onChange={(e) => {
                  setBudget(e.target.value as BudgetKey);
                  clear("budget");
                }}
                aria-invalid={!!errors.budget}
              >
                <option value="" disabled>
                  Choose a daily budget
                </option>
                {tiers.map((t) => (
                  <option key={t.key} value={t.key}>
                    {t.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={18} aria-hidden="true" />
            </span>
            <p className="cc-q-hint">Paid to Meta or Google directly, from your own ad account.</p>
            {errors.budget ? <p className="cc-field-error">{errors.budget}</p> : null}
          </div>

          <ChoiceGroup
            num={3}
            name={id("goals")}
            legend="What do you want to achieve?"
            hint="Pick all that apply."
            options={GOALS}
            multiple
            value={goals}
            disabled={goalsDisabled}
            note={noAds ? "“Lower cost per lead” needs ads running, so it is off for now." : undefined}
            onChange={(v) => {
              setGoals((prev) => (prev.includes(v as GoalKey) ? prev.filter((g) => g !== v) : [...prev, v as GoalKey]));
              clear("goals");
            }}
            error={errors.goals}
            columns={2}
          />

          <ChoiceGroup
            num={4}
            name={id("marketing")}
            legend="How do you handle marketing today?"
            options={MARKETING_TODAY}
            value={marketing}
            disabled={marketingDisabled}
            note={
              marketingLocked
                ? "Set for you, since you're not running ads yet. Change question 1 to pick another."
                : undefined
            }
            onChange={(v) => chooseMarketing(v as MarketingKey)}
            error={errors.marketing}
            columns={3}
          />

          <ChoiceGroup
            num={5}
            name={id("sales")}
            legend="Do you have a sales team?"
            options={SALES_TEAM}
            value={sales}
            onChange={(v) => {
              setSales(v as SalesKey);
              clear("sales");
            }}
            error={errors.sales}
            columns={3}
          />

          <button type="submit" className="cc-btn is-primary is-lg cc-form-submit">
            <span>Continue</span>
            <ArrowRight size={18} />
          </button>
        </>
      ) : (
        <>
          <div className="cc-form-row">
            <Field id={id("name")} label="Your name" error={errors.name}>
              <input
                id={id("name")}
                value={form.name}
                onChange={(e) => {
                  setForm((p) => ({ ...p, name: e.target.value }));
                  clear("name");
                }}
                autoComplete="name"
                placeholder="Priya Sharma"
                aria-invalid={!!errors.name}
                maxLength={80}
              />
            </Field>
            <Field id={id("phone")} label="WhatsApp number" error={errors.phone}>
              <div className={`cc-phone-field${errors.phone ? " is-invalid" : ""}`}>
                <span className="cc-select">
                  <select aria-label="Country code" value={country} onChange={(e) => setCountry(e.target.value)}>
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
                    clear("phone");
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
            <Field id={id("company")} label="Business name" error={errors.company}>
              <input
                id={id("company")}
                value={form.company}
                onChange={(e) => {
                  setForm((p) => ({ ...p, company: e.target.value }));
                  clear("company");
                }}
                autoComplete="organization"
                placeholder="Sharma Dental Clinic"
                aria-invalid={!!errors.company}
                maxLength={120}
              />
            </Field>
            <Field id={id("email")} label="Work email" error={errors.email}>
              <input
                id={id("email")}
                type="email"
                value={form.email}
                onChange={(e) => {
                  setForm((p) => ({ ...p, email: e.target.value }));
                  clear("email");
                }}
                autoComplete="email"
                placeholder="you@business.com"
                aria-invalid={!!errors.email}
                maxLength={120}
              />
            </Field>
          </div>
          <Field id={id("website")} label="Website" error={errors.website}>
            <input
              id={id("website")}
              type="url"
              inputMode="url"
              value={noWebsite ? "" : form.website}
              onChange={(e) => {
                setForm((p) => ({ ...p, website: e.target.value }));
                clear("website");
              }}
              autoComplete="url"
              placeholder={noWebsite ? "No website yet" : "yourbusiness.com"}
              aria-invalid={!!errors.website}
              disabled={noWebsite}
              maxLength={200}
            />
            <label className="cc-inline-check">
              <input
                type="checkbox"
                checked={noWebsite}
                onChange={(e) => {
                  setNoWebsite(e.target.checked);
                  clear("website");
                }}
              />
              <span className="cc-check" aria-hidden="true">
                <Check size={13} strokeWidth={3.2} />
              </span>
              <span>I don&apos;t have a website yet</span>
            </label>
          </Field>
          <Field id={id("note")} label="Anything else we should know?" optional>
            <textarea
              id={id("note")}
              value={form.note}
              onChange={(e) => setForm((p) => ({ ...p, note: e.target.value }))}
              rows={2}
              placeholder="e.g. we open a second branch next month"
              maxLength={500}
            />
          </Field>

          <fieldset className="cc-consent">
            <legend className="cc-sr">Contact consent</legend>
            <label>
              <input
                type="checkbox"
                checked={consent.whatsapp}
                onChange={(e) => {
                  setConsent((c) => ({ ...c, whatsapp: e.target.checked }));
                  clear("consent");
                }}
              />
              <span className="cc-check" aria-hidden="true">
                <Check size={13} strokeWidth={3.2} />
              </span>
              <span>
                I agree to be contacted on WhatsApp (including automated messages) about this enquiry and the Service.
                I can opt out by replying STOP. <Link to="/privacy-policy">Privacy</Link>.
              </span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={consent.voice}
                onChange={(e) => {
                  setConsent((c) => ({ ...c, voice: e.target.checked }));
                  clear("consent");
                }}
              />
              <span className="cc-check" aria-hidden="true">
                <Check size={13} strokeWidth={3.2} />
              </span>
              <span>
                I agree to voice calls, including AI-assisted calls, on this number about this enquiry and the Service.
                I can opt out by emailing <a href={`mailto:${PRIVACY_REQUEST_EMAIL}`}>{PRIVACY_REQUEST_EMAIL}</a> or
                asking on the call. <Link to="/privacy-policy">Privacy</Link>.
              </span>
            </label>
            {errors.consent ? <p className="cc-field-error">{errors.consent}</p> : null}
          </fieldset>

          {errors.form ? (
            <p className="cc-field-error is-form" role="alert">
              {errors.form}
            </p>
          ) : null}

          <div className="cc-step-actions">
            <button
              type="button"
              className="cc-btn is-ghost is-lg"
              onClick={() => {
                setStep(1);
                focusStep();
              }}
              disabled={busy}
            >
              <ArrowLeft size={18} />
              <span>Back</span>
            </button>
            <button type="submit" className="cc-btn is-primary is-lg cc-form-submit" disabled={busy}>
              {busy ? <Loader2 size={18} className="cc-spin" /> : null}
              <span>{busy ? "Sending…" : "Book my free demo"}</span>
              {busy ? null : <ArrowRight size={18} />}
            </button>
          </div>
        </>
      )}

      <ul className="cc-form-trust">
        <li>
          <Clock size={14} aria-hidden="true" /> We reply within a working day
        </li>
        <li>
          <Lock size={14} aria-hidden="true" /> Nothing spends until you approve
        </li>
      </ul>
    </form>
  );
}

/**
 * Radio (single) or checkbox (multiple) choices in an aligned grid; native inputs underneath.
 * `disabled` options are greyed out and can't be picked (smart rules), `note` explains why.
 */
function ChoiceGroup({
  num,
  name,
  legend,
  hint,
  options,
  value,
  onChange,
  multiple,
  disabled = [],
  note,
  error,
  columns = 3,
}: {
  num: number;
  name: string;
  legend: string;
  hint?: string;
  options: readonly { key: string; label: string }[];
  value: string | string[];
  onChange: (key: string) => void;
  multiple?: boolean;
  disabled?: string[];
  note?: string;
  error?: string;
  columns?: 2 | 3;
}) {
  const isOn = (k: string) => (Array.isArray(value) ? value.includes(k) : value === k);
  return (
    <fieldset className={`cc-q${error ? " is-invalid" : ""}`}>
      <legend className="cc-q-legend">
        <span className="cc-q-num" aria-hidden="true">
          {num}
        </span>
        {legend}
      </legend>
      {hint ? <p className="cc-q-hint is-top">{hint}</p> : null}
      <div className={`cc-choices cols-${columns}`}>
        {options.map((o) => {
          const off = disabled.includes(o.key);
          return (
            <label
              key={o.key}
              className={`cc-choice${isOn(o.key) ? " is-on" : ""}${off ? " is-disabled" : ""}`}
              aria-disabled={off || undefined}
            >
              <input
                type={multiple ? "checkbox" : "radio"}
                name={name}
                value={o.key}
                checked={isOn(o.key)}
                disabled={off}
                onChange={() => onChange(o.key)}
              />
              <span className={`cc-choice-mark${multiple ? " is-box" : ""}`} aria-hidden="true">
                <Check size={12} strokeWidth={3.4} />
              </span>
              <span>{o.label}</span>
            </label>
          );
        })}
      </div>
      {note ? (
        <p className="cc-q-note" role="status">
          <Lock size={13} aria-hidden="true" /> {note}
        </p>
      ) : null}
      {error ? <p className="cc-field-error">{error}</p> : null}
    </fieldset>
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
