import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLandingTheme } from '../../../contexts/ThemeContext';
import ContactFormModal from './ContactFormModal';

const Footer = () => {
    const { theme } = useLandingTheme();
    const isDark = theme === 'dark';
    const [licenseModalOpen, setLicenseModalOpen] = useState(false);

    return (
        <footer className={`pt-16 sm:pt-24 pb-8 px-4 sm:px-7 relative overflow-hidden ${isDark ? 'bg-[#0a0e17]' : 'bg-white'}`}>
            <div className="container-custom !bg-[#181b22] relative z-10 p-7 sm:p-10 md:p-14 rounded-xl text-center">
                <h2 className="text-xl sm:text-2xl md:text-4xl font-bold font-heading leading-tight mb-3 sm:mb-4 text-white">
                    Stop trading. Start Owning the House.
                </h2>
                <p className={`text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-6 sm:mb-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Final Seats Available for the 2026 Partner Intake. Secure your institutional infrastructure today.
                </p>
                <button
                    type="button"
                    onClick={() => setLicenseModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 bg-black border border-gray-600 text-white font-bold py-3.5 sm:py-4 px-6 sm:px-8 rounded-lg hover:bg-gray-900 transition-colors text-sm sm:text-base mb-4 w-full sm:w-auto"
                >
                    Acquire My License
                    <ArrowRight className="w-5 h-5" />
                </button>
                <p className="text-gray-500 text-xs sm:text-sm uppercase tracking-wider">
                    Partner slots limited by geographic region
                </p>
            </div>

            <ContactFormModal
                open={licenseModalOpen}
                onOpenChange={setLicenseModalOpen}
                variant="license"
            />
        </footer>
    );
};

export default Footer;
