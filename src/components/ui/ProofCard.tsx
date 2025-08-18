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
    <div className={cn(
      // Base styles - consistent for all cards
      "bg-card/20 backdrop-blur-sm border-2 border-muted/30 rounded-xl p-4 text-center transition-all duration-300 cursor-default",
      // Hover illumination effect
      "hover:bg-primary/10 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/20",
      // Focus styles for accessibility
      "focus-within:bg-primary/10 focus-within:border-primary/40 focus-within:shadow-lg focus-within:shadow-primary/20",
      // Enhanced outline visibility
      "ring-1 ring-muted/20 hover:ring-primary/30",
      className
    )}>
      {icon && (
        <div className="flex items-center justify-center gap-1 mb-2 transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
      )}
      <p className="font-semibold text-sm transition-colors duration-300">{title}</p>
      <p className="text-xs text-muted-foreground transition-colors duration-300">{subtitle}</p>
    </div>
  );
};

export default ProofCard;