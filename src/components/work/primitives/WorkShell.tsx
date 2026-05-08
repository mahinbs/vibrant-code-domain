import { useEffect } from "react";
import type { ReactNode } from "react";
import { SiteBackground } from "./SiteBackground";
import { WorkFooter } from "./WorkFooter";
import { WorkNav } from "./WorkNav";
import { WORK_GLASS_BG_BLUR } from "./workChrome";

type Props = {
  children: ReactNode;
  /**
   * Optional document title (set on mount, restored on unmount).
   */
  documentTitle?: string;
};

/**
 * Outer chrome for the new /work and /work/:slug routes.
 *
 * Wraps everything in `.work-shell` so the scoped CSS in src/index.css applies
 * only here and never bleeds into the existing pages.
 */
export function WorkShell({ children, documentTitle }: Props) {
  useEffect(() => {
    if (!documentTitle) return;
    const previous = document.title;
    document.title = documentTitle;
    return () => {
      document.title = previous;
    };
  }, [documentTitle]);

  return (
    <div className="work-shell">
      <SiteBackground />
      {/* Full-width strip under the floating nav: hides scrolling cards in the top band and matches the sticky filter chrome */}
      <div
        className={`pointer-events-none fixed inset-x-0 top-0 z-[15] h-[88px] ${WORK_GLASS_BG_BLUR}`}
        aria-hidden
      />
      <WorkNav />
      <main className="relative z-10 mx-auto flex w-full max-w-[min(1600px,96vw)] flex-col items-center pt-[88px] pb-[80px]">
        {children}
      </main>
      <div className="relative z-10 mx-auto flex w-full max-w-[min(1600px,96vw)] flex-col items-center">
        <WorkFooter />
      </div>
    </div>
  );
}
