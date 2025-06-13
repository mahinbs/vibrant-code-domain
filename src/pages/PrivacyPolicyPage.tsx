
import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PrivacyPolicyPage = () => {
  useEffect(() => {
    // Update page title and meta description
    document.title = 'Privacy Policy - Boostmysites';
    
    // Send GTM event for page tracking
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        page_title: 'Privacy Policy',
        page_location: window.location.href,
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-6 py-12 max-w-4xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-gray-400 text-lg">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <div className="mt-4 text-sm text-gray-500">
              <p>Effective Date: January 1, 2025</p>
              <p>Last Updated: January 13, 2025</p>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-8 text-gray-300 leading-relaxed">
            
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">1. Introduction</h2>
              <p className="mb-4">
                Boostmysites ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website boostmysites.in and use our services.
              </p>
              <p>
                By using our website and services, you consent to the practices described in this Privacy Policy. If you do not agree with this policy, please do not use our services.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">2. Information We Collect</h2>
              
              <h3 className="text-xl font-medium mb-3 text-cyan-400">2.1 Personal Information</h3>
              <p className="mb-4">We may collect personal information that you provide directly to us, including:</p>
              <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                <li>Name (first and last name)</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Company name and position</li>
                <li>Project details and requirements</li>
                <li>Budget and timeline preferences</li>
                <li>Any other information you choose to provide in contact forms or communications</li>
              </ul>

              <h3 className="text-xl font-medium mb-3 text-cyan-400">2.2 Automatically Collected Information</h3>
              <p className="mb-4">When you visit our website, we automatically collect certain information, including:</p>
              <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                <li>IP address and geographic location</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited and time spent on our site</li>
                <li>Referring website information</li>
                <li>Device information (mobile, desktop, tablet)</li>
              </ul>

              <h3 className="text-xl font-medium mb-3 text-cyan-400">2.3 Cookies and Tracking Technologies</h3>
              <p className="mb-4">We use cookies, web beacons, and similar tracking technologies to:</p>
              <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                <li>Analyze website traffic and user behavior</li>
                <li>Improve user experience and website functionality</li>
                <li>Remember your preferences</li>
                <li>Provide targeted content and advertisements</li>
              </ul>
            </section>

            {/* How We Use Information */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">3. How We Use Your Information</h2>
              <p className="mb-4">We use the collected information for the following purposes:</p>
              <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                <li>Respond to your inquiries and provide customer support</li>
                <li>Deliver our services and fulfill project requirements</li>
                <li>Send project updates, invoices, and service-related communications</li>
                <li>Improve our website, services, and user experience</li>
                <li>Analyze website traffic and user behavior patterns</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Comply with legal obligations and protect our rights</li>
                <li>Prevent fraud and ensure website security</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">4. Information Sharing and Disclosure</h2>
              <p className="mb-4">We do not sell, trade, or rent your personal information. We may share your information in the following circumstances:</p>
              
              <h3 className="text-xl font-medium mb-3 text-cyan-400">4.1 Service Providers</h3>
              <p className="mb-4">We may share information with trusted third-party service providers who assist us in:</p>
              <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                <li>Website analytics (Google Analytics)</li>
                <li>Email marketing and communication services</li>
                <li>Cloud hosting and data storage</li>
                <li>Payment processing</li>
                <li>Customer support tools</li>
              </ul>

              <h3 className="text-xl font-medium mb-3 text-cyan-400">4.2 Legal Requirements</h3>
              <p className="mb-4">We may disclose your information when required by law or to:</p>
              <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                <li>Comply with legal processes or government requests</li>
                <li>Protect our rights, property, or safety</li>
                <li>Prevent fraud or illegal activities</li>
                <li>Enforce our terms of service</li>
              </ul>
            </section>

            {/* Third-Party Services */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">5. Third-Party Services</h2>
              <p className="mb-4">Our website integrates with the following third-party services:</p>
              
              <h3 className="text-xl font-medium mb-3 text-cyan-400">5.1 Google Analytics</h3>
              <p className="mb-4">
                We use Google Analytics to analyze website traffic and user behavior. Google Analytics may collect and process data according to their privacy policy.
              </p>

              <h3 className="text-xl font-medium mb-3 text-cyan-400">5.2 Google Tag Manager</h3>
              <p className="mb-4">
                We use Google Tag Manager for tracking and analytics. This service helps us manage and deploy marketing tags without modifying code.
              </p>

              <h3 className="text-xl font-medium mb-3 text-cyan-400">5.3 WhatsApp Integration</h3>
              <p className="mb-4">
                Our website includes a WhatsApp contact button. When you use this feature, you'll be redirected to WhatsApp's platform, which is governed by WhatsApp's privacy policy.
              </p>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">6. Data Security</h2>
              <p className="mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                <li>SSL encryption for data transmission</li>
                <li>Secure data storage and backup systems</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication measures</li>
                <li>Employee training on data protection</li>
              </ul>
              <p className="mb-4">
                However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">7. Data Retention</h2>
              <p className="mb-4">
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Specifically:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                <li>Contact form submissions: 3 years from submission date</li>
                <li>Project-related communications: 5 years after project completion</li>
                <li>Marketing communications: Until you unsubscribe</li>
                <li>Website analytics data: 26 months (Google Analytics default)</li>
              </ul>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">8. Your Rights</h2>
              <p className="mb-4">Depending on your location, you may have the following rights regarding your personal information:</p>
              <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                <li><strong>Objection:</strong> Object to processing of your personal information</li>
                <li><strong>Restriction:</strong> Request restriction of processing in certain circumstances</li>
                <li><strong>Withdrawal of Consent:</strong> Withdraw consent for marketing communications</li>
              </ul>
              <p className="mb-4">
                To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
              </p>
            </section>

            {/* Cookies Policy */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">9. Cookies Policy</h2>
              <p className="mb-4">
                Our website uses cookies to enhance your browsing experience. Cookies are small data files stored on your device that help us:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                <li>Remember your preferences and settings</li>
                <li>Analyze how you use our website</li>
                <li>Provide personalized content</li>
                <li>Improve website performance and functionality</li>
              </ul>
              <p className="mb-4">
                You can control cookies through your browser settings. However, disabling cookies may affect the functionality of our website.
              </p>
            </section>

            {/* International Data Transfers */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">10. International Data Transfers</h2>
              <p className="mb-4">
                Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. When we transfer your information internationally, we ensure appropriate safeguards are in place to protect your data.
              </p>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">11. Children's Privacy</h2>
              <p className="mb-4">
                Our services are not intended for individuals under the age of 16. We do not knowingly collect personal information from children under 16. If we become aware that we have collected personal information from a child under 16, we will take steps to delete such information.
              </p>
            </section>

            {/* Changes to Privacy Policy */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">12. Changes to This Privacy Policy</h2>
              <p className="mb-4">
                We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. When we make changes, we will:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                <li>Update the "Last Updated" date at the top of this policy</li>
                <li>Notify you of significant changes via email or website notice</li>
                <li>Obtain your consent for material changes where required by law</li>
              </ul>
              <p className="mb-4">
                We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">13. Contact Us</h2>
              <p className="mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <h3 className="text-lg font-medium mb-3 text-cyan-400">Boostmysites</h3>
                <div className="space-y-2">
                  <p><strong>Email:</strong> chairman@boostmysites.com</p>
                  <p><strong>Phone:</strong> +919632953355</p>
                  <p><strong>Website:</strong> boostmysites.in</p>
                  <p><strong>Privacy Officer:</strong> chairman@boostmysites.com</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                We will respond to your inquiry within 30 days of receipt.
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
