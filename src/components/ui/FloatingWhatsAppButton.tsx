
import { MessageCircle } from 'lucide-react';
import { useState } from 'react';

const FloatingWhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  // WhatsApp configuration
  const whatsappNumber = '00919632953355';
  const whatsappMessage = 'I want to discuss about a software or app project. when can we discuss the same?';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Chat with us on WhatsApp"
      >
        {/* Tooltip */}
        <div
          className={`absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap transition-all duration-300 transform ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
          }`}
        >
          Chat with us
          <div className="absolute top-1/2 right-0 transform translate-x-full -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
        </div>

        {/* Button */}
        <div className="w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center transform hover:scale-110 animate-pulse">
          <MessageCircle className="h-7 w-7 text-white" />
        </div>

        {/* Pulse animation ring */}
        <div className="absolute inset-0 w-14 h-14 bg-[#25D366] rounded-full animate-ping opacity-20"></div>
      </a>
    </div>
  );
};

export default FloatingWhatsAppButton;
