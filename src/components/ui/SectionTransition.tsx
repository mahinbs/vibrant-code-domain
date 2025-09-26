import React, { ReactNode, useEffect, useRef } from 'react';

interface SectionTransitionProps {
  children: ReactNode;
  className?: string;
  fromGradient?: string;
  toGradient?: string;
  type?: 'fade' | 'scale' | 'slide' | 'mask';
}

export const SectionTransition: React.FC<SectionTransitionProps> = ({
  children,
  className = '',
  fromGradient = 'from-black to-gray-900',
  toGradient = 'from-gray-900 to-black',
  type = 'fade'
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animateTransition = async () => {
      try {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        
        gsap.registerPlugin(ScrollTrigger);

        if (!sectionRef.current) return;

        // Check for reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const section = sectionRef.current;
        
        // Create background layers for gradient transition
        const fromLayer = document.createElement('div');
        const toLayer = document.createElement('div');
        
        fromLayer.className = `absolute inset-0 bg-gradient-to-b ${fromGradient}`;
        toLayer.className = `absolute inset-0 bg-gradient-to-b ${toGradient}`;
        
        fromLayer.style.zIndex = '1';
        toLayer.style.zIndex = '2';
        toLayer.style.opacity = '0';
        
        section.style.position = 'relative';
        section.insertBefore(fromLayer, section.firstChild);
        section.insertBefore(toLayer, section.firstChild);

        // Animate gradient transition
        gsap.to(toLayer, {
          opacity: 1,
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1
          }
        });

        // Section content animation based on type
        const content = Array.from(section.children).filter(child => 
          child !== fromLayer && child !== toLayer
        );

        switch (type) {
          case 'scale':
            gsap.fromTo(content, 
              { scale: 0.9, opacity: 0.8 },
              { 
                scale: 1, 
                opacity: 1,
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: section,
                  start: "top 80%",
                  toggleActions: "play none none reverse"
                }
              }
            );
            break;
            
          case 'slide':
            gsap.fromTo(content,
              { x: 50, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power2.out",
                stagger: 0.1,
                scrollTrigger: {
                  trigger: section,
                  start: "top 80%",
                  toggleActions: "play none none reverse"
                }
              }
            );
            break;
            
          default: // fade
            gsap.fromTo(content,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                stagger: 0.1,
                scrollTrigger: {
                  trigger: section,
                  start: "top 80%",
                  toggleActions: "play none none reverse"
                }
              }
            );
        }
      } catch (error) {
        console.warn('Section transition animation failed:', error);
      }
    };

    animateTransition();
  }, [fromGradient, toGradient, type]);

  return (
    <div ref={sectionRef} className={`relative overflow-hidden ${className}`}>
      {children}
    </div>
  );
};