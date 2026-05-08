import {
  orderedServiceIds,
  serviceMeta,
  type ServiceId,
} from "./primitives/serviceMeta";

type Props = {
  active: ServiceId | null;
  onSelect: (id: ServiceId | null) => void;
  counts: Record<ServiceId, number>;
};

export function WorkServiceFilter({ active, onSelect, counts }: Props) {
  const total = orderedServiceIds.reduce((sum, id) => sum + (counts[id] ?? 0), 0);

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 overflow-x-auto rounded-[14px] border border-white/[0.07] bg-black/25 px-3 py-3 max-md:rounded-[10px]">
        <button
          type="button"
          onClick={() => onSelect(null)}
          className={chipClass(active === null)}
        >
          <span>All work</span>
          <span className="rounded-md border border-white/15 bg-black/40 px-1.5 py-0.5 text-[10px] font-medium text-white/65">
            {total}
          </span>
        </button>
        {orderedServiceIds.map((id) => {
          const meta = serviceMeta[id];
          const Icon = meta.icon;
          const count = counts[id] ?? 0;
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelect(id)}
              className={chipClass(isActive)}
            >
              <Icon className="size-4" />
              <span className="whitespace-nowrap">{meta.shortLabel}</span>
              <span className="rounded-md border border-white/15 bg-black/40 px-1.5 py-0.5 text-[10px] font-medium text-white/65">
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function chipClass(active: boolean): string {
  if (active) {
    return "btn-gloss relative inline-flex h-10 shrink-0 items-center gap-2 overflow-hidden rounded-[10px] border border-[#4b78ff]/70 bg-[linear-gradient(180deg,#2f5eff_0%,#254dcf_100%)] px-3 text-[12px] font-semibold text-white shadow-[inset_0_0_8px_2px_rgba(255,255,255,0.18)]";
  }
  return "inline-flex h-10 shrink-0 items-center gap-2 rounded-[10px] border border-white/15 bg-black/40 px-3 text-[12px] font-medium text-white/80 transition-colors hover:border-white/30 hover:text-white";
}
