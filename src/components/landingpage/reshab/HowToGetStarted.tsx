import { useState } from 'react';
import { useLandingTheme } from '../../../contexts/ThemeContext';
import ContactFormModal from './ContactFormModal';

interface HowToGetStartedProps {
    whatsappNumber?: string;
}

const HowToGetStarted = ({ whatsappNumber }: HowToGetStartedProps) => {
    const { theme } = useLandingTheme();
    const isDark = theme === 'dark';
    const [modalOpen, setModalOpen] = useState(false);

    const whatsappPresetMessage = 'Hey, I want to start my AI trading SaaS business';
    const whatsappHref = whatsappNumber
        ? `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappPresetMessage)}`
        : null;

    return (
        <section id="contact" className={`py-10 md:py-24 px-4 sm:px-7 ${isDark ? 'bg-[#0a0e17]' : 'bg-white'}`}>
            <div className={`container-custom !max-w-6xl rounded-3xl p-6 sm:p-8 md:p-16 ${isDark ? 'md:!bg-white/5' : 'md:!bg-[#f4f2f0]'}`}>
                <div className="grid md:grid-cols-[35%,1fr] gap-8 sm:gap-12 lg:gap-16 items-center">
                    {/* Left Column - Heading */}
                    <div>
                        <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-heading leading-tight ${isDark ? 'text-white' : 'text-heading'}`}>
                            Start your fintech empire today!
                        </h2>
                        <p className={`mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Share your details and we'll help you get started with your own branded platform.
                        </p>
                    </div>

                    {/* Right Column - CTA card */}
                    <div className={`rounded-2xl p-5 sm:p-6 md:p-8 flex flex-col items-center justify-center gap-5 sm:gap-6 text-center ${isDark ? 'bg-[#181B22] border border-gray-800' : 'bg-white border border-gray-200 shadow-lg'}`}>
                        <p className={`text-base sm:text-lg font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Ready to get started? Fill in your details and we'll reach out to guide you through the onboarding process.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full justify-center">
                            <button
                                type="button"
                                onClick={() => setModalOpen(true)}
                                className="py-3.5 px-8 rounded-xl bg-primary text-white font-bold hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20 w-full sm:w-auto"
                            >
                                Get Started Now
                            </button>
                            
                            {whatsappHref && (
                                <a
                                    href={whatsappHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center py-3.5 px-8 rounded-xl border-2 border-[#25D366] text-[#25D366] font-semibold hover:bg-[#25D366] hover:text-white transition-colors w-full sm:w-auto"
                                >
                                    Chat on WhatsApp
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <ContactFormModal
                open={modalOpen}
                onOpenChange={setModalOpen}
                variant="license"
            />
        </section>
    );
};

export default HowToGetStarted;
