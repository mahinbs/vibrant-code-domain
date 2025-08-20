import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Mail, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AiFreelancingThankYouPage = () => {
  useEffect(() => {
    // Send GTM event for conversion tracking
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'ai_freelancing_conversion',
        page_title: 'Thank You - AI Freelancing Trial',
        page_location: window.location.href,
      });
    }
    
    // Update page title
    document.title = 'Thank You - AI Freelancing Trial | Boostmysites';
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto text-center">
            {/* Success Icon */}
            <div className="relative inline-flex items-center justify-center mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 blur-xl rounded-full"></div>
              <div className="relative bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-full">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Thank You for Signing Up!
            </h1>
            
            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-300 mb-4">
              Welcome to the world of freelancing! You've just taken your first step towards financial freedom!!
            </p>

            {/* What's Unlocked */}
            <div className="bg-card/40 backdrop-blur-sm border border-white/10 rounded-xl p-8 mb-12 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 flex items-center justify-center gap-2">
                <span className="text-3xl">👉</span>
                For just $1, you've unlocked:
              </h2>
              
              <div className="space-y-4 text-left">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">Access to real freelancing opportunities</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">Step-by-step guidance to get started</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">A community that supports your growth</span>
                </div>
              </div>
            </div>

            {/* What's Next Section */}
            <div className="bg-card/20 backdrop-blur-sm border border-white/10 rounded-xl p-8 mb-12">
              <h2 className="text-3xl font-bold mb-8 text-white">What's Next?</h2>
              
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-4 rounded-full mb-4">
                    <Mail className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">1. Check your email 📩</h3>
                  <p className="text-gray-400 text-sm">We've sent your login details & onboarding guide.</p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 rounded-full mb-4">
                    <Users className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">2. Join our private community</h3>
                  <p className="text-gray-400 text-sm">(link in email)</p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-full mb-4">
                    <Zap className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">3. Start exploring projects</h3>
                  <p className="text-gray-400 text-sm">& training right away.</p>
                </div>
              </div>
            </div>

            {/* Motivational Message */}
            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-6 mb-8">
              <p className="text-lg text-amber-200 font-medium">
                Remember, even the biggest freelancers started with Step 1. You've already taken it today!
              </p>
            </div>

            {/* Call to Action */}
            <div className="bg-card/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-12">
              <p className="text-lg text-gray-300 mb-4">
                <strong>Spread the word:</strong> Invite your friends to join for just $1 and build your freelancing journey together.
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
              >
                <Link to="/ai-freelancing">
                  Back to AI Freelancing
                </Link>
              </Button>
              
              <Button 
                asChild
                variant="outline"
                size="lg"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                <Link to="/">
                  Go to Homepage
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AiFreelancingThankYouPage;