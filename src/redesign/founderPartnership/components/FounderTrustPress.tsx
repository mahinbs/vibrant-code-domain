import type { CSSProperties } from "react";

export type PressItem = {
  publication: string;
  href: string;
  yearLabel: string;
  isPartnerContent?: boolean;
};

const MARQUEE_MASK: CSSProperties = {
  maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
  WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
};

function PublicationWordmark({ name }: { name: string }) {
  const n = name.toLowerCase();
  if (n.includes("outlook")) {
    return (
      <span
        className="text-[15px] font-semibold leading-none text-white md:text-[17px]"
        style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
      >
        Outlook<span className="font-normal italic text-white/70"> India</span>
      </span>
    );
  }
  if (n.includes("quint")) {
    return <span className="text-[15px] font-bold leading-none text-white md:text-[17px]">The Quint</span>;
  }
  if (n.includes("forbes")) {
    return (
      <span
        className="text-[16px] font-bold leading-none text-white md:text-[18px]"
        style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
      >
        Forbes
      </span>
    );
  }
  if (n.includes("entrepreneur")) {
    return <span className="text-[15px] font-bold leading-none text-white md:text-[17px]">Entrepreneur</span>;
  }
  if (n.includes("times of india")) {
    return (
      <span
        className="text-center text-[13px] font-bold leading-tight text-white md:text-[16px]"
        style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
      >
        <span className="md:hidden">Times of India</span>
        <span className="hidden md:inline">The Times of India</span>
      </span>
    );
  }
  if (n.includes("business insider")) {
    return <span className="text-[13px] font-bold leading-tight text-white md:text-[16px]">Business Insider</span>;
  }
  return <span className="text-[14px] font-semibold text-white">{name}</span>;
}

function PressLink({ item }: { item: PressItem }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="trust-band-hover flex min-w-[5.5rem] shrink-0 flex-col items-center gap-1 px-2 py-1 lg:min-w-0 lg:px-3"
    >
      <PublicationWordmark name={item.publication} />
      <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/40">
        {item.yearLabel}
      </span>
    </a>
  );
}

export function FounderTrustPress({
  items = [],
  separated = false,
}: {
  items?: PressItem[];
  separated?: boolean;
}) {
  const pressItems = items.length > 0 ? items : [];
  const reel = [...pressItems, ...pressItems];

  return (
    <div className="w-full text-center">
      <p className="mb-4 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-white/50 md:mb-5">
        Featured in
      </p>

      {/* Mobile / tablet: auto-scrolling marquee (matches header ticker). */}
      <div className="w-full overflow-hidden lg:hidden" style={MARQUEE_MASK}>
        <div className="flex h-[52px] items-center">
          <div className="flex animate-ticker items-center gap-10 whitespace-nowrap will-change-transform motion-reduce:animate-none">
            {reel.map((item, i) => (
              <PressLink key={`${item.href}-${i}`} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Desktop: centered wrap row. */}
      <ul className="mx-0 hidden flex-wrap items-center justify-center gap-x-14 gap-y-6 px-0 pb-0 lg:flex">
        {pressItems.map((item, index) => (
          <li key={item.href} className="flex shrink-0 items-center">
            {separated && index > 0 ? (
              <span
                aria-hidden
                className="mx-7 hidden h-7 w-px shrink-0 bg-white/[0.1] lg:inline-block"
              />
            ) : null}
            <PressLink item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}


export const FOUNDER_PRESS_ITEMS: PressItem[] = [
  {
    publication: "Outlook India",
    href: "https://www.outlookindia.com/hub4business/boostmysites-acclaim-as-industry-leader",
    yearLabel: "May 2024",
    isPartnerContent: true,
  },
  {
    publication: "The Quint",
    href: "https://www.thequint.com/brandstudio/boostmysite-2000-ai-projects-milestone",
    yearLabel: "Sep 2024",
    isPartnerContent: true,
  },
  {
    publication: "Forbes",
    href: "https://www.forbes.com/",
    yearLabel: "Editorial",
    isPartnerContent: false,
  },
  {
    publication: "Entrepreneur",
    href: "https://www.entrepreneur.com/",
    yearLabel: "Editorial",
    isPartnerContent: false,
  },
];
