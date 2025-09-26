import { CheckCircle, X, ArrowRight } from 'lucide-react';

const ProblemSolution = () => {
  const problems = [
    "Outdated systems slowing growth?",
    "Manual processes wasting time & money?",
    "No mobile app while competitors thrive?",
    "Missing AI automation opportunities?",
    "Poor user experience losing customers?",
    "Legacy software holding you back?",
    "No data insights for smart decisions?",
    "Scaling challenges with current tech?"
  ];

  const solutions = [
    "Modern web & mobile applications",
    "AI-powered automation systems",
    "Native iOS & Android apps",
    "Smart chatbots & AI calling systems",
    "Intuitive UI/UX designs",
    "Custom SaaS & enterprise solutions",
    "Data analytics & business intelligence",
    "Blockchain & AR/VR innovations"
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-green-500/5"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Is Your Business <span className="text-red-400">Struggling</span> With These Challenges?
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            We solve the most common technology problems that prevent businesses from growing and scaling efficiently
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Problems Side */}
          <div className="space-y-6">
            <div className="text-center lg:text-left mb-8">
              <h3 className="text-2xl font-bold text-red-400 mb-4">❌ Business Challenges</h3>
              <p className="text-gray-400">Technology issues that cost you customers and revenue</p>
            </div>
            {problems.map((problem, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                <X className="h-6 w-6 text-red-400 flex-shrink-0" />
                <span className="text-gray-300 text-lg">{problem}</span>
              </div>
            ))}
          </div>

          {/* Solutions Side */}
          <div className="space-y-6">
            <div className="text-center lg:text-left mb-8">
              <h3 className="text-2xl font-bold text-green-400 mb-4">✅ Complete Solutions</h3>
              <p className="text-gray-400">How we transform your entire tech infrastructure</p>
            </div>
            {solutions.map((solution, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                <span className="text-gray-300 text-lg">{solution}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <h3 className="text-3xl font-bold text-white mb-4">
            We Create <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Complete Tech Solutions</span> That Drive Results
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
            From Web Apps to AI Automation, Mobile Apps to Blockchain - We build comprehensive digital solutions that transform your business and accelerate growth
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#contact-form"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105"
            >
              <span>Get Free Consultation</span>
              <ArrowRight className="h-5 w-5" />
            </a>
            <a 
              href="#services"
              className="inline-flex items-center space-x-2 px-8 py-4 border border-cyan-400/30 rounded-xl font-semibold hover:bg-cyan-500/10 transition-all duration-300"
            >
              <span>Explore All Services</span>
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;