
import { Code, Globe, Zap, Shield, Users, TrendingUp } from 'lucide-react';

const WebAppsFeatures = () => {
  const features = [
    {
      icon: Code,
      title: 'Modern Tech Stack',
      description: 'Built with React, TypeScript, and the latest web technologies for optimal performance.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: Globe,
      title: 'Responsive Design',
      description: 'Pixel-perfect designs that work seamlessly across all devices and screen sizes.',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized for speed with advanced caching, lazy loading, and performance monitoring.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with SSL, data encryption, and regular security audits.',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: Users,
      title: 'Scalable Architecture',
      description: 'Built to grow with your business, handling increased traffic and user loads.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: TrendingUp,
      title: 'Analytics Integration',
      description: 'Comprehensive analytics and monitoring to track performance and user behavior.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <section className="py-20 bg-gray-900/70">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose Our Web Development?</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We deliver exceptional web applications that drive results and exceed expectations.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group relative p-8 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-cyan-400/50 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/60 to-gray-900/30 pointer-events-none"></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center mr-4">
                    <feature.icon className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebAppsFeatures;
