import { useState, useEffect, useRef } from 'react';
import { ArrowRight, BarChart2 } from 'lucide-react';
import { useLandingTheme } from '../../../contexts/ThemeContext';
import ContactFormModal from './ContactFormModal';

interface Square {
    top: number;
    left: number;
}

interface Drop {
    id: number;
    key: number;
    left: number;
    duration: number;
    delay: number;
}

const Hero = () => {
    const { theme } = useLandingTheme();
    const isDark = theme === 'dark';
    const [squares, setSquares] = useState<Square[]>([]);
    const [drops, setDrops] = useState<Drop[]>([]);
    const recentDropsRef = useRef<number[]>([]);
    const [licenseModalOpen, setLicenseModalOpen] = useState(false);

    // Helper to get a unique grid position
    const getUniqueLeft = () => {
        let left;
        let attempts = 0;
        do {
            left = Math.floor(Math.random() * 20) * 80;
            attempts++;
        } while (recentDropsRef.current.includes(left) && attempts < 10);

        // Update recent positions
        recentDropsRef.current = [left, ...recentDropsRef.current].slice(0, 6); // Keep last 6 positions
        return left;
    };

    useEffect(() => {
        // Function to generate random grid positions for squares
        const generateSquares = () => {
            const newSquares = [];
            const numSquares = 5; // Number of active squares

            for (let i = 0; i < numSquares; i++) {
                const top = Math.floor(Math.random() * 10) * 80; // 0 to 800px
                const left = Math.floor(Math.random() * 20) * 80; // 0 to 1600px
                newSquares.push({ top, left });
            }
            setSquares(newSquares);
        };

        // Initialize drops
        const initDrops = () => {
            const newDrops = [];
            const numDrops = 3; // Only 3 drops at a time

            for (let i = 0; i < numDrops; i++) {
                const left = getUniqueLeft();
                const duration = 2 + Math.random() * 2; // 2-4s duration
                const delay = Math.random() * 3; // Initial random delay
                newDrops.push({
                    id: i,
                    key: i, // Key to force re-render
                    left,
                    duration,
                    delay
                });
            }
            setDrops(newDrops);
        };

        generateSquares();
        initDrops();

        const interval = setInterval(generateSquares, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleDropAnimationEnd = (dropId: number) => {
        setDrops(prevDrops => prevDrops.map(drop => {
            if (drop.id === dropId) {
                const left = getUniqueLeft();
                const duration = 2 + Math.random() * 2;
                // Add a small delay before next drop to vary the rhythm
                const delay = Math.random() * 2;
                return {
                    ...drop,
                    key: drop.key + 1, // Increment key to restart animation
                    left,
                    duration,
                    delay
                };
            }
            return drop;
        }));
    };

    return (
        <section className={`relative pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-48 lg:pb-32 overflow-hidden ${isDark ? 'bg-[#0a0e17]' : 'bg-white'}`}>
            {/* Grid Background */}
            <div className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: isDark
                        ? `linear-gradient(to right, rgba(59, 130, 246, 0.06) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(59, 130, 246, 0.06) 1px, transparent 1px)`
                        : `linear-gradient(to right, #f0f0f0 1px, transparent 1px),
                           linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)`,
                    backgroundSize: '80px 80px'
                }}
            >
                {/* Dynamic colored squares */}
                {squares.map((pos, index) => (
                    <div
                        key={`square-${index}`}
                        className="absolute w-[80px] h-[80px] bg-primary/5 transition-all duration-1000 ease-in-out"
                        style={{
                            top: `${pos.top}px`,
                            left: `${pos.left}px`
                        }}
                    ></div>
                ))}

                {/* Drops */}
                {drops.map((drop) => (
                    <div
                        key={`${drop.id}-${drop.key}`}
                        className="absolute w-[2px] h-[150px] bg-gradient-to-b from-transparent to-primary animate-drop"
                        style={{
                            left: `${drop.left}px`,
                            top: '-150px',
                            animationDuration: `${drop.duration}s`,
                            animationDelay: `${drop.delay}s`
                        }}
                        onAnimationEnd={() => handleDropAnimationEnd(drop.id)}
                    ></div>
                ))}
            </div>

            <div className="container-custom relative z-10 flex flex-col items-center text-center px-4 sm:px-6">

                {/* Main Headline */}
                <h1 className={`max-w-5xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading leading-[1.1] mb-3 sm:mb-4 tracking-tight animate-fade-in-up ${isDark ? 'text-white' : 'text-heading'}`}>
                    Build Your <span className="text-primary drop-shadow-sm">Fintech Empire!</span>
                </h1>
                <p className={`hero-subtitle max-w-4xl text-xl sm:text-2xl md:text-3xl font-medium mb-6 sm:mb-10 leading-snug animate-fade-in-up opacity-95 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Launch your Branded AI probability based trading analysis platform.
                </p>

                {/* Description — pyramid width, bold accents */}
                <div className="max-w-2xl mx-auto mb-8 sm:mb-14 animate-fade-in-up">
                    <p className={`text-base sm:text-lg md:text-xl leading-relaxed tracking-tight ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Deploy a professional-grade ecosystem featuring AI-driven probabilities, <strong className={isDark ? 'font-semibold text-gray-200' : 'font-semibold text-gray-800'}>custom algo-trading</strong>, and deep backtesting. We handle the complex infrastructure. You own the brand and keep <strong className="font-semibold text-primary">70% of the profits</strong>.
                    </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12 sm:mb-20 animate-fade-in-up w-full sm:w-auto">
                    <button
                        type="button"
                        onClick={() => setLicenseModalOpen(true)}
                        className="group bg-primary hover:bg-primary-hover text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl shadow-lg shadow-primary/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 font-bold text-base sm:text-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                        Acquire Your License
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                    <button
                        onClick={() => document.getElementById('partner-support')?.scrollIntoView({ behavior: 'smooth' })}
                        className={`border px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl shadow-sm transition-all duration-200 font-bold text-base sm:text-lg flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 ${isDark ? 'bg-white/10 border-white/20 text-white hover:bg-white/20 focus:ring-primary' : 'bg-white border-gray-200 text-heading hover:bg-gray-50 hover:border-gray-300 focus:ring-gray-300'}`}
                    >
                        <BarChart2 className={`mr-2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                        Explore Features
                    </button>
                </div>

                {/* Acquire License Form Modal */}
                <ContactFormModal
                    open={licenseModalOpen}
                    onOpenChange={setLicenseModalOpen}
                    variant="license"
                />

                <p className={`text-center font-medium mb-8 sm:mb-12 text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    White-label the platform. You sell. You earn.
                </p>

                {/* Stats / Trust (replacing Logos) */}
                <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-16 border-t pt-8 sm:pt-12 w-full ${isDark ? 'border-white/10' : 'border-gray-100'}`}>
                    <div>
                        <div className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-white' : 'text-heading'}`}>94%</div>
                        <div className={`text-xs sm:text-sm font-medium mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Model Accuracy</div>
                    </div>
                    <div>
                        <div className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-white' : 'text-heading'}`}>24/7</div>
                        <div className={`text-xs sm:text-sm font-medium mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Market Monitoring</div>
                    </div>
                    <div>
                        <div className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-white' : 'text-heading'}`}>150+</div>
                        <div className={`text-xs sm:text-sm font-medium mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Supported Assets</div>
                    </div>
                    <div>
                        <div className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-white' : 'text-heading'}`}>&lt;1s</div>
                        <div className={`text-xs sm:text-sm font-medium mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Data Latency</div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
