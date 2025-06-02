
import { Project } from '@/data/projects';

interface CaseStudyOverviewProps {
  project: Project;
}

const CaseStudyOverview = ({ project }: CaseStudyOverviewProps) => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Project <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Overview</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Challenge */}
            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700/50">
              <h3 className="text-2xl font-bold text-white mb-4">The Challenge</h3>
              <p className="text-gray-300 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            {/* Solution */}
            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700/50">
              <h3 className="text-2xl font-bold text-white mb-4">Our Solution</h3>
              <p className="text-gray-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Technologies */}
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">Technology Stack</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {project.techStack.map((stack, index) => (
                <div key={index} className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/30">
                  <h4 className="text-cyan-400 font-semibold mb-4">{stack.category}</h4>
                  <div className="space-y-2">
                    {stack.technologies.map((tech, techIndex) => (
                      <div key={techIndex} className="text-gray-300 text-sm">
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyOverview;
