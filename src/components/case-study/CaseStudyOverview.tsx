
import { Project } from '@/data/projects';

interface CaseStudyOverviewProps {
  project: Project | any; // Using any to handle different data structures
}

const CaseStudyOverview = ({ project }: CaseStudyOverviewProps) => {
  // Check if fields exist before rendering sections
  const hasTechnologies = project.technologies && project.technologies.length > 0;
  const hasTeam = project.team && project.team.trim() !== '';
  const hasTimeline = project.timeline && project.timeline.trim() !== '';
  
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Project <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Overview</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Challenge */}
            {project.challenge && (
              <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700/50">
                <h3 className="text-2xl font-bold text-white mb-4">The Challenge</h3>
                <p className="text-gray-300 leading-relaxed">
                  {project.challenge}
                </p>
              </div>
            )}

            {/* Solution */}
            {project.solution && (
              <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700/50">
                <h3 className="text-2xl font-bold text-white mb-4">Our Solution</h3>
                <p className="text-gray-300 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            )}
          </div>

          {/* Project Details - Team Size and Timeline */}
          {(hasTeam || hasTimeline) && (
            <div className="mt-12 grid lg:grid-cols-2 gap-12">
              {/* Timeline */}
              {hasTimeline && (
                <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700/50">
                  <h3 className="text-2xl font-bold text-white mb-4">Timeline</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {project.timeline}
                  </p>
                </div>
              )}

              {/* Team Size */}
              {hasTeam && (
                <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700/50">
                  <h3 className="text-2xl font-bold text-white mb-4">Team Size</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {project.team}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Technologies */}
          {hasTechnologies && (
            <div className="mt-16">
              <h3 className="text-3xl font-bold text-white mb-8 text-center">Technology Stack</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {project.technologies.map((tech: string, index: number) => (
                  <div key={index} className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/30 flex items-center justify-center">
                    <div className="text-gray-300 text-sm font-medium">{tech}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CaseStudyOverview;
