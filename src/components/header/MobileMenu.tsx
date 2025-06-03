
import { X } from "lucide-react";
import { MenuItem } from "./types";
import MobileMenuItem from "./MobileMenuItem";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  isActive: (item: MenuItem) => boolean;
  isHomePage: boolean;
  onSmoothScroll: (href: string, sectionId: string) => void;
  isMobile: boolean;
}

const MobileMenu = ({ 
  isOpen, 
  onClose, 
  menuItems, 
  isActive, 
  isHomePage, 
  onSmoothScroll,
  isMobile 
}: MobileMenuProps) => {
  console.log('MobileMenu render:', { isOpen, isMobile, menuItems: menuItems.length, shouldShow: isOpen });

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
      
      {/* Mobile Menu */}
      <div 
        className={`lg:hidden fixed top-0 right-0 h-full w-full max-w-sm bg-black/95 backdrop-blur-md border-l border-cyan-500/20 shadow-xl z-[101] transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100vh',
          width: '100%',
          maxWidth: '24rem',
          willChange: 'transform'
        }}
      >
        <div className="pt-20 px-6 py-8 space-y-6 h-full overflow-y-auto">
          {menuItems.map((item) => (
            <MobileMenuItem
              key={item.name}
              item={item}
              isActive={isActive(item)}
              isHomePage={isHomePage}
              onSmoothScroll={onSmoothScroll}
              onClose={onClose}
            />
          ))}
          
          <div className="pt-4">
            <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 font-medium text-lg touch-manipulation min-h-[44px]">
              Neural Access
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
