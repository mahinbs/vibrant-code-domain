
import { memo } from 'react';

interface AboutHeaderProps {
  isVisible: boolean;
}

const AboutHeader = memo(({ isVisible }: AboutHeaderProps) => {
  return (
    <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
        About <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Boostmysites</span>
      </h2>
      <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
        Founded in <span className="text-cyan-400 font-semibold">2017</span>, Boostmysites is a global software and AI solutions company on a mission to help businesses scale with powerful digital products.
      </p>
    </div>
  );
});

AboutHeader.displayName = 'AboutHeader';

export default AboutHeader;
