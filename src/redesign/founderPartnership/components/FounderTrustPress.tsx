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
  return <span className="text-[14px] font-semibold text-white">{name}</span>;
}

export function FounderTrustPress({ items = FOUNDER_PRESS_ITEMS }: { items?: PressItem[] }) {
  return (
    <div className="w-full text-center">
      <p className="mb-3 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-white/50">
        Featured in
      </p>
      <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-0.5 transition-opacity hover:opacity-90"
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
