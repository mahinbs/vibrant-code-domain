export type PressItem = {
  publication: string;
  href: string;
  yearLabel: string;
  isPartnerContent?: boolean;
};

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

export function FounderTrustPress({
  items = FOUNDER_PRESS_ITEMS,
  separated = false,
}: {
  items?: PressItem[];
  separated?: boolean;
}) {
  return (
    <div className="w-full text-center">
      <p className="mb-4 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-white/50 md:mb-5">
        Featured in
      </p>
      <ul className="-mx-5 flex flex-nowrap items-center justify-start gap-8 overflow-x-auto px-5 pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:justify-center lg:gap-x-14 lg:gap-y-6 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
        {items.map((item, index) => (
          <li key={item.href} className="flex shrink-0 snap-center items-center">
            {separated && index > 0 ? (
              <span
                aria-hidden
                className="mx-4 hidden h-7 w-px shrink-0 bg-white/[0.1] lg:mx-7 lg:inline-block"
              />
            ) : null}
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="trust-band-hover flex min-w-[5.5rem] flex-col items-center gap-1 px-2 py-1 lg:min-w-0 lg:px-3"
            >
              <PublicationWordmark name={item.publication} />
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/40">
                {item.yearLabel}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
