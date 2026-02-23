import React from 'react';
import { Brain, Zap, UserCheck, BarChart2 } from 'lucide-react';
import { useLandingTheme } from '../../../contexts/ThemeContext';

const reasons = [
    {
        icon: <Brain className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-4 sm:mb-6" />,
        title: "Unbeatable 94% Accuracy",
        description: "Traders buy results. Giving your clients a 94% accuracy edge makes your platform an easy sell in a crowded market."
    },
    {
        icon: <Zap className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-4 sm:mb-6" />,
        title: "Institutional Speed for Retail",
        description: "Traders hate lag. Your platform delivers signals in under one second—the same edge as hedge fund bots."
    },
    {
        icon: <UserCheck className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-4 sm:mb-6" />,
        title: "Expert-Led Automation",
        description: "Your clients don't need to code. Our team builds and deploys custom algorithmic strategies tailored to their specific goals. From high-frequency scalping to long-term swing trading, we provide the automation while you provide the platform."
    },
    {
        icon: <BarChart2 className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-4 sm:mb-6" />,
        title: "Proof Before Profit",
        description: "Your users can backtest any strategy against 5+ years of historical data in seconds. They'll see the math work before they risk a single dollar—building deep trust in your brand."
    }
];

const WhyUs = () => {
    const { theme } = useLandingTheme();
    const isDark = theme === 'dark';
    return (
        <section id="why-us" className={`py-16 sm:py-24 relative overflow-hidden ${isDark ? 'bg-[#0a0e17]' : 'bg-white'}`}>
            {/* Grid Background */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.04]"
                style={{
                    backgroundImage: isDark
                        ? `linear-gradient(to right, rgba(59, 130, 246, 0.8) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(59, 130, 246, 0.8) 1px, transparent 1px)`
                        : `linear-gradient(to right, #f9f9f9 1px, transparent 1px),
                           linear-gradient(to bottom, #f9f9f9 1px, transparent 1px)`,
                    backgroundSize: '80px 80px'
                }}
            ></div>

            <div className="container-custom relative z-10 px-4 sm:px-6">
                <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
                    <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-4 sm:mb-6 tracking-tight ${isDark ? 'text-white' : 'text-heading'}`}>
                        A Product Your Traders Will Never Leave
                    </h2>
                    <p className={`text-base sm:text-xl leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        We've built the features retail traders actually crave. When you whitelabel this platform, you're offering institutional-grade tools that turn casual users into lifetime subscribers.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12">
                    {reasons.map((reason, index) => (
                        <div key={index} className="bg-[#181B22] rounded-2xl p-6 md:p-10 shadow-xl border border-gray-800 relative overflow-hidden group hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 hover:border-gray-700">
                            {/* Highlight effect */}
                            <div className="absolute top-0 right-0 p-4 opacity-10 scale-150 transform group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                                <svg className="w-64 h-64 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" /></svg>
                            </div>
                            <div className="relative z-10">
                                {reason.icon}
                                <h3 className="text-xl sm:text-2xl font-bold font-heading mb-3 sm:mb-4 text-white">
                                    {reason.title}
                                </h3>
                                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                                    {reason.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyUs;
