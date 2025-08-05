import { CheckCircle, Star } from 'lucide-react';

interface CaseStudy {
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  testimonial: string;
  clientName: string;
  clientRole: string;
  clientImage: string;
  duration: string;
  teamSize: string;
}

interface ServiceCaseStudiesSectionProps {
  serviceName: string;
  caseStudies: CaseStudy[];
  accentColor?: string;
}

const ServiceCaseStudiesSection = ({ serviceName, caseStudies, accentColor = "text-primary" }: ServiceCaseStudiesSectionProps) => {
  // Color mapping for headings
  const getHeadingColorClass = (accent: string) => {
    // Extract color from text-color-400 format
    const colorName = accent.replace('text-', '').replace('-400', '');
    const colorMap: Record<string, string> = {
      cyan: 'text-cyan-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]',
      purple: 'text-purple-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]',
      red: 'text-red-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]',
      yellow: 'text-yellow-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]',
      indigo: 'text-indigo-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]',
      teal: 'text-teal-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]',
      pink: 'text-pink-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]',
      blue: 'text-blue-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]',
      green: 'text-green-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]'
    };
    return colorMap[colorName] || accent;
  };
  return (
    <section className="py-20 bg-black/80">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold mb-4 ${getHeadingColorClass(accentColor)}`}>Success Stories</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real results from our {serviceName.toLowerCase()} projects
          </p>
        </div>
        <div className="space-y-16">
          {caseStudies.map((study, index) => (
            <div key={index} className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700/50">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <div className="mb-6">
                    <h3 className={`text-2xl font-bold mb-2 ${accentColor}`}>{study.client}</h3>
                    <p className="text-gray-400">{study.industry} • {study.duration} • {study.teamSize}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-white mb-2">Challenge:</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">{study.challenge}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-white mb-2">Solution:</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">{study.solution}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="mb-6">
                    <h4 className="font-semibold text-white mb-4">Results:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {study.results.map((result, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <CheckCircle className={`h-5 w-5 ${accentColor} mt-0.5 flex-shrink-0`} />
                          <span className="text-gray-300 text-sm">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
                    <div className="flex items-start space-x-4">
                      <img 
                        src={study.clientImage} 
                        alt={study.clientName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-gray-300 text-sm italic mb-3">"{study.testimonial}"</p>
                        <div>
                          <p className="font-semibold text-white text-sm">{study.clientName}</p>
                          <p className="text-gray-400 text-xs">{study.clientRole}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex mt-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCaseStudiesSection;