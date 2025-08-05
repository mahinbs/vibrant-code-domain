import { Gamepad2, Users, Zap, Trophy, Smartphone, Monitor } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const GameDevelopmentPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/contact#form');
  };

  const features = [
    {
      icon: Gamepad2,
      title: '2D/3D Game Development',
      description: 'Stunning games built with Unity, Unreal Engine, and custom game engines.'
    },
    {
      icon: Users,
      title: 'Multiplayer Gaming',
      description: 'Real-time multiplayer experiences with advanced networking and matchmaking.'
    },
    {
      icon: Zap,
      title: 'Cross-Platform',
      description: 'Deploy across PC, mobile, consoles, and web with optimized performance.'
    },
    {
      icon: Trophy,
      title: 'Game Monetization',
      description: 'In-app purchases, ads integration, and subscription-based revenue models.'
    },
    {
      icon: Smartphone,
      title: 'Mobile Gaming',
      description: 'Optimized mobile games for iOS and Android with touch controls and gestures.'
    },
    {
      icon: Monitor,
      title: 'PC & Console Games',
      description: 'High-performance games for Steam, PlayStation, Xbox, and Nintendo Switch.'
    }
  ];

  const process = [
    { step: '01', title: 'Concept', description: 'Game design document and creative direction' },
    { step: '02', title: 'Prototyping', description: 'Core gameplay mechanics and art style development' },
    { step: '03', title: 'Development', description: 'Full game development with regular milestone reviews' },
    { step: '04', title: 'Testing', description: 'QA testing, performance optimization, and bug fixes' },
    { step: '05', title: 'Launch', description: 'Store submission, marketing support, and post-launch updates' }
  ];

  return (
    <div 
      className="min-h-screen bg-black text-white"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
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
              <span className="bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
                Game Development
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Create engaging, immersive games that captivate players across all platforms and devices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleGetStarted}
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl font-semibold hover:from-red-400 hover:to-pink-500 transition-all duration-300 transform hover:scale-105"
              >
                Start Game Project
              </button>
              <Link 
                to="/portfolio"
                className="px-8 py-4 border border-red-400/30 rounded-xl font-semibold hover:bg-red-500/10 transition-all duration-300 inline-flex items-center justify-center"
              >
                View Game Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Game Development Expertise</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From indie games to AAA titles, we create memorable gaming experiences.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-8 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-red-400/50 transition-all duration-300">
                <feature.icon className="h-12 w-12 text-red-400 mb-6" />
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
            <h2 className="text-4xl font-bold mb-4">Our Game Development Process</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From concept to launch with industry-proven development methodologies.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
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
      <section className="py-20 bg-gradient-to-r from-red-500/20 to-pink-500/20 relative">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4">Ready to Create the Next Hit Game?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's bring your game idea to life with cutting-edge technology and creative excellence.
          </p>
          <button 
            onClick={handleGetStarted}
            className="inline-block px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl font-semibold hover:from-red-400 hover:to-pink-500 transition-all duration-300 transform hover:scale-105"
          >
            Get Started Today
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GameDevelopmentPage;