import { Cloud, Shield, Zap, Globe, Database, Settings } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
        <div className="absolute inset-0 bg-black/50"></div>
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

      {/* Features Section */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Cloud Excellence</h2>
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
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Cloud Migration Process</h2>
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 relative">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4">Ready to Migrate to the Cloud?</h2>
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