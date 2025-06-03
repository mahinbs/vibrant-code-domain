
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { MenuItemProps } from "./types";

const MobileMenuItem = ({ item, isActive, isHomePage, onSmoothScroll, onClose }: MenuItemProps) => {
  const location = useLocation();
  
  const baseClasses = "block text-lg font-medium py-3 px-4 rounded-lg transition-all duration-300 touch-manipulation min-h-[44px] flex items-center";
  const activeClasses = isActive || location.pathname === item.href || (item.name === "Blogs" && location.pathname.startsWith("/blog"))
    ? "text-cyan-400 bg-cyan-400/10"
    : "text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/5";

  // For Home navigation
  if (item.name === "Home") {
    return (
      <Link
        to={item.href}
        className={`${baseClasses} ${activeClasses}`}
        onClick={onClose}
      >
        {item.name}
      </Link>
    );
  }

  // For external pages (Blogs, Reviews)
  if (item.name === "Reviews" || item.name === "Blogs") {
    return (
      <Link
        to={item.href}
        className={`${baseClasses} ${activeClasses}`}
        onClick={onClose}
      >
        {item.name}
      </Link>
    );
  }

  // For section links on home page
  if (isHomePage && item.href.startsWith("/#")) {
    return (
      <button
        onClick={() => {
          onSmoothScroll(item.href, item.section);
          onClose?.();
        }}
        className={`${baseClasses} ${activeClasses} w-full text-left`}
      >
        {item.name}
      </button>
    );
  }

  // For section links when not on home page
  return (
    <Link
      to={item.href}
      className={`${baseClasses} ${activeClasses}`}
      onClick={onClose}
    >
      {item.name}
    </Link>
  );
};

export default MobileMenuItem;
