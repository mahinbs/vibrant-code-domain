import { Gamepad2, Users, Zap, Trophy, Smartphone, Monitor } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServicePortfolioSection from '@/components/ServicePortfolioSection';
import ServiceCaseStudiesSection from '@/components/ServiceCaseStudiesSection';
import ServicePricingSection from '@/components/ServicePricingSection';

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

  const caseStudies = [
    {
      client: "PixelForge Studios",
      industry: "Gaming & Entertainment",
      challenge: "Needed to create a cross-platform multiplayer game with complex physics and real-time networking within a tight 8-month deadline.",
      solution: "Developed using Unity with custom networking solution, optimized for mobile and PC with cloud-based matchmaking and anti-cheat systems.",
      results: ["500K+ downloads in first month", "4.8/5 store rating", "Cross-platform compatibility", "Low latency multiplayer"],
      testimonial: "The team delivered an incredible multiplayer experience that exceeded our expectations. The game's performance across platforms is outstanding and our players love it.",
      clientName: "Alex Rivera",
      clientRole: "Game Director",
      clientImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      duration: "8 months",
      teamSize: "12 specialists"
    },
    {
      client: "EduPlay Interactive",
      industry: "Education Technology",
      challenge: "Creating an engaging educational game for children that balances learning with fun gameplay, targeting multiple age groups.",
      solution: "Built adaptive learning game with progressive difficulty, gamification elements, and detailed progress tracking for parents and teachers.",
      results: ["85% learning retention rate", "Used in 200+ schools", "Parent satisfaction 4.9/5", "Multiple education awards"],
      testimonial: "This educational game has transformed how children in our schools learn. The engagement levels are incredible and the learning outcomes speak for themselves.",
      clientName: "Dr. Sarah Kim",
      clientRole: "Educational Director",
      clientImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      duration: "10 months",
      teamSize: "8 specialists"
    }
  ];

  const pricingTiers = [
    {
      name: "Indie Game",
      price: "$25,000",
      description: "Perfect for small indie game projects and prototypes",
      features: [
        "2D game development",
        "Single platform (mobile or PC)",
        "Basic gameplay mechanics",
        "Art assets included",
        "Store submission support",
        "3 months post-launch support"
      ],
      popular: false
    },
    {
      name: "Studio Pro",
      price: "$75,000",
      description: "Comprehensive game development for growing studios",
      features: [
        "3D game development",
        "Cross-platform deployment",
        "Multiplayer capabilities",
        "Advanced graphics & effects",
        "Monetization integration",
        "Marketing support",
        "6 months post-launch support",
        "Live operations setup"
      ],
      popular: true
    },
    {
      name: "AAA Production",
      price: "Custom",
      description: "Full-scale game production for major releases",
      features: [
        "Custom game engine options",
        "Advanced AI & physics",
        "Console certification",
        "Dedicated development team",
        "Quality assurance testing",
        "Marketing & PR support",
        "12 months post-launch support",
        "Live service management"
      ],
      popular: false
    }
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
        <div className="absolute inset-0 bg-black/65"></div>
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

      {/* Portfolio Section */}
      <ServicePortfolioSection 
        serviceId="game-development"
        serviceName="Game Development"
        accentColor="red"
      />

      {/* Case Studies Section */}
      <ServiceCaseStudiesSection 
        serviceName="Game Development"
        caseStudies={caseStudies}
        accentColor="text-red-400"
      />

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

      {/* Pricing Section */}
      <ServicePricingSection 
        serviceName="Game Development"
        pricingTiers={pricingTiers}
        accentColor="text-red-400"
      />

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