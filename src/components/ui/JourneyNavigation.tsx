import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface NavigationDot {
  id: string;
  label: string;
  section: string;
}

interface JourneyNavigationProps {
  sections: NavigationDot[];
  className?: string;
}

const JourneyNavigation: React.FC<JourneyNavigationProps> = ({
  sections,
  className = ''
}) => {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || '');

  useEffect(() => {
    sections.forEach((section, index) => {
      const element = document.getElementById(section.section);
      if (!element) return;

      ScrollTrigger.create({
        trigger: element,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveSection(section.id),
        onEnterBack: () => setActiveSection(section.id),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: element, offsetY: 80 },
        ease: "power2.inOut"
      });
    }
  };

  return (
    <nav className={`fixed right-6 top-1/2 transform -translate-y-1/2 z-40 ${className}`}>
      <div className="flex flex-col space-y-4">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.section)}
            className="group relative flex items-center"
            aria-label={`Navigate to ${section.label}`}
          >
            {/* Dot */}
            <div 
              className={`
                w-3 h-3 rounded-full border-2 transition-all duration-300
                ${activeSection === section.id 
                  ? 'bg-cyan-400 border-cyan-400 scale-125 shadow-lg shadow-cyan-400/50' 
                  : 'bg-transparent border-gray-500 hover:border-cyan-400/70'
                }
              `}
            />
            
            {/* Label */}
            <span 
              className={`
                absolute right-6 px-3 py-1 text-sm rounded-lg whitespace-nowrap
                transition-all duration-300 transform translate-x-2 opacity-0
                group-hover:translate-x-0 group-hover:opacity-100
                bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 text-gray-200
                ${activeSection === section.id ? 'text-cyan-400' : ''}
              `}
            >
              {section.label}
            </span>
            
            {/* Progress line */}
            <div 
              className={`
                absolute top-6 left-1/2 w-px h-8 transform -translate-x-1/2
                transition-all duration-300
                ${index < sections.length - 1 ? 'bg-gray-600' : 'bg-transparent'}
              `}
            >
              <div 
                className={`
                  w-full bg-gradient-to-b from-cyan-400 to-blue-500 transition-all duration-500
                  ${sections.findIndex(s => s.id === activeSection) > index ? 'h-full' : 'h-0'}
                `}
              />
            </div>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default JourneyNavigation;