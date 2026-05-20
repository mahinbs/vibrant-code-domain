import { motion } from "motion/react";

type Props = {
  label: string;
  ready: boolean;
  disabled?: boolean;
  onClick: () => void;
};

export function FounderSceneCta({ label, ready, disabled, onClick }: Props) {
  return (
    <motion.button
      type="button"
      disabled={disabled || !ready}
      onClick={onClick}
      whileTap={ready ? { scale: 0.98 } : undefined}
      className="btn-gloss relative mx-auto flex w-full max-w-lg items-center justify-center overflow-hidden rounded-[10px] border border-white/20 bg-purple/70 px-6 py-3.5 text-[15px] font-medium text-white disabled:opacity-50"
    >
      {!ready ? (
        <span
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-white/40"
          style={{ animation: "founderCtaPulse 2s ease-out forwards" }}
          aria-hidden
        />
      ) : null}
      <span className={ready ? "" : "opacity-70"}>{label}</span>
    </motion.button>
  );
}
