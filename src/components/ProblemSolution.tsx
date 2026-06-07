import { ArrowRight, X, Sparkles } from 'lucide-react';

const ProblemSolution = () => {
  const problems = [
    "A lead fills out a form at 9pm — and sits untouched until someone notices it the next afternoon.",
    "Your best people spend their mornings copy-pasting between five apps that don't talk to each other.",
    "Customers ask the same five questions, and someone answers them by hand. Again.",
    "The \"quick\" weekly report eats half a day, every single week.",
    "And the stuff that would actually grow the business? It waits.",
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
            You didn't start your business to <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">babysit spreadsheets</span>.
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            But here's where the week actually goes:
          </p>
        </div>

        {/* Problem list */}
        <div className="max-w-4xl mx-auto space-y-6">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <X className="h-6 w-6 text-red-400/70 flex-shrink-0 mt-1" />
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed">{problem}</p>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto text-center mt-12">
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            It's not a people problem. Your team is good. It's a <span className="text-white font-semibold">systems problem</span> — and every hour lost to manual busywork is money walking out the door.
          </p>
          <p className="text-xl text-cyan-400 mt-4 font-medium">Sound familiar?</p>
        </div>

        {/* THE SHIFT */}
        <div className="max-w-4xl mx-auto mt-20">
          <div className="rounded-2xl bg-gray-900/60 backdrop-blur-sm border border-cyan-400/30 p-8 md:p-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-14 h-14 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-400/30 flex items-center justify-center">
                <Sparkles className="h-7 w-7" />
              </div>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">
              Imagine the work just… happening.
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed text-center mb-4">
              Leads answered the moment they arrive. Data flowing between your tools without anyone touching it. Reports built before you've had your coffee. Your team focused on customers and growth instead of grunt work.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed text-center mb-4">
              That's not a someday fantasy. It's a few well-built automations away — and that's all we do.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed text-center">
              Boostmysites designs, builds, and maintains the systems that run your repetitive work for you. No fragile scripts. No "set it and forget it… until it breaks." Just dependable automation built around exactly how your business operates.
            </p>
          </div>
        </div>

        {/* Strong CTA */}
        <div className="text-center mt-16 pt-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact-form"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105"
            >
              <span>Get My Free Automation Audit</span>
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center space-x-2 px-8 py-4 border border-cyan-400/30 text-white rounded-xl font-semibold hover:bg-cyan-500/10 transition-all duration-300"
            >
              <span>See How It Works</span>
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
