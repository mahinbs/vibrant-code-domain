import React, { useEffect, useRef, memo } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useParallax } from "@/hooks/useParallax";

const EnhancedHero = memo(() => {
  const navigate = useNavigate();
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Parallax backgrounds
  const backgroundRef = useParallax<HTMLDivElement>({ speed: 0.5 });
  const particleRef = useParallax<HTMLDivElement>({ speed: 0.8 });

  const handleGetConsultation = async () => {
    try {
      const { gsap } = await import('gsap');
      const { ScrollToPlugin } = await import('gsap/ScrollToPlugin');
      
      gsap.registerPlugin(ScrollToPlugin);
      
      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: "#contact-form", offsetY: 50 },
        ease: "power2.inOut"
      });
    } catch {
      // Fallback to native scroll
      const element = document.getElementById('contact-form');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Enhanced VANTA background with scroll interaction
  useEffect(() => {
    const initVanta = () => {
      if (vantaRef.current && window.VANTA && !vantaEffect.current) {
        // Check for reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
          // Simple gradient fallback
          if (vantaRef.current) {
            vantaRef.current.style.background = 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)';
          }
          return;
        }

        try {
          vantaEffect.current = window.VANTA.WAVES({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0x16,
            shininess: 67.0,
            waveHeight: 18.0,
            waveSpeed: 0.9,
            zoom: 1.16,
          });
        } catch (error) {
          console.warn('VANTA initialization failed:', error);
          // Fallback gradient
          if (vantaRef.current) {
            vantaRef.current.style.background = 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)';
          }
        }
      }
    };

    // Initialize immediately if VANTA is available, otherwise wait
    if (window.VANTA) {
      initVanta();
    } else {
      const checkVanta = setInterval(() => {
        if (window.VANTA) {
          initVanta();
          clearInterval(checkVanta);
        }
      }, 100);

      return () => clearInterval(checkVanta);
    }

    return () => {
      if (vantaEffect.current) {
        try {
          vantaEffect.current.destroy();
          vantaEffect.current = null;
        } catch (error) {
          console.warn('VANTA cleanup error:', error);
        }
      }
    };
  }, []);

  // Hero text morphing animation
  useEffect(() => {
    const animateHero = async () => {
      try {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        
        gsap.registerPlugin(ScrollTrigger);

        if (!heroRef.current) return;

        // Check for reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        // Hero content staggered animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });

        tl.fromTo(".hero-title", 
          { opacity: 0, y: 50, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power2.out" }
        )
        .fromTo(".hero-subtitle",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.8"
        )
        .fromTo(".hero-cta",
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out" }, "-=0.6"
        )
        .fromTo(".hero-trust",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.1 }, "-=0.4"
        );

      } catch (error) {
        console.warn('Hero animation failed:', error);
      }
    };

    animateHero();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-section pb-24 bg-black"
    >
      {/* Enhanced VANTA Background */}
      <div
        ref={vantaRef}
        className="w-full h-full absolute inset-0"
      />

      {/* Parallax background layers */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5"
      />

      {/* Enhanced animated particles */}
      <div
        ref={particleRef}
        className="absolute inset-0 z-10"
      >
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-60" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-40" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping opacity-50" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-300 rounded-full animate-pulse opacity-30" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Main content */}
      <div className="relative z-20 container mx-auto px-6 pt-28">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h1 className="hero-title text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Custom Software Development &
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {" "}AI Solutions
              </span>
              <br />
              <span className="text-4xl md:text-6xl">to Accelerate Your Growth</span>
            </h1>
          </ScrollReveal>
            
          <ScrollReveal delay={0.2} direction="up">
            <p className="hero-subtitle text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed max-w-3xl mx-auto">
              From Web Apps to AI Automation, Mobile Apps to SaaS – delivered by expert developers & AI specialists.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4} direction="up">
            <div className="hero-cta flex flex-col items-center mb-8">
              <button
                onClick={handleGetConsultation}
                className="group relative bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-12 py-6 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 font-semibold text-lg flex items-center space-x-3 shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105"
              >
                <span>Get Free Consultation (24hr Reply)</span>
                <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
              </button>
            </div>
          </ScrollReveal>

          {/* Enhanced trust bar with staggered animation */}
          <ScrollReveal delay={0.6} direction="up">
            <div className="hero-trust flex flex-wrap justify-center items-center gap-6 md:gap-8 text-sm md:text-base text-gray-300">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">★★★★★</span>
                <span>4.9/5 Rating</span>
              </div>
              <div className="text-gray-500">|</div>
              <div className="flex items-center space-x-2">
                <span>🚀</span>
                <span>500+ Projects Delivered</span>
              </div>
              <div className="text-gray-500">|</div>
              <div className="flex items-center space-x-2">
                <span>⚡</span>
                <span>24hr Response Guarantee</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
});

EnhancedHero.displayName = "EnhancedHero";
export default EnhancedHero;