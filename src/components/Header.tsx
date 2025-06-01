
import { Menu, X, Code2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/#services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'About', href: '/#about' },
    { name: 'Team', href: '/#team' },
    { name: 'Contact', href: '/#contact' }
  ];

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
            {menuItems.map(item => 
              item.name === 'Home' || item.name === 'Portfolio' ? (
                <Link 
                  key={item.name} 
                  to={item.href} 
                  className="text-gray-300 hover:text-cyan-400 transition-all duration-300 font-medium relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ) : (
                <a 
                  key={item.name} 
                  href={item.href} 
                  className="text-gray-300 hover:text-cyan-400 transition-all duration-300 font-medium relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              )
            )}
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
              {menuItems.map(item => 
                item.name === 'Home' || item.name === 'Portfolio' ? (
                  <Link 
                    key={item.name} 
                    to={item.href} 
                    className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a 
                    key={item.name} 
                    href={item.href} 
                    className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                )
              )}
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
