
import { memo } from 'react';
import { statistics, colorClasses } from './aboutData';

interface StatisticsGridProps {
  isVisible: boolean;
}

const StatisticsGrid = memo(({ isVisible }: StatisticsGridProps) => {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 transition-all duration-700 delay-200 ${isVisible ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      {statistics.map((stat, index) => {
        const colors = colorClasses[stat.color];
        return (
          <div
            key={stat.label}
            className={`group relative rounded-2xl bg-gray-900/80 backdrop-blur-sm border ${colors.border} hover:bg-gray-800/90 transition-all duration-300 p-6 text-center gpu-accelerate`}
            style={{ 
              animationDelay: `${index * 50 + 400}ms`,
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
            <div className={`w-12 h-12 rounded-xl ${colors.icon} border flex items-center justify-center mx-auto mb-4`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div className={`text-3xl font-bold ${colors.text} mb-2`}>
              {stat.value}
            </div>
            <div className="text-gray-400 text-sm font-medium">
              {stat.label}
            </div>
          </div>
        );
      })}
    </div>
  );
});

StatisticsGrid.displayName = 'StatisticsGrid';

export default StatisticsGrid;
