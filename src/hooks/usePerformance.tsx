
import { useEffect, useCallback, useRef } from 'react';

type GenericFn<T extends unknown[] = unknown[]> = (...args: T) => void;

export const usePerformance = () => {
  const scrollRAF = useRef<number>();
  const lastScrollTime = useRef<number>(0);
  const lastScrollY = useRef<number>(0);
  const scrollVelocity = useRef<number>(0);
  const observerMap = useRef<Map<Element, IntersectionObserver>>(new Map());

  const preloadResource = useCallback(
    (href: string, as: string, priority: 'high' | 'low' = 'low') => {
      if (document.querySelector(`link[rel="preload"][href="${href}"]`)) return;
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = as;
      if (priority === 'high') link.setAttribute('fetchpriority', 'high');
      document.head.appendChild(link);
    },
    []
  );

  const optimizeImages = useCallback(() => {
    const images = document.querySelectorAll<HTMLImageElement>('img[data-src]');
    if (!images.length || !('IntersectionObserver' in window)) return;

    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        });
      },
      { rootMargin: '50px', threshold: 0.01 }
    );

    images.forEach((img) => imageObserver.observe(img));
  }, []);

  const throttleScroll = useCallback((callback: () => void) => {
    if (scrollRAF.current) cancelAnimationFrame(scrollRAF.current);
    scrollRAF.current = requestAnimationFrame(() => {
      const now = performance.now();
      const currentScrollY = window.scrollY;
      const deltaTime = now - lastScrollTime.current;
      const deltaY = Math.abs(currentScrollY - lastScrollY.current);
      if (deltaTime > 0) scrollVelocity.current = deltaY / deltaTime;
      lastScrollTime.current = now;
      lastScrollY.current = currentScrollY;
      callback();
    });
  }, []);

  const debounce = useCallback(
    <T extends unknown[]>(
      func: GenericFn<T>,
      wait: number,
      immediate = false
    ) => {
      let timeoutId: number | undefined;
      return (...args: T) => {
        const later = () => {
          timeoutId = undefined;
          if (!immediate) func(...args);
        };
        const callNow = immediate && timeoutId === undefined;
        if (timeoutId !== undefined) window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(later, wait);
        if (callNow) func(...args);
      };
    },
    []
  );

  const optimizeScrollPerformance = useCallback(() => {
    // Keep as explicit opt-in, no global behavior by default.
    return () => {};
  }, []);

  const getScrollVelocity = useCallback(() => scrollVelocity.current, []);

  const createOptimizedObserver = useCallback(
    (
      callback: IntersectionObserverCallback,
      options: IntersectionObserverInit = {}
    ) => {
      const throttledCallback: IntersectionObserverCallback = (entries, observer) => {
        if (scrollRAF.current) cancelAnimationFrame(scrollRAF.current);
        scrollRAF.current = requestAnimationFrame(() => callback(entries, observer));
      };
      return new IntersectionObserver(throttledCallback, {
        rootMargin: '80px',
        threshold: 0.1,
        ...options,
      });
    },
    []
  );

  const cleanupObservers = useCallback(() => {
    observerMap.current.forEach((observer) => observer.disconnect());
    observerMap.current.clear();
  }, []);

  const enableLazyLoading = useCallback(
    (selector: string) => {
      const elements = document.querySelectorAll(selector);
      if (!elements.length) return;
      const observer = createOptimizedObserver((entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            element.style.contentVisibility = 'visible';
            element.classList.add('loaded');
          }
        });
      });

      elements.forEach((element) => {
        observer.observe(element);
        observerMap.current.set(element, observer);
      });
    },
    [createOptimizedObserver]
  );

  useEffect(() => {
    return () => {
      cleanupObservers();
      if (scrollRAF.current) cancelAnimationFrame(scrollRAF.current);
    };
  }, [cleanupObservers]);

  return {
    preloadResource,
    optimizeImages,
    debounce,
    throttleScroll,
    optimizeScrollPerformance,
    getScrollVelocity,
    createOptimizedObserver,
    enableLazyLoading,
    cleanupObservers,
  };
};
