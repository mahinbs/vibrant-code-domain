
import { Award, TrendingUp, Users } from 'lucide-react';

interface PortfolioHeroProps {
  totalProjects: number;
}

const PortfolioHero = ({ totalProjects }: PortfolioHeroProps) => {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <iframe
          src="https://player.cloudinary.com/embed/?cloud_name=dknafpppp&public_id=5257353_Robot_Hand_1920x1080_dzh23x&profile=cld-default&autoplay=true&loop=true&muted=true&controls=false"
          width="100%"
          height="100%"
          className="w-full h-full object-cover scale-150"
          allow="autoplay; fullscreen"
          style={{
            border: 'none',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) scale(1.2)',
            minWidth: '100vw',
            minHeight: '100vh',
          }}
        />
        <div className="absolute inset-0 bg-black/80"></div>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.1),transparent_50%)] z-10"></div>
      
      <div className="container mx-auto px-6 relative z-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Our <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Portfolio</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Discover the innovative solutions we've delivered for our clients. Each project showcases our commitment to excellence and cutting-edge technology.
          </p>
          <div className="flex items-center justify-center space-x-8 mt-8">
            <div className="flex items-center space-x-2">
              <Award className="h-6 w-6 text-cyan-400" />
              <span className="text-white font-semibold">{totalProjects}+ Projects</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-green-400" />
              <span className="text-white font-semibold">98% Success Rate</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-6 w-6 text-blue-400" />
              <span className="text-white font-semibold">50+ Happy Clients</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioHero;
