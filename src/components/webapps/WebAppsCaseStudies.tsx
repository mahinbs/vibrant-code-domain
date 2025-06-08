
import { CheckCircle, Star } from 'lucide-react';

const WebAppsCaseStudies = () => {
  const caseStudies = [
    {
      client: 'RetailMax Corporation',
      industry: 'E-commerce',
      challenge: 'Legacy e-commerce platform couldn\'t handle Black Friday traffic spikes and had poor mobile experience.',
      solution: 'Built a modern, scalable e-commerce platform with microservices architecture, advanced caching, and mobile-first design.',
      results: [
        '300% increase in mobile conversion rates',
        'Zero downtime during peak traffic',
        '50% faster page load times',
        '$2M additional revenue in first quarter'
      ],
      testimonial: "The new platform exceeded all our expectations. We handled our highest traffic day ever without any issues.",
      clientName: 'David Martinez',
      clientRole: 'CTO, RetailMax Corporation',
      clientImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
      duration: '14 weeks',
      teamSize: '7 developers'
    },
    {
      client: 'MedCare Health System',
      industry: 'Healthcare',
      challenge: 'Needed a HIPAA-compliant patient portal with telemedicine capabilities during the pandemic.',
      solution: 'Developed a secure healthcare platform with video consultations, appointment scheduling, and EHR integration.',
      results: [
        '80% reduction in in-person visits',
        '95% patient satisfaction score',
        'HIPAA compliance achieved',
        '200% increase in patient engagement'
      ],
      testimonial: "NeuraCode delivered a platform that not only met our compliance requirements but also improved patient care significantly.",
      clientName: 'Dr. Lisa Thompson',
      clientRole: 'Chief Medical Officer, MedCare',
      clientImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
      duration: '18 weeks',
      teamSize: '9 developers'
    }
  ];

  return (
    <section className="py-20 bg-black/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Success Stories</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real results from our web application development projects
          </p>
        </div>
        <div className="space-y-16">
          {caseStudies.map((study, index) => (
            <div key={index} className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700/50">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-cyan-400 mb-2">{study.client}</h3>
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
                          <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
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

export default WebAppsCaseStudies;
