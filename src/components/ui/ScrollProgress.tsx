import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollProgressProps {
  className?: string;
  showPercentage?: boolean;
  color?: string;
}

const ScrollProgress: React.FC<ScrollProgressProps> = ({
  className = '',
  showPercentage = false,
  color = 'from-cyan-400 to-blue-500'
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setProgress(Math.min(scrollPercent, 100));
    };

    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: updateProgress,
      scrub: true
    });

    // Initial calculation
    updateProgress();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className={`fixed top-0 left-0 w-full z-50 ${className}`}>
      <div className="h-1 bg-gray-800/30 backdrop-blur-sm">
        <div 
          className={`h-full bg-gradient-to-r ${color} transition-all duration-150 ease-out`}
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {showPercentage && (
        <div className="absolute top-2 right-4 text-xs text-gray-400 font-mono">
          {Math.round(progress)}%
        </div>
      )}
    </div>
  );
};

export default ScrollProgress;