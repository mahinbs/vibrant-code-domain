import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, memo } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = memo(() => {
  const navigate = useNavigate();
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  const handleLaunchVision = () => {
    navigate('/contact#form');
  };

  // Initialize VANTA.WAVES background
  useEffect(() => {
    if (vantaRef.current && window.VANTA) {
      vantaEffect.current = window.VANTA.WAVES({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x16,
        shininess: 67.00,
        waveHeight: 18.00,
        waveSpeed: 0.90,
        zoom: 1.16
      });
    }

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, []);
  return <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden hero-section" style={{
    contain: 'layout style paint',
    contentVisibility: 'auto',
    containIntrinsicSize: '100vw 100vh'
  }}>
      {/* VANTA.WAVES Background */}
      <div ref={vantaRef} className="absolute inset-0 w-full h-full z-0"></div>
      
      {/* Optimized Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" style={{
      contain: 'layout style paint'
    }}></div>
      
      {/* Content with enhanced performance and proper spacing */}
      <div className="relative z-20 container mx-auto px-6 pb-24 pt-28" style={{
      contain: 'layout style paint'
    }}>
        <div className="max-w-4xl mx-auto text-center">
          {/* Main content with centered alignment */}
          <div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in gpu-accelerate">
              The Future of
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse"> AI-Powered Software</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto opacity-90">
              We forge tomorrow's digital reality with cutting-edge AI, machine learning, and quantum-ready solutions. 
              Experience the next evolution of software development.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button 
                onClick={handleLaunchVision}
                className="group relative bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-5 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 font-semibold flex items-center space-x-3 shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 gpu-accelerate"
              >
                <span>Launch Your Vision</span>
                <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20" style={{
            contain: 'layout style paint'
          }}>
              <div className="text-center group cursor-pointer gpu-accelerate">
                <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-3 group-hover:text-cyan-300 transition-colors duration-300">1 M+</div>
                <div className="text-gray-300 font-medium">AI Models Deployed</div>
              </div>
              <div className="text-center group cursor-pointer gpu-accelerate">
                <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-3 group-hover:text-blue-300 transition-colors duration-300">99.9%</div>
                <div className="text-gray-300 font-medium">Neural Accuracy</div>
              </div>
              <div className="text-center group cursor-pointer gpu-accelerate">
                <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-3 group-hover:text-purple-300 transition-colors duration-300">24/7</div>
                <div className="text-gray-300 font-medium">Quantum Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Optimized Animated Particles */}
      <div className="absolute inset-0 z-15" style={{
      contain: 'layout style paint'
    }}>
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-ping gpu-accelerate"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping animation-delay-1000 gpu-accelerate"></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping animation-delay-2000 gpu-accelerate"></div>
      </div>
    </section>;
});
Hero.displayName = 'Hero';
export default Hero;
