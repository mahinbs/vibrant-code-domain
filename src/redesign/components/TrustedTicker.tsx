import { logos, type Logo } from "../data/logos";
import type { CSSProperties } from "react";

function LogoItem({ logo }: { logo: Logo }) {
  const Icon = logo.Icon;
  return (
    <div className="flex h-11 min-w-[108px] shrink-0 items-center justify-center gap-1.5 rounded-[8px] border border-white/[0.08] bg-black/30 px-3 md:h-[68px] md:min-w-[140px] md:gap-2 md:rounded-[10px] md:px-4 md:bg-black/20">
      {Icon ? <Icon /> : null}
      <span className={[logo.textClass, "text-sm md:text-base"].join(" ")} style={{ color: "#fff" }}>
        {logo.prefix ? (
          <span className={logo.prefix.className}>{logo.prefix.text}</span>
        ) : null}
        {logo.name}
      </span>
    </div>
  );
}

const MARQUEE_MASK: CSSProperties = {
  maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
  WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
};

export function TrustedTicker() {
  const reel = [...logos, ...logos];

  return (
    <div className="relative z-[5] mx-auto mt-6 flex w-full max-w-[1100px] flex-col items-stretch gap-2.5 md:mt-10 md:gap-4 xl:absolute xl:bottom-5 xl:left-1/2 xl:-translate-x-1/2 xl:mt-0 xl:w-[95%] xl:flex-row xl:items-center xl:gap-5">
      <span className="shrink-0 text-center text-[11px] font-normal leading-snug -tracking-[0.01em] text-white/70 sm:text-xs md:text-left md:text-sm xl:whitespace-nowrap">
        Trusted by 500+ teams across 56+ cities
      </span>

      <div className="w-full overflow-hidden md:flex-1" style={MARQUEE_MASK}>
        <div className="flex h-[48px] items-center md:h-[76px]">
          <div className="flex animate-ticker items-center gap-2 whitespace-nowrap will-change-transform md:gap-2.5">
            {reel.map((logo, i) => (
              <LogoItem key={`${logo.name}-${i}`} logo={logo} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
