import { Menu, X } from 'lucide-react';
import { useState, memo, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useScrollSpy } from '@/hooks/useScrollSpy';

const Header = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const activeSection = useScrollSpy({
    sectionIds: ['hero', 'services', 'portfolio', 'about', 'contact'],
    rootMargin: '-20% 0px -80% 0px'
  });
  const menuItems = [{
    name: 'Home',
    href: '/',
    section: 'hero'
  }, {
    name: 'Services',
    href: '/#services',
    section: 'services'
  }, {
    name: 'Portfolio',
    href: '/#portfolio',
    section: 'portfolio'
  }, {
    name: 'Reviews',
    href: '/reviews',
    section: 'reviews'
  }, {
    name: 'About',
    href: '/#about',
    section: 'about'
  }, {
    name: 'Contact',
    href: '/#contact',
    section: 'contact'
  }];
  const handleSmoothScroll = useCallback((href: string, sectionId: string) => {
    if (isHomePage && href.startsWith('/#')) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth'
        });
        setIsMenuOpen(false);
        return;
      }
    }
  }, [isHomePage]);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);
  const isActive = useCallback((item: typeof menuItems[0]) => {
    if (isHomePage) {
      return activeSection === item.section;
    }
    return location.pathname === item.href || item.href === '/' && location.pathname === '/';
  }, [isHomePage, activeSection, location.pathname]);
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-cyan-500/20">
      <nav className="container mx-auto px-6 py-4 relative">
        <div className="flex justify-between items-center">
          {/* Logo positioned absolutely to not affect header height */}
          <Link to="/" className="absolute -top-32 left-6 z-10">
            <img 
              src="https://res.cloudinary.com/dknafpppp/image/upload/v1748806784/freepik_br_f976b57b-9b0c-47dc-8aa0-439758154a91_cpevk3.png" 
              alt="Boostmysites Logo" 
              loading="lazy" 
              className="h-80 w-80 md:h-96 md:w-96 hover:scale-110 transition-transform duration-300 filter drop-shadow-lg object-cover" 
            />
          </Link>

          {/* Invisible spacer to maintain layout balance */}
          <div className="flex-shrink-0 w-0"></div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map(item => {
              const active = isActive(item);
              if (item.name === 'Home') {
                return (
                  <Link key={item.name} to={item.href} className={`transition-all duration-300 font-medium relative group ${active ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'}`}>
                    {item.name}
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </Link>
                );
              } else if (item.name === 'Reviews' || (!isHomePage && !item.href.startsWith('/#'))) {
                return (
                  <Link key={item.name} to={item.href} className={`transition-all duration-300 font-medium relative group ${active || location.pathname === item.href ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'}`}>
                    {item.name}
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${active || location.pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </Link>
                );
              } else if (isHomePage && item.href.startsWith('/#')) {
                return (
                  <button key={item.name} onClick={() => handleSmoothScroll(item.href, item.section)} className={`transition-all duration-300 font-medium relative group ${active ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'}`}>
                    {item.name}
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </button>
                );
              } else {
                return (
                  <a key={item.name} href={item.href} className={`transition-all duration-300 font-medium relative group ${active ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'}`}>
                    {item.name}
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </a>
                );
              }
            })}
            <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 font-medium shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105">
              Neural Access
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6 text-cyan-400" /> : <Menu className="h-6 w-6 text-cyan-400" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md border-b border-cyan-500/20 shadow-lg">
            <div className="px-6 py-4 space-y-4">
              {menuItems.map(item => {
                const active = isActive(item);
                if (item.name === 'Home') {
                  return (
                    <Link key={item.name} to={item.href} className={`block transition-colors duration-300 font-medium ${active ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'}`} onClick={closeMenu}>
                      {item.name}
                    </Link>
                  );
                } else if (item.name === 'Reviews' || (!isHomePage && !item.href.startsWith('/#'))) {
                  return (
                    <Link key={item.name} to={item.href} className={`block transition-colors duration-300 font-medium ${active || location.pathname === item.href ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'}`} onClick={closeMenu}>
                      {item.name}
                    </Link>
                  );
                } else if (isHomePage && item.href.startsWith('/#')) {
                  return (
                    <button key={item.name} onClick={() => handleSmoothScroll(item.href, item.section)} className={`block w-full text-left transition-colors duration-300 font-medium ${active ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'}`}>
                      {item.name}
                    </button>
                  );
                } else {
                  return (
                    <a key={item.name} href={item.href} className={`block transition-colors duration-300 font-medium ${active ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'}`} onClick={closeMenu}>
                      {item.name}
                    </a>
                  );
                }
              })}
              <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 font-medium">
                Neural Access
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
});

Header.displayName = 'Header';
export default Header;
