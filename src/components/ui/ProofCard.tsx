import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ProofCardProps {
  title: string;
  subtitle: string;
  icon?: ReactNode;
  variant?: 'default' | 'highlighted';
  className?: string;
  priceUsd?: string;
  revealOnInteraction?: boolean;
  active?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const ProofCard = ({ 
  title, 
  subtitle, 
  icon, 
  variant = 'default',
  className,
  priceUsd,
  revealOnInteraction = false,
  active = false,
  onClick,
  onMouseEnter,
  onMouseLeave
}: ProofCardProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && onClick) {
      e.preventDefault();
      onClick();
    }
  };

  const isRevealed = revealOnInteraction ? active : false;
  const shouldReveal = revealOnInteraction 
    ? "group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0"
    : "opacity-100 translate-y-0";

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-xl p-4 text-center transition-all duration-300 h-32',
        revealOnInteraction ? 'cursor-pointer' : 'cursor-default',
        // Outline and surface
        'bg-card/20 backdrop-blur-sm border border-white/15 ring-1 ring-white/10',
        // Hover/focus illumination
        'hover:border-white/30 hover:ring-white/30 hover:shadow-[0_10px_30px_-8px_rgba(59,130,246,0.35)]',
        'focus-within:border-white/30 focus-within:ring-white/30 focus-within:shadow-[0_10px_30px_-8px_rgba(59,130,246,0.35)]',
        className
      )}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={handleKeyDown}
      tabIndex={revealOnInteraction ? 0 : undefined}
      role={revealOnInteraction ? "button" : undefined}
      aria-expanded={revealOnInteraction ? active : undefined}
      data-active={active}
    >
      {/* Colorful radial glow on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(59,130,246,0.22)_0%,rgba(168,85,247,0.18)_45%,transparent_75%)]" />
      
      {/* Idle Layer - Default state with icon and centered title */}
      <div className={cn(
        "absolute inset-0 p-4 flex flex-col items-center justify-center transition-all duration-300",
        "opacity-100 scale-100 group-hover:opacity-0 group-hover:scale-95 group-focus-within:opacity-0 group-focus-within:scale-95",
        isRevealed && "opacity-0 scale-95"
      )}>
        {/* Icon */}
        {icon && (
          <div className="mb-3 [&_.icon]:text-white/80 [&_.icon-circle]:bg-white/10 [&_.icon-circle]:ring-1 [&_.icon-circle]:ring-white/20 [&_.icon-circle]:shadow-[0_0_20px_rgba(255,255,255,0.15)]">
            {icon}
          </div>
        )}
        
        {/* Centered Title */}
        <p className="font-semibold text-sm text-white/90">
          {title}
        </p>
      </div>

      {/* Reveal Layer - Hover state with title at top and content at bottom */}
      <div className={cn(
        "absolute inset-0 p-4 flex flex-col justify-between transition-all duration-300",
        "opacity-0 scale-105 translate-y-2",
        shouldReveal,
        isRevealed && "opacity-100 scale-100 translate-y-0"
      )}>
        {/* Top: Title */}
        <div className="pt-2">
          <p className="font-semibold text-sm text-white">
            {title}
          </p>
        </div>
        
        {/* Bottom: Description and Price */}
        <div>
          <p className="text-xs text-white/80 mb-2">
            {subtitle}
          </p>
          {priceUsd && (
            <p className="text-xs font-semibold text-emerald-400">
              {priceUsd}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProofCard;