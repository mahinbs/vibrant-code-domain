import { useEffect, useRef, useCallback } from 'react';

interface ScrollAnimationOptions {
  trigger?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
}

export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<any>(null);

  const createAnimation = useCallback(async () => {
    try {
      // Dynamically import GSAP to avoid SSR issues
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      
      gsap.registerPlugin(ScrollTrigger);

      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      if (prefersReducedMotion) {
        // Provide simple fade-in for accessibility
        if (elementRef.current) {
          gsap.set(elementRef.current, { opacity: 1, y: 0 });
        }
        return;
      }

      if (elementRef.current) {
        animationRef.current = gsap.fromTo(
          elementRef.current,
          { 
            opacity: 0, 
            y: 50,
            scale: 0.98
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: elementRef.current,
              start: options.start || "top 80%",
              end: options.end || "bottom 20%",
              scrub: options.scrub || false,
              pin: options.pin || false,
              onEnter: options.onEnter,
              onLeave: options.onLeave,
              markers: false // Set to true for debugging
            }
          }
        );
      }
    } catch (error) {
      console.warn('GSAP animation failed:', error);
      // Fallback: ensure element is visible
      if (elementRef.current) {
        elementRef.current.style.opacity = '1';
        elementRef.current.style.transform = 'translateY(0)';
      }
    }
  }, [options]);

  useEffect(() => {
    // Ensure element is visible first
    if (elementRef.current) {
      elementRef.current.style.opacity = '1';
    }
    
    // Small delay to ensure DOM is ready
    const timeout = setTimeout(createAnimation, 10);

    return () => {
      clearTimeout(timeout);
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [createAnimation]);

  // Staggered animation for multiple children
  const staggerFadeIn = useCallback(async (selector: string, delay = 0.1) => {
    try {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      
      gsap.registerPlugin(ScrollTrigger);

      const elements = elementRef.current?.querySelectorAll(selector);
      if (!elements) return;

      gsap.fromTo(
        elements,
        { 
          opacity: 0, 
          y: 30,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: elementRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    } catch (error) {
      console.warn('Stagger animation failed:', error);
    }
  }, []);

  return { elementRef, staggerFadeIn };
};