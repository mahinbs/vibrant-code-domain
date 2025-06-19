
import { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import CustomerInquiryForm from '@/components/forms/CustomerInquiryForm';
import SimpleContactForm from '@/components/forms/SimpleContactForm';
import { Button } from '@/components/ui/button';

const HomeCTASection = () => {
  const [useSimpleForm, setUseSimpleForm] = useState(true);

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Business?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join 1,500+ companies that have revolutionized their operations with our cutting-edge solutions. 
            {useSimpleForm 
              ? " Send us a quick message and we'll get back to you within 24 hours." 
              : " Fill out our detailed form and get a free consultation."
            }
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
            <div className="flex items-center space-x-3 justify-center">
              <CheckCircle className="h-6 w-6 text-green-400" />
              <span className="text-gray-300">Free Consultation</span>
            </div>
            <div className="flex items-center space-x-3 justify-center">
              <CheckCircle className="h-6 w-6 text-green-400" />
              <span className="text-gray-300">Custom Solution Design</span>
            </div>
            <div className="flex items-center space-x-3 justify-center">
              <CheckCircle className="h-6 w-6 text-green-400" />
              <span className="text-gray-300">24/7 Support</span>
            </div>
          </div>

          {/* Form Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-800/50 p-1 rounded-lg border border-gray-600">
              <button
                onClick={() => setUseSimpleForm(true)}
                className={`px-6 py-2 rounded-md transition-all duration-300 ${
                  useSimpleForm 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Quick Contact
              </button>
              <button
                onClick={() => setUseSimpleForm(false)}
                className={`px-6 py-2 rounded-md transition-all duration-300 ${
                  !useSimpleForm 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Detailed Consultation
              </button>
            </div>
          </div>
        </div>

        {/* Forms */}
        <div className="max-w-4xl mx-auto">
          {useSimpleForm ? (
            <SimpleContactForm 
              sourcePage="home-simple" 
              className="max-w-2xl mx-auto"
            />
          ) : (
            <CustomerInquiryForm 
              sourcePage="home-detailed" 
              className="max-w-3xl mx-auto"
            />
          )}
        </div>

        {/* Additional CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">
            Or explore our work and capabilities
          </p>
          <a
            href="#portfolio"
            className="inline-flex items-center space-x-2 border-2 border-cyan-400/50 text-cyan-300 px-6 py-3 rounded-lg hover:bg-cyan-400/10 hover:border-cyan-300 transition-all duration-300 font-medium backdrop-blur-sm"
          >
            <span>View Our Portfolio</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomeCTASection;
