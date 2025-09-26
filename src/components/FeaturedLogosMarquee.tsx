import React from 'react';
import forbesLogo from '../assets/logos/forbes.png';
import entrepreneurLogo from '../assets/logos/entrepreneur.webp';
import timesOfIndiaLogo from '../assets/logos/times-of-india.png';
import businessInsiderLogo from '../assets/logos/business-insider.jpg';

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
      src: forbesLogo, 
      alt: 'Forbes', 
      name: 'Forbes',
      url: 'https://youtu.be/z8QmKfoBCWY?si=ilhlrWWADdzTuOFe'
    },
    { 
      src: entrepreneurLogo, 
      alt: 'Entrepreneur', 
      name: 'Entrepreneur' 
    },
    { 
      src: timesOfIndiaLogo, 
      alt: 'Times of India', 
      name: 'Times of India' 
    },
    { 
      src: businessInsiderLogo, 
      alt: 'Business Insider', 
      name: 'Business Insider' 
    },
  ];

  return (
    <div className="w-full overflow-hidden py-4">
      {showTitle && (
        <div className="flex items-center justify-center mb-6">
          <p className="text-muted-foreground text-lg font-medium">{titleText}</p>
        </div>
      )}

      <div className="relative">
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-12 sm:animate-bounce-slow">
          {logos.map((logo, index) => {
            const LogoWrapper = logo.url ? 'a' : 'div';
            const wrapperProps = logo.url ? {
              href: logo.url,
              target: '_blank',
              rel: 'noopener noreferrer',
              className: 'flex-shrink-0 transition-all duration-300 hover:scale-105 group cursor-pointer'
            } : {
              className: 'flex-shrink-0 transition-all duration-300 hover:scale-105 group'
            };

            return (
              <LogoWrapper
                key={`${logo.name}-${index}`}
                {...wrapperProps}
              >
                <div className="rounded-xl px-6 py-3 transition-all duration-300 relative">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-12 sm:h-16 md:h-20 w-auto object-contain opacity-90 
                             group-hover:opacity-100 transition-opacity duration-300"
                    loading="lazy"
                    decoding="async"
                  />
                  {logo.url && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white text-xs">▶</span>
                    </div>
                  )}
                </div>
              </LogoWrapper>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-bounce-slow {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default FeaturedLogosMarquee;