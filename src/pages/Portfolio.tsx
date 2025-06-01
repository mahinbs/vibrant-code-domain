import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Code, Smartphone, Cloud, Brain, Zap, ChevronDown, ExternalLink, Star, Users, Clock, ArrowRight, Award, TrendingUp } from 'lucide-react';

const Portfolio = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

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
        },
        {
          id: 'realestatecrm',
          title: 'PropertyPro CRM System',
          client: 'Urban Realty Group',
          description: 'Comprehensive real estate CRM with lead tracking, property management, and automated workflows.',
          technologies: ['React', 'Node.js', 'MongoDB', 'AWS', 'Twilio'],
          metrics: { leads: '+180%', closings: '+75%', agents: '200+', revenue: '+320%' } as Record<string, string>,
          timeline: '14 weeks',
          team: '7 developers',
          industry: 'Real Estate',
          testimonial: 'Transformed our agency operations. Lead conversion rates have never been higher.',
          clientLogo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
          image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 'financedash',
          title: 'FinanceFlow Dashboard',
          client: 'Capital Analytics',
          description: 'Advanced financial analytics platform with real-time market data and portfolio management.',
          technologies: ['React', 'D3.js', 'Python', 'PostgreSQL', 'Docker'],
          metrics: { accuracy: '99.7%', trades: '1M+', users: '25K+', uptime: '99.9%' } as Record<string, string>,
          timeline: '18 weeks',
          team: '8 developers',
          industry: 'Finance',
          testimonial: 'The most sophisticated trading platform we\'ve ever used. Incredible real-time capabilities.',
          clientLogo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
          image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
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
        },
        {
          id: 'customersupport',
          title: 'SupportHub Customer System',
          client: 'ServiceFirst Inc.',
          description: 'Intelligent customer support platform with AI-powered ticket routing and automation.',
          technologies: ['React', 'Node.js', 'OpenAI', 'PostgreSQL', 'Elasticsearch'],
          metrics: { resolution: '+85%', satisfaction: '98%', tickets: '100K+', cost: '-60%' } as Record<string, string>,
          timeline: '15 weeks',
          team: '6 developers',
          industry: 'Customer Service',
          testimonial: 'Our customer satisfaction scores have reached all-time highs. The AI features are game-changing.',
          clientLogo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
          image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 'analyticsdash',
          title: 'DataViz Analytics Platform',
          client: 'Insights Corp',
          description: 'Business intelligence platform with advanced data visualization and predictive analytics.',
          technologies: ['React', 'Python', 'TensorFlow', 'BigQuery', 'Tableau'],
          metrics: { insights: '+200%', decisions: '90% faster', data: '10TB+', accuracy: '96%' } as Record<string, string>,
          timeline: '22 weeks',
          team: '9 developers',
          industry: 'Analytics',
          testimonial: 'The predictive capabilities have revolutionized our strategic planning process.',
          clientLogo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        }
      ]
    },
    {
      id: 'mobile-apps',
      icon: Smartphone,
      title: 'Mobile Applications',
      color: 'purple' as const,
      projects: [
        {
          id: 'foodie',
          title: 'Foodie Delivery App',
          client: 'Foodie Networks',
          description: 'Food delivery platform with real-time tracking and AI-powered recommendations.',
          technologies: ['React Native', 'Node.js', 'MongoDB', 'Socket.io', 'Stripe'],
          metrics: { orders: '100K+', restaurants: '500+', rating: '4.8/5', delivery: '25 min avg' } as Record<string, string>,
          timeline: '14 weeks',
          team: '6 developers',
          industry: 'Food Delivery',
          testimonial: 'The app\'s performance and user experience are outstanding. Customer retention is incredible.',
          clientLogo: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=100&h=100&fit=crop',
          image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 'fitnesstrack',
          title: 'FitTrack Fitness App',
          client: 'HealthTech Solutions',
          description: 'Comprehensive fitness tracking app with AI workout recommendations and social features.',
          technologies: ['React Native', 'Firebase', 'TensorFlow', 'HealthKit', 'Google Fit'],
          metrics: { users: '75K+', workouts: '500K+', retention: '80%', rating: '4.9/5' } as Record<string, string>,
          timeline: '16 weeks',
          team: '7 developers',
          industry: 'Health & Fitness',
          testimonial: 'Users love the personalized workout plans. Engagement rates are through the roof.',
          clientLogo: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop',
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 'socialconnect',
          title: 'SocialConnect Platform',
          client: 'ConnectTech Media',
          description: 'Next-generation social media app with AR filters and real-time video streaming.',
          technologies: ['React Native', 'WebRTC', 'AWS', 'TensorFlow', 'FFmpeg'],
          metrics: { users: '200K+', posts: '2M+', engagement: '+150%', streams: '50K daily' } as Record<string, string>,
          timeline: '20 weeks',
          team: '10 developers',
          industry: 'Social Media',
          testimonial: 'The AR features are incredible. Our user base has grown exponentially since launch.',
          clientLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop',
          image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
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
        },
        {
          id: 'customersupport',
          title: 'SupportBot AI Assistant',
          client: 'HelpDesk Solutions',
          description: 'AI-powered customer support calling system with sentiment analysis and issue resolution.',
          technologies: ['OpenAI', 'Twilio', 'Python', 'Sentiment Analysis', 'CRM'],
          metrics: { resolution: '+90%', satisfaction: '96%', cost: '-70%', response: '30 sec avg' } as Record<string, string>,
          timeline: '12 weeks',
          team: '5 developers',
          industry: 'Customer Support',
          testimonial: 'Customer complaints dropped by 80%. The AI understands context better than we expected.',
          clientLogo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
          image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 'salesanalytics',
          title: 'CallInsight Analytics',
          client: 'Revenue Growth Co.',
          description: 'Advanced call analytics platform with AI-driven conversation insights and performance tracking.',
          technologies: ['OpenAI', 'Python', 'Speech-to-Text', 'Analytics', 'Dashboard'],
          metrics: { insights: '+250%', performance: '+65%', training: '-50%', accuracy: '94%' } as Record<string, string>,
          timeline: '14 weeks',
          team: '6 developers',
          industry: 'Sales Analytics',
          testimonial: 'The conversation insights have transformed our sales training. Performance improvements are remarkable.',
          clientLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
          image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        }
      ]
    },
    {
      id: 'ai-automation',
      icon: Zap,
      title: 'AI Automation',
      color: 'green' as const,
      projects: [
        {
          id: 'docprocess',
          title: 'DocProcess Automation',
          client: 'Legal Associates',
          description: 'Document processing automation with AI-powered analysis and workflow integration.',
          technologies: ['Python', 'TensorFlow', 'AWS Lambda', 'OCR', 'NLP'],
          metrics: { processing: '+90%', accuracy: '99.2%', time: '-80%', cost: '-65%' } as Record<string, string>,
          timeline: '12 weeks',
          team: '5 developers',
          industry: 'Legal Services',
          testimonial: 'Completely revolutionized our document workflow. What took hours now takes minutes.',
          clientLogo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 'inventoryai',
          title: 'SmartStock Inventory AI',
          client: 'Warehouse Solutions Inc.',
          description: 'AI-powered inventory management with predictive restocking and automated ordering.',
          technologies: ['Python', 'Machine Learning', 'Computer Vision', 'IoT', 'APIs'],
          metrics: { efficiency: '+120%', waste: '-75%', accuracy: '98.5%', savings: '$500K' } as Record<string, string>,
          timeline: '16 weeks',
          team: '7 developers',
          industry: 'Logistics',
          testimonial: 'Never run out of stock again. The predictive capabilities are spot-on every time.',
          clientLogo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
          image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 'marketingauto',
          title: 'MarketBot Automation Suite',
          client: 'Digital Marketing Pro',
          description: 'Complete marketing automation platform with AI content generation and campaign optimization.',
          technologies: ['OpenAI', 'Python', 'Marketing APIs', 'Analytics', 'Automation'],
          metrics: { campaigns: '+200%', engagement: '+180%', roi: '+250%', content: '1000+ pieces' } as Record<string, string>,
          timeline: '18 weeks',
          team: '8 developers',
          industry: 'Digital Marketing',
          testimonial: 'Our marketing campaigns have never been more effective. The AI content is phenomenal.',
          clientLogo: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
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

  const handleProjectClick = (projectId: string) => {
    setSelectedProject(selectedProject === projectId ? null : projectId);
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
                <span className="text-white font-semibold">16+ Projects</span>
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
      <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/lovable-uploads/d0fa4f38-5951-4a69-9df8-13d4faa03aaa.png"
            alt="Portfolio Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-gray-900/80"></div>
        </div>

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
                              selectedProject === project.id ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                            }`}>
                              <div className="pt-4 border-t border-gray-700/50 space-y-6">
                                {/* Client Info */}
                                <div className="flex items-center space-x-3">
                                  <img 
                                    src={project.clientLogo} 
                                    alt={project.client}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-700"
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
                                  <h4 className="text-sm font-semibold text-white mb-3">Technologies Used</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech, idx) => (
                                      <span key={idx} className={`px-3 py-1 rounded-lg text-xs ${colors.tag} border font-medium`}>
                                        {tech}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                {/* All Metrics */}
                                <div>
                                  <h4 className="text-sm font-semibold text-white mb-3">Key Results</h4>
                                  <div className="grid grid-cols-2 gap-3">
                                    {Object.entries(project.metrics).map(([key, value]) => (
                                      <div key={key} className="text-center bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
                                        <div className={`text-lg font-bold ${colors.text}`}>{String(value)}</div>
                                        <div className="text-xs text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Testimonial */}
                                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                                  <div className="flex items-start space-x-3">
                                    <div className="flex items-center space-x-1">
                                      {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} className={`h-3 w-3 ${colors.text} fill-current`} />
                                      ))}
                                    </div>
                                    <p className="text-gray-300 text-sm italic leading-relaxed">
                                      "{project.testimonial}"
                                    </p>
                                  </div>
                                  <div className="mt-3 text-xs text-gray-500">
                                    — {project.client}
                                  </div>
                                </div>

                                {/* Action Button */}
                                <button className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl ${colors.button} border font-medium transition-all duration-300 hover:transform hover:scale-105`}>
                                  <span>View Full Case Study</span>
                                  <ExternalLink className="h-4 w-4" />
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
