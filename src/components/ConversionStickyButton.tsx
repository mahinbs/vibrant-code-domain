import React from 'react';
import { Button } from './ui/button';
import { Phone, MessageCircle } from 'lucide-react';

const ConversionStickyButton: React.FC = () => {
  const handleGetConsultation = () => {
    const element = document.getElementById('contact-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop sticky button */}
      <div className="hidden md:block fixed top-24 right-6 z-50">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg shadow-2xl border border-cyan-400/20 overflow-hidden">
          <Button
            onClick={handleGetConsultation}
            className="px-6 py-3 text-sm bg-transparent hover:bg-white/10 text-white font-semibold transition-all duration-300 border-0"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Free Consultation
          </Button>
        </div>
        <div className="text-xs text-center mt-1 text-cyan-300 font-medium">24hr Response</div>
      </div>
      
      {/* Mobile sticky bottom bar with urgency */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-black/90 to-transparent backdrop-blur-sm">
        <div className="text-center mb-2">
          <div className="text-xs text-cyan-400 font-medium">Limited Slots Available</div>
        </div>
        <Button
          onClick={handleGetConsultation}
          className="w-full font-semibold py-4 h-12 text-base bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-2xl border border-cyan-400/20 transition-all duration-300 transform hover:scale-[1.02]"
        >
          <Phone className="h-4 w-4 mr-2" />
          Get Free Consultation Now
        </Button>
      </div>
    </>
  );
};

export default ConversionStickyButton;