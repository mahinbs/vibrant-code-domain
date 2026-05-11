import { useMemo } from "react";
import { WORK_PRIMARY_GLOSS_CTA_INNER, WORK_SECTION_GLOSS_BADGE } from "./primitives/ctaStyles";
import { parseSolutionBody } from "./parseCaseStudySolution";

const PLACEHOLDER = "Solution details coming soon.";

type Props = {
  solution?: string;
};

export function CaseStudySolution({ solution }: Props) {
  const body = solution?.trim();
  const blocks = useMemo(() => (body && body !== PLACEHOLDER ? parseSolutionBody(body) : []), [body]);
  const displayBlocks = blocks.length > 0 ? blocks : [{ type: "paragraph" as const, text: body }];

  if (!body || body === PLACEHOLDER) return null;

  return (
    <section
      className="relative w-full overflow-x-hidden px-10 pt-10 pb-6 max-md:px-5 max-md:pt-8"
      style={{
        background:
          "radial-gradient(50% 40% at 50% 30%, var(--wk-dark) 0%, rgba(0,0,0,0) 100%)",
      }}
    >
      <div className="relative z-[2] ml-0 mr-auto flex max-w-[min(880px,100%)] flex-col gap-8 pl-2 text-left">
        <span className={`${WORK_SECTION_GLOSS_BADGE} w-fit`}>
          <span className={WORK_PRIMARY_GLOSS_CTA_INNER}>What we shipped</span>
        </span>
        <h2 className="text-[40px] font-medium -tracking-[0.04em] leading-[1.05em] text-white max-md:text-3xl">
          How we solved it.
        </h2>

        <div className="flex flex-col gap-8">
          {displayBlocks.map((block, idx) => {
            if (block.type === "paragraph") {
              return (
                <p
                  key={`p-${idx}`}
                  className="whitespace-pre-wrap text-[15px] leading-[1.55em] text-white/65"
                >
                  {block.text}
                </p>
              );
            }
            return (
              <div
                key={`sub-${idx}-${block.title}`}
                className="glass-card flex flex-col gap-4 border border-white/[0.07] px-5 py-5 max-md:px-4 max-md:py-4"
              >
                <h3 className="text-[18px] font-semibold -tracking-[0.02em] text-white">{block.title}</h3>
                {block.bullets.length > 0 ? (
                  <ul className="list-disc space-y-2 pl-5 text-[15px] leading-[1.5em] text-white/70 marker:text-white/35">
                    {block.bullets.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                {block.tail ? (
                  <p className="whitespace-pre-wrap text-[15px] leading-[1.55em] text-white/65">{block.tail}</p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
