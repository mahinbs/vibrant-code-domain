import React from 'react';
import { AlertTriangle, Clock, TrendingDown, Shield, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TechnologyStrugglesSection = () => {
  const navigate = useNavigate();

  const handleGetHelp = () => {
    navigate('/contact#form');
  };

  const struggles = [
    {
      icon: Clock,
      title: "Outdated Systems Slowing You Down",
      description: "Legacy software that takes forever to load, crashes frequently, and makes simple tasks complicated"
    },
    {
      icon: TrendingDown,
      title: "Lost Revenue from Poor Performance",
      description: "Slow websites, buggy apps, and system downtime directly costing you customers and sales"
    },
    {
      icon: AlertTriangle,
      title: "Security Vulnerabilities Keeping You Awake",
      description: "Worried about data breaches, outdated security protocols, and compliance issues threatening your business"
    },
    {
      icon: Zap,
      title: "Manual Processes Eating Your Time",
      description: "Repetitive tasks that should be automated, spreadsheet chaos, and inefficient workflows draining productivity"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Dark gradient background matching other sections */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-orange-500/5 to-red-500/5 pointer-events-none"></div>
      
      {/* Geometric patterns */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-red-400/10 to-orange-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tl from-orange-400/10 to-red-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-red-500/20 border border-red-400/30 rounded-full text-red-300 text-sm font-medium mb-6">
            ⚠️ Technology Pain Points
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-red-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
              Struggling With Technology That Holds Your Business Back?
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            You're not alone. 73% of businesses lose revenue due to outdated technology, security issues, and inefficient processes.
          </p>
        </div>

        {/* Struggles Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {struggles.map((struggle, index) => {
            const IconComponent = struggle.icon;
            return (
              <div 
                key={index}
                className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-700/30 p-8 hover:border-red-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/10"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl border border-red-500/30 flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-red-400" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {struggle.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {struggle.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-red-500/10 via-orange-500/10 to-red-500/10 rounded-3xl border border-red-500/20 p-8 md:p-12 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-green-400" />
              <span className="text-green-400 font-semibold">Solution Available</span>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Stop Losing Money to Technology Problems
            </h3>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Get a <strong className="text-white">free technology audit</strong> and discover exactly what's holding your business back - plus a custom roadmap to fix it.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleGetHelp}
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl font-semibold hover:from-red-400 hover:to-orange-500 transition-all duration-300 transform hover:scale-105"
              >
                Get Your Free Tech Audit
              </button>
              <button 
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 border border-red-400/30 rounded-xl font-semibold hover:bg-red-500/10 transition-all duration-300 text-white"
              >
                See Our Solutions
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 mt-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Free 30-Min Consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>No Obligation</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Custom Action Plan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyStrugglesSection;