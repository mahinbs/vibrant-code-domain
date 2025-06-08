
import { Code, Globe, Zap, Shield, Users, TrendingUp, CheckCircle, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const WebAppsPage = () => {
  const features = [
    {
      icon: Code,
      title: 'Modern Tech Stack',
      description: 'Built with React, TypeScript, and the latest web technologies for optimal performance.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: Globe,
      title: 'Responsive Design',
      description: 'Pixel-perfect designs that work seamlessly across all devices and screen sizes.',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized for speed with advanced caching, lazy loading, and performance monitoring.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with SSL, data encryption, and regular security audits.',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: Users,
      title: 'Scalable Architecture',
      description: 'Built to grow with your business, handling increased traffic and user loads.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: TrendingUp,
      title: 'Analytics Integration',
      description: 'Comprehensive analytics and monitoring to track performance and user behavior.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  const portfolio = [
    {
      title: 'E-Commerce Platform',
      category: 'Retail Technology',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Full-featured e-commerce platform with advanced product management, payment processing, and analytics.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis'],
      metrics: '1M+ products, 50K+ daily users',
      timeline: '14 weeks'
    },
    {
      title: 'Healthcare Portal',
      category: 'Healthcare Technology',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'HIPAA-compliant patient portal with telemedicine capabilities and electronic health records.',
      technologies: ['React', 'Express', 'MongoDB', 'WebRTC', 'AWS'],
      metrics: '10K+ patients, 99.9% uptime',
      timeline: '18 weeks'
    },
    {
      title: 'Real Estate CRM',
      category: 'Real Estate Technology',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Comprehensive CRM system for real estate agents with lead management and property showcase.',
      technologies: ['Vue.js', 'Laravel', 'MySQL', 'Google Maps API', 'S3'],
      metrics: '500+ agents, 100K+ properties',
      timeline: '12 weeks'
    },
    {
      title: 'Financial Dashboard',
      category: 'FinTech',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Advanced financial analytics dashboard with real-time market data and portfolio management.',
      technologies: ['Angular', 'Python', 'FastAPI', 'PostgreSQL', 'D3.js'],
      metrics: '$50M+ assets tracked, 2K+ users',
      timeline: '16 weeks'
    },
    {
      title: 'Learning Management System',
      category: 'Education Technology',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Interactive LMS with video streaming, assessments, and progress tracking for educational institutions.',
      technologies: ['Next.js', 'Node.js', 'MongoDB', 'Socket.io', 'Cloudflare'],
      metrics: '25K+ students, 1K+ courses',
      timeline: '20 weeks'
    },
    {
      title: 'Logistics Platform',
      category: 'Supply Chain',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'End-to-end logistics management platform with route optimization and real-time tracking.',
      technologies: ['React', 'Django', 'PostgreSQL', 'Google Maps', 'Docker'],
      metrics: '10K+ shipments/month, 300+ vehicles',
      timeline: '22 weeks'
    }
  ];

  const caseStudies = [
    {
      client: 'RetailMax Corporation',
      industry: 'E-commerce',
      challenge: 'Legacy e-commerce platform couldn\'t handle Black Friday traffic spikes and had poor mobile experience.',
      solution: 'Built a modern, scalable e-commerce platform with microservices architecture, advanced caching, and mobile-first design.',
      results: [
        '300% increase in mobile conversion rates',
        'Zero downtime during peak traffic',
        '50% faster page load times',
        '$2M additional revenue in first quarter'
      ],
      testimonial: "The new platform exceeded all our expectations. We handled our highest traffic day ever without any issues.",
      clientName: 'David Martinez',
      clientRole: 'CTO, RetailMax Corporation',
      clientImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
      duration: '14 weeks',
      teamSize: '7 developers'
    },
    {
      client: 'MedCare Health System',
      industry: 'Healthcare',
      challenge: 'Needed a HIPAA-compliant patient portal with telemedicine capabilities during the pandemic.',
      solution: 'Developed a secure healthcare platform with video consultations, appointment scheduling, and EHR integration.',
      results: [
        '80% reduction in in-person visits',
        '95% patient satisfaction score',
        'HIPAA compliance achieved',
        '200% increase in patient engagement'
      ],
      testimonial: "NeuraCode delivered a platform that not only met our compliance requirements but also improved patient care significantly.",
      clientName: 'Dr. Lisa Thompson',
      clientRole: 'Chief Medical Officer, MedCare',
      clientImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
      duration: '18 weeks',
      teamSize: '9 developers'
    }
  ];

  const process = [
    { step: '01', title: 'Discovery', description: 'Understanding your requirements and business goals' },
    { step: '02', title: 'Design', description: 'Creating wireframes and user interface designs' },
    { step: '03', title: 'Development', description: 'Building your application with clean, maintainable code' },
    { step: '04', title: 'Testing', description: 'Rigorous testing across devices and browsers' },
    { step: '05', title: 'Deployment', description: 'Launching your application with monitoring and support' }
  ];

  return (
    <div 
      className="min-h-screen bg-black text-white"
      style={{
        backgroundImage: 'url("https://res.cloudinary.com/dknafpppp/image/upload/v1748810561/2150323552_rl9lps.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Web Applications
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Transform your business with custom web applications built using cutting-edge technologies and modern development practices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-20">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105">
                Start Your Project
              </button>
              <Link 
                to="/portfolio"
                className="px-8 py-4 border border-cyan-400/30 rounded-xl font-semibold hover:bg-cyan-500/10 transition-all duration-300 inline-flex items-center justify-center relative z-30"
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-gray-900/70">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Web Application Portfolio</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Showcasing our expertise across various industries and technologies
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.map((project, index) => (
              <div key={index} className="group bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-cyan-400/50 transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-400/30 rounded-full text-sm text-cyan-300">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">
                      <div>{project.metrics}</div>
                      <div>Timeline: {project.timeline}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real results from our web application development projects
            </p>
          </div>
          <div className="space-y-16">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700/50">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-cyan-400 mb-2">{study.client}</h3>
                      <p className="text-gray-400">{study.industry} • {study.duration} • {study.teamSize}</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-white mb-2">Challenge:</h4>
                        <p className="text-gray-300 text-sm leading-relaxed">{study.challenge}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-white mb-2">Solution:</h4>
                        <p className="text-gray-300 text-sm leading-relaxed">{study.solution}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="mb-6">
                      <h4 className="font-semibold text-white mb-4">Results:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {study.results.map((result, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">{result}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
                      <div className="flex items-start space-x-4">
                        <img 
                          src={study.clientImage} 
                          alt={study.clientName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <p className="text-gray-300 text-sm italic mb-3">"{study.testimonial}"</p>
                          <div>
                            <p className="font-semibold text-white text-sm">{study.clientName}</p>
                            <p className="text-gray-400 text-xs">{study.clientRole}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex mt-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900/70">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Our Web Development?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We deliver exceptional web applications that drive results and exceed expectations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group relative p-8 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-cyan-400/50 transition-all duration-300 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/60 to-gray-900/30"></div>
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center mr-4">
                      <feature.icon className="h-6 w-6 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Development Process</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A proven methodology that ensures quality delivery and client satisfaction.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 relative">
        <div className="absolute inset-0 pointer-events-none"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4">Ready to Build Something Amazing?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and create a web application that transforms your business.
          </p>
          <Link 
            to="/contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 relative z-20"
          >
            Get Started Today
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WebAppsPage;
