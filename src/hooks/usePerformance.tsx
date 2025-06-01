
import { useEffect, useCallback } from 'react';

export const usePerformance = () => {
  // Preload critical resources
  const preloadResource = useCallback((href: string, as: string) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    document.head.appendChild(link);
  }, []);

  // Optimize images loading
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
      });

      images.forEach(img => imageObserver.observe(img));
    }
  }, []);

  // Debounce scroll events for better performance
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

  useEffect(() => {
    // Initialize performance optimizations
    optimizeImages();

    // Preload critical fonts (if any)
    // preloadResource('/fonts/critical-font.woff2', 'font');

    // Clean up on unmount
    return () => {
      // Cleanup if needed
    };
  }, [optimizeImages, preloadResource]);

  return {
    preloadResource,
    optimizeImages,
    debounce,
  };
};
