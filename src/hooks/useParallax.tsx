
import { useEffect, useRef, useCallback } from 'react';
import { usePerformance } from './usePerformance';

interface UseParallaxOptions {
  speed?: number;
  offset?: number;
  disabled?: boolean;
}

export const useParallax = ({ speed = 0.5, offset = 0, disabled = false }: UseParallaxOptions = {}) => {
  const elementRef = useRef<HTMLElement>(null);
  const { throttleScroll, getScrollVelocity } = usePerformance();
  const frameRef = useRef<number>();

  const updateParallax = useCallback(() => {
    if (!elementRef.current || disabled) return;

    const element = elementRef.current;
    const rect = element.getBoundingClientRect();
    const scrollY = window.pageYOffset;
    const velocity = getScrollVelocity();

    // Skip expensive operations during fast scrolling
    if (velocity > 5) {
      element.style.willChange = 'auto';
      return;
    }

    element.style.willChange = 'transform';
    
    // Calculate parallax offset
    const yPos = (rect.top + scrollY) * speed + offset;
    element.style.transform = `translate3d(0, ${yPos}px, 0)`;
  }, [speed, offset, disabled, getScrollVelocity]);

  const handleScroll = useCallback(() => {
    throttleScroll(updateParallax);
  }, [throttleScroll, updateParallax]);

  useEffect(() => {
    if (disabled) return;

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
