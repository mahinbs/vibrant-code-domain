
import { Menu, X } from "lucide-react";

interface MobileMenuButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

const MobileMenuButton = ({ isOpen, onToggle }: MobileMenuButtonProps) => {
  return (
    <button
      className="lg:hidden p-3 z-[60] relative touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
      onClick={onToggle}
      aria-label="Toggle menu"
      aria-expanded={isOpen}
      style={{ 
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation'
      }}
    >
      {isOpen ? (
        <X className="h-6 w-6 text-cyan-400" />
      ) : (
        <Menu className="h-6 w-6 text-cyan-400" />
      )}
    </button>
  );
};

export default MobileMenuButton;
