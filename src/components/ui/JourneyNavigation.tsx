import React, { useEffect, useState } from 'react';

const sections = [
  { id: 'hero', label: 'Start' },
  { id: 'contact-form', label: 'Connect' },
  { id: 'problem-solution', label: 'Transform' },
  { id: 'services', label: 'Solutions' },
  { id: 'media-coverage', label: 'Trust' },
  { id: 'portfolio', label: 'Results' },
  { id: 'testimonials', label: 'Stories' },
  { id: 'final-contact-form', label: 'Begin' }
];

export const JourneyNavigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    });

    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col space-y-3">
      {sections.map((section, index) => (
        <div key={section.id} className="relative group">
          {/* Connecting line */}
          {index < sections.length - 1 && (
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-px h-8 bg-gradient-to-b from-cyan-400/30 to-transparent" />
          )}
          
          {/* Navigation dot */}
          <button
            onClick={() => scrollToSection(section.id)}
            className={`relative w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              activeSection === section.id
                ? 'bg-cyan-400 border-cyan-400 shadow-lg shadow-cyan-400/50'
                : 'bg-transparent border-gray-600 hover:border-cyan-400/50'
            }`}
          >
            {/* Pulse animation for active section */}
            {activeSection === section.id && (
              <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-75" />
            )}
          </button>

          {/* Section label */}
          <div className={`absolute right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none ${
            activeSection === section.id ? 'opacity-100' : ''
          }`}>
            <div className="bg-gray-900/90 backdrop-blur-sm border border-cyan-400/30 rounded-lg px-3 py-2 text-sm font-medium text-cyan-400 whitespace-nowrap">
              {section.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};