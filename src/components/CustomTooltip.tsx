
import React from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
  visible: boolean;
  position: { x: number; y: number };
  direction: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
  onRef: (ref: HTMLDivElement | null) => void;
}

const CustomTooltip: React.FC<TooltipProps> = ({
  visible,
  position,
  direction,
  children,
  onRef
}) => {
  if (!visible) return null;

  const tooltipContent = (
    <div
      ref={onRef}
      className="fixed z-[9999] pointer-events-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: visible ? 'scale(1)' : 'scale(0.95)',
        opacity: visible ? 1 : 0,
        transition: 'all 0.2s ease-out'
      }}
    >
      <div className="relative">
        {/* Arrow */}
        <div
          className={`absolute w-3 h-3 bg-gray-900 rotate-45 border border-gray-700/50 ${
            direction === 'right' ? '-left-1.5 top-1/2 -translate-y-1/2' :
            direction === 'left' ? '-right-1.5 top-1/2 -translate-y-1/2' :
            direction === 'bottom' ? 'left-1/2 -translate-x-1/2 -top-1.5' :
            'left-1/2 -translate-x-1/2 -bottom-1.5'
          }`}
        />
        
        {/* Content */}
        <div className="w-80 max-w-[calc(100vw-2rem)] bg-gray-900/98 border border-gray-700/50 backdrop-blur-xl shadow-2xl rounded-xl p-6 relative z-10">
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(tooltipContent, document.body);
};

export default CustomTooltip;
