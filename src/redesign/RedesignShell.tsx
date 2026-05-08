import type { ReactNode } from "react";

/**
 * Wraps any redesign page so its components get the scoped CSS tokens
 * (`--color-purple`, `.btn-gloss`, `.site-backdrop` etc.) without leaking
 * styles into the legacy site.
 */
export function RedesignShell({ children }: { children: ReactNode }) {
  return (
    <div className="redesign-shell min-h-screen w-full overflow-x-hidden">
      {children}
    </div>
  );
}

export default RedesignShell;
