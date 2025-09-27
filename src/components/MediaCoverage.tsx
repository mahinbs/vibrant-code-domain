import React from 'react';
import { ExternalLink, Play } from 'lucide-react';
import forbesColorLogo from '../assets/logos/forbes-color.png';
import entrepreneurLogo from '../assets/logos/entrepreneur.webp';
import timesOfIndiaLogo from '../assets/logos/times-of-india.png';
import businessInsiderColorLogo from '../assets/logos/business-insider-color.png';

const MediaCoverage = () => {

  return (
    <section className="py-12 relative overflow-hidden">
      {/* Simplified background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Compact headline */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Featured In Global Media
            </span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Prominent Forbes Video */}
          <div className="text-center mb-8">
            <div className="relative w-full max-w-2xl mx-auto">
              <div className="aspect-video rounded-2xl overflow-hidden border border-red-500/30 shadow-2xl">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/z8QmKfoBCWY?si=ilhlrWWADdzTuOFe"
                  title="Forbes Interview"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
            <p className="text-xl font-semibold text-white mt-4">
              Watch our founder's interview with Forbes
            </p>
          </div>

          {/* Featured Logos */}
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-4 uppercase tracking-wider">
              Also Featured In
            </p>
            <div className="flex justify-center items-center gap-8 md:gap-12">
              {[
                { name: 'Entrepreneur', logo: entrepreneurLogo },
                { name: 'Times of India', logo: timesOfIndiaLogo },
                { name: 'Business Insider', logo: businessInsiderColorLogo }
              ].map((publication) => (
                <div key={publication.name} className="hover:scale-105 transition-all duration-300">
                  <img 
                    src={publication.logo} 
                    alt={publication.name} 
                    className="h-6 md:h-8 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaCoverage;