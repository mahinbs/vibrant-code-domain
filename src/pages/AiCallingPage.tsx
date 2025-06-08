
import { Phone, Brain, BarChart3, Users, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AiCallingPage = () => {
  const features = [
    {
      icon: Brain,
      title: 'Natural Language Processing',
      description: 'Advanced AI that understands context and responds naturally to customer inquiries.'
    },
    {
      icon: Phone,
      title: 'Voice Recognition',
      description: 'Sophisticated voice AI that handles complex conversations with human-like interaction.'
    },
    {
      icon: BarChart3,
      title: 'Call Analytics',
      description: 'Comprehensive analytics on call performance, conversion rates, and customer insights.'
    },
    {
      icon: Users,
      title: 'Lead Generation',
      description: 'Automated lead qualification and nurturing through intelligent conversation flows.'
    },
    {
      icon: Zap,
      title: '24/7 Availability',
      description: 'Round-the-clock calling capabilities that never miss an opportunity.'
    },
    {
      icon: Shield,
      title: 'Compliance Ready',
      description: 'Built-in compliance features for TCPA, GDPR, and industry regulations.'
    }
  ];

  const useCases = [
    {
      title: 'Sales Outreach',
      description: 'Automated prospecting and lead qualification calls',
      benefits: ['50% increase in qualified leads', 'Reduced cost per acquisition', '24/7 sales coverage']
    },
    {
      title: 'Customer Support',
      description: 'Intelligent call routing and issue resolution',
      benefits: ['Faster response times', 'Higher customer satisfaction', 'Reduced support costs']
    },
    {
      title: 'Appointment Booking',
      description: 'Automated scheduling and confirmation calls',
      benefits: ['Reduced no-shows', 'Optimized calendar utilization', 'Improved customer experience']
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-orange-500/10 pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-pink-400 to-orange-500 bg-clip-text text-transparent">
                AI Calling Agency
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Transform your business communications with intelligent AI-powered calling systems that generate leads and enhance customer experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-50">
              <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-600 rounded-xl font-semibold hover:from-pink-400 hover:to-orange-500 transition-all duration-300 transform hover:scale-105 relative z-50">
                Start Calling Campaign
              </button>
              <Link 
                to="/portfolio"
                className="px-8 py-4 border border-pink-400/30 rounded-xl font-semibold hover:bg-pink-500/10 transition-all duration-300 inline-flex items-center justify-center relative z-50"
                onClick={() => console.log('Portfolio link clicked')}
              >
                Listen to Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">AI Calling Capabilities</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Advanced AI technology that revolutionizes business communications.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-8 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-pink-400/50 transition-all duration-300">
                <feature.icon className="h-12 w-12 text-pink-400 mb-6" />
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Use Cases & Results</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See how AI calling transforms different aspects of your business.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="p-8 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-pink-400/50 transition-all duration-300">
                <h3 className="text-2xl font-bold mb-4 text-pink-400">{useCase.title}</h3>
                <p className="text-gray-300 mb-6">{useCase.description}</p>
                <div className="space-y-3">
                  {useCase.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center text-gray-400">
                      <div className="w-2 h-2 rounded-full bg-pink-400 mr-3"></div>
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500/10 to-orange-500/10 relative">
        <div className="absolute inset-0 pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-pink-400 mb-2">95%</div>
              <div className="text-gray-300">Call Completion Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-400 mb-2">3x</div>
              <div className="text-gray-300">Faster Lead Qualification</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-400 mb-2">24/7</div>
              <div className="text-gray-300">Availability</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-400 mb-2">70%</div>
              <div className="text-gray-300">Cost Reduction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Calling Strategy?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's implement AI calling solutions that drive results and scale your business.
          </p>
          <Link 
            to="/contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-600 rounded-xl font-semibold hover:from-pink-400 hover:to-orange-500 transition-all duration-300 transform hover:scale-105 relative z-50"
          >
            Start Your Campaign
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AiCallingPage;
