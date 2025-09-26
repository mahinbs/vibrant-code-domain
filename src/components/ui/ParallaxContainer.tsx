import React, { ReactNode, useRef, useEffect } from 'react';
import { parallaxMove } from '@/hooks/useScrollAnimation';

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
    
    // Simple CSS-based parallax fallback
    layerElements.forEach((element, index) => {
      const layer = layers[index];
      if (!layer) return;

      const speed = layer.speed;
      const htmlElement = element as HTMLElement;
      
      // Apply CSS transform for basic parallax
      htmlElement.style.transform = `translateZ(0) translateY(${-50 * (1 - speed)}px)`;
      htmlElement.style.transition = 'transform 0.1s ease-out';
    });

    // Cleanup function
    return () => {
      layerElements.forEach((element) => {
        const htmlElement = element as HTMLElement;
        htmlElement.style.transform = '';
        htmlElement.style.transition = '';
      });
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