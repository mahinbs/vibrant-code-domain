
import { useEffect, useCallback, useRef } from 'react';

export const usePerformance = () => {
  const scrollRAF = useRef<number>();
  const lastScrollTime = useRef<number>(0);
  const lastScrollY = useRef<number>(0);
  const scrollVelocity = useRef<number>(0);
  const observerMap = useRef<Map<Element, IntersectionObserver>>(new Map());

  // Enhanced preload resource with priority hints
  const preloadResource = useCallback((href: string, as: string, priority: 'high' | 'low' = 'low') => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (priority === 'high') {
      link.setAttribute('fetchpriority', 'high');
    }
    document.head.appendChild(link);
  }, []);

  // Enhanced image optimization with progressive loading
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
        rootMargin: '50px',
        threshold: 0.01
      });

      images.forEach(img => imageObserver.observe(img));
    }
  }, []);

  // High-performance scroll throttling with velocity calculation
  const throttleScroll = useCallback((callback: () => void) => {
    if (scrollRAF.current) {
      cancelAnimationFrame(scrollRAF.current);
    }
    
    scrollRAF.current = requestAnimationFrame(() => {
      const now = performance.now();
      const currentScrollY = window.scrollY;
      const deltaTime = now - lastScrollTime.current;
      const deltaY = Math.abs(currentScrollY - lastScrollY.current);
      
      // Calculate scroll velocity (pixels per millisecond)
      if (deltaTime > 0) {
        scrollVelocity.current = deltaY / deltaTime;
      }
      
      lastScrollTime.current = now;
      lastScrollY.current = currentScrollY;
      callback();
    });
  }, []);

  // Enhanced debounce with immediate execution option
  const debounce = useCallback((func: Function, wait: number, immediate = false) => {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func(...args);
    };
  }, []);

  // Enhanced scroll performance optimization
  const optimizeScrollPerformance = useCallback(() => {
    // Remove will-change from elements not currently animating
    const optimizeWillChange = () => {
      const elements = document.querySelectorAll('[style*="will-change"]');
      elements.forEach(element => {
        const htmlElement = element as HTMLElement;
        if (scrollVelocity.current < 1) {
          htmlElement.style.willChange = 'auto';
        }
      });
    };

    // Add performance hints to heavy elements
    const heavyElements = document.querySelectorAll('.backdrop-blur-xl, .animate-pulse, .hero-section, .review-card');
    heavyElements.forEach(element => {
      const htmlElement = element as HTMLElement;
      htmlElement.style.contain = 'layout style paint';
      htmlElement.style.contentVisibility = 'auto';
    });

    // Optimize video elements for scroll performance
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      video.style.contain = 'layout style paint';
      video.style.contentVisibility = 'auto';
    });

    // Debounced will-change optimization
    const debouncedOptimize = debounce(optimizeWillChange, 100);
    window.addEventListener('scroll', debouncedOptimize, { passive: true });

    return () => {
      window.removeEventListener('scroll', debouncedOptimize);
      if (scrollRAF.current) {
        cancelAnimationFrame(scrollRAF.current);
      }
    };
  }, [debounce]);

  // Get current scroll velocity for performance decisions
  const getScrollVelocity = useCallback(() => {
    return scrollVelocity.current;
  }, []);

  // Enhanced intersection observer with better performance
  const createOptimizedObserver = useCallback((
    callback: IntersectionObserverCallback,
    options: IntersectionObserverInit = {}
  ) => {
    const throttledCallback: IntersectionObserverCallback = (entries, observer) => {
      // Skip processing during fast scrolling
      if (scrollVelocity.current > 5) {
        return;
      }

      if (scrollRAF.current) {
        cancelAnimationFrame(scrollRAF.current);
      }
      
      scrollRAF.current = requestAnimationFrame(() => {
        callback(entries, observer);
      });
    };

    const observer = new IntersectionObserver(throttledCallback, {
      rootMargin: '100px',
      threshold: [0, 0.1, 0.5, 1],
      ...options
    });

    return observer;
  }, []);

  // Memory cleanup for observers
  const cleanupObservers = useCallback(() => {
    observerMap.current.forEach(observer => {
      observer.disconnect();
    });
    observerMap.current.clear();
  }, []);

  // Lazy loading with content visibility
  const enableLazyLoading = useCallback((selector: string) => {
    const elements = document.querySelectorAll(selector);
    
    const observer = createOptimizedObserver((entries) => {
      entries.forEach(entry => {
        const element = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          element.style.contentVisibility = 'visible';
          element.classList.add('loaded');
        } else {
          element.style.contentVisibility = 'auto';
        }
      });
    });

    elements.forEach(element => {
      observer.observe(element);
      observerMap.current.set(element, observer);
    });
  }, [createOptimizedObserver]);

  useEffect(() => {
    // Initialize performance optimizations
    optimizeImages();
    const cleanup = optimizeScrollPerformance();

    // Apply global performance optimizations
    document.documentElement.style.scrollBehavior = 'auto';
    
    // Enable lazy loading for heavy sections
    enableLazyLoading('.hero-section, .about-section, .portfolio-section');
    
    // Clean up on unmount
    return () => {
      cleanup();
      cleanupObservers();
      if (scrollRAF.current) {
        cancelAnimationFrame(scrollRAF.current);
      }
    };
  }, [optimizeImages, optimizeScrollPerformance, enableLazyLoading, cleanupObservers]);

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
