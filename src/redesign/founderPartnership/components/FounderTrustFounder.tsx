import { founder } from "../../data/founder";

export function FounderTrustFounder() {
  return (
    <div className="flex w-full items-center gap-3 rounded-[12px] border border-white/12 bg-black/35 p-3 text-left">
      <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg border border-white/10">
        <img
          src={founder.imageSrc}
          alt={founder.imageAlt}
          loading="lazy"
          className="h-full w-full object-cover object-[center_15%]"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-1.5">
          <span className="rounded-full border border-white/20 bg-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-black">
            {founder.badge}
          </span>
        </div>
        <p className="text-[14px] font-semibold text-white">
          {founder.firstName} {founder.lastName}
        </p>
        <p className="text-[11px] text-white/55">
          {founder.role}, {founder.company}
        </p>
        <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-white/65">
          &ldquo;{founder.quote}&rdquo;
        </p>
      </div>
    </div>
  );
}
