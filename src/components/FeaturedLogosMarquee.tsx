import React from 'react';

const FeaturedLogosMarquee = () => {
  const logos = [
    { 
      src: 'https://res.cloudinary.com/dqogq10ag/image/upload/v1755506741/forbes-logo-11609361702nvjwui1s5f_krbedx.png', 
      alt: 'Forbes', 
      name: 'Forbes' 
    },
    { 
      src: 'https://res.cloudinary.com/dqogq10ag/image/upload/v1755506740/kisspng-entrepreneurship-logo-organization-leadership-busi-entrepreneur-5ae9753c3ef694.8751702415252493402579_hofbma.webp', 
      alt: 'Entrepreneur', 
      name: 'Entrepreneur' 
    },
    { 
      src: 'https://res.cloudinary.com/dqogq10ag/image/upload/v1755506740/images_qvzhpc.png', 
      alt: 'Times of India', 
      name: 'Times of India' 
    },
    { 
      src: 'https://res.cloudinary.com/dqogq10ag/image/upload/v1755506740/images_hmfvsu.jpg', 
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
            className="flex-shrink-0 transition-all duration-300 hover:scale-110"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-16 w-auto object-contain"
              loading="lazy"
            />
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