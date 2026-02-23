import React, { useState } from 'react';
import { Palette, TrendingUp, Cpu, Megaphone, FileCheck, UserCheck, ChevronDown } from 'lucide-react';
import { useLandingTheme } from '../../../contexts/ThemeContext';

const departments = [
    {
        icon: Palette,
        title: 'Your In-House Design Studio.',
        description: 'Your platform looks like a $100k custom build because we put our best designers on your brand.',
    },
    {
        icon: TrendingUp,
        title: 'CEO Growth Playbook.',
        description: 'Access the exact user-acquisition strategies we used to scale, delivered through weekly 1-on-1 sessions.',
    },
    {
        icon: Cpu,
        title: 'Proprietary Engineering Desk.',
        description: 'Offer your clients custom automation without ever writing a line of code. Our engineers are now your engineers.',
    },
    {
        icon: Megaphone,
        title: 'Your Launch Marketing Team.',
        description: 'A dedicated marketing lead to run your first campaigns. Fast-track to profitability with proven ad and launch strategies.',
    },
    {
        icon: FileCheck,
        title: 'Compliance & Registration Support.',
        description: 'Optional company registration and red-tape handling so you can focus on running the business, not paperwork.',
    },
    {
        icon: UserCheck,
        title: 'Expert-Led Automation.',
        description: 'Your customers get the "Hedge Fund" experience. They tell us their goals, and our experts build their custom algo strategies for them. No coding, no complex setup—just pure results under your brand name.',
    },
];

const roadmapPhases = [
    { phase: '01: Foundation', action: 'Purchase your license & domain mapping.', asset: 'A Global Domain & Brand Identity' },
    { phase: '02: Architecture', action: 'Allotment of your Branding & Marketing Professionals.', asset: 'Your Custom-Built UI & Growth Team' },
    { phase: '03: Intelligence', action: 'Deployment of AI Probability Engine & Custom Algos.', asset: 'Proprietary Trading Edge' },
    { phase: '04: Profit', action: 'Start marketing with 1-year of dedicated consultation.', asset: 'A High-Growth Revenue Stream' },
];

const roadmapSteps: { step: number; title: string; description: string; phaseId: number; ownersNote?: string }[] = [
    { step: 1, phaseId: 1, title: 'License Acquisition & Seat Reservation', description: 'Secure your partner license and lock in your 70% revenue share. This immediately initiates the allotment of your dedicated growth and tech teams.' },
    { step: 2, phaseId: 1, title: 'Domain & Infrastructure Mapping', description: 'We map the platform to your custom domain (e.g., platform.yourbrand.com). This ensures your business lives on your own digital real estate from day one.' },
    { step: 3, phaseId: 1, title: 'The Brand Identity Workshop', description: "Work 1-on-1 with your assigned branding professional. We don't just slap on a logo; we customize the UI colors, fonts, and assets to create a $100k+ bespoke feel.", ownersNote: "You have final approval on all design assets before we go live." },
    { step: 4, phaseId: 2, title: 'Institutional Data Integration', description: 'Our engineers activate the real-time data feeds for 150+ assets across Stocks, Crypto, and Forex. We handle all institutional data costs so you don\'t have to.' },
    { step: 5, phaseId: 2, title: 'Algo-Trading Desk Setup', description: 'We initialize your "Expert-Led Automation" module. This is where we begin building the custom strategies that your future traders will use.', ownersNote: 'Your customers get custom algos built by us, but they pay YOU.' },
    { step: 6, phaseId: 2, title: 'Admin Command Center Training', description: "Access your master dashboard. Here, you'll learn to manage your users, track your 70% profit share, and monitor platform performance in real-time." },
    { step: 7, phaseId: 3, title: 'High-Conversion Landing Page Build', description: 'Your marketing specialist deploys a fully designed, high-converting sales page (similar to this one) tailored to your specific brand and target market.' },
    { step: 8, phaseId: 3, title: 'The "Go-To-Market" Strategy Session', description: 'Begin your 1-year growth consultation. We map out your first 90 days of user acquisition, focusing on how to attract and retain high-value traders.' },
    { step: 9, phaseId: 4, title: 'Marketing & Ad Campaign Launch', description: 'With your marketing person, you launch your first wave of social proof and ad campaigns. We provide the "Institutional Precision" messaging that makes the 94% accuracy sell itself.' },
    { step: 10, phaseId: 4, title: 'Scale & Retention Management', description: 'Leverage our consultation for long-term retention strategies. As your user base grows, we continue to build custom algos for your clients, keeping your churn low and your revenue high.' },
];

const PartnerSupport = () => {
    const { theme } = useLandingTheme();
    const isDark = theme === 'dark';
    const [expandedPhase, setExpandedPhase] = useState<number | null>(null);

    const togglePhase = (phaseId: number) => {
        setExpandedPhase((prev) => (prev === phaseId ? null : phaseId));
    };

    return (
        <section
            id="partner-support"
            className={`py-16 sm:py-24 relative overflow-hidden ${isDark ? 'bg-[#0a0e17]' : 'bg-white'}`}
        >
            {/* Technical blueprint / grid background */}
            <div
                className="absolute inset-0 z-0 pointer-events-none opacity-[0.04]"
                style={{
                    backgroundImage: isDark
                        ? `linear-gradient(to right, rgba(59, 130, 246, 0.8) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(59, 130, 246, 0.8) 1px, transparent 1px)`
                        : `linear-gradient(to right, rgba(0, 0, 0, 0.08) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(0, 0, 0, 0.08) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />
            <div className="container-custom relative z-10 px-4 sm:px-6">
                <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
                    <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-4 sm:mb-6 tracking-tight ${isDark ? 'text-white' : 'text-heading'}`}>
                        From <span className="text-primary">Vision to CEO</span>. Your Fully-Managed <span className="text-primary">Fintech Empire</span> Starts Here.
                    </h2>
                    <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Acquire the Tech. Own the Brand. We Provide the Strategic Blueprint and Expert Algo-Support to Scale Your Revenue.
                    </p>
                </div>

                {/* Launch Roadmap (Command Center) */}
                <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
                    <h3 className={`text-xl font-bold mb-5 sm:mb-6 text-center uppercase tracking-wider text-primary`}>
                        Launch Roadmap
                    </h3>
                    <div
                        className={`rounded-2xl overflow-hidden ${isDark
                                ? 'border border-white/10 bg-white/[0.03]'
                                : 'border border-gray-200 bg-gray-50'
                            }`}
                    >
                        {/* Header — hidden on very small screens, shown from sm */}
                        <div
                            className={`hidden sm:grid sm:grid-cols-12 gap-0 border-b px-4 py-3 text-left ${isDark ? 'border-white/10 bg-white/5 text-gray-400' : 'border-gray-200 bg-gray-100 text-gray-600'
                                }`}
                        >
                            <div className="sm:col-span-3 text-xs font-bold uppercase tracking-wider dark:text-white text-gray-900">Phase</div>
                            <div className="sm:col-span-5 text-xs font-bold uppercase tracking-wider dark:text-white text-gray-900">Action</div>
                            <div className="sm:col-span-3 text-xs font-bold uppercase tracking-wider dark:text-white text-gray-900">Your Asset</div>
                            <div className="sm:col-span-1" aria-hidden />
                        </div>
                        {roadmapPhases.map((row, i) => {
                            const phaseId = i + 1;
                            const isExpanded = expandedPhase === phaseId;
                            const phaseSteps = roadmapSteps.filter((s) => s.phaseId === phaseId);
                            return (
                                <div
                                    key={i}
                                    className={`border-b last:border-b-0 ${isDark ? 'border-white/5' : 'border-gray-100'}`}
                                >
                                    <button
                                        type="button"
                                        onClick={() => togglePhase(phaseId)}
                                        className={`w-full grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-0 px-4 py-4 text-left transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                                            } focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset`}
                                        aria-expanded={isExpanded}
                                    >
                                        <div className="sm:col-span-3 font-mono text-sm font-bold text-primary">{row.phase}</div>
                                        <div className={`sm:col-span-5 text-sm leading-snug ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{row.action}</div>
                                        <div className={`sm:col-span-3 text-sm font-semibold ${isDark ? 'text-white' : 'text-heading'}`}>{row.asset}</div>
                                        <div className="sm:col-span-1 flex items-center sm:justify-end mt-1 sm:mt-0">
                                            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isDark ? 'text-gray-400' : 'text-gray-500'} ${isExpanded ? 'rotate-180' : ''}`} aria-hidden />
                                        </div>
                                    </button>
                                    <div
                                        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                                    >
                                        <div className="overflow-hidden">
                                            <div
                                                className={`px-4 pb-4 pt-0 ${isDark ? 'bg-white/[0.03]' : 'bg-gray-50/80'} border-t ${isDark ? 'border-white/5' : 'border-gray-100'}`}
                                            >
                                                <div className="pl-2 space-y-4 pt-3">
                                                    {phaseSteps.map((s) => (
                                                        <div key={s.step} className="relative">
                                                            <div className={`text-xs font-mono font-bold text-primary mb-0.5`}>{s.step}.</div>
                                                            <h4 className={`text-sm font-bold mb-1 ${isDark ? 'text-white' : 'text-heading'}`}>{s.title}</h4>
                                                            <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{s.description}</p>
                                                            {s.ownersNote && (
                                                                <div className={`mt-3 px-3 py-2 rounded-lg border text-xs font-medium ${isDark ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-primary/5 border-primary/20 text-primary'}`}>
                                                                    Owner&apos;s Note: {s.ownersNote}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Department cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {departments.map((item, index) => (
                        <div
                            key={index}
                            className="bg-[#181B22] rounded-2xl p-6 md:p-8 shadow-xl border border-gray-800 flex flex-col h-full relative overflow-hidden group transition-all duration-300 hover:border-gray-700"
                        >
                            {/* Highlight effect */}
                            <div className="absolute top-0 right-0 p-4 opacity-10 scale-150 transform group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                                <svg className="w-64 h-64 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" /></svg>
                            </div>
                            <div className="mb-5 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center bg-primary/20 shadow-[0_0_24px_hsl(var(--primary)_/_0.35)] relative z-10">
                                <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold mb-3 text-white relative z-10">
                                {item.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-gray-400 relative z-10">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PartnerSupport;
