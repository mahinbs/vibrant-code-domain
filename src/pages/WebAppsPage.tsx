
import { Code, Globe, Zap, Shield, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const WebAppsPage = () => {
  const features = [
    {
      icon: Code,
      title: 'Modern Tech Stack',
      description: 'Built with React, TypeScript, and the latest web technologies for optimal performance.'
    },
    {
      icon: Globe,
      title: 'Responsive Design',
      description: 'Pixel-perfect designs that work seamlessly across all devices and screen sizes.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized for speed with advanced caching, lazy loading, and performance monitoring.'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with SSL, data encryption, and regular security audits.'
    },
    {
      icon: Users,
      title: 'Scalable Architecture',
      description: 'Built to grow with your business, handling increased traffic and user loads.'
    },
    {
      icon: TrendingUp,
      title: 'Analytics Integration',
      description: 'Comprehensive analytics and monitoring to track performance and user behavior.'
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
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10"></div>
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105">
                Start Your Project
              </button>
              <button className="px-8 py-4 border border-cyan-400/30 rounded-xl font-semibold hover:bg-cyan-500/10 transition-all duration-300">
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Our Web Development?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We deliver exceptional web applications that drive results and exceed expectations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-8 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-cyan-400/50 transition-all duration-300">
                <feature.icon className="h-12 w-12 text-cyan-400 mb-6" />
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
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
      <section className="py-20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Build Something Amazing?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and create a web application that transforms your business.
          </p>
          <Link 
            to="/contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105"
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
