import React, { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  distance?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 1,
  distance = 50
}) => {
  const { elementRef } = useScrollAnimation();

  React.useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // Light path for reduced motion/mobile: no GSAP import, just intersection-based CSS transition.
    if (prefersReducedMotion || isMobile) {
      const directions = {
        up: { x: 0, y: distance * 0.5 },
        down: { x: 0, y: -distance * 0.5 },
        left: { x: distance * 0.5, y: 0 },
        right: { x: -distance * 0.5, y: 0 }
      };
      const from = directions[direction];

      el.style.opacity = '0';
      el.style.transform = `translate3d(${from.x}px, ${from.y}px, 0)`;
      el.style.transition = `opacity ${Math.max(0.3, duration * 0.75)}s ease, transform ${Math.max(0.3, duration * 0.75)}s ease`;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          el.style.opacity = '1';
          el.style.transform = 'translate3d(0, 0, 0)';
          observer.disconnect();
        },
        { rootMargin: '80px', threshold: 0.05 }
      );
      observer.observe(el);

      return () => observer.disconnect();
    }

    // Fallback timeout to ensure content is always visible
    const fallbackTimeout = setTimeout(() => {
      if (elementRef.current) {
        elementRef.current.style.opacity = '1';
        elementRef.current.style.transform = 'translate3d(0, 0, 0)';
      }
    }, 120);

    const animateElement = async () => {
      try {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        
        gsap.registerPlugin(ScrollTrigger);

        if (!elementRef.current) return;

        // Direction mappings
        const directions = {
          up: { x: 0, y: distance },
          down: { x: 0, y: -distance },
          left: { x: distance, y: 0 },
          right: { x: -distance, y: 0 }
        };

        const from = directions[direction];

        // Set initial state only after GSAP is ready
        gsap.set(elementRef.current, {
          opacity: 0,
          x: from.x,
          y: from.y,
          scale: 0.98
        });

        gsap.to(elementRef.current, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: elementRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse"
          }
        });

        clearTimeout(fallbackTimeout);
      } catch (error) {
        console.warn('ScrollReveal animation failed:', error);
        // Fallback
        if (elementRef.current) {
          elementRef.current.style.opacity = '1';
          elementRef.current.style.transform = 'translate3d(0, 0, 0)';
        }
        clearTimeout(fallbackTimeout);
      }
    };

    animateElement();

    return () => {
      clearTimeout(fallbackTimeout);
    };
  }, [direction, delay, duration, distance]);

  return (
    <div ref={elementRef} className={`opacity-100 ${className}`} style={{ opacity: 1 }}>
      {children}
    </div>
  );
};