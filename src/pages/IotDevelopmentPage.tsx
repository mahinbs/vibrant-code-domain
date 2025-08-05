import { Wifi, Smartphone, Cloud, Shield, BarChart3, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const IotDevelopmentPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/contact#form');
  };

  const features = [
    {
      icon: Wifi,
      title: 'Device Connectivity',
      description: 'Seamless connectivity between IoT devices using WiFi, Bluetooth, LoRa, and cellular networks.'
    },
    {
      icon: Smartphone,
      title: 'Mobile Control Apps',
      description: 'Intuitive mobile applications to monitor and control IoT devices remotely.'
    },
    {
      icon: Cloud,
      title: 'Cloud Integration',
      description: 'Scalable cloud infrastructure for data storage, processing, and device management.'
    },
    {
      icon: Shield,
      title: 'Security & Privacy',
      description: 'End-to-end encryption and security protocols to protect IoT communications.'
    },
    {
      icon: BarChart3,
      title: 'Data Analytics',
      description: 'Real-time analytics and insights from IoT sensor data and device telemetry.'
    },
    {
      icon: Zap,
      title: 'Edge Computing',
      description: 'Local processing capabilities for faster response times and reduced latency.'
    }
  ];

  const process = [
    { step: '01', title: 'Planning', description: 'IoT architecture design and technology selection' },
    { step: '02', title: 'Hardware', description: 'Device prototyping and sensor integration' },
    { step: '03', title: 'Software', description: 'Firmware, mobile apps, and cloud platform development' },
    { step: '04', title: 'Testing', description: 'Device testing, connectivity validation, and security audits' },
    { step: '05', title: 'Deployment', description: 'Production deployment with monitoring and maintenance' }
  ];

  return (
    <div 
      className="min-h-screen bg-black text-white"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
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
              <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                IoT Development
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Connect the physical and digital worlds with intelligent IoT solutions and smart device ecosystems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleGetStarted}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl font-semibold hover:from-emerald-400 hover:to-teal-500 transition-all duration-300 transform hover:scale-105"
              >
                Start IoT Project
              </button>
              <Link 
                to="/portfolio"
                className="px-8 py-4 border border-emerald-400/30 rounded-xl font-semibold hover:bg-emerald-500/10 transition-all duration-300 inline-flex items-center justify-center"
              >
                View IoT Solutions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">IoT Technologies</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Complete IoT development services from devices to cloud platforms.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-8 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-emerald-400/50 transition-all duration-300">
                <feature.icon className="h-12 w-12 text-emerald-400 mb-6" />
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
            <h2 className="text-4xl font-bold mb-4">Our IoT Development Process</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              End-to-end IoT solution development from concept to deployment.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
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
      <section className="py-20 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 relative">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4">Ready to Build Smart Solutions?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's create IoT solutions that connect your business to the future of smart technology.
          </p>
          <button 
            onClick={handleGetStarted}
            className="inline-block px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl font-semibold hover:from-emerald-400 hover:to-teal-500 transition-all duration-300 transform hover:scale-105"
          >
            Get Started Today
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default IotDevelopmentPage;