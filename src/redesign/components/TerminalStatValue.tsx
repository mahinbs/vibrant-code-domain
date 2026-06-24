import { useEffect, useState } from "react";

type TerminalStatValueProps = {
  value: string;
  animate: boolean;
};

function parseStatValue(value: string): { prefix: string; num: number; suffix: string; decimals: number } | null {
  const match = value.match(/^([+−~<]?\s*)([\d.]+)(.*)$/);
  if (!match) return null;
  const num = parseFloat(match[2]);
  if (Number.isNaN(num)) return null;
  const decimals = match[2].includes(".") ? match[2].split(".")[1].length : 0;
  return { prefix: match[1].trim(), num, suffix: match[3], decimals };
}

export function TerminalStatValue({ value, animate }: TerminalStatValueProps) {
  const parsed = parseStatValue(value);
  const [displayNum, setDisplayNum] = useState(parsed?.num ?? 0);
  const [started, setStarted] = useState(!animate);

  useEffect(() => {
    if (!animate || !parsed) {
      setStarted(true);
      return;
    }

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setDisplayNum(parsed.num);
      setStarted(true);
      return;
    }

    const duration = 1200;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * parsed.num;
      setDisplayNum(
        parsed.decimals > 0
          ? parseFloat(current.toFixed(parsed.decimals))
          : Math.floor(current),
      );
      if (progress < 1) requestAnimationFrame(tick);
      else {
        setDisplayNum(parsed.num);
        setStarted(true);
      }
    };
    requestAnimationFrame(tick);
  }, [animate, parsed, value]);

  if (!parsed) return <span>{value}</span>;

  const formatted =
    parsed.decimals > 0 ? displayNum.toFixed(parsed.decimals) : String(Math.round(displayNum));

  return (
    <span>
      {parsed.prefix}
      {parsed.prefix ? " " : ""}
      {started || !animate ? formatted : displayNum}
      {parsed.suffix}
    </span>
  );
}

export function slugifyLabel(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
}
