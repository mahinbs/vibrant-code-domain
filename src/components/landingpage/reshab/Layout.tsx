import React from 'react';
import { ThemeProvider, useLandingTheme } from '../../../contexts/ThemeContext';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
    children: React.ReactNode;
}

const TELEGRAM_URL = 'https://t.me/ceoboii';

const LayoutContent: React.FC<LayoutProps> = ({ children }) => {
    const { theme } = useLandingTheme();
    const isDark = theme === 'dark';
    return (
        <div className={`flex flex-col min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#0a0e17]' : 'bg-white'}`}>
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />

            {/* Floating Telegram button — slightly smaller on mobile to avoid overlap */}
            <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#0088cc] flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform text-white"
                aria-label="Chat on Telegram"
            >
                <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
            </a>
        </div>
    );
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <ThemeProvider>
            <LayoutContent>{children}</LayoutContent>
        </ThemeProvider>
    );
};

export default Layout;
