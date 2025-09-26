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
      description: "Paying high monthly fees for software that doesn't meet your needs or integrate with your workflow."
    },
    {
      icon: <TrendingDown className="w-6 h-6" />,
      title: "Missing Out on Growth Opportunities?",
      description: "Competitors are moving faster because they have better technology while you're stuck with manual processes."
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Security Vulnerabilities Keeping You Up?",
      description: "Worried about data breaches, outdated security, and compliance issues that could destroy your reputation."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-orange-500/5 to-yellow-500/5"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-red-500/20 border border-red-400/30 rounded-full text-red-300 text-sm font-medium mb-6">
            <AlertTriangle className="w-4 h-4" />
            <span>Technology Pain Points</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Struggling With Technology That Holds Your Business Back?
          </h2>
          
          <p className="text-xl text-gray-300 leading-relaxed">
            You're not alone. 73% of businesses struggle with outdated technology that limits their growth potential. 
            Here's how we help companies break free from these common tech frustrations:
          </p>
        </div>

        {/* Struggles Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {struggles.map((struggle, index) => (
            <div
              key={index}
              className="group p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl hover:border-orange-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-3 bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-400/30 rounded-xl text-red-300 group-hover:text-orange-300 transition-colors">
                  {struggle.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-orange-100 transition-colors">
                    {struggle.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {struggle.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Solution Bridge */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-8 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-400/20 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4 text-white">
              Stop Letting Technology Hold You Back
            </h3>
            <p className="text-lg text-gray-300 mb-8">
              We specialize in modernizing outdated systems and creating custom solutions that actually work for your business. 
              Let's turn your technology from a roadblock into your competitive advantage.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span>Get Your Free Tech Audit</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-orange-400/30 text-orange-300 hover:bg-orange-500/10 px-8 py-4 rounded-xl"
              >
                See Success Stories
              </Button>
            </div>
            
            <div className="flex justify-center items-center space-x-8 mt-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <span className="text-green-400">✓</span>
                <span>Free Assessment</span>
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
      </div>
    </section>
  );
};

export default TechnologyStrugglesSection;