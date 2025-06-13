
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SuccessMessage from '@/components/forms/customer-inquiry/SuccessMessage';
import { useEffect } from 'react';

const ThankYouPage = () => {
  useEffect(() => {
    // Send GTM event for conversion tracking
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'form_submission_success',
        page_title: 'Thank You - Form Submitted Successfully',
        page_location: window.location.href,
      });
    }
    
    // Update page title
    document.title = 'Thank You - Boostmysites';
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-6 py-12">
          <SuccessMessage />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYouPage;
