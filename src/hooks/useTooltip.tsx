
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
    const tooltipElement = tooltipRef.current;
    
    if (!tooltipElement) return { x: 0, y: 0, direction: 'top' as const };
    
    const tooltipRect = tooltipElement.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    
    const spacing = 16;
    
    // Calculate available space in each direction
    const spaceTop = triggerRect.top;
    const spaceBottom = viewport.height - triggerRect.bottom;
    const spaceLeft = triggerRect.left;
    const spaceRight = viewport.width - triggerRect.right;
    
    let x = 0;
    let y = 0;
    let direction: 'top' | 'bottom' | 'left' | 'right' = 'top';
    
    // Determine best direction based on available space
    if (spaceRight >= tooltipRect.width + spacing) {
      // Show on right
      direction = 'right';
      x = triggerRect.right + spacing;
      y = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
    } else if (spaceLeft >= tooltipRect.width + spacing) {
      // Show on left
      direction = 'left';
      x = triggerRect.left - tooltipRect.width - spacing;
      y = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
    } else if (spaceBottom >= tooltipRect.height + spacing) {
      // Show below
      direction = 'bottom';
      x = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
      y = triggerRect.bottom + spacing;
    } else {
      // Show above
      direction = 'top';
      x = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
      y = triggerRect.top - tooltipRect.height - spacing;
    }
    
    // Ensure tooltip stays within viewport
    x = Math.max(spacing, Math.min(x, viewport.width - tooltipRect.width - spacing));
    y = Math.max(spacing, Math.min(y, viewport.height - tooltipRect.height - spacing));
    
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
