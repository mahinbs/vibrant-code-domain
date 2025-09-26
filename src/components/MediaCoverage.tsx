import React from 'react';
import { ExternalLink, Play } from 'lucide-react';
import forbesLogo from '../assets/logos/forbes.png';
import entrepreneurLogo from '../assets/logos/entrepreneur.webp';
import timesOfIndiaLogo from '../assets/logos/times-of-india.png';
import businessInsiderLogo from '../assets/logos/business-insider.jpg';

const MediaCoverage = () => {
  const handleForbesClick = () => {
    window.open('https://youtu.be/z8QmKfoBCWY?si=ilhlrWWADdzTuOFe', '_blank');
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              Media Coverage
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our expertise and success stories have been featured in top-tier publications
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

          {/* Additional Media Mentions */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { name: 'Entrepreneur', logo: entrepreneurLogo, color: 'from-green-400 to-blue-500' },
              { name: 'Times of India', logo: timesOfIndiaLogo, color: 'from-orange-400 to-red-500' },
              { name: 'Business Insider', logo: businessInsiderLogo, color: 'from-blue-400 to-purple-500' }
            ].map((publication) => (
              <div key={publication.name} className="bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-700/30 p-6 text-center hover:border-gray-600/50 transition-all duration-300">
                <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-4 p-2">
                  <img 
                    src={publication.logo} 
                    alt={publication.name} 
                    className="w-full h-full object-contain filter brightness-90"
                  />
                </div>
                <h4 className="font-semibold text-white mb-2">{publication.name}</h4>
                <p className="text-gray-400 text-sm">Featured Coverage</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaCoverage;