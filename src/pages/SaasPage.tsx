
import { Cloud, CreditCard, BarChart3, Users, Settings, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SaasPage = () => {
  const features = [
    {
      icon: Cloud,
      title: 'Multi-Tenant Architecture',
      description: 'Scalable infrastructure that efficiently serves multiple customers from a single instance.'
    },
    {
      icon: CreditCard,
      title: 'Payment Integration',
      description: 'Seamless subscription management with Stripe, PayPal, and other payment gateways.'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Comprehensive analytics to track user behavior, revenue, and business metrics.'
    },
    {
      icon: Users,
      title: 'User Management',
      description: 'Advanced user roles, permissions, and team collaboration features.'
    },
    {
      icon: Settings,
      title: 'API Integration',
      description: 'RESTful APIs and webhooks for seamless third-party integrations.'
    },
    {
      icon: Zap,
      title: 'Auto-Scaling',
      description: 'Cloud infrastructure that automatically scales based on demand.'
    }
  ];

  const pricingTiers = [
    {
      name: 'Startup',
      price: '$5,000',
      description: 'Perfect for early-stage businesses',
      features: ['Basic SAAS Foundation', 'User Authentication', 'Payment Integration', '3 Months Support']
    },
    {
      name: 'Growth',
      price: '$15,000',
      description: 'For growing businesses',
      features: ['Advanced Features', 'Analytics Dashboard', 'API Development', 'Team Collaboration', '6 Months Support'],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations',
      features: ['Custom Development', 'Advanced Security', 'Dedicated Support', 'Custom Integrations', '12 Months Support']
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                SAAS Solutions
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Build scalable software-as-a-service platforms with subscription management, multi-tenancy, and enterprise features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold hover:from-blue-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105">
                Start Building
              </button>
              <button className="px-8 py-4 border border-blue-400/30 rounded-xl font-semibold hover:bg-blue-500/10 transition-all duration-300">
                View Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">SAAS Platform Features</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to launch and scale your software-as-a-service business.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-8 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-blue-400/50 transition-all duration-300">
                <feature.icon className="h-12 w-12 text-blue-400 mb-6" />
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">SAAS Development Packages</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose the perfect package for your SAAS project requirements.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <div key={index} className={`p-8 rounded-2xl border ${tier.popular ? 'border-blue-400 bg-blue-500/10' : 'border-gray-700 bg-gray-800/50'} relative`}>
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <div className="text-3xl font-bold text-blue-400 mb-2">{tier.price}</div>
                <p className="text-gray-400 mb-6">{tier.description}</p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-300">
                      <div className="w-2 h-2 rounded-full bg-blue-400 mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                  tier.popular 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500' 
                    : 'border border-blue-400/30 hover:bg-blue-500/10'
                }`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Launch Your SAAS?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's build a scalable SAAS platform that grows with your business.
          </p>
          <Link 
            to="/contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold hover:from-blue-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105"
          >
            Start Your SAAS Journey
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SaasPage;
