
import { ArrowLeft, Calendar, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Project } from '@/data/projects';
import OptimizedImage from '@/components/ui/OptimizedImage';

interface CaseStudyHeroProps {
  project: Project;
}

const CaseStudyHero = ({ project }: CaseStudyHeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src={project.image}
          alt={project.title}
          className="w-full h-full"
          priority={true}
        />
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-32">
        {/* Back Navigation */}
        <Link 
          to="/portfolio"
          className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Portfolio</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Project Info */}
          <div className="animate-fade-in">
            <div className="flex items-center space-x-3 mb-4">
              <OptimizedImage
                src={project.clientLogo}
                alt={project.client}
                className="w-12 h-12 rounded-full border-2 border-cyan-400"
              />
              <div>
                <h3 className="text-cyan-400 font-semibold">{project.client}</h3>
                <p className="text-gray-400 text-sm">{project.industry}</p>
              </div>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {project.title}
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {project.description}
            </p>

            {/* Project Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <Calendar className="h-6 w-6 text-cyan-400 mx-auto mb-2" />
                <p className="text-white font-semibold">{project.timeline}</p>
                <p className="text-gray-400 text-sm">Timeline</p>
              </div>
              <div className="text-center">
                <Users className="h-6 w-6 text-cyan-400 mx-auto mb-2" />
                <p className="text-white font-semibold">{project.team}</p>
                <p className="text-gray-400 text-sm">Team Size</p>
              </div>
              <div className="text-center">
                <Award className="h-6 w-6 text-cyan-400 mx-auto mb-2" />
                <p className="text-white font-semibold">{project.industry}</p>
                <p className="text-gray-400 text-sm">Industry</p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex flex-wrap gap-3">
              {Object.entries(project.metrics).slice(0, 3).map(([key, value]) => (
                <div key={key} className="bg-cyan-500/10 border border-cyan-400/30 rounded-lg px-4 py-2">
                  <div className="text-cyan-400 font-bold text-lg">{value}</div>
                  <div className="text-gray-300 text-sm capitalize">{key}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Project Image */}
          <div className="relative animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <OptimizedImage
                src={project.gallery[0] || project.image}
                alt={project.title}
                className="w-full h-96"
                priority={true}
              />
              <div className="absolute inset-0 ring-1 ring-cyan-400/20 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyHero;
