import type { ChangeEvent } from "react";
import { SOFT_TEXT_HINT, SOFT_TEXT_RECOMMENDED_CHARS } from "../founderApplicationConfig";

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  showOverrideHint: boolean;
  overrideReady: boolean;
};

export function FounderTypingAnswer({
  value,
  onChange,
  placeholder,
  showOverrideHint,
  overrideReady,
}: Props) {
  const len = value.trim().length;
  const meetsRecommended = len >= SOFT_TEXT_RECOMMENDED_CHARS;

  return (
    <div className="w-full text-left">
      <textarea
        className="founder-typing-answer w-full resize-none border-0 border-b border-white/25 bg-transparent py-2 text-[17px] leading-relaxed text-white placeholder:text-white/35 focus:border-white/50 focus:outline-none md:text-[18px]"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={3}
        aria-label="Your answer"
      />
      <div className="mt-2 flex min-h-[18px] items-center justify-between text-[11px]">
        <span className={meetsRecommended ? "text-emerald-400/80" : "text-white/40"}>
          {meetsRecommended ? "Good detail" : len > 0 ? `${len} / ${SOFT_TEXT_RECOMMENDED_CHARS}` : ""}
        </span>
      </div>
      {showOverrideHint ? (
        <p className="founder-micro-in mt-2 text-[12px] leading-relaxed text-amber-100/80">
          {SOFT_TEXT_HINT.encourage}
          {overrideReady ? (
            <span className="mt-1 block text-white/55">{SOFT_TEXT_HINT.canContinue}</span>
          ) : (
            <span className="mt-1 block text-white/45">{SOFT_TEXT_HINT.waiting}</span>
          )}
        </p>
      ) : null}
    </div>
  );
}

export { isSoftTextReady } from "./FounderSoftTextarea";
