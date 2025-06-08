import { ArrowRight, Play } from 'lucide-react';
import { usePerformance } from '@/hooks/usePerformance';
import { useEffect, useRef, useState, memo } from 'react';
const Hero = memo(() => {
  const {
    throttleScroll,
    getScrollVelocity
  } = usePerformance();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [shouldPlayVideo, setShouldPlayVideo] = useState(true);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    const handleScroll = () => {
      throttleScroll(() => {
        const velocity = getScrollVelocity();
        const fastScrolling = velocity > 3;
        setIsScrolling(fastScrolling);
        setShouldPlayVideo(!fastScrolling);

        // Clear existing timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        // Set new timeout to detect when scrolling stops
        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
          setShouldPlayVideo(true);
        }, 100);
      });
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [throttleScroll, getScrollVelocity]);

  // Enhanced video performance optimization
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      if (isScrolling || !shouldPlayVideo) {
        video.style.willChange = 'auto';
        // Reduce video quality during scroll by lowering playback rate
        video.playbackRate = 0.5;
      } else {
        video.style.willChange = 'transform';
        video.playbackRate = 1;
      }
    }
  }, [isScrolling, shouldPlayVideo]);
  return <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden hero-section" style={{
    contain: 'layout style paint',
    contentVisibility: 'auto',
    containIntrinsicSize: '100vw 100vh'
  }}>
      {/* Enhanced Video Background with performance optimizations */}
      <video ref={videoRef} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 gpu-accelerate" style={{
      contentVisibility: 'auto',
      containIntrinsicSize: '100vw 100vh',
      transform: 'translate3d(0, 0, 0)'
    }} preload="metadata">
        <source src="https://res.cloudinary.com/dknafpppp/video/upload/v1748771996/0_Ai_Brain_1920x1080_quggeb.mp4" type="video/mp4" />
      </video>
      
      {/* Optimized Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" style={{
      contain: 'layout style paint'
    }}></div>
      
      {/* Large Company Logo Overlay - Desktop - Prominently displayed */}
      {/* <div className="absolute top-8 right-8 z-15 hidden lg:block" style={{ contain: 'layout style paint' }}>
        <img 
          src="https://res.cloudinary.com/dknafpppp/image/upload/v1748806784/freepik_br_f976b57b-9b0c-47dc-8aa0-439758154a91_cpevk3.png" 
          alt="Boostmysites Logo" 
          className="h-64 w-64 object-contain opacity-90 hover:opacity-100 transition-all duration-500 animate-pulse-light hover:scale-110 filter drop-shadow-2xl"
          loading="lazy"
        />
       </div> */}
      
      {/* Content with enhanced performance and proper spacing */}
      <div className="relative z-20 container mx-auto px-6 pb-24 pt-28" style={{
      contain: 'layout style paint'
    }}>
        <div className="max-w-4xl mx-auto text-center">
          {/* Large Mobile/Tablet Logo - Company branding */}
          {/* <div className="lg:hidden mb-16 flex justify-center">
            <img 
              src="https://res.cloudinary.com/dknafpppp/image/upload/v1748806784/freepik_br_f976b57b-9b0c-47dc-8aa0-439758154a91_cpevk3.png" 
              alt="Boostmysites Logo" 
              className="h-48 w-48 md:h-56 md:w-56 object-contain opacity-95 animate-fade-in filter drop-shadow-2xl"
              loading="lazy"
            />
           </div> */}

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
              <button className="group relative bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-5 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 font-semibold flex items-center space-x-3 shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 gpu-accelerate">
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