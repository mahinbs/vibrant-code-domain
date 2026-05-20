import { useState, type ChangeEvent } from "react";
import { z } from "zod";
import { Check } from "lucide-react";

const emailSchema = z.string().trim().email("Enter a valid email address.");

type Props = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  onBlur?: () => void;
};

export function validateFounderEmail(email: string): { ok: boolean; error?: string } {
  const result = emailSchema.safeParse(email);
  if (result.success) return { ok: true };
  return { ok: false, error: result.error.errors[0]?.message ?? "Enter a valid email." };
}

export function FounderEmailInput({ value, onChange, error, onBlur }: Props) {
  const [touched, setTouched] = useState(false);
  const validation = validateFounderEmail(value);
  const valid = validation.ok && value.trim().length > 0;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <label className="flex w-full flex-col gap-2 text-left">
      <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-white/55">
        Email
      </span>
      <div className="relative">
        <input
          type="email"
          value={value}
          onChange={handleChange}
          onBlur={() => {
            setTouched(true);
            onBlur?.();
          }}
          placeholder="you@company.com"
          autoComplete="email"
          className={`w-full rounded-lg border bg-black/40 p-3.5 pr-10 text-base text-white placeholder:text-white/40 backdrop-blur-[5px] focus:border-white/40 focus:outline-none ${
            error ? "border-red-400/60" : valid && touched ? "border-emerald-500/50" : "border-white/15"
          }`}
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
