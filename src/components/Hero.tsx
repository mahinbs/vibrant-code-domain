import { ArrowRight, Play } from 'lucide-react';
const Hero = () => {
  return <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
        <source src="https://res.cloudinary.com/dknafpppp/video/upload/v1748771996/0_Ai_Brain_1920x1080_quggeb.mp4" type="video/mp4" />
      </video>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      
      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in">
            The Future of
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse"> AI-Powered Software</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto opacity-90">
            We forge tomorrow's digital reality with cutting-edge AI, machine learning, and quantum-ready solutions. 
            Experience the next evolution of software development.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button className="group relative bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-5 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 font-semibold flex items-center space-x-3 shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105">
              <span>Launch Your Vision</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
            </button>
            <button className="group relative border-2 border-cyan-400/50 text-cyan-300 px-10 py-5 rounded-lg hover:bg-cyan-400/10 hover:border-cyan-300 transition-all duration-300 font-semibold flex items-center space-x-3 backdrop-blur-sm">
              <Play className="h-6 w-6" />
              <span>Neural Demo</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="text-center group cursor-pointer">
              <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-3 group-hover:text-cyan-300 transition-colors duration-300 animate-pulse">1 M+</div>
              <div className="text-gray-300 font-medium">AI Models Deployed</div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-3 group-hover:text-blue-300 transition-colors duration-300 animate-pulse">99.9%</div>
              <div className="text-gray-300 font-medium">Neural Accuracy</div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-3 group-hover:text-purple-300 transition-colors duration-300 animate-pulse">24/7</div>
              <div className="text-gray-300 font-medium">Quantum Support</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animated Particles */}
      <div className="absolute inset-0 z-15">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping animation-delay-1000"></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping animation-delay-2000"></div>
      </div>
    </section>;
};
export default Hero;