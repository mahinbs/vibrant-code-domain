const CEO_PHOTO_SRC = "/images/reshab-founder.png";

export function FounderTrustCeo() {
  return (
    <div className="flex w-full items-center gap-3 rounded-[12px] border border-white/12 bg-[linear-gradient(135deg,rgba(22,36,74,0.5)_0%,rgba(8,14,32,0.85)_100%)] p-3 text-left">
      <img
        src={CEO_PHOTO_SRC}
        alt="Reshab, CEO Boostmysites"
        loading="lazy"
        className="h-16 w-14 shrink-0 rounded-lg object-cover object-top"
      />
      <div className="min-w-0 flex-1">
        <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/50">
          Chief Executive Officer
        </p>
        <p className="mt-0.5 text-[14px] font-semibold text-white">Reshab</p>
        <p className="text-[11px] text-white/55">CEO · BoostMySites</p>
        <p className="mt-1 text-[11px] leading-snug text-white/65">
          Product scope, architecture, and delivery plans from someone who ships regulated fintech and
          healthcare systems.
        </p>
      </div>
    </div>
  );
}
