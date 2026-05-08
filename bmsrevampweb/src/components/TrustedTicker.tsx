import { logos, type Logo } from "../data/logos";

function LogoItem({ logo }: { logo: Logo }) {
  const Icon = logo.Icon;
  return (
    <div className="flex items-center justify-center gap-2 px-5 h-20 bg-black/20 rounded-[10px] shrink-0 min-w-[150px]">
      {Icon ? <Icon /> : null}
      <span className={logo.textClass} style={{ color: "#fff" }}>
        {logo.prefix ? (
          <span className={logo.prefix.className}>{logo.prefix.text}</span>
        ) : null}
        {logo.name}
      </span>
    </div>
  );
}

export function TrustedTicker() {
  // Duplicate the list for a seamless `translateX(-50%)` loop.
  const reel = [...logos, ...logos];

  return (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[95%] max-w-[1100px] flex items-center gap-5 overflow-hidden z-[5]">
      <span className="text-sm font-normal -tracking-[0.01em] text-white/70 whitespace-nowrap shrink-0">
        Trusted by 500+ teams across 56+ cities
      </span>
      <div
        className="flex-1 overflow-hidden h-[76px] flex items-center"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 17.5%, black 82.5%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 17.5%, black 82.5%, transparent 100%)",
        }}
      >
        <div className="flex gap-2.5 items-center animate-ticker whitespace-nowrap will-change-transform">
          {reel.map((logo, i) => (
            <LogoItem key={`${logo.name}-${i}`} logo={logo} />
          ))}
        </div>
      </div>
    </div>
  );
}
