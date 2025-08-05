import { CheckCircle } from 'lucide-react';

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular: boolean;
}

interface ServicePricingSectionProps {
  serviceName: string;
  pricingTiers: PricingTier[];
  accentColor?: string;
  buttonAccentColor?: string;
}

const ServicePricingSection = ({ serviceName, pricingTiers, accentColor = "text-primary", buttonAccentColor = "yellow" }: ServicePricingSectionProps) => {
  const getButtonClasses = (popular: boolean) => {
    const baseClasses = "w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300";
    
    if (popular) {
      switch (buttonAccentColor) {
        case 'yellow': return `${baseClasses} bg-yellow-500 text-black hover:bg-yellow-400 shadow-lg`;
        case 'purple': return `${baseClasses} bg-purple-500 text-white hover:bg-purple-400 shadow-lg`;
        case 'red': return `${baseClasses} bg-red-500 text-white hover:bg-red-400 shadow-lg`;
        case 'indigo': return `${baseClasses} bg-indigo-500 text-white hover:bg-indigo-400 shadow-lg`;
        case 'teal': return `${baseClasses} bg-teal-500 text-white hover:bg-teal-400 shadow-lg`;
        case 'pink': return `${baseClasses} bg-pink-500 text-white hover:bg-pink-400 shadow-lg`;
        case 'blue': return `${baseClasses} bg-blue-500 text-white hover:bg-blue-400 shadow-lg`;
        case 'green': return `${baseClasses} bg-green-500 text-white hover:bg-green-400 shadow-lg`;
        default: return `${baseClasses} bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg`;
      }
    } else {
      switch (buttonAccentColor) {
        case 'yellow': return `${baseClasses} border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-500 hover:text-black`;
        case 'purple': return `${baseClasses} border-2 border-purple-400 text-purple-400 hover:bg-purple-500 hover:text-white`;
        case 'red': return `${baseClasses} border-2 border-red-400 text-red-400 hover:bg-red-500 hover:text-white`;
        case 'indigo': return `${baseClasses} border-2 border-indigo-400 text-indigo-400 hover:bg-indigo-500 hover:text-white`;
        case 'teal': return `${baseClasses} border-2 border-teal-400 text-teal-400 hover:bg-teal-500 hover:text-white`;
        case 'pink': return `${baseClasses} border-2 border-pink-400 text-pink-400 hover:bg-pink-500 hover:text-white`;
        case 'blue': return `${baseClasses} border-2 border-blue-400 text-blue-400 hover:bg-blue-500 hover:text-white`;
        case 'green': return `${baseClasses} border-2 border-green-400 text-green-400 hover:bg-green-500 hover:text-white`;
        default: return `${baseClasses} border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground`;
      }
    }
  };

  const getAccentColorClass = () => {
    switch (buttonAccentColor) {
      case 'yellow': return 'text-yellow-400';
      case 'purple': return 'text-purple-400';
      case 'red': return 'text-red-400';
      case 'indigo': return 'text-indigo-400';
      case 'teal': return 'text-teal-400';
      case 'pink': return 'text-pink-400';
      case 'blue': return 'text-blue-400';
      case 'green': return 'text-green-400';
      default: return 'text-primary';
    }
  };

  const getBadgeColorClass = () => {
    switch (buttonAccentColor) {
      case 'yellow': return 'bg-yellow-500 text-black';
      case 'purple': return 'bg-purple-500 text-white';
      case 'red': return 'bg-red-500 text-white';
      case 'indigo': return 'bg-indigo-500 text-white';
      case 'teal': return 'bg-teal-500 text-white';
      case 'pink': return 'bg-pink-500 text-white';
      case 'blue': return 'bg-blue-500 text-white';
      case 'green': return 'bg-green-500 text-white';
      default: return 'bg-primary text-primary-foreground';
    }
  };

  const getBorderColorClass = () => {
    switch (buttonAccentColor) {
      case 'yellow': return 'border-yellow-400';
      case 'purple': return 'border-purple-400';
      case 'red': return 'border-red-400';
      case 'indigo': return 'border-indigo-400';
      case 'teal': return 'border-teal-400';
      case 'pink': return 'border-pink-400';
      case 'blue': return 'border-blue-400';
      case 'green': return 'border-green-400';
      default: return 'border-primary';
    }
  };
  return (
    <section className="py-20 bg-black/80">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold mb-4 ${getAccentColorClass()} drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]`}>{serviceName} Pricing</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Flexible pricing options to fit your project needs and budget
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <div 
              key={index} 
              className={`relative p-8 rounded-2xl border transition-all duration-300 ${
                tier.popular 
                  ? `${getBorderColorClass()} bg-gray-800/90 backdrop-blur-sm scale-105 shadow-2xl` 
                  : `border-gray-600/70 bg-gray-800/70 backdrop-blur-sm hover:${getBorderColorClass()}/50 hover:bg-gray-700/80 hover:shadow-lg`
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className={`px-4 py-1 ${getBadgeColorClass()} text-sm font-semibold rounded-full`}>
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <div className="mb-4">
                  <span className={`text-4xl font-bold ${getAccentColorClass()}`}>{tier.price}</span>
                  {tier.price !== 'Custom' && <span className="text-gray-400 ml-1">starting</span>}
                </div>
                <p className="text-gray-400">{tier.description}</p>
              </div>
              
              <div className="space-y-3 mb-8">
                {tier.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <CheckCircle className={`h-5 w-5 ${accentColor} mt-0.5 flex-shrink-0`} />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              <button className={getButtonClasses(tier.popular)}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicePricingSection;