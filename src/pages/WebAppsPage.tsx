
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WebAppsHero from '@/components/webapps/WebAppsHero';
import WebAppsPortfolio from '@/components/webapps/WebAppsPortfolio';
import WebAppsCaseStudies from '@/components/webapps/WebAppsCaseStudies';
import WebAppsFeatures from '@/components/webapps/WebAppsFeatures';
import WebAppsProcess from '@/components/webapps/WebAppsProcess';
import WebAppsCTA from '@/components/webapps/WebAppsCTA';
import ServiceReviewsSection from "@/components/ServiceReviewsSection";
import SimpleContactForm from '@/components/forms/SimpleContactForm';
import TestimonialsSection from '@/components/TestimonialsSection';

const WebAppsPage = () => {
  return (
    <div 
      className="min-h-screen bg-black text-white"
      style={{
        backgroundImage: 'url("https://res.cloudinary.com/dknafpppp/image/upload/v1748810561/2150323552_rl9lps.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <Header />
      <WebAppsHero />
      
      {/* Enquiry Form Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Build Your Web Application?</h2>
            <p className="text-xl text-gray-300">
              Let's create powerful web applications that drive your business forward.
            </p>
          </div>
          <SimpleContactForm sourcePage="web-apps" className="max-w-2xl mx-auto" />
        </div>
      </section>
      
      <WebAppsPortfolio />
      <WebAppsCaseStudies />
      <WebAppsFeatures />
      <WebAppsProcess />
      {/* Reviews Section */}
      <ServiceReviewsSection
        serviceName="Web Applications"
        accentColor="cyan"
        reviews={[
          {
            id: 1,
            name: "Jason M.",
            role: "COO",
            company: "FinEdge Systems",
            rating: 5,
            review:
              "Boostmysites delivered a high-performance web app that automated our workflows and scaled to thousands of users effortlessly.",
            image:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
          },
          {
            id: 2,
            name: "Neha J.",
            role: "CEO",
            company: "Craftly Digital",
            rating: 5,
            review:
              "The platform is fast, secure, and beautifully designed. Deployment and CI/CD are rock-solid.",
            image:
              "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
          },
          {
            id: 3,
            name: "Richard P.",
            role: "Founder",
            company: "LegalQuik",
            rating: 5,
            review:
              "Complex requirements handled with ease. The team shipped exactly what we envisioned, on time.",
            image:
              "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop&crop=face",
          },
        ]}
      />
      {/* Final CTA Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Start Your Web Application Project</h2>
            <p className="text-xl text-gray-300">
              Let's create powerful web applications that drive your business forward.
            </p>
          </div>
          <SimpleContactForm sourcePage="web-apps-cta" className="max-w-2xl mx-auto" />
        </div>
      </section>
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      <Footer />
    </div>
  );
};

export default WebAppsPage;
