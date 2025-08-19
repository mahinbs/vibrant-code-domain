import React from 'react';
import { Button } from './button';

interface StickyButtonProps {
  text: string;
  onClick: () => void;
  bgColor?: string;
}

const StickyButton: React.FC<StickyButtonProps> = ({ text, onClick, bgColor }) => {
  const defaultClasses = "bg-gradient-to-r from-neon-cyan to-neon-blue text-white shadow-2xl border border-white/20 font-semibold animate-glow hover:scale-105 hover:animate-pulse transition-all duration-300";
  const customClasses = "shadow-2xl border border-white/20 font-semibold hover:scale-105 transition-all duration-300";
  
  return (
    <>
      {/* Desktop sticky button */}
      <div className="hidden md:block fixed top-24 right-6 z-50">
        <Button
          onClick={onClick}
          className={`px-6 py-3 text-sm ${bgColor ? customClasses : defaultClasses}`}
          style={bgColor ? { backgroundColor: bgColor } : undefined}
        >
          {text}
        </Button>
      </div>
      
      {/* Mobile sticky bottom bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-black/80 to-transparent" data-sticky-cta="true">
        <Button
          onClick={onClick}
          className={`w-full font-semibold py-4 h-12 text-base ${bgColor ? customClasses : defaultClasses}`}
          style={bgColor ? { backgroundColor: bgColor } : undefined}
        >
          {text}
        </Button>
      </div>
    </>
  );
};

export default StickyButton;