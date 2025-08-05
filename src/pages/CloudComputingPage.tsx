import { Cloud, Shield, Zap, Globe, Database, Settings } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServicePortfolioSection from '@/components/ServicePortfolioSection';
import ServiceCaseStudiesSection from '@/components/ServiceCaseStudiesSection';
import ServicePricingSection from '@/components/ServicePricingSection';

const CloudComputingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/contact#form');
  };

  const features = [
    {
      icon: Cloud,
      title: 'Cloud Migration',
      description: 'Seamlessly migrate your infrastructure to AWS, Azure, or Google Cloud with zero downtime.'
    },
    {
      icon: Shield,
      title: 'Security & Compliance',
      description: 'Enterprise-grade security with compliance for GDPR, HIPAA, and SOC2 standards.'
    },
    {
      icon: Zap,
      title: 'Auto-Scaling',
      description: 'Dynamic scaling based on demand to optimize performance and reduce costs.'
    },
    {
      icon: Globe,
      title: 'Global Infrastructure',
      description: 'Deploy across multiple regions for low latency and high availability worldwide.'
    },
    {
      icon: Database,
      title: 'Data Management',
      description: 'Advanced data backup, disaster recovery, and real-time synchronization solutions.'
    },
    {
      icon: Settings,
      title: 'DevOps Integration',
      description: 'CI/CD pipelines, containerization, and infrastructure as code implementation.'
    }
  ];

  const caseStudies = [
    {
      client: 'Enterprise Manufacturing Corp',
      industry: 'Manufacturing',
      challenge: 'Legacy on-premise infrastructure causing scalability issues and 40% higher operational costs.',
      solution: 'Complete cloud migration to AWS with microservices architecture and automated scaling.',
      results: [
        '60% reduction in infrastructure costs',
        '99.9% uptime improvement',
        '300% faster deployment cycles',
        '50% reduction in maintenance overhead'
      ],
      testimonial: "The cloud migration transformed our operations. We can now scale effortlessly and our costs have dropped significantly.",
      clientName: 'Robert Chen',
      clientRole: 'CTO, Enterprise Manufacturing Corp',
      clientImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
      duration: '12 weeks',
      teamSize: '5 engineers'
    },
    {
      client: 'HealthTech Solutions',
      industry: 'Healthcare',
      challenge: 'HIPAA compliance requirements and need for secure, scalable patient data management.',
      solution: 'Azure-based solution with end-to-end encryption, automated backups, and compliance monitoring.',
      results: [
        '100% HIPAA compliance achieved',
        'Zero security incidents',
        '40% faster data processing',
        '99.99% data availability'
      ],
      testimonial: "Security and compliance were our top priorities. The cloud solution exceeded our expectations on both fronts.",
      clientName: 'Dr. Emily Watson',
      clientRole: 'Chief Information Officer, HealthTech Solutions',
      clientImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
      duration: '16 weeks',
      teamSize: '6 engineers'
    }
  ];

  const pricingTiers = [
    {
      name: 'Migration Starter',
      price: '$8,000',
      description: 'Basic cloud migration for small teams',
      features: ['Infrastructure Assessment', 'Basic Migration Strategy', 'Single Cloud Provider Setup', 'Basic Security Configuration', '1 Month Support'],
      popular: false
    },
    {
      name: 'Enterprise Migration',
      price: '$25,000',
      description: 'Comprehensive cloud transformation',
      features: ['Complete Infrastructure Audit', 'Multi-Cloud Strategy', 'Advanced Security & Compliance', 'DevOps Integration', 'Load Balancing & Auto-scaling', '6 Months Support'],
      popular: true
    },
    {
      name: 'Custom Solution',
      price: 'Custom',
      description: 'Tailored for complex enterprises',
      features: ['Custom Architecture Design', 'Hybrid Cloud Solutions', 'Advanced Compliance (HIPAA, SOC2)', 'Disaster Recovery Planning', '24/7 Monitoring', '12 Months Dedicated Support'],
      popular: false
    }
  ];

  const process = [
    { step: '01', title: 'Assessment', description: 'Analyze current infrastructure and cloud readiness' },
    { step: '02', title: 'Strategy', description: 'Design cloud architecture and migration roadmap' },
    { step: '03', title: 'Migration', description: 'Execute phased migration with minimal disruption' },
    { step: '04', title: 'Optimization', description: 'Fine-tune performance and cost optimization' },
    { step: '05', title: 'Monitoring', description: 'Ongoing monitoring and maintenance support' }
  ];

  return (
    <div 
      className="min-h-screen bg-black text-white"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                Cloud Computing
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Scale your business with secure, reliable, and cost-effective cloud infrastructure solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleGetStarted}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl font-semibold hover:from-blue-400 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105"
              >
                Start Migration
              </button>
              <Link 
                to="/portfolio"
                className="px-8 py-4 border border-blue-400/30 rounded-xl font-semibold hover:bg-blue-500/10 transition-all duration-300 inline-flex items-center justify-center"
              >
                View Case Studies
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <ServicePortfolioSection 
        serviceId="cloud-computing" 
        serviceName="Cloud Computing"
        accentColor="blue"
      />

      {/* Case Studies Section */}
      <ServiceCaseStudiesSection 
        serviceName="Cloud Computing"
        caseStudies={caseStudies}
        accentColor="text-blue-400"
      />

      {/* Features Section */}
      <section className="py-20 bg-black/80">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-blue-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">Cloud Excellence</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive cloud services to power your digital transformation.
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

      {/* Process Section */}
      <section className="py-20 bg-black/80">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-blue-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">Our Cloud Migration Process</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A proven methodology ensuring smooth cloud transition.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
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
        serviceName="Cloud Computing"
        pricingTiers={pricingTiers}
        accentColor="text-blue-400"
        buttonAccentColor="blue"
      />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 relative">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4 text-blue-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">Ready to Migrate to the Cloud?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Transform your infrastructure with our expert cloud computing services.
          </p>
          <button 
            onClick={handleGetStarted}
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl font-semibold hover:from-blue-400 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105"
          >
            Get Started Today
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CloudComputingPage;