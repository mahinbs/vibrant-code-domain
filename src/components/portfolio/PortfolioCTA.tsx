
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface PortfolioCTAProps {
  isVisible: boolean;
}

const PortfolioCTA = ({ isVisible }: PortfolioCTAProps) => {
  return (
    <div className={`text-center mt-16 transition-all duration-700 delay-700 ${isVisible ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-3xl p-8 border border-gray-700/30">
        <h3 className="text-3xl font-bold text-white mb-4">
          Explore More <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Projects</span>
        </h3>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
          See our complete portfolio with detailed case studies and discover how we can bring your vision to life.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            to="/portfolio"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 font-medium shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105"
          >
            <span>View Full Portfolio</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link 
            to="/#contact"
            className="inline-flex items-center space-x-2 bg-gray-800/50 border border-gray-600 text-gray-300 px-6 py-3 rounded-xl hover:bg-gray-700/50 hover:border-gray-500 transition-all duration-300 font-medium"
          >
            <span>Start Your Project</span>
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCTA;
