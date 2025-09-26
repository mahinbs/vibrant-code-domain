import React, { useEffect, useRef, memo } from 'react';
import { Star, ArrowDown } from 'lucide-react';
import { useScrollAnimation, staggerFadeIn, magneticHover } from '@/hooks/useScrollAnimation';
import ParallaxContainer from '@/components/ui/ParallaxContainer';
import ScrollReveal from '@/components/ui/ScrollReveal';

declare global {
  interface Window {
    VANTA?: any;
  }
}

const EnhancedHero = memo(() => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const ctaButtonRef = useRef<HTMLButtonElement>(null);

  // Particle system initialization
  useEffect(() => {
    let vantaEffect: any = null;

    const initVanta = () => {
      if (window.VANTA && vantaRef.current && !vantaEffect.current) {
        vantaEffect.current = window.VANTA.WAVES({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x0f172a,
          shininess: 30.0,
          waveHeight: 15.0,
          waveSpeed: 0.75,
          zoom: 0.8
        });
      }
    };

    // Load VANTA script
    if (!window.VANTA) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js';
      script.onload = initVanta;
      document.head.appendChild(script);
    } else {
      initVanta();
    }

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  // Magnetic hover effect for CTA button
  useEffect(() => {
    if (ctaButtonRef.current) {
      const cleanup = magneticHover(ctaButtonRef.current, 0.2);
      return cleanup;
    }
  }, []);

  // Hero text morphing animation
  const heroAnimation = (element: HTMLElement) => {
    const tl = gsap.timeline();
    
    tl.fromTo('.hero-title .word', 
      { 
        opacity: 0, 
        y: 100, 
        rotationX: -90,
        transformOrigin: '50% 100%' 
      },
      { 
        opacity: 1, 
        y: 0, 
        rotationX: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }
    )
    .fromTo('.hero-subtitle',
      { opacity: 0, y: 50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo('.trust-elements',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      "-=0.3"
    );

    return tl;
  };

  useScrollAnimation(heroAnimation, { 
    start: "top top",
    end: "bottom top",
    scrub: 1 
  });

  const handleGetConsultation = () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToNext = () => {
    const nextSection = document.getElementById('problem-solution');
    if (nextSection) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: nextSection, offsetY: 0 },
        ease: "power2.inOut"
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <ParallaxContainer
        layers={[
          {
            speed: 0.2,
            children: (
              <div 
                ref={vantaRef} 
                className="absolute inset-0 opacity-40"
                style={{ zIndex: 1 }}
              />
            )
          },
          {
            speed: 0.5,
            children: (
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10" />
            )
          },
          {
            speed: 0.8,
            children: (
              <div className="absolute inset-0 bg-black/60" />
            )
          }
        ]}
        className="absolute inset-0"
      />

      {/* Content */}
      <div ref={heroRef} className="relative z-10 container mx-auto px-6 text-center">
        <ScrollReveal direction="scale" delay={0.2}>
          <div className="max-w-5xl mx-auto">
            {/* Main Headline with Morphing Animation */}
            <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="word inline-block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Transform
              </span>{' '}
              <span className="word inline-block">Your Business</span>{' '}
              <span className="word inline-block">with</span>{' '}
              <span className="word inline-block bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                Cutting-Edge
              </span>{' '}
              <span className="word inline-block">Solutions</span>
            </h1>

            {/* Enhanced Subtitle */}
            <p className="hero-subtitle text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              From AI automation to custom web applications, we deliver enterprise-grade technology solutions that drive real business growth and competitive advantage.
            </p>

            {/* CTA Button with Magnetic Effect */}
            <button 
              ref={ctaButtonRef}
              onClick={handleGetConsultation}
              className="group relative px-12 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/25 transform-gpu mb-12"
            >
              <span className="relative z-10">Get Free Consultation</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
            </button>
          </div>
        </ScrollReveal>

        {/* Trust Bar with Stagger Animation */}
        <ScrollReveal direction="stagger" delay={0.8}>
          <div className="trust-elements flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 max-w-4xl mx-auto">
            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-5 h-5 text-yellow-400 fill-current animate-pulse" 
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
              <span className="text-gray-300 font-medium">4.9/5 Rating</span>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-6 bg-gray-600"></div>

            {/* Projects */}
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">500+</div>
              <div className="text-gray-400 text-sm">Projects Delivered</div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-6 bg-gray-600"></div>

            {/* Response Time */}
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">24hrs</div>
              <div className="text-gray-400 text-sm">Response Time</div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Animated Scroll Indicator */}
      <ScrollReveal direction="up" delay={1.2}>
        <button 
          onClick={scrollToNext}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-cyan-400 transition-colors duration-300 animate-bounce"
        >
          <ArrowDown className="w-6 h-6" />
        </button>
      </ScrollReveal>
    </section>
  );
});

EnhancedHero.displayName = 'EnhancedHero';

export default EnhancedHero;