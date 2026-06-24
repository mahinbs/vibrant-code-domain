export type TrustMetric = {
  value: string;
  label: string;
};

type TrustMetricsRowProps = {
  items: readonly TrustMetric[];
};

export function TrustMetricsRow({ items }: TrustMetricsRowProps) {
  return (
    <div className="mt-6 border-t border-white/[0.06] pt-6 md:mt-8 md:pt-8">
      <ul className="grid grid-cols-2 divide-x divide-y divide-white/[0.08] md:grid-cols-4 md:divide-y-0">
        {items.map((stat) => (
          <li
            key={stat.label}
            className="trust-band-hover flex cursor-default flex-col items-center justify-center gap-2 px-4 py-5 text-center md:gap-2.5 md:px-6 md:py-6"
          >
            <span className="text-[32px] font-medium leading-none -tracking-[0.04em] text-white max-md:text-[28px] md:text-[44px]">
              {stat.value}
            </span>
            <span className="max-w-[11rem] font-mono text-[10px] uppercase leading-snug tracking-[0.14em] text-white/50 md:max-w-[12rem] md:text-[11px]">
              {stat.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
