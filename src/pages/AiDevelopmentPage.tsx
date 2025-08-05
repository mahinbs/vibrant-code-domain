import { Brain, Bot, Eye, Mic, BarChart3, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServicePortfolioSection from '@/components/ServicePortfolioSection';
import ServiceCaseStudiesSection from '@/components/ServiceCaseStudiesSection';
import ServicePricingSection from '@/components/ServicePricingSection';

const AiDevelopmentPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/contact#form');
  };

  const features = [
    {
      icon: Brain,
      title: 'Machine Learning',
      description: 'Custom ML models for predictive analytics, recommendation systems, and intelligent automation.'
    },
    {
      icon: Bot,
      title: 'AI Chatbots',
      description: 'Intelligent conversational AI powered by natural language processing and understanding.'
    },
    {
      icon: Eye,
      title: 'Computer Vision',
      description: 'Image recognition, object detection, and visual analysis solutions for various industries.'
    },
    {
      icon: Mic,
      title: 'Speech Recognition',
      description: 'Voice-to-text, speech synthesis, and natural language processing capabilities.'
    },
    {
      icon: BarChart3,
      title: 'Data Analytics',
      description: 'AI-powered insights and business intelligence from your data streams.'
    },
    {
      icon: Zap,
      title: 'Process Automation',
      description: 'Intelligent automation of complex business processes with AI decision-making.'
    }
  ];

  const caseStudies = [
    {
      client: 'DataCorp Analytics',
      industry: 'Financial Services',
      challenge: 'Manual fraud detection taking 48 hours per case with 65% accuracy rate causing significant losses.',
      solution: 'AI-powered fraud detection system using machine learning algorithms with real-time processing capabilities.',
      results: [
        '99.2% fraud detection accuracy',
        'Real-time processing (under 2 seconds)',
        '85% reduction in false positives',
        '$2.3M annual savings from prevented fraud'
      ],
      testimonial: "The AI system revolutionized our fraud detection. We're now catching fraud in real-time with incredible accuracy.",
      clientName: 'Michael Rodriguez',
      clientRole: 'Head of Risk Management, DataCorp Analytics',
      clientImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
      duration: '14 weeks',
      teamSize: '4 AI engineers'
    },
    {
      client: 'RetailVision Inc',
      industry: 'Retail Technology',
      challenge: 'Inventory management inefficiencies leading to 30% stockouts and $1M in lost revenue annually.',
      solution: 'Computer vision and predictive analytics system for automated inventory tracking and demand forecasting.',
      results: [
        '95% reduction in stockouts',
        '40% improvement in inventory turnover',
        '99.5% inventory accuracy',
        '$1.8M increase in annual revenue'
      ],
      testimonial: "Our inventory is now managed by AI with unprecedented accuracy. We've eliminated stockouts almost entirely.",
      clientName: 'Sarah Kim',
      clientRole: 'VP of Operations, RetailVision Inc',
      clientImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
      duration: '10 weeks',
      teamSize: '5 AI engineers'
    }
  ];

  const pricingTiers = [
    {
      name: 'AI Starter',
      price: '$15,000',
      description: 'Basic AI implementation for small projects',
      features: ['AI Feasibility Study', 'Basic ML Model Development', 'Data Preprocessing', 'Model Training & Testing', '3 Months Support'],
      popular: false
    },
    {
      name: 'AI Advanced',
      price: '$45,000',
      description: 'Comprehensive AI solution',
      features: ['Advanced ML/DL Models', 'Computer Vision or NLP', 'Real-time Processing', 'API Development', 'System Integration', '6 Months Support'],
      popular: true
    },
    {
      name: 'Enterprise AI',
      price: 'Custom',
      description: 'Large-scale AI transformation',
      features: ['Custom AI Architecture', 'Multi-model Integration', 'Advanced Analytics Dashboard', 'Continuous Learning Systems', '24/7 Monitoring', '12 Months Dedicated Support'],
      popular: false
    }
  ];

  const process = [
    { step: '01', title: 'Discovery', description: 'Identify AI opportunities and data assessment' },
    { step: '02', title: 'Design', description: 'AI model architecture and training strategy' },
    { step: '03', title: 'Development', description: 'Model training, testing, and optimization' },
    { step: '04', title: 'Integration', description: 'Seamless integration with existing systems' },
    { step: '05', title: 'Monitoring', description: 'Continuous learning and performance optimization' }
  ];

  return (
    <div 
      className="min-h-screen bg-black text-white"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/65"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                AI Development
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Harness the power of artificial intelligence to automate processes and unlock new possibilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleGetStarted}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl font-semibold hover:from-purple-400 hover:to-pink-500 transition-all duration-300 transform hover:scale-105"
              >
                Start AI Project
              </button>
              <Link 
                to="/portfolio"
                className="px-8 py-4 border border-purple-400/30 rounded-xl font-semibold hover:bg-purple-500/10 transition-all duration-300 inline-flex items-center justify-center"
              >
                View AI Solutions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <ServicePortfolioSection 
        serviceId="ai-development" 
        serviceName="AI Development"
      />

      {/* Case Studies Section */}
      <ServiceCaseStudiesSection 
        serviceName="AI Development"
        caseStudies={caseStudies}
        accentColor="text-purple-400"
      />

      {/* Features Section */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">AI Capabilities</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Cutting-edge AI technologies to solve complex business challenges.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-8 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-purple-400/50 transition-all duration-300">
                <feature.icon className="h-12 w-12 text-purple-400 mb-6" />
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our AI Development Process</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A systematic approach to building intelligent solutions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <ServicePricingSection 
        serviceName="AI Development"
        pricingTiers={pricingTiers}
        accentColor="text-purple-400"
      />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 relative">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4">Ready to Embrace AI Innovation?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's build intelligent solutions that transform your business operations.
          </p>
          <button 
            onClick={handleGetStarted}
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl font-semibold hover:from-purple-400 hover:to-pink-500 transition-all duration-300 transform hover:scale-105"
          >
            Get Started Today
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AiDevelopmentPage;