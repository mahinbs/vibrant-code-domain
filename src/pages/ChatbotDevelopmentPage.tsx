import { MessageCircle, Brain, Zap, Users, Settings, Bot } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServicePortfolioSection from '@/components/ServicePortfolioSection';
import ServiceCaseStudiesSection from '@/components/ServiceCaseStudiesSection';
import ServicePricingSection from '@/components/ServicePricingSection';

const ChatbotDevelopmentPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/contact#form');
  };

  const features = [
    {
      icon: MessageCircle,
      title: 'Conversational AI',
      description: 'Natural language processing for human-like conversations across multiple languages.'
    },
    {
      icon: Brain,
      title: 'Machine Learning',
      description: 'AI-powered chatbots that learn and improve from every customer interaction.'
    },
    {
      icon: Zap,
      title: 'Instant Responses',
      description: '24/7 customer support with instant, accurate responses to common queries.'
    },
    {
      icon: Users,
      title: 'Multi-Platform',
      description: 'Deploy across websites, mobile apps, WhatsApp, Telegram, and social media.'
    },
    {
      icon: Settings,
      title: 'Custom Integration',
      description: 'Seamless integration with CRM, helpdesk, and existing business systems.'
    },
    {
      icon: Bot,
      title: 'Voice Capabilities',
      description: 'Voice-enabled chatbots with speech recognition and text-to-speech functionality.'
    }
  ];

  const process = [
    { step: '01', title: 'Analysis', description: 'Analyze customer queries and conversation patterns' },
    { step: '02', title: 'Design', description: 'Design conversation flows and AI training data' },
    { step: '03', title: 'Development', description: 'Build and train the chatbot with NLP capabilities' },
    { step: '04', title: 'Testing', description: 'Comprehensive testing across different scenarios' },
    { step: '05', title: 'Deployment', description: 'Launch with monitoring and continuous improvement' }
  ];

  const caseStudies = [
    {
      client: "RetailCorp",
      industry: "E-commerce",
      challenge: "High customer service costs with 500+ daily inquiries and long response times affecting customer satisfaction.",
      solution: "Deployed AI chatbot with NLP capabilities, integrated with inventory and order management systems for instant responses.",
      results: ["75% reduction in support tickets", "90% faster response times", "24/7 customer support", "40% cost savings"],
      testimonial: "The chatbot handles most customer queries instantly. Our support team can now focus on complex issues while customer satisfaction has improved dramatically.",
      clientName: "Sarah Johnson",
      clientRole: "Customer Service Director",
      clientImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      duration: "8 weeks",
      teamSize: "4 specialists"
    },
    {
      client: "HealthPlus Clinic",
      industry: "Healthcare",
      challenge: "Patients struggling to book appointments and get basic information outside business hours.",
      solution: "Created HIPAA-compliant chatbot for appointment booking, symptom checking, and medical information with secure data handling.",
      results: ["60% increase in online bookings", "85% patient satisfaction", "50% reduction in phone calls", "Improved accessibility"],
      testimonial: "Our patients love the convenience of booking appointments anytime. The chatbot has made our clinic more accessible and efficient.",
      clientName: "Dr. Michael Chen",
      clientRole: "Practice Manager",
      clientImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      duration: "10 weeks",
      teamSize: "5 specialists"
    }
  ];

  const pricingTiers = [
    {
      name: "Starter Bot",
      price: "$2,500",
      description: "Perfect for small businesses getting started with chatbots",
      features: [
        "Basic FAQ chatbot",
        "Up to 100 questions",
        "Web widget integration",
        "Basic analytics",
        "Email support",
        "1 month maintenance"
      ],
      popular: false
    },
    {
      name: "Smart Assistant",
      price: "$8,500",
      description: "Advanced AI chatbot for growing businesses",
      features: [
        "AI-powered conversations",
        "Unlimited questions",
        "Multi-platform deployment",
        "CRM integration",
        "Advanced analytics",
        "Voice capabilities",
        "3 months maintenance",
        "Training & documentation"
      ],
      popular: true
    },
    {
      name: "Enterprise Solution",
      price: "Custom",
      description: "Full-scale chatbot ecosystem for large organizations",
      features: [
        "Custom AI model development",
        "Multi-language support",
        "Advanced integrations",
        "Dedicated support team",
        "99.9% uptime SLA",
        "Custom security features",
        "12 months maintenance",
        "On-site training"
      ],
      popular: false
    }
  ];

  return (
    <div 
      className="min-h-screen bg-black text-white"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                Chatbot Development
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Automate customer service and engagement with intelligent AI-powered chatbots.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleGetStarted}
                className="px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-600 rounded-xl font-semibold hover:from-teal-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105"
              >
                Build Your Chatbot
              </button>
              <Link 
                to="/portfolio"
                className="px-8 py-4 border border-teal-400/30 rounded-xl font-semibold hover:bg-teal-500/10 transition-all duration-300 inline-flex items-center justify-center"
              >
                View Chatbot Solutions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <ServicePortfolioSection 
        serviceId="chatbot-development"
        serviceName="Chatbot Development"
      />

      {/* Case Studies Section */}
      <ServiceCaseStudiesSection 
        serviceName="Chatbot Development"
        caseStudies={caseStudies}
      />

      {/* Features Section */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Intelligent Chatbot Features</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Advanced AI capabilities to enhance customer experience and business efficiency.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-8 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-teal-400/50 transition-all duration-300">
                <feature.icon className="h-12 w-12 text-teal-400 mb-6" />
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
            <h2 className="text-4xl font-bold mb-4">Our Chatbot Development Process</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From conversation design to intelligent deployment.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-teal-500 to-blue-600 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
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
        serviceName="Chatbot Development"
        pricingTiers={pricingTiers}
      />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-500/20 to-blue-500/20 relative">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4">Ready to Automate Customer Support?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's build intelligent chatbots that enhance customer experience and reduce support costs.
          </p>
          <button 
            onClick={handleGetStarted}
            className="inline-block px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-600 rounded-xl font-semibold hover:from-teal-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105"
          >
            Get Started Today
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ChatbotDevelopmentPage;