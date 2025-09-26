import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
  animation: (element: HTMLElement) => gsap.core.Timeline | gsap.core.Tween,
  options: ScrollAnimationOptions = {}
) => {
  const elementRef = useRef<HTMLElement>(null);
  const animationRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null);

  const initAnimation = useCallback(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    animationRef.current = animation(element);

    ScrollTrigger.create({
      trigger: options.trigger || element,
      start: options.start || "top bottom-=100",
      end: options.end || "bottom top+=100",
      scrub: options.scrub || false,
      pin: options.pin || false,
      markers: options.markers || false,
      animation: animationRef.current,
      onUpdate: (self) => {
        options.onUpdate?.(self.progress);
      },
      onToggle: (self) => {
        options.onToggle?.(self.isActive);
      },
      invalidateOnRefresh: true,
    });
  }, [animation, options]);

  useEffect(() => {
    const timer = setTimeout(initAnimation, 100);
    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        animationRef.current.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [initAnimation]);

  return elementRef;
};

// Utility functions for common animations
export const fadeInUp = (element: HTMLElement) => {
  return gsap.fromTo(
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
};

export const staggerFadeIn = (elements: NodeListOf<Element> | Element[]) => {
  return gsap.fromTo(
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
  return gsap.fromTo(
    element,
    { y: -distance },
    { y: distance, ease: "none" }
  );
};

export const morphBackground = (element: HTMLElement, colors: string[]) => {
  const tl = gsap.timeline();
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
  return gsap.fromTo(
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
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    
    gsap.to(element, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const onMouseLeave = () => {
    gsap.to(element, {
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