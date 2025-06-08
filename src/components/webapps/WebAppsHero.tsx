
import { Link } from 'react-router-dom';

const WebAppsHero = () => {
  return (
    <section className="pt-32 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 pointer-events-none"></div>
      <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Web Applications
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Transform your business with custom web applications built using cutting-edge technologies and modern development practices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-50">
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 relative z-50">
              Start Your Project
            </button>
            <Link 
              to="/portfolio"
              className="px-8 py-4 border border-cyan-400/30 rounded-xl font-semibold hover:bg-cyan-500/10 transition-all duration-300 inline-flex items-center justify-center relative z-50"
              onClick={() => console.log('Portfolio link clicked')}
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebAppsHero;
