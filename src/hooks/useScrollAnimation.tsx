import { useEffect, useRef, useCallback, useState } from 'react';

// Dynamic GSAP imports with fallbacks
let gsap: any;
let ScrollTrigger: any;

const initGsap = async () => {
  try {
    const gsapModule = await import('gsap');
    const scrollTriggerModule = await import('gsap/ScrollTrigger');
    const scrollToModule = await import('gsap/ScrollToPlugin');
    
    gsap = gsapModule.default || gsapModule;
    ScrollTrigger = scrollTriggerModule.ScrollTrigger;
    const ScrollToPlugin = scrollToModule.ScrollToPlugin;
    
    if (gsap && ScrollTrigger && ScrollToPlugin) {
      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
      
      // Expose globally for components
      (window as any).gsap = gsap;
      (window as any).ScrollTrigger = ScrollTrigger;
    }
  } catch (error) {
    console.warn('GSAP failed to load:', error);
    // Provide fallbacks
    gsap = {
      fromTo: () => ({ kill: () => {} }),
      to: () => ({ kill: () => {} }),
      timeline: () => ({ kill: () => {} }),
      registerPlugin: () => {}
    };
    ScrollTrigger = {
      create: () => ({ kill: () => {} }),
      getAll: () => []
    };
    (window as any).gsap = gsap;
    (window as any).ScrollTrigger = ScrollTrigger;
  }
};

interface ScrollAnimationOptions {
  trigger?: string | HTMLElement;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
  onUpdate?: (progress: number) => void;
  onToggle?: (isActive: boolean) => void;
}

export const useScrollAnimation = (
  animation: (element: HTMLElement) => any,
  options: ScrollAnimationOptions = {}
) => {
  const elementRef = useRef<HTMLElement>(null);
  const animationRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);

  const initAnimation = useCallback(async () => {
    if (!elementRef.current || !isReady) return;

    try {
      const element = elementRef.current;
      animationRef.current = animation(element);

      if (ScrollTrigger && ScrollTrigger.create) {
        ScrollTrigger.create({
          trigger: options.trigger || element,
          start: options.start || "top bottom-=100",
          end: options.end || "bottom top+=100",
          scrub: options.scrub || false,
          pin: options.pin || false,
          markers: options.markers || false,
          animation: animationRef.current,
          onUpdate: (self: any) => {
            options.onUpdate?.(self.progress);
          },
          onToggle: (self: any) => {
            options.onToggle?.(self.isActive);
          },
          invalidateOnRefresh: true,
        });
      }
    } catch (error) {
      console.warn('Animation failed:', error);
    }
  }, [animation, options, isReady]);

  useEffect(() => {
    initGsap().then(() => setIsReady(true));
  }, []);

  useEffect(() => {
    if (!isReady) return;
    
    const timer = setTimeout(initAnimation, 100);
    return () => {
      clearTimeout(timer);
      if (animationRef.current?.kill) {
        animationRef.current.kill();
      }
      if (ScrollTrigger?.getAll) {
        ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill?.());
      }
    };
  }, [initAnimation, isReady]);

  return elementRef;
};

// Utility functions for common animations
export const fadeInUp = (element: HTMLElement) => {
  const windowGsap = (window as any).gsap;
  if (!windowGsap || !element) return { kill: () => {} };
  
  try {
    return windowGsap.fromTo(
      element,
      { 
        opacity: 0, 
        y: 60,
        scale: 0.95
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out"
      }
    );
  } catch (error) {
    console.warn('fadeInUp animation failed:', error);
    return { kill: () => {} };
  }
};

export const staggerFadeIn = (elements: NodeListOf<Element> | Element[]) => {
  const windowGsap = (window as any).gsap;
  if (!windowGsap) return { kill: () => {} };

  return windowGsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 40,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out"
    }
  );
};

export const parallaxMove = (element: HTMLElement, distance = 100) => {
  const windowGsap = (window as any).gsap;
  if (!windowGsap) return { kill: () => {} };

  return windowGsap.fromTo(
    element,
    { y: -distance },
    { y: distance, ease: "none" }
  );
};

export const morphBackground = (element: HTMLElement, colors: string[]) => {
  const windowGsap = (window as any).gsap;
  if (!windowGsap) return { kill: () => {} };

  const tl = windowGsap.timeline();
  colors.forEach((color, index) => {
    tl.to(element, {
      background: color,
      duration: 1,
      ease: "power2.inOut"
    }, index);
  });
  return tl;
};

export const cardFlip = (element: HTMLElement) => {
  const windowGsap = (window as any).gsap;
  if (!windowGsap) return { kill: () => {} };

  return windowGsap.fromTo(
    element,
    {
      rotationY: -90,
      opacity: 0,
      transformOrigin: "center"
    },
    {
      rotationY: 0,
      opacity: 1,
      duration: 0.8,
      ease: "back.out(1.7)"
    }
  );
};

export const magneticHover = (element: HTMLElement, strength = 0.3) => {
  const onMouseMove = (e: MouseEvent) => {
    const windowGsap = (window as any).gsap;
    if (!windowGsap) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    
    windowGsap.to(element, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const onMouseLeave = () => {
    const windowGsap = (window as any).gsap;
    if (!windowGsap) return;

    windowGsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)"
    });
  };

  element.addEventListener('mousemove', onMouseMove);
  element.addEventListener('mouseleave', onMouseLeave);

  return () => {
    element.removeEventListener('mousemove', onMouseMove);
    element.removeEventListener('mouseleave', onMouseLeave);
  };
};