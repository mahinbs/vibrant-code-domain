
import { useEffect, useCallback, useRef } from 'react';

export const usePerformance = () => {
  const scrollRAF = useRef<number>();
  const lastScrollTime = useRef<number>(0);
  const scrollVelocity = useRef<number>(0);

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
        rootMargin: '100px',
        threshold: 0.01
      });

      images.forEach(img => imageObserver.observe(img));
    }
  }, []);

  // High-performance scroll throttling with RAF
  const throttleScroll = useCallback((callback: () => void) => {
    if (scrollRAF.current) {
      cancelAnimationFrame(scrollRAF.current);
    }
    
    scrollRAF.current = requestAnimationFrame(() => {
      const now = performance.now();
      const deltaTime = now - lastScrollTime.current;
      
      // Calculate scroll velocity for performance decisions
      if (deltaTime > 0) {
        scrollVelocity.current = Math.abs(window.scrollY - (lastScrollTime.current || 0)) / deltaTime;
      }
      
      lastScrollTime.current = now;
      callback();
    });
  }, []);

  // Optimized debounce for performance-critical operations
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

  // Enhanced scroll performance optimization
  const optimizeScrollPerformance = useCallback(() => {
    // Add high-performance passive listeners
    const addPassiveListener = (element: Element, event: string, handler: EventListener) => {
      element.addEventListener(event, handler, { passive: true });
    };

    // Optimize heavy elements with performance hints
    const heavyElements = document.querySelectorAll('.backdrop-blur-xl, .animate-pulse, .hero-section');
    heavyElements.forEach(element => {
      const htmlElement = element as HTMLElement;
      htmlElement.style.contain = 'layout style paint';
      htmlElement.style.contentVisibility = 'auto';
      htmlElement.style.willChange = 'auto';
    });

    // Optimize video elements for scroll performance
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      video.style.contain = 'layout style paint';
      video.style.contentVisibility = 'auto';
    });

    return () => {
      if (scrollRAF.current) {
        cancelAnimationFrame(scrollRAF.current);
      }
    };
  }, []);

  // Get current scroll velocity for performance decisions
  const getScrollVelocity = useCallback(() => {
    return scrollVelocity.current;
  }, []);

  // Optimize intersection observers with throttling
  const createOptimizedObserver = useCallback((
    callback: IntersectionObserverCallback,
    options: IntersectionObserverInit = {}
  ) => {
    const throttledCallback: IntersectionObserverCallback = (entries, observer) => {
      if (scrollRAF.current) {
        cancelAnimationFrame(scrollRAF.current);
      }
      
      scrollRAF.current = requestAnimationFrame(() => {
        callback(entries, observer);
      });
    };

    return new IntersectionObserver(throttledCallback, {
      rootMargin: '50px',
      threshold: 0.1,
      ...options
    });
  }, []);

  useEffect(() => {
    // Initialize performance optimizations
    optimizeImages();
    const cleanup = optimizeScrollPerformance();

    // Apply global performance optimizations
    document.documentElement.style.scrollBehavior = 'auto';
    
    // Clean up on unmount
    return () => {
      cleanup();
      if (scrollRAF.current) {
        cancelAnimationFrame(scrollRAF.current);
      }
    };
  }, [optimizeImages, optimizeScrollPerformance]);

  return {
    preloadResource,
    optimizeImages,
    debounce,
    throttleScroll,
    optimizeScrollPerformance,
    getScrollVelocity,
    createOptimizedObserver,
  };
};
