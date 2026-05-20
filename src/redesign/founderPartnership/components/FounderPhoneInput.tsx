import { useState } from "react";
import PhoneInput, { type Country } from "react-phone-number-input";
import { isValidPhoneNumber } from "libphonenumber-js";
import { Check } from "lucide-react";
import "react-phone-number-input/style.css";

type Props = {
  value: string;
  country: Country;
  onChange: (phone: string) => void;
  onCountryChange: (country: Country) => void;
  error?: string;
  onBlur?: () => void;
};

export function FounderPhoneInput({
  value,
  country,
  onChange,
  onCountryChange,
  error,
  onBlur,
}: Props) {
  const [touched, setTouched] = useState(false);
  const valid = Boolean(value) && isValidPhoneNumber(value, country);

  return (
    <label className="founder-phone-field flex w-full flex-col gap-2 text-left">
      <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-white/55">
        WhatsApp / phone
      </span>
      <div className="relative">
        <PhoneInput
          international
          defaultCountry="IN"
          country={country}
          value={value || undefined}
          onChange={(v) => onChange(v ?? "")}
          onCountryChange={(c) => c && onCountryChange(c)}
          onBlur={() => {
            setTouched(true);
            onBlur?.();
          }}
          className={`founder-phone-input ${error ? "founder-phone-input--error" : ""} ${valid && touched ? "founder-phone-input--valid" : ""}`}
          numberInputProps={{
            className: "founder-phone-input__number",
            autoComplete: "tel",
          }}
        />
        {valid && touched && !error ? (
          <Check
            className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-emerald-400"
            aria-hidden
          />
        ) : null}
      </div>
      {error ? <span className="text-[12px] text-red-300/90">{error}</span> : null}
    </label>
  );
}

export function validateFounderPhone(phone: string, country: Country): boolean {
  if (!phone.trim()) return false;
  return isValidPhoneNumber(phone, country);
}
