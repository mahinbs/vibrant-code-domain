
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
        transform: 'translate(-50%, -50%) scale(1)',
        opacity: visible ? 1 : 0,
        transition: 'all 0.2s ease-out'
      }}
    >
      <div className="relative">
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
