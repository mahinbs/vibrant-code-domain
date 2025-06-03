
import { MenuItem } from "./types";
import DesktopMenuItem from "./DesktopMenuItem";

interface DesktopMenuProps {
  menuItems: MenuItem[];
  isActive: (item: MenuItem) => boolean;
  isHomePage: boolean;
  onSmoothScroll: (href: string, sectionId: string) => void;
}

const DesktopMenu = ({ menuItems, isActive, isHomePage, onSmoothScroll }: DesktopMenuProps) => {
  return (
    <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 flex-1 justify-center">
      {menuItems.map((item) => (
        <DesktopMenuItem
          key={item.name}
          item={item}
          isActive={isActive(item)}
          isHomePage={isHomePage}
          onSmoothScroll={onSmoothScroll}
        />
      ))}
      <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 font-medium shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 text-sm xl:text-base">
        Neural Access
      </button>
    </div>
  );
};

export default DesktopMenu;
