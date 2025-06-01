
import { Code, Smartphone, Cloud, Brain, Shield, Zap } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Code,
      title: 'Neural Web Development',
      description: 'AI-enhanced web applications with quantum-ready architecture and neural network integration.',
      color: 'cyan',
    },
    {
      icon: Smartphone,
      title: 'Smart Mobile Apps',
      description: 'Intelligent mobile applications with machine learning capabilities and predictive interfaces.',
      color: 'blue',
    },
    {
      icon: Cloud,
      title: 'Quantum Cloud Solutions',
      description: 'Next-generation cloud infrastructure with quantum computing integration and AI optimization.',
      color: 'purple',
    },
    {
      icon: Brain,
      title: 'Advanced AI Systems',
      description: 'Custom neural networks, deep learning models, and autonomous intelligence systems.',
      color: 'pink',
    },
    {
      icon: Shield,
      title: 'Quantum Security',
      description: 'Military-grade cybersecurity with quantum encryption and AI-powered threat detection.',
      color: 'green',
    },
    {
      icon: Zap,
      title: 'Neural DevOps',
      description: 'AI-automated deployment pipelines with predictive scaling and intelligent monitoring.',
      color: 'orange',
    },
  ];

  const colorClasses = {
    cyan: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30',
    blue: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
    purple: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
    pink: 'text-pink-400 bg-pink-400/10 border-pink-400/30',
    green: 'text-green-400 bg-green-400/10 border-green-400/30',
    orange: 'text-orange-400 bg-orange-400/10 border-orange-400/30',
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Neural <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Harness the power of artificial intelligence and quantum computing to transform your digital ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-cyan-400/50 hover:bg-gray-800/70 transition-all duration-500 cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className={`relative w-14 h-14 rounded-lg ${colorClasses[service.color]} border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="h-7 w-7" />
              </div>
              <h3 className="relative text-xl font-semibold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">{service.title}</h3>
              <p className="relative text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">{service.description}</p>
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
