import { Menu, X } from "lucide-react";
import { useState, memo, useCallback, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useIsMobile } from "@/hooks/use-mobile";
import logo from "../assets/logo/logo.png";
import DesktopMenu from "./header/DesktopMenu";
import MobileMenu from "./header/MobileMenu";
import MobileMenuButton from "./header/MobileMenuButton";
import { MenuItem } from "./header/types";
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
    console.log("Header - Mobile state:", {
      isMobile,
      isMenuOpen,
      shouldShowMobileMenu: isMenuOpen && isMobile,
    });
  }, [isMobile, isMenuOpen]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Close menu when switching from mobile to desktop
  useEffect(() => {
    if (!isMobile && isMenuOpen) {
      console.log("Header - Closing menu due to desktop switch");
      setIsMenuOpen(false);
    }
  }, [isMobile, isMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen, isMobile]);
  const menuItems: MenuItem[] = [
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
      href: "/about",
      section: "about",
    },
    {
      name: "Contact",
      href: "/contact",
      section: "contact",
    },
  ];
  const handleSmoothScroll = useCallback(
    (href: string, sectionId: string) => {
      if (isHomePage && href.startsWith("/#")) {
        const element = document.getElementById(sectionId);
        if (element) {
          // Close menu first
          setIsMenuOpen(false);
          // Small delay to ensure menu is closed before scrolling
          setTimeout(() => {
            element.scrollIntoView({
              behavior: "smooth",
            });
          }, 100);
          return;
        }
      }
    },
    [isHomePage]
  );
  const closeMenu = useCallback(() => {
    console.log("Header - Closing menu");
    setIsMenuOpen(false);
  }, []);
  const toggleMenu = useCallback(() => {
    console.log("Header - Toggling menu, current state:", isMenuOpen);
    setIsMenuOpen((prev) => !prev);
  }, [isMenuOpen]);
  const isActive = useCallback(
    (item: MenuItem) => {
      // Handle Home page
      if (item.name === "Home") {
        return location.pathname === "/";
      }

      // Handle Portfolio page
      if (item.name === "Portfolio") {
        return (
          location.pathname === "/portfolio" ||
          (isHomePage && activeSection === item.section)
        );
      }

      // Handle Blogs page and blog posts
      if (item.name === "Blogs") {
        return (
          location.pathname === "/blogs" ||
          location.pathname.startsWith("/blog/")
        );
      }

      // Handle Reviews page
      if (item.name === "Reviews") {
        return location.pathname === "/reviews";
      }

      // Handle About page
      if (item.name === "About") {
        return location.pathname === "/about";
      }

      // Handle Contact page
      if (item.name === "Contact") {
        return location.pathname === "/contact";
      }

      // Handle homepage sections (Services only now)
      if (isHomePage && item.href.startsWith("/#")) {
        return activeSection === item.section;
      }

      // Default fallback for exact path matching
      return location.pathname === item.href;
    },
    [isHomePage, activeSection, location.pathname]
  );
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-cyan-500/20">
        <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 relative">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center z-50 relative">
              <img
                src={logo}
                alt="Boostmysites Logo"
                loading="lazy"
                className="w-[5rem] transition-transform duration-300 filter drop-shadow-lg object-cover"
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 flex-1 justify-center">
              {menuItems.map((item) => {
                const active = isActive(item);
                // Handle pages that should always use Link (Home, Blogs, Reviews, About, Contact, Portfolio)
                if (
                  item.name === "Home" ||
                  item.name === "Reviews" ||
                  item.name === "Blogs" ||
                  item.name === "About" ||
                  item.name === "Contact" ||
                  item.name === "Portfolio"
                ) {
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
                } else if (isHomePage && item.href.startsWith("/#")) {
                  // Handle homepage sections (Services)
                  return (
                    <button
                      key={item.name}
                      onClick={() =>
                        handleSmoothScroll(item.href, item.section)
                      }
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
                  // Fallback to anchor tag
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
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 z-50 relative touch-manipulation"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-cyan-400" />
              ) : (
                <Menu className="h-6 w-6 text-cyan-400" />
              )}
            </button>
          </div>
        </nav>
      </header>
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed z-40 inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeMenu}
            aria-hidden="true"
          />

          {/* Mobile Menu */}
          <div className="lg:hidden fixed top-0 right-0 h-full w-full max-w-sm bg-black/95 backdrop-blur-md border-l border-cyan-500/20 shadow-xl transform transition-transform duration-300 z-[999]">
            {/* Close button */}
            <div className="flex p-6 justify-end">
              <button
                className="p-2 z-50 relative touch-manipulation"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <X className="h-6 w-6 text-cyan-400" />
              </button>
            </div>
            <div className="px-6 space-y-6 h-full overflow-y-auto">
              {menuItems.map((item) => {
                const active = isActive(item);
                // Handle pages that should always use Link (Home, Blogs, Reviews, About, Contact, Portfolio)
                if (
                  item.name === "Home" ||
                  item.name === "Reviews" ||
                  item.name === "Blogs" ||
                  item.name === "About" ||
                  item.name === "Contact" ||
                  item.name === "Portfolio"
                ) {
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`block text-lg font-medium py-3 px-4 rounded-lg transition-all duration-300 touch-manipulation ${
                        active
                          ? "text-cyan-400 bg-cyan-400/10"
                          : "text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/5"
                      }`}
                      onClick={closeMenu}
                    >
                      {item.name}
                    </Link>
                  );
                } else if (isHomePage && item.href.startsWith("/#")) {
                  // Handle homepage sections (Services)
                  return (
                    <button
                      key={item.name}
                      onClick={() => {
                        handleSmoothScroll(item.href, item.section);
                      }}
                      className={`block w-full text-left text-lg font-medium py-3 px-4 rounded-lg transition-all duration-300 touch-manipulation ${
                        active
                          ? "text-cyan-400 bg-cyan-400/10"
                          : "text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/5"
                      }`}
                    >
                      {item.name}
                    </button>
                  );
                } else {
                  // Fallback to anchor tag
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`block text-lg font-medium py-3 px-4 rounded-lg transition-all duration-300 touch-manipulation ${
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
            </div>
          </div>
        </>
      )}
    </>
  );
});
Header.displayName = "Header";
export default Header;
