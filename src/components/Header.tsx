import { Menu, X, Code2 } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useScrollSpy } from '@/hooks/useScrollSpy';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  const activeSection = useScrollSpy({ 
    sectionIds: ['hero', 'services', 'portfolio', 'about', 'contact'],
    rootMargin: '-20% 0px -80% 0px'
  });
  
  const menuItems = [
    { name: 'Home', href: '/', section: 'hero' },
    { name: 'Services', href: '/#services', section: 'services' },
    { name: 'Portfolio', href: '/#portfolio', section: 'portfolio' },
    { name: 'Reviews', href: '/reviews', section: 'reviews' },
    { name: 'About', href: '/#about', section: 'about' },
    { name: 'Contact', href: '/#contact', section: 'contact' }
  ];

  const handleSmoothScroll = (href: string, sectionId: string) => {
    if (isHomePage && href.startsWith('/#')) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
        return;
      }
    }
  };

  const isActive = (item: typeof menuItems[0]) => {
    if (isHomePage) {
      return activeSection === item.section;
    }
    return location.pathname === item.href || (item.href === '/' && location.pathname === '/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-cyan-500/20">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Code2 className="h-8 w-8 text-cyan-400" />
            <span className="text-xl font-bold text-white">BOOSTMYSITES</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map(item => {
              const active = isActive(item);
              
              if (item.name === 'Home') {
                return (
                  <Link 
                    key={item.name} 
                    to={item.href} 
                    className={`transition-all duration-300 font-medium relative group ${
                      active ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'
                    }`}
                  >
                    {item.name}
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${
                      active ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                  </Link>
                );
              } else if (item.name === 'Reviews' || (!isHomePage && !item.href.startsWith('/#'))) {
                return (
                  <Link 
                    key={item.name} 
                    to={item.href} 
                    className={`transition-all duration-300 font-medium relative group ${
                      active || location.pathname === item.href ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'
                    }`}
                  >
                    {item.name}
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${
                      active || location.pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                  </Link>
                );
              } else if (isHomePage && item.href.startsWith('/#')) {
                return (
                  <button
                    key={item.name}
                    onClick={() => handleSmoothScroll(item.href, item.section)}
                    className={`transition-all duration-300 font-medium relative group ${
                      active ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'
                    }`}
                  >
                    {item.name}
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${
                      active ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                  </button>
                );
              } else {
                return (
                  <a 
                    key={item.name} 
                    href={item.href} 
                    className={`transition-all duration-300 font-medium relative group ${
                      active ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'
                    }`}
                  >
                    {item.name}
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${
                      active ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                  </a>
                );
              }
            })}
            <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 font-medium shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105">
              Neural Access
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
                    <Link 
                      key={item.name} 
                      to={item.href} 
                      className={`block transition-colors duration-300 font-medium ${
                        active ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'
                      }`} 
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  );
                } else if (item.name === 'Reviews' || (!isHomePage && !item.href.startsWith('/#'))) {
                  return (
                    <Link 
                      key={item.name} 
                      to={item.href} 
                      className={`block transition-colors duration-300 font-medium ${
                        active || location.pathname === item.href ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'
                      }`} 
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  );
                } else if (isHomePage && item.href.startsWith('/#')) {
                  return (
                    <button
                      key={item.name}
                      onClick={() => handleSmoothScroll(item.href, item.section)}
                      className={`block w-full text-left transition-colors duration-300 font-medium ${
                        active ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'
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
                      className={`block transition-colors duration-300 font-medium ${
                        active ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'
                      }`} 
                      onClick={() => setIsMenuOpen(false)}
                    >
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
};

export default Header;
