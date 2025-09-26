import React, { ReactNode, useRef, useEffect } from 'react';
import { useScrollAnimation, parallaxMove } from '@/hooks/useScrollAnimation';

interface ParallaxLayer {
  speed: number;
  children: ReactNode;
  className?: string;
}

interface ParallaxContainerProps {
  layers: ParallaxLayer[];
  className?: string;
  height?: string;
}

const ParallaxContainer: React.FC<ParallaxContainerProps> = ({
  layers,
  className = '',
  height = 'auto'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const layerElements = containerRef.current.querySelectorAll('[data-parallax-layer]');
    
    layerElements.forEach((element, index) => {
      const layer = layers[index];
      if (!layer) return;

      const distance = 100 * (1 - layer.speed);
      
      gsap.registerPlugin(ScrollTrigger);
      
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        animation: parallaxMove(element as HTMLElement, distance),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [layers]);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ height }}
    >
      {layers.map((layer, index) => (
        <div
          key={index}
          data-parallax-layer
          className={`absolute inset-0 ${layer.className || ''}`}
          style={{
            willChange: 'transform'
          }}
        >
          {layer.children}
        </div>
      ))}
    </div>
  );
};

export default ParallaxContainer;