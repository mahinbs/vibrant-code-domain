import React from 'react';

interface FeaturedLogosMarqueeProps {
  direction?: 'left' | 'right';
  speed?: number;
  showTitle?: boolean;
  titleText?: string;
}

const FeaturedLogosMarquee = ({ 
  direction = 'left', 
  speed = 25, 
  showTitle = true,
  titleText = "As featured in"
}: FeaturedLogosMarqueeProps) => {
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

  const duplicatedLogos = [...logos, ...logos];
  
  return (
    <div className="w-full overflow-hidden py-8">
      {showTitle && (
        <div className="flex items-center justify-center mb-8">
          <p className="text-muted-foreground text-lg font-medium">{titleText}</p>
        </div>
      )}

      <div className="relative">
        <div 
          className="flex items-center space-x-12 animate-marquee"
          style={{
            animation: `marquee-${direction} ${speed}s linear infinite`,
            width: 'max-content',
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
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
      </div>

      <style>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        .animate-marquee {
          animation: marquee-left ${speed}s linear infinite;
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