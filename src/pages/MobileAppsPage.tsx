import { Smartphone, Zap, Users, Shield, Globe, TrendingUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const MobileAppsPage = () => {
  const navigate = useNavigate();

  const handleStartDevelopment = () => {
    navigate('/contact#form');
  };

  const features = [
    {
      icon: Smartphone,
      title: 'Cross-Platform Development',
      description: 'Build once, deploy everywhere with React Native and Flutter technologies.'
    },
    {
      icon: Zap,
      title: 'Native Performance',
      description: 'Optimized performance that delivers smooth, responsive user experiences.'
    },
    {
      icon: Users,
      title: 'User-Centric Design',
      description: 'Intuitive interfaces designed with user experience and accessibility in mind.'
    },
    {
      icon: Shield,
      title: 'Secure & Compliant',
      description: 'Enterprise-grade security with data encryption and compliance standards.'
    },
    {
      icon: Globe,
      title: 'Offline Functionality',
      description: 'Apps that work seamlessly even without internet connectivity.'
    },
    {
      icon: TrendingUp,
      title: 'App Store Optimization',
      description: 'Optimized for app store discovery and maximum downloads.'
    }
  ];

  const platforms = [
    {
      name: 'iOS Development',
      description: 'Native iOS apps built with Swift and modern iOS frameworks',
      technologies: ['Swift', 'SwiftUI', 'Core Data', 'CloudKit']
    },
    {
      name: 'Android Development',
      description: 'Native Android apps using Kotlin and latest Android technologies',
      technologies: ['Kotlin', 'Jetpack Compose', 'Room Database', 'Firebase']
    },
    {
      name: 'Cross-Platform',
      description: 'Unified codebase for both iOS and Android platforms',
      technologies: ['React Native', 'Flutter', 'Expo', 'Xamarin']
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Mobile Applications
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Create powerful mobile experiences that engage users and drive business growth with native and cross-platform solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-50">
              <button 
                onClick={handleStartDevelopment}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl font-semibold hover:from-purple-400 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 relative z-50"
              >
                Start Development
              </button>
              <Link 
                to="/portfolio"
                className="px-8 py-4 border border-purple-400/30 rounded-xl font-semibold hover:bg-purple-500/10 transition-all duration-300 inline-flex items-center justify-center relative z-50"
                onClick={() => console.log('Portfolio link clicked')}
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Mobile App Features</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Cutting-edge mobile solutions that deliver exceptional user experiences.
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

      {/* Platforms Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Development Platforms</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We specialize in all major mobile development platforms and frameworks.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {platforms.map((platform, index) => (
              <div key={index} className="p-8 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-purple-400/50 transition-all duration-300">
                <h3 className="text-2xl font-bold mb-4 text-purple-400">{platform.name}</h3>
                <p className="text-gray-300 mb-6">{platform.description}</p>
                <div className="space-y-2">
                  {platform.technologies.map((tech, idx) => (
                    <div key={idx} className="inline-block bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm mr-2">
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-500/10 to-pink-500/10 relative">
        <div className="absolute inset-0 pointer-events-none"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4">Ready to Build Your Mobile App?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's create a mobile application that delights users and drives business success.
          </p>
          <Link 
            to="/contact#form"
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl font-semibold hover:from-purple-400 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 relative z-50"
          >
            Get Started
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MobileAppsPage;
