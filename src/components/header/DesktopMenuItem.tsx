
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { MenuItemProps } from "./types";

const DesktopMenuItem = ({ item, isActive, isHomePage, onSmoothScroll }: MenuItemProps) => {
  const location = useLocation();
  
  const baseClasses = "transition-all duration-300 font-medium relative group text-sm xl:text-base";
  const activeClasses = isActive || location.pathname === item.href || (item.name === "Blogs" && location.pathname.startsWith("/blog"))
    ? "text-cyan-400"
    : "text-gray-300 hover:text-cyan-400";
  
  const underlineClasses = `absolute bottom-0 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${
    isActive || location.pathname === item.href || (item.name === "Blogs" && location.pathname.startsWith("/blog"))
      ? "w-full"
      : "w-0 group-hover:w-full"
  }`;

  // For Home navigation
  if (item.name === "Home") {
    return (
      <Link
        to={item.href}
        className={`${baseClasses} ${activeClasses}`}
      >
        {item.name}
        <span className={underlineClasses}></span>
      </Link>
    );
  }

  // For external pages (Blogs, Reviews)
  if (item.name === "Reviews" || item.name === "Blogs" || (!isHomePage && !item.href.startsWith("/#"))) {
    return (
      <Link
        to={item.href}
        className={`${baseClasses} ${activeClasses}`}
      >
        {item.name}
        <span className={underlineClasses}></span>
      </Link>
    );
  }

  // For section links on home page
  if (isHomePage && item.href.startsWith("/#")) {
    return (
      <button
        onClick={() => onSmoothScroll(item.href, item.section)}
        className={`${baseClasses} ${activeClasses}`}
      >
        {item.name}
        <span className={underlineClasses}></span>
      </button>
    );
  }

  // For section links when not on home page
  return (
    <a
      href={item.href}
      className={`${baseClasses} ${activeClasses}`}
    >
      {item.name}
      <span className={underlineClasses}></span>
    </a>
  );
};

export default DesktopMenuItem;
