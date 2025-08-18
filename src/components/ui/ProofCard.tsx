import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ProofCardProps {
  title: string;
  subtitle: string;
  icon?: ReactNode;
  variant?: 'default' | 'highlighted';
  className?: string;
}

const ProofCard = ({ 
  title, 
  subtitle, 
  icon, 
  variant = 'default',
  className 
}: ProofCardProps) => {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-xl p-4 text-center transition-all duration-300 cursor-default',
        // Outline and surface
        'bg-card/20 backdrop-blur-sm border border-white/15 ring-1 ring-white/10',
        // Hover/focus illumination
        'hover:border-white/30 hover:ring-white/30 hover:shadow-[0_10px_30px_-8px_rgba(59,130,246,0.35)]',
        'focus-within:border-white/30 focus-within:ring-white/30 focus-within:shadow-[0_10px_30px_-8px_rgba(59,130,246,0.35)]',
        className
      )}
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
      <p className="relative z-10 text-xs text-muted-foreground transition-colors duration-300 group-hover:text-white/80">
        {subtitle}
      </p>
    </div>
  );
};

export default ProofCard;