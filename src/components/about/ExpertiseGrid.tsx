
import { memo } from 'react';
import { expertise, colorClasses } from './aboutData';

interface ExpertiseGridProps {
  isVisible: boolean;
}

const ExpertiseGrid = memo(({ isVisible }: ExpertiseGridProps) => {
  return (
    <div className={`mb-16 transition-all duration-700 delay-600 ${isVisible ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-white mb-4">
          Our <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Expertise</span>
        </h3>
        <p className="text-gray-400 max-w-3xl mx-auto">
          At Boostmysites, expertise isn't just about the tools we use—it's about how we think, solve problems, and build systems that drive real-world outcomes.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {expertise.map((item, index) => {
          const colors = colorClasses[item.color];
          return (
            <div
              key={item.title}
              className={`group relative rounded-2xl border ${colors.border} transition-all duration-300 overflow-hidden h-80 gpu-accelerate`}
              style={{ 
                animationDelay: `${index * 50 + 800}ms`,
                contain: 'layout style paint',
                willChange: 'auto'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.willChange = 'transform';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.willChange = 'auto';
              }}
            >
              {/* Optimized Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ 
                  backgroundImage: `url(${item.image})`,
                  contentVisibility: 'auto',
                  containIntrinsicSize: '1px 320px'
                }}
              />
              
              {/* Reduced Gradient Overlay complexity */}
              <div className={`absolute inset-0 bg-gradient-to-br ${colors.overlay} transition-opacity duration-300 group-hover:opacity-90`} />
              
              {/* Content */}
              <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                <div>
                  <div className={`w-12 h-12 rounded-xl ${colors.icon} border flex items-center justify-center mb-4 backdrop-blur-sm`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h4 className={`text-xl font-bold text-white mb-3 group-hover:${colors.text} transition-colors duration-300`}>
                    {item.title}
                  </h4>
                </div>
                <p className="text-gray-200 group-hover:text-white transition-colors duration-300 leading-relaxed text-sm backdrop-blur-sm bg-black/20 p-3 rounded-lg">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

ExpertiseGrid.displayName = 'ExpertiseGrid';

export default ExpertiseGrid;
