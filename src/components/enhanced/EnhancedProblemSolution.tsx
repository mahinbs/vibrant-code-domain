import React from 'react';
import { X, CheckCircle, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionTransition from '@/components/ui/SectionTransition';
import ParallaxContainer from '@/components/ui/ParallaxContainer';

const challengeSolutions = [
  {
    challenge: "Struggling with outdated systems that limit your growth potential",
    solution: "Modern, scalable solutions that grow with your business"
  },
  {
    challenge: "Manual processes eating up valuable time and resources", 
    solution: "AI-powered automation that handles repetitive tasks efficiently"
  },
  {
    challenge: "Poor online presence affecting customer acquisition",
    solution: "Professional web applications that convert visitors into customers"
  },
  {
    challenge: "Disconnected tools and workflows causing inefficiencies",
    solution: "Integrated systems that streamline your entire operation"
  },
  {
    challenge: "Lack of data insights for informed business decisions",
    solution: "Smart analytics and reporting that drive strategic growth"
  }
];

const EnhancedProblemSolution = () => {
  // Problem to solution transformation animation
  const transformAnimation = (element: HTMLElement) => {
    const windowGsap = (window as any).gsap;
    if (!windowGsap) return { kill: () => {} };

    const problems = element.querySelectorAll('.problem-item');
    const solutions = element.querySelectorAll('.solution-item');
    
    const tl = windowGsap.timeline();
    
    // Initial state - show problems
    tl.set(solutions, { opacity: 0, x: 100, rotationY: -90 })
      .set(problems, { opacity: 1, x: 0, rotationY: 0 })
      
      // Transform sequence
      .to(problems, {
        opacity: 0.3,
        x: -50,
        rotationY: 45,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      })
      .to(solutions, {
        opacity: 1,
        x: 0,
        rotationY: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.2)"
      }, "-=0.4")
      
      // Background transformation
      .to('.transformation-bg', {
        scale: 1.1,
        opacity: 0.8,
        duration: 1.5,
        ease: "power2.inOut"
      }, 0);
    
    return tl;
  };

  const containerRef = React.useRef<HTMLDivElement>(null);

  useScrollAnimation(transformAnimation, {
    trigger: containerRef.current,
    start: "top center+=100",
    end: "bottom center-=100",
    scrub: 1
  });

  const handleGetStarted = () => {
    const contactForm = document.getElementById('contact-form');
    const windowGsap = (window as any).gsap;
    if (contactForm && windowGsap) {
      windowGsap.to(window, {
        duration: 1,
        scrollTo: { y: contactForm, offsetY: 80 },
        ease: "power2.inOut"
      });
    }
  };

  const handleScheduleCall = () => {
    const finalForm = document.getElementById('final-contact-form');
    const windowGsap = (window as any).gsap;
    if (finalForm && windowGsap) {
      windowGsap.to(window, {
        duration: 1,
        scrollTo: { y: finalForm, offsetY: 80 },
        ease: "power2.inOut"
      });
    }
  };

  return (
    <SectionTransition
      id="problem-solution"
      fromGradient="from-black via-gray-900 to-black"
      toGradient="from-gray-900 via-slate-800 to-black"
      transitionType="gradient"
      className="py-24 relative"
    >
      {/* Background with Parallax */}
      <ParallaxContainer
        layers={[
          {
            speed: 0.3,
            children: (
              <div className="transformation-bg absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-green-500/5 opacity-50" />
            )
          },
          {
            speed: 0.6,
            children: (
              <div className="absolute inset-0">
                {/* Animated geometric shapes */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-red-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-green-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
            )
          }
        ]}
        className="absolute inset-0"
      />

      <div ref={containerRef} className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-400 to-green-400 bg-clip-text text-transparent">
                From Problems to Solutions
              </span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Stop letting technology challenges hold your business back. Watch how we transform your biggest pain points into competitive advantages.
            </p>
          </div>
        </ScrollReveal>

        {/* Problems vs Solutions Grid */}
        <div className="max-w-6xl mx-auto mb-16">
          <ScrollReveal direction="stagger" delay={0.4}>
            {challengeSolutions.map((item, index) => (
              <div key={index} className="grid md:grid-cols-2 gap-8 mb-8 items-center">
                {/* Problem */}
                <div className="problem-item group">
                  <div className="flex items-start space-x-4 p-6 rounded-2xl bg-red-500/5 border border-red-500/20 backdrop-blur-sm transform transition-all duration-300 group-hover:scale-105">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                      <X className="w-5 h-5 text-red-400" />
                    </div>
                    <p className="text-gray-300 leading-relaxed">{item.challenge}</p>
                  </div>
                </div>

                {/* Transformation Arrow */}
                <div className="flex justify-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:rotate-12">
                    <ArrowRight className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Solution */}
                <div className="solution-item group">
                  <div className="flex items-start space-x-4 p-6 rounded-2xl bg-green-500/5 border border-green-500/20 backdrop-blur-sm transform transition-all duration-300 group-hover:scale-105">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <p className="text-gray-300 leading-relaxed">{item.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </ScrollReveal>
        </div>

        {/* CTA Section */}
        <ScrollReveal direction="up" delay={0.8}>
          <div className="text-center">
            <div className="max-w-3xl mx-auto mb-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Transform Your Business Challenges?
              </h3>
              <p className="text-lg text-gray-300">
                Let's discuss your specific situation and create a tailored solution that drives real results.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleGetStarted}
                className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/25 transform hover:scale-105"
              >
                <span>Get Free Consultation</span>
                <ArrowRight className="inline-block ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              
              <button 
                onClick={handleScheduleCall}
                className="px-8 py-4 border border-cyan-400/30 rounded-xl font-semibold hover:bg-cyan-500/10 transition-all duration-300 hover:border-cyan-400/50"
              >
                Schedule a Strategy Call
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </SectionTransition>
  );
};

export default EnhancedProblemSolution;