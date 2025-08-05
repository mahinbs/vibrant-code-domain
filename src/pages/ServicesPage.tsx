import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Code, 
  Smartphone, 
  Cloud, 
  Brain, 
  Zap, 
  Palette, 
  Database, 
  Bot, 
  Blocks, 
  Gamepad2, 
  Wifi, 
  BarChart3,
  DollarSign,
  Clock,
  ArrowRight,
  Search,
  Filter
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ServicesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const allServices = [
    // Development Services
    {
      id: "web-apps",
      category: "development",
      icon: Code,
      title: "Web Applications",
      description: "Custom web applications built with cutting-edge technologies and responsive design.",
      startingPrice: "$5,000",
      timeline: "4-12 weeks",
      color: "cyan",
      route: "/web-apps",
      popular: true
    },
    {
      id: "mobile-apps",
      category: "development",
      icon: Smartphone,
      title: "Mobile Applications",
      description: "Native and cross-platform mobile apps with intuitive user experiences.",
      startingPrice: "$10,000",
      timeline: "6-14 weeks",
      color: "purple",
      route: "/mobile-apps",
      popular: true
    },
    {
      id: "saas",
      category: "development",
      icon: Cloud,
      title: "SAAS Solutions",
      description: "Scalable software-as-a-service platforms with subscription management.",
      startingPrice: "$15,000",
      timeline: "8-16 weeks",
      color: "blue",
      route: "/saas",
      popular: true
    },
    {
      id: "blockchain",
      category: "development",
      icon: Blocks,
      title: "Blockchain Development",
      description: "Secure blockchain solutions and smart contract development.",
      startingPrice: "$20,000",
      timeline: "10-16 weeks",
      color: "yellow",
      route: "/blockchain-development"
    },
    {
      id: "ar-vr",
      category: "development",
      icon: Bot,
      title: "AR/VR Development",
      description: "Immersive augmented and virtual reality experiences.",
      startingPrice: "$25,000",
      timeline: "12-20 weeks",
      color: "green",
      route: "/ar-vr-development"
    },
    {
      id: "iot",
      category: "development",
      icon: Wifi,
      title: "IoT Development",
      description: "Connected device solutions and IoT ecosystem development.",
      startingPrice: "$15,000",
      timeline: "8-14 weeks",
      color: "orange",
      route: "/iot-development"
    },
    {
      id: "game",
      category: "development",
      icon: Gamepad2,
      title: "Game Development",
      description: "Engaging games for mobile, web, and desktop platforms.",
      startingPrice: "$18,000",
      timeline: "10-18 weeks",
      color: "red",
      route: "/game-development"
    },

    // AI Solutions
    {
      id: "ai-automation",
      category: "ai",
      icon: Zap,
      title: "AI Automation",
      description: "Custom AI solutions to automate workflows and enhance business processes.",
      startingPrice: "$12,000",
      timeline: "8-12 weeks",
      color: "green",
      route: "/ai-automation",
      popular: true
    },
    {
      id: "ai-calling",
      category: "ai",
      icon: Brain,
      title: "AI Calling Agency",
      description: "Intelligent call automation systems with natural language processing.",
      startingPrice: "$8,000",
      timeline: "6-10 weeks",
      color: "pink",
      route: "/ai-calling",
      popular: true
    },
    {
      id: "ai-development",
      category: "ai",
      icon: Brain,
      title: "AI Development",
      description: "Custom AI models and machine learning solutions for your business.",
      startingPrice: "$20,000",
      timeline: "10-16 weeks",
      color: "purple",
      route: "/ai-development"
    },
    {
      id: "chatbot",
      category: "ai",
      icon: Bot,
      title: "Chatbot Development",
      description: "Intelligent chatbots for customer service and lead generation.",
      startingPrice: "$6,000",
      timeline: "4-8 weeks",
      color: "blue",
      route: "/chatbot-development"
    },

    // Design & Analytics
    {
      id: "uxui-design",
      category: "design",
      icon: Palette,
      title: "UX/UI Design",
      description: "User-centered design solutions that drive engagement and conversions.",
      startingPrice: "$4,000",
      timeline: "3-8 weeks",
      color: "pink",
      route: "/uxui-design"
    },
    {
      id: "data-analytics",
      category: "analytics",
      icon: BarChart3,
      title: "Data Analytics",
      description: "Transform your data into actionable insights and business intelligence.",
      startingPrice: "$8,000",
      timeline: "6-12 weeks",
      color: "cyan",
      route: "/data-analytics"
    },

    // Infrastructure
    {
      id: "cloud-computing",
      category: "infrastructure",
      icon: Cloud,
      title: "Cloud Computing",
      description: "Scalable cloud infrastructure and migration services.",
      startingPrice: "$10,000",
      timeline: "6-14 weeks",
      color: "blue",
      route: "/cloud-computing"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Services', count: allServices.length },
    { id: 'development', name: 'Development', count: allServices.filter(s => s.category === 'development').length },
    { id: 'ai', name: 'AI Solutions', count: allServices.filter(s => s.category === 'ai').length },
    { id: 'design', name: 'Design', count: allServices.filter(s => s.category === 'design').length },
    { id: 'analytics', name: 'Analytics', count: allServices.filter(s => s.category === 'analytics').length },
    { id: 'infrastructure', name: 'Infrastructure', count: allServices.filter(s => s.category === 'infrastructure').length }
  ];

  const colorClasses = {
    cyan: {
      border: "border-cyan-400/30",
      gradient: "from-cyan-400/10 to-cyan-600/10",
      icon: "bg-cyan-500/10 text-cyan-400 border-cyan-400/30",
      text: "text-cyan-400",
      button: "bg-cyan-500/20 border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/30"
    },
    blue: {
      border: "border-blue-400/30",
      gradient: "from-blue-400/10 to-blue-600/10",
      icon: "bg-blue-500/10 text-blue-400 border-blue-400/30",
      text: "text-blue-400",
      button: "bg-blue-500/20 border-blue-400/30 text-blue-400 hover:bg-blue-500/30"
    },
    purple: {
      border: "border-purple-400/30",
      gradient: "from-purple-400/10 to-purple-600/10",
      icon: "bg-purple-500/10 text-purple-400 border-purple-400/30",
      text: "text-purple-400",
      button: "bg-purple-500/20 border-purple-400/30 text-purple-400 hover:bg-purple-500/30"
    },
    pink: {
      border: "border-pink-400/30",
      gradient: "from-pink-400/10 to-pink-600/10",
      icon: "bg-pink-500/10 text-pink-400 border-pink-400/30",
      text: "text-pink-400",
      button: "bg-pink-500/20 border-pink-400/30 text-pink-400 hover:bg-pink-500/30"
    },
    green: {
      border: "border-green-400/30",
      gradient: "from-green-400/10 to-green-600/10",
      icon: "bg-green-500/10 text-green-400 border-green-400/30",
      text: "text-green-400",
      button: "bg-green-500/20 border-green-400/30 text-green-400 hover:bg-green-500/30"
    },
    yellow: {
      border: "border-yellow-400/30",
      gradient: "from-yellow-400/10 to-yellow-600/10",
      icon: "bg-yellow-500/10 text-yellow-400 border-yellow-400/30",
      text: "text-yellow-400",
      button: "bg-yellow-500/20 border-yellow-400/30 text-yellow-400 hover:bg-yellow-500/30"
    },
    orange: {
      border: "border-orange-400/30",
      gradient: "from-orange-400/10 to-orange-600/10",
      icon: "bg-orange-500/10 text-orange-400 border-orange-400/30",
      text: "text-orange-400",
      button: "bg-orange-500/20 border-orange-400/30 text-orange-400 hover:bg-orange-500/30"
    },
    red: {
      border: "border-red-400/30",
      gradient: "from-red-400/10 to-red-600/10",
      icon: "bg-red-500/10 text-red-400 border-red-400/30",
      text: "text-red-400",
      button: "bg-red-500/20 border-red-400/30 text-red-400 hover:bg-red-500/30"
    }
  };

  const filteredServices = allServices.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularServices = allServices.filter(service => service.popular);

  return (
    <div 
      className="min-h-screen bg-black text-white"
      style={{
        backgroundImage: 'url("https://res.cloudinary.com/dknafpppp/image/upload/v1748805697/108518_1_rnyk78.jpg")',
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
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                All Services
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Discover our comprehensive range of cutting-edge development and AI solutions designed to transform your business.
            </p>
            
            {/* Search and Filter */}
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-900/80 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services */}
      {popularServices.length > 0 && (
        <section className="py-20 bg-black/80 border-t border-cyan-400/10">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-cyan-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                Popular Services
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Our most requested services that have delivered exceptional results for businesses worldwide.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {popularServices.map((service) => {
                const colors = colorClasses[service.color];
                return (
                  <Card key={service.id} className={`bg-gray-900/80 backdrop-blur-sm border ${colors.border} hover:bg-gray-800/90 transition-all duration-300 group relative overflow-hidden`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-50`}></div>
                    <CardHeader className="relative z-10">
                      <div className={`w-16 h-16 rounded-xl ${colors.icon} border flex items-center justify-center mb-4`}>
                        <service.icon className="h-8 w-8" />
                      </div>
                      <CardTitle className={`text-xl font-bold text-white group-hover:${colors.text} transition-colors`}>
                        {service.title}
                      </CardTitle>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className={`flex items-center space-x-1 ${colors.text}`}>
                          <DollarSign className="h-4 w-4" />
                          <span>{service.startingPrice}</span>
                        </div>
                        <div className={`flex items-center space-x-1 ${colors.text}`}>
                          <Clock className="h-4 w-4" />
                          <span>{service.timeline}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <CardDescription className="text-gray-300 mb-6">
                        {service.description}
                      </CardDescription>
                      <div className="flex space-x-3">
                        <Link
                          to={service.route}
                          className={`flex-1 inline-flex items-center justify-center px-4 py-2 rounded-lg ${colors.button} border font-medium transition-all duration-300 group`}
                        >
                          <span>Learn More</span>
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                          to="/contact#form"
                          className={`px-4 py-2 rounded-lg border ${colors.border} ${colors.text} hover:bg-gray-700/50 transition-all duration-300 font-medium`}
                        >
                          Quote
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-8 bg-black/80 border-t border-gray-700/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-cyan-500/20 border-cyan-400/30 text-cyan-400 border'
                    : 'bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:border-gray-500 border'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* All Services Grid */}
      <section className="py-20 bg-black/80 border-t border-gray-700/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              All <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Browse our complete portfolio of development and technology services.
            </p>
          </div>
          
          {filteredServices.length === 0 ? (
            <div className="text-center py-16">
              <Filter className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No services found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredServices.map((service) => {
                const colors = colorClasses[service.color];
                return (
                  <Card key={service.id} className={`bg-gray-900/80 backdrop-blur-sm border ${colors.border} hover:bg-gray-800/90 transition-all duration-300 group relative overflow-hidden h-full`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-30`}></div>
                    <CardHeader className="relative z-10">
                      <div className={`w-12 h-12 rounded-lg ${colors.icon} border flex items-center justify-center mb-4`}>
                        <service.icon className="h-6 w-6" />
                      </div>
                      <CardTitle className={`text-lg font-bold text-white group-hover:${colors.text} transition-colors mb-2`}>
                        {service.title}
                        {service.popular && (
                          <span className="ml-2 px-2 py-1 text-xs bg-yellow-500/20 text-yellow-400 border border-yellow-400/30 rounded-full">
                            Popular
                          </span>
                        )}
                      </CardTitle>
                      <div className="flex items-center space-x-3 text-xs">
                        <div className={`flex items-center space-x-1 ${colors.text}`}>
                          <DollarSign className="h-3 w-3" />
                          <span>{service.startingPrice}</span>
                        </div>
                        <div className={`flex items-center space-x-1 ${colors.text}`}>
                          <Clock className="h-3 w-3" />
                          <span>{service.timeline}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="relative z-10 flex-1 flex flex-col">
                      <CardDescription className="text-gray-300 mb-4 flex-1 text-sm">
                        {service.description}
                      </CardDescription>
                      <div className="flex space-x-2">
                        <Link
                          to={service.route}
                          className={`flex-1 inline-flex items-center justify-center px-3 py-2 rounded-lg ${colors.button} border font-medium transition-all duration-300 text-sm group`}
                        >
                          <span>Details</span>
                          <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                          to="/contact#form"
                          className={`px-3 py-2 rounded-lg border ${colors.border} ${colors.text} hover:bg-gray-700/50 transition-all duration-300 font-medium text-sm`}
                        >
                          Quote
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 relative">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and find the perfect solution for your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact#form"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 font-medium shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105"
            >
              <span>Start Your Project</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link 
              to="/portfolio"
              className="inline-flex items-center space-x-2 bg-gray-800/50 border border-gray-600 text-gray-300 px-8 py-4 rounded-xl hover:bg-gray-700/50 hover:border-gray-500 transition-all duration-300 font-medium"
            >
              <span>View Our Work</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;