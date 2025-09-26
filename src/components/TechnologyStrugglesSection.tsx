import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, AlertTriangle, TrendingDown, Clock, DollarSign } from 'lucide-react';

const TechnologyStrugglesSection = () => {
  const struggles = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Outdated Systems Slowing You Down?",
      description: "Legacy software that takes forever to load, crashes frequently, and makes simple tasks complicated."
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Expensive Tech That Doesn't Deliver?",
      description: "Paying premium prices for software that lacks essential features and requires constant workarounds."
    },
    {
      icon: <TrendingDown className="w-6 h-6" />,
      title: "Missing Growth Opportunities?",
      description: "Manual processes and disconnected systems preventing you from scaling your business effectively."
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Security Vulnerabilities Keeping You Up?",
      description: "Worrying about data breaches, compliance issues, and outdated security measures protecting your business."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-red-950/30 via-black to-red-950/30 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-orange-500/5"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-red-500/20 border border-red-400/30 rounded-full text-red-300 text-sm font-medium mb-4">
            🚨 Technology Pain Points
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Struggling With Technology That Holds Your Business Back?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            You're not alone. Most businesses are trapped by technology that costs more, delivers less, and creates more problems than it solves.
          </p>
        </div>

        {/* Struggles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {struggles.map((struggle, index) => (
            <div key={index} className="bg-black/40 border border-red-500/20 rounded-xl p-6 hover:border-red-400/40 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center text-red-400">
                  {struggle.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-red-200">{struggle.title}</h3>
                  <p className="text-gray-400">{struggle.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Solution Bridge */}
        <div className="bg-gradient-to-r from-black/60 to-gray-900/60 border border-cyan-500/20 rounded-2xl p-8 text-center">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            There's a Better Way Forward
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Stop letting technology hold you back. Get a free tech audit and discover how modern solutions can transform your business.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Get Free Tech Audit <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/10 px-8 py-4 rounded-xl font-semibold transition-all duration-300"
            >
              See Success Stories
            </Button>
          </div>

          <div className="flex justify-center items-center space-x-8 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <span className="text-green-400">✓</span>
              <span>Free Analysis</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-400">✓</span>
              <span>Custom Solutions</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-400">✓</span>
              <span>Proven Results</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyStrugglesSection;