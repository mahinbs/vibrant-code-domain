import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Code, Smartphone, Cloud, Brain, Zap, ChevronDown, ExternalLink, Star, Users, Clock, ArrowRight } from 'lucide-react';
import { projectsData } from '@/data/projects';

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
      { threshold: 0.1, rootMargin: '50px' }
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

  const services = projectsData.map(service => ({
    ...service,
    icon: service.id === 'web-apps' ? Code :
          service.id === 'saas' ? Cloud :
          service.id === 'ai-calling' ? Brain : Code
  }));

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
    window.location.href = `/case-study/${projectId}`;
  };

  return (
    <section 
      id="portfolio"
      className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dknafpppp/image/upload/v1748805837/representation-user-experience-interface-design_1_halzwq.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll'
      }}
    >
      {/* Optimized Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-gray-900/80"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Latest <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover some of our most innovative solutions that have transformed businesses across industries.
          </p>
        </div>

        {/* Service Categories */}
        <div className={`mb-12 transition-all duration-700 delay-200 ${isVisible ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
                  <div className={`flex items-center space-x-4 mb-8 transition-all duration-700 ${isVisible ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: `${serviceIndex * 200 + 400}ms` }}>
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
                        className={`group relative rounded-2xl bg-gray-900/80 backdrop-blur-sm border ${colors.border} hover:bg-gray-800/90 transition-all duration-400 overflow-hidden cursor-pointer hover:transform hover:scale-102 hover:shadow-lg will-change-auto ${isVisible ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                        onClick={() => handleProjectClick(project.id)}
                        style={{ 
                          animationDelay: `${serviceIndex * 200 + projectIndex * 150 + 600}ms`,
                          contentVisibility: 'auto'
                        }}
                      >
                        {/* Project Image - Optimized */}
                        <div className="relative h-48 overflow-hidden rounded-t-2xl">
                          <img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
                            loading="lazy"
                            decoding="async"
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
                            <Link 
                              to={`/case-study/${project.id}`}
                              className={`px-3 py-1 rounded-lg text-xs ${colors.tag} border font-medium hover:scale-105 transition-transform duration-200`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              View Case Study
                            </Link>
                          </div>

                          {/* Quick Metrics */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
                              <span key={key} className={`px-3 py-1 rounded-full text-xs ${colors.tag} border`}>
                                {key}: {String(value)}
                              </span>
                            ))}
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
        <div className={`text-center mt-16 transition-all duration-700 delay-700 ${isVisible ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
