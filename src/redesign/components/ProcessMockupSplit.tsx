import type { ProcessStep } from "../data/process";
import { MockupBand } from "./MockupBand";
import { Process } from "./Process";

type ProcessMockupSplitProps = {
  steps: ProcessStep[];
  title: string;
  subtitle: string;
  watermark: string;
  mockup: {
    src: string;
    poster: string;
    eyebrow: string;
    title: string;
    text: string;
  };
};

export function ProcessMockupSplit({
  steps,
  title,
  subtitle,
  watermark,
  mockup,
}: ProcessMockupSplitProps) {
  return (
    <section
      id="process"
      className="relative flex w-full max-w-[1920px] flex-col overflow-x-hidden px-5 py-10 md:px-10 md:py-14"
      style={{
        background:
          "radial-gradient(50% 40% at 35% 30%, var(--color-dark-purple) 0%, rgba(0,0,0,0) 100%)",
      }}
    >
      <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] lg:gap-10">
        <Process
          embedded
          steps={steps}
          columns={3}
          title={title}
          subtitle={subtitle}
          watermark={watermark}
          align="left"
          contentMaxWidth="100%"
        />
        <div className="flex min-h-0 min-w-0 flex-col border-t border-white/[0.06] pt-8 lg:h-full lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <MockupBand variant="sidebar" {...mockup} />
        </div>
      </div>
    </section>
  );
}
