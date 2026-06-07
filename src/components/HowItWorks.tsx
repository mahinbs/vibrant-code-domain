import { Search, Wrench, Rocket, ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      icon: Search,
      title: "Free Automation Audit",
      description:
        "We map your workflows and find exactly where time and money are leaking. You walk away with a clear plan — whether you hire us or not.",
      color: "cyan",
    },
    {
      number: "2",
      icon: Wrench,
      title: "We Build It",
      description:
        "Our team designs and builds your automations around your existing tools. You stay in the loop; you don't have to lift a finger.",
      color: "blue",
    },
    {
      number: "3",
      icon: Rocket,
      title: "It Runs (And We Maintain It)",
      description:
        "Everything goes live, we monitor it, and we fix or improve it as your business grows. You just enjoy the time back.",
      color: "purple",
    },
  ];

  const colorClasses: Record<string, string> = {
    cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-400/30",
    blue: "bg-blue-500/10 text-blue-400 border-blue-400/30",
    purple: "bg-purple-500/10 text-purple-400 border-purple-400/30",
  };

  return (
    <section
      id="how-it-works"
      className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Three steps.{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Zero headaches.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group p-8 bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl hover:border-cyan-400/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="flex items-center justify-between mb-6">
                <div
                  className={`w-16 h-16 rounded-xl ${colorClasses[step.color]} border flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <step.icon className="h-8 w-8" />
                </div>
                <span className="text-5xl font-bold text-gray-700/60">
                  {step.number}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">
                {step.title}
              </h3>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#contact-form"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105"
          >
            <span>Start With a Free Audit</span>
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
