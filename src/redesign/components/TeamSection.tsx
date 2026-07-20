import type { CSSProperties } from "react";

/** Leadership team — real people behind Boostmysites, with LinkedIn links. */

type Member = {
  name: string;
  role: string;
  photo: string;
  linkedin: string;
};

const TEAM: Member[] = [
  {
    name: "Mahin B S",
    role: "Founder & Chairman",
    photo: "/team/mahin.jpg",
    linkedin: "https://in.linkedin.com/in/mahin-b-s",
  },
  {
    name: "Reshab Retheesh",
    role: "Chief Executive Officer",
    photo: "/team/reshab.jpg",
    linkedin: "https://www.linkedin.com/in/reshab-retheesh-8a74b61aa/",
  },
  {
    name: "Darshan R Krishnan",
    role: "Chief Operating Officer",
    photo: "/team/darshan.jpg",
    linkedin: "https://www.linkedin.com/in/darshan-r-krishnan-6557091a1/",
  },
  {
    name: "Supreeth Girish",
    role: "Chief Technology Officer",
    photo: "/team/supreeth.jpg",
    linkedin: "https://www.linkedin.com/in/supreeth-girish/",
  },
  {
    name: "Kavya Shree.R",
    role: "Chief Marketing Officer",
    photo: "/team/kavya.jpg",
    linkedin: "https://www.linkedin.com/in/kavya-r-19124a330/",
  },
];

const GRID_OVERLAY: CSSProperties = {
  backgroundImage:
    "linear-gradient(rgba(120,145,220,.10) 1px, transparent 1px), linear-gradient(90deg, rgba(120,145,220,.10) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
};

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 18.34V9.99H5.67v8.35h2.67zM7 8.67a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1zm11.34 9.67v-4.58c0-2.45-1.31-3.59-3.06-3.59-1.41 0-2.04.78-2.39 1.32v-1.13h-2.67c.04.75 0 8.35 0 8.35h2.67v-4.66c0-.24.02-.48.09-.65.19-.48.63-.98 1.36-.98.96 0 1.34.73 1.34 1.8v4.49h2.66z" />
    </svg>
  );
}

function MemberCard({ m }: { m: Member }) {
  return (
    <a
      href={m.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col items-center gap-4 overflow-hidden rounded-[16px] border border-white/12 p-5 text-center transition-colors hover:border-white/25"
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.55) 100%)",
      }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 opacity-30" style={GRID_OVERLAY} />
      <div className="relative z-[1] rounded-full bg-gradient-to-b from-[#4b78ff]/60 to-transparent p-[3px]">
        <img
          src={m.photo}
          alt={`${m.name} — ${m.role}, Boostmysites`}
          loading="lazy"
          decoding="async"
          className="size-[120px] rounded-full object-cover object-top ring-2 ring-black/60"
        />
      </div>
      <div className="relative z-[1]">
        <p className="text-[17px] font-medium tracking-tight text-white">{m.name}</p>
        <p className="mt-1 text-[13px] leading-snug text-purple">{m.role}</p>
      </div>
      <span className="relative z-[1] inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[11px] font-medium text-white/70 transition-colors group-hover:text-white">
        <LinkedInIcon className="size-3.5 text-[#4b9fff]" />
        Connect
      </span>
    </a>
  );
}

export function TeamSection() {
  return (
    <section
      id="team"
      className="relative flex w-full max-w-[1920px] flex-col gap-4 overflow-x-hidden px-5 py-16 md:px-10 md:py-24"
      style={{
        background:
          "radial-gradient(50% 40% at 50% 30%, var(--color-dark-purple) 0%, rgba(0,0,0,0) 100%)",
      }}
    >
      <div className="relative z-[1] w-full overflow-visible">
        <p
          aria-hidden
          className="pointer-events-none absolute left-0 top-[40%] z-0 hidden w-full max-w-none -translate-y-1/2 select-none text-left font-bold uppercase leading-[0.88] tracking-[0.02em] opacity-[0.3] md:block"
          style={{
            fontSize: "clamp(2.5rem, min(12vw, 11rem), 11rem)",
            backgroundImage:
              "linear-gradient(180deg, rgb(140, 178, 255) 0%, rgb(88, 132, 255) 28%, rgb(48, 88, 210) 58%, rgb(18, 32, 72) 88%, rgb(8, 14, 36) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          THE TEAM
        </p>

        <div className="relative z-[2] ml-auto flex max-w-[680px] flex-col items-end gap-5 pt-1 text-right md:mt-[clamp(2.75rem,9vw,6.5rem)] max-md:items-start max-md:text-left">
          <h2 className="text-[44px] font-medium -tracking-[0.04em] leading-[1.05em] text-white max-md:text-3xl">
            The people <span className="impact-highlight">behind the build</span>.
          </h2>
          <p className="max-w-[540px] text-lg text-white/60 max-md:text-base">
            Operators and engineers who&apos;ve automated 200+ businesses — you work
            directly with the team, not a call centre.
          </p>
        </div>
      </div>

      <div className="relative z-[1] grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {TEAM.map((m) => (
          <MemberCard key={m.name} m={m} />
        ))}
      </div>
    </section>
  );
}
