import React from 'react';
import forbesLogo from '@/assets/logos/forbes.png';
import entrepreneurLogo from '@/assets/logos/entrepreneur.webp';
import timesOfIndiaLogo from '@/assets/logos/times-of-india.png';
import businessInsiderLogo from '@/assets/logos/business-insider.jpg';

const FeaturedLogosMarquee = () => {
  const logos = [
    { src: forbesLogo, alt: 'Forbes', name: 'Forbes' },
    { src: entrepreneurLogo, alt: 'Entrepreneur', name: 'Entrepreneur' },
    { src: timesOfIndiaLogo, alt: 'Times of India', name: 'Times of India' },
    { src: businessInsiderLogo, alt: 'Business Insider', name: 'Business Insider' },
  ];

  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="w-full overflow-hidden bg-background/50 py-8 relative">
      {/* Gradient masks for smooth edges */}
      <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>
      
      <div className="flex items-center justify-center mb-4">
        <p className="text-muted-foreground text-sm font-medium">As featured in</p>
      </div>

      <div 
        className="flex items-center space-x-16 animate-marquee hover:pause-animation"
        style={{
          animation: 'marquee 30s linear infinite',
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="flex-shrink-0 transition-all duration-300 hover:scale-110 hover:grayscale-0 grayscale opacity-60 hover:opacity-100"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-8 w-auto object-contain filter"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        
        .hover\\:pause-animation:hover {
          animation-play-state: paused;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default FeaturedLogosMarquee;