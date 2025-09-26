import React from 'react';
import { 
  Code, 
  Smartphone, 
  Brain, 
  Database, 
  Palette, 
  Cloud,
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react';
import { useScrollAnimation, cardFlip, magneticHover } from '@/hooks/useScrollAnimation';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionTransition from '@/components/ui/SectionTransition';
import ParallaxContainer from '@/components/ui/ParallaxContainer';
import { useEffect, useRef } from 'react';

const services = [
  {
    icon: Code,
    title: 'Web Applications',
    description: 'Custom web apps that scale with your business growth',
    features: ['React & Next.js', 'Cloud-native', 'Mobile responsive'],
    gradient: 'from-blue-500 to-cyan-500',
    delay: 0
  },
  {
    icon: Smartphone,
    title: 'Mobile Development', 
    description: 'Native and cross-platform mobile solutions',
    features: ['iOS & Android', 'React Native', 'Performance optimized'],
    gradient: 'from-purple-500 to-pink-500',
    delay: 0.1
  },
  {
    icon: Brain,
    title: 'AI Integration',
    description: 'Intelligent automation and AI-powered features',
    features: ['Machine Learning', 'ChatGPT API', 'Automation workflows'],
    gradient: 'from-green-500 to-teal-500',
    delay: 0.2
  },
  {
    icon: Database,
    title: 'Backend Systems',
    description: 'Scalable APIs and robust database solutions',
    features: ['REST & GraphQL', 'Cloud databases', 'Real-time sync'],
    gradient: 'from-orange-500 to-red-500',
    delay: 0.3
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Beautiful interfaces that users love to interact with',
    features: ['User research', 'Figma designs', 'Conversion focused'],
    gradient: 'from-pink-500 to-rose-500',
    delay: 0.4
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'Scalable infrastructure and deployment strategies',
    features: ['AWS & Vercel', 'Auto-scaling', 'Performance monitoring'],
    gradient: 'from-indigo-500 to-purple-500',
    delay: 0.5
  }
];

const EnhancedServices = () => {
  const servicesRef = useRef<HTMLDivElement>(null);
  const serviceCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Sequential card flip animation
  const servicesAnimation = (element: HTMLElement) => {
    const windowGsap = (window as any).gsap;
    if (!windowGsap) return { kill: () => {} };

    const cards = element.querySelectorAll('.service-card');
    const tl = windowGsap.timeline();

    cards.forEach((card, index) => {
      tl.fromTo(card,
        {
          rotationY: -90,
          opacity: 0,
          scale: 0.8,
          transformOrigin: 'center'
        },
        {
          rotationY: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)"
        },
        index * 0.15
      );
    });

    // Background tech elements
    tl.fromTo('.tech-particle',
      { scale: 0, opacity: 0, rotation: 0 },
      { 
        scale: 1, 
        opacity: 0.6, 
        rotation: 360,
        duration: 2,
        stagger: 0.2,
        ease: "power2.out" 
      },
      "-=1"
    );

    return tl;
  };

  useScrollAnimation(servicesAnimation, {
    trigger: servicesRef.current,
    start: "top bottom-=100",
    end: "bottom top"
  });

  // Magnetic hover effects for service cards
  useEffect(() => {
    serviceCardRefs.current.forEach((card) => {
      if (card) {
        magneticHover(card, 0.15);
      }
    });
  }, []);

  const handleServiceClick = (serviceName: string) => {
    // Navigate to specific service page or show details
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

  return (
    <SectionTransition
      id="services"
      fromGradient="from-gray-900 via-slate-800 to-black"
      toGradient="from-slate-800 via-gray-900 to-black"
      transitionType="gradient"
      className="py-24 relative"
    >
      {/* Background with floating tech elements */}
      <ParallaxContainer
        layers={[
          {
            speed: 0.2,
            children: (
              <div className="absolute inset-0">
                {/* Tech particles */}
                <div className="tech-particle absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-2xl" />
                <div className="tech-particle absolute top-1/3 right-1/3 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-xl" />
                <div className="tech-particle absolute bottom-1/4 left-1/3 w-40 h-40 bg-gradient-to-br from-green-500/10 to-transparent rounded-full blur-3xl" />
                <div className="tech-particle absolute bottom-1/3 right-1/4 w-28 h-28 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full blur-xl" />
              </div>
            )
          },
          {
            speed: 0.5,
            children: (
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />
            )
          }
        ]}
        className="absolute inset-0"
      />

      <div ref={servicesRef} className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-500/10 border border-cyan-400/20 rounded-full text-cyan-300 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Our Expertise</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Comprehensive Tech Solutions
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 leading-relaxed">
              From concept to deployment, we deliver end-to-end technology solutions that transform your business operations and drive sustainable growth.
            </p>
          </div>
        </ScrollReveal>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => (serviceCardRefs.current[index] = el)}
              className="service-card group cursor-pointer"
              onClick={() => handleServiceClick(service.title)}
            >
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 backdrop-blur-sm transition-all duration-500 hover:border-gray-600/50 hover:shadow-2xl hover:shadow-cyan-500/10 overflow-hidden">
                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Icon with animation */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-400">
                      <Zap className="w-3 h-3 text-cyan-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="flex items-center space-x-2 text-cyan-400 font-medium group-hover:text-cyan-300 transition-colors duration-300">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal direction="up" delay={0.6}>
          <div className="text-center">
            <div className="max-w-2xl mx-auto mb-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Not Sure Which Service You Need?
              </h3>
              <p className="text-lg text-gray-300">
                Let's discuss your project requirements and recommend the best solution for your business goals.
              </p>
            </div>

            <button 
              onClick={() => handleServiceClick('consultation')}
              className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/25 transform hover:scale-105"
            >
              <span>Get Free Consultation</span>
              <ArrowRight className="inline-block ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </SectionTransition>
  );
};

export default EnhancedServices;