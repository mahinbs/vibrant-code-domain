
import { memo } from 'react';
import { Globe, Award } from 'lucide-react';
import { recognitions } from './aboutData';

interface GlobalPresenceProps {
  isVisible: boolean;
}

const GlobalPresence = memo(({ isVisible }: GlobalPresenceProps) => {
  return (
    <div className={`grid md:grid-cols-2 gap-8 mb-16 transition-all duration-700 delay-800 ${isVisible ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      {/* Global Presence */}
      <div className="bg-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-700/30 p-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-400/30 flex items-center justify-center">
            <Globe className="h-6 w-6" />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-white">Global Reach</h4>
            <p className="text-purple-400">Worldwide Operations</p>
          </div>
        </div>
        <p className="text-gray-300 leading-relaxed">
          Today, Boostmysites operates across <span className="text-purple-400 font-semibold">56+ cities worldwide</span>, empowering clients with not just code, but complete business ecosystems — from product design and development to deployment, branding, and growth marketing.
        </p>
      </div>

      {/* Recognition */}
      <div className="bg-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-700/30 p-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-400/30 flex items-center justify-center">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-white">Recognition</h4>
            <p className="text-pink-400">Industry Leaders</p>
          </div>
        </div>
        <p className="text-gray-300 leading-relaxed mb-4">
          We are proud to have been featured in:
        </p>
        <div className="flex flex-wrap gap-2">
          {recognitions.map((publication, idx) => (
            <span key={idx} className="px-3 py-1 rounded-full text-sm bg-pink-500/20 text-pink-300 border border-pink-500/30 font-medium">
              {publication}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});

GlobalPresence.displayName = 'GlobalPresence';

export default GlobalPresence;
