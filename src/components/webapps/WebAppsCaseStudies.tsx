
import { CheckCircle, Star } from 'lucide-react';

const WebAppsCaseStudies = () => {
  const caseStudies = [
    {
      client: 'VirtuTeams Platform',
      industry: 'Remote Work Technology',
      challenge: 'Company needed a comprehensive virtual team management solution to handle the transition to hybrid work, with seamless video integration, project tracking, and real-time collaboration tools.',
      solution: 'Built a scalable remote work platform with integrated video conferencing, advanced project management, team analytics, and AI-powered productivity insights.',
      results: [
        '85% improvement in team productivity',
        '60% reduction in unnecessary meetings',
        '40% faster project completion times',
        '95% user adoption rate within first month'
      ],
      testimonial: "VirtuTeams transformed how our distributed teams collaborate. The platform's intuitive design and powerful features made remote work feel seamless.",
      clientName: 'Michael Chen',
      clientRole: 'VP of Operations',
      clientImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
      duration: '16 weeks',
      teamSize: '8 developers'
    },
    {
      client: 'Fashion Journey Navigator',
      industry: 'Fashion & E-commerce',
      challenge: 'Fashion retailers struggled with providing personalized shopping experiences and style discovery, leading to low engagement and poor conversion rates.',
      solution: 'Developed an AI-powered fashion discovery platform with personalized recommendations, style matching algorithms, and interactive shopping journey mapping.',
      results: [
        '250% increase in user engagement',
        '180% improvement in conversion rates',
        '90% customer satisfaction score',
        '70% reduction in cart abandonment'
      ],
      testimonial: "The Fashion Journey Navigator revolutionized our customer experience. Our users now discover styles they love and complete purchases with confidence.",
      clientName: 'Sarah Williams',
      clientRole: 'Head of Digital Experience',
      clientImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
      duration: '20 weeks',
      teamSize: '10 developers'
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
