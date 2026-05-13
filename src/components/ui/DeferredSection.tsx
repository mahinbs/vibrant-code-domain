import { ReactNode, useEffect, useRef, useState } from "react";

type DeferredSectionProps = {
  children: ReactNode;
  className?: string;
  rootMargin?: string;
  minHeight?: number;
};

const DeferredSection = ({
  children,
  className,
  rootMargin = "300px 0px",
  minHeight = 420,
}: DeferredSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { rootMargin, threshold: 0.01 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

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
