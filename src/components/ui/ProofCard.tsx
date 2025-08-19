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
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-xl p-4 text-center transition-all duration-300',
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
      
      {icon && (
        <div
          className="
            relative z-10 flex items-center justify-center gap-1 mb-2
            transition-transform duration-300 group-hover:scale-110
            [&_.icon]:text-white/80 [&_.icon]:transition-colors group-hover:[&_.icon]:text-white
            [&_.icon-circle]:bg-white/10 [&_.icon-circle]:ring-1 [&_.icon-circle]:ring-white/20 
            [&_.icon-circle]:shadow-[0_0_20px_rgba(255,255,255,0.15)] [&_.icon-circle]:transition-all
            group-hover:[&_.icon-circle]:bg-gradient-to-br group-hover:[&_.icon-circle]:from-primary/40 
            group-hover:[&_.icon-circle]:to-secondary/40 group-hover:[&_.icon-circle]:ring-primary/30
            group-hover:[&_.icon-circle]:shadow-[0_0_28px_rgba(59,130,246,0.35)]
          "
        >
          {icon}
        </div>
      )}

      <p className="relative z-10 font-semibold text-sm transition-colors duration-300 group-hover:text-white">
        {title}
      </p>
      
      {/* Reveal content */}
      <div className={cn(
        "transition-all duration-200",
        revealOnInteraction 
          ? "opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0"
          : "opacity-100 translate-y-0",
        active && "opacity-100 translate-y-0"
      )}>
        <p className="relative z-10 text-xs text-muted-foreground transition-colors duration-300 group-hover:text-white/80 mt-2">
          {subtitle}
        </p>
        {priceUsd && (
          <p className="relative z-10 mt-2 text-xs font-semibold text-emerald-400">
            {priceUsd}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProofCard;