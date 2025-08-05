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
}

const ServicePricingSection = ({ serviceName, pricingTiers }: ServicePricingSectionProps) => {
  return (
    <section className="py-20 bg-gray-900/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{serviceName} Pricing</h2>
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
                  ? 'border-primary bg-primary/5 scale-105' 
                  : 'border-gray-700/50 bg-gray-800/30 hover:border-primary/50'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="px-4 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-primary">{tier.price}</span>
                  {tier.price !== 'Custom' && <span className="text-gray-400 ml-1">starting</span>}
                </div>
                <p className="text-gray-400">{tier.description}</p>
              </div>
              
              <div className="space-y-3 mb-8">
                {tier.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              <button 
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  tier.popular
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'border border-primary text-primary hover:bg-primary hover:text-primary-foreground'
                }`}
              >
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