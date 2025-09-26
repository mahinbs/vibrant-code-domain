import { memo } from 'react';

const ClientLogos = memo(() => {
  const logos = [
    { name: 'Microsoft', logo: '🏢' },
    { name: 'Google', logo: '🔍' },
    { name: 'Amazon', logo: '📦' },
    { name: 'Meta', logo: '👥' },
    { name: 'Apple', logo: '🍎' },
    { name: 'Netflix', logo: '🎬' }
  ];

  return (
    <section className="py-16 bg-black/50 border-y border-gray-800/50 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <p className="text-gray-400 text-sm uppercase tracking-wider mb-4">Trusted by Industry Leaders</p>
          <h3 className="text-2xl font-semibold text-white mb-2">
            Join <span className="text-cyan-400">500+</span> Companies Who Trust Us
          </h3>
          <p className="text-gray-300">From startups to Fortune 500 companies</p>
        </div>
        
        {/* Logo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-center max-w-4xl mx-auto">
          {logos.map((company, index) => (
            <div 
              key={company.name}
              className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-800/30 border border-gray-700/50 hover:border-cyan-400/30 transition-all duration-300 group hover:scale-105"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                {company.logo}
              </div>
              <span className="text-xs text-gray-400 group-hover:text-cyan-400 transition-colors duration-300">
                {company.name}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom CTA hint */}
        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm mb-3">
            Ready to join them?
          </p>
          <button 
            onClick={() => {
              const element = document.getElementById('contact-form');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors duration-300 underline decoration-cyan-400/50 hover:decoration-cyan-300"
          >
            Get your free consultation →
          </button>
        </div>
      </div>
    </section>
  );
});

ClientLogos.displayName = "ClientLogos";
export default ClientLogos;