
import { useEffect, useRef, useCallback } from 'react';

interface UseParallaxOptions {
  speed?: number;
  offset?: number;
  disabled?: boolean;
}

export const useParallax = <T extends HTMLElement = HTMLElement>({ speed = 0.5, offset = 0, disabled = false }: UseParallaxOptions = {}) => {
  const elementRef = useRef<T>(null);
  const frameRef = useRef<number>();

  const updateParallax = useCallback(() => {
    if (!elementRef.current || disabled) return;

    const element = elementRef.current;
    const rect = element.getBoundingClientRect();
    const scrollY = window.pageYOffset;
    
    // Calculate parallax offset
    const yPos = (rect.top + scrollY) * speed + offset;
    element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    element.style.willChange = 'transform';
  }, [speed, offset, disabled]);

  const handleScroll = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
    
    frameRef.current = requestAnimationFrame(updateParallax);
  }, [updateParallax]);

  useEffect(() => {
    if (disabled) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [handleScroll, disabled]);

  return elementRef;
};
