
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Code, Smartphone, Cloud, Brain, Zap, ChevronDown, ExternalLink, Star, Users, Clock, ArrowRight } from 'lucide-react';

const PortfolioSection = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('portfolio');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const services = [
    {
      id: 'web-apps',
      icon: Code,
      title: 'Web Applications',
      color: 'cyan' as const,
      projects: [
        {
          id: 'retailmax',
          title: 'RetailMax E-commerce Platform',
          client: 'RetailMax Inc.',
          description: 'Complete e-commerce solution with advanced inventory management and AI-powered recommendations.',
          technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis'],
          metrics: { revenue: '+250%', conversion: '+45%', users: '50K+', sales: '$2.5M' } as Record<string, string>,
          timeline: '12 weeks',
          team: '5 developers',
          industry: 'E-commerce',
          testimonial: 'The platform exceeded our expectations. Sales increased dramatically within the first month.',
          clientLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
          image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 'medcare',
          title: 'MedCare Healthcare Portal',
          client: 'MedCare Systems',
          description: 'Patient management system with telemedicine capabilities and secure data handling.',
          technologies: ['React', 'TypeScript', 'Firebase', 'WebRTC', 'Socket.io'],
          metrics: { efficiency: '+60%', satisfaction: '95%', appointments: '10K+', cost: '-40%' } as Record<string, string>,
          timeline: '16 weeks',
          team: '6 developers',
          industry: 'Healthcare',
          testimonial: 'Revolutionary improvement in patient care delivery and administrative efficiency.',
          clientLogo: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop',
          image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        }
      ]
    },
    {
      id: 'saas',
      icon: Cloud,
      title: 'SAAS Solutions',
      color: 'blue' as const,
      projects: [
        {
          id: 'projectflow',
          title: 'ProjectFlow Management Platform',
          client: 'TechCorp Solutions',
          description: 'Enterprise project management with real-time collaboration and advanced analytics.',
          technologies: ['React', 'AWS', 'Redis', 'WebSocket', 'GraphQL'],
          metrics: { productivity: '+75%', teams: '200+', projects: '5K+', time: '-50%' } as Record<string, string>,
          timeline: '20 weeks',
          team: '8 developers',
          industry: 'Technology',
          testimonial: 'Transformed how our teams collaborate. Best investment we\'ve made in years.',
          clientLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop',
          image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        }
      ]
    },
    {
      id: 'ai-calling',
      icon: Brain,
      title: 'AI Calling Agency',
      color: 'pink' as const,
      projects: [
        {
          id: 'leadgen',
          title: 'LeadGen AI System',
          client: 'SalesForce Pro',
          description: 'Intelligent lead generation system with natural conversation AI and CRM integration.',
          technologies: ['OpenAI', 'Twilio', 'Python', 'CRM APIs', 'NLP'],
          metrics: { leads: '+300%', conversion: '+85%', cost: '-60%', calls: '10K+ daily' } as Record<string, string>,
          timeline: '10 weeks',
          team: '4 developers',
          industry: 'Sales & Marketing',
          testimonial: 'Game-changer for our sales team. The AI calls are indistinguishable from human agents.',
          clientLogo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
          image: 'https://images.unsplash.com/photo-1553775282-20af80779df7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        }
      ]
    }
  ];

  const colorClasses = {
    cyan: {
      border: 'border-cyan-400/30',
      gradient: 'from-cyan-400/10 to-cyan-600/10',
      icon: 'bg-cyan-500/10 text-cyan-400 border-cyan-400/30',
      text: 'text-cyan-400',
      button: 'bg-cyan-500/20 border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/30',
      tag: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
    },
    blue: {
      border: 'border-blue-400/30',
      gradient: 'from-blue-400/10 to-blue-600/10',
      icon: 'bg-blue-500/10 text-blue-400 border-blue-400/30',
      text: 'text-blue-400',
      button: 'bg-blue-500/20 border-blue-400/30 text-blue-400 hover:bg-blue-500/30',
      tag: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
    },
    pink: {
      border: 'border-pink-400/30',
      gradient: 'from-pink-400/10 to-pink-600/10',
      icon: 'bg-pink-500/10 text-pink-400 border-pink-400/30',
      text: 'text-pink-400',
      button: 'bg-pink-500/20 border-pink-400/30 text-pink-400 hover:bg-pink-500/30',
      tag: 'bg-pink-500/20 text-pink-300 border-pink-500/30'
    }
  };

  const handleProjectClick = (projectId: string) => {
    setSelectedProject(selectedProject === projectId ? null : projectId);
  };

  return (
    <section 
      id="portfolio"
      className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
      style={{
        backgroundImage: `url('/lovable-uploads/d0fa4f38-5951-4a69-9df8-13d4faa03aaa.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Enhanced Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-gray-900/75"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Latest <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover some of our most innovative solutions that have transformed businesses across industries.
          </p>
        </div>

        {/* Service Categories */}
        <div className={`mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setSelectedService(null)}
              className={`px-6 py-3 rounded-xl border transition-all duration-300 font-medium ${
                selectedService === null
                  ? 'bg-cyan-500/20 border-cyan-400/30 text-cyan-400'
                  : 'border-gray-600 text-gray-400 hover:border-gray-500 hover:text-gray-300'
              }`}
            >
              All Projects
            </button>
            {services.map((service, index) => {
              const colors = colorClasses[service.color];
              return (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={`px-6 py-3 rounded-xl border transition-all duration-300 font-medium flex items-center space-x-2 ${
                    selectedService === service.id
                      ? colors.button
                      : 'border-gray-600 text-gray-400 hover:border-gray-500 hover:text-gray-300'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <service.icon className="h-4 w-4" />
                  <span>{service.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="space-y-16">
          {services
            .filter(service => !selectedService || service.id === selectedService)
            .map((service, serviceIndex) => {
              const colors = colorClasses[service.color];
              
              return (
                <div key={service.id} className="space-y-8">
                  <div className={`flex items-center space-x-4 mb-8 transition-all duration-1000 ${isVisible ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: `${serviceIndex * 200 + 400}ms` }}>
                    <div className={`w-12 h-12 rounded-xl ${colors.icon} border flex items-center justify-center`}>
                      <service.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white">{service.title}</h3>
                      <p className="text-gray-400 mt-1">{service.projects.length} featured projects</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {service.projects.map((project, projectIndex) => (
                      <div
                        key={project.id}
                        className={`group relative rounded-2xl bg-gray-900/80 backdrop-blur-sm border ${colors.border} hover:bg-gray-800/90 transition-all duration-500 overflow-hidden cursor-pointer hover:transform hover:scale-105 hover:shadow-2xl ${isVisible ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                        onClick={() => handleProjectClick(project.id)}
                        style={{ animationDelay: `${serviceIndex * 200 + projectIndex * 150 + 600}ms` }}
                      >
                        {/* Project Image */}
                        <div className="relative h-48 overflow-hidden rounded-t-2xl">
                          <img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-t ${colors.gradient} opacity-60`}></div>
                          <div className={`absolute top-4 left-4 w-10 h-10 rounded-lg ${colors.icon} border flex items-center justify-center`}>
                            <service.icon className="h-5 w-5" />
                          </div>
                          <div className="absolute top-4 right-4">
                            <span className={`px-2 py-1 rounded text-xs ${colors.tag} border`}>
                              {project.industry}
                            </span>
                          </div>
                        </div>

                        {/* Project Content */}
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h4 className={`text-xl font-bold text-white mb-2 group-hover:${colors.text} transition-colors duration-300`}>
                                {project.title}
                              </h4>
                              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-sm leading-relaxed">
                                {project.description}
                              </p>
                            </div>
                            <ChevronDown 
                              className={`h-5 w-5 ${colors.text} transform transition-transform duration-300 ${
                                selectedProject === project.id ? 'rotate-180' : ''
                              }`}
                            />
                          </div>

                          {/* Quick Metrics */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
                              <span key={key} className={`px-3 py-1 rounded-full text-xs ${colors.tag} border`}>
                                {key}: {String(value)}
                              </span>
                            ))}
                          </div>

                          {/* Expanded Content */}
                          <div className={`overflow-hidden transition-all duration-500 ${
                            selectedProject === project.id ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                          }`}>
                            <div className="pt-4 border-t border-gray-700/50 space-y-4">
                              {/* Client Info */}
                              <div className="flex items-center space-x-3">
                                <img 
                                  src={project.clientLogo} 
                                  alt={project.client}
                                  className="w-10 h-10 rounded-full object-cover border-2 border-gray-700"
                                />
                                <div>
                                  <p className="text-white font-medium text-sm">{project.client}</p>
                                  <div className="flex items-center space-x-3 text-xs text-gray-400">
                                    <span className="flex items-center space-x-1">
                                      <Clock className="h-3 w-3" />
                                      <span>{project.timeline}</span>
                                    </span>
                                    <span className="flex items-center space-x-1">
                                      <Users className="h-3 w-3" />
                                      <span>{project.team}</span>
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Technologies */}
                              <div>
                                <h5 className="text-xs font-semibold text-white mb-2">Technologies</h5>
                                <div className="flex flex-wrap gap-1">
                                  {project.technologies.slice(0, 3).map((tech, idx) => (
                                    <span key={idx} className={`px-2 py-1 rounded text-xs ${colors.tag} border font-medium`}>
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Testimonial */}
                              <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
                                <div className="flex items-center space-x-1 mb-2">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} className={`h-3 w-3 ${colors.text} fill-current`} />
                                  ))}
                                </div>
                                <p className="text-gray-300 text-xs italic">
                                  "{project.testimonial}"
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>

        {/* CTA Section */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-700 ${isVisible ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-3xl p-8 border border-gray-700/30">
            <h3 className="text-3xl font-bold text-white mb-4">
              Explore More <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Projects</span>
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
              See our complete portfolio with detailed case studies and discover how we can bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/portfolio"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 font-medium shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105"
              >
                <span>View Full Portfolio</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link 
                to="/#contact"
                className="inline-flex items-center space-x-2 bg-gray-800/50 border border-gray-600 text-gray-300 px-6 py-3 rounded-xl hover:bg-gray-700/50 hover:border-gray-500 transition-all duration-300 font-medium"
              >
                <span>Start Your Project</span>
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
