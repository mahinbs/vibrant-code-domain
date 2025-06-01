
import { useState, useEffect, memo } from 'react';
import { useParallax } from '@/hooks/useParallax';
import { usePerformance } from '@/hooks/usePerformance';
import AboutHeader from './about/AboutHeader';
import StatisticsGrid from './about/StatisticsGrid';
import CompanyStory from './about/CompanyStory';
import ExpertiseGrid from './about/ExpertiseGrid';
import GlobalPresence from './about/GlobalPresence';
import MissionStatement from './about/MissionStatement';

const About = memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const { createOptimizedObserver } = usePerformance();
  const parallaxRef = useParallax<HTMLDivElement>({ speed: 0.3 });

  useEffect(() => {
    const observer = createOptimizedObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    const section = document.getElementById('about');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, [createOptimizedObserver]);

  return (
    <section 
      id="about" 
      className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
      style={{
        contain: 'layout style paint',
        contentVisibility: 'auto',
        containIntrinsicSize: '1px 2000px'
      }}
    >
      {/* Optimized Background with Hardware Acceleration */}
      <div 
        ref={parallaxRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat gpu-accelerate"
        style={{
          backgroundImage: `url('/lovable-uploads/d0fa4f38-5951-4a69-9df8-13d4faa03aaa.png')`,
          transform: 'translate3d(0, 0, 0)',
          willChange: 'auto'
        }}
      />

      {/* Enhanced Background Overlay with reduced complexity */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-gray-900/75"></div>

      <div className="container mx-auto px-6 relative z-10" style={{ contain: 'layout style paint' }}>
        <AboutHeader isVisible={isVisible} />
        <StatisticsGrid isVisible={isVisible} />
        <CompanyStory isVisible={isVisible} />
        <ExpertiseGrid isVisible={isVisible} />
        <GlobalPresence isVisible={isVisible} />
        <MissionStatement isVisible={isVisible} />
      </div>
    </section>
  );
});

About.displayName = 'About';

export default About;
