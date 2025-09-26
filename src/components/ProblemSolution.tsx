import { CheckCircle, ArrowRight, X } from 'lucide-react';

const ProblemSolution = () => {
  const challengeSolutions = [
    {
      challenge: "Outdated systems slowing growth?",
      solution: "We modernize your tech with scalable web & mobile applications."
    },
    {
      challenge: "Manual processes wasting time & money?",
      solution: "We automate workflows using AI-powered solutions that save hours every week."
    },
    {
      challenge: "Competitors thriving with mobile apps while you're left behind?",
      solution: "We build native iOS & Android apps to help you stay ahead in the market."
    },
    {
      challenge: "Missing out on AI opportunities?",
      solution: "We integrate AI chatbots, automation, and smart calling systems tailored to your business."
    },
    {
      challenge: "Poor user experience losing customers?",
      solution: "We craft intuitive UI/UX designs that keep users engaged and converting."
    },
    {
      challenge: "Legacy software holding you back?",
      solution: "We create custom SaaS & enterprise platforms that future-proof your operations."
    },
    {
      challenge: "No insights to make smart decisions?",
      solution: "We deliver advanced data analytics and BI dashboards to unlock clarity from your data."
    },
    {
      challenge: "Scaling challenges with current tech?",
      solution: "We architect flexible, scalable systems with Blockchain, AR/VR & IoT innovations."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Subtle geometric background matching Hero */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5"></div>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Struggling With Technology That <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Holds Your Business Back</span>?
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            We've helped 500+ businesses overcome these exact challenges with smart, AI-powered solutions.
          </p>
        </div>

        {/* Clean stacked format */}
        <div className="max-w-4xl mx-auto space-y-8">
          {challengeSolutions.map((item, index) => (
            <div 
              key={index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Challenge */}
              <div className="flex items-start space-x-3 mb-3">
                <X className="h-5 w-5 text-red-400/60 flex-shrink-0 mt-1" />
                <p className="text-gray-400 text-lg font-medium">{item.challenge}</p>
              </div>
              
              {/* Solution */}
              <div className="flex items-start space-x-3 ml-8">
                <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                <p className="text-white text-xl font-semibold leading-relaxed">
                  {item.solution}
                </p>
              </div>
              
              {/* Subtle divider */}
              {index < challengeSolutions.length - 1 && (
                <div className="mt-8 w-full h-px bg-gradient-to-r from-transparent via-gray-700/30 to-transparent"></div>
              )}
            </div>
          ))}
        </div>

        {/* Strong CTA */}
        <div className="text-center mt-16 pt-8">
          <p className="text-xl text-cyan-400 mb-6 font-medium">
            If you're facing any of these challenges, let's solve them together.
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
              href="#contact-form"
              className="inline-flex items-center space-x-2 px-8 py-4 border border-cyan-400/30 text-white rounded-xl font-semibold hover:bg-cyan-500/10 transition-all duration-300"
            >
              <span>Schedule a Call</span>
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;