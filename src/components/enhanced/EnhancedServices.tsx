import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Code,
  Smartphone,
  Cloud,
  Brain,
  Zap,
  ChevronDown,
  Clock,
  DollarSign,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useGeoCurrency } from "@/hooks/useGeoCurrency";
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const services = [
  {
    id: "web-apps",
    icon: Code,
    title: "Web Applications",
    description: "Custom web applications built with cutting-edge technologies and responsive design.",
    detailedDescription: "Full-stack web applications built with React, Node.js, and modern frameworks. We create scalable, secure, and high-performance solutions tailored to your business needs.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: ["React & Next.js", "Real-time Features", "Cloud Integration", "Progressive Web Apps"],
    technologies: ["TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
    startingPrice: 5000,
    timeline: "4-12 weeks",
    color: "cyan",
    route: "/web-apps",
  },
  {
    id: "saas",
    icon: Cloud,
    title: "SAAS Solutions",
    description: "Scalable software-as-a-service platforms with subscription management and analytics.",
    detailedDescription: "Complete SAAS platforms with multi-tenancy, payment processing, analytics dashboards, and user management. Built for scale and optimized for recurring revenue.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: ["Multi-tenant Architecture", "Payment Integration", "Analytics Dashboard", "API Management"],
    technologies: ["React", "Stripe", "AWS", "Redis"],
    startingPrice: 15000,
    timeline: "8-16 weeks",
    color: "blue",
    route: "/saas",
  },
  {
    id: "mobile-apps",
    icon: Smartphone,
    title: "Mobile Applications",
    description: "Native and cross-platform mobile apps with intuitive user experiences.",
    detailedDescription: "iOS and Android applications built with React Native or native technologies. Focus on performance, user experience, and app store optimization.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: ["iOS & Android", "Cross-platform", "App Store Optimization", "Push Notifications"],
    technologies: ["React Native", "Swift", "Kotlin", "Firebase"],
    startingPrice: 10000,
    timeline: "6-14 weeks",
    color: "purple",
    route: "/mobile-apps",
  },
  {
    id: "ai-calling",
    icon: Brain,
    title: "AI Calling Agency",
    description: "Intelligent call automation systems with natural language processing capabilities.",
    detailedDescription: "Advanced AI-powered calling systems for lead generation, customer support, and sales automation. Featuring voice AI, sentiment analysis, and CRM integration.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: ["Voice AI", "Call Analytics", "Lead Generation", "CRM Integration"],
    technologies: ["OpenAI", "Twilio", "Python", "TensorFlow"],
    startingPrice: 8000,
    timeline: "6-10 weeks",
    color: "pink",
    route: "/ai-calling",
  },
  {
    id: "ai-automation",
    icon: Zap,
    title: "AI Automation",
    description: "Custom AI solutions to automate workflows and enhance business processes.",
    detailedDescription: "Intelligent automation solutions using machine learning and AI to streamline operations, reduce costs, and improve efficiency across your organization.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: ["Process Automation", "Machine Learning", "Data Analytics", "Workflow Integration"],
    technologies: ["Python", "TensorFlow", "AWS Lambda", "Zapier"],
    startingPrice: 12000,
    timeline: "8-12 weeks",
    color: "green",
    route: "/ai-automation",
  },
];

const colorClasses = {
  cyan: {
    border: "border-cyan-400/30",
    gradient: "from-cyan-400/10 to-cyan-600/10",
    icon: "bg-cyan-500/10 text-cyan-400 border-cyan-400/30",
    text: "text-cyan-400",
    button: "bg-cyan-500/20 border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/30",
    tag: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  },
  blue: {
    border: "border-blue-400/30",
    gradient: "from-blue-400/10 to-blue-600/10",
    icon: "bg-blue-500/10 text-blue-400 border-blue-400/30",
    text: "text-blue-400",
    button: "bg-blue-500/20 border-blue-400/30 text-blue-400 hover:bg-blue-500/30",
    tag: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  },
  purple: {
    border: "border-purple-400/30",
    gradient: "from-purple-400/10 to-purple-600/10",
    icon: "bg-purple-500/10 text-purple-400 border-purple-400/30",
    text: "text-purple-400",
    button: "bg-purple-500/20 border-purple-400/30 text-purple-400 hover:bg-purple-500/30",
    tag: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  },
  pink: {
    border: "border-pink-400/30",
    gradient: "from-pink-400/10 to-pink-600/10",
    icon: "bg-pink-500/10 text-pink-400 border-pink-400/30",
    text: "text-pink-400",
    button: "bg-pink-500/20 border-pink-400/30 text-pink-400 hover:bg-pink-500/30",
    tag: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  },
  green: {
    border: "border-green-400/30",
    gradient: "from-green-400/10 to-green-600/10",
    icon: "bg-green-500/10 text-green-400 border-green-400/30",
    text: "text-green-400",
    button: "bg-green-500/20 border-green-400/30 text-green-400 hover:bg-green-500/30",
    tag: "bg-green-500/20 text-green-300 border-green-500/30",
  },
};

const EnhancedServices = () => {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const { convertPrice } = useGeoCurrency();
  const containerRef = useRef<HTMLDivElement>(null);
  const { elementRef, staggerFadeIn } = useScrollAnimation();

  // Magnetic hover effect
  const magneticHover = useCallback((e: React.MouseEvent<HTMLDivElement>, cardRef: HTMLElement) => {
    const card = cardRef;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    card.style.transform = `perspective(1000px) rotateX(${y / 10}deg) rotateY(${-x / 10}deg) translateZ(10px)`;
  }, []);

  const resetMagnetic = useCallback((cardRef: HTMLElement) => {
    cardRef.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  }, []);

  // Removed staggered animation to prevent conflicts

  useEffect(() => {
    const animateFloatingElements = async () => {
      try {
        const { gsap } = await import('gsap');
        
        if (!containerRef.current) return;

        // Check for reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        // Only animate background floating elements - remove conflicting card animations
        const floatingElements = containerRef.current.querySelectorAll('.floating-element');
        floatingElements.forEach((element, index) => {
          gsap.to(element, {
            y: -20,
            rotation: 5,
            duration: 3 + index,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: index * 0.5
          });
        });

      } catch (error) {
        console.warn('Floating elements animation failed:', error);
      }
    };

    animateFloatingElements();
  }, []);

  const handleMouseEnter = useCallback((serviceId: string) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }

    const timeout = setTimeout(() => {
      setExpandedService(serviceId);
    }, 300);

    setHoverTimeout(timeout);
  }, [hoverTimeout]);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }

    const timeout = setTimeout(() => {
      setExpandedService(null);
    }, 200);

    setHoverTimeout(timeout);
  }, [hoverTimeout]);

  const toggleService = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  return (
    <section
      ref={elementRef}
      id="services"
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden"
    >
      {/* Enhanced background with floating tech elements */}
      <div className="absolute inset-0 z-0">
        <div className="floating-element absolute top-20 left-10 w-4 h-4 bg-cyan-400/20 rounded-full blur-sm" />
        <div className="floating-element absolute top-1/3 right-20 w-6 h-6 bg-blue-400/20 rounded-full blur-sm" />
        <div className="floating-element absolute bottom-1/4 left-1/4 w-3 h-3 bg-purple-400/20 rounded-full blur-sm" />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.08),transparent_60%)] z-10" />

      <div ref={containerRef} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Enhanced header */}
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <div className="mb-4">
              <p className="text-cyan-400 text-sm uppercase tracking-wider mb-2">
                The Boostmysites Advantage
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 px-4">
              Our Premium{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Services
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Discover the cutting-edge solutions that make industry leaders trust us with their most critical projects
            </p>
          </div>
        </ScrollReveal>

        {/* Enhanced services grid */}
        <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
          {services.map((service, index) => {
            const isExpanded = expandedService === service.id;
            const colors = colorClasses[service.color];

            return (
              <ScrollReveal 
                key={service.id}
                delay={index * 0.1}
                className="service-card"
              >
                <div
                  className={`group relative rounded-xl sm:rounded-2xl bg-gray-900/80 backdrop-blur-sm border ${colors.border} hover:bg-gray-800/90 transition-all duration-300 overflow-hidden`}
                  onMouseEnter={() => handleMouseEnter(service.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Mobile Layout */}
                  <div className="block lg:hidden">
                    <div className="p-4 sm:p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`service-icon w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${colors.icon} border flex items-center justify-center flex-shrink-0`}>
                          <service.icon className="h-6 w-6 sm:h-7 sm:w-7" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className={`text-xl sm:text-2xl font-bold text-white mb-2 group-hover:${colors.text} transition-colors duration-300`}>
                            {service.title}
                          </h3>
                          <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed text-sm sm:text-base">
                            {service.description}
                          </p>
                        </div>

                        <button
                          onClick={() => toggleService(service.id)}
                          className="flex-shrink-0"
                        >
                          <ChevronDown
                            className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.text} transform transition-transform duration-300 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4">
                        <div className={`px-3 py-2 rounded-lg ${colors.button} border text-xs sm:text-sm font-medium flex items-center space-x-2`}>
                          <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{service.timeline}</span>
                        </div>
                      </div>
                    </div>

                    {/* Mobile expanded content with enhanced animations */}
                    <div className={`overflow-hidden transition-all duration-400 ${isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
                      <div className="px-4 sm:px-6 pb-6 border-t border-gray-700/50">
                        <div className="space-y-6 mt-6">
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-3">About This Service</h4>
                            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                              {service.detailedDescription}
                            </p>
                          </div>

                          <div>
                            <h4 className="text-lg font-semibold text-white mb-4">Key Features</h4>
                            <ul className="space-y-3">
                              {service.features.map((feature, idx) => (
                                <li key={idx} className="text-gray-300 flex items-center text-sm sm:text-base">
                                  <div className={`w-2 h-2 rounded-full ${colors.text} mr-3 flex-shrink-0`} />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-lg font-semibold text-white mb-4">Technologies Used</h4>
                            <div className="flex flex-wrap gap-2">
                              {service.technologies.map((tech, idx) => (
                                <span key={idx} className={`px-3 py-1 rounded-full text-xs sm:text-sm ${colors.tag} border`}>
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <button className={`flex-1 inline-flex items-center justify-center px-4 py-3 rounded-xl ${colors.button} border font-medium transition-all duration-300 text-sm sm:text-base`}>
                              Book Free Demo
                            </button>
                            <div className="text-center">
                              <span className="px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-sm text-gray-300">
                                Custom Quote Available
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden lg:block">
                    {/* Desktop Main Content */}
                    <div className="flex items-center">
                      {/* Service Image */}
                      <div className="pl-3">
                        <div className="relative w-48 h-32 flex-shrink-0 overflow-hidden rounded-l-2xl">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                            decoding="async"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} opacity-60`} />
                          <div className={`service-icon absolute top-4 left-4 w-12 h-12 rounded-xl ${colors.icon} border flex items-center justify-center`}>
                            <service.icon className="h-6 w-6" />
                          </div>
                        </div>
                      </div>

                      {/* Desktop Content Section */}
                      <div className="flex-1 p-8">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className={`text-2xl font-bold text-white mb-2 group-hover:${colors.text} transition-colors duration-300`}>
                              {service.title}
                            </h3>
                            <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                              {service.description}
                            </p>
                          </div>

                          {/* Desktop Price & Timeline */}
                          <div className="flex items-center space-x-4 ml-8">
                            <div className={`px-4 py-2 rounded-lg ${colors.button} border text-sm font-medium flex items-center space-x-2`}>
                              <Clock className="h-4 w-4" />
                              <span>{service.timeline}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Expanded Content */}
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
                      <div className="px-8 pb-8 border-t border-gray-700/50">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                          {/* Desktop Detailed Description */}
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-4">About This Service</h4>
                            <p className="text-gray-300 leading-relaxed">
                              {service.detailedDescription}
                            </p>
                          </div>

                          {/* Desktop Features */}
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-4">Key Features</h4>
                            <ul className="space-y-3">
                              {service.features.map((feature, idx) => (
                                <li key={idx} className="text-gray-300 flex items-center">
                                  <div className={`w-2 h-2 rounded-full ${colors.text} mr-3 flex-shrink-0`} />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Desktop Technologies & Actions */}
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-4">Technologies Used</h4>
                            <div className="flex flex-wrap gap-2 mb-6">
                              {service.technologies.map((tech, idx) => (
                                <span key={idx} className={`px-3 py-1 rounded-full text-sm ${colors.tag} border`}>
                                  {tech}
                                </span>
                              ))}
                            </div>

                            {/* Desktop Action Buttons */}
                            <div className="space-y-3">
                              <Link to={service.route} className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-xl ${colors.button} border font-medium transition-all duration-300`}>
                                Book Free Demo
                              </Link>
                              <div className="text-center">
                                <span className="px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-sm text-gray-300">
                                  Custom Quote Available
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced hover glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none rounded-xl sm:rounded-2xl`} />
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Call to Action */}
        <ScrollReveal>
          <div className="text-center mt-12 sm:mt-16">
            <Link
              to="/services"
              className="inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              View All Services
              <ChevronDown className="ml-2 h-5 w-5 rotate-[-90deg]" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default EnhancedServices;