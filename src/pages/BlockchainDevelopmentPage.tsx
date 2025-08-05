import { Shield, Coins, Link, Users, Zap, Lock } from 'lucide-react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServicePortfolioSection from '@/components/ServicePortfolioSection';
import ServiceCaseStudiesSection from '@/components/ServiceCaseStudiesSection';
import ServicePricingSection from '@/components/ServicePricingSection';

const BlockchainDevelopmentPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/contact#form');
  };

  const features = [
    {
      icon: Shield,
      title: 'Smart Contracts',
      description: 'Secure, automated contracts on Ethereum, Solana, and other blockchain networks.'
    },
    {
      icon: Coins,
      title: 'DeFi Solutions',
      description: 'Decentralized finance applications including DEXs, lending protocols, and yield farming.'
    },
    {
      icon: Link,
      title: 'NFT Platforms',
      description: 'Non-fungible token marketplaces and minting platforms with full blockchain integration.'
    },
    {
      icon: Users,
      title: 'DAO Development',
      description: 'Decentralized autonomous organizations with governance tokens and voting mechanisms.'
    },
    {
      icon: Zap,
      title: 'Layer 2 Solutions',
      description: 'Scaling solutions and sidechains for faster, cheaper blockchain transactions.'
    },
    {
      icon: Lock,
      title: 'Wallet Integration',
      description: 'Seamless integration with MetaMask, WalletConnect, and other crypto wallets.'
    }
  ];

  const process = [
    { step: '01', title: 'Architecture', description: 'Blockchain network selection and smart contract design' },
    { step: '02', title: 'Development', description: 'Smart contract coding and security implementation' },
    { step: '03', title: 'Testing', description: 'Comprehensive testing on testnets and security audits' },
    { step: '04', title: 'Deployment', description: 'Mainnet deployment and contract verification' },
    { step: '05', title: 'Maintenance', description: 'Ongoing monitoring and upgrade management' }
  ];

  return (
    <div 
      className="min-h-screen bg-black text-white"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
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
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Blockchain Development
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Build the future of decentralized applications with secure, scalable blockchain solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleGetStarted}
                className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl font-semibold hover:from-yellow-400 hover:to-orange-500 transition-all duration-300 transform hover:scale-105"
              >
                Start Blockchain Project
              </button>
              <RouterLink 
                to="/portfolio"
                className="px-8 py-4 border border-yellow-400/30 rounded-xl font-semibold hover:bg-yellow-500/10 transition-all duration-300 inline-flex items-center justify-center"
              >
                View DApps
              </RouterLink>
            </div>
          </div>
        </div>
      </section>

      <ServicePortfolioSection serviceId="blockchain-development" serviceName="Blockchain Development" />
      <ServiceCaseStudiesSection serviceName="Blockchain Development" caseStudies={[{client: 'CryptoFinance', industry: 'DeFi', challenge: 'Need secure DeFi platform', solution: 'Smart contract development', results: ['99.9% security', '$50M locked', '100k users', 'Zero hacks'], testimonial: "Secure and scalable DeFi platform", clientName: 'Alex Chen', clientRole: 'CTO, CryptoFinance', clientImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80', duration: '12 weeks', teamSize: '4 developers'}]} accentColor="text-yellow-400" />

      {/* Features Section */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Blockchain Technologies</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Complete blockchain development services for the decentralized future.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-8 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-yellow-400/50 transition-all duration-300">
                <feature.icon className="h-12 w-12 text-yellow-400 mb-6" />
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
            <h2 className="text-4xl font-bold mb-4">Our Blockchain Development Process</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Secure and efficient blockchain development from concept to deployment.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-500 to-orange-600 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServicePricingSection serviceName="Blockchain Development" pricingTiers={[{name: 'Smart Contract', price: '$20,000', description: 'Basic blockchain solution', features: ['Smart Contract Development', 'Security Audit', 'Testnet Deployment', 'Documentation'], popular: false}, {name: 'DeFi Platform', price: '$60,000', description: 'Complete DeFi solution', features: ['Advanced Smart Contracts', 'Frontend Development', 'Multi-chain Support', 'Security Audits', 'Liquidity Integration'], popular: true}, {name: 'Enterprise Blockchain', price: 'Custom', description: 'Full enterprise solution', features: ['Custom Blockchain', 'Enterprise Integration', 'Advanced Security', 'Dedicated Support'], popular: false}]} accentColor="text-yellow-400" />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 relative">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4">Ready to Build on Blockchain?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's create decentralized applications that revolutionize your industry.
          </p>
          <button 
            onClick={handleGetStarted}
            className="inline-block px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl font-semibold hover:from-yellow-400 hover:to-orange-500 transition-all duration-300 transform hover:scale-105"
          >
            Get Started Today
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlockchainDevelopmentPage;