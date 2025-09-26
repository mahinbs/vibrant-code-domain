import React, { useEffect, useState } from 'react';

export const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    const throttledUpdate = () => {
      requestAnimationFrame(updateScrollProgress);
    };

    window.addEventListener('scroll', throttledUpdate, { passive: true });
    updateScrollProgress(); // Initial calculation

    return () => window.removeEventListener('scroll', throttledUpdate);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-800/50 z-50 backdrop-blur-sm">
      <div 
        className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-150 ease-out"
        style={{ 
          width: `${scrollProgress}%`,
          boxShadow: '0 0 10px rgba(6, 182, 212, 0.5)'
        }}
      />
    </div>
  );
};