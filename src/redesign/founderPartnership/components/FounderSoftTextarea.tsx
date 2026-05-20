import type { ChangeEvent } from "react";
import { SOFT_TEXT_HINT, SOFT_TEXT_RECOMMENDED_CHARS } from "../founderApplicationConfig";

type Props = {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  showOverrideHint: boolean;
  overrideReady: boolean;
};

export function FounderSoftTextarea({
  label,
  value,
  onChange,
  placeholder,
  rows = 6,
  showOverrideHint,
  overrideReady,
}: Props) {
  const len = value.trim().length;
  const meetsRecommended = len >= SOFT_TEXT_RECOMMENDED_CHARS;

  return (
    <label className="flex w-full flex-col gap-2 text-left">
      <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-white/55">
        {label}
      </span>
      <textarea
        className={`min-h-[140px] w-full resize-y rounded-lg border bg-black/40 p-3.5 text-base text-white placeholder:text-white/40 backdrop-blur-[5px] focus:border-white/40 focus:outline-none ${
          meetsRecommended ? "border-emerald-500/30" : "border-white/15"
        }`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
      />
      <div className="flex items-center justify-between text-[12px]">
        <span className={meetsRecommended ? "text-emerald-400/80" : "text-white/45"}>
          {meetsRecommended ? "Good detail" : `${len} / ${SOFT_TEXT_RECOMMENDED_CHARS} characters`}
        </span>
      </div>
      {showOverrideHint ? (
        <div className="founder-micro-in rounded-lg border border-amber-500/25 bg-amber-950/20 p-3 text-[13px] leading-relaxed text-amber-100/85">
          {SOFT_TEXT_HINT.encourage}
          {overrideReady ? (
            <span className="mt-2 block text-white/70">{SOFT_TEXT_HINT.canContinue}</span>
          ) : (
            <span className="mt-2 block text-white/50">{SOFT_TEXT_HINT.waiting}</span>
          )}
        </div>
      ) : null}
    </label>
  );
}

export function isSoftTextReady(
  value: string,
  overrideReady: boolean,
): boolean {
  return value.trim().length >= SOFT_TEXT_RECOMMENDED_CHARS || overrideReady;
}
