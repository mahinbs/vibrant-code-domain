import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  style?: CSSProperties;
};

export function WorkHeroFrame({
  children,
  className = "",
  contentClassName = "",
  style,
}: Props) {
  return (
    <div
      className={[
        "relative w-full overflow-hidden rounded-[20px] border border-white/15",
        "px-10 pb-10 pt-12 max-md:px-5 max-md:py-6",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        background:
          "radial-gradient(108% 100% at 100% 100.6%, var(--color-purple, rgb(72, 118, 255)) 12.8%, rgb(8,16,40) 69.1%, #000 98.2%)",
        ...style,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.67) 64.5%, #000 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          backgroundPosition: "left top",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[3] opacity-45 mix-blend-overlay"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(255,255,255,0.22) 1px, transparent 0)
          `,
          backgroundSize: "24px 24px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-180px] top-[-120px] z-[4] size-[680px] rounded-full opacity-30 blur-[20px] max-md:hidden"
        style={{
          background:
            "radial-gradient(closest-side, rgba(96,142,255,0.42), rgba(72,118,255,0.22) 45%, rgba(0,0,0,0) 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[60px] right-[40px] z-[4] size-[380px] rounded-full opacity-25 blur-[30px] max-md:hidden"
        style={{
          background:
            "radial-gradient(closest-side, rgba(84,130,255,0.34), rgba(22,36,74,0.28) 50%, rgba(0,0,0,0) 80%)",
        }}
      />

      <div
        className={["relative z-[5] flex w-full flex-col gap-8", contentClassName]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </div>
    </div>
  );
}
