import React, { useEffect, useRef } from 'react';
import { CheckCircle, ArrowRight, X } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const challengeSolutions = [
  {
    challenge: "Outdated systems slowing growth?",
    solution: "We modernize your tech with scalable web & mobile applications."
  },
  {
    challenge: "Manual processes wasting time & money?",
    solution: "We automate workflows using AI-powered solutions that save hours every week."
  },
  {
    challenge: "Competitors thriving with mobile apps while you're left behind?",
    solution: "We build native iOS & Android apps to help you stay ahead in the market."
  },
  {
    challenge: "Missing out on AI opportunities?",
    solution: "We integrate AI chatbots, automation, and smart calling systems tailored to your business."
  },
  {
    challenge: "Poor user experience losing customers?",
    solution: "We craft intuitive UI/UX designs that keep users engaged and converting."
  },
  {
    challenge: "Legacy software holding you back?",
    solution: "We create custom SaaS & enterprise platforms that future-proof your operations."
  },
  {
    challenge: "No insights to make smart decisions?",
    solution: "We deliver advanced data analytics and BI dashboards to unlock clarity from your data."
  },
  {
    challenge: "Scaling challenges with current tech?",
    solution: "We architect flexible, scalable systems with Blockchain, AR/VR & IoT innovations."
  }
];

const EnhancedProblemSolution = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { elementRef, staggerFadeIn } = useScrollAnimation();

  useEffect(() => {
    // Trigger staggered animations for problem-solution pairs
    staggerFadeIn('.problem-solution-item', 0.15);
  }, [staggerFadeIn]);

  useEffect(() => {
    const animateTransform = async () => {
      try {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        
        gsap.registerPlugin(ScrollTrigger);

        if (!containerRef.current) return;

        // Check for reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        // Problems fade out, solutions fade in animation
        const items = containerRef.current.querySelectorAll('.problem-solution-item');
        
        items.forEach((item, index) => {
          const problem = item.querySelector('.problem');
          const solution = item.querySelector('.solution');
          
          if (problem && solution) {
            gsap.timeline({
              scrollTrigger: {
                trigger: item,
                start: "top 80%",
                end: "bottom 60%",
                scrub: 1,
                toggleActions: "play none none reverse"
              }
            })
            .fromTo(problem, 
              { opacity: 1, x: 0 },
              { opacity: 0.3, x: -30, duration: 1 }
            )
            .fromTo(solution,
              { opacity: 0.7, x: 30 },
              { opacity: 1, x: 0, duration: 1 }, "<"
            );
          }
        });

        // Background transformation animation
        const backgroundElements = containerRef.current.querySelectorAll('.transform-bg');
        gsap.to(backgroundElements, {
          rotation: 5,
          scale: 1.05,
          duration: 20,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });

      } catch (error) {
        console.warn('Problem solution animation failed:', error);
      }
    };

    animateTransform();
  }, []);

  return (
    <section 
      ref={elementRef}
      className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
      id="problem-solution"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5" />
      <div className="absolute inset-0 opacity-20">
        <div className="transform-bg absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl" />
        <div className="transform-bg absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 rounded-full blur-3xl" />
      </div>
      
      <div ref={containerRef} className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Struggling With Technology That{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Holds Your Business Back
              </span>
              ?
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              We've helped 500+ businesses overcome these exact challenges with smart, AI-powered solutions.
            </p>
          </div>
        </ScrollReveal>

        {/* Enhanced problem-solution pairs */}
        <div className="max-w-4xl mx-auto space-y-8">
          {challengeSolutions.map((item, index) => (
            <ScrollReveal 
              key={index} 
              delay={index * 0.1}
              className="problem-solution-item"
            >
              <div className="relative p-6 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-700/30 hover:border-cyan-400/30 transition-all duration-300">
                {/* Problem */}
                <div className="problem flex items-start space-x-3 mb-4">
                  <X className="h-5 w-5 text-red-400/60 flex-shrink-0 mt-1" />
                  <p className="text-gray-400 text-lg font-medium">{item.challenge}</p>
                </div>
                
                {/* Solution */}
                <div className="solution flex items-start space-x-3 ml-8">
                  <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                  <p className="text-white text-xl font-semibold leading-relaxed">
                    {item.solution}
                  </p>
                </div>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Enhanced CTA with animation */}
        <ScrollReveal delay={0.8}>
          <div className="text-center mt-16 pt-8">
            <p className="text-xl text-cyan-400 mb-6 font-medium">
              If you're facing any of these challenges, let's solve them together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#contact-form"
                className="group inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105"
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
    </section>
  );
};

export default EnhancedProblemSolution;