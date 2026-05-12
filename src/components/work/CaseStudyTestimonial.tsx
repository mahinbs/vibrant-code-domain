import type { WorkProject } from "@/data/workMock";
import { QuoteIcon } from "./primitives/icons";

type Props = {
  testimonial: WorkProject["testimonial"];
};

export function CaseStudyTestimonial({ testimonial }: Props) {
  return (
    <section className="relative w-full px-10 pt-[80px] pb-6 max-md:px-5 max-md:pt-12">
      <div
        className="glass-card relative flex flex-col gap-6 overflow-hidden p-10 max-md:p-6"
        style={{
          background:
            "radial-gradient(80% 120% at 0% 0%, rgba(72,118,255,0.18), rgba(0,0,0,0.55) 60%)",
        }}
      >
        <span className="work-icon-tile">
          <QuoteIcon />
        </span>
        <p className="max-w-[860px] text-[26px] font-medium -tracking-[0.02em] leading-[1.3em] text-white max-md:text-xl">
          “{testimonial.quote}”
        </p>
        <div className="flex items-center gap-3">
          {testimonial.avatar ? (
            <img
              src={testimonial.avatar}
              alt={testimonial.author}
              className="size-12 rounded-full border border-white/15 object-cover"
            />
          ) : (
            <span className="grid size-12 place-items-center rounded-full border border-white/15 bg-white/5 text-sm font-semibold text-white/85">
              {testimonial.author
                .split(" ")
                .map((p) => p[0])
                .slice(0, 2)
                .join("")}
            </span>
          )}
          <div className="flex flex-col">
            <span className="text-[14px] font-medium text-white">
              {testimonial.author}
            </span>
            <span className="text-[12px] text-white/55">
              {testimonial.role} · {testimonial.company}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
