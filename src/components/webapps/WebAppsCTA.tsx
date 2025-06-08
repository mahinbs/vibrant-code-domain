
import { Link } from 'react-router-dom';

const WebAppsCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 relative">
      <div className="absolute inset-0 pointer-events-none"></div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl font-bold mb-4">Ready to Build Something Amazing?</h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Let's discuss your project and create a web application that transforms your business.
        </p>
        <Link 
          to="/contact"
          className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 relative z-50"
        >
          Get Started Today
        </Link>
      </div>
    </section>
  );
};

export default WebAppsCTA;
