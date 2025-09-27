import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle, ArrowRight, X, Zap, Target, TrendingUp, Shield } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const challengeSolutions = [
  {
    id: 1,
    icon: Zap,
    challenge: "Outdated systems slowing growth?",
    solution: "We modernize your tech with scalable web & mobile applications.",
    color: "from-orange-500 to-red-500",
    accentColor: "orange"
  },
  {
    id: 2,
    icon: Target,
    challenge: "Manual processes wasting time & money?",
    solution: "We automate workflows using AI-powered solutions that save hours every week.",
    color: "from-purple-500 to-pink-500",
    accentColor: "purple"
  },
  {
    id: 3,
    icon: TrendingUp,
    challenge: "Competitors thriving with mobile apps while you're left behind?",
    solution: "We build native iOS & Android apps to help you stay ahead in the market.",
    color: "from-blue-500 to-cyan-500",
    accentColor: "blue"
  },
  {
    id: 4,
    icon: Shield,
    challenge: "Missing out on AI opportunities?",
    solution: "We integrate AI chatbots, automation, and smart calling systems tailored to your business.",
    color: "from-emerald-500 to-teal-500",
    accentColor: "emerald"
  },
  {
    id: 5,
    icon: Zap,
    challenge: "Poor user experience losing customers?",
    solution: "We craft intuitive UI/UX designs that keep users engaged and converting.",
    color: "from-pink-500 to-rose-500",
    accentColor: "pink"  
  },
  {
    id: 6,
    icon: Target,
    challenge: "Legacy software holding you back?",
    solution: "We create custom SaaS & enterprise platforms that future-proof your operations.",
    color: "from-indigo-500 to-purple-500",
    accentColor: "indigo"
  },
  {
    id: 7,
    icon: TrendingUp,
    challenge: "No insights to make smart decisions?",
    solution: "We deliver advanced data analytics and BI dashboards to unlock clarity from your data.",
    color: "from-cyan-500 to-blue-500",
    accentColor: "cyan"
  },
  {
    id: 8,
    icon: Shield,
    challenge: "Scaling challenges with current tech?",
    solution: "We architect flexible, scalable systems with Blockchain, AR/VR & IoT innovations.",
    color: "from-teal-500 to-emerald-500",
    accentColor: "teal"
  }
];

// Interactive Card Component
const ProblemSolutionCard = ({ item, index }: { item: typeof challengeSolutions[0], index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const IconComponent = item.icon;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const setupScrollTrigger = async () => {
      try {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        
        gsap.registerPlugin(ScrollTrigger);

        if (!cardRef.current) return;

        // Check for reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        ScrollTrigger.create({
          trigger: cardRef.current,
          start: "center 80%",
          end: "center 20%",
          onEnter: () => setIsFlipped(true),
          onLeave: () => setIsFlipped(false),
          onEnterBack: () => setIsFlipped(true),
          onLeaveBack: () => setIsFlipped(false),
        });
      } catch (error) {
        console.warn('Card scroll trigger failed:', error);
      }
    };

    setupScrollTrigger();
  }, [isMobile]);

  return (
    <div 
      ref={cardRef}
      className="flip-card-container group"
      onMouseEnter={() => !isMobile && setIsFlipped(true)}
      onMouseLeave={() => !isMobile && setIsFlipped(false)}
    >
      <div className={`flip-card ${isFlipped ? 'flipped' : ''} relative w-full h-48 transition-transform duration-700 transform-style-preserve-3d cursor-pointer`}>
        {/* Problem Side (Front) */}
        <div className="flip-card-front absolute inset-0 backface-hidden bg-gradient-to-br from-gray-900/80 to-black/60 backdrop-blur-sm border border-red-400/20 rounded-2xl p-4 flex flex-col justify-center items-center text-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/20 border border-red-400/30 mb-3">
            <X className="h-6 w-6 text-red-400" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Problem</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            {item.challenge}
          </p>
          {!isMobile && (
            <div className="absolute bottom-4 text-gray-500 text-sm">
              Hover to see solution →
            </div>
          )}
        </div>

        {/* Solution Side (Back) */}
        <div className={`flip-card-back absolute inset-0 backface-hidden bg-gradient-to-br ${item.color} rounded-2xl p-4 flex flex-col justify-center items-center text-center transform rotate-y-180`}>
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm mb-3">
            <IconComponent className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Solution</h3>
          <p className="text-white/90 text-sm leading-relaxed font-medium">
            {item.solution}
          </p>
          <CheckCircle className="h-5 w-5 text-white mt-3 opacity-80" />
        </div>

        {/* Glow Effect */}
        <div className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
          isFlipped 
            ? `bg-gradient-to-r ${item.color} opacity-20 blur-xl scale-110` 
            : 'bg-red-500/10 opacity-10 blur-xl scale-110'
        }`} />
      </div>
    </div>
  );
};

const EnhancedProblemSolution = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setupAnimations = async () => {
      try {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        
        gsap.registerPlugin(ScrollTrigger);

        if (!containerRef.current) return;

        // Check for reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        // Background animation
        const backgroundElements = containerRef.current.querySelectorAll('.transform-bg');
        gsap.to(backgroundElements, {
          rotation: 360,
          duration: 40,
          repeat: -1,
          ease: "none"
        });

        // Cards entrance animation
        const cards = containerRef.current.querySelectorAll('.flip-card-container');
        gsap.fromTo(cards, 
          { 
            opacity: 0,
            y: 60,
            scale: 0.8
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );

      } catch (error) {
        console.warn('Problem solution animations failed:', error);
      }
    };

    setupAnimations();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="py-12 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
      id="problem-solution"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5" />
      <div className="absolute inset-0 opacity-30">
        <div className="transform-bg absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl" />
        <div className="transform-bg absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
        <div className="transform-bg absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-r from-emerald-400/15 to-teal-500/15 rounded-full blur-2xl" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Struggling With Technology That{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Holds Your Business Back
              </span>
              ?
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-4">
              We've helped 500+ businesses overcome these exact challenges with smart, AI-powered solutions.
            </p>
            <p className="text-lg text-cyan-400 font-medium">
              Hover over cards to see how we solve each problem →
            </p>
          </div>
        </ScrollReveal>

        {/* Interactive Problem-Solution Cards Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challengeSolutions.map((item, index) => (
              <ScrollReveal key={item.id} delay={index * 0.1}>
                <ProblemSolutionCard item={item} index={index} />
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Enhanced CTA with animation */}
        <ScrollReveal delay={0.8}>
          <div className="text-center mt-10 pt-6">
            <div className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-full mb-6">
              <p className="text-xl text-cyan-400 font-medium">
                Ready to transform these challenges into opportunities?
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#contact-form"
                className="group inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
              >
                <span>Get Free Consultation</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              <a 
                href="#contact-form"
                className="group inline-flex items-center space-x-2 px-8 py-4 border border-cyan-400/30 text-white rounded-xl font-semibold hover:bg-cyan-500/10 transition-all duration-300"
              >
                <span>Schedule a Call</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        .flip-card-container {
          perspective: 1000px;
        }
        
        .flip-card {
          transform-style: preserve-3d;
        }
        
        .flip-card.flipped {
          transform: rotateY(180deg);
        }
        
        .flip-card-front,
        .flip-card-back {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        
        .flip-card-back {
          transform: rotateY(180deg);
        }
        
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
};

export default EnhancedProblemSolution;