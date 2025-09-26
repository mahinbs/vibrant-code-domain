import { Palette, Figma, Users, Eye, Smartphone, Monitor } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServicePortfolioSection from '@/components/ServicePortfolioSection';
import ServiceCaseStudiesSection from '@/components/ServiceCaseStudiesSection';
import ServicePricingSection from '@/components/ServicePricingSection';
import SimpleContactForm from '@/components/forms/SimpleContactForm';
import TestimonialsSection from '@/components/TestimonialsSection';

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

  const caseStudies = [
    {
      client: 'TechFlow Solutions',
      industry: 'SaaS Platform',
      challenge: 'Poor user experience causing 70% drop-off rate and low user engagement on their project management platform.',
      solution: 'Complete UX overhaul with user research, redesigned information architecture, and intuitive interface design.',
      results: [
        '65% reduction in user drop-off rate',
        '150% increase in user engagement',
        '40% faster task completion times',
        '90% user satisfaction score'
      ],
      testimonial: "The design transformation was incredible. Our users now love using our platform, and we've seen a massive improvement in retention.",
      clientName: 'Sarah Mitchell',
      clientRole: 'Head of Product, TechFlow Solutions',
      clientImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
      duration: '8 weeks',
      teamSize: '4 designers'
    },
    {
      client: 'RetailMax E-commerce',
      industry: 'E-commerce',
      challenge: 'Complex checkout process leading to 80% cart abandonment and poor mobile experience.',
      solution: 'Mobile-first design approach with streamlined checkout flow and accessibility improvements.',
      results: [
        '50% reduction in cart abandonment',
        '200% increase in mobile conversions',
        '99% accessibility compliance',
        '35% increase in overall revenue'
      ],
      testimonial: "Our mobile sales have tripled since the redesign. The user experience is now seamless across all devices.",
      clientName: 'Marcus Johnson',
      clientRole: 'CEO, RetailMax E-commerce',
      clientImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
      duration: '6 weeks',
      teamSize: '3 designers'
    }
  ];

  const pricingTiers = [
    {
      name: 'Startup',
      price: '$3,000',
      description: 'Essential design for new products',
      features: ['User Research & Analysis', 'Wireframing & Prototyping', 'UI Design (up to 10 screens)', 'Design System Basics', '2 Rounds of Revisions'],
      popular: false
    },
    {
      name: 'Growth',
      price: '$8,000',
      description: 'Comprehensive design solution',
      features: ['Complete UX Research', 'Advanced Prototyping', 'UI Design (up to 25 screens)', 'Complete Design System', 'Usability Testing', '4 Rounds of Revisions'],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Full-scale design transformation',
      features: ['Enterprise UX Strategy', 'Multi-platform Design', 'Advanced Design Systems', 'Accessibility Compliance', 'Ongoing Design Support', 'Unlimited Revisions'],
      popular: false
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
        backgroundImage: 'url("https://res.cloudinary.com/dqogq10ag/image/upload/v1754397189/gradient-ui-ux-elements-background_23-2149056159_yajapz.avif")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-center">
              <span className="bg-gradient-to-r from-pink-300 via-purple-500 via-pink-400 to-purple-400 bg-clip-text text-transparent inline-block animate-gradient bg-[length:400%_100%] typewriter">
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

      {/* Enquiry Form Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Create Stunning Designs?</h2>
            <p className="text-xl text-gray-300">
              Let's design user experiences that captivate and convert your audience.
            </p>
          </div>
          <SimpleContactForm sourcePage="uxui-design" className="max-w-2xl mx-auto" />
        </div>
      </section>

      {/* Portfolio Section */}
      <ServicePortfolioSection 
        serviceId="uxui-design" 
        serviceName="UX/UI Design"
        accentColor="pink"
      />

      {/* Case Studies Section */}
      <ServiceCaseStudiesSection 
        serviceName="UX/UI Design"
        caseStudies={caseStudies}
        accentColor="text-pink-400"
      />

      {/* Features Section */}
      <section className="py-20 bg-black/80 border-t border-pink-400/40">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-pink-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">Design Excellence</h2>
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
      <section className="py-20 bg-black/80 border-t border-pink-400/40">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-pink-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">Our Design Process</h2>
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

      {/* Pricing Section */}
      <ServicePricingSection 
        serviceName="UX/UI Design"
        pricingTiers={pricingTiers}
        accentColor="text-pink-400"
        buttonAccentColor="pink"
      />

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500/20 to-purple-500/20 relative">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-pink-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">Start Your Design Project</h2>
            <p className="text-xl text-gray-300">
              Let's create designs that your users will love and that drive real business results.
            </p>
          </div>
          <SimpleContactForm sourcePage="uxui-design-cta" className="max-w-2xl mx-auto" />
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      <Footer />
    </div>
  );
};

export default UxuiDesignPage;