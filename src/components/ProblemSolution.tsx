import { CheckCircle, ArrowRight, AlertCircle } from 'lucide-react';

const ProblemSolution = () => {
  const challengeSolutions = [
    {
      challenge: "Outdated systems slowing growth?",
      solution: "We build modern web & mobile applications that scale with your business"
    },
    {
      challenge: "Manual processes wasting time?",
      solution: "Our AI-powered automation systems eliminate repetitive tasks"
    },
    {
      challenge: "No mobile app while competitors thrive?",
      solution: "We create native iOS & Android apps to capture mobile users"
    },
    {
      challenge: "Missing AI automation opportunities?",
      solution: "Smart chatbots & AI calling systems boost efficiency by 300%"
    },
    {
      challenge: "Poor user experience losing customers?",
      solution: "Our intuitive UI/UX designs increase conversions and retention"
    },
    {
      challenge: "Legacy software holding you back?",
      solution: "Custom SaaS & enterprise solutions modernize your operations"
    },
    {
      challenge: "No data insights for smart decisions?",
      solution: "Advanced analytics & business intelligence reveal growth opportunities"
    },
    {
      challenge: "Scaling challenges with current tech?",
      solution: "Future-proof solutions including blockchain & AR/VR innovations"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Geometric background pattern matching Hero */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5"></div>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Growing Businesses Face These <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Challenges</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            We understand your pain points and have the expertise to solve them completely
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-6">
          {challengeSolutions.map((item, index) => (
            <div 
              key={index} 
              className="group bg-gradient-to-r from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-xl p-6 hover:border-cyan-400/30 transition-all duration-300 hover:transform hover:scale-[1.02] animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Challenge (Minimized) */}
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-1 opacity-60" />
                  <p className="text-gray-400 text-base leading-relaxed">{item.challenge}</p>
                </div>
                
                {/* Solution Arrow */}
                <div className="hidden md:flex justify-center">
                  <ArrowRight className="h-6 w-6 text-cyan-400 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
                
                {/* Solution (Emphasized) */}
                <div className="md:col-start-2 flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-cyan-400 flex-shrink-0 mt-1" />
                  <p className="text-white font-medium text-lg leading-relaxed bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    {item.solution}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Momentum CTA */}
        <div className="text-center mt-16">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Business with 
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> Complete Tech Solutions</span>?
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            From discovery to deployment, we handle everything while you focus on growing your business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#contact-form"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 animate-glow"
            >
              <span>Solve These Challenges Now</span>
              <ArrowRight className="h-5 w-5" />
            </a>
            <a 
              href="#services"
              className="inline-flex items-center space-x-2 px-8 py-4 border border-cyan-400/30 text-white rounded-xl font-semibold hover:bg-cyan-500/10 transition-all duration-300"
            >
              <span>View All Solutions</span>
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;