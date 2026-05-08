import { useState, type ChangeEvent, type FormEvent } from "react";
import { submitLead, type LeadInput } from "../lib/submitLead";
import { CheckIcon } from "./icons";

type FieldErrors = Partial<Record<keyof LeadInput, string>>;

function validateStep1(input: LeadInput): FieldErrors {
  const errors: FieldErrors = {};
  if (!input.name.trim()) errors.name = "Please tell us your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email))
    errors.email = "Enter a valid email.";
  if (input.phone.replace(/\D/g, "").length < 7)
    errors.phone = "Enter a valid phone number.";
  if (!input.company.trim()) errors.company = "Company is required.";
  if (!input.website.trim()) errors.website = "Website is required.";
  return errors;
}

function validateStep2(input: LeadInput): FieldErrors {
  const errors: FieldErrors = {};
  if (!input.projectType.trim()) errors.projectType = "Select a project type.";
  if (!input.budgetRange.trim()) errors.budgetRange = "Select a budget range.";
  if (!input.timeline.trim()) errors.timeline = "Select a timeline.";
  if (!input.decisionRole.trim()) errors.decisionRole = "Select your role.";
  return errors;
}

function validateStep3(input: LeadInput): FieldErrors {
  const errors: FieldErrors = {};
  if (!input.problemStatement.trim() || input.problemStatement.trim().length < 20) {
    errors.problemStatement = "Share at least 20 characters.";
  }
  if (!input.expectedOutcome.trim() || input.expectedOutcome.trim().length < 10) {
    errors.expectedOutcome = "Share expected outcome (10+ characters).";
  }
  if (!input.gotOtherQuote.trim()) {
    errors.gotOtherQuote = "Please choose an option.";
  }
  return errors;
}

const initial: LeadInput = {
  name: "",
  email: "",
  phone: "",
  company: "",
  website: "",
  projectType: "",
  budgetRange: "",
  timeline: "",
  decisionRole: "",
  problemStatement: "",
  expectedOutcome: "",
  gotOtherQuote: "",
};

type LeadFormProps = {
  initialProjectTypeValue?: string;
  initialProjectTypeLabel?: string;
};

export function LeadForm({
  initialProjectTypeValue = "",
  initialProjectTypeLabel = "",
}: LeadFormProps = {}) {
  const [values, setValues] = useState<LeadInput>({
    ...initial,
    projectType: initialProjectTypeValue,
  });
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [serverError, setServerError] = useState<string | null>(null);

  const onChange =
    (key: keyof LeadInput) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
    };

  function validateCurrentStep(): boolean {
    const next =
      step === 1
        ? validateStep1(values)
        : step === 2
          ? validateStep2(values)
          : validateStep3(values);
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
    const res = await submitLead(values);
    if (res.ok) {
      setStatus("success");
      setValues(initial);
      setStep(1);
    } else {
      setStatus("error");
      setServerError(res.error ?? "Something went wrong. Try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center text-center gap-3 p-8 rounded-[14px] border border-purple/40 bg-purple/10 max-w-[460px] mx-auto">
        <div className="size-10 rounded-full bg-purple/30 flex items-center justify-center">
          <CheckIcon className="text-white size-5" />
        </div>
        <h3 className="text-xl font-medium text-white">Message sent.</h3>
        <p className="text-sm text-white/70">
          We'll reply within 24 hours. Prefer faster? Ping us on WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="w-full max-w-[520px] flex flex-col gap-3"
    >
      <div className="mb-1 flex items-center justify-between text-[12px] text-white/65">
        <span>
          Step {step} of 3
        </span>
        <span>{Math.round((step / 3) * 100)}% complete</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-purple transition-all duration-300"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

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
            label="Phone / WhatsApp *"
            value={values.phone}
            onChange={onChange("phone")}
            error={errors.phone}
            placeholder="+91 90000 00000"
            autoComplete="tel"
          />
          <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
            <Field
              id="company"
              label="Company name *"
              value={values.company}
              onChange={onChange("company")}
              error={errors.company}
              placeholder="Acme Pvt Ltd"
            />
            <Field
              id="website"
              label="Website *"
              value={values.website}
              onChange={onChange("website")}
              error={errors.website}
              placeholder="https://example.com"
            />
          </div>
        </>
      ) : null}

      {step === 2 ? (
        <>
          <SelectField
            id="projectType"
            label="What do you want to build? *"
            value={values.projectType}
            onChange={onChange("projectType")}
            error={errors.projectType}
            options={[
              ...(initialProjectTypeValue && initialProjectTypeLabel
                ? [
                    {
                      value: initialProjectTypeValue,
                      label: initialProjectTypeLabel,
                    },
                  ]
                : []),
              { value: "web-app", label: "Web app" },
              { value: "mobile-app", label: "Mobile app" },
              { value: "ai-product", label: "AI product" },
              { value: "website", label: "Website" },
              { value: "other", label: "Other" },
            ]}
          />
          <SelectField
            id="budgetRange"
            label="Budget range *"
            value={values.budgetRange}
            onChange={onChange("budgetRange")}
            error={errors.budgetRange}
            options={[
              { value: "below-2l", label: "Below 2L" },
              { value: "2l-5l", label: "2L - 5L" },
              { value: "5l-10l", label: "5L - 10L" },
              { value: "10l-plus", label: "10L+" },
            ]}
          />
          <SelectField
            id="timeline"
            label="Timeline *"
            value={values.timeline}
            onChange={onChange("timeline")}
            error={errors.timeline}
            options={[
              { value: "under-1-month", label: "Under 1 month" },
              { value: "1-3-months", label: "1 - 3 months" },
              { value: "3-6-months", label: "3 - 6 months" },
              { value: "6-plus-months", label: "6+ months" },
            ]}
          />
          <SelectField
            id="decisionRole"
            label="Decision making role *"
            value={values.decisionRole}
            onChange={onChange("decisionRole")}
            error={errors.decisionRole}
            options={[
              { value: "decision-maker", label: "Decision maker" },
              { value: "co-decision-maker", label: "Co-decision maker" },
              { value: "exploring", label: "Just exploring" },
            ]}
          />
        </>
      ) : null}

      {step === 3 ? (
        <>
          <Field
            id="problemStatement"
            label="What exact problem are you solving? *"
            value={values.problemStatement}
            onChange={onChange("problemStatement")}
            error={errors.problemStatement}
            placeholder="Explain the core problem and who faces it..."
            as="textarea"
          />
          <Field
            id="expectedOutcome"
            label="What outcome do you expect from this project? *"
            value={values.expectedOutcome}
            onChange={onChange("expectedOutcome")}
            error={errors.expectedOutcome}
            placeholder="Revenue impact, automation target, launch milestone..."
            as="textarea"
          />
          <SelectField
            id="gotOtherQuote"
            label="Have you contacted any other company and received a quote? *"
            value={values.gotOtherQuote}
            onChange={onChange("gotOtherQuote")}
            error={errors.gotOtherQuote}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
        </>
      ) : null}

      {serverError ? (
        <p className="text-[13px] text-red-300/90">{serverError}</p>
      ) : null}

      <div className="mt-1 flex items-center gap-2">
        {step > 1 ? (
          <button
            type="button"
            onClick={onPreviousStep}
            className="inline-flex items-center justify-center px-4 py-[13px] rounded-[10px] border border-white/20 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5"
          >
            Back
          </button>
        ) : null}
        {step < 3 ? (
          <button
            type="button"
            onClick={onNextStep}
            className="btn-gloss relative overflow-hidden inline-flex flex-1 items-center justify-center gap-2 px-5 py-[15px] rounded-[10px] bg-purple/70 border border-white/20 text-sm font-medium text-white shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)]"
          >
            <span className="relative z-[2]">Continue</span>
          </button>
        ) : (
          <button
            type="submit"
            disabled={status === "submitting"}
            className="btn-gloss relative overflow-hidden inline-flex flex-1 items-center justify-center gap-2 px-5 py-[15px] rounded-[10px] bg-purple/70 border border-white/20 text-sm font-medium text-white shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)] transition-opacity disabled:opacity-60"
          >
            <span className="relative z-[2]">
              {status === "submitting" ? "Submitting..." : "Get project assessment"}
            </span>
          </button>
        )}
      </div>

      <p className="text-[12px] text-white/45 text-center">
        Free consultation · No hidden costs · 24hr response
      </p>
    </form>
  );
}

type FieldProps = {
  id: keyof LeadInput;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  as?: "input" | "textarea";
};

function Field({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  autoComplete,
  as = "input",
}: FieldProps) {
  const baseClass =
    "w-full p-3.5 bg-black/40 border rounded-lg text-sm text-white placeholder:text-white/40 backdrop-blur-[5px] transition-colors focus:border-white/40";
  const borderClass = error ? "border-red-400/60" : "border-white/15";

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[12px] font-medium text-white/70">
        {label}
      </label>
      {as === "textarea" ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={4}
          className={`${baseClass} ${borderClass} resize-y min-h-[96px]`}
        />
      ) : (
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
      )}
      {error ? (
        <span className="text-[12px] text-red-300/90">{error}</span>
      ) : null}
    </div>
  );
}

type SelectFieldProps = {
  id: keyof LeadInput;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  options: Array<{ value: string; label: string }>;
};

function SelectField({
  id,
  label,
  value,
  onChange,
  error,
  options,
}: SelectFieldProps) {
  const baseClass =
    "w-full p-3.5 bg-black/40 border rounded-lg text-sm text-white backdrop-blur-[5px] transition-colors focus:border-white/40";
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
        className={`${baseClass} ${borderClass}`}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? (
        <span className="text-[12px] text-red-300/90">{error}</span>
      ) : null}
    </div>
  );
}
