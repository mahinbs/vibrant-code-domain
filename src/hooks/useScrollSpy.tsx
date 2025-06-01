
import { useState, useEffect } from 'react';
import { usePerformance } from './usePerformance';

interface UseScrollSpyOptions {
  sectionIds: string[];
  rootMargin?: string;
  threshold?: number;
}

export const useScrollSpy = ({ sectionIds, rootMargin = '-50% 0px -50% 0px', threshold = 0.1 }: UseScrollSpyOptions) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const { createOptimizedObserver } = usePerformance();

  useEffect(() => {
    const observer = createOptimizedObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin,
        threshold,
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [sectionIds, rootMargin, threshold, createOptimizedObserver]);

  return activeSection;
};
