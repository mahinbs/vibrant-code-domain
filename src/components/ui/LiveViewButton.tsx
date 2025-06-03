
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LiveViewButtonProps {
  url: string;
  className?: string;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg';
}

const LiveViewButton = ({ url, className, variant = 'default', size = 'default' }: LiveViewButtonProps) => {
  const handleClick = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      size={size}
      className={className}
    >
      <ExternalLink className="h-4 w-4 mr-2" />
      View Live
    </Button>
  );
};

export default LiveViewButton;
