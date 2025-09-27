import React from 'react';
import { ExternalLink, Play } from 'lucide-react';
import forbesColorLogo from '../assets/logos/forbes-color.png';
import entrepreneurLogo from '../assets/logos/entrepreneur.webp';
import timesOfIndiaLogo from '../assets/logos/times-of-india.png';
import businessInsiderColorLogo from '../assets/logos/business-insider-color.png';

const MediaCoverage = () => {
  const handleForbesClick = () => {
    window.open('https://youtu.be/z8QmKfoBCWY?si=ilhlrWWADdzTuOFe', '_blank');
  };

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
            <div 
              onClick={handleForbesClick}
              className="group inline-block cursor-pointer"
            >
              <div className="relative">
                <div className="w-80 h-48 mx-auto bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-2xl border border-red-500/30 flex items-center justify-center relative overflow-hidden group-hover:border-red-400/50 transition-all duration-300">
                  <div className="absolute inset-0 bg-black/50"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                      <Play className="h-8 w-8 text-white ml-1" fill="currentColor" />
                    </div>
                    <p className="text-white font-semibold text-lg">Watch Interview</p>
                  </div>
                  {/* Forbes Logo Overlay */}
                  <div className="absolute top-4 left-4">
                    <img 
                      src={forbesColorLogo} 
                      alt="Forbes" 
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                  <div className="absolute top-4 right-4">
                    <ExternalLink className="h-5 w-5 text-white/80 group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xl font-semibold text-white mt-4 mb-2">
              Watch our founder's interview with Forbes
            </p>
            <p className="text-gray-400">
              Discussing the future of web development and AI integration
            </p>
          </div>

          {/* Compact Press Logo Strip */}
          <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-700/20 p-6">
            <p className="text-center text-gray-400 text-sm mb-4 uppercase tracking-wider">
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