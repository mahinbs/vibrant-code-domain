import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";

type DeferredSectionProps = {
  children: ReactNode;
  className?: string;
  rootMargin?: string;
  minHeight?: number;
};

/**
 * Mounts children when near the viewport. When the real content is taller than the
 * skeleton `minHeight` and the section started **above** the viewport, nudge
 * `scrollY` so the page does not appear to “jump” upward (scroll anchoring gaps).
 */
const DeferredSection = ({
  children,
  className,
  rootMargin = "300px 0px",
  minHeight = 420,
}: DeferredSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const shouldCompensateScrollRef = useRef(false);

  useEffect(() => {
    if (!sectionRef.current || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        shouldCompensateScrollRef.current = true;
        setIsVisible(true);
        observer.disconnect();
      },
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  useLayoutEffect(() => {
    if (!isVisible || !shouldCompensateScrollRef.current) return;
    shouldCompensateScrollRef.current = false;
    const el = sectionRef.current;
    if (!el) return;
    const delta = el.offsetHeight - minHeight;
    if (delta <= 0) return;
    const top = el.getBoundingClientRect().top;
    if (top < 0) {
      window.scrollTo({ top: window.scrollY + delta, behavior: "instant" });
    }
  }, [isVisible, minHeight]);

  return (
    <div ref={sectionRef} className={className}>
      {isVisible ? (
        children
      ) : (
        <div
          className="w-full animate-pulse bg-gradient-to-b from-gray-900/60 to-black/40"
          style={{ minHeight }}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default DeferredSection;
