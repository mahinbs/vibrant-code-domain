
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Code, Smartphone, Cloud, Brain, Zap, ChevronDown, ExternalLink, Star, Users, Clock, ArrowRight, Award, TrendingUp } from 'lucide-react';
import { getPortfolioData } from '@/services/portfolioDataService';

const Portfolio = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [services, setServices] = useState(getPortfolioData());

  // Refresh data when component mounts or when localStorage changes
  useEffect(() => {
    const refreshData = () => {
      setServices(getPortfolioData());
    };

    // Listen for storage changes (when admin adds/edits projects)
    window.addEventListener('storage', refreshData);
    
    // Also refresh on focus (for same-tab updates)
    window.addEventListener('focus', refreshData);

    return () => {
      window.removeEventListener('storage', refreshData);
      window.removeEventListener('focus', refreshData);
    };
  }, []);

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
    purple: {
      border: 'border-purple-400/30',
      gradient: 'from-purple-400/10 to-purple-600/10',
      icon: 'bg-purple-500/10 text-purple-400 border-purple-400/30',
      text: 'text-purple-400',
      button: 'bg-purple-500/20 border-purple-400/30 text-purple-400 hover:bg-purple-500/30',
      tag: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
    },
    pink: {
      border: 'border-pink-400/30',
      gradient: 'from-pink-400/10 to-pink-600/10',
      icon: 'bg-pink-500/10 text-pink-400 border-pink-400/30',
      text: 'text-pink-400',
      button: 'bg-pink-500/20 border-pink-400/30 text-pink-400 hover:bg-pink-500/30',
      tag: 'bg-pink-500/20 text-pink-300 border-pink-500/30'
    },
    green: {
      border: 'border-green-400/30',
      gradient: 'from-green-400/10 to-green-600/10',
      icon: 'bg-green-500/10 text-green-400 border-green-400/30',
      text: 'text-green-400',
      button: 'bg-green-500/20 border-green-400/30 text-green-400 hover:bg-green-500/30',
      tag: 'bg-green-500/20 text-green-300 border-green-500/30'
    },
  };

  const handleProjectClick = (projectId: string) => {
    window.location.href = `/case-study/${projectId}`;
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <iframe
            src="https://player.cloudinary.com/embed/?cloud_name=dknafpppp&public_id=5257353_Robot_Hand_1920x1080_dzh23x&profile=cld-default&autoplay=true&loop=true&muted=true&controls=false"
            width="100%"
            height="100%"
            className="w-full h-full object-cover scale-150"
            allow="autoplay; fullscreen"
            style={{
              border: 'none',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) scale(1.2)',
              minWidth: '100vw',
              minHeight: '100vh',
            }}
          />
          <div className="absolute inset-0 bg-black/80"></div>
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.1),transparent_50%)] z-10"></div>
        
        <div className="container mx-auto px-6 relative z-20">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Our <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Portfolio</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Discover the innovative solutions we've delivered for our clients. Each project showcases our commitment to excellence and cutting-edge technology.
            </p>
            <div className="flex items-center justify-center space-x-8 mt-8">
              <div className="flex items-center space-x-2">
                <Award className="h-6 w-6 text-cyan-400" />
                <span className="text-white font-semibold">{services.reduce((total, service) => total + service.projects.length, 0)}+ Projects</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-6 w-6 text-green-400" />
                <span className="text-white font-semibold">98% Success Rate</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-blue-400" />
                <span className="text-white font-semibold">50+ Happy Clients</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section 
        className="py-20 bg-gradient-to-b from-black to-gray-900 relative"
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
          {/* Service Categories */}
          <div className="mb-16">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button
                onClick={() => setSelectedService(null)}
                className={`px-6 py-3 rounded-xl border transition-all duration-300 font-medium ${
                  selectedService === null
                    ? 'bg-cyan-500/20 border-cyan-400/30 text-cyan-400'
                    : 'border-gray-600 text-gray-400 hover:border-gray-500 hover:text-gray-300'
                }`}
              >
                All Projects ({services.reduce((total, service) => total + service.projects.length, 0)})
              </button>
              {services.map((service) => {
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
                  >
                    <service.icon className="h-4 w-4" />
                    <span>{service.title} ({service.projects.length})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="space-y-20">
            {services
              .filter(service => !selectedService || service.id === selectedService)
              .map((service) => {
                const colors = colorClasses[service.color];
                
                return (
                  <div key={service.id} className="space-y-8">
                    <div className="flex items-center space-x-4 mb-8">
                      <div className={`w-12 h-12 rounded-xl ${colors.icon} border flex items-center justify-center`}>
                        <service.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h2 className={`text-3xl font-bold text-white transition-colors duration-300`}>
                          {service.title}
                        </h2>
                        <p className="text-gray-400 mt-1">{service.projects.length} projects completed</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                      {service.projects.map((project) => (
                        <div
                          key={project.id}
                          className={`group relative rounded-2xl bg-gray-900/80 backdrop-blur-sm border ${colors.border} hover:bg-gray-800/90 transition-all duration-500 overflow-hidden cursor-pointer hover:transform hover:scale-105 hover:shadow-2xl`}
                          onClick={() => handleProjectClick(project.id)}
                        >
                          {/* Project Image */}
                          <div className="relative h-48 overflow-hidden rounded-t-2xl">
                            <img 
                              src={project.image} 
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
                                <h3 className={`text-xl font-bold text-white mb-2 group-hover:${colors.text} transition-colors duration-300`}>
                                  {project.title}
                                </h3>
                                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-sm leading-relaxed">
                                  {project.description}
                                </p>
                              </div>
                              <Link 
                                to={`/case-study/${project.id}`}
                                className={`px-3 py-1 rounded-lg text-xs ${colors.tag} border font-medium hover:scale-105 transition-transform duration-200`}
                                onClick={(e) => e.stopPropagation()}
                              >
                                View Study
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

                            {/* Action Button */}
                            <Link 
                              to={`/case-study/${project.id}`}
                              className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl ${colors.button} border font-medium transition-all duration-300 hover:transform hover:scale-105 mt-4`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span>View Full Case Study</span>
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-24 bg-gradient-to-r from-gray-900/50 to-black/50 rounded-3xl p-12 border border-gray-700/30">
            <h3 className="text-4xl font-bold text-white mb-6">
              Ready to Start Your <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Next Project?</span>
            </h3>
            <p className="text-gray-300 mb-8 max-w-3xl mx-auto text-lg leading-relaxed">
              Let's discuss how we can bring your vision to life with cutting-edge technology and expert craftsmanship. 
              Join our growing list of satisfied clients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/#contact"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 font-medium shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105"
              >
                <span>Get Started Today</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link 
                to="/#services"
                className="inline-flex items-center space-x-2 bg-gray-800/50 border border-gray-600 text-gray-300 px-8 py-4 rounded-xl hover:bg-gray-700/50 hover:border-gray-500 transition-all duration-300 font-medium"
              >
                <span>View Our Services</span>
                <ExternalLink className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;
