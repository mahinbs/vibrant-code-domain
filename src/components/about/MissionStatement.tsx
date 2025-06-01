
import { memo } from 'react';
import { ArrowRight } from 'lucide-react';

interface MissionStatementProps {
  isVisible: boolean;
}

const MissionStatement = memo(({ isVisible }: MissionStatementProps) => {
  return (
    <div className={`text-center transition-all duration-700 delay-1000 ${isVisible ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-3xl p-8 border border-gray-700/30">
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Our Mission: <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Build Smarter, Scale Faster</span>
        </h3>
        <p className="text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed">
          We continue to innovate with one goal: empowering businesses to build smarter solutions and scale faster than ever before.
        </p>
        <button className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 font-medium shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105">
          <span>Start Your Project</span>
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
});

MissionStatement.displayName = 'MissionStatement';

export default MissionStatement;
