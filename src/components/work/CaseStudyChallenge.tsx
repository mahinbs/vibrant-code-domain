import { CheckIcon } from "./primitives/icons";

type Props = {
  challenge: string;
  bullets: string[];
};

export function CaseStudyChallenge({ challenge, bullets }: Props) {
  return (
    <section
      className="relative w-full overflow-x-hidden px-10 pt-[36px] pb-6 max-md:px-5 max-md:pt-8"
      style={{
        background:
          "radial-gradient(50% 40% at 50% 30%, var(--wk-dark) 0%, rgba(0,0,0,0) 100%)",
      }}
    >
      <div className="relative w-full overflow-visible">
        <p
          aria-hidden
          className="work-watermark pointer-events-none absolute left-0 top-[4px] z-0 w-full max-w-none -translate-y-1/2 select-none text-left opacity-80 max-md:top-[36%]"
        >
          CHALLENGE
        </p>

        <div className="relative z-[2] ml-0 mr-auto mt-[clamp(2.75rem,9vw,6.5rem)] flex max-w-[720px] flex-col items-start gap-5 pt-[65px] pl-2 text-left">
          <h2 className="text-[40px] font-medium -tracking-[0.04em] leading-[1.05em] text-white max-md:text-3xl">
            What we walked into.
          </h2>
          {challenge.trim() ? (
            <p className="max-w-[720px] text-[15px] leading-[1.55em] text-white/65">{challenge}</p>
          ) : null}
          {bullets.length > 0 ? (
            <ul className="flex max-w-[720px] flex-col gap-2 text-[14px] text-white/75">
              {bullets.map((b, i) => (
                <li key={`${i}-${b.slice(0, 24)}`} className="flex items-start gap-2">
                  <CheckIcon className="mt-[3px] size-[14px] shrink-0 text-[color:var(--wk-bright)]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
