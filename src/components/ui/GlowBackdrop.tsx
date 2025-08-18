import React from 'react';

interface GlowBackdropProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  size?: 'small' | 'medium' | 'large';
  color?: 'blue' | 'purple' | 'teal';
  intensity?: 'low' | 'medium' | 'high';
}

const GlowBackdrop: React.FC<GlowBackdropProps> = ({ 
  position = 'center', 
  size = 'medium', 
  color = 'blue',
  intensity = 'medium'
}) => {
  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-0 left-0 -translate-x-1/2 -translate-y-1/2';
      case 'top-right':
        return 'top-0 right-0 translate-x-1/2 -translate-y-1/2';
      case 'bottom-left':
        return 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2';
      case 'bottom-right':
        return 'bottom-0 right-0 translate-x-1/2 translate-y-1/2';
      default:
        return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-32 h-32 md:w-48 md:h-48';
      case 'large':
        return 'w-96 h-96 md:w-[32rem] md:h-[32rem]';
      default:
        return 'w-64 h-64 md:w-80 md:h-80';
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case 'purple':
        return 'bg-purple-600/20';
      case 'teal':
        return 'bg-teal-600/20';
      default:
        return 'bg-blue-600/20';
    }
  };

  const getIntensityClasses = () => {
    switch (intensity) {
      case 'low':
        return 'opacity-30';
      case 'high':
        return 'opacity-70';
      default:
        return 'opacity-50';
    }
  };

  return (
    <div 
      className={`
        absolute ${getPositionClasses()} ${getSizeClasses()} 
        ${getColorClasses()} ${getIntensityClasses()}
        rounded-full blur-3xl pointer-events-none z-0
        animate-pulse
      `}
      style={{
        filter: 'blur(80px)',
        animationDuration: '4s',
        animationTimingFunction: 'ease-in-out'
      }}
    />
  );
};

export default GlowBackdrop;