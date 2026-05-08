type Props = {
  images: string[];
};

export function CaseStudyGallery({ images }: Props) {
  if (!images.length) return null;

  return (
    <section className="relative w-full px-10 pt-[80px] pb-6 max-md:px-5 max-md:pt-12">
      <div className="flex max-w-[680px] flex-col gap-3">
        <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-[color:var(--wk-bright)] backdrop-blur-[5px]">
          Gallery
        </span>
        <h2 className="text-[36px] font-medium -tracking-[0.04em] leading-[1.05em] text-white max-md:text-2xl">
          A look at the build.
        </h2>
      </div>

      <div className="mt-8 grid w-full grid-cols-6 gap-5 max-md:grid-cols-2">
        {images.map((src, i) => {
          const span =
            i === 0 ? "col-span-6" : i % 3 === 1 ? "col-span-3" : "col-span-3";
          return (
            <figure
              key={src + i}
              className={`glass-card group relative overflow-hidden ${span} max-md:col-span-2 ${
                i === 0 ? "h-[420px]" : "h-[280px]"
              }`}
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.45) 100%)",
                }}
              />
            </figure>
          );
        })}
      </div>
    </section>
  );
}
