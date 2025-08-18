import React from 'react';

const FeaturedLogosMarquee = () => {
  const logos = [
    { 
      src: '/src/assets/logos/forbes.png', 
      alt: 'Forbes', 
      name: 'Forbes' 
    },
    { 
      src: '/src/assets/logos/entrepreneur.webp', 
      alt: 'Entrepreneur', 
      name: 'Entrepreneur' 
    },
    { 
      src: '/src/assets/logos/times-of-india.png', 
      alt: 'Times of India', 
      name: 'Times of India' 
    },
    { 
      src: '/src/assets/logos/business-insider.jpg', 
      alt: 'Business Insider', 
      name: 'Business Insider' 
    },
  ];

  return (
    <div className="w-full overflow-hidden py-8">
      <div className="flex items-center justify-center mb-6">
        <p className="text-muted-foreground text-sm font-medium">As featured in</p>
      </div>

      <div 
        className="flex items-center justify-center space-x-12 animate-marquee"
        style={{
          animation: 'marquee 25s linear infinite',
        }}
      >
        {logos.map((logo) => (
          <div
            key={logo.name}
            className="flex-shrink-0 transition-all duration-300 hover:scale-105 group"
          >
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-6 py-3 
                          hover:bg-white/30 hover:border-white/40 transition-all duration-300
                          shadow-lg hover:shadow-xl">
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-12 w-auto object-contain opacity-90 
                         group-hover:opacity-100 transition-opacity duration-300"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        .animate-marquee {
          animation: marquee 25s linear infinite;
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