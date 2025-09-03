
import { Code, Cloud, Brain, Smartphone, Zap } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  color: 'cyan' | 'blue' | 'pink' | 'purple' | 'green';
  projects: any[];
}

interface ServiceFilterProps {
  services: Service[];
  selectedService: string | null;
  setSelectedService: (service: string | null) => void;
  isVisible: boolean;
}

const ServiceFilter = ({ services, selectedService, setSelectedService, isVisible }: ServiceFilterProps) => {
  const colorClasses = {
    cyan: {
      button: 'bg-cyan-500/20 border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/30',
    },
    blue: {
      button: 'bg-blue-500/20 border-blue-400/30 text-blue-400 hover:bg-blue-500/30',
    },
    pink: {
      button: 'bg-pink-500/20 border-pink-400/30 text-pink-400 hover:bg-pink-500/30',
    },
    purple: {
      button: 'bg-purple-500/20 border-purple-400/30 text-purple-400 hover:bg-purple-500/30',
    },
    green: {
      button: 'bg-green-500/20 border-green-400/30 text-green-400 hover:bg-green-500/30',
    }
  };

  const getServiceIcon = (serviceId: string) => {
    switch (serviceId) {
      case 'web-apps': return Code;
      case 'saas': return Cloud;
      case 'mobile-apps': return Smartphone;
      case 'ai-calling': return Brain;
      case 'ai-automation': return Zap;
      default: return Code;
    }
  };

  return (
    <div className={`mb-8 sm:mb-10 lg:mb-12 transition-all duration-700 delay-200 px-4 $`}>
      {/* Mobile: Vertical Stack */}
      <div className="block lg:hidden">
        <div className="space-y-3">
          <button
            onClick={() => setSelectedService(null)}
            className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 font-medium text-sm sm:text-base ${
              selectedService === null
                ? 'bg-cyan-500/20 border-cyan-400/30 text-cyan-400'
                : 'border-gray-600 text-gray-400 hover:border-gray-500 hover:text-gray-300'
            }`}
          >
            All Projects
          </button>
          {services.map((service, index) => {
            const colors = colorClasses[service.color];
            const ServiceIcon = getServiceIcon(service.id);
            return (
              <button
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 font-medium flex items-center justify-center space-x-2 text-sm sm:text-base ${
                  selectedService === service.id
                    ? colors.button
                    : 'border-gray-600 text-gray-400 hover:border-gray-500 hover:text-gray-300'
                }`}
              >
                <ServiceIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>{service.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop: Horizontal Grid */}
      <div className="hidden lg:block">
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setSelectedService(null)}
            className={`px-6 py-3 rounded-xl border transition-all duration-300 font-medium ${
              selectedService === null
                ? 'bg-cyan-500/20 border-cyan-400/30 text-cyan-400'
                : 'border-gray-600 text-gray-400 hover:border-gray-500 hover:text-gray-300'
            }`}
          >
            All Projects
          </button>
          {services.map((service, index) => {
            const colors = colorClasses[service.color];
            const ServiceIcon = getServiceIcon(service.id);
            return (
              <button
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`px-6 py-3 rounded-xl border transition-all duration-300 font-medium flex items-center space-x-2 ${
                  selectedService === service.id
                    ? colors.button
                    : 'border-gray-600 text-gray-400 hover:border-gray-500 hover:text-gray-300'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ServiceIcon className="h-4 w-4" />
                <span>{service.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServiceFilter;
