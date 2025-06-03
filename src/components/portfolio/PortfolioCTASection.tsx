
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';

const PortfolioCTASection = () => {
  return (
    <div className="text-center mt-24 bg-gradient-to-r from-gray-900/50 to-black/50 rounded-3xl p-12 border border-gray-700/30">
      <h3 className="text-4xl font-bold text-white mb-6">
        Ready to Start Your <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Next Project?</span>
      </h3>
      <p className="text-gray-300 mb-8 max-w-3xl mx-auto text-lg leading-relaxed">
        Let's discuss how we can bring your vision to life with cutting-edge technology and expert craftsmanship. 
        Join our growing list of satisfied clients.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link 
          to="/#contact"
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 font-medium shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105"
        >
          <span>Get Started Today</span>
          <ArrowRight className="h-5 w-5" />
        </Link>
        <Link 
          to="/#services"
          className="inline-flex items-center space-x-2 bg-gray-800/50 border border-gray-600 text-gray-300 px-8 py-4 rounded-xl hover:bg-gray-700/50 hover:border-gray-500 transition-all duration-300 font-medium"
        >
          <span>View Our Services</span>
          <ExternalLink className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};

export default PortfolioCTASection;
