
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Code, Smartphone, Cloud, Brain, Zap, ChevronDown, ExternalLink, Star, Users, Clock, ArrowRight } from 'lucide-react';

const Portfolio = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const services = [
    {
      id: 'web-apps',
      icon: Code,
      title: 'Web Applications',
      color: 'cyan',
      projects: [
        {
          id: 'retailmax',
          title: 'RetailMax E-commerce Platform',
          client: 'RetailMax Inc.',
          description: 'Complete e-commerce solution with advanced inventory management and AI-powered recommendations.',
          technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
          metrics: { revenue: '+250%', conversion: '+45%', users: '50K+' },
          timeline: '12 weeks',
          team: '5 developers',
          testimonial: 'The platform exceeded our expectations. Sales increased dramatically within the first month.',
          clientLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
          image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 'medcare',
          title: 'MedCare Healthcare Portal',
          client: 'MedCare Systems',
          description: 'Patient management system with telemedicine capabilities and secure data handling.',
          technologies: ['React', 'TypeScript', 'Firebase', 'WebRTC'],
          metrics: { efficiency: '+60%', satisfaction: '95%', appointments: '10K+' },
          timeline: '16 weeks',
          team: '6 developers',
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
      color: 'blue',
      projects: [
        {
          id: 'projectflow',
          title: 'ProjectFlow Management Platform',
          client: 'TechCorp Solutions',
          description: 'Enterprise project management with real-time collaboration and advanced analytics.',
          technologies: ['React', 'AWS', 'Redis', 'WebSocket'],
          metrics: { productivity: '+75%', teams: '200+', projects: '5K+' },
          timeline: '20 weeks',
          team: '8 developers',
          testimonial: 'Transformed how our teams collaborate. Best investment we\'ve made in years.',
          clientLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop',
          image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        }
      ]
    },
    {
      id: 'mobile-apps',
      icon: Smartphone,
      title: 'Mobile Applications',
      color: 'purple',
      projects: [
        {
          id: 'foodie',
          title: 'Foodie Delivery App',
          client: 'Foodie Networks',
          description: 'Food delivery platform with real-time tracking and AI-powered recommendations.',
          technologies: ['React Native', 'Node.js', 'MongoDB', 'Socket.io'],
          metrics: { orders: '100K+', restaurants: '500+', rating: '4.8/5' },
          timeline: '14 weeks',
          team: '6 developers',
          testimonial: 'The app\'s performance and user experience are outstanding. Customer retention is incredible.',
          clientLogo: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=100&h=100&fit=crop',
          image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        }
      ]
    },
    {
      id: 'ai-calling',
      icon: Brain,
      title: 'AI Calling Agency',
      color: 'pink',
      projects: [
        {
          id: 'leadgen',
          title: 'LeadGen AI System',
          client: 'SalesForce Pro',
          description: 'Intelligent lead generation system with natural conversation AI and CRM integration.',
          technologies: ['OpenAI', 'Twilio', 'Python', 'CRM APIs'],
          metrics: { leads: '+300%', conversion: '+85%', cost: '-60%' },
          timeline: '10 weeks',
          team: '4 developers',
          testimonial: 'Game-changer for our sales team. The AI calls are indistinguishable from human agents.',
          clientLogo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
          image: 'https://images.unsplash.com/photo-1553775282-20af80779df7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        }
      ]
    },
    {
      id: 'ai-automation',
      icon: Zap,
      title: 'AI Automation',
      color: 'green',
      projects: [
        {
          id: 'docprocess',
          title: 'DocProcess Automation',
          client: 'Legal Associates',
          description: 'Document processing automation with AI-powered analysis and workflow integration.',
          technologies: ['Python', 'TensorFlow', 'AWS Lambda', 'OCR'],
          metrics: { processing: '+90%', accuracy: '99.2%', time: '-80%' },
          timeline: '12 weeks',
          team: '5 developers',
          testimonial: 'Completely revolutionized our document workflow. What took hours now takes minutes.',
          clientLogo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
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
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative">
        <div className="container mx-auto px-6">
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
                All Projects
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
              .map((service) => {
                const colors = colorClasses[service.color];
                
                return (
                  <div key={service.id} className="space-y-8">
                    <div className="flex items-center space-x-4 mb-8">
                      <div className={`w-12 h-12 rounded-xl ${colors.icon} border flex items-center justify-center`}>
                        <service.icon className="h-6 w-6" />
                      </div>
                      <h2 className={`text-3xl font-bold text-white group-hover:${colors.text} transition-colors duration-300`}>
                        {service.title}
                      </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {service.projects.map((project) => (
                        <div
                          key={project.id}
                          className={`group relative rounded-2xl bg-gray-900/80 backdrop-blur-sm border ${colors.border} hover:bg-gray-800/90 transition-all duration-500 overflow-hidden cursor-pointer`}
                          onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
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
                              <ChevronDown 
                                className={`h-5 w-5 ${colors.text} transform transition-transform duration-300 ${
                                  selectedProject === project.id ? 'rotate-180' : ''
                                }`}
                              />
                            </div>

                            {/* Metrics */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
                                <span key={key} className={`px-3 py-1 rounded-full text-xs ${colors.tag} border`}>
                                  {key}: {value}
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
                                    className="w-10 h-10 rounded-full object-cover"
                                  />
                                  <div>
                                    <p className="text-white font-medium">{project.client}</p>
                                    <div className="flex items-center space-x-4 text-sm text-gray-400">
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
                                  <h4 className="text-sm font-semibold text-white mb-2">Technologies Used</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech, idx) => (
                                      <span key={idx} className={`px-2 py-1 rounded text-xs ${colors.tag} border`}>
                                        {tech}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                {/* Testimonial */}
                                <div className="bg-gray-800/50 rounded-lg p-4">
                                  <div className="flex items-start space-x-2">
                                    <Star className={`h-4 w-4 ${colors.text} mt-1`} />
                                    <p className="text-gray-300 text-sm italic">
                                      "{project.testimonial}"
                                    </p>
                                  </div>
                                </div>

                                {/* All Metrics */}
                                <div>
                                  <h4 className="text-sm font-semibold text-white mb-2">Key Results</h4>
                                  <div className="grid grid-cols-2 gap-2">
                                    {Object.entries(project.metrics).map(([key, value]) => (
                                      <div key={key} className="text-center">
                                        <div className={`text-lg font-bold ${colors.text}`}>{value}</div>
                                        <div className="text-xs text-gray-400 capitalize">{key}</div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Action Button */}
                                <button className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl ${colors.button} border font-medium transition-all duration-300`}>
                                  <span>View Full Case Study</span>
                                  <ArrowRight className="h-4 w-4" />
                                </button>
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
          <div className="text-center mt-20">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Start Your <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Next Project?</span>
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can bring your vision to life with cutting-edge technology and expert craftsmanship.
            </p>
            <Link 
              to="/#contact"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 font-medium shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105"
            >
              <span>Get Started Today</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;
