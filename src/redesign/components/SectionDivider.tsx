/** Faint horizontal rule — matches separators used on industry landings between major bands. */
export function SectionDivider() {
  return (
    <div
      aria-hidden
      className="mx-auto my-2 h-px w-full max-w-[min(1920px,100%)] shrink-0 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent"
    />
  );
}
