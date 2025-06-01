
import { useState, useEffect } from 'react';
import { CheckCircle, Users, Target, Award, Code, Smartphone, Cloud, Brain, Zap, Star, Globe, TrendingUp, ArrowRight, Rocket } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('about');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const statistics = [
    { icon: Target, label: 'Successful Projects', value: '1,500+', color: 'cyan' },
    { icon: Users, label: 'Expert Team Members', value: '230+', color: 'blue' },
    { icon: Globe, label: 'Cities Worldwide', value: '56+', color: 'purple' },
    { icon: TrendingUp, label: 'Years of Innovation', value: '7+', color: 'pink' }
  ];

  const expertise = [
    {
      icon: Rocket,
      title: 'Product-Led Growth Approach',
      description: 'We don\'t just develop software—we build products with a clear growth strategy. Every feature, UI component, and integration is designed to improve user engagement, reduce friction, and drive measurable business outcomes.',
      color: 'cyan',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&q=80&auto=format&fit=crop'
    },
    {
      icon: Brain,
      title: 'Deep Tech + Business Understanding',
      description: 'Our strength lies in bridging the gap between technology and business. We deeply understand user psychology, business models, and market dynamics, allowing us to build systems that perform under real business pressure.',
      color: 'blue',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&auto=format&fit=crop'
    },
    {
      icon: Zap,
      title: 'Speed + Iteration Mastery',
      description: 'With 1500+ projects delivered, we\'ve refined the art of rapid prototyping, MVP development, and iterative scaling. Whether you\'re launching in 30 days or scaling to 1M users, our agile frameworks deliver results—fast.',
      color: 'purple',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80&auto=format&fit=crop'
    },
    {
      icon: Users,
      title: 'True Technology Partner',
      description: 'We don\'t work for our clients. We work with them—as partners. From ideation to launch and beyond, we embed ourselves in your mission and act as your extended tech team, not a vendor.',
      color: 'pink',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80&auto=format&fit=crop'
    },
    {
      icon: Target,
      title: 'Complex Problem Solving',
      description: 'From automating legacy business operations to building AI-powered workflows and integrating third-party APIs, we specialize in solving non-obvious, high-impact problems with elegant tech solutions.',
      color: 'cyan',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80&auto=format&fit=crop'
    },
    {
      icon: Globe,
      title: 'Global Delivery Mindset',
      description: 'With a presence in 56+ cities and clients across 10+ countries, we understand the nuances of building systems for global scale—languages, regulations, latency, user behavior, and infrastructure.',
      color: 'blue',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&q=80&auto=format&fit=crop'
    }
  ];

  const recognitions = [
    'Forbes',
    'Entrepreneur',
    'YourStory'
  ];

  const colorClasses = {
    cyan: {
      border: 'border-cyan-400/30',
      gradient: 'from-cyan-400/10 to-cyan-600/10',
      icon: 'bg-cyan-500/10 text-cyan-400 border-cyan-400/30',
      text: 'text-cyan-400',
      tag: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      overlay: 'from-cyan-900/80 via-black/60 to-cyan-900/80'
    },
    blue: {
      border: 'border-blue-400/30',
      gradient: 'from-blue-400/10 to-blue-600/10',
      icon: 'bg-blue-500/10 text-blue-400 border-blue-400/30',
      text: 'text-blue-400',
      tag: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      overlay: 'from-blue-900/80 via-black/60 to-blue-900/80'
    },
    purple: {
      border: 'border-purple-400/30',
      gradient: 'from-purple-400/10 to-purple-600/10',
      icon: 'bg-purple-500/10 text-purple-400 border-purple-400/30',
      text: 'text-purple-400',
      tag: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      overlay: 'from-purple-900/80 via-black/60 to-purple-900/80'
    },
    pink: {
      border: 'border-pink-400/30',
      gradient: 'from-pink-400/10 to-pink-600/10',
      icon: 'bg-pink-500/10 text-pink-400 border-pink-400/30',
      text: 'text-pink-400',
      tag: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
      overlay: 'from-pink-900/80 via-black/60 to-pink-900/80'
    }
  };

  return (
    <section 
      id="about" 
      className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
      style={{
        backgroundImage: `url('/lovable-uploads/d0fa4f38-5951-4a69-9df8-13d4faa03aaa.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Enhanced Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-gray-900/75"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Boostmysites</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Founded in <span className="text-cyan-400 font-semibold">2017</span>, Boostmysites is a global software and AI solutions company on a mission to help businesses scale with powerful digital products.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {statistics.map((stat, index) => {
            const colors = colorClasses[stat.color];
            return (
              <div
                key={stat.label}
                className={`group relative rounded-2xl bg-gray-900/80 backdrop-blur-sm border ${colors.border} hover:bg-gray-800/90 transition-all duration-500 p-6 text-center hover:transform hover:scale-105`}
                style={{ animationDelay: `${index * 100 + 400}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl ${colors.icon} border flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className={`text-3xl font-bold ${colors.text} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Company Story */}
        <div className={`mb-16 transition-all duration-1000 delay-400 ${isVisible ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-700/30 p-8">
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Over the years, we've delivered <span className="text-cyan-400 font-semibold">1,500+ successful projects</span> across web applications, mobile apps, SaaS platforms, AI tools, and enterprise software systems.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              With a strong team of <span className="text-blue-400 font-semibold">230+ developers, designers, and strategists</span>, Boostmysites has become the go-to technology partner for startups, SMEs, and global enterprises alike. We specialize in building future-ready products using the latest in AI, automation, and full-stack development.
            </p>
          </div>
        </div>

        {/* Expertise Areas */}
        <div className={`mb-16 transition-all duration-1000 delay-600 ${isVisible ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Our <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Expertise</span>
            </h3>
            <p className="text-gray-400 max-w-3xl mx-auto">
              At Boostmysites, expertise isn't just about the tools we use—it's about how we think, solve problems, and build systems that drive real-world outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertise.map((item, index) => {
              const colors = colorClasses[item.color];
              return (
                <div
                  key={item.title}
                  className={`group relative rounded-2xl border ${colors.border} hover:transform hover:scale-105 transition-all duration-500 overflow-hidden h-80`}
                  style={{ animationDelay: `${index * 100 + 800}ms` }}
                >
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.overlay} transition-opacity duration-500 group-hover:opacity-90`} />
                  
                  {/* Content */}
                  <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                    <div>
                      <div className={`w-12 h-12 rounded-xl ${colors.icon} border flex items-center justify-center mb-4 backdrop-blur-sm`}>
                        <item.icon className="h-6 w-6" />
                      </div>
                      <h4 className={`text-xl font-bold text-white mb-3 group-hover:${colors.text} transition-colors duration-300`}>
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-gray-200 group-hover:text-white transition-colors duration-300 leading-relaxed text-sm backdrop-blur-sm bg-black/20 p-3 rounded-lg">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Global Presence & Recognition */}
        <div className={`grid md:grid-cols-2 gap-8 mb-16 transition-all duration-1000 delay-800 ${isVisible ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Global Presence */}
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-700/30 p-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-400/30 flex items-center justify-center">
                <Globe className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white">Global Reach</h4>
                <p className="text-purple-400">Worldwide Operations</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Today, Boostmysites operates across <span className="text-purple-400 font-semibold">56+ cities worldwide</span>, empowering clients with not just code, but complete business ecosystems — from product design and development to deployment, branding, and growth marketing.
            </p>
          </div>

          {/* Recognition */}
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-700/30 p-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-400/30 flex items-center justify-center">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white">Recognition</h4>
                <p className="text-pink-400">Industry Leaders</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              We are proud to have been featured in:
            </p>
            <div className="flex flex-wrap gap-2">
              {recognitions.map((publication, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full text-sm bg-pink-500/20 text-pink-300 border border-pink-500/30 font-medium">
                  {publication}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Mission Statement CTA */}
        <div className={`text-center transition-all duration-1000 delay-1000 ${isVisible ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-3xl p-8 border border-gray-700/30">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Mission: <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Build Smarter, Scale Faster</span>
            </h3>
            <p className="text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed">
              We continue to innovate with one goal: empowering businesses to build smarter solutions and scale faster than ever before.
            </p>
            <button className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 font-medium shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105">
              <span>Start Your Project</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
