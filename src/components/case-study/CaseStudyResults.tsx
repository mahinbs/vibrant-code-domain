
import { TrendingUp, Users, Clock, Award } from 'lucide-react';
import { Project } from '@/data/projects';

interface CaseStudyResultsProps {
  project: Project;
}

const CaseStudyResults = ({ project }: CaseStudyResultsProps) => {
  const iconMap = {
    0: TrendingUp,
    1: Users,
    2: Clock,
    3: Award
  };

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Results & <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Impact</span>
          </h2>

          {/* Detailed Metrics */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {project.detailedMetrics.map((metric, index) => {
              const Icon = iconMap[index as keyof typeof iconMap] || TrendingUp;
              return (
                <div key={index} className="text-center">
                  <div className="bg-cyan-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-400/30">
                    <Icon className="h-8 w-8 text-cyan-400" />
                  </div>
                  <div className="text-3xl font-bold text-cyan-400 mb-2">{metric.value}</div>
                  <div className="text-white font-semibold mb-2">{metric.label}</div>
                  <div className="text-gray-400 text-sm leading-relaxed">{metric.description}</div>
                </div>
              );
            })}
          </div>

          {/* Features */}
          <div className="bg-gray-900/50 rounded-2xl p-8 mb-16 border border-gray-700/30">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">Key Features Delivered</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 bg-gray-800/30 rounded-lg p-4">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Extended Testimonial */}
          <div className="bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-2xl p-8 border border-cyan-400/20">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-6">
                <div className="flex justify-center space-x-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className="w-6 h-6 text-cyan-400 fill-current">★</div>
                  ))}
                </div>
                <blockquote className="text-xl text-gray-300 italic leading-relaxed">
                  "{project.extendedTestimonial.quote}"
                </blockquote>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <img 
                  src={project.clientLogo}
                  alt={project.extendedTestimonial.company}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-left">
                  <div className="text-white font-semibold">{project.extendedTestimonial.author}</div>
                  <div className="text-cyan-400 text-sm">{project.extendedTestimonial.position}</div>
                  <div className="text-gray-400 text-sm">{project.extendedTestimonial.company}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyResults;
