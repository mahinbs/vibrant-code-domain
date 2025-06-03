import { Menu, X } from "lucide-react";
import { useState, memo, useCallback, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useIsMobile } from "@/hooks/use-mobile";
import logo from "../assets/logo/logo.png";

const Header = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isMobile = useIsMobile();
  const activeSection = useScrollSpy({
    sectionIds: ["hero", "services", "portfolio", "about", "contact"],
    rootMargin: "-20% 0px -80% 0px",
  });

  // Debug logging
  useEffect(() => {
    console.log('Mobile state:', { isMobile, isMenuOpen });
  }, [isMobile, isMenuOpen]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Close menu when switching from mobile to desktop
  useEffect(() => {
    if (!isMobile && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMobile, isMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen && isMobile) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = '0';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isMenuOpen, isMobile]);

  const menuItems = [
    {
      name: "Home",
      href: "/",
      section: "hero",
    },
    {
      name: "Services",
      href: "/#services",
      section: "services",
    },
    {
      name: "Portfolio",
      href: "/#portfolio",
      section: "portfolio",
    },
    {
      name: "Blogs",
      href: "/blogs",
      section: "blogs",
    },
    {
      name: "Reviews",
      href: "/reviews",
      section: "reviews",
    },
    {
      name: "About",
      href: "/#about",
      section: "about",
    },
    {
      name: "Contact",
      href: "/#contact",
      section: "contact",
    },
  ];

  const handleSmoothScroll = useCallback(
    (href: string, sectionId: string) => {
      if (isHomePage && href.startsWith("/#")) {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
          });
          setIsMenuOpen(false);
          return;
        }
      }
    },
    [isHomePage]
  );

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

  const isActive = useCallback(
    (item: (typeof menuItems)[0]) => {
      if (isHomePage) {
        return activeSection === item.section;
      }
      return (
        location.pathname === item.href ||
        (item.href === "/" && location.pathname === "/")
      );
    },
    [isHomePage, activeSection, location.pathname]
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-cyan-500/20">
      <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 relative">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 z-[60] relative">
            <img
              src={logo}
              alt="Boostmysites Logo"
              loading="lazy"
              className="w-[7rem] sm:w-[8rem] md:w-[11rem] transition-transform duration-300 filter drop-shadow-lg object-cover"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 flex-1 justify-center">
            {menuItems.map((item) => {
              const active = isActive(item);
              if (item.name === "Home") {
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`transition-all duration-300 font-medium relative group text-sm xl:text-base ${
                      active
                        ? "text-cyan-400"
                        : "text-gray-300 hover:text-cyan-400"
                    }`}
                  >
                    {item.name}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${
                        active ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </Link>
                );
              } else if (
                item.name === "Reviews" ||
                item.name === "Blogs" ||
                (!isHomePage && !item.href.startsWith("/#"))
              ) {
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`transition-all duration-300 font-medium relative group text-sm xl:text-base ${
                      active || location.pathname === item.href || (item.name === "Blogs" && location.pathname.startsWith("/blog"))
                        ? "text-cyan-400"
                        : "text-gray-300 hover:text-cyan-400"
                    }`}
                  >
                    {item.name}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${
                        active || location.pathname === item.href || (item.name === "Blogs" && location.pathname.startsWith("/blog"))
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </Link>
                );
              } else if (isHomePage && item.href.startsWith("/#")) {
                return (
                  <button
                    key={item.name}
                    onClick={() => handleSmoothScroll(item.href, item.section)}
                    className={`transition-all duration-300 font-medium relative group text-sm xl:text-base ${
                      active
                        ? "text-cyan-400"
                        : "text-gray-300 hover:text-cyan-400"
                    }`}
                  >
                    {item.name}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${
                        active ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </button>
                );
              } else {
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`transition-all duration-300 font-medium relative group text-sm xl:text-base ${
                      active
                        ? "text-cyan-400"
                        : "text-gray-300 hover:text-cyan-400"
                    }`}
                  >
                    {item.name}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${
                        active ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </a>
                );
              }
            })}
            <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 font-medium shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 text-sm xl:text-base">
              Neural Access
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-3 z-[60] relative touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            style={{ 
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation'
            }}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-cyan-400" />
            ) : (
              <Menu className="h-6 w-6 text-cyan-400" />
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && isMobile && (
          <>
            {/* Backdrop */}
            <div 
              className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
              onClick={closeMenu}
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
              className="lg:hidden fixed top-0 right-0 h-full w-full max-w-sm bg-black/95 backdrop-blur-md border-l border-cyan-500/20 shadow-xl z-[101] transform transition-transform duration-300 ease-in-out"
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                height: '100vh',
                width: '100%',
                maxWidth: '24rem',
                transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
                WebkitTransform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
                willChange: 'transform'
              }}
            >
              <div className="pt-20 px-6 py-8 space-y-6 h-full overflow-y-auto">
                {menuItems.map((item) => {
                  const active = isActive(item);
                  if (item.name === "Home") {
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`block text-lg font-medium py-3 px-4 rounded-lg transition-all duration-300 touch-manipulation min-h-[44px] flex items-center ${
                          active
                            ? "text-cyan-400 bg-cyan-400/10"
                            : "text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/5"
                        }`}
                        onClick={closeMenu}
                      >
                        {item.name}
                      </Link>
                    );
                  } else if (
                    item.name === "Reviews" ||
                    item.name === "Blogs" ||
                    (!isHomePage && !item.href.startsWith("/#"))
                  ) {
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`block text-lg font-medium py-3 px-4 rounded-lg transition-all duration-300 touch-manipulation min-h-[44px] flex items-center ${
                          active || location.pathname === item.href || (item.name === "Blogs" && location.pathname.startsWith("/blog"))
                            ? "text-cyan-400 bg-cyan-400/10"
                            : "text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/5"
                        }`}
                        onClick={closeMenu}
                      >
                        {item.name}
                      </Link>
                    );
                  } else if (isHomePage && item.href.startsWith("/#")) {
                    return (
                      <button
                        key={item.name}
                        onClick={() => handleSmoothScroll(item.href, item.section)}
                        className={`block w-full text-left text-lg font-medium py-3 px-4 rounded-lg transition-all duration-300 touch-manipulation min-h-[44px] flex items-center ${
                          active
                            ? "text-cyan-400 bg-cyan-400/10"
                            : "text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/5"
                        }`}
                      >
                        {item.name}
                      </button>
                    );
                  } else {
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        className={`block text-lg font-medium py-3 px-4 rounded-lg transition-all duration-300 touch-manipulation min-h-[44px] flex items-center ${
                          active
                            ? "text-cyan-400 bg-cyan-400/10"
                            : "text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/5"
                        }`}
                        onClick={closeMenu}
                      >
                        {item.name}
                      </a>
                    );
                  }
                })}
                
                <div className="pt-4">
                  <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 font-medium text-lg touch-manipulation min-h-[44px]">
                    Neural Access
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
});

Header.displayName = "Header";
export default Header;
