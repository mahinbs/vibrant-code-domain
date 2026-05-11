import type { ReactNode } from "react";

/**
 * Wraps any redesign page so its components get the scoped CSS tokens
 * (`--color-purple`, `.btn-gloss`, `.site-backdrop` etc.) without leaking
 * styles into the legacy site.
 */
export function RedesignShell({ children }: { children: ReactNode }) {
  /* No `overflow-x-hidden` on the shell itself: that can scope `position: sticky`
   * descendants (like <Nav />) to the shell instead of the viewport in some
   * Safari builds. Each section enforces its own x-overflow guard. */
  return (
    <div className="redesign-shell min-h-screen w-full">
      {children}
    </div>
  );
}

export default RedesignShell;
