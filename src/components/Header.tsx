
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
    console.log('Header - Mobile state:', { isMobile, isMenuOpen, shouldShowMobileMenu: isMenuOpen && isMobile });
  }, [isMobile, isMenuOpen]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Close menu when switching from mobile to desktop
  useEffect(() => {
    if (!isMobile && isMenuOpen) {
      console.log('Header - Closing menu due to desktop switch');
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

  const closeMenu = useCallback(() => {
    console.log('Header - Closing menu');
    setIsMenuOpen(false);
  }, []);
  
  const toggleMenu = useCallback(() => {
    console.log('Header - Toggling menu, current state:', isMenuOpen);
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
        return location.pathname === "/portfolio" || 
               (isHomePage && activeSection === item.section);
      }

      // Handle Blogs page and blog posts
      if (item.name === "Blogs") {
        return location.pathname === "/blogs" || 
               location.pathname.startsWith("/blog/");
      }

      // Handle Reviews page
      if (item.name === "Reviews") {
        return location.pathname === "/reviews";
      }

      // Handle homepage sections (Services, About, Contact)
      if (isHomePage && item.href.startsWith("/#")) {
        return activeSection === item.section;
      }

      // Default fallback for exact path matching
      return location.pathname === item.href;
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
          <DesktopMenu
            menuItems={menuItems}
            isActive={isActive}
            isHomePage={isHomePage}
            onSmoothScroll={handleSmoothScroll}
          />

          {/* Mobile Menu Button */}
          <MobileMenuButton
            isOpen={isMenuOpen}
            onToggle={toggleMenu}
          />
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={isMenuOpen}
          onClose={closeMenu}
          menuItems={menuItems}
          isActive={isActive}
          isHomePage={isHomePage}
          onSmoothScroll={handleSmoothScroll}
          isMobile={isMobile}
        />
      </nav>
    </header>
  );
});

Header.displayName = "Header";
export default Header;
