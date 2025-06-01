
import { Code, Smartphone, Cloud, Brain, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

const Services = () => {
  const services = [
    {
      id: 'web-apps',
      icon: Code,
      title: 'Web Applications',
      description: 'Custom web applications built with cutting-edge technologies and responsive design.',
      detailedDescription: 'Full-stack web applications built with React, Node.js, and modern frameworks. We create scalable, secure, and high-performance solutions tailored to your business needs.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['React & Next.js', 'Real-time Features', 'Cloud Integration', 'Progressive Web Apps'],
      technologies: ['TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
      startingPrice: '$5,000',
      timeline: '4-12 weeks',
      color: 'cyan',
      route: '/web-apps'
    },
    {
      id: 'saas',
      icon: Cloud,
      title: 'SAAS Solutions',
      description: 'Scalable software-as-a-service platforms with subscription management and analytics.',
      detailedDescription: 'Complete SAAS platforms with multi-tenancy, payment processing, analytics dashboards, and user management. Built for scale and optimized for recurring revenue.',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['Multi-tenant Architecture', 'Payment Integration', 'Analytics Dashboard', 'API Management'],
      technologies: ['React', 'Stripe', 'AWS', 'Redis'],
      startingPrice: '$15,000',
      timeline: '8-16 weeks',
      color: 'blue',
      route: '/saas'
    },
    {
      id: 'mobile-apps',
      icon: Smartphone,
      title: 'Mobile Applications',
      description: 'Native and cross-platform mobile apps with intuitive user experiences.',
      detailedDescription: 'iOS and Android applications built with React Native or native technologies. Focus on performance, user experience, and app store optimization.',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['iOS & Android', 'Cross-platform', 'App Store Optimization', 'Push Notifications'],
      technologies: ['React Native', 'Swift', 'Kotlin', 'Firebase'],
      startingPrice: '$10,000',
      timeline: '6-14 weeks',
      color: 'purple',
      route: '/mobile-apps'
    },
    {
      id: 'ai-calling',
      icon: Brain,
      title: 'AI Calling Agency',
      description: 'Intelligent call automation systems with natural language processing capabilities.',
      detailedDescription: 'Advanced AI-powered calling systems for lead generation, customer support, and sales automation. Featuring voice AI, sentiment analysis, and CRM integration.',
      image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['Voice AI', 'Call Analytics', 'Lead Generation', 'CRM Integration'],
      technologies: ['OpenAI', 'Twilio', 'Python', 'TensorFlow'],
      startingPrice: '$8,000',
      timeline: '6-10 weeks',
      color: 'pink',
      route: '/ai-calling'
    },
    {
      id: 'ai-automation',
      icon: Zap,
      title: 'AI Automation',
      description: 'Custom AI solutions to automate workflows and enhance business processes.',
      detailedDescription: 'Intelligent automation solutions using machine learning and AI to streamline operations, reduce costs, and improve efficiency across your organization.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['Process Automation', 'Machine Learning', 'Data Analytics', 'Workflow Integration'],
      technologies: ['Python', 'TensorFlow', 'AWS Lambda', 'Zapier'],
      startingPrice: '$12,000',
      timeline: '8-12 weeks',
      color: 'green',
      route: '/ai-automation'
    },
  ];

  const colorClasses = {
    cyan: 'border-cyan-400/30 hover:border-cyan-400/60 from-cyan-400/20 to-cyan-600/20',
    blue: 'border-blue-400/30 hover:border-blue-400/60 from-blue-400/20 to-blue-600/20',
    purple: 'border-purple-400/30 hover:border-purple-400/60 from-purple-400/20 to-purple-600/20',
    pink: 'border-pink-400/30 hover:border-pink-400/60 from-pink-400/20 to-pink-600/20',
    green: 'border-green-400/30 hover:border-green-400/60 from-green-400/20 to-green-600/20',
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
            <HoverCard key={service.id}>
              <HoverCardTrigger asChild>
                <div
                  className={`group relative rounded-2xl bg-gray-900/80 backdrop-blur-sm border ${colorClasses[service.color]} hover:bg-gray-800/90 transition-all duration-500 overflow-hidden cursor-pointer h-[400px]`}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/60 to-gray-900/30"></div>
                  </div>

                  {/* Content */}
                  <div className="relative p-8 h-full flex flex-col">
                    <div className="flex items-center mb-6">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${colorClasses[service.color]} border border-${service.color}-400/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <service.icon className={`h-7 w-7 text-${service.color}-400`} />
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300">
                      {service.title}
                    </h3>

                    <p className="text-gray-400 mb-6 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 flex-grow">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="mb-6">
                      <ul className="space-y-2">
                        {service.features.slice(0, 3).map((feature, idx) => (
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
                </div>
              </HoverCardTrigger>
              
              <HoverCardContent className="w-80 bg-gray-800/95 border-gray-700 backdrop-blur-md">
                <div className="space-y-4">
                  <h4 className={`text-lg font-semibold text-${service.color}-400`}>{service.title}</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {service.detailedDescription}
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <h5 className="text-sm font-medium text-white mb-2">Technologies:</h5>
                      <div className="flex flex-wrap gap-1">
                        {service.technologies.map((tech, idx) => (
                          <span key={idx} className={`text-xs px-2 py-1 rounded bg-${service.color}-500/20 text-${service.color}-300`}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <div>
                        <span className="text-gray-400">Starting from:</span>
                        <span className={`ml-2 font-semibold text-${service.color}-400`}>{service.startingPrice}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Timeline:</span>
                        <span className="ml-2 font-semibold text-white">{service.timeline}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Link 
                    to={service.route}
                    className={`w-full inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-${service.color}-500 to-${service.color}-600 text-white font-medium hover:from-${service.color}-400 hover:to-${service.color}-500 transition-all duration-300`}
                  >
                    View Details
                  </Link>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
