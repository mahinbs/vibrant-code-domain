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
    description: 'Get instant access to our proprietary CRM system where you can add and track all your leads, automate your sales pipeline, and generate quotations and proposals in one click.',
    icon: <Database className="w-8 h-8" />,
    mockup: 'New users typically manage 47+ active leads in their first week',
    direction: 'left'
  },
  {
    id: 'step-2',
    number: 2,
    title: 'Personal Landing Page (Branded by BoostMySites)',
    description: 'We create a professional landing page under our brand name that instantly boosts your credibility, showcasing BoostMySites\' portfolios and client testimonials.',
    icon: <Monitor className="w-8 h-8" />,
    mockup: 'Clients convert 2.5x faster when shown a branded portfolio page',
    direction: 'right'
  },
  {
    id: 'step-3',
    number: 3,
    title: 'Training Hub',
    description: 'Master AI freelancing through 150+ video modules covering tools, proposals, and delivery, plus weekly live workshops to apply what you learn immediately.',
    icon: <GraduationCap className="w-8 h-8" />,
    mockup: 'Over 150 training modules completed by first-month learners',
    direction: 'left'
  },
  {
    id: 'step-4',
    number: 4,
    title: 'Dedicated Marketing Professional',
    description: 'You\'re assigned a personal marketing role to generate leads for you through Google Ads and other channels handled by experts, with targeted campaigns and ongoing optimization.',
    icon: <Megaphone className="w-8 h-8" />,
    mockup: 'Typical freelancers see 3x more client inquiries in the first month',
    direction: 'right'
  },
  {
    id: 'step-5',
    number: 5,
    title: 'Technical Analyst (In Meetings & Delivery Support)',
    description: 'You don\'t need technical skills — our analyst joins client meetings to explain technical details, handle demos, technical Q&A, and ensure projects are scoped correctly.',
    icon: <BarChart3 className="w-8 h-8" />,
    mockup: '95% project success rate when analysts join meetings',
    direction: 'left'
  },
  {
    id: 'step-6',
    number: 6,
    title: 'Project Documentation & Delivery Team',
    description: 'Once you close a project, we take over the heavy lifting with dedicated teams preparing BRDs, SOWs, proposals, development, QA testing, and project management in Projectsy.',
    icon: <Users className="w-8 h-8" />,
    mockup: '24/7 delivery team support available for every freelancer',
    direction: 'right'
  },
  {
    id: 'step-7',
    number: 7,
    title: 'High-Converting Sales Assets',
    description: 'You\'re equipped with professionally designed landing pages, funnels, portfolio assets, testimonials, and case studies under BoostMySites brand to close clients faster.',
    icon: <Monitor className="w-8 h-8" />,
    mockup: 'Boosted to 67% conversion rates with optimized sales pages',
    direction: 'left'
  },
  {
    id: 'step-8',
    number: 8,
    title: 'Mentorship & Handholding',
    description: 'Get continuous support with weekly 1-on-1 mentorship calls with successful AI freelancers, complete handholding until you reach income stability, and guidance on scaling.',
    icon: <HandHeart className="w-8 h-8" />,
    mockup: 'Weekly personal mentorship sessions ensure faster results',
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
            const lastStepId = journeySteps[journeySteps.length - 1].id;
            if (stepId === lastStepId) {
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
      
      const edgeInset = 10;
      const totalSteps = journeySteps.length + 1; // Include CTA
      
      if (window.innerWidth < 768) {
        // Mobile: center-bottom anchor
        return {
          x: cardRect.left - wrapperRect.left + cardRect.width / 2,
          y: cardRect.bottom - wrapperRect.top - edgeInset
        };
      }
      
      // Desktop anchoring for journey steps + CTA
      const isEven = index % 2 === 0;
      
      if (index === 0) {
        // First card: top edge center
        return {
          x: cardRect.left - wrapperRect.left + cardRect.width / 2,
          y: cardRect.top - wrapperRect.top + edgeInset
        };
      }
      
      if (index === totalSteps - 1) {
        // CTA card: top edge center (like first card)
        return {
          x: cardRect.left - wrapperRect.left + cardRect.width / 2,
          y: cardRect.top - wrapperRect.top + edgeInset
        };
      }
      
      // Middle cards (steps 2-7): actual left/right edge border anchoring
      return {
        x: isEven ? 
          cardRect.left - wrapperRect.left + edgeInset : 
          cardRect.right - wrapperRect.left - edgeInset,
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
        // Detect mobile sticky CTA once at the top
        const mobileStickyCTA = document.querySelector('[data-sticky-cta="true"]') as HTMLElement;
        const stickyCtaHeight = (mobileStickyCTA?.offsetHeight || 0) + 20; // Add padding
        const isMobile = window.innerWidth < 768;
        
        const wrapperRect = wrapper.getBoundingClientRect();
        svg.setAttribute('width', wrapperRect.width.toString());
        svg.setAttribute('height', wrapperRect.height.toString());
        svg.setAttribute('viewBox', `0 0 ${wrapperRect.width} ${wrapperRect.height}`);

        const cards = Array.from(wrapper.querySelectorAll('[data-card]')) as HTMLElement[];
        const points = cards.map((card, index) => getAnchor(card, index));
        
        if (points.length < 2) return;
        
        // Calculate path segments and their lengths for precise mapping
        const segments: Array<{ start: { x: number; y: number }; end: { x: number; y: number }; length: number }> = [];
        let totalPathLength = 0;
        
        for (let i = 1; i < points.length; i++) {
          const start = points[i - 1];
          const end = points[i];
          
          // Create temporary path element to measure segment length
          const tempPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          tempPath.setAttribute('d', `M ${start.x},${start.y} ${quadPath(start, end)}`);
          svg.appendChild(tempPath);
          const segmentLength = tempPath.getTotalLength();
          svg.removeChild(tempPath);
          
          segments.push({ start, end, length: segmentLength });
          totalPathLength += segmentLength;
        }
        
        // Calculate cumulative progress for each anchor point based on actual card positions
        const anchorProgressPoints: Array<{ scrollProgress: number; pathProgress: number }> = [];
        let cumulativeLength = 0;
        
        anchorProgressPoints.push({ scrollProgress: 0, pathProgress: 0 });
        
        // Calculate scroll targets based on actual card center positions
        const scrollTargets: number[] = [];
        
        cards.forEach((card, index) => {
          const cardRect = card.getBoundingClientRect();
          const wrapperRect = wrapper.getBoundingClientRect();
          // Adjust for mobile sticky CTA
          const viewportOffset = isMobile ? stickyCtaHeight : 0;
          const cardCenter = cardRect.top + cardRect.height / 2 - wrapperRect.top;
          const adjustedHeight = wrapperRect.height - viewportOffset;
          scrollTargets.push(Math.max(0, Math.min(1, cardCenter / adjustedHeight)));
        });
        
        for (let i = 0; i < segments.length; i++) {
          cumulativeLength += segments[i].length;
          const scrollProgress = scrollTargets[i + 1] || (i + 1) / (points.length - 1);
          const pathProgress = cumulativeLength / totalPathLength;
          anchorProgressPoints.push({ scrollProgress, pathProgress });
        }
        
        // Build the complete path
        let pathData = `M ${points[0].x},${points[0].y}`;
        for (let i = 1; i < points.length; i++) {
          pathData += ` ${quadPath(points[i - 1], points[i])}`;
        }
        pathEl.setAttribute('d', pathData);

        const pathLength = pathEl.getTotalLength?.() || 0;
        pathEl.style.strokeDasharray = `${pathLength}`;
        pathEl.style.strokeDashoffset = `${pathLength}`;

        ScrollTrigger.getAll().forEach(st => st.kill());
        gsap.killTweensOf(arrow);

        // Create paused motion path tween for precise control
        const motionTween = gsap.to(arrow, {
          motionPath: {
            path: pathEl,
            align: pathEl,
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
          },
          duration: 1,
          paused: true,
          ease: 'none'
        });

        let reachedFinal = false;

        // Adjust scroll trigger based on mobile sticky CTA
        const startOffset = isMobile ? 'top 30%' : 'top 20%';
        const endOffset = isMobile ? `bottom+=${stickyCtaHeight + 100} 70%` : 'bottom 80%';

        ScrollTrigger.create({
          trigger: wrapper,
          start: startOffset,
          end: endOffset,
          scrub: 1,
          refreshPriority: -1,
          onUpdate: (self) => {
            const scrollProgress = self.progress;
            
            // Enhanced mapping with card-based synchronization
            let pathProgress = 0;
            
            // Calculate which card should be active based on scroll position
            const wrapperRect = wrapper.getBoundingClientRect();
            const viewportCenter = window.innerHeight / 2;
            const activeCardIndex = cards.findIndex(card => {
              const cardRect = card.getBoundingClientRect();
              return cardRect.top <= viewportCenter && cardRect.bottom >= viewportCenter;
            });
            
            if (activeCardIndex >= 0) {
              // Synchronize path progress with active card
              const cardProgress = activeCardIndex / (cards.length - 1);
              const nextCardProgress = Math.min((activeCardIndex + 1) / (cards.length - 1), 1);
              
              // Fine-tune based on card position within viewport
              const activeCard = cards[activeCardIndex];
              const cardRect = activeCard.getBoundingClientRect();
              const cardCenterY = cardRect.top + cardRect.height / 2;
              const distanceFromCenter = Math.abs(cardCenterY - viewportCenter);
              const cardHeight = cardRect.height;
              const localProgress = Math.max(0, 1 - (distanceFromCenter / (cardHeight / 2)));
              
              pathProgress = cardProgress + (nextCardProgress - cardProgress) * localProgress * 0.3;
            } else {
              // Fallback to scroll-based progress
              for (let i = 0; i < anchorProgressPoints.length - 1; i++) {
                const current = anchorProgressPoints[i];
                const next = anchorProgressPoints[i + 1];
                
                if (scrollProgress >= current.scrollProgress && scrollProgress <= next.scrollProgress) {
                  const localProgress = (scrollProgress - current.scrollProgress) / (next.scrollProgress - current.scrollProgress);
                  pathProgress = current.pathProgress + localProgress * (next.pathProgress - current.pathProgress);
                  break;
                }
              }
            }
            
            // Ensure we don't exceed bounds
            pathProgress = Math.max(0, Math.min(1, pathProgress));
            
            // Update stroke drawing
            pathEl.style.strokeDashoffset = `${pathLength * (1 - pathProgress)}`;
            
            // Update arrow position
            motionTween.progress(pathProgress);
            
            // Trigger celebration when reaching final step (more precise trigger)
            if (pathProgress >= 0.9 && !reachedFinal) {
              reachedFinal = true;
              setTimeout(() => triggerCelebration(), 200);
            } else if (pathProgress < 0.85) {
              reachedFinal = false;
            }
          },
          onRefresh: () => {
            // Recalculate on refresh
            setTimeout(layout, 100);
          }
        });
      }, 100);
    }

    function triggerCelebration() {
      const ctaCard = wrapper.querySelector(`[data-step="${journeySteps.length}"]`) as HTMLElement;
      if (!ctaCard) return;
      
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      if (!prefersReducedMotion) {
        // Create sparkles elements
        const sparkles = ctaCard.querySelectorAll('.celebration-sparkle');
        
        // Main celebration animation
        const tl = gsap.timeline();
        
        // Card scale and pulse
        tl.to(ctaCard, {
          scale: 1.02,
          duration: 0.4,
          ease: 'power2.out'
        })
        .to(ctaCard, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.in'
        });
        
        // Enhanced static glow (no animation to prevent flickering)
        tl.to(ctaCard.querySelector('.glow-effect'), {
          opacity: 0.8,
          duration: 0.3,
          ease: 'power2.out'
        }, 0);
        
        // Sparkles animation
        sparkles.forEach((sparkle, i) => {
          tl.fromTo(sparkle, 
            { 
              opacity: 0, 
              scale: 0, 
              rotation: 0 
            },
            {
              opacity: 1,
              scale: 1,
              rotation: 360,
              duration: 0.5,
              ease: 'back.out(1.7)'
            }, i * 0.1)
          .to(sparkle, {
            opacity: 0,
            scale: 0.5,
            duration: 0.3,
            ease: 'power2.in'
          }, '+=0.2');
        });
      } else {
        // Reduced motion alternative: gentle highlight
        gsap.to(ctaCard.querySelector('.glow-effect'), {
          opacity: 0.6,
          duration: 0.8,
          ease: 'power2.inOut',
          yoyo: true,
          repeat: 1
        });
      }
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
      (window as any).__journeyResizeTimeout = setTimeout(() => {
        layout();
        ScrollTrigger.refresh();
      }, 150);
    };

    const onStepVisibilityChange = () => {
      clearTimeout((window as any).__journeyStepTimeout);
      (window as any).__journeyStepTimeout = setTimeout(layout, 200);
    };

    // Watch for mobile sticky CTA changes
    const onStickyCtaChange = () => {
      clearTimeout((window as any).__journeyStickyTimeout);
      (window as any).__journeyStickyTimeout = setTimeout(() => {
        layout();
        ScrollTrigger.refresh();
      }, 100);
    };

    window.addEventListener('resize', onResize);
    
    // Re-layout when steps become visible or CTA shows
    onStepVisibilityChange();
    
    // Watch for changes in sticky CTA visibility
    const observer = new MutationObserver(onStickyCtaChange);
    const stickyElement = document.querySelector('[data-sticky-cta="true"]');
    if (stickyElement) {
      observer.observe(stickyElement, { attributes: true, childList: true, subtree: true });
    }
    
    return () => {
      window.removeEventListener('resize', onResize);
      ScrollTrigger.getAll().forEach(st => st.kill());
      gsap.killTweensOf(arrow);
      observer.disconnect();
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
            Follow our proven step-by-step roadmap — everything you need to go from beginner to successful AI freelancer.
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
                      {/* Colorful Glow effect */}
                      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        index % 6 === 0 ? 'bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20' :
                        index % 6 === 1 ? 'bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20' :
                        index % 6 === 2 ? 'bg-gradient-to-r from-green-500/20 via-cyan-500/20 to-blue-500/20' :
                        index % 6 === 3 ? 'bg-gradient-to-r from-orange-500/20 via-red-500/20 to-pink-500/20' :
                        index % 6 === 4 ? 'bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20' :
                        'bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20'
                      }`} />
                      
                      <div className="relative z-10">
                        {/* Icon */}
                        <div className="flex items-center gap-4 mb-4">
                          <div className={`p-3 rounded-xl transition-all duration-300 ${
                            index % 6 === 0 ? 'bg-cyan-500/10 text-cyan-500 group-hover:bg-cyan-500 group-hover:text-white' :
                            index % 6 === 1 ? 'bg-purple-500/10 text-purple-500 group-hover:bg-purple-500 group-hover:text-white' :
                            index % 6 === 2 ? 'bg-green-500/10 text-green-500 group-hover:bg-green-500 group-hover:text-white' :
                            index % 6 === 3 ? 'bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white' :
                            index % 6 === 4 ? 'bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white' :
                            'bg-pink-500/10 text-pink-500 group-hover:bg-pink-500 group-hover:text-white'
                          }`}>
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
            id="journey-cta-wrapper"
          >
            <div className="relative max-w-lg mx-auto">
              {/* Static radial glow background */}
              <div className="glow-effect absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.4)_0%,hsl(var(--accent)/0.2)_40%,transparent_70%)] rounded-2xl opacity-60" />
              
              {/* Celebration Sparkles */}
              <div className="celebration-sparkle absolute -top-4 -left-4 w-6 h-6 text-primary opacity-0">
                <Sparkles className="w-full h-full" />
              </div>
              <div className="celebration-sparkle absolute -top-2 -right-6 w-4 h-4 text-accent opacity-0">
                <Sparkles className="w-full h-full" />
              </div>
              <div className="celebration-sparkle absolute -bottom-4 -left-2 w-5 h-5 text-primary opacity-0">
                <Sparkles className="w-full h-full" />
              </div>
              <div className="celebration-sparkle absolute -bottom-2 -right-4 w-6 h-6 text-accent opacity-0">
                <Sparkles className="w-full h-full" />
              </div>
              
              <div className="relative bg-card/95 backdrop-blur-sm border border-primary/30 rounded-2xl p-8 shadow-xl">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                    All of this for just <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent font-extrabold text-3xl">$1</span>
                  </h3>
                  <Sparkles className="w-6 h-6 text-accent animate-pulse" />
                </div>
                
                <p className="text-muted-foreground mb-6 text-lg">Start your AI freelancing journey today</p>
                
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