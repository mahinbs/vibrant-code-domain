
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WebAppsHero from '@/components/webapps/WebAppsHero';
import WebAppsPortfolio from '@/components/webapps/WebAppsPortfolio';
import WebAppsCaseStudies from '@/components/webapps/WebAppsCaseStudies';
import WebAppsFeatures from '@/components/webapps/WebAppsFeatures';
import WebAppsProcess from '@/components/webapps/WebAppsProcess';
import WebAppsCTA from '@/components/webapps/WebAppsCTA';
import ServiceReviewsSection from "@/components/ServiceReviewsSection";

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
      <WebAppsCTA />
      <Footer />
    </div>
  );
};

export default WebAppsPage;
