import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    ArrowRight,
    CheckCircle,
    DollarSign,
    TrendingUp,
    Layers,
    Globe,
    Repeat,
    Target,
    ShieldCheck,
    Zap,
    BarChart3,
} from 'lucide-react';

import { gsap } from 'gsap';
import { SectionTransition } from '@/components/ui/SectionTransition';
import FintechLandingFormModal from '@/components/landingpage/FintechLandingFormModal';

/* ─────────────────────────────────────────────────────────
   Config — change the lead destination here
───────────────────────────────────────────────────────── */
const LEAD_EMAIL = 'darshan@boostmysites.com';

/* ─────────────────────────────────────────────────────────
   Revenue table data
───────────────────────────────────────────────────────── */
const revenueRows = [
    { users: '100 Users', gross: '$9,900 annually', keep: '$6,930' },
    { users: '500 Users', gross: '$49,500 annually', keep: '$34,650' },
    { users: '1,000 Users', gross: '$99,000 annually', keep: '$69,300' },
];

/* ─────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────── */
const DarshanLandingPage = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalVariant, setModalVariant] = useState<'license' | 'demo'>('license');

    const heroTextRef = useRef<HTMLDivElement>(null);
    const heroButtonsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline();
        tl
            .fromTo(heroTextRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' })
            .fromTo(heroButtonsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5');
    }, []);

    const openLicense = () => { setModalVariant('license'); setModalOpen(true); };
    const openDemo = () => { setModalVariant('demo'); setModalOpen(true); };

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden">
            <Helmet>
                <title>Launch Your AI Fintech Brand | Boostmysites</title>
                <meta name="description" content="Turn AI into your own recurring revenue fintech business. Launch a fully branded trading intelligence platform in days." />
            </Helmet>

            {/* ── Simple Header ────────────────────────────────────── */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
                <div className="container mx-auto px-4 max-w-6xl h-16 flex items-center justify-between">
                    <a href="/" className="flex items-center gap-2">
                        <img src="/logo.png" alt="Boostmysites" className="w-[5rem] object-contain" />
                    </a>
                    <button
                        onClick={openLicense}
                        className="bg-cyan-500 hover:bg-cyan-400 text-black text-xs sm:text-sm font-bold px-4 py-2 rounded-full transition-all hover:scale-105"
                    >
                        Build My Platform
                    </button>
                </div>
            </header>

            {/* ── Contact / Lead Modal ─────────────────────────────── */}
            <FintechLandingFormModal
                open={modalOpen}
                onOpenChange={setModalOpen}
                variant={modalVariant}
                mailTo={LEAD_EMAIL}
                telegramId="Darsh_Fintech"
            />

            {/* ═══════════════════════════════════════════════════════
                HERO
            ═══════════════════════════════════════════════════════ */}
            <section className="relative min-h-screen flex items-center justify-center pt-28 pb-20 px-4 overflow-hidden">
                {/* Background image */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/70 z-10" />
                    <img
                        src="/assets/landing-page/fintech-hero-bg.png"
                        alt="Fintech Background"
                        className="w-full h-full object-cover opacity-60"
                    />
                </div>

                {/* Grid overlay */}
                <div
                    className="absolute inset-0 z-[1] opacity-[0.04] pointer-events-none"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, rgba(6,182,212,0.8) 1px, transparent 1px), linear-gradient(to bottom, rgba(6,182,212,0.8) 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                />

                <div className="container mx-auto z-10 text-center relative max-w-6xl">
                    <div ref={heroTextRef}>
                        {/* Eyebrow */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-cyan-400 text-sm font-medium mb-8 backdrop-blur-md">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
                            </span>
                            Shift From Product To Outcome
                        </div>

                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter mb-6 leading-[1.0] max-w-5xl mx-auto">
                            Turn AI Into Your Own{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
                                Recurring Revenue
                            </span>{' '}
                            Fintech Business
                        </h1>

                        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-6 leading-relaxed font-light">
                            Launch a fully branded trading intelligence platform and build predictable income — without building technology from scratch.
                        </p>

                        {/* Supporting points */}
                        <div className="flex flex-wrap justify-center gap-3 mb-10">
                            {[
                                'Keep 70% of license revenue',
                                'Deploy under your own brand & domain',
                                'Start selling within days',
                            ].map((pt) => (
                                <div key={pt} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm text-gray-300 backdrop-blur-sm">
                                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" /> {pt}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div ref={heroButtonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button
                            onClick={openLicense}
                            className="bg-cyan-500 text-black hover:bg-cyan-400 text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-5 rounded-full font-bold shadow-[0_0_50px_rgba(6,182,212,0.35)] hover:shadow-[0_0_70px_rgba(6,182,212,0.5)] transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                        >
                            Build My Platform
                        </button>
                        <button
                            onClick={() => document.getElementById('how-i-profit')?.scrollIntoView({ behavior: 'smooth' })}
                            className="flex items-center justify-center gap-2 text-white hover:text-cyan-400 text-base sm:text-lg px-8 py-4 sm:py-5 rounded-full border border-white/20 hover:border-cyan-500/50 hover:bg-white/5 transition-all w-full sm:w-auto"
                        >
                            See How I Profit <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
                POSITIONING
            ═══════════════════════════════════════════════════════ */}
            <SectionTransition type="fade" fromGradient="from-black to-zinc-950" toGradient="from-zinc-950 to-black">
                <section id="how-i-profit" className="py-24 relative">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className="text-center mb-16">
                            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">From Software To Opportunity</p>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 leading-tight">
                                You Are Not Buying Software.<br />You Are Buying{' '}
                                <span className="text-cyan-400">Leverage.</span>
                            </h2>
                            <p className="text-gray-400 text-lg max-w-4xl mx-auto leading-relaxed space-y-2">
                                Instead of spending years and six figures building a trading platform, you launch instantly with institutional-grade AI under your own brand.{' '}
                                Instead of trading alone, you monetize thousands of traders.{' '}
                                Instead of one income stream, you create recurring subscription revenue.
                            </p>
                        </div>

                        {/* Outcome blocks */}
                        <div className="grid sm:grid-cols-3 gap-6 mb-14">
                            {[
                                { icon: <TrendingUp className="w-7 h-7 text-cyan-400" />, title: 'Build Authority', desc: 'Position yourself as a fintech brand with advanced AI capabilities.' },
                                { icon: <DollarSign className="w-7 h-7 text-cyan-400" />, title: 'Create Recurring Income', desc: 'Sell annual licenses starting at $99/user and retain 70%.' },
                                { icon: <Layers className="w-7 h-7 text-cyan-400" />, title: 'Scale Without Infrastructure Stress', desc: 'The backend, security, and updates are handled for you.' },
                            ].map((item, i) => (
                                <div key={i} className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 hover:border-cyan-500/30 transition-all group hover:-translate-y-1">
                                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-5 group-hover:bg-cyan-500/20 transition-colors">{item.icon}</div>
                                    <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="text-center">
                            <button
                                onClick={openLicense}
                                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold px-10 py-5 rounded-full text-base sm:text-lg transition-all hover:scale-105 shadow-lg shadow-cyan-900/30"
                            >
                                Start Building My Fintech Brand
                            </button>
                        </div>
                    </div>
                </section>
            </SectionTransition>

            {/* ═══════════════════════════════════════════════════════
                FOR TRADERS
            ═══════════════════════════════════════════════════════ */}
            <SectionTransition type="slide" fromGradient="from-zinc-950 to-black" toGradient="from-black to-zinc-950">
                <section className="py-24 bg-black relative border-t border-white/5">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">For Traders</p>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                    Trade With Clarity.<br /><span className="text-cyan-400">Not Emotion.</span>
                                </h2>
                                <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                                    Most traders lose because they react emotionally. Your platform gives them structured probability insight before they risk capital.
                                </p>
                                <button
                                    onClick={openDemo}
                                    className="bg-cyan-500 text-black hover:bg-cyan-400 font-bold px-8 py-4 rounded-full transition-all hover:scale-105 shadow-[0_0_30px_rgba(6,182,212,0.3)]"
                                >
                                    Experience Smarter Trading
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { icon: <Target className="w-6 h-6 text-cyan-400" />, title: 'Know When To Enter', desc: 'Clear probability scores before placing trades.' },
                                    { icon: <ShieldCheck className="w-6 h-6 text-cyan-400" />, title: 'Avoid Low-Quality Setups', desc: 'Trade only when volatility and volume confirm.' },
                                    { icon: <Zap className="w-6 h-6 text-cyan-400" />, title: 'Protect Capital', desc: 'Get defined risk zones and market condition detection.' },
                                    { icon: <BarChart3 className="w-6 h-6 text-cyan-400" />, title: 'Confident Decisions', desc: 'Understand trend strength, sentiment, and structure instantly.' },
                                ].map((item, i) => (
                                    <div key={i} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-all group">
                                        <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">{item.icon}</div>
                                        <h4 className="text-base font-bold mb-1 text-white">{item.title}</h4>
                                        <p className="text-gray-400 text-sm leading-snug">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </SectionTransition>

            {/* ═══════════════════════════════════════════════════════
                FOR ENTREPRENEURS
            ═══════════════════════════════════════════════════════ */}
            <SectionTransition type="scale" fromGradient="from-black to-gray-900" toGradient="from-gray-900 to-black">
                <section className="py-24 bg-gradient-to-b from-gray-900 to-black relative border-t border-gray-800">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className="text-center mb-16">
                            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">For Entrepreneurs</p>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                                Turn Traders Into <span className="text-cyan-400">Subscribers</span>
                            </h2>
                            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                                This is not a trading tool. It is a subscription business model built around trading intelligence.
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12 items-start">
                            {/* What You Gain */}
                            <div>
                                <h3 className="text-xl font-bold text-white mb-6">What You Gain</h3>
                                <div className="space-y-4">
                                    {[
                                        { icon: <Globe className="w-5 h-5 text-cyan-400" />, title: 'Your Own Branded Platform', desc: 'Operate on your domain with your identity.' },
                                        { icon: <DollarSign className="w-5 h-5 text-cyan-400" />, title: 'Control Pricing', desc: 'Sell licenses at $99/year or more — you set the price.' },
                                        { icon: <TrendingUp className="w-5 h-5 text-cyan-400" />, title: 'High Margin Structure', desc: 'Keep 70% of every sale.' },
                                        { icon: <Repeat className="w-5 h-5 text-cyan-400" />, title: 'Predictable Revenue', desc: 'Annual renewals compound over time.' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4 bg-white/[0.03] border border-white/10 rounded-xl p-5 hover:border-cyan-500/30 transition-all group">
                                            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500/20 transition-colors">{item.icon}</div>
                                            <div>
                                                <h4 className="font-bold text-white mb-0.5">{item.title}</h4>
                                                <p className="text-gray-400 text-sm">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Revenue table */}
                            <div>
                                <h3 className="text-xl font-bold text-white mb-6">Revenue Potential</h3>
                                <div className="rounded-2xl overflow-hidden border border-white/10">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="bg-white/5 border-b border-white/10">
                                                <th className="text-left px-5 py-3 text-gray-400 font-semibold text-xs uppercase tracking-wider">Scale</th>
                                                <th className="text-left px-5 py-3 text-gray-400 font-semibold text-xs uppercase tracking-wider">Gross Revenue</th>
                                                <th className="text-left px-5 py-3 text-cyan-400 font-semibold text-xs uppercase tracking-wider">Your 70%</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {revenueRows.map((row, i) => (
                                                <tr key={i} className={`border-b border-white/5 ${i % 2 === 0 ? 'bg-white/[0.02]' : ''} hover:bg-cyan-500/5 transition-colors`}>
                                                    <td className="px-5 py-4 font-medium text-white">{row.users}</td>
                                                    <td className="px-5 py-4 text-gray-300">{row.gross}</td>
                                                    <td className="px-5 py-4 text-cyan-400 font-bold">{row.keep}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <p className="text-center text-xl font-bold text-white mt-6 mb-6">Scale Users. Scale Income.</p>
                                <button
                                    onClick={openLicense}
                                    className="w-full bg-cyan-500 text-black hover:bg-cyan-400 font-bold py-4 rounded-xl transition-all hover:scale-105 shadow-[0_0_30px_rgba(6,182,212,0.2)]"
                                >
                                    Get Started
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </SectionTransition>

            {/* ═══════════════════════════════════════════════════════
                SOCIAL PROOF
            ═══════════════════════════════════════════════════════ */}
            <SectionTransition type="fade" fromGradient="from-black to-zinc-950" toGradient="from-zinc-950 to-black">
                <section className="py-24 bg-black relative border-t border-white/5">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className="text-center mb-16">
                            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">Results</p>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                                What Smart Operators <span className="text-cyan-400">Achieve</span>
                            </h2>
                        </div>

                        <div className="grid sm:grid-cols-3 gap-6 mb-10">
                            {[
                                {
                                    eyebrow: 'Crypto Market',
                                    title: 'Captured Major Crypto Breakout',
                                    desc: 'Users received early high-probability signals before an 8% surge, maximizing upside.',
                                    stat: '+8%',
                                },
                                {
                                    eyebrow: 'Risk Management',
                                    title: 'Protected Profits Before Market Correction',
                                    desc: 'Sentiment divergence identified a high-risk top before a 12% drop, protecting subscriber capital.',
                                    stat: '-12% avoided',
                                },
                                {
                                    eyebrow: 'Forex Market',
                                    title: 'Rode Institutional Forex Trend',
                                    desc: 'Volume analysis filtered noise and captured a 300 pip move on a major pair.',
                                    stat: '300 pips',
                                },
                            ].map((item, i) => (
                                <div key={i} className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 hover:border-cyan-500/30 transition-all group relative overflow-hidden">
                                    <div className="absolute top-4 right-4 text-4xl font-black text-white/5 group-hover:text-cyan-500/10 transition-colors pointer-events-none select-none">{item.stat}</div>
                                    <p className="text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">{item.eyebrow}</p>
                                    <h3 className="text-lg font-bold text-white mb-3 leading-snug">{item.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <p className="text-center text-lg sm:text-xl font-semibold text-white">
                            This is the edge your subscribers pay for.
                        </p>
                    </div>
                </section>
            </SectionTransition>

            {/* ═══════════════════════════════════════════════════════
                PRICING
            ═══════════════════════════════════════════════════════ */}
            <SectionTransition type="slide" fromGradient="from-zinc-950 to-black" toGradient="from-black to-zinc-950">
                <section className="py-24 bg-zinc-950 relative border-t border-white/5 overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none" />
                    <div className="container mx-auto px-4 max-w-6xl relative z-10">
                        <div className="text-center mb-6">
                            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">Investment</p>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                                Invest Once. Build Revenue <span className="text-cyan-400">For Years.</span>
                            </h2>
                        </div>

                        {/* Lead with outcome */}
                        <div className="max-w-2xl mx-auto bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-center mb-12">
                            <p className="text-gray-500 text-xs uppercase tracking-widest font-semibold mb-2">What You Are Buying</p>
                            <p className="text-white text-lg sm:text-xl font-semibold leading-relaxed">
                                A revenue-generating fintech asset under your brand.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
                            {[
                                {
                                    name: '1 Year Platform',
                                    price: '$999',
                                    originalPrice: '$1,499',
                                    badge: 'Standard',
                                    badgeColor: 'bg-gray-700',
                                    badgeText: 'text-white',
                                    desc: 'Launch and monetize within weeks.',
                                    cta: 'Launch 1 Year Platform',
                                    recommended: false,
                                },
                                {
                                    name: '2 Year License',
                                    price: '$1,999',
                                    originalPrice: '$2,499',
                                    badge: 'Popular',
                                    badgeColor: 'bg-blue-600',
                                    badgeText: 'text-white',
                                    desc: 'Build traction and scale user acquisition.',
                                    cta: 'Secure 2 Year License',
                                    recommended: false,
                                },
                                {
                                    name: '5 Year Asset',
                                    price: '$3,399',
                                    originalPrice: '$4,999',
                                    badge: 'Best Value',
                                    badgeColor: 'bg-cyan-500',
                                    badgeText: 'text-black',
                                    desc: 'Long-term asset ownership and maximum margin potential.',
                                    cta: 'Build 5 Year Asset',
                                    recommended: true,
                                },
                            ].map((plan, i) => (
                                <div key={i} className={`bg-black rounded-2xl p-6 sm:p-8 border flex flex-col h-full transition-all ${plan.recommended ? 'border-cyan-500 ring-2 ring-cyan-500/30 shadow-2xl shadow-cyan-900/20' : 'border-gray-800 hover:border-gray-700'}`}>
                                    <div className={`inline-block ${plan.badgeColor} ${plan.badgeText} text-[10px] font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider`}>{plan.badge}</div>
                                    <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                                    <p className="text-gray-500 text-xs mb-4 leading-snug">{plan.desc}</p>
                                    <div className="mb-5">
                                        <span className="text-gray-500 line-through text-sm mr-1">{plan.originalPrice}</span>
                                        <span className="text-3xl font-black text-white">{plan.price}</span>
                                    </div>

                                    <ul className="space-y-2 mb-6 flex-grow text-xs text-gray-400">
                                        {[
                                            'Branded platform on your domain',
                                            'AI probability engine',
                                            'Admin user management panel',
                                            'High-converting landing page',
                                            'Annual license model for users',
                                            '70% revenue share',
                                            'Technical support included',
                                        ].map((f, fi) => (
                                            <li key={fi} className="flex items-center gap-2">
                                                <CheckCircle className="w-3 h-3 text-cyan-400 flex-shrink-0" /> {f}
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        onClick={openLicense}
                                        className={`w-full py-4 rounded-xl font-bold text-sm transition-all hover:scale-105 ${plan.recommended ? 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-lg shadow-cyan-500/20' : 'bg-gray-800 hover:bg-gray-700 text-white'}`}
                                    >
                                        {plan.cta}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </SectionTransition>

            {/* ═══════════════════════════════════════════════════════
                FINAL CTA
            ═══════════════════════════════════════════════════════ */}
            <SectionTransition type="fade" fromGradient="from-black to-gray-900" toGradient="from-gray-900 to-black">
                <section className="py-32 relative overflow-hidden text-center">
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/20 to-black pointer-events-none" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/8 rounded-full blur-[120px] pointer-events-none" />

                    <div className="container mx-auto px-4 max-w-4xl relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-cyan-400 text-sm font-medium mb-8">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
                            </span>
                            Limited Partner Slots Available
                        </div>

                        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-tight">
                            Build Your Own{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                                Trading Intelligence
                            </span>{' '}
                            Brand
                        </h2>

                        <p className="text-xl sm:text-2xl font-medium text-gray-300 mb-4">
                            Own the platform. Own the audience. Own the revenue.
                        </p>

                        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
                            Enter the AI trading market without development risk. Focus on marketing, community, and growth while the technology runs in the background.
                        </p>

                        <button
                            onClick={openLicense}
                            className="bg-cyan-500 text-black hover:bg-cyan-400 text-lg px-12 py-5 rounded-full font-bold shadow-[0_0_60px_rgba(6,182,212,0.4)] hover:shadow-[0_0_80px_rgba(6,182,212,0.6)] transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                        >
                            Start My Fintech Business
                        </button>

                        <p className="text-sm text-gray-500 mt-6 uppercase tracking-wider">No tech team required · Takes less than 2 minutes</p>
                    </div>
                </section>
            </SectionTransition>

            {/* ── Simple Footer ────────────────────────────────────── */}
            <footer className="bg-black border-t border-white/10 py-8 px-4">
                <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
                    <a href="/" className="flex items-center gap-2">
                        <img src="/logo.png" alt="Boostmysites" className="h-10 w-auto opacity-80 hover:opacity-100 transition-opacity" />
                    </a>
                    <p className="text-gray-500 text-xs text-center">
                        &copy; {new Date().getFullYear()} Boostmysites. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default DarshanLandingPage;
