import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import {
    FaChartLine,
    FaNetworkWired,
    FaBrain,
    FaShieldAlt,
    FaCheckCircle,
    FaTimesCircle,
    FaPlay,
    FaRobot,
    FaGlobe,
    FaChartBar,
    FaBitcoin,
    FaLock,
    FaUserShield,
    FaArrowRight,
    FaLayerGroup
} from 'react-icons/fa';
import { MdTrendingUp, MdTrendingDown, MdOutlinePriceChange, MdSpeed, MdTimeline } from 'react-icons/md';
import { BiCctv } from 'react-icons/bi';
import { BsGraphUpArrow, BsLightningChargeFill } from 'react-icons/bs';

const AiStockPrediction = () => {
    const [activeTab, setActiveTab] = useState('stocks');

    const [api, setApi] = useState<CarouselApi>();

    React.useEffect(() => {
        if (!api) {
            return;
        }

        const intervalId = setInterval(() => {
            api.scrollNext();
        }, 3000);

        return () => clearInterval(intervalId);
    }, [api]);

    const accuracyData: Record<string, { accuracy: string; active: string; trades: string; winRate: string }> = {
        stocks: { accuracy: '78%', active: '3 years', trades: '12,450', winRate: '72%' },
        forex: { accuracy: '82%', active: '4 years', trades: '45,200', winRate: '76%' },
        crypto: { accuracy: '74%', active: '2 years', trades: '8,900', winRate: '68%' }
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden">
            <Helmet>
                <title>AI-Powered Market Predictions | Stocks, Forex & Crypto</title>
                <meta name="description" content="Data-driven market predictions. Not signals. Not tips. AI software for serious traders." />
            </Helmet>

            <Header />

            {/* 1. Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center pt-40 pb-20 px-4 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    {/* Hero Background Image */}
                    <div className="absolute inset-0 bg-[url('/ai_stock_hero_bg.webp')] bg-cover bg-top opacity-90 mix-blend-screen"></div>

                    {/* Overlay Gradients for Depth */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black z-10"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-black/60 to-black z-10"></div>

                    {/* Animated Elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse z-0 hidden md:block"></div>
                </div>

                <div className="container mx-auto z-10 text-center relative">
                    {/* <ScrollReveal delay={0.2}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-cyan-400 text-xs md:text-sm font-medium mb-8 backdrop-blur-xl shadow-lg shadow-cyan-900/10">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                            </span>
                            AI Model Updated: {new Date().toLocaleDateString()}
                        </div>
                    </ScrollReveal> */}

                    <ScrollReveal delay={0.4}>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[1.1] max-w-6xl mx-auto text-white drop-shadow-2xl">
                            AI-Powered Market <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient">Predictions</span>
                        </h1>
                    </ScrollReveal>

                    <ScrollReveal delay={0.6}>
                        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
                            Data-driven predictions for Stocks, Forex & Crypto. <br />
                            <span className="text-white font-medium">Not signals. Not tips. Just pure probability.</span>
                        </p>
                    </ScrollReveal>

                    <ScrollReveal delay={0.8}>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                            <Button className="bg-cyan-500 text-black hover:bg-cyan-400 text-lg px-10 py-7 rounded-full font-bold shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:shadow-[0_0_60px_rgba(6,182,212,0.5)] transition-all duration-300 hover:-translate-y-1">
                                View Live Demo
                            </Button>
                            <Button variant="outline" className="border-gray-700 text-black hover:text-white hover:bg-white/5 backdrop-blur-sm text-lg px-10 py-7 rounded-full hover:border-gray-500 transition-all duration-300">
                                Check Accuracy Report
                            </Button>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={1.0}>
                        <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400 font-medium">
                            <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5"><FaTimesCircle className="text-red-500" /> Not a signal provider</span>
                            <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5"><FaTimesCircle className="text-red-500" /> Not investment advice</span>
                            <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5"><FaGlobe className="text-cyan-500" /> Used by traders globally</span>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* 2. What Exactly You Offer */}
            <section className="py-32 border-t border-white/5 bg-zinc-950/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <ScrollReveal>
                        <div className="max-w-4xl mx-auto mb-20">
                            <h2 className="text-4xl md:text-5xl font-bold mb-8">We sell <span className="text-cyan-400">AI software</span>, not trading advice.</h2>
                            <p className="text-gray-400 text-xl font-light">
                                Our algorithms analyze market data to provide probabilities. You make the final decision.
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-3 gap-8 text-left">
                        {[
                            { icon: <FaRobot />, title: "AI Prediction Engine", desc: "Advanced machine learning models that adapt to changing market conditions.", color: "text-cyan-400", bg: "bg-cyan-500/10" },
                            { icon: <MdTrendingUp />, title: "Market Probabilities", desc: "Clear Bullish, Bearish, or Ranging probabilities for every timeframe.", color: "text-blue-400", bg: "bg-blue-500/10" },
                            { icon: <FaUserShield />, title: "You Control The Trade", desc: "No blind signals. We provide the data; you decide the entry and exit.", color: "text-purple-400", bg: "bg-purple-500/10" }
                        ].map((item, i) => (
                            <ScrollReveal key={i} delay={i * 0.2} direction="up">
                                <div className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-cyan-500/30 transition-all duration-500 hover:bg-white/10 hover:-translate-y-2 group h-full">
                                    <div className={`p-4 ${item.bg} w-fit rounded-2xl mb-6 ${item.color} text-3xl shadow-lg ring-1 ring-white/10 group-hover:scale-110 transition-transform`}>{item.icon}</div>
                                    <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                                    <p className="text-gray-400 leading-relaxed font-light">{item.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Supported Markets */}
            <section className="py-32 bg-black relative">
                <div className="container mx-auto px-4">
                    <ScrollReveal>
                        <h2 className="text-4xl md:text-6xl font-bold mb-20 text-center tracking-tight">Supported Markets</h2>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Stocks */}
                        <ScrollReveal delay={0.1}>
                            <div className="group relative p-1 rounded-[2rem] bg-gradient-to-b from-white/10 to-transparent hover:from-cyan-500/50 transition-all duration-500 h-full">
                                <div className="bg-zinc-950 h-full p-10 rounded-[1.9rem] relative overflow-hidden backdrop-blur-xl">
                                    <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-110">
                                        <BsGraphUpArrow className="text-8xl text-cyan-900/40 group-hover:text-cyan-500/20" />
                                    </div>
                                    <h3 className="text-3xl font-bold mb-4 flex items-center gap-3"><FaChartLine className="text-cyan-400" /> Stocks</h3>
                                    <p className="text-gray-400 mb-8 border-b border-white/5 pb-8">Indian & US Markets</p>
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-500 uppercase tracking-widest font-semibold">Timeframes</span>
                                            <span className="font-mono text-white bg-white/5 px-2 py-1 rounded">5m, 15m, 1h, 1D</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-500 uppercase tracking-widest font-semibold">Accuracy</span>
                                            <span className="font-mono text-cyan-400 font-bold text-lg">65–78%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Forex */}
                        <ScrollReveal delay={0.2}>
                            <div className="group relative p-1 rounded-[2rem] bg-gradient-to-b from-white/10 to-transparent hover:from-blue-500/50 transition-all duration-500 h-full">
                                <div className="bg-zinc-950 h-full p-10 rounded-[1.9rem] relative overflow-hidden backdrop-blur-xl">
                                    <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-110">
                                        <FaGlobe className="text-8xl text-blue-900/40 group-hover:text-blue-500/20" />
                                    </div>
                                    <h3 className="text-3xl font-bold mb-4 flex items-center gap-3"><MdOutlinePriceChange className="text-blue-400" /> Forex</h3>
                                    <p className="text-gray-400 mb-8 border-b border-white/5 pb-8">Major & Minor Pairs</p>
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-500 uppercase tracking-widest font-semibold">Timeframes</span>
                                            <span className="font-mono text-white bg-white/5 px-2 py-1 rounded">1m, 5m, 15m, 4h</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-500 uppercase tracking-widest font-semibold">Accuracy</span>
                                            <span className="font-mono text-blue-400 font-bold text-lg">70–82%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Crypto */}
                        <ScrollReveal delay={0.3}>
                            <div className="group relative p-1 rounded-[2rem] bg-gradient-to-b from-white/10 to-transparent hover:from-purple-500/50 transition-all duration-500 h-full">
                                <div className="bg-zinc-950 h-full p-10 rounded-[1.9rem] relative overflow-hidden backdrop-blur-xl">
                                    <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-110">
                                        <FaBitcoin className="text-8xl text-purple-900/40 group-hover:text-purple-500/20" />
                                    </div>
                                    <h3 className="text-3xl font-bold mb-4 flex items-center gap-3"><FaBrain className="text-purple-400" /> Crypto</h3>
                                    <p className="text-gray-400 mb-8 border-b border-white/5 pb-8">BTC, ETH, SOL & Alts</p>
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-500 uppercase tracking-widest font-semibold">Timeframes</span>
                                            <span className="font-mono text-white bg-white/5 px-2 py-1 rounded">15m, 1h, 4h, 1D</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-500 uppercase tracking-widest font-semibold">Accuracy</span>
                                            <span className="font-mono text-purple-400 font-bold text-lg">62–74%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* 4. How the AI Works */}
            <section className="py-32 bg-zinc-950/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/10 to-black pointer-events-none"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <ScrollReveal>
                        <h2 className="text-4xl md:text-6xl font-bold mb-24 text-center">How It Works</h2>
                    </ScrollReveal>

                    <div className="relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-10 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-900 to-transparent z-0"></div>

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
                            {[
                                { title: "Data Ingestion", icon: <FaNetworkWired />, desc: "Real-time price & volume data" },
                                { title: "Pattern Recog.", icon: <FaChartBar />, desc: "Identifies complex structures" },
                                { title: "Strategy Match", icon: <FaLayerGroup />, desc: "Trend, scalp, or swing logic" },
                                { title: "Prediction", icon: <FaBrain />, desc: "Probability score generation", highlight: true },
                                { title: "Self Learning", icon: <BiCctv />, desc: "Adapts to new market behavior" }
                            ].map((step, i) => (
                                <ScrollReveal key={i} delay={i * 0.15} direction="up">
                                    <div className={`relative z-10 flex flex-col items-center text-center group`}>
                                        <div className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl mb-8 transition-all duration-500 border-4 ${step.highlight ? 'bg-black border-cyan-500 text-cyan-400 shadow-[0_0_50px_rgba(6,182,212,0.4)] scale-110' : 'bg-black border-zinc-800 text-gray-500 group-hover:border-white/20 group-hover:text-white'}`}>
                                            {step.icon}
                                        </div>
                                        <h3 className={`text-xl font-bold mb-3 ${step.highlight ? 'text-cyan-400' : 'text-white'}`}>{step.title}</h3>
                                        <p className="text-sm text-gray-500 leading-relaxed max-w-[180px]">{step.desc}</p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. What User Sees (Demo Features) */}
            <section className="py-32 bg-black relative">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="order-2 lg:order-1">
                            <ScrollReveal direction="right">
                                {/* Mock UI Interface */}
                                <div className="bg-zinc-900/80 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative transform hover:rotate-1 transition-transform duration-700 ease-out">
                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 pointer-events-none"></div>
                                    <div className="bg-zinc-950 p-4 border-b border-white/5 flex items-center justify-between">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                        </div>
                                        <div className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">BMS_AI_PREDICTOR_V4.exe</div>
                                    </div>
                                    <div className="p-8 font-mono text-sm relative z-10">
                                        <div className="flex justify-between mb-8 items-end">
                                            <div>
                                                <div className="text-gray-500 text-[10px] tracking-widest mb-1">ASSET</div>
                                                <div className="text-3xl font-bold text-white tracking-tight">BTC/USD</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-gray-500 text-[10px] tracking-widest mb-1">TIMEFRAME</div>
                                                <div className="text-white bg-white/10 px-3 py-1 rounded text-xs">15 MINUTES</div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mb-8">
                                            <div className="bg-black/60 p-5 rounded-xl border border-white/5 shadow-inner">
                                                <div className="text-gray-500 text-[10px] tracking-widest mb-2">PROBABILITY</div>
                                                <div className="text-3xl font-bold text-green-400">87% <span className="text-xs text-green-500/70 align-top">BULLISH</span></div>
                                            </div>
                                            <div className="bg-black/60 p-5 rounded-xl border border-white/5 shadow-inner">
                                                <div className="text-gray-500 text-[10px] tracking-widest mb-2">SENTIMENT</div>
                                                <div className="text-3xl font-bold text-cyan-400">GREED <span className="text-xs text-cyan-500/70 align-top">78</span></div>
                                            </div>
                                        </div>

                                        <div className="space-y-4 bg-black/40 p-6 rounded-xl border border-white/5">
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="text-gray-500">Trend Strength</span>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-24 h-1.5 bg-gray-800 rounded-full overflow-hidden"><div className="h-full w-[85%] bg-gradient-to-r from-green-600 to-green-400"></div></div>
                                                    <span className="text-white font-bold">STRONG</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="text-gray-500">Volatility</span>
                                                <span className="text-yellow-500 font-bold">MODERATE</span>
                                            </div>
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="text-gray-500">Entry Zone</span>
                                                <span className="text-cyan-400 font-bold bg-cyan-900/20 px-2 py-0.5 rounded">67,400 - 67,250</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>

                        <div className="order-1 lg:order-2">
                            <ScrollReveal>
                                <h2 className="text-4xl md:text-5xl font-bold mb-10">Inside the Software</h2>
                                <ul className="space-y-8">
                                    {[
                                        { title: "Probability Score", desc: "Know the math behind every potential move (0-100%)." },
                                        { title: "Sentiment Meter", desc: "Gauge market fear and greed instantly." },
                                        { title: "Volatility Alerts", desc: "Avoid chop. Trade only when volume confirms." },
                                        { title: "Condition Report", desc: "Autodetect Trending vs Sideways markets." }
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-6 group">
                                            <div className="mt-1 w-8 h-8 rounded-full bg-cyan-900/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500/20 transition-colors">
                                                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{item.title}</h4>
                                                <p className="text-gray-400 font-light leading-relaxed">{item.desc}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Accuracy & Transparency */}
            <section className="py-32 bg-gradient-to-b from-zinc-900 to-black relative">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <ScrollReveal>
                        <h2 className="text-4xl md:text-6xl font-bold mb-6">Transparent Accuracy</h2>
                        <p className="text-gray-400 mb-16 text-xl font-light">We don't hide losing trades. Real performance from our backtesting engines.</p>
                    </ScrollReveal>

                    <ScrollReveal delay={0.2}>
                        <div className="flex justify-center mb-16">
                            <div className="inline-flex bg-zinc-900 border border-white/5 p-1.5 rounded-full shadow-xl">
                                {['stocks', 'forex', 'crypto'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-8 py-3 rounded-full text-sm font-bold capitalize transition-all duration-300 ${activeTab === tab ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.3)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto mb-12">
                        {[
                            { label: "Avg Accuracy", value: accuracyData[activeTab].accuracy, color: "text-cyan-400" },
                            { label: "Data Points", value: accuracyData[activeTab].trades, color: "text-white" },
                            { label: "Backtest Win Rate", value: accuracyData[activeTab].winRate, color: "text-green-500" },
                            { label: "Data History", value: accuracyData[activeTab].active, color: "text-purple-400" }
                        ].map((stat, i) => (
                            <ScrollReveal key={i} delay={0.3 + (i * 0.1)} direction="up">
                                <div className="p-8 bg-black/50 border border-white/10 rounded-3xl backdrop-blur-sm hover:border-white/20 transition-colors h-full">
                                    <div className={`text-3xl md:text-5xl font-bold ${stat.color} mb-3 tracking-tight`}>{stat.value}</div>
                                    <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-[0.2em] font-medium">{stat.label}</div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal delay={0.8}>
                        <p className="text-sm text-gray-500 max-w-2xl mx-auto italic border-l-2 border-gray-800 pl-4 py-2 text-left">
                            *Disclaimer: Past performance indicates model capability but does not guarantee future results. Accuracy varies based on market volatility and user execution.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* 7. Who This Is For */}
            <section className="py-24 bg-zinc-950">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Built for serious players</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Retail Traders", desc: "Stop guessing. Add institutional-grade logic to your setup." },
                            { title: "Forex Scalpers", desc: "Identify quick reversals and continuation patterns instantly." },
                            { title: "Crypto Holders", desc: "Know the best accumulation zones during bear markets." },
                            { title: "Prop Firms", desc: "Consistency tools for funded trader challenges." }
                        ].map((item, i) => (
                            <div key={i} className="p-8 bg-zinc-950 border border-white/5 rounded-2xl hover:border-cyan-500/30 transition-colors">
                                <h3 className="text-xl font-bold mb-4 text-white">{item.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. What This Is NOT */}
            <section className="py-24 bg-red-950/10 border-y border-red-900/20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">What this is <span className="text-red-500 decoration-red-500 underline decoration-4 underline-offset-4">NOT</span></h2>
                        <div className="grid md:grid-cols-2 gap-8 text-left">
                            {[
                                "Not a signal group or Telegram channel",
                                "Not financial advice or investment tips",
                                "Not a 'get rich quick' scheme",
                                "Not guaranteed profits (markets involve risk)"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 text-lg font-medium text-gray-300 bg-black/40 p-4 rounded-xl border border-red-500/10">
                                    <FaTimesCircle className="text-red-500 flex-shrink-0 text-xl" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 9. Pricing Section */}
            <section className="py-24 bg-black relative">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">Simple Pricing</h2>
                    <p className="text-center text-gray-400 mb-16">Choose your access level.</p>

                    <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
                        {/* Monthly */}
                        <div className="p-8 rounded-3xl bg-zinc-900/50 border border-white/10 flex flex-col hover:border-gray-600 transition-colors">
                            <h3 className="text-xl font-bold text-gray-400 mb-2">Monthly</h3>
                            <div className="text-4xl font-bold mb-6">$49<span className="text-lg text-gray-500 font-normal">/mo</span></div>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex gap-3 text-sm text-gray-300"><FaCheckCircle className="text-green-500 flex-shrink-0" /> All Market Access</li>
                                <li className="flex gap-3 text-sm text-gray-300"><FaCheckCircle className="text-green-500 flex-shrink-0" /> Live Predictions</li>
                                <li className="flex gap-3 text-sm text-gray-300"><FaCheckCircle className="text-green-500 flex-shrink-0" /> Basic Support</li>
                            </ul>
                            <Button className="w-full py-6 bg-white text-black hover:bg-gray-200 rounded-xl font-bold">Start Monthly</Button>
                        </div>

                        {/* Quarterly */}
                        <div className="p-10 rounded-[2rem] bg-gradient-to-b from-gray-900 via-zinc-900 to-black border border-cyan-500 shadow-2xl shadow-cyan-900/20 transform md:scale-110 flex flex-col relative z-20">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-500 text-black text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-cyan-500/50">Best Value</div>
                            <h3 className="text-xl font-bold text-cyan-400 mb-2">Quarterly</h3>
                            <div className="text-4xl font-bold mb-2 text-white">$129<span className="text-lg text-gray-400 font-normal">/qtr</span></div>
                            <div className="text-sm text-green-400 mb-6">Save 15%</div>
                            <ul className="space-y-5 mb-10 flex-1">
                                <li className="flex gap-3 text-sm text-white font-medium"><FaCheckCircle className="text-cyan-500 flex-shrink-0" /> All Market Access</li>
                                <li className="flex gap-3 text-sm text-white font-medium"><FaCheckCircle className="text-cyan-500 flex-shrink-0" /> Priority Alerts</li>
                                <li className="flex gap-3 text-sm text-white font-medium"><FaCheckCircle className="text-cyan-500 flex-shrink-0" /> Strategy Session (1hr)</li>
                            </ul>
                            <Button className="w-full py-7 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/25">Get Quarterly Access</Button>
                        </div>

                        {/* Lifetime */}
                        <div className="p-8 rounded-3xl bg-zinc-900/50 border border-white/10 flex flex-col hover:border-gray-600 transition-colors">
                            <h3 className="text-xl font-bold text-gray-400 mb-2">Lifetime</h3>
                            <div className="text-4xl font-bold mb-6">$499<span className="text-lg text-gray-500 font-normal">/one-time</span></div>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex gap-3 text-sm text-gray-300"><FaCheckCircle className="text-green-500 flex-shrink-0" /> Forever Access</li>
                                <li className="flex gap-3 text-sm text-gray-300"><FaCheckCircle className="text-green-500 flex-shrink-0" /> All Future Updates</li>
                                <li className="flex gap-3 text-sm text-gray-300"><FaCheckCircle className="text-green-500 flex-shrink-0" /> Private Discord Access</li>
                            </ul>
                            <Button variant="outline" className="w-full py-6 bg-white text-black hover:bg-gray-200 rounded-xl font-bold">Get Lifetime</Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 10. Live Demo Placeholder */}
            <section className="py-24 bg-zinc-950">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-8">See it in action</h2>
                    <div className="max-w-4xl mx-auto aspect-video bg-zinc-900 rounded-2xl border border-gray-800 flex items-center justify-center relative group cursor-pointer overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors"></div>
                        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform relative z-10">
                            {/* Corrected Icon usage later */}
                            <FaPlay className="text-white text-3xl ml-1" />
                        </div>
                        <p className="absolute bottom-8 text-white font-medium z-10">Watch full market analysis video (2:34)</p>
                    </div>
                    <div className="mt-8">
                        <Button className="bg-cyan-500 text-black hover:bg-cyan-400 font-bold px-8 py-6 rounded-full">Request Live Demo</Button>
                    </div>
                </div>
            </section>

            {/* 11. Testimonials */}
            <section className="py-24 bg-black overflow-hidden">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Traders Trust Us</h2>

                    <div className="max-w-5xl mx-auto">
                        <Carousel
                            setApi={setApi}
                            opts={{
                                align: "start",
                                loop: true,
                            }}
                            className="w-full"
                        >
                            <CarouselContent className="-ml-4">
                                {[
                                    { name: "Arjun K.", loc: "Mumbai", text: "The probability score has completely changed how I manage risk. No more guessing.", profit: "+24% this month" },
                                    { name: "Vikram S.", loc: "Bangalore", text: "I treat this as a confirmation tool. If my analysis matches the AI, I enter size. Simple.", profit: "Consistent Wins" },
                                    { name: "Rohan M.", loc: "Delhi", text: "Finally, software that doesn't just spam buy/sell signals. It gives me context for Nifty options.", profit: "Option Buyer" },
                                    { name: "Priya D.", loc: "Hyderabad", text: "I was skeptical at first, but the backtesting data is undeniable. It keeps me out of bad trades.", profit: "+18% this month" },
                                    { name: "Amit B.", loc: "Pune", text: "The sentiment analysis is spot on. It warned me about the market crash 2 days before it happened.", profit: "Saved Portfolio" }
                                ].map((user, i) => (
                                    <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                        <div className="bg-zinc-900 p-8 rounded-2xl border border-white/5 relative h-full flex flex-col justify-between hover:border-cyan-500/30 transition-colors">
                                            <div>
                                                <div className="text-cyan-400 text-4xl font-serif mb-4 opacity-50">"</div>
                                                <p className="text-gray-300 mb-6 italic text-lg leading-relaxed">{user.text}</p>
                                            </div>
                                            <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/5">
                                                <div className="w-12 h-12 bg-gradient-to-br from-cyan-900 to-black rounded-full flex items-center justify-center font-bold text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.2)]">{user.name[0]}</div>
                                                <div>
                                                    <div className="font-bold text-white text-base">{user.name} <span className="text-gray-500 font-normal text-sm ml-1">({user.loc})</span></div>
                                                    <div className="text-green-500 text-sm font-bold bg-green-500/10 px-2 py-0.5 rounded inline-block mt-1">{user.profit}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>
                </div>
            </section>

            {/* 12. Legal & Compliance */}
            <section className="py-16 bg-zinc-950 border-t border-white/5 text-sm text-gray-500">
                <div className="container mx-auto px-4 max-w-5xl text-center space-y-4">
                    <h3 className="text-lg font-bold text-gray-400 mb-4">Risk Disclosure</h3>
                    <p>
                        Trading in financial markets (Stocks, Forex, Crypto) involves a high degree of risk and may not be suitable for all investors. You could lose some or all of your initial investment.
                    </p>
                    <p>
                        <strong>Not Financial Advice:</strong> The information provided by this software is for educational and informational purposes only. It does not constitute financial advice, investment recommendations, or signals to buy or sell any asset.
                    </p>
                    <p>
                        <strong>Liability:</strong> We accept no liability for any loss or damage, including without limitation to, any loss of profit, which may arise directly or indirectly from use of or reliance on such information.
                    </p>
                    <div className="pt-8 flex justify-center gap-6">
                        <a href="#" className="hover:text-white underline">Terms of Service</a>
                        <a href="#" className="hover:text-white underline">Privacy Policy</a>
                        <a href="#" className="hover:text-white underline">Risk Disclaimer</a>
                    </div>
                </div>
            </section>

            {/* 13. Final CTA */}
            <section className="py-32 relative overflow-hidden flex items-center justify-center min-h-[50vh]">
                <div className="absolute inset-0 z-0 bg-black">
                    {/* Animated Gradients */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute -bottom-1/2 right-0 w-[800px] h-[800px] bg-purple-900/20 rounded-full blur-[120px]"></div>
                    {/* Noise Overlay */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <ScrollReveal>
                        <h2 className="text-5xl md:text-8xl font-black mb-12 text-white tracking-tighter leading-none drop-shadow-2xl">
                            Stop Gambling. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400 animate-gradient bg-300%">Start Predicting.</span>
                        </h2>
                    </ScrollReveal>

                    <ScrollReveal delay={0.2}>
                        <div className="relative inline-block group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                            <Button className="relative bg-black text-white hover:bg-zinc-900 text-lg sm:text-xl md:text-2xl px-10 sm:px-16 py-9 rounded-full font-bold border border-white/10 shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-4 mx-auto">
                                Try the AI Demo Now <FaArrowRight />
                            </Button>
                        </div>
                        <p className="mt-10 text-gray-500 text-xs md:text-sm tracking-[0.3em] uppercase font-medium">Limited Access for New Accounts</p>
                    </ScrollReveal>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AiStockPrediction;
