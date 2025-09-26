import { useState } from 'react';
import { ChevronDown, Clock, DollarSign, Code } from 'lucide-react';

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqs = [
    {
      icon: Clock,
      question: "How long does it take to build a website?",
      answer: "Most websites are completed within 4-8 weeks, depending on complexity. Simple websites can be done in 2-3 weeks, while complex web applications may take 8-12 weeks. We provide a detailed timeline during our initial consultation."
    },
    {
      icon: Code,
      question: "Do you also provide SEO services?",
      answer: "Yes! All our websites come with built-in SEO optimization including meta tags, structured data, fast loading speeds, and mobile responsiveness. We also offer ongoing SEO services to help you rank higher on Google."
    },
    {
      icon: DollarSign,
      question: "What's the cost for a custom website?",
      answer: "Website costs vary based on features and complexity. Basic business websites start from $2,000, while custom web applications can range from $5,000-$25,000+. We provide free consultations to give you an accurate quote based on your specific needs."
    },
    {
      question: "Do you provide ongoing support after launch?",
      answer: "Absolutely! We offer 24/7 support and maintenance packages. This includes security updates, backups, performance monitoring, and content updates. Our support team is always available to help you."
    },
    {
      question: "Can you redesign my existing website?",
      answer: "Yes, we specialize in website redesigns! We can modernize your existing site, improve its performance, and enhance user experience while preserving your brand identity and existing content."
    },
    {
      question: "Will my website work on mobile phones?",
      answer: "Every website we create is 100% mobile responsive and optimized for all devices including smartphones, tablets, and desktops. Mobile optimization is standard in all our projects."
    },
    {
      question: "Can I update the website content myself?",
      answer: "Yes! We build user-friendly content management systems that allow you to easily update text, images, and other content without technical knowledge. We also provide training on how to use it."
    },
    {
      question: "Do you work with businesses outside your location?",
      answer: "Yes, we work with clients globally! We use modern communication tools and project management systems to collaborate effectively regardless of location. Most of our communication happens online anyway."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get answers to the most common questions about our website development services
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-gray-900/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-purple-400/50 transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-800/50 transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  {faq.icon && (
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 border border-purple-400/30 flex items-center justify-center">
                      <faq.icon className="h-5 w-5 text-purple-400" />
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                    {faq.question}
                  </h3>
                </div>
                <ChevronDown 
                  className={`h-6 w-6 text-purple-400 transform transition-transform duration-300 ${
                    openFAQ === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${
                openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-8 pb-6 border-t border-gray-700/50">
                  <p className="text-gray-300 leading-relaxed pt-6">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-xl text-gray-300 mb-6">
            Still have questions? We'd love to help!
          </p>
          <a 
            href="#final-contact-form"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl font-semibold hover:from-purple-400 hover:to-pink-500 transition-all duration-300 transform hover:scale-105"
          >
            <span>Get Free Consultation</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;