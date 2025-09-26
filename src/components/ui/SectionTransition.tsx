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
    switch (transitionType) {
      case 'gradient':
        return gsap.to(element, {
          background: `linear-gradient(135deg, ${toGradient.replace('from-', '').replace('to-', '').split(' via-')})`,
          duration: 1,
          ease: "power2.inOut"
        });
      
      case 'slide':
        return gsap.fromTo(element,
          { x: direction === 'horizontal' ? '100%' : 0, y: direction === 'vertical' ? '100%' : 0 },
          { x: 0, y: 0, duration: 1.2, ease: "power3.out" }
        );
      
      case 'fade':
        return gsap.fromTo(element,
          { opacity: 0 },
          { opacity: 1, duration: 1, ease: "power2.out" }
        );
      
      case 'scale':
        return gsap.fromTo(element,
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.2)" }
        );
      
      case 'mask':
        return gsap.fromTo(element,
          { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
          { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 1, ease: "power2.out" }
        );
      
      default:
        return gsap.fromTo(element,
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
        background: `linear-gradient(135deg, ${fromGradient})`,
        willChange: 'transform, opacity'
      }}
    >
      {children}
      
      {/* Animated separator */}
      <div className="absolute bottom-0 left-0 w-full h-px">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent animate-pulse" />
      </div>
    </div>
  );
};

export default SectionTransition;