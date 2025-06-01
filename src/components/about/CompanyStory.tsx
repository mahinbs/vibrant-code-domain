
import { memo } from 'react';

interface CompanyStoryProps {
  isVisible: boolean;
}

const CompanyStory = memo(({ isVisible }: CompanyStoryProps) => {
  return (
    <div className={`mb-16 transition-all duration-700 delay-400 ${isVisible ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="bg-gray-900/90 rounded-3xl border border-gray-700/30 p-8" style={{ contain: 'layout style paint' }}>
        <p className="text-lg text-gray-300 leading-relaxed mb-6">
          Over the years, we've delivered <span className="text-cyan-400 font-semibold">1,500+ successful projects</span> across web applications, mobile apps, SaaS platforms, AI tools, and enterprise software systems.
        </p>
        <p className="text-lg text-gray-300 leading-relaxed">
          With a strong team of <span className="text-blue-400 font-semibold">230+ developers, designers, and strategists</span>, Boostmysites has become the go-to technology partner for startups, SMEs, and global enterprises alike. We specialize in building future-ready products using the latest in AI, automation, and full-stack development.
        </p>
      </div>
    </div>
  );
});

CompanyStory.displayName = 'CompanyStory';

export default CompanyStory;
