
import { useEffect, useCallback, useRef } from 'react';

export const usePerformance = () => {
  const scrollRAF = useRef<number>();

  // Preload critical resources
  const preloadResource = useCallback((href: string, as: string) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    document.head.appendChild(link);
  }, []);

  // Optimize images loading with intersection observer
  const optimizeImages = useCallback(() => {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src || '';
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px'
      });

      images.forEach(img => imageObserver.observe(img));
    }
  }, []);

  // Optimized scroll throttling with RAF
  const throttleScroll = useCallback((callback: () => void) => {
    if (scrollRAF.current) {
      cancelAnimationFrame(scrollRAF.current);
    }
    
    scrollRAF.current = requestAnimationFrame(callback);
  }, []);

  // Debounce function optimized for performance
  const debounce = useCallback((func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }, []);

  // Optimize scroll performance
  const optimizeScrollPerformance = useCallback(() => {
    // Add passive listeners for better scroll performance
    const addPassiveListener = (element: Element, event: string, handler: EventListener) => {
      element.addEventListener(event, handler, { passive: true });
    };

    // Apply performance optimizations to heavy elements
    const heavyElements = document.querySelectorAll('.backdrop-blur-xl, .animate-pulse');
    heavyElements.forEach(element => {
      (element as HTMLElement).style.willChange = 'auto';
      (element as HTMLElement).style.contain = 'layout style paint';
    });

    return () => {
      if (scrollRAF.current) {
        cancelAnimationFrame(scrollRAF.current);
      }
    };
  }, []);

  useEffect(() => {
    // Initialize performance optimizations
    optimizeImages();
    const cleanup = optimizeScrollPerformance();

    // Preload critical fonts (if any)
    // preloadResource('/fonts/critical-font.woff2', 'font');

    // Clean up on unmount
    return () => {
      cleanup();
    };
  }, [optimizeImages, optimizeScrollPerformance, preloadResource]);

  return {
    preloadResource,
    optimizeImages,
    debounce,
    throttleScroll,
    optimizeScrollPerformance,
  };
};
