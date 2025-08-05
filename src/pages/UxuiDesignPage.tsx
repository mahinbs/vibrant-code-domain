import { Palette, Figma, Users, Eye, Smartphone, Monitor } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const UxuiDesignPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/contact#form');
  };

  const features = [
    {
      icon: Palette,
      title: 'Visual Design',
      description: 'Creating stunning interfaces with modern design principles, color theory, and typography.'
    },
    {
      icon: Figma,
      title: 'Design Systems',
      description: 'Comprehensive design systems that ensure consistency across all touchpoints.'
    },
    {
      icon: Users,
      title: 'User Research',
      description: 'In-depth user research and persona development to understand your target audience.'
    },
    {
      icon: Eye,
      title: 'Usability Testing',
      description: 'Rigorous testing to ensure optimal user experience and accessibility compliance.'
    },
    {
      icon: Smartphone,
      title: 'Mobile-First Design',
      description: 'Responsive designs optimized for mobile devices and all screen sizes.'
    },
    {
      icon: Monitor,
      title: 'Prototyping',
      description: 'Interactive prototypes to validate concepts before development begins.'
    }
  ];

  const process = [
    { step: '01', title: 'Research', description: 'User research, competitive analysis, and requirement gathering' },
    { step: '02', title: 'Wireframing', description: 'Information architecture and low-fidelity wireframes' },
    { step: '03', title: 'Design', description: 'High-fidelity mockups and visual design creation' },
    { step: '04', title: 'Prototype', description: 'Interactive prototypes and user testing' },
    { step: '05', title: 'Deliver', description: 'Design handoff with complete documentation and assets' }
  ];

  return (
    <div 
      className="min-h-screen bg-black text-white"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
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
              <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                UX/UI Design
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Create exceptional user experiences with data-driven design that converts visitors into customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleGetStarted}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl font-semibold hover:from-pink-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105"
              >
                Start Your Design Project
              </button>
              <Link 
                to="/portfolio"
                className="px-8 py-4 border border-pink-400/30 rounded-xl font-semibold hover:bg-pink-500/10 transition-all duration-300 inline-flex items-center justify-center"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Design Excellence</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our comprehensive design approach ensures your product delivers exceptional user experiences.
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

      {/* Process Section */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Design Process</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A proven methodology that ensures exceptional design outcomes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
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
      <section className="py-20 bg-gradient-to-r from-pink-500/20 to-purple-500/20 relative">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your User Experience?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's create designs that your users will love and that drive real business results.
          </p>
          <button 
            onClick={handleGetStarted}
            className="inline-block px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl font-semibold hover:from-pink-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105"
          >
            Get Started Today
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UxuiDesignPage;