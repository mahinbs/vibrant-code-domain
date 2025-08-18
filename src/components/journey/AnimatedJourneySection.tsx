import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { 
  Database, 
  GraduationCap, 
  Megaphone, 
  BarChart3, 
  Users, 
  Monitor, 
  HandHeart,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

interface JourneyStep {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  mockup?: string;
  direction: 'left' | 'right' | 'bottom';
}

const journeySteps: JourneyStep[] = [
  {
    id: 'step-1',
    number: 1,
    title: 'CRM Platform Access',
    description: 'Get instant access to our proprietary CRM system to manage leads, track opportunities, and automate your sales pipeline.',
    icon: <Database className="w-8 h-8" />,
    mockup: 'Dashboard with 47 active leads',
    direction: 'left'
  },
  {
    id: 'step-2',
    number: 2,
    title: 'Training Hub',
    description: 'Master AI tools and freelancing techniques through our comprehensive video training library and live workshops.',
    icon: <GraduationCap className="w-8 h-8" />,
    mockup: '150+ training modules completed',
    direction: 'right'
  },
  {
    id: 'step-3',
    number: 3,
    title: 'Marketing Professional',
    description: 'Work with dedicated marketing experts to build your personal brand and attract high-paying clients.',
    icon: <Megaphone className="w-8 h-8" />,
    mockup: '3x increase in client inquiries',
    direction: 'left'
  },
  {
    id: 'step-4',
    number: 4,
    title: 'Technical Analyst',
    description: 'Get support from technical analysts who help you deliver cutting-edge AI solutions to your clients.',
    icon: <BarChart3 className="w-8 h-8" />,
    mockup: '95% project success rate',
    direction: 'right'
  },
  {
    id: 'step-5',
    number: 5,
    title: 'Development & Delivery Team',
    description: 'Access our full development team to help you scale and deliver complex projects on time.',
    icon: <Users className="w-8 h-8" />,
    mockup: '24/7 team support available',
    direction: 'left'
  },
  {
    id: 'step-6',
    number: 6,
    title: 'Landing Pages',
    description: 'Get professionally designed landing pages and sales funnels to convert prospects into paying clients.',
    icon: <Monitor className="w-8 h-8" />,
    mockup: '67% conversion rate achieved',
    direction: 'right'
  },
  {
    id: 'step-7',
    number: 7,
    title: 'Mentorship & Handholding',
    description: 'Receive one-on-one mentorship and guidance from successful AI freelancers until you achieve consistent income.',
    icon: <HandHeart className="w-8 h-8" />,
    mockup: 'Weekly 1-on-1 sessions',
    direction: 'bottom'
  }
];

interface AnimatedJourneySectionProps {
  onCtaClick: () => void;
}

export const AnimatedJourneySection: React.FC<AnimatedJourneySectionProps> = ({ onCtaClick }) => {
  const [visibleSteps, setVisibleSteps] = useState<Set<string>>(new Set());
  const [showCta, setShowCta] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const arrowRef = useRef<SVGGElement>(null);

  // Create section IDs for scroll spy
  const sectionIds = journeySteps.map(step => step.id);
  const activeSection = useScrollSpy({ sectionIds, threshold: 0.3 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepId = entry.target.id;
            setVisibleSteps(prev => new Set([...prev, stepId]));
            
            // Show CTA after last step is visible
            if (stepId === 'step-7') {
              setTimeout(() => setShowCta(true), 800);
            }
          }
        });
      },
      { threshold: 0.3, rootMargin: '-10% 0px -10% 0px' }
    );

    journeySteps.forEach(step => {
      const element = document.getElementById(step.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // GSAP Path Animation Setup
  useEffect(() => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    const svg = svgRef.current;
    const pathEl = pathRef.current;
    const arrow = arrowRef.current;
    
    if (!section || !wrapper || !svg || !pathEl || !arrow) return;

    function getAnchor(card: HTMLElement, index: number): { x: number; y: number } {
      const wrapperRect = wrapper.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      
      const margin = 16;
      const totalSteps = journeySteps.length + 1; // Include CTA
      
      if (window.innerWidth < 768) {
        // Mobile: center-bottom anchor
        return {
          x: cardRect.left - wrapperRect.left + cardRect.width / 2,
          y: cardRect.bottom - wrapperRect.top - margin
        };
      }
      
      // Desktop anchoring for journey steps + CTA
      const isEven = index % 2 === 0;
      
      if (index === 0) {
        // First card: top edge center
        return {
          x: cardRect.left - wrapperRect.left + cardRect.width / 2,
          y: cardRect.top - wrapperRect.top + margin
        };
      }
      
      if (index === totalSteps - 1) {
        // CTA card: top edge center (like first card)
        return {
          x: cardRect.left - wrapperRect.left + cardRect.width / 2,
          y: cardRect.top - wrapperRect.top + margin
        };
      }
      
      // Middle cards (steps 2-7): left/right edge alternating
      return {
        x: isEven ? 
          cardRect.left - wrapperRect.left + margin : 
          cardRect.right - wrapperRect.left - margin,
        y: cardRect.top - wrapperRect.top + cardRect.height / 2
      };
    }

    function quadPath(p0: { x: number; y: number }, p1: { x: number; y: number }) {
      const dx = p1.x - p0.x;
      const dy = p1.y - p0.y;
      
      // Gentle curves with controlled curvature
      const isMobile = window.innerWidth < 768;
      const curvature = isMobile ? 40 : Math.min(80, Math.abs(dx) * 0.3);
      
      const midX = p0.x + dx / 2;
      const midY = p0.y + dy / 2;
      
      // Control point offset perpendicular to the line
      const controlY = midY + (dx > 0 ? curvature : -curvature);
      
      return `Q ${midX},${controlY} ${p1.x},${p1.y}`;
    }

    function layout() {
      // Wait for animations to settle
      setTimeout(() => {
        const wrapperRect = wrapper.getBoundingClientRect();
        svg.setAttribute('width', wrapperRect.width.toString());
        svg.setAttribute('height', wrapperRect.height.toString());
        svg.setAttribute('viewBox', `0 0 ${wrapperRect.width} ${wrapperRect.height}`);

        const cards = Array.from(wrapper.querySelectorAll('[data-card]')) as HTMLElement[];
        const points = cards.map((card, index) => getAnchor(card, index));
        
        // Points are already in wrapper's coordinate space
        const localPoints = points;
        
        // Build simple quadratic path
        let pathData = `M ${localPoints[0].x},${localPoints[0].y}`;
        for (let i = 1; i < localPoints.length; i++) {
          pathData += ` ${quadPath(localPoints[i - 1], localPoints[i])}`;
        }
        pathEl.setAttribute('d', pathData);

        const length = pathEl.getTotalLength?.() || 0;
        pathEl.style.strokeDasharray = `${length}`;
        pathEl.style.strokeDashoffset = `${length}`;

        ScrollTrigger.getAll().forEach(st => st.kill());
        gsap.killTweensOf(arrow);

        const tl = gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          scrollTrigger: {
            trigger: wrapper,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1.2,
          },
        });

        tl.to(pathEl, { 
          strokeDashoffset: 0,
          ease: 'power2.out'
        }, 0);

        tl.to(arrow, {
          motionPath: {
            path: pathEl,
            align: pathEl,
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
          },
          ease: 'power2.inOut'
        }, 0.1);
      }, 100);
    }

    // Reduced motion support
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Show static path without animation
      layout();
      if (pathRef.current) {
        pathRef.current.style.strokeDasharray = 'none';
        pathRef.current.style.strokeDashoffset = '0';
      }
      return;
    }

    // Initial layout
    layout();

    // Handle resize and step visibility changes
    const onResize = () => {
      clearTimeout((window as any).__journeyResizeTimeout);
      (window as any).__journeyResizeTimeout = setTimeout(layout, 150);
    };

    const onStepVisibilityChange = () => {
      clearTimeout((window as any).__journeyStepTimeout);
      (window as any).__journeyStepTimeout = setTimeout(layout, 200);
    };

    window.addEventListener('resize', onResize);
    
    // Re-layout when steps become visible or CTA shows
    onStepVisibilityChange();
    
    return () => {
      window.removeEventListener('resize', onResize);
      ScrollTrigger.getAll().forEach(st => st.kill());
      gsap.killTweensOf(arrow);
    };
  }, [showCta]);

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
      style={{
        background: `
          linear-gradient(135deg, 
            hsl(var(--background)) 0%, 
            hsl(var(--muted)) 50%, 
            hsl(var(--background)) 100%
          ),
          radial-gradient(circle at 20% 80%, 
            hsla(var(--primary), 0.1) 0%, 
            transparent 50%
          ),
          radial-gradient(circle at 80% 20%, 
            hsla(var(--accent), 0.1) 0%, 
            transparent 50%
          )
        `
      }}
    >
      {/* AI Circuit Background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
          <path 
            d="M0 400 Q300 200 600 400 T1200 400" 
            stroke="currentColor" 
            strokeWidth="1" 
            className="text-primary"
          />
          <path 
            d="M0 200 Q400 100 800 200 T1200 200" 
            stroke="currentColor" 
            strokeWidth="0.5" 
            className="text-accent"
          />
          <path 
            d="M0 600 Q200 500 400 600 T800 600 Q1000 500 1200 600" 
            stroke="currentColor" 
            strokeWidth="0.5" 
            className="text-secondary"
          />
          {/* Circuit nodes */}
          {[...Array(12)].map((_, i) => (
            <circle
              key={i}
              cx={100 + i * 100}
              cy={200 + Math.sin(i) * 100}
              r="2"
              fill="currentColor"
              className="text-primary animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Your Journey to Success
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Follow our proven roadmap from beginner to successful AI freelancer
          </p>
        </div>

        {/* Journey Steps */}
        <div ref={wrapperRef} className="max-w-4xl mx-auto relative">
          {/* SVG Path Overlay */}
          <svg
            ref={svgRef}
            className="pointer-events-none absolute inset-0 z-0"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="journeyGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="50%" stopColor="hsl(var(--accent))" />
                <stop offset="100%" stopColor="hsl(var(--primary))" />
              </linearGradient>
            </defs>
            
            {/* Main Path */}
            <path
              ref={pathRef}
              d=""
              fill="none"
              stroke="url(#journeyGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.8"
            />
            
            {/* Traveling Arrow */}
            <g ref={arrowRef} transform="translate(0,0)">
              <circle r="8" fill="hsl(var(--primary))" opacity="0.9" />
              <path 
                d="M0,-6 L4,0 L0,6 L-1.5,0 Z" 
                fill="hsl(var(--primary-foreground))" 
                opacity="0.9"
              />
            </g>
          </svg>

          {journeySteps.map((step, index) => {
            const isVisible = visibleSteps.has(step.id);
            const isEven = index % 2 === 0;
            
            return (
              <div
                key={step.id}
                id={step.id}
                data-card
                data-step={index}
                className={`
                  relative mb-16 last:mb-0 transition-all duration-700 ease-out z-10
                  ${isVisible ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0'}
                  ${!isVisible && step.direction === 'left' ? '-translate-x-16' : ''}
                  ${!isVisible && step.direction === 'right' ? 'translate-x-16' : ''}
                  ${!isVisible && step.direction === 'bottom' ? 'translate-y-8' : ''}
                `}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Step Card */}
                <div className={`
                  flex flex-col md:flex-row items-center gap-8
                  ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}
                `}>
                  {/* Content */}
                  <div className="flex-1 md:max-w-md">
                    <div className={`
                      group relative p-8 rounded-2xl border backdrop-blur-sm
                      bg-card/50 hover:bg-card/80 transition-all duration-300
                      hover:scale-105 hover:shadow-xl hover:shadow-primary/10
                      ${activeSection === step.id ? 'ring-2 ring-primary/30 bg-card/80' : ''}
                    `}>
                      {/* Glow effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <div className="relative z-10">
                        {/* Icon */}
                        <div className="flex items-center gap-4 mb-4">
                          <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                            {step.icon}
                          </div>
                          <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                            {step.number}
                          </div>
                        </div>

                        {/* Content */}
                        <h3 className="text-xl md:text-2xl font-bold mb-3">{step.title}</h3>
                        <p className="text-muted-foreground mb-4 leading-relaxed">{step.description}</p>
                        
                        {/* Mockup preview */}
                        {step.mockup && (
                          <div className="text-sm bg-primary/5 border border-primary/20 rounded-lg px-3 py-2 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            ✨ {step.mockup}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Spacer for mobile */}
                  <div className="flex-1 md:max-w-md md:opacity-0" />
                </div>
              </div>
            );
          })}

          {/* Animated CTA integrated into path */}
          <div 
            data-card
            data-step={journeySteps.length}
            className={`
              text-center mt-16 transition-all duration-1000 ease-out
              ${showCta ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}
            `}
          >
            <div className="relative max-w-lg mx-auto">
              {/* Glow background */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl blur-xl opacity-20 animate-pulse" />
              
              <div className="relative bg-card/90 backdrop-blur-sm border border-primary/20 rounded-2xl p-8">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    All of this for just $1
                  </h3>
                  <Sparkles className="w-6 h-6 text-accent animate-pulse" />
                </div>
                
                <p className="text-muted-foreground mb-6">Start your AI freelancing journey today</p>
                
                <Button 
                  onClick={onCtaClick}
                  size="lg"
                  className="text-lg px-8 py-6 h-auto bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Start for $1 Today
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};