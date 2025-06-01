
import { Code, Smartphone, Cloud, Brain, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      id: 'web-apps',
      icon: Code,
      title: 'Web Applications',
      description: 'Custom web applications built with cutting-edge technologies and responsive design.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['React & Next.js', 'Real-time Features', 'Cloud Integration'],
      color: 'cyan',
      route: '/web-apps'
    },
    {
      id: 'saas',
      icon: Cloud,
      title: 'SAAS Solutions',
      description: 'Scalable software-as-a-service platforms with subscription management and analytics.',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['Multi-tenant Architecture', 'Payment Integration', 'Analytics Dashboard'],
      color: 'blue',
      route: '/saas'
    },
    {
      id: 'mobile-apps',
      icon: Smartphone,
      title: 'Mobile Applications',
      description: 'Native and cross-platform mobile apps with intuitive user experiences.',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['iOS & Android', 'Cross-platform', 'App Store Optimization'],
      color: 'purple',
      route: '/mobile-apps'
    },
    {
      id: 'ai-calling',
      icon: Brain,
      title: 'AI Calling Agency',
      description: 'Intelligent call automation systems with natural language processing capabilities.',
      image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['Voice AI', 'Call Analytics', 'Lead Generation'],
      color: 'pink',
      route: '/ai-calling'
    },
    {
      id: 'ai-automation',
      icon: Zap,
      title: 'AI Automation',
      description: 'Custom AI solutions to automate workflows and enhance business processes.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['Process Automation', 'Machine Learning', 'Data Analytics'],
      color: 'green',
      route: '/ai-automation'
    },
  ];

  const colorClasses = {
    cyan: 'border-cyan-400/30 hover:border-cyan-400/60',
    blue: 'border-blue-400/30 hover:border-blue-400/60',
    purple: 'border-purple-400/30 hover:border-purple-400/60',
    pink: 'border-pink-400/30 hover:border-pink-400/60',
    green: 'border-green-400/30 hover:border-green-400/60',
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.1),transparent_50%)]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Neural <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transform your business with our cutting-edge AI and development solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group relative rounded-2xl bg-gray-900/50 backdrop-blur-sm border ${colorClasses[service.color]} hover:bg-gray-800/70 transition-all duration-500 overflow-hidden`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="relative p-8 h-full flex flex-col">
                <div className="flex items-center mb-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r from-${service.color}-400/20 to-${service.color}-600/20 border border-${service.color}-400/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className={`h-7 w-7 text-${service.color}-400`} />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-gray-400 mb-6 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {service.description}
                </p>

                {/* Features */}
                <div className="mb-6 flex-grow">
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-500 flex items-center">
                        <div className={`w-1.5 h-1.5 rounded-full bg-${service.color}-400 mr-3`}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <Link 
                  to={service.route}
                  className={`inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-${service.color}-500/20 to-${service.color}-600/20 border border-${service.color}-400/30 text-${service.color}-400 font-medium hover:from-${service.color}-500/30 hover:to-${service.color}-600/30 hover:border-${service.color}-400/50 transition-all duration-300 group-hover:scale-105`}
                >
                  Learn More
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Glow effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-${service.color}-500/0 via-${service.color}-500/5 to-${service.color}-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
