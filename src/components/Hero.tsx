import { ArrowRight } from "lucide-react";
import { useEffect, useRef, memo } from "react";
import { useNavigate } from "react-router-dom";

const Hero = memo(() => {
  const navigate = useNavigate();
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  const handleGetConsultation = () => {
    const element = document.getElementById('contact-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Initialize VANTA.WAVES background
  useEffect(() => {
    if (vantaRef.current && window.VANTA) {
      vantaEffect.current = window.VANTA.WAVES({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x16,
        shininess: 67.0,
        waveHeight: 18.0,
        waveSpeed: 0.9,
        zoom: 1.16,
      });
    }

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, []);
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-section pb-24 bg-black"
      style={{
        contain: "layout style paint",
        contentVisibility: "auto",
        containIntrinsicSize: "100vw 100vh",
      }}
    >
        {/* VANTA.WAVES Background */}
        <div
          ref={vantaRef}
          className="w-full h-full absolute inset-0"
        ></div>

      {/* Content with enhanced performance and proper spacing */}
      <div
        className="relative z-20 container mx-auto px-6 pt-28"
        style={{
          contain: "layout style paint",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Main content with centered alignment */}
          <div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight animate-fade-in gpu-accelerate">
              Custom Software Development &
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {" "}AI Solutions
              </span>
              <br />
              <span className="text-4xl md:text-6xl">to Accelerate Your Growth</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed max-w-3xl mx-auto">
              From Web Apps to AI Automation, Mobile Apps to SaaS – delivered by expert developers & AI specialists.
            </p>

            <div className="flex flex-col items-center mb-8">
              <button
                onClick={handleGetConsultation}
                className="group relative bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-12 py-6 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 font-semibold text-lg flex items-center space-x-3 shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 gpu-accelerate"
              >
                <span>Get Free Consultation (24hr Reply)</span>
                <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Consolidated Trust Bar */}
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 text-sm md:text-base text-gray-300">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">★★★★★</span>
                <span>4.9/5 Rating</span>
              </div>
              <div className="text-gray-500">|</div>
              <div className="flex items-center space-x-2">
                <span>🚀</span>
                <span>500+ Projects Delivered</span>
              </div>
              <div className="text-gray-500">|</div>
              <div className="flex items-center space-x-2">
                <span>⚡</span>
                <span>24hr Response Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Optimized Animated Particles */}
      <div
        className="absolute inset-0 z-15"
        style={{
          contain: "layout style paint",
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-ping gpu-accelerate"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping animation-delay-1000 gpu-accelerate"></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping animation-delay-2000 gpu-accelerate"></div>
      </div>
    </section>
  );
});
Hero.displayName = "Hero";
export default Hero;
