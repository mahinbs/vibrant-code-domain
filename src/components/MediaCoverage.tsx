import React from 'react';
import { ExternalLink, Play, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import forbesLogo from '../assets/logos/forbes.png';
import entrepreneurLogo from '../assets/logos/entrepreneur.webp';
import timesOfIndiaLogo from '../assets/logos/times-of-india.png';
import businessInsiderLogo from '../assets/logos/business-insider.jpg';

const MediaCoverage = () => {
  const navigate = useNavigate();
  
  const handleForbesClick = () => {
    window.open('https://youtu.be/z8QmKfoBCWY?si=ilhlrWWADdzTuOFe', '_blank');
  };

  const handleConsultation = () => {
    navigate('/contact#form');
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Dark geometric background matching Hero section */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 pointer-events-none"></div>
      
      {/* Geometric patterns */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-purple-400/10 to-pink-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Authority-driven headline */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Featured In Global Media
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Recognized by top publications for innovation and digital transformation excellence
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Featured Forbes Interview */}
          <div 
            onClick={handleForbesClick}
            className="group bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-3xl border border-gray-700/30 p-8 md:p-12 cursor-pointer hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Video Thumbnail */}
              <div className="relative flex-shrink-0">
                <div className="w-64 h-40 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-xl border border-red-500/30 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
                      <Play className="h-6 w-6 text-white ml-0.5" fill="currentColor" />
                    </div>
                    <p className="text-white font-medium">Watch Interview</p>
                  </div>
                  {/* Forbes Logo Overlay */}
                  <div className="absolute top-3 left-3 bg-white/90 rounded px-2 py-1">
                    <span className="text-black font-bold text-sm">FORBES</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                  <img 
                    src={forbesLogo} 
                    alt="Forbes" 
                    className="h-8 w-auto object-contain"
                  />
                  <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors duration-300">
                  Featured in Forbes Interview
                </h3>
                
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Our CEO discusses the future of web development, AI integration, and how we're helping 500+ companies transform their digital presence through innovative technology solutions.
                </p>
                
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="px-3 py-1 rounded-full text-sm bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    Web Development
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm bg-pink-500/20 text-pink-300 border border-pink-500/30">
                    AI Integration
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm bg-red-500/20 text-red-300 border border-red-500/30">
                    Digital Transformation
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Press Logo Strip */}
          <div className="mt-16 bg-gray-900/40 backdrop-blur-sm rounded-2xl border border-gray-700/20 p-8">
            <p className="text-center text-gray-400 text-sm mb-6 uppercase tracking-wider">
              Also Featured In
            </p>
            <div className="flex justify-center items-center gap-12 md:gap-16">
              {[
                { name: 'Entrepreneur', logo: entrepreneurLogo },
                { name: 'Times of India', logo: timesOfIndiaLogo },
                { name: 'Business Insider', logo: businessInsiderLogo }
              ].map((publication) => (
                <div key={publication.name} className="grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
                  <img 
                    src={publication.logo} 
                    alt={publication.name} 
                    className="h-8 md:h-10 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Conversion Bridge */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl border border-cyan-500/20 p-8 md:p-12">
              <p className="text-xl md:text-2xl font-semibold text-white mb-2">
                Join the 500+ businesses trusting the team
              </p>
              <p className="text-cyan-400 text-lg mb-8">
                featured in Forbes, Times of India & Entrepreneur
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={handleConsultation}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  Get Free Consultation
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button 
                  onClick={handleConsultation}
                  className="px-8 py-4 border border-cyan-400/30 rounded-xl font-semibold hover:bg-cyan-500/10 transition-all duration-300 text-white"
                >
                  Schedule a Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaCoverage;