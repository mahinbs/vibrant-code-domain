import React from 'react';
import { useLandingTheme } from '../../../contexts/ThemeContext';

const InsideTheSoftware = () => {
    const { theme } = useLandingTheme();
    const isDark = theme === 'dark';
    return (
        <section id="features" className={`py-16 sm:py-24 ${isDark ? 'bg-[#0a0e17]' : 'bg-gray-50'}`}>
            <div className="container-custom px-4 sm:px-6">
                <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
                    <div className="order-2 lg:order-1">
                        {/* Mock UI card */}
                        <div className={`rounded-2xl overflow-hidden shadow-lg ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'}`}>
                            <div className={`p-3 border-b flex items-center justify-between ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-100'}`}>
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400/80" />
                                    <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-400/80" />
                                </div>
                                <div className={`text-[10px] font-mono tracking-widest uppercase ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                    Boostmysites
                                </div>
                            </div>
                            <div className="p-4 sm:p-6 font-mono text-sm">
                                <div className="flex justify-between mb-5 sm:mb-6 items-end">
                                    <div>
                                        <div className={`text-[10px] tracking-widest mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>ASSET</div>
                                        <div className={`text-xl sm:text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-heading'}`}>BTC/USD</div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`text-[10px] tracking-widest mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>TIMEFRAME</div>
                                        <div className={`px-3 py-1 rounded text-xs ${isDark ? 'text-white bg-white/10' : 'text-heading bg-gray-100'}`}>15 MINUTES</div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3 mb-5 sm:mb-6">
                                    <div className={`p-3 sm:p-4 rounded-xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-100'}`}>
                                        <div className={`text-[10px] tracking-widest mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>PROBABILITY</div>
                                        <div className="text-lg sm:text-xl font-bold text-primary">87% <span className="text-xs text-primary/70 align-top">BULLISH</span></div>
                                    </div>
                                    <div className={`p-3 sm:p-4 rounded-xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-100'}`}>
                                        <div className={`text-[10px] tracking-widest mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>SENTIMENT</div>
                                        <div className="text-lg sm:text-xl font-bold text-primary">GREED <span className="text-xs text-primary/70 align-top">78</span></div>
                                    </div>
                                </div>
                                <div className={`space-y-3 p-3 sm:p-4 rounded-xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-100'}`}>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Trend Strength</span>
                                        <span className={`font-bold ${isDark ? 'text-white' : 'text-heading'}`}>STRONG</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Volatility</span>
                                        <span className="text-amber-600 font-bold">MODERATE</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Entry Zone</span>
                                        <span className="text-primary font-bold bg-primary/10 px-2 py-0.5 rounded">67,400 - 67,250</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2">
                        <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold font-heading mb-6 sm:mb-8 ${isDark ? 'text-white' : 'text-heading'}`}>
                            Inside the Software
                        </h2>
                        <ul className="space-y-5 sm:space-y-6">
                            {[
                                { title: 'Probability Score', desc: "Know the math behind every potential move (0-100%)." },
                                { title: 'Sentiment Meter', desc: 'Gauge market fear and greed instantly.' },
                                { title: 'Volatility Alerts', desc: 'Avoid chop. Trade only when volume confirms.' },
                                { title: 'Condition Report', desc: 'Autodetect Trending vs Sideways markets.' },
                            ].map((item, i) => (
                                <li key={i} className="flex gap-4 group">
                                    <div className="mt-1 w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                                        <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                                    </div>
                                    <div>
                                        <h4 className={`text-base sm:text-lg font-bold mb-1 group-hover:text-primary transition-colors ${isDark ? 'text-white' : 'text-heading'}`}>
                                            {item.title}
                                        </h4>
                                        <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InsideTheSoftware;
