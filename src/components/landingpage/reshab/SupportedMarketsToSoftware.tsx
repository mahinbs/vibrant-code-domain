import React from 'react';
import {
    LineChart,
    Globe,
    Bitcoin,
    Network,
    BarChart2,
    Layers,
    Brain,
    ScanLine,
} from 'lucide-react';
import { useLandingTheme } from '../../../contexts/ThemeContext';

const SupportedMarketsToSoftware = () => {
    const { theme } = useLandingTheme();
    const isDark = theme === 'dark';
    return (
        <>
            {/* Supported Markets */}
            <section id="markets" className={`py-16 sm:py-24 ${isDark ? 'bg-[#0a0e17]' : 'bg-gray-50'}`}>
                <div className="container-custom px-4 sm:px-6">
                    <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-10 sm:mb-16 text-center tracking-tight ${isDark ? 'text-white' : 'text-heading'}`}>
                        Supported Markets
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                        {/* Stocks */}
                        <div className="group bg-[#181B22] rounded-2xl p-6 md:p-8 shadow-xl border border-gray-800 relative overflow-hidden h-full transition-all duration-300 hover:border-gray-700">
                            <div className="absolute top-0 right-0 p-4 opacity-10 scale-150 transform group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                                <svg className="w-64 h-64 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" /></svg>
                            </div>
                            <div className="absolute top-0 right-0 p-6 opacity-30 group-hover:opacity-50 transition-opacity z-10">
                                <LineChart className="w-16 h-16 sm:w-20 sm:h-20 text-primary/30 group-hover:text-primary/50" />
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold mb-3 flex items-center gap-3 text-white relative z-10">
                                <LineChart className="w-6 h-6 sm:w-7 sm:h-7 text-primary" /> Stocks
                            </h3>
                            <p className="mb-6 border-b pb-6 text-gray-400 border-gray-700 relative z-10 text-sm sm:text-base">Indian & US Markets</p>
                            <div className="space-y-4 relative z-10">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="uppercase tracking-wider font-semibold text-gray-400 text-xs sm:text-sm">Timeframes</span>
                                    <span className="font-mono px-2 py-1 rounded text-xs text-white bg-[#252a33] border border-gray-700">5m, 15m, 1h, 1D</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="uppercase tracking-wider font-semibold text-gray-400 text-xs sm:text-sm">Accuracy</span>
                                    <span className="font-mono text-primary font-bold text-lg">65–78%</span>
                                </div>
                            </div>
                        </div>

                        {/* Forex */}
                        <div className="group bg-[#181B22] rounded-2xl p-6 md:p-8 shadow-xl border border-gray-800 relative overflow-hidden h-full transition-all duration-300 hover:border-gray-700">
                            <div className="absolute top-0 right-0 p-4 opacity-10 scale-150 transform group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                                <svg className="w-64 h-64 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" /></svg>
                            </div>
                            <div className="absolute top-0 right-0 p-6 opacity-30 group-hover:opacity-50 transition-opacity z-10">
                                <Globe className="w-16 h-16 sm:w-20 sm:h-20 text-primary/30 group-hover:text-primary/50" />
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold mb-3 flex items-center gap-3 text-white relative z-10">
                                <Globe className="w-6 h-6 sm:w-7 sm:h-7 text-primary" /> Forex
                            </h3>
                            <p className="mb-6 border-b pb-6 text-gray-400 border-gray-700 relative z-10 text-sm sm:text-base">Major & Minor Pairs</p>
                            <div className="space-y-4 relative z-10">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="uppercase tracking-wider font-semibold text-gray-400 text-xs sm:text-sm">Timeframes</span>
                                    <span className="font-mono px-2 py-1 rounded text-xs text-white bg-[#252a33] border border-gray-700">1m, 5m, 15m, 4h</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="uppercase tracking-wider font-semibold text-gray-400 text-xs sm:text-sm">Accuracy</span>
                                    <span className="font-mono text-primary font-bold text-lg">70–82%</span>
                                </div>
                            </div>
                        </div>

                        {/* Crypto */}
                        <div className="group bg-[#181B22] rounded-2xl p-6 md:p-8 shadow-xl border border-gray-800 relative overflow-hidden h-full transition-all duration-300 hover:border-gray-700 sm:col-span-2 md:col-span-1">
                            <div className="absolute top-0 right-0 p-4 opacity-10 scale-150 transform group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                                <svg className="w-64 h-64 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" /></svg>
                            </div>
                            <div className="absolute top-0 right-0 p-6 opacity-30 group-hover:opacity-50 transition-opacity z-10">
                                <Bitcoin className="w-16 h-16 sm:w-20 sm:h-20 text-primary/30 group-hover:text-primary/50" />
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold mb-3 flex items-center gap-3 text-white relative z-10">
                                <Bitcoin className="w-6 h-6 sm:w-7 sm:h-7 text-primary" /> Crypto
                            </h3>
                            <p className="mb-6 border-b pb-6 text-gray-400 border-gray-700 relative z-10 text-sm sm:text-base">BTC, ETH, SOL & Alts</p>
                            <div className="space-y-4 relative z-10">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="uppercase tracking-wider font-semibold text-gray-400 text-xs sm:text-sm">Timeframes</span>
                                    <span className="font-mono px-2 py-1 rounded text-xs text-white bg-[#252a33] border border-gray-700">15m, 1h, 4h, 1D</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="uppercase tracking-wider font-semibold text-gray-400 text-xs sm:text-sm">Accuracy</span>
                                    <span className="font-mono text-primary font-bold text-lg">62–74%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How the AI Works */}
            <section id="how-it-works" className={`py-16 sm:py-24 relative ${isDark ? 'bg-[#0a0e17]' : 'bg-white'}`}>
                <div className="container-custom px-4 sm:px-6">
                    <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-12 sm:mb-20 text-center ${isDark ? 'text-white' : 'text-heading'}`}>
                        How It Works
                    </h2>

                    <div className="relative">
                        <div className="hidden md:block absolute top-10 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent z-0" />
                        {/* Mobile: 2-col grid; md: 5-col row */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 sm:gap-10">
                            {[
                                { title: 'Data Ingestion', icon: Network, desc: 'Real-time price & volume data' },
                                { title: 'Pattern Recog.', icon: BarChart2, desc: 'Identifies complex structures' },
                                { title: 'Strategy Match', icon: Layers, desc: 'Trend, scalp, or swing logic' },
                                { title: 'Prediction', icon: Brain, desc: 'Probability score generation', highlight: true },
                                { title: 'Self Learning', icon: ScanLine, desc: 'Adapts to new market behavior' },
                            ].map((step, i) => (
                                <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                                    <div
                                        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-4 sm:mb-6 transition-all duration-300 border-2 shadow-xl ${step.highlight
                                                ? 'bg-[#181B22] border-primary text-primary shadow-primary/20 ring-2 ring-primary'
                                                : 'bg-[#181B22] border-gray-800 text-gray-400 group-hover:border-primary/50 group-hover:text-primary'
                                            }`}
                                    >
                                        <step.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                                    </div>
                                    <h3 className={`text-sm sm:text-lg font-bold mb-2 ${step.highlight ? 'text-primary' : 'dark:text-white text-black'}`}>
                                        {step.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm leading-relaxed max-w-[140px] sm:max-w-[180px] text-gray-400">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SupportedMarketsToSoftware;
