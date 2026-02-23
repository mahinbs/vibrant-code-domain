import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLandingTheme } from '../../../contexts/ThemeContext';
import ContactFormModal from './ContactFormModal';

const Navbar = () => {
    const { theme, toggleTheme } = useLandingTheme();
    const isDark = theme === 'dark';
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [demoModalOpen, setDemoModalOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const openDemoModal = () => {
        setDemoModalOpen(true);
        setIsMobileMenuOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const PAGE_PATH = '/rsb-fintech-founder';

    const scrollToSection = (sectionId: string) => {
        setIsMobileMenuOpen(false);

        // If we're not on this landing page, navigate there first then scroll
        if (location.pathname !== PAGE_PATH) {
            navigate(PAGE_PATH, { state: { scrollTo: sectionId } });
            return;
        }

        // Standard smooth scrolling
        const element = document.getElementById(sectionId);
        if (element) {
            const headerOffset = 80; // Approximate navbar height
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    // Handle initial navigation with scroll state
    useEffect(() => {
        if (location.state && (location.state as any).scrollTo) {
            const sectionId = (location.state as any).scrollTo;
            // Small timeout to allow page to render
            setTimeout(() => {
                scrollToSection(sectionId);
                // Clear state
                window.history.replaceState({}, document.title);
            }, 100);
        }
    }, [location]);

    interface NavLinkProps {
        to: string;
        children: React.ReactNode;
        hasDropdown?: boolean;
    }

    const NavLink: React.FC<NavLinkProps> = ({ to, children, hasDropdown }) => (
        <Link to={to} className={`font-medium transition-colors flex items-center gap-1 text-sm hover:text-primary ${isDark ? 'text-white' : 'text-heading'}`}>
            {children}
            {hasDropdown && (
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            )}
        </Link>
    );

    const ScrollLink = ({ to, children }: { to: string, children: React.ReactNode }) => (
        <button
            onClick={() => scrollToSection(to)}
            className={`font-medium transition-colors flex items-center gap-1 text-sm bg-transparent border-none cursor-pointer hover:text-primary ${isDark ? 'text-white' : 'text-heading'}`}
        >
            {children}
        </button>
    );

    const MobileScrollLink = ({ to, children }: { to: string, children: React.ReactNode }) => (
        <button
            onClick={() => scrollToSection(to)}
            className={`font-medium text-left bg-transparent border-none cursor-pointer text-base py-1 ${isDark ? 'text-white hover:text-primary' : 'text-heading hover:text-primary'}`}
        >
            {children}
        </button>
    );

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isDark ? (isScrolled ? 'bg-[#0a0e17] shadow-lg shadow-black/20 py-3' : 'bg-[#0a0e17]/95 backdrop-blur-sm py-4') : (isScrolled ? 'bg-white shadow-sm py-3' : 'bg-white/90 backdrop-blur-sm py-4')}`}>
            <div className="container-custom flex justify-between items-center px-4 sm:px-6">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <span className={`text-xl sm:text-2xl font-bold font-heading tracking-widest uppercase ${isDark ? 'text-white' : 'text-heading'}`}>Boostmysites</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-6">
                    <button
                        type="button"
                        onClick={toggleTheme}
                        className={`p-2 rounded-lg transition-colors ${isDark ? 'text-white hover:text-primary hover:bg-white/10' : 'text-heading hover:text-primary hover:bg-gray-100'}`}
                        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                    <button
                        type="button"
                        onClick={() => setDemoModalOpen(true)}
                        className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded text-sm font-bold transition-colors shadow-sm"
                    >
                        Platform Demo
                    </button>
                </div>

                {/* Mobile: theme toggle + demo button + hamburger */}
                <div className="md:hidden flex items-center gap-2">
                    <button
                        type="button"
                        onClick={toggleTheme}
                        className={`p-2 rounded-lg transition-colors ${isDark ? 'text-white hover:text-primary' : 'text-heading hover:text-primary'}`}
                        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                    <button
                        type="button"
                        onClick={openDemoModal}
                        className="bg-primary hover:bg-primary-hover text-white px-3 py-2 rounded text-xs font-bold transition-colors shadow-sm"
                    >
                        Demo
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={`p-2 rounded-lg focus:outline-none transition-colors ${isDark ? 'text-white hover:bg-white/10' : 'text-heading hover:bg-gray-100'}`}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className={`md:hidden absolute top-full left-0 w-full shadow-lg py-4 px-5 flex flex-col space-y-3 border-t ${isDark ? 'bg-[#0a0e17] border-white/10' : 'bg-white border-gray-200'}`}>
                    <MobileScrollLink to="features">Features</MobileScrollLink>
                    <MobileScrollLink to="partner-support">How It Works</MobileScrollLink>
                    <MobileScrollLink to="why-us">Why Us</MobileScrollLink>
                    <MobileScrollLink to="markets">Markets</MobileScrollLink>
                    <MobileScrollLink to="pricing">Pricing</MobileScrollLink>
                    <MobileScrollLink to="contact">Contact</MobileScrollLink>
                    <button
                        type="button"
                        onClick={openDemoModal}
                        className="bg-primary text-white py-3 rounded text-center font-bold w-full mt-2"
                    >
                        Platform Demo
                    </button>
                </div>
            )}

            {/* Platform Demo Form Modal */}
            <ContactFormModal
                open={demoModalOpen}
                onOpenChange={setDemoModalOpen}
                variant="demo"
                onSuccess={() => setIsMobileMenuOpen(false)}
            />
        </nav>
    );
};

export default Navbar;
