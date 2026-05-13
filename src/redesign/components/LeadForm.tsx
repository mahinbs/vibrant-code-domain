import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { submitLead, type HighIntentLeadSubmitInput } from "../lib/submitLead";
import type { HighIntentLeadPayload } from "../lib/highIntentLead";
import { CheckIcon } from "./icons";

export type LeadVertical = "none" | "fintech" | "healthcare";

export type LeadFormProps = {
  sourcePage: string;
  vertical?: LeadVertical;
  /** Pre-select “What are you building?” (e.g. Services modal). */
  initialWhatBuildingValue?: string;
  /** When true, “What are you building?” is fixed (modal). */
  lockWhatBuilding?: boolean;
  /** Stored in payload JSON for attribution. */
  serviceModal?: { id: string; title: string };
};

const STEP_THEMES = [
  "Business context",
  "Technical & compliance needs",
  "Investment & consultation",
] as const;

const INDUSTRY_OPTIONS = [
  { value: "fintech", label: "Fintech" },
  { value: "healthcare", label: "Healthcare" },
  { value: "saas", label: "SaaS" },
  { value: "ai-product", label: "AI Product" },
  { value: "marketplace", label: "Marketplace" },
  { value: "other", label: "Other" },
] as const;

const WHAT_BUILDING_ALL = [
  { value: "trading-platform", label: "Trading Platform" },
  { value: "payment-system", label: "Payment System" },
  { value: "lending-platform", label: "Lending Platform" },
  { value: "crm-erp", label: "CRM/ERP" },
  { value: "telemedicine", label: "Telemedicine Platform" },
  { value: "healthcare-mgmt", label: "Healthcare Management System" },
  { value: "ai-automation", label: "AI Automation" },
  { value: "custom-software", label: "Custom Software" },
] as const;

const WHAT_BUILDING_FINTECH = WHAT_BUILDING_ALL.filter((o) =>
  ["trading-platform", "payment-system", "lending-platform", "crm-erp", "ai-automation", "custom-software"].includes(
    o.value,
  ),
);

const WHAT_BUILDING_HEALTHCARE = WHAT_BUILDING_ALL.filter((o) =>
  ["telemedicine", "healthcare-mgmt", "crm-erp", "ai-automation", "custom-software"].includes(o.value),
);

const PROJECT_STAGE_OPTIONS = [
  { value: "idea-stage", label: "Idea Stage" },
  { value: "mvp-in-progress", label: "MVP in Progress" },
  { value: "existing-product", label: "Existing Product" },
  { value: "scaling-infrastructure", label: "Scaling Infrastructure" },
  { value: "rebuilding", label: "Rebuilding Current System" },
] as const;

const USER_SCALE_OPTIONS = [
  { value: "under-1k", label: "Under 1,000 users" },
  { value: "1k-10k", label: "1K–10K users" },
  { value: "10k-100k", label: "10K–100K users" },
  { value: "100k-plus", label: "100K+ users" },
] as const;

const COMPLIANCE_OPTIONS = [
  { value: "audit-readiness", label: "Audit Readiness" },
  { value: "vapt", label: "VAPT/Security Testing" },
  { value: "rbac", label: "Role-Based Access" },
  { value: "txn-security", label: "Transaction Security" },
  { value: "encryption", label: "Data Encryption" },
  { value: "hipaa-gdpr", label: "HIPAA/GDPR Readiness" },
  { value: "need-guidance", label: "Need Guidance" },
] as const;

const TIMELINE_OPTIONS = [
  { value: "asap", label: "ASAP" },
  { value: "within-30", label: "Within 30 Days" },
  { value: "1-3mo", label: "1–3 Months" },
  { value: "3-6mo", label: "3–6 Months" },
  { value: "exploring", label: "Exploring Options" },
] as const;

const BUDGET_OPTIONS = [
  { value: "under-5l", label: "Under ₹5L" },
  { value: "5l-15l", label: "₹5L–15L" },
  { value: "15l-50l", label: "₹15L–50L" },
  { value: "50l-1cr", label: "₹50L–1 Cr" },
  { value: "1cr-plus", label: "₹1 Cr+" },
] as const;

const DECISION_ROLE_OPTIONS = [
  { value: "founder", label: "Founder / Co-Founder" },
  { value: "cto", label: "CTO / Technical Lead" },
  { value: "pm", label: "Product Manager" },
  { value: "operations", label: "Operations" },
  { value: "agency", label: "Agency / Outsourcing" },
  { value: "researching", label: "Researching Options" },
] as const;

const TECH_CHALLENGE_OPTIONS = [
  { value: "", label: "Prefer not to say" },
  { value: "compliance", label: "Compliance & Security" },
  { value: "scalability", label: "Scalability" },
  { value: "infra-cost", label: "Infrastructure Cost" },
  { value: "speed-market", label: "Speed to Market" },
  { value: "architecture", label: "Architecture Planning" },
  { value: "vendor", label: "Vendor Reliability" },
  { value: "ai-integration", label: "AI Integration" },
  { value: "unsure", label: "Unsure" },
] as const;

type FormState = {
  name: string;
  email: string;
  phone: string;
} & HighIntentLeadPayload;

type FieldErrors = Partial<Record<keyof FormState | "complianceNeeds", string>>;

function emptyForm(vertical: LeadVertical, initialWhatBuilding: string): FormState {
  const industry =
    vertical === "fintech" ? "fintech" : vertical === "healthcare" ? "healthcare" : "";
  return {
    name: "",
    email: "",
    phone: "",
    industry,
    whatBuilding: initialWhatBuilding,
    projectStage: "",
    userScale: "",
    complianceNeeds: [],
    timeline: "",
    budgetInr: "",
    decisionRole: "",
    technicalChallenge: "",
    company: "",
    website: "",
  };
}

function validateStep1(v: FormState): FieldErrors {
  const e: FieldErrors = {};
  if (!v.name.trim()) e.name = "Please tell us your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Enter a valid email.";
  if (v.phone.replace(/\D/g, "").length < 7) e.phone = "Enter a valid WhatsApp / phone number.";
  if (!v.industry.trim()) e.industry = "Select an industry.";
  if (!v.whatBuilding.trim()) e.whatBuilding = "Select what you are building.";
  if (!v.projectStage.trim()) e.projectStage = "Select project stage.";
  return e;
}

function validateStep2(v: FormState): FieldErrors {
  const e: FieldErrors = {};
  if (!v.userScale.trim()) e.userScale = "Select expected user scale.";
  if (!v.timeline.trim()) e.timeline = "Select a timeline.";
  return e;
}

function validateStep3(v: FormState): FieldErrors {
  const e: FieldErrors = {};
  if (!v.budgetInr.trim()) e.budgetInr = "Select estimated budget.";
  if (!v.decisionRole.trim()) e.decisionRole = "Select your role.";
  return e;
}

export function LeadForm({
  sourcePage,
  vertical = "none",
  initialWhatBuildingValue = "",
  lockWhatBuilding = false,
  serviceModal,
}: LeadFormProps) {
  const [values, setValues] = useState<FormState>(() =>
    emptyForm(vertical, initialWhatBuildingValue),
  );
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const whatBuildingOptions = useMemo(() => {
    if (vertical === "fintech") return [...WHAT_BUILDING_FINTECH];
    if (vertical === "healthcare") return [...WHAT_BUILDING_HEALTHCARE];
    return [...WHAT_BUILDING_ALL];
  }, [vertical]);

  const industryLocked = vertical === "fintech" || vertical === "healthcare";

  const onChange =
    (key: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const val = e.target.value;
      setValues((prev) => ({ ...prev, [key]: val }));
      if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
    };

  const onSelectChange = (key: keyof FormState) => (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(key)(e);
  };

  function toggleCompliance(id: string) {
    setValues((prev) => {
      const has = prev.complianceNeeds.includes(id);
      const complianceNeeds = has
        ? prev.complianceNeeds.filter((x) => x !== id)
        : [...prev.complianceNeeds, id];
      return { ...prev, complianceNeeds };
    });
    if (errors.complianceNeeds) setErrors((er) => ({ ...er, complianceNeeds: undefined }));
  }

  function validateCurrentStep(): boolean {
    const next =
      step === 1 ? validateStep1(values) : step === 2 ? validateStep2(values) : validateStep3(values);
    if (Object.keys(next).length) {
      setErrors(next);
      return false;
    }
    return true;
  }

  function onNextStep() {
    setServerError(null);
    if (!validateCurrentStep()) return;
    if (step < 3) setStep((s) => (s + 1) as 1 | 2 | 3);
  }

  function onPreviousStep() {
    if (step > 1) {
      setStep((s) => (s - 1) as 1 | 2 | 3);
      setServerError(null);
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validateCurrentStep()) return;
    setStatus("submitting");
    setServerError(null);
    const input: HighIntentLeadSubmitInput = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      sourcePage,
      industry: values.industry,
      whatBuilding: values.whatBuilding,
      projectStage: values.projectStage,
      userScale: values.userScale,
      complianceNeeds: values.complianceNeeds,
      timeline: values.timeline,
      budgetInr: values.budgetInr,
      decisionRole: values.decisionRole,
      technicalChallenge: values.technicalChallenge,
      company: values.company,
      website: values.website,
      serviceModal,
    };
    const res = await submitLead(input);
    if (res.ok) {
      setStatus("success");
      setValues(emptyForm(vertical, initialWhatBuildingValue));
      setStep(1);
    } else {
      setStatus("error");
      setServerError(res.error ?? "Something went wrong. Try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex max-w-[460px] flex-col items-center gap-3 rounded-[14px] border border-purple/40 bg-purple/10 p-8 text-center mx-auto">
        <div className="flex size-10 items-center justify-center rounded-full bg-purple/30">
          <CheckIcon className="size-5 text-white" />
        </div>
        <h3 className="text-xl font-medium text-white">Request received.</h3>
        <p className="text-sm text-white/70">
          We&apos;ll reply within 24 hours. Prefer faster? Ping us on WhatsApp.
        </p>
      </div>
    );
  }

  const stepHeadline =
    step === 1
      ? "Tell us about your product"
      : step === 2
        ? "Project requirements"
        : "Project investment";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex w-full max-w-[520px] flex-col gap-3"
    >
      <div className="mb-1 flex items-center justify-between text-[12px] text-white/65">
        <span>
          Step {step} of 3 · {STEP_THEMES[step - 1]}
        </span>
        <span>{Math.round((step / 3) * 100)}% complete</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-purple transition-all duration-300"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

      <h3 className="text-center text-[15px] font-medium text-white/90">{stepHeadline}</h3>

      {step === 1 ? (
        <>
          <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
            <Field
              id="name"
              label="Full name *"
              value={values.name}
              onChange={onChange("name")}
              error={errors.name}
              placeholder="Jane Doe"
              autoComplete="name"
            />
            <Field
              id="email"
              type="email"
              label="Work email *"
              value={values.email}
              onChange={onChange("email")}
              error={errors.email}
              placeholder="jane@company.com"
              autoComplete="email"
            />
          </div>
          <Field
            id="phone"
            type="tel"
            label="WhatsApp number *"
            value={values.phone}
            onChange={onChange("phone")}
            error={errors.phone}
            placeholder="+91 90000 00000"
            autoComplete="tel"
          />
          <SelectFieldStr
            id="industry"
            label="Industry *"
            value={values.industry}
            onChange={onSelectChange("industry")}
            error={errors.industry}
            options={[...INDUSTRY_OPTIONS]}
            disabled={industryLocked}
          />
          <SelectFieldStr
            id="whatBuilding"
            label="What are you building? *"
            value={values.whatBuilding}
            onChange={onSelectChange("whatBuilding")}
            error={errors.whatBuilding}
            options={[...whatBuildingOptions]}
            disabled={lockWhatBuilding}
          />
          <SelectFieldStr
            id="projectStage"
            label="Project stage *"
            value={values.projectStage}
            onChange={onSelectChange("projectStage")}
            error={errors.projectStage}
            options={[...PROJECT_STAGE_OPTIONS]}
          />
        </>
      ) : null}

      {step === 2 ? (
        <>
          <SelectFieldStr
            id="userScale"
            label="Expected user scale *"
            value={values.userScale}
            onChange={onSelectChange("userScale")}
            error={errors.userScale}
            options={[...USER_SCALE_OPTIONS]}
          />
          <div className="flex flex-col gap-2">
            <span className="text-[12px] font-medium text-white/70">
              Compliance / security needs (select all that apply)
            </span>
            <div className="rounded-lg border border-white/15 bg-black/40 p-3 backdrop-blur-[5px]">
              <div className="flex flex-col gap-2.5">
                {COMPLIANCE_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className="flex cursor-pointer items-center gap-2 text-[13px] text-white/85"
                  >
                    <input
                      type="checkbox"
                      checked={values.complianceNeeds.includes(opt.value)}
                      onChange={() => toggleCompliance(opt.value)}
                      className="size-4 rounded border-white/30 bg-black/50 text-purple focus:ring-purple"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <SelectFieldStr
            id="timeline"
            label="Timeline *"
            value={values.timeline}
            onChange={onSelectChange("timeline")}
            error={errors.timeline}
            options={[...TIMELINE_OPTIONS]}
          />
        </>
      ) : null}

      {step === 3 ? (
        <>
          <p className="text-[13px] leading-relaxed text-white/65">
            Most regulated fintech and healthcare platforms require security-first architecture,
            compliance workflows, and scalable infrastructure planning.
          </p>
          <SelectFieldStr
            id="budgetInr"
            label="Estimated budget (INR) *"
            value={values.budgetInr}
            onChange={onSelectChange("budgetInr")}
            error={errors.budgetInr}
            options={[...BUDGET_OPTIONS]}
          />
          <SelectFieldStr
            id="decisionRole"
            label="Decision-making role *"
            value={values.decisionRole}
            onChange={onSelectChange("decisionRole")}
            error={errors.decisionRole}
            options={[...DECISION_ROLE_OPTIONS]}
          />
          <SelectFieldStr
            id="technicalChallenge"
            label="What is your biggest technical challenge right now? (optional)"
            value={values.technicalChallenge}
            onChange={onSelectChange("technicalChallenge")}
            options={[...TECH_CHALLENGE_OPTIONS]}
          />
        </>
      ) : null}

      {serverError ? <p className="text-[13px] text-red-300/90">{serverError}</p> : null}

      <div className="mt-1 flex items-center gap-2">
        {step > 1 ? (
          <button
            type="button"
            onClick={onPreviousStep}
            className="inline-flex items-center justify-center rounded-[10px] border border-white/20 px-4 py-[13px] text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white"
          >
            Back
          </button>
        ) : null}
        {step < 3 ? (
          <button
            type="button"
            onClick={onNextStep}
            className="btn-gloss relative inline-flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-[10px] border border-white/20 bg-purple/70 px-5 py-[15px] text-sm font-medium text-white shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)]"
          >
            <span className="relative z-[2]">Continue</span>
          </button>
        ) : (
          <button
            type="submit"
            disabled={status === "submitting"}
            className="btn-gloss relative inline-flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-[10px] border border-white/20 bg-purple/70 px-5 py-[15px] text-sm font-medium text-white shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)] transition-opacity disabled:opacity-60"
          >
            <span className="relative z-[2]">
              {status === "submitting" ? "Submitting..." : "Request technical consultation"}
            </span>
          </button>
        )}
      </div>

      <p className="text-center text-[12px] text-white/45">
        Free consultation · No hidden costs · 24hr response
      </p>
    </form>
  );
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
};

function Field({ id, label, value, onChange, error, placeholder, type = "text", autoComplete }: FieldProps) {
  const baseClass =
    "w-full p-3.5 bg-black/40 border rounded-lg text-sm text-white placeholder:text-white/40 backdrop-blur-[5px] transition-colors focus:border-white/40";
  const borderClass = error ? "border-red-400/60" : "border-white/15";

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[12px] font-medium text-white/70">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${baseClass} ${borderClass}`}
      />
      {error ? <span className="text-[12px] text-red-300/90">{error}</span> : null}
    </div>
  );
}

type SelectFieldStrProps = {
  id: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  options: ReadonlyArray<{ value: string; label: string }>;
  disabled?: boolean;
};

function SelectFieldStr({ id, label, value, onChange, error, options, disabled }: SelectFieldStrProps) {
  const baseClass =
    "w-full p-3.5 bg-black/40 border rounded-lg text-sm text-white backdrop-blur-[5px] transition-colors focus:border-white/40 disabled:cursor-not-allowed disabled:opacity-60";
  const borderClass = error ? "border-red-400/60" : "border-white/15";

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[12px] font-medium text-white/70">
        {label}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`${baseClass} ${borderClass}`}
      >
        {(disabled && value) ? null : (
          <option value="">Select an option</option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <span className="text-[12px] text-red-300/90">{error}</span> : null}
    </div>
  );
}
