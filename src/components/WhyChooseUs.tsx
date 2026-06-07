import { Wrench, Eye, ShieldCheck, Target } from 'lucide-react';

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: Wrench,
      title: "We build around your tools",
      description: "No ripping out your stack. We make what you already use work harder.",
      color: "cyan"
    },
    {
      icon: Eye,
      title: "No black boxes",
      description: "You'll understand exactly what we built and why. It's your system — we just make sure it never breaks.",
      color: "blue"
    },
    {
      icon: ShieldCheck,
      title: "We maintain everything",
      description: "Automations aren't \"ship and vanish.\" We monitor, fix, and improve as you grow.",
      color: "purple"
    },
    {
      icon: Target,
      title: "Outcomes, not jargon",
      description: "We don't sell you tech. We sell you hours, accuracy, and revenue.",
      color: "green"
    }
  ];

  const colorClasses = {
    cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-400/30",
    green: "bg-green-500/10 text-green-400 border-green-400/30",
    blue: "bg-blue-500/10 text-blue-400 border-blue-400/30",
    purple: "bg-purple-500/10 text-purple-400 border-purple-400/30",
    pink: "bg-pink-500/10 text-pink-400 border-pink-400/30",
    orange: "bg-orange-500/10 text-orange-400 border-orange-400/30"
  };

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Built right. <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Built to last.</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're not just another automation agency. Here's what makes us different
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {reasons.map((reason, index) => (
            <div 
              key={index}
              className="group p-8 bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl hover:border-cyan-400/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className={`w-16 h-16 rounded-xl ${colorClasses[reason.color]} border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <reason.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">
                {reason.title}
              </h3>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">40,000+</div>
            <div className="text-gray-400">Hours Automated</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">120+</div>
            <div className="text-gray-400">Workflows Shipped</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">98%</div>
            <div className="text-gray-400">Client Retention</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">24/7</div>
            <div className="text-gray-400">Always-On Automation</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;