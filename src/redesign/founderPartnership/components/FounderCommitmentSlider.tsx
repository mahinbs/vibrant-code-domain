import * as Slider from "@radix-ui/react-slider";
import { COMMITMENT_LEVELS } from "../founderApplicationConfig";

type Props = {
  value: number;
  onChange: (v: number) => void;
};

export function FounderCommitmentSlider({ value, onChange }: Props) {
  const label = COMMITMENT_LEVELS.find((l) => l.value === value)?.label ?? "";

  return (
    <div className="mt-6 w-full">
      <p className="mb-6 text-center text-[17px] font-medium text-white">{label}</p>
      <Slider.Root
        className="relative flex h-5 w-full touch-none select-none items-center"
        min={1}
        max={5}
        step={1}
        value={[value]}
        onValueChange={([v]) => onChange(v)}
      >
        <Slider.Track className="relative h-1.5 grow rounded-full bg-white/15">
          <Slider.Range className="absolute h-full rounded-full bg-purple" />
        </Slider.Track>
        <Slider.Thumb className="block size-5 rounded-full border-2 border-white/30 bg-purple shadow-[0_0_12px_rgba(72,118,255,0.6)] focus:outline-none" />
      </Slider.Root>
      <div className="mt-3 flex justify-between text-[10px] uppercase tracking-wider text-white/40">
        <span>Casual</span>
        <span>Aggressive</span>
      </div>
    </div>
  );
}
