
import { Service } from '@/data/projects';

interface PortfolioServiceFilterProps {
  services: Service[];
  selectedService: string | null;
  setSelectedService: (service: string | null) => void;
  totalProjects: number;
}

const PortfolioServiceFilter = ({ 
  services, 
  selectedService, 
  setSelectedService, 
  totalProjects 
}: PortfolioServiceFilterProps) => {
  const colorClasses = {
    cyan: 'bg-cyan-500/20 border-cyan-400/30 text-cyan-400',
    blue: 'bg-blue-500/20 border-blue-400/30 text-blue-400',
    purple: 'bg-purple-500/20 border-purple-400/30 text-purple-400',
    pink: 'bg-pink-500/20 border-pink-400/30 text-pink-400',
    green: 'bg-green-500/20 border-green-400/30 text-green-400',
  };

  return (
    <div className="mb-16">
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <button
          onClick={() => setSelectedService(null)}
          className={`px-6 py-3 rounded-xl border transition-all duration-300 font-medium ${
            selectedService === null
              ? 'bg-cyan-500/20 border-cyan-400/30 text-cyan-400'
              : 'border-gray-600 text-gray-400 hover:border-gray-500 hover:text-gray-300'
          }`}
        >
          All Projects ({totalProjects})
        </button>
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => setSelectedService(service.id)}
            className={`px-6 py-3 rounded-xl border transition-all duration-300 font-medium flex items-center space-x-2 ${
              selectedService === service.id
                ? colorClasses[service.color]
                : 'border-gray-600 text-gray-400 hover:border-gray-500 hover:text-gray-300'
            }`}
          >
            <service.icon className="h-4 w-4" />
            <span>{service.title} ({service.projects.length})</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PortfolioServiceFilter;
