import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Rocket, Briefcase, Clock, ShieldCheck, X, Zap, Target, Layers, TrendingUp, DollarSign, BarChart3, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader, DialogDescription } from "@/components/ui/dialog";
import { gsap } from 'gsap';
import { SectionTransition } from '@/components/ui/SectionTransition';

// --- Custom Animated SVGs ---
const AnimatedPulse = () => (
    <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
        <div className="w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute w-[300px] h-[300px] bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-700"></div>
    </div>
);

const FloatingCube = () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-16 h-16 text-cyan-400 animate-bounce-slow">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <style>{`.animate-bounce-slow { animation: bounce 3s infinite ease-in-out; } @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }`}</style>
    </svg>
);

const FintechLanding = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        whatsapp: '',
        context: '',
        ideaClarity: '',
        problem: '',
        budget: '',
        timeline: '',
        blocker: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // GSAP Refs
    const heroRef = useRef(null);
    const heroTextRef = useRef(null);
    const heroButtonsRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        tl.fromTo(heroTextRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        )
            .fromTo(heroButtonsRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
                "-=0.5"
            );
    }, []);

    const validateStep1 = () => {
        const tempErrors: Record<string, string> = {};
        if (!formData.fullName) tempErrors.fullName = "Full Name is required";
        if (!formData.email) {
            tempErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = "Email is invalid";
        }
        if (!formData.whatsapp) {
            tempErrors.whatsapp = "WhatsApp Number is required";
        } else if (!/^\d{10,}$/.test(formData.whatsapp.replace(/\D/g, ''))) {
            tempErrors.whatsapp = "Enter a valid phone number (at least 10 digits)";
        }
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const validateStep2 = () => {
        const tempErrors: Record<string, string> = {};
        if (!formData.context) tempErrors.context = "Please select an option";
        if (!formData.ideaClarity) tempErrors.ideaClarity = "Please select an option";
        if (!formData.problem) tempErrors.problem = "Please describe the problem";
        if (!formData.budget) tempErrors.budget = "Please select a budget range";
        if (!formData.timeline) tempErrors.timeline = "Please select a timeline";
        if (!formData.blocker) tempErrors.blocker = "Please select your biggest blocker";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleNextStep = () => {
        if (currentStep === 1 && validateStep1()) {
            setCurrentStep(2);
        }
    };

    const handlePreviousStep = () => {
        setCurrentStep(1);
        setErrors({});
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (validateStep2()) {
            setIsSubmitting(true);

            const messageBody = `
Full Name: ${formData.fullName}
Email: ${formData.email}
WhatsApp: ${formData.whatsapp}
Context: ${formData.context}
Idea Clarity: ${formData.ideaClarity}
Problem: ${formData.problem}
Budget: ${formData.budget}
Timeline: ${formData.timeline}
Blocker: ${formData.blocker}
            `.trim();

            try {
                const response = await fetch("https://send-mail-redirect-boostmysites.vercel.app/send-email", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        to: "boostmysitescom@gmail.com",
                        subject: `New FinTech Application: ${formData.fullName}`,
                        name: "Boostmysites FinTech Enquiry",
                        body: messageBody,
                    }),
                });

                if (response.ok) {
                    setSubmitted(true);
                } else {
                    console.error("Failed to send email");
                    alert("Something went wrong. Please try again.");
                }
            } catch (error) {
                console.error("Error submitting form:", error);
                alert("Something went wrong. Please try again.");
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden">
            <Helmet>
                <title>Launch Your FinTech SaaS | Boostmysites</title>
                <meta name="description" content="We turn FinTech ideas into scalable SaaS products. No coding required." />
            </Helmet>

            <Header />

            {/* Application Modal */}
            <Dialog open={isModalOpen} onOpenChange={(open) => {
                setIsModalOpen(open);
                if (!open) {
                    setCurrentStep(1);
                    setErrors({});
                }
            }}>
                <DialogContent className="bg-gray-900/95 border border-gray-800 text-white sm:max-w-xl max-h-[90vh] flex flex-col p-6 rounded-3xl backdrop-blur-xl shadow-2xl shadow-cyan-500/10 duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-85 data-[state=closed]:zoom-out-85 data-[state=open]:slide-in-from-top-8 data-[state=closed]:slide-out-to-top-8">
                    <DialogHeader className="mb-4">
                        <DialogTitle className="text-2xl font-bold text-center">Let's build your FinTech product</DialogTitle>
                        <DialogDescription className="text-center text-gray-400">
                            Answer a few questions so we can recommend the right path.
                        </DialogDescription>
                    </DialogHeader>

                    {submitted ? (
                        <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in duration-300">
                            <div className="w-20 h-20 bg-cyan-500/20 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle className="w-10 h-10 text-cyan-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Application Received</h2>
                            <p className="text-gray-400 mb-6">
                                We're reviewing your responses.<br />You'll hear from us shortly on WhatsApp.
                            </p>
                            <Button onClick={() => setIsModalOpen(false)} className="bg-gray-800 hover:bg-gray-700">
                                Close
                            </Button>
                        </div>
                    ) : (
                        <div className="flex flex-col space-y-4">
                            {/* Progress Indicator */}
                            <div className="flex items-center justify-center gap-2">
                                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-400'} font-semibold text-sm transition-all`}>
                                    {currentStep > 1 ? <CheckCircle className="w-5 h-5" /> : '1'}
                                </div>
                                <div className={`h-1 w-16 ${currentStep >= 2 ? 'bg-cyan-500' : 'bg-gray-700'} rounded-full transition-all duration-300`}></div>
                                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-400'} font-semibold text-sm transition-all`}>
                                    2
                                </div>
                            </div>

                            <div className="overflow-y-auto flex-1 pr-2" style={{ maxHeight: 'calc(90vh - 280px)' }}>
                                {/* Step 1: Basic Details */}
                                {currentStep === 1 && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-right duration-300">
                                        <h3 className="text-lg font-semibold text-cyan-400 border-b border-gray-800 pb-2">1. Basic Details</h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-xs font-medium text-gray-400">Full Name *</label>
                                                <input
                                                    name="fullName"
                                                    value={formData.fullName}
                                                    onChange={handleChange}
                                                    placeholder="Your name"
                                                    className={`w-full bg-black/50 border ${errors.fullName ? 'border-red-500' : 'border-gray-700'} rounded-lg p-3 text-sm text-white focus:border-cyan-500 focus:outline-none`}
                                                />
                                                {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName}</p>}
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-medium text-gray-400">Email Address *</label>
                                                <input
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="Email"
                                                    className={`w-full bg-black/50 border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-lg p-3 text-sm text-white focus:border-cyan-500 focus:outline-none`}
                                                />
                                                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                                            </div>
                                            <div className="space-y-1 md:col-span-2">
                                                <label className="text-xs font-medium text-gray-400">WhatsApp Number *</label>
                                                <input
                                                    name="whatsapp"
                                                    value={formData.whatsapp}
                                                    onChange={handleChange}
                                                    placeholder="We send next steps here"
                                                    className={`w-full bg-black/50 border ${errors.whatsapp ? 'border-red-500' : 'border-gray-700'} rounded-lg p-3 text-sm text-white focus:border-cyan-500 focus:outline-none`}
                                                />
                                                {errors.whatsapp && <p className="text-red-500 text-xs">{errors.whatsapp}</p>}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Your Startup Goals */}
                                {currentStep === 2 && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-right duration-300">
                                        <h3 className="text-lg font-semibold text-cyan-400 border-b border-gray-800 pb-2">2. Your FinTech Goals</h3>
                                        <div className="space-y-3">
                                            <label className="text-xs font-medium text-gray-400">Do you already have a FinTech idea? *</label>
                                            <div className="grid grid-cols-1 gap-2">
                                                {["Yes, clearly defined", "Somewhat, still researching", "No, looking for ideas"].map(opt => (
                                                    <button
                                                        type="button"
                                                        key={opt}
                                                        onClick={() => handleChange({ target: { name: 'ideaClarity', value: opt } })}
                                                        className={`text-left text-sm p-3 rounded-lg border transition-all ${formData.ideaClarity === opt ? 'bg-cyan-900/30 border-cyan-500 text-cyan-100' : 'bg-black/30 border-gray-800 hover:border-gray-600'}`}
                                                    >
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                            {errors.ideaClarity && <p className="text-red-500 text-xs">{errors.ideaClarity}</p>}
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-xs font-medium text-gray-400">Briefly describe the problem or market *</label>
                                            <textarea
                                                name="problem"
                                                value={formData.problem}
                                                onChange={handleChange}
                                                placeholder="e.g. Stock market analysis tool for beginners..."
                                                rows={2}
                                                className={`w-full bg-black/50 border ${errors.problem ? 'border-red-500' : 'border-gray-700'} rounded-lg p-3 text-sm text-white focus:border-cyan-500 focus:outline-none`}
                                            />
                                            {errors.problem && <p className="text-red-500 text-xs">{errors.problem}</p>}
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-xs font-medium text-gray-400">Budget Range *</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                {["₹50,000 (Micro MVP)", "₹2–5 Lakhs (Full Build)", "₹10 Lakhs+ (Scale)", "Not sure yet"].map(opt => (
                                                    <button
                                                        type="button"
                                                        key={opt}
                                                        onClick={() => handleChange({ target: { name: 'budget', value: opt } })}
                                                        className={`text-left text-xs p-2 rounded-lg border transition-all ${formData.budget === opt ? 'bg-cyan-900/30 border-cyan-500 text-cyan-100' : 'bg-black/30 border-gray-800 hover:border-gray-600'}`}
                                                    >
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                            {errors.budget && <p className="text-red-500 text-xs">{errors.budget}</p>}
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-xs font-medium text-gray-400">Timeline to Launch *</label>
                                            <div className="flex flex-wrap gap-2">
                                                {["Immediately", "Within 30 days", "1–3 months", "Just exploring"].map(opt => (
                                                    <button
                                                        type="button"
                                                        key={opt}
                                                        onClick={() => handleChange({ target: { name: 'timeline', value: opt } })}
                                                        className={`text-xs px-3 py-2 rounded-full border transition-all ${formData.timeline === opt ? 'bg-cyan-900/30 border-cyan-500 text-cyan-100' : 'bg-black/30 border-gray-800 hover:border-gray-600'}`}
                                                    >
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                            {errors.timeline && <p className="text-red-500 text-xs">{errors.timeline}</p>}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Navigation Buttons */}
                            <div className="bg-gray-900 pt-4 pb-2 border-t border-gray-800 flex gap-3">
                                {currentStep === 2 && (
                                    <Button
                                        type="button"
                                        onClick={handlePreviousStep}
                                        className="w-1/3 bg-gray-800 hover:bg-gray-700 text-white font-bold py-6 rounded-xl"
                                    >
                                        Previous
                                    </Button>
                                )}
                                {currentStep === 1 ? (
                                    <Button
                                        type="button"
                                        onClick={handleNextStep}
                                        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-6 rounded-xl"
                                    >
                                        Next Step
                                    </Button>
                                ) : (
                                    <Button
                                        type="button"
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-6 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? "Submitting..." : "Submit Application"}
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Hero Section */}
            <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-4 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/70 z-10"></div>
                    <img
                        src="/assets/landing-page/fintech-hero-bg.png"
                        alt="Fintech Background"
                        className="w-full h-full object-cover opacity-60"
                    />
                </div>

                <div className="container mx-auto z-10 text-center relative">
                    <AnimatedPulse />

                    <div ref={heroTextRef}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-cyan-400 text-sm font-medium mb-8 backdrop-blur-md relative z-10">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                            </span>
                            New Batches for {new Date().toLocaleString('default', { month: 'long' })}
                        </div>

                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-none max-w-6xl mx-auto relative z-10 mix-blend-screen">
                            Have a <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Stock Market</span> or <br />
                            FinTech App Idea?
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed relative z-10 font-light">
                            We turn ideas into scalable SaaS products without you hiring developers, managing teams, or guessing what to build.
                            <br /><span className="text-cyan-400 font-medium">From concept to users, we handle everything.</span>
                        </p>
                    </div>

                    <div ref={heroButtonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10">
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-cyan-500 text-black hover:bg-cyan-400 text-lg px-10 py-8 rounded-full font-bold shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:shadow-[0_0_60px_rgba(6,182,212,0.5)] transition-all duration-300 transform hover:scale-105"
                        >
                            Start My FinTech Product
                        </Button>
                        <Button
                            variant="ghost"
                            className="text-white hover:text-cyan-400 hover:bg-white/5 text-lg px-8 py-8 rounded-full transition-all border border-transparent hover:border-white/10"
                            onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
                        >
                            See how it works <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* Who This Is For Section */}
            <SectionTransition type="fade" fromGradient="from-black to-zinc-950" toGradient="from-zinc-950 to-black">
                <section className="py-24 border-y border-white/5 relative">
                    <div className="container mx-auto px-4 z-10 relative">
                        <div className="max-w-4xl mx-auto text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">This is built for serious <span className="text-cyan-400">FinTech founders</span></h2>
                            <p className="text-gray-400 text-lg">If you only want advice or learning, this is not for you.</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { icon: <TrendingUp className="w-8 h-8 text-cyan-400" />, title: "Traders & Investors", desc: "With a product idea but no coding skills." },
                                { icon: <Briefcase className="w-8 h-8 text-blue-500" />, title: "Professionals", desc: "Wanting to launch a FinTech startup." },
                                { icon: <ShieldCheck className="w-8 h-8 text-purple-500" />, title: "Non-Tech Founders", desc: "Without a tech team or CTO." },
                                { icon: <Clock className="w-8 h-8 text-pink-500" />, title: "Visionaries", desc: "Tired of half-built products and delays." }
                            ].map((item, i) => (
                                <div key={i} className="group bg-black/40 border border-white/10 p-8 rounded-3xl hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-900/20 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="mb-6 p-4 bg-white/5 w-fit rounded-2xl group-hover:bg-cyan-500/20 transition-colors">{item.icon}</div>
                                    <h3 className="text-xl font-bold mb-2 relative z-10">{item.title}</h3>
                                    <p className="text-gray-400 relative z-10 font-light">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </SectionTransition>

            {/* Problem Section */}
            <SectionTransition type="slide" fromGradient="from-zinc-950 to-black" toGradient="from-black to-zinc-950">
                <section className="py-24 bg-black relative overflow-hidden">
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">Why most FinTech ideas <br /><span className="text-red-500">never become real products</span></h2>
                                <ul className="space-y-6">
                                    {[
                                        "Ideas stay on paper, never reach users",
                                        "Developers focus on features, not compliance",
                                        "Products are built without validation",
                                        "No launch or user acquisition strategy",
                                        "Legal and technical complexity kills momentum"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-4 text-xl text-gray-300 group">
                                            <span className="w-2 h-2 bg-red-800 group-hover:bg-red-500 rounded-full transition-colors duration-300 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <p className="mt-10 text-xl font-medium border-l-4 border-red-500 pl-6 py-4 text-white bg-gradient-to-r from-red-500/10 to-transparent rounded-r-xl">
                                    In FinTech, execution matters more than ideas.
                                </p>
                            </div>
                            <div className="relative flex justify-center">
                                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-600/20 blur-[100px] opacity-40"></div>
                                <div className="relative w-80 h-96 bg-zinc-900/80 border border-white/10 rounded-3xl p-8 backdrop-blur-xl rotate-3 hover:rotate-0 transition-all duration-700 shadow-2xl flex flex-col justify-between group">
                                    <div className="flex justify-between items-center opacity-50 group-hover:opacity-100 transition-opacity">
                                        <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center"><X className="text-red-500" /></div>
                                        <div className="text-xs font-mono text-gray-500">FAILED_TO_LAUNCH</div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="h-2 bg-gray-700 rounded-full w-2/3"></div>
                                        <div className="h-2 bg-gray-700 rounded-full w-full"></div>
                                        <div className="h-2 bg-gray-700 rounded-full w-5/6"></div>
                                    </div>
                                    <div className="text-center text-gray-500 font-mono text-sm mt-8">
                                        No Product. No Users.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </SectionTransition>

            {/* What You Actually Do */}
            <SectionTransition type="scale" fromGradient="from-black to-gray-900" toGradient="from-gray-900 to-black">
                <section className="py-24 bg-gradient-to-b from-gray-900 to-black relative border-t border-gray-800">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">We don’t just build apps. <br />We build <span className="text-cyan-400">FinTech businesses</span>.</h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-20 leading-relaxed">
                            FinTech products fail when founders focus only on development.
                            <br /><span className="text-white font-bold">We focus on the full journey from idea validation to real users and revenue.</span>
                        </p>

                        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {[
                                { title: "Product Ideation", icon: <Zap size={24} />, desc: "We refine your concept for market fit." },
                                { title: "SaaS Development", icon: <Layers size={24} />, desc: "Secure, scalable, compliance-ready code." },
                                { title: "Monetisation Models", icon: <DollarSign size={24} />, desc: "Strategies that actually generate revenue." }
                            ].map((item, i) => (
                                <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors">
                                    <div className="bg-cyan-500/20 w-12 h-12 rounded-lg flex items-center justify-center text-cyan-400 mx-auto mb-4">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                    <p className="text-gray-400 text-sm">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </SectionTransition>

            {/* How It Works */}
            <SectionTransition type="fade" fromGradient="from-black to-zinc-950" toGradient="from-zinc-950 to-black">
                <section id="how-it-works" className="py-24 bg-black relative">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-5xl font-bold mb-20 text-center">How It Works</h2>
                        <div className="grid md:grid-cols-4 gap-8">
                            {[
                                { step: "01", title: "Idea & Validation", desc: "We evaluate your idea or help you define one that can actually scale." },
                                { step: "02", title: "Product Build", desc: "We design and develop your FinTech SaaS with the right tech stack and security." },
                                { step: "03", title: "Launch Strategy", desc: "Positioning, pricing, onboarding, and early user acquisition." },
                                { step: "04", title: "Growth & Iteration", desc: "Improve retention, monetisation, and scalability." }
                            ].map((item, i) => (
                                <div key={i} className="relative p-8 border border-white/5 bg-white/[0.02] rounded-3xl hover:border-cyan-500/50 transition-all duration-500 group hover:bg-white/[0.05]">
                                    <span className="text-8xl font-black text-white/5 absolute -top-8 -right-4 transition-colors group-hover:text-cyan-500/10 pointer-events-none">{item.step}</span>
                                    <div className="w-12 h-1 bg-cyan-500 mb-6 rounded-full group-hover:w-20 transition-all duration-300"></div>
                                    <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </SectionTransition>

            {/* Why Founders Choose You */}
            <SectionTransition type="slide" fromGradient="from-zinc-950 to-black" toGradient="from-black to-zinc-950">
                <section className="py-24 bg-zinc-950 relative border-t border-gray-800">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-5xl font-bold mb-8">Why not freelancers or agencies?</h2>
                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
                            <div className="bg-red-900/10 border border-red-900/30 p-8 rounded-2xl">
                                <h3 className="text-red-400 font-bold text-xl mb-4">Freelancers & Agencies</h3>
                                <ul className="space-y-3 text-gray-400">
                                    <li className="flex gap-2"><X className="text-red-500 w-5 h-5" /> Just write code, don't care about business</li>
                                    <li className="flex gap-2"><X className="text-red-500 w-5 h-5" /> Charge for every small change</li>
                                    <li className="flex gap-2"><X className="text-red-500 w-5 h-5" /> No post-launch support or growth strategy</li>
                                </ul>
                            </div>
                            <div className="bg-cyan-900/10 border border-cyan-500/30 p-8 rounded-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 bg-cyan-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">US</div>
                                <h3 className="text-cyan-400 font-bold text-xl mb-4">Boostmysites</h3>
                                <ul className="space-y-3 text-gray-300">
                                    <li className="flex gap-2"><CheckCircle className="text-cyan-500 w-5 h-5" /> Tech co-founder approach, not vendor</li>
                                    <li className="flex gap-2"><CheckCircle className="text-cyan-500 w-5 h-5" /> Decisions based on business outcomes</li>
                                    <li className="flex gap-2"><CheckCircle className="text-cyan-500 w-5 h-5" /> One team for product, tech, and growth</li>
                                </ul>
                            </div>
                        </div>
                        <p className="mt-10 text-xl font-medium text-white">We build what can make money, not just what sounds good.</p>
                    </div>
                </section>
            </SectionTransition>

            {/* Pricing Tiers */}
            <SectionTransition type="scale" fromGradient="from-black to-gray-900" toGradient="from-gray-900 to-black">
                <section className="py-24 bg-black relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-cyan-900/10 rounded-full blur-[100px]"></div>
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-center">
                            {/* Micro MVP */}
                            <div className="p-8 rounded-3xl bg-black border border-gray-800 flex flex-col hover:border-gray-600 transition-colors">
                                <h3 className="text-xl font-bold text-gray-400 mb-2">Micro FinTech MVP</h3>
                                <div className="text-4xl font-bold mb-6">₹50,000</div>
                                <ul className="space-y-4 mb-8 flex-1">
                                    <li className="flex gap-3 text-sm text-gray-300"><CheckCircle className="w-5 h-5 text-gray-500 flex-shrink-0" /> Idea Validation</li>
                                    <li className="flex gap-3 text-sm text-gray-300"><CheckCircle className="w-5 h-5 text-gray-500 flex-shrink-0" /> Basic MVP Build</li>
                                    <li className="flex gap-3 text-sm text-gray-300"><CheckCircle className="w-5 h-5 text-gray-500 flex-shrink-0" /> Monetisation Direction</li>
                                </ul>
                                <Button variant="outline" className="w-full py-6 border-gray-700 text-gray-900 hover:bg-gray-900 hover:text-white rounded-xl" onClick={() => setIsModalOpen(true)}>
                                    Start with Micro MVP
                                </Button>
                            </div>

                            {/* Full Build */}
                            <div className="p-10 rounded-[2rem] bg-gradient-to-b from-gray-900 via-zinc-900 to-black border border-cyan-500/50 shadow-2xl shadow-cyan-900/20 transform md:scale-105 flex flex-col relative z-20">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-500 text-black text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-cyan-500/50">Recommended</div>
                                <h3 className="text-xl font-bold text-cyan-400 mb-2">Full FinTech Startup</h3>
                                <div className="text-5xl font-bold mb-8 text-white">₹2-5 Lakhs</div>
                                <ul className="space-y-5 mb-10 flex-1">
                                    {[
                                        "End-to-end product development",
                                        "Launch & user acquisition plan",
                                        "Compliance-ready architecture",
                                        "Ongoing tech support"
                                    ].map((feat, i) => (
                                        <li key={i} className="flex gap-3 text-sm text-white font-medium"><CheckCircle className="w-5 h-5 text-cyan-500 flex-shrink-0" /> {feat}</li>
                                    ))}
                                </ul>
                                <Button className="w-full py-7 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/25" onClick={() => setIsModalOpen(true)}>
                                    Build My FinTech Startup
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </SectionTransition>

            {/* Urgency Section */}
            <SectionTransition type="fade" fromGradient="from-gray-900 to-black" toGradient="from-black to-gray-900">
                <section className="py-32 bg-gray-900/30 text-center border-t border-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-cyan-900/10 opacity-30"></div>
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">We work with a limited number of founders</h2>
                            <p className="text-gray-400 mb-10 text-xl font-light">To maintain quality and speed, we only onboard a few projects every month.</p>
                            <Button onClick={() => setIsModalOpen(true)} size="lg" className="bg-white text-black hover:bg-gray-200 rounded-full px-12 py-8 text-xl font-bold shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                                Start My Application
                            </Button>
                            <p className="text-sm text-gray-500 mt-6 tracking-wide uppercase">Takes less than 2 minutes • No obligation</p>
                        </div>
                    </div>
                </section>
            </SectionTransition>

            <Footer />
        </div>
    );
};

export default FintechLanding;
