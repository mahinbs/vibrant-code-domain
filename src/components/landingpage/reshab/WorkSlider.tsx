import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLandingTheme } from '../../../contexts/ThemeContext';
import ContactFormModal from './ContactFormModal';

const VIDEO_EMBED_URL = 'https://drive.google.com/file/d/1fM2jZ-PkUMO5f0dfp6DVPOzF0u8JxJ76/preview';

const WorkSlider = () => {
    const { theme } = useLandingTheme();
    const isDark = theme === 'dark';
    const [demoModalOpen, setDemoModalOpen] = useState(false);

    return (
        <section id="demo" className={`py-16 sm:py-24 px-4 sm:px-7 ${isDark ? 'bg-[#0a0e17]' : 'bg-white'}`}>
            <div className="container-custom !bg-[#181b22] overflow-hidden py-10 sm:py-16 !px-5 sm:!px-8 md:!px-14 rounded-3xl">

                <div className="mb-6 sm:mb-10">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-white leading-tight">
                        See The AI In Action
                    </h2>
                </div>

                <div className="max-w-4xl mx-auto aspect-video rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
                    <iframe
                        src={VIDEO_EMBED_URL}
                        className="w-full h-full"
                        allow="autoplay"
                        allowFullScreen
                        title="Demo Video"
                    />
                </div>

                <div className="mt-6 sm:mt-8 text-center">
                    <button
                        type="button"
                        onClick={() => setDemoModalOpen(true)}
                        className="inline-flex items-center text-white font-bold text-sm sm:text-base hover:text-primary transition-colors group"
                    >
                        Get Platform Demo
                        <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

            <ContactFormModal
                open={demoModalOpen}
                onOpenChange={setDemoModalOpen}
                variant="demo"
            />
        </section>
    );
};

export default WorkSlider;
