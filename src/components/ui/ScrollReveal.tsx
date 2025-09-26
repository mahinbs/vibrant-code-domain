import React, { ReactNode, useEffect, useRef } from 'react';
import { useScrollAnimation, fadeInUp, staggerFadeIn } from '@/hooks/useScrollAnimation';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'stagger';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  triggerOnce?: boolean;
  threshold?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  distance = 60,
  className = '',
  triggerOnce = true,
  threshold = 0.1
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const animation = (element: HTMLElement) => {
    const childElements = element.querySelectorAll('[data-reveal]');
    
    if (direction === 'stagger' && childElements.length > 0) {
      return staggerFadeIn(childElements);
    }

    let fromVars: any = { opacity: 0 };
    let toVars: any = { opacity: 1, duration, delay, ease: "power2.out" };

    switch (direction) {
      case 'up':
        fromVars.y = distance;
        toVars.y = 0;
        break;
      case 'down':
        fromVars.y = -distance;
        toVars.y = 0;
        break;
      case 'left':
        fromVars.x = distance;
        toVars.x = 0;
        break;
      case 'right':
        fromVars.x = -distance;
        toVars.x = 0;
        break;
      case 'scale':
        fromVars.scale = 0.8;
        toVars.scale = 1;
        break;
    }

    return gsap.fromTo(element, fromVars, toVars);
  };

  const elementRef = useScrollAnimation(animation, {
    start: `top bottom-=${100 - threshold * 100}`,
    markers: false
  });

  useEffect(() => {
    if (containerRef.current) {
      elementRef.current = containerRef.current;
    }
  }, [elementRef]);

  // Auto-add data-reveal to direct children for stagger effect
  const enhancedChildren = direction === 'stagger' 
    ? React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...child.props,
            'data-reveal': true,
            key: index
          } as any);
        }
        return child;
      })
    : children;

  return (
    <div 
      ref={containerRef}
      className={`scroll-reveal ${className}`}
      style={{ 
        opacity: 0,
        transform: direction === 'scale' ? 'scale(0.8)' : undefined
      }}
    >
      {enhancedChildren}
    </div>
  );
};

export default ScrollReveal;