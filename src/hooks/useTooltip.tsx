
import { useState, useRef, useEffect } from 'react';

interface Position {
  x: number;
  y: number;
}

interface TooltipData {
  visible: boolean;
  position: Position;
  direction: 'top' | 'bottom' | 'left' | 'right';
}

export const useTooltip = () => {
  const [tooltip, setTooltip] = useState<TooltipData>({
    visible: false,
    position: { x: 0, y: 0 },
    direction: 'top'
  });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const calculatePosition = (triggerElement: HTMLElement) => {
    const triggerRect = triggerElement.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    
    // Center the tooltip over the trigger element
    let x = triggerRect.left + (triggerRect.width / 2);
    let y = triggerRect.top + (triggerRect.height / 2);
    
    // Ensure tooltip stays within viewport with some padding
    const padding = 20;
    const tooltipWidth = 320; // Approximate width from CustomTooltip
    const tooltipHeight = 400; // Approximate height
    
    // Adjust x position to keep tooltip in viewport
    x = Math.max(padding, Math.min(x, viewport.width - tooltipWidth - padding));
    
    // Adjust y position to keep tooltip in viewport
    y = Math.max(padding, Math.min(y, viewport.height - tooltipHeight - padding));
    
    // Always use 'top' direction since we're centering - explicitly type as literal
    const direction: 'top' | 'bottom' | 'left' | 'right' = 'top';
    
    return { x, y, direction };
  };

  const showTooltip = () => {
    if (triggerRef.current) {
      const { x, y, direction } = calculatePosition(triggerRef.current);
      setTooltip({
        visible: true,
        position: { x, y },
        direction
      });
    }
  };

  const hideTooltip = () => {
    setTooltip(prev => ({ ...prev, visible: false }));
  };

  return {
    tooltip,
    triggerRef,
    tooltipRef,
    showTooltip,
    hideTooltip
  };
};
