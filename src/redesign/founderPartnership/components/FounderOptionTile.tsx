type Props = {
  label: string;
  selected: boolean;
  onClick: () => void;
  multi?: boolean;
  compact?: boolean;
};

export function FounderOptionTile({ label, selected, onClick, multi, compact }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-[10px] border text-left font-medium transition-all duration-200 ${
        compact ? "px-3 py-2.5 text-[13px]" : "rounded-[12px] px-4 py-3.5 text-[15px]"
      } ${
        selected
          ? "border-purple/60 bg-purple/15 text-white shadow-[0_0_24px_-8px_rgba(72,118,255,0.5)]"
          : "border-white/15 bg-black/40 text-white/85 hover:border-white/25 hover:bg-black/55"
      }`}
    >
      <span className="flex items-center gap-3">
        <span
          className={`flex size-4 shrink-0 items-center justify-center rounded-full border ${
            selected ? "border-purple bg-purple/80" : "border-white/30"
          }`}
        >
          {selected ? (
            <span className="size-1.5 rounded-full bg-white" />
          ) : multi ? null : null}
        </span>
        {label}
      </span>
    </button>
  );
}
