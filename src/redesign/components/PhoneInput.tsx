/** Phone field with a flag + dial-code dropdown (default 🇮🇳 +91). Reusable. */

export const COUNTRIES = [
  { code: "IN", flag: "🇮🇳", dial: "+91", name: "India" },
  { code: "US", flag: "🇺🇸", dial: "+1", name: "United States" },
  { code: "GB", flag: "🇬🇧", dial: "+44", name: "United Kingdom" },
  { code: "AE", flag: "🇦🇪", dial: "+971", name: "UAE" },
  { code: "CA", flag: "🇨🇦", dial: "+1", name: "Canada" },
  { code: "AU", flag: "🇦🇺", dial: "+61", name: "Australia" },
  { code: "SG", flag: "🇸🇬", dial: "+65", name: "Singapore" },
  { code: "DE", flag: "🇩🇪", dial: "+49", name: "Germany" },
  { code: "FR", flag: "🇫🇷", dial: "+33", name: "France" },
  { code: "SA", flag: "🇸🇦", dial: "+966", name: "Saudi Arabia" },
  { code: "ZA", flag: "🇿🇦", dial: "+27", name: "South Africa" },
  { code: "NG", flag: "🇳🇬", dial: "+234", name: "Nigeria" },
] as const;

export const DEFAULT_COUNTRY = "IN";
export const dialFor = (code: string) =>
  COUNTRIES.find((c) => c.code === code)?.dial ?? "+91";

type PhoneInputProps = {
  countryCode: string;
  nationalNumber: string;
  onCountryChange: (code: string) => void;
  onNumberChange: (num: string) => void;
  error?: string;
  placeholder?: string;
};

export function PhoneInput({
  countryCode,
  nationalNumber,
  onCountryChange,
  onNumberChange,
  error,
  placeholder = "96329 53355",
}: PhoneInputProps) {
  const borderClass = error ? "border-red-400/60" : "border-white/15";
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className={`flex items-stretch overflow-hidden rounded-lg border ${borderClass} bg-black/40 transition-colors focus-within:border-white/40`}
      >
        <select
          aria-label="Country code"
          value={countryCode}
          onChange={(e) => onCountryChange(e.target.value)}
          className="shrink-0 border-r border-white/15 bg-black/40 px-2.5 text-sm text-white focus:outline-none"
        >
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code} className="bg-[#0b1020] text-white">
              {c.flag} {c.dial}
            </option>
          ))}
        </select>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          value={nationalNumber}
          onChange={(e) => onNumberChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent p-3.5 text-sm text-white placeholder:text-white/40 focus:outline-none"
        />
      </div>
      {error ? <span className="text-[12px] text-red-300/90">{error}</span> : null}
    </div>
  );
}
