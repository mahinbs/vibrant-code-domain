
import { useEffect, useState } from 'react';

interface PortfolioHeaderProps {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

const PortfolioHeader = ({ isVisible, setIsVisible }: PortfolioHeaderProps) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    const section = document.getElementById('portfolio');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, [setIsVisible]);

  return (
    <div className={`text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-700 px-4 ${isVisible ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
        Our Latest <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Projects</span>
      </h2>
      <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
        Discover some of our most innovative solutions that have transformed businesses across industries.
      </p>
    </div>
  );
};

export default PortfolioHeader;
