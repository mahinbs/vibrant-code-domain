import React, { ReactNode, useRef, useEffect } from 'react';
import { useScrollAnimation, morphBackground } from '@/hooks/useScrollAnimation';

interface SectionTransitionProps {
  children: ReactNode;
  fromGradient?: string;
  toGradient?: string;
  className?: string;
  transitionType?: 'gradient' | 'slide' | 'fade' | 'scale' | 'mask';
  direction?: 'horizontal' | 'vertical';
  id?: string;
}

const SectionTransition: React.FC<SectionTransitionProps> = ({
  children,
  fromGradient = 'from-black via-gray-900 to-black',
  toGradient = 'from-gray-900 via-black to-gray-900',
  className = '',
  transitionType = 'gradient',
  direction = 'vertical',
  id
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const animation = (element: HTMLElement) => {
    const windowGsap = (window as any).gsap;
    if (!windowGsap) return { kill: () => {} };

    const fromLayer = element.querySelector('.gradient-from') as HTMLElement;
    const toLayer = element.querySelector('.gradient-to') as HTMLElement;

    switch (transitionType) {
      case 'gradient':
        if (fromLayer && toLayer) {
          return windowGsap.fromTo(toLayer,
            { opacity: 0 },
            { opacity: 1, duration: 1, ease: "power2.inOut" }
          );
        }
        return { kill: () => {} };
      
      case 'slide':
        return windowGsap.fromTo(element,
          { x: direction === 'horizontal' ? '100%' : 0, y: direction === 'vertical' ? '100%' : 0 },
          { x: 0, y: 0, duration: 1.2, ease: "power3.out" }
        );
      
      case 'fade':
        return windowGsap.fromTo(element,
          { opacity: 0 },
          { opacity: 1, duration: 1, ease: "power2.out" }
        );
      
      case 'scale':
        return windowGsap.fromTo(element,
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.2)" }
        );
      
      case 'mask':
        return windowGsap.fromTo(element,
          { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
          { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 1, ease: "power2.out" }
        );
      
      default:
        return windowGsap.fromTo(element,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        );
    }
  };

  const elementRef = useScrollAnimation(animation, {
    start: "top bottom-=200",
    end: "top center",
    scrub: transitionType === 'gradient'
  });

  useEffect(() => {
    if (sectionRef.current) {
      elementRef.current = sectionRef.current;
    }
  }, [elementRef]);

  return (
    <div 
      ref={sectionRef}
      id={id}
      className={`section-transition relative ${className}`}
      style={{
        willChange: 'transform, opacity'
      }}
    >
      {/* Background gradient layers */}
      <div className={`gradient-from absolute inset-0 bg-gradient-to-br ${fromGradient}`} />
      <div className={`gradient-to absolute inset-0 bg-gradient-to-br ${toGradient} opacity-0`} />
      
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Animated separator */}
      <div className="absolute bottom-0 left-0 w-full h-px z-20">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent animate-pulse" />
      </div>
    </div>
  );
};

export default SectionTransition;