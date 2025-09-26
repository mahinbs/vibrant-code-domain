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
      src: 'https://res.cloudinary.com/dqogq10ag/image/upload/v1755670556/Untitled_design_1_cqndw8.png', 
      alt: 'Forbes', 
      name: 'Forbes',
      url: 'https://youtu.be/z8QmKfoBCWY?si=85rX-6S1wLRXiy2n'
    },
    { 
      src: 'https://res.cloudinary.com/dqogq10ag/image/upload/v1755670556/Untitled_design_3_xwryyd.png', 
      alt: 'Entrepreneur', 
      name: 'Entrepreneur' 
    },
    { 
      src: 'https://res.cloudinary.com/dqogq10ag/image/upload/v1755670556/Untitled_design_2_rdvdwc.png', 
      alt: 'Times of India', 
      name: 'Times of India' 
    },
    { 
      src: 'https://res.cloudinary.com/dqogq10ag/image/upload/v1755670557/Untitled_design_4_ge9dfe.png', 
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