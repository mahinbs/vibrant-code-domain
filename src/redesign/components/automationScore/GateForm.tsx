import { useState, type FormEvent } from "react";
import { COUNTRIES } from "../LeadForm";

export type GateContact = {
  name: string;
  company: string;
  email: string;
  website: string;
  /** Full phone with dial code, e.g. "+91 9632953355". */
  phone: string;
};

type GateFormProps = {
  onUnlock: (contact: GateContact) => void;
};

const DEFAULT_COUNTRY = "IN";
const dialFor = (code: string) =>
  COUNTRIES.find((c) => c.code === code)?.dial ?? "+91";

type Errors = Partial<Record<keyof GateContact, string>>;

function validate(c: GateContact): Errors {
  const e: Errors = {};
  if (!c.name.trim()) e.name = "Please tell us your name.";
  if (!c.company.trim()) e.company = "Please tell us your company name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email)) e.email = "Enter a valid email.";
  if (!c.website.trim()) e.website = "Enter your website (or type “none yet”).";
  if (c.phone.replace(/\D/g, "").length < 7) e.phone = "Enter a valid WhatsApp number.";
  return e;
}

/**
 * The gate before the report reveal. Framed as unlocking the result, not
 * submitting an inquiry — the parent handles submission in the background and
 * shows the report immediately.
 */
export function GateForm({ onUnlock }: GateFormProps) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY);
  const [nationalNumber, setNationalNumber] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const clearError = (key: keyof GateContact) => {
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const digits = nationalNumber.replace(/\D/g, "");
    const contact: GateContact = {
      name,
      company,
      email,
      website,
      phone: digits ? `${dialFor(countryCode)} ${digits}` : "",
    };
    const next = validate(contact);
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    onUnlock(contact);
  }

  const inputClass = (hasError: boolean) =>
    [
      "w-full rounded-lg border bg-black/40 p-3 text-sm text-white placeholder:text-white/40 transition-colors focus:border-white/40 focus:outline-none",
      hasError ? "border-red-400/60" : "border-white/15",
    ].join(" ");

  return (
    <form onSubmit={onSubmit} noValidate className="flex w-full flex-col gap-3">
      <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="gate-name" className="text-[12px] font-medium text-white/70">
            Your name *
          </label>
          <input
            id="gate-name"
            autoComplete="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              clearError("name");
            }}
            placeholder="Jane Doe"
            className={inputClass(!!errors.name)}
          />
          {errors.name ? (
            <span className="text-[12px] text-red-300/90">{errors.name}</span>
          ) : null}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="gate-company" className="text-[12px] font-medium text-white/70">
            Company name *
          </label>
          <input
            id="gate-company"
            autoComplete="organization"
            value={company}
            onChange={(e) => {
              setCompany(e.target.value);
              clearError("company");
            }}
            placeholder="Acme Pvt Ltd"
            className={inputClass(!!errors.company)}
          />
          {errors.company ? (
            <span className="text-[12px] text-red-300/90">{errors.company}</span>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="gate-email" className="text-[12px] font-medium text-white/70">
            Work email *
          </label>
          <input
            id="gate-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearError("email");
            }}
            placeholder="jane@company.com"
            className={inputClass(!!errors.email)}
          />
          {errors.email ? (
            <span className="text-[12px] text-red-300/90">{errors.email}</span>
          ) : null}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="gate-website" className="text-[12px] font-medium text-white/70">
            Website *
          </label>
          <input
            id="gate-website"
            inputMode="url"
            autoComplete="url"
            value={website}
            onChange={(e) => {
              setWebsite(e.target.value);
              clearError("website");
            }}
            placeholder="yourcompany.com (or “none yet”)"
            className={inputClass(!!errors.website)}
          />
          {errors.website ? (
            <span className="text-[12px] text-red-300/90">{errors.website}</span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="gate-phone" className="text-[12px] font-medium text-white/70">
          WhatsApp number *
        </label>
        <div
          className={[
            "flex items-stretch overflow-hidden rounded-lg border bg-black/40 transition-colors focus-within:border-white/40",
            errors.phone ? "border-red-400/60" : "border-white/15",
          ].join(" ")}
        >
          <select
            aria-label="Country code"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="shrink-0 border-r border-white/15 bg-black/40 px-2.5 text-sm text-white focus:outline-none"
          >
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code} className="bg-[#0b1020] text-white">
                {c.flag} {c.dial}
              </option>
            ))}
          </select>
          <input
            id="gate-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            value={nationalNumber}
            onChange={(e) => {
              setNationalNumber(e.target.value.replace(/[^\d]/g, ""));
              clearError("phone");
            }}
            placeholder="96329 53355"
            className="w-full bg-transparent p-3 text-sm text-white placeholder:text-white/40 focus:outline-none"
          />
        </div>
        {errors.phone ? (
          <span className="text-[12px] text-red-300/90">{errors.phone}</span>
        ) : null}
      </div>

      <button
        type="submit"
        className="btn-gloss relative mt-1 inline-flex items-center justify-center gap-2 overflow-hidden rounded-[10px] border border-white/20 bg-purple/70 px-5 py-[15px] text-sm font-medium text-white shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)]"
      >
        <span className="relative z-[2]">Unlock my automation report →</span>
      </button>

      <p className="text-center text-[12px] text-white/45">
        Your report opens instantly · No spam, ever
      </p>
    </form>
  );
}
