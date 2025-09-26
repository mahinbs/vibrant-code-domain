
import { Zap, Brain, Settings, BarChart3, Shield, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceReviewsSection from "@/components/ServiceReviewsSection";
import SimpleContactForm from '@/components/forms/SimpleContactForm';
import TestimonialsSection from '@/components/TestimonialsSection';

const AiAutomationPage = () => {
  const features = [
    {
      icon: Brain,
      title: 'Machine Learning Models',
      description: 'Custom ML models trained on your data to automate complex decision-making processes.'
    },
    {
      icon: Zap,
      title: 'Process Automation',
      description: 'Streamline workflows and eliminate repetitive tasks with intelligent automation.'
    },
    {
      icon: BarChart3,
      title: 'Predictive Analytics',
      description: 'AI-powered insights that predict trends and optimize business operations.'
    },
    {
      icon: Settings,
      title: 'Integration Hub',
      description: 'Seamlessly connect with existing tools and systems through APIs and webhooks.'
    },
    {
      icon: Shield,
      title: 'Secure & Compliant',
      description: 'Enterprise-grade security with data privacy and regulatory compliance.'
    },
    {
      icon: Users,
      title: 'Human-in-the-Loop',
      description: 'Balanced automation that keeps humans in control of critical decisions.'
    }
  ];

  const automationTypes = [
    {
      title: 'Data Processing',
      description: 'Automated data collection, cleaning, and analysis',
      examples: ['Document processing', 'Data extraction', 'Report generation']
    },
    {
      title: 'Customer Service',
      description: 'AI-powered customer support automation',
      examples: ['Chatbots', 'Ticket routing', 'Response automation']
    },
    {
      title: 'Marketing Automation',
      description: 'Intelligent marketing campaign management',
      examples: ['Lead scoring', 'Content personalization', 'Campaign optimization']
    },
    {
      title: 'Operations Management',
      description: 'Streamlined business process automation',
      examples: ['Inventory management', 'Quality control', 'Resource allocation']
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                AI Automation
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Revolutionize your business operations with intelligent automation solutions that boost efficiency and drive growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-50">
              <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-semibold hover:from-green-400 hover:to-emerald-500 transition-all duration-300 transform hover:scale-105 relative z-50">
                Automate Your Business
              </button>
              <Link 
                to="/portfolio"
                className="px-8 py-4 border border-green-400/30 rounded-xl font-semibold hover:bg-green-500/10 transition-all duration-300 inline-flex items-center justify-center relative z-50"
                onClick={() => console.log('Portfolio link clicked')}
              >
                View Case Studies
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Form Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Automate Your Business?</h2>
            <p className="text-xl text-gray-300">
              Get started with AI automation solutions tailored to your needs.
            </p>
          </div>
          <SimpleContactForm sourcePage="ai-automation" className="max-w-2xl mx-auto" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">AI Automation Capabilities</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Cutting-edge AI solutions that transform how your business operates.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-8 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-green-400/50 transition-all duration-300">
                <feature.icon className="h-12 w-12 text-green-400 mb-6" />
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Automation Types Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Automation Solutions</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive automation solutions tailored to your industry and business needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {automationTypes.map((type, index) => (
              <div key={index} className="p-8 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-green-400/50 transition-all duration-300">
                <h3 className="text-2xl font-bold mb-4 text-green-400">{type.title}</h3>
                <p className="text-gray-300 mb-6">{type.description}</p>
                <div className="space-y-2">
                  {type.examples.map((example, idx) => (
                    <div key={idx} className="flex items-center text-gray-400">
                      <div className="w-2 h-2 rounded-full bg-green-400 mr-3"></div>
                      {example}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-20 bg-gradient-to-r from-green-500/10 to-emerald-500/10 relative">
        <div className="absolute inset-0 pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Automation ROI</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See the measurable impact of AI automation on your business.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">80%</div>
              <div className="text-gray-300">Time Savings</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">60%</div>
              <div className="text-gray-300">Cost Reduction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">99.9%</div>
              <div className="text-gray-300">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">24/7</div>
              <div className="text-gray-300">Operation</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Reviews Section */}
      <ServiceReviewsSection
        serviceName="AI Automation"
        accentColor="green"
        reviews={[
          {
            id: 1,
            name: "Ali R.",
            role: "CTO",
            company: "Medicare Desk",
            rating: 5,
            review:
              "They automated internal workflows end-to-end. Our operations are lightning-fast and error rates have plummeted.",
            image:
              "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop&crop=face",
          },
          {
            id: 2,
            name: "Megha S.",
            role: "Co-founder",
            company: "LearnChamp",
            rating: 5,
            review:
              "Lead qualification went from hours to minutes. The automation stack integrates perfectly with our CRM.",
            image:
              "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
          },
          {
            id: 3,
            name: "Junaid A.",
            role: "CTO",
            company: "BizPulse",
            rating: 5,
            review:
              "Custom automation engine pulls data, triggers workflows, and sends AI-written emails—total lifesaver.",
            image:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
          },
        ]}
      />

      {/* Final CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Transform Your Operations Today</h2>
            <p className="text-xl text-gray-300">
              Let's implement AI automation solutions that transform your operations and accelerate growth.
            </p>
          </div>
          <SimpleContactForm sourcePage="ai-automation-cta" className="max-w-2xl mx-auto" />
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      <Footer />
    </div>
  );
};

export default AiAutomationPage;
