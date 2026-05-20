import type { ChangeEvent } from "react";

const fieldClass =
  "w-full rounded-lg border border-white/15 bg-black/40 p-3.5 text-base text-white placeholder:text-white/40 backdrop-blur-[5px] focus:border-white/40 focus:outline-none";

type InputProps = {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  placeholder?: string;
  error?: string;
  multiline?: boolean;
  rows?: number;
};

export function FounderImmersiveInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
  multiline,
  rows = 5,
}: InputProps) {
  return (
    <label className="flex w-full flex-col gap-2 text-left">
      <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-white/55">
        {label}
      </span>
      {multiline ? (
        <textarea
          className={`${fieldClass} min-h-[140px] resize-y ${error ? "border-red-400/60" : ""}`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
        />
      ) : (
        <input
          type={type}
          className={`${fieldClass} ${error ? "border-red-400/60" : ""}`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
      {error ? <span className="text-[12px] text-red-300/90">{error}</span> : null}
    </label>
  );
}
