import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Share2, Rocket, Code, Database, TrendingUp, Users, DollarSign, CheckCircle, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SectionTransition } from '@/components/ui/SectionTransition';



gsap.registerPlugin(ScrollTrigger);

// --- Custom Components & Styles ---

const StarField = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(40)].map((_, i) => (
                <div
                    key={i}
                    className="absolute bg-white rounded-full"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        width: `${Math.random() * 2 + 1}px`,
                        height: `${Math.random() * 2 + 1}px`,
                        opacity: Math.random() * 0.7 + 0.3,
                        animation: `twinkle ${Math.random() * 5 + 3}s infinite ease-in-out, drift ${Math.random() * 20 + 20}s infinite linear`,
                        animationDelay: `${Math.random() * 5}s`
                    }}
                />
            ))}
            <style>{`
                @keyframes twinkle {
                    0%, 100% { opacity: 0.2; transform: scale(0.8); }
                    50% { opacity: 1; transform: scale(1.2); }
                }
                @keyframes drift {
                    from { transform: translate(0, 0); }
                    to { transform: translate(100px, -100px); }
                }
            `}</style>
        </div>
    );
};

const GridBeam = ({ delay, duration, top, left, horizontal }: { delay: number, duration: number, top?: string, left?: string, horizontal?: boolean }) => (
    <div
        className={`absolute bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0`}
        style={{
            top: top || (horizontal ? `${Math.random() * 100}%` : '0'),
            left: left || (horizontal ? '0' : `${Math.random() * 100}%`),
            width: horizontal ? '150px' : '1px',
            height: horizontal ? '1px' : '150px',
            animation: `${horizontal ? 'beam-h' : 'beam-v'} ${duration}s linear infinite`,
            animationDelay: `${delay}s`,
        }}
    />
);

const GridPattern = () => {
    return (
        <div className="absolute inset-0 z-0 opacity-[0.2] pointer-events-none">
            {/* Static Grid */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: 'linear-gradient(to right, #404040 1px, transparent 1px), linear-gradient(to bottom, #404040 1px, transparent 1px)',
                    backgroundSize: '50px 50px',
                    maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
                }}
            />
            {/* Animated Beams */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(8)].map((_, i) => (
                    <GridBeam
                        key={`h-${i}`}
                        horizontal={true}
                        delay={i * 2}
                        duration={Math.random() * 5 + 5}
                        top={`${(i + 1) * 15}%`}
                    />
                ))}
                {[...Array(8)].map((_, i) => (
                    <GridBeam
                        key={`v-${i}`}
                        horizontal={false}
                        delay={i * 2.5}
                        duration={Math.random() * 5 + 5}
                        left={`${(i + 1) * 12}%`}
                    />
                ))}
            </div>

            <style>{`
                @keyframes beam-h {
                    0% { left: -200px; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { left: 100%; opacity: 0; }
                }
                @keyframes beam-v {
                    0% { top: -200px; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
            `}</style>
        </div>
    );
};

const TechCompanyLanding = () => {
    const heroRef = useRef(null);
    const heroTextRef = useRef(null);
    const heroImageRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        tl.fromTo(heroTextRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        )
            .fromTo(heroImageRef.current,
                { opacity: 0, scale: 0.9, rotateX: 10 },
                { opacity: 1, scale: 1, rotateX: 0, duration: 1.2, ease: "back.out(1.7)" },
                "-=0.5"
            );

    }, []);

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden font-sans selection:bg-neon-cyan selection:text-black">
            <Helmet>
                <title>Build Your Own Tech Company | Boostmysites</title>
                <meta name="description" content="Launch your own SaaS or App with Boostmysites — low investment, shared infrastructure, real monthly income potential." />
            </Helmet>

            <Header />

            {/* Hero Section */}
            <section ref={heroRef} className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden leading-relaxed">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-black to-black opacity-40 z-0"></div>
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-blue-900/10 to-transparent blur-3xl z-0"></div>

                {/* Visual Effects */}
                {/* Visual Effects */}
                <GridPattern />
                <StarField />

                {/* Floating Particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-60" />
                    <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-40" style={{ animationDelay: '1s' }} />
                    <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-ping opacity-50" style={{ animationDelay: '2s' }} />
                    <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-indigo-400 rounded-full animate-pulse opacity-30" style={{ animationDelay: '1.5s' }} />
                </div>

                <div className="container mx-auto z-10 grid lg:grid-cols-2 gap-12 items-center">
                    <div ref={heroTextRef} className="space-y-8 text-center lg:text-left relative">
                        {/* Glow behind text */}
                        <div className="absolute -inset-10 bg-cyan-500/10 blur-3xl -z-10 rounded-full opacity-50"></div>

                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium mb-2 backdrop-blur-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                            </span>
                            Future of Tech Entrepreneurship
                        </div>
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent leading-tight">
                            Build Your Own <br /><span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-sm">Tech Company</span>.
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            Launch your own SaaS or App with Boostmysites — low investment, shared infrastructure, real monthly income potential.
                            <span className="block mt-2 text-white">We build. You own. You earn.</span>
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                            <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border-0 shadow-lg shadow-cyan-500/25 transition-all duration-300 text-lg px-10 py-7 rounded-xl transform hover:scale-105">
                                Start Your Journey
                            </Button>
                        </div>
                    </div>
                    <div ref={heroImageRef} className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative rounded-2xl border border-white/10 overflow-hidden shadow-2xl bg-black">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 mix-blend-overlay z-10"></div>
                            <img
                                src="/assets/landing-page/hero.png"
                                alt="Futuristic Tech City"
                                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700 opacity-90"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Subheading Section */}
            <SectionTransition fromGradient="from-black to-gray-900" toGradient="from-gray-900 to-black" type="fade">
                <section className="py-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black z-0"></div>
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-900/50 to-transparent"></div>
                    <div className="container mx-auto px-4 text-center relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
                            Build <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">6-Figure Recurring Revenue</span> with SaaS
                        </h2>
                        <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
                            We transform non-tech leaders into tech moguls. You don't need to write a single line of code.
                        </p>
                    </div>
                </section>
            </SectionTransition>

            {/* What We Do Section */}
            <SectionTransition fromGradient="from-gray-900 to-black" toGradient="from-black to-gray-900" type="slide">
                <section className="py-24 bg-black relative">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black"></div>
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="text-center mb-20">
                            <h2 className="text-sm font-semibold tracking-widest text-cyan-500 uppercase mb-3">Our Expertise</h2>
                            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">We help non-tech founders build and scale.</h3>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { icon: <Share2 className="w-8 h-8 text-cyan-400" />, title: "Idea Validation & Planning", desc: "We stress-test your idea against market data." },
                                { icon: <Code className="w-8 h-8 text-blue-500" />, title: "App / SaaS Development", desc: "Full-stack development by expert engineering teams." },
                                { icon: <Database className="w-8 h-8 text-cyan-300" />, title: "Infrastructure & Maintenance", desc: "Enterprise-grade hosting, security, and updates." },
                                { icon: <Rocket className="w-8 h-8 text-indigo-400" />, title: "Go-to-Market Strategy", desc: "Launch plans that get your first 100 customers." },
                                { icon: <Users className="w-8 h-8 text-blue-300" />, title: "User Acquisition & Scaling", desc: "Growth hacking and paid user acquisition campaigns." },
                                { icon: <DollarSign className="w-8 h-8 text-cyan-200" />, title: "Funding & Growth Support", desc: "Pitch decks and investor connections when you scale." },
                            ].map((item, index) => (
                                <div key={index} className="p-8 bg-gray-900/30 border border-gray-800 rounded-2xl hover:border-cyan-500/30 hover:bg-gray-900/60 transition-all duration-300 group backdrop-blur-sm">
                                    <div className="mb-6 p-4 bg-black/50 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300 border border-white/5 shadow-inner">{item.icon}</div>
                                    <h4 className="text-xl font-bold mb-3 text-gray-100 group-hover:text-cyan-400 transition-colors">{item.title}</h4>
                                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-16">
                            <p className="text-2xl font-medium text-white">You own the product. <span className="text-cyan-400 font-bold">We power it.</span></p>
                        </div>
                    </div>
                </section>
            </SectionTransition>

            {/* Tech Stack Marquee */}
            <section className="py-12 bg-black border-y border-gray-800 relative z-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-20 pointer-events-none"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <p className="text-center text-xs font-bold text-cyan-500 uppercase tracking-[0.3em] mb-8 animate-pulse">Powered by Modern Tech Stack</p>

                    <div className="relative flex overflow-hidden">
                        <div className="flex animate-marquee gap-16 whitespace-nowrap">
                            {[...Array(2)].map((_, setIndex) => (
                                <div key={setIndex} className="flex gap-16 items-center">
                                    {["React", "Node.js", "Python", "AWS", "Docker", "Kubernetes", "OpenAI", "TensorFlow", "Stripe", "MongoDB", "Redis", "Next.js", "GraphQL"].map((tech, i) => (
                                        <span key={i} className="text-xl md:text-3xl font-black bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent hover:from-cyan-400 hover:to-blue-500 transition-all duration-500 cursor-pointer transform hover:scale-110">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <style>{`
                    @keyframes marquee {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    .animate-marquee {
                        animation: marquee 40s linear infinite;
                        width: max-content;
                    }
                    .animate-marquee:hover {
                        animation-play-state: paused;
                    }
                `}</style>
            </section>

            {/* Why Boostmysites */}
            <SectionTransition fromGradient="from-black to-gray-900" toGradient="from-gray-900 to-black" type="fade">
                <section className="py-24 bg-black relative">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
                    <div className="container mx-auto px-4 relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold text-center mb-20 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">Why Build With <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Boostmysites</span>?</h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                            {[
                                { emoji: "🚀", title: "Minimal Investment", desc: "Start lean." },
                                { emoji: "🧠", title: "No Tech Knowledge", desc: "We bridge the gap." },
                                { emoji: "🛠️", title: "End-to-End Support", desc: "Idea to Exit." },
                                { emoji: "💰", title: "Passive Income", desc: "Recurring revenue." },
                                { emoji: "📈", title: "Built to Scale", desc: "Global infrastructure." },
                            ].map((item, idx) => (
                                <div key={idx} className="text-center p-8 rounded-2xl bg-gradient-to-b from-gray-900 to-black border border-gray-800 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-900/20 group">
                                    <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300">{item.emoji}</div>
                                    <h4 className="font-bold text-lg mb-3 text-white">{item.title}</h4>
                                    <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </SectionTransition>

            {/* How It Works */}
            <SectionTransition fromGradient="from-gray-900 to-black" toGradient="from-black to-gray-900" type="scale">
                <section className="py-24 bg-gray-900/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/20 via-black to-black"></div>
                    <div className="container mx-auto px-4 relative z-10">
                        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-white">How It Works</h2>
                        <p className="text-center text-gray-400 mb-20 text-xl font-light">Have an Idea? Or Not — We’ve Got You</p>

                        <div className="space-y-20">
                            {[
                                { step: "01", title: "Share your idea", text: "Or choose from our proven SaaS & App ideas catalog.", icon: <CheckCircle className="text-cyan-400" /> },
                                { step: "02", title: "We Build Everything", text: "From design to development, infrastructure to launch.", icon: <Code className="text-blue-500" /> },
                                { step: "03", title: "Launch & Start Earning", text: "Your product goes live and starts generating monthly income.", icon: <DollarSign className="text-indigo-400" /> },
                                { step: "04", title: "Scale with Growth", text: "We help you grow users, scale revenue, and raise funding.", icon: <TrendingUp className="text-cyan-300" /> },
                            ].map((item, i) => (
                                <div key={i} className={`flex flex-col md:flex-row items-center gap-12 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                                    <div className="flex-1 text-center md:text-left relative">
                                        <div className="text-9xl font-black text-gray-800/20 absolute -z-10 -top-12 -left-8 md:-left-12 select-none opacity-50">{item.step}</div>
                                        <h3 className="text-3xl font-bold mb-6 flex items-center justify-center md:justify-start gap-4 text-white">
                                            <span className="p-2 bg-gray-800 rounded-lg">{item.icon}</span> {item.title}
                                        </h3>
                                        <p className="text-gray-400 text-lg leading-relaxed max-w-lg mx-auto md:mx-0">{item.text}</p>
                                    </div>
                                    <div className="flex-1 flex justify-center w-full">
                                        <div className="w-full max-w-md h-72 bg-gradient-to-b from-gray-800 to-black rounded-3xl border border-gray-700 flex items-center justify-center relative overflow-hidden group shadow-2xl">
                                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 mix-blend-overlay z-10"></div>
                                            <img
                                                src={`/assets/landing-page/how_${i + 1}.png`}
                                                alt={item.title}
                                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-90"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </SectionTransition>

            {/* Who Is This For */}
            <SectionTransition fromGradient="from-black to-gray-900" toGradient="from-gray-900 to-black" type="fade">
                <section className="py-24 bg-black relative">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-900/30 to-transparent"></div>
                    <div className="container mx-auto px-4 relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold text-center mb-20 text-white">Who Is This For</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { title: "Aspiring Founders", img: "/assets/landing-page/personas/founder.png" },
                                { title: "Business Owners", img: "/assets/landing-page/personas/owner.png" },
                                { title: "Freelancers", img: "/assets/landing-page/personas/freelancer.png" },
                                { title: "Non-Tech Visionaries", img: "/assets/landing-page/personas/visionary.png" }
                            ].map((item, i) => (
                                <div key={i} className="relative group overflow-hidden rounded-3xl aspect-square border border-gray-800 hover:border-cyan-500/50 transition-all shadow-lg">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 grayscale group-hover:grayscale-0"
                                    />
                                    <div className="absolute inset-0 z-20 flex items-end justify-center p-6">
                                        <span className="text-center font-bold text-xl text-white group-hover:text-cyan-400 transition-colors drop-shadow-md">{item.title}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </SectionTransition>

            {/* Testimonials */}
            <SectionTransition fromGradient="from-gray-900 to-black" toGradient="from-black to-gray-900" type="slide">
                <section className="py-24 bg-gray-900/40 overflow-hidden relative">
                    <GridPattern />
                    <StarField />
                    <div className="container mx-auto px-4 relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-white">Real People. Real Results.</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { quote: "I had zero tech background. Today, I own a SaaS product generating monthly revenue.", author: "Startup Founder", img: "/assets/landing-page/avatars/avatar_1.png" },
                                { quote: "Boostmysites handled everything — development, launch, and growth.", author: "First-time Tech Entrepreneur", img: "/assets/landing-page/avatars/avatar_2.png" },
                                { quote: "I never imagined owning an app business would be this easy.", author: "Non-Tech Founder", img: "/assets/landing-page/avatars/avatar_3.png" },
                            ].map((testi, i) => (
                                <div key={i} className="p-8 bg-black/60 border border-gray-800 rounded-2xl relative group hover:border-cyan-500/30 hover:bg-black/90 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(6,182,212,0.2)]">
                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                                    <div className="text-6xl text-gray-700/30 absolute top-4 left-4 font-serif group-hover:text-cyan-500/20 transition-colors">"</div>
                                    <p className="text-gray-300 italic mb-8 relative z-10 pt-4 leading-relaxed group-hover:text-white transition-colors">{testi.quote}</p>
                                    <div className="flex items-center gap-4 border-t border-gray-800 pt-6 group-hover:border-cyan-900/50 transition-colors">
                                        <div className="relative">
                                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur opacity-0 group-hover:opacity-75 transition-opacity"></div>
                                            <img src={testi.img} alt={testi.author} className="relative w-12 h-12 rounded-full object-cover border-2 border-gray-700 group-hover:border-transparent transition-all" />
                                        </div>
                                        <span className="font-bold text-white group-hover:text-cyan-400 transition-colors">{testi.author}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </SectionTransition>

            {/* Final CTA */}
            <SectionTransition fromGradient="from-black to-gray-900" toGradient="from-gray-900 to-black" type="scale">
                <section className="py-32 bg-gradient-to-b from-black to-gray-900 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 opacity-30"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-3xl"></div>
                    <div className="container mx-auto px-4 relative z-10">
                        <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">Your Tech Company Starts Here.</h2>
                        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">Don’t just invest. Build something you own.</p>
                        <Button size="lg" className="bg-white text-black hover:bg-gray-200 text-xl px-12 py-8 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] transition-all duration-300 transform hover:scale-105">
                            Launch Yours Today <ArrowRight className="ml-2" />
                        </Button>
                    </div>
                </section>
            </SectionTransition>

            <Footer />
        </div>
    );
};

export default TechCompanyLanding;
