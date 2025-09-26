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
    const animateElement = async () => {
      try {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        
        gsap.registerPlugin(ScrollTrigger);

        if (!elementRef.current) return;

        // Check for reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
          gsap.set(elementRef.current, { opacity: 1, x: 0, y: 0 });
          return;
        }

        // Direction mappings
        const directions = {
          up: { x: 0, y: distance },
          down: { x: 0, y: -distance },
          left: { x: distance, y: 0 },
          right: { x: -distance, y: 0 }
        };

        const from = directions[direction];

        gsap.fromTo(
          elementRef.current,
          { 
            opacity: 0,
            x: from.x,
            y: from.y,
            scale: 0.98
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration,
            delay,
            ease: "power2.out",
            scrollTrigger: {
              trigger: elementRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      } catch (error) {
        console.warn('ScrollReveal animation failed:', error);
        // Fallback
        if (elementRef.current) {
          elementRef.current.style.opacity = '1';
          elementRef.current.style.transform = 'translate3d(0, 0, 0)';
        }
      }
    };

    animateElement();
  }, [direction, delay, duration, distance]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};