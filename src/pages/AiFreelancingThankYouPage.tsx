import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Mail, Users, Zap, Copy, Clock, Gift, Star, MessageCircle, Instagram, ExternalLink, Timer, Award, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCoupon } from '@/hooks/useCoupon';

const AiFreelancingThankYouPage = () => {
  const [userEmail, setUserEmail] = useState<string>('');
  const { coupon, loading, generateCoupon, copyCouponCode, timeRemaining } = useCoupon();

  useEffect(() => {
    // Send GTM event for conversion tracking
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'ai_freelancing_conversion',
        page_title: 'Thank You - AI Freelancing Trial',
        page_location: window.location.href,
      });
    }
    
    // Update page title and generate coupon
    document.title = 'Thank You - AI Freelancing Trial | Boostmysites';
    
    // Extract email from URL params or use a default for demo
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email') || 'user@example.com';
    setUserEmail(email);
    
    // Generate coupon automatically
    generateCoupon(email);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            
            {/* Section 1: Success Confirmation */}
            <div className="text-center mb-16">
              <div className="relative inline-flex items-center justify-center mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 blur-xl rounded-full"></div>
                <div className="relative bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-full">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Welcome to Your Freelancing Journey! 🎉
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-4">
                You've just unlocked the door to financial freedom. Let's get you started!
              </p>
            </div>

            {/* Section 2: Exclusive Coupon */}
            {coupon && (
              <Card className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/20 mb-12">
                <CardContent className="p-8 text-center">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Gift className="w-6 h-6 text-amber-400" />
                    <h2 className="text-2xl font-bold text-amber-200">Exclusive Bonus Coupon!</h2>
                  </div>
                  
                  <p className="text-amber-100 mb-6">
                    Here's your personal $1 discount coupon for any future services:
                  </p>
                  
                  <div className="bg-card/40 backdrop-blur-sm border border-amber-500/30 rounded-xl p-6 mb-6">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <code className="text-2xl font-mono font-bold text-amber-200 tracking-wider">
                        {coupon.code}
                      </code>
                      <Button
                        onClick={copyCouponCode}
                        variant="outline"
                        size="sm"
                        className="border-amber-500/30 text-amber-200 hover:bg-amber-500/20"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                    
                    {timeRemaining && (
                      <div className="flex items-center justify-center gap-2 text-amber-300">
                        <Timer className="w-4 h-4" />
                        <span className="text-sm">
                          Expires in: {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-amber-200/80">
                    Save this code! You'll need it when you're ready to upgrade your freelancing game.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Section 3: What You've Unlocked */}
            <Card className="bg-card/40 backdrop-blur-sm border border-white/10 mb-12">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                  <Award className="w-8 h-8 text-cyan-400" />
                  What You've Unlocked for Just $1
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">Access to 100+ real freelancing opportunities</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">Step-by-step video training modules</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">Private community of 5000+ freelancers</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">Personal mentor assignments</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">Client outreach templates & scripts</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">Weekly live Q&A sessions</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 4: Next Steps Timeline */}
            <Card className="bg-card/20 backdrop-blur-sm border border-white/10 mb-12">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-8 text-center text-white">Your Next 48 Hours</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-3 rounded-full flex-shrink-0">
                      <Mail className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-white">Step 1: Check Your Email (Next 10 minutes)</h3>
                      <p className="text-gray-400">We've sent your login credentials and welcome guide to {userEmail}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-3 rounded-full flex-shrink-0">
                      <Users className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-white">Step 2: Join Our Community (Today)</h3>
                      <p className="text-gray-400">Get instant access to our private Facebook group (link in your email)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-3 rounded-full flex-shrink-0">
                      <Zap className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-white">Step 3: Complete Your First Module (Within 48 hours)</h3>
                      <p className="text-gray-400">Start with "Freelancing Fundamentals" and earn your first badge</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 5: Social Proof & Testimonials */}
            <Card className="bg-card/20 backdrop-blur-sm border border-white/10 mb-12">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-8 text-center text-white">What Our Members Are Saying</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card/40 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-300 mb-4">
                      "I made my first $500 in just 2 weeks! The community support is incredible."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">S</span>
                      </div>
                      <div>
                        <p className="text-white font-semibold">Sarah K.</p>
                        <p className="text-gray-400 text-sm">Graphic Designer</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-card/40 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-300 mb-4">
                      "From zero to $3K/month in 3 months. This program changed my life!"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">M</span>
                      </div>
                      <div>
                        <p className="text-white font-semibold">Mike R.</p>
                        <p className="text-gray-400 text-sm">Content Writer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 6: Social Media & Community */}
            <Card className="bg-card/20 backdrop-blur-sm border border-white/10 mb-12">
              <CardContent className="p-8 text-center">
                <h2 className="text-3xl font-bold mb-6 text-white">Stay Connected</h2>
                <p className="text-gray-300 mb-8">
                  Follow us for daily tips, success stories, and exclusive opportunities
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-pink-500/30 text-pink-300 hover:bg-pink-500/20"
                    asChild
                  >
                    <a href="https://instagram.com/yourhandle" target="_blank" rel="noopener noreferrer">
                      <Instagram className="w-5 h-5 mr-2" />
                      Follow on Instagram
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                  
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20"
                    asChild
                  >
                    <a href="https://facebook.com/groups/yourgroup" target="_blank" rel="noopener noreferrer">
                      <Users className="w-5 h-5 mr-2" />
                      Join Facebook Group
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
                
                <div className="mt-8 grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-cyan-400">5,000+</div>
                    <div className="text-gray-400">Active Members</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">$2.5M+</div>
                    <div className="text-gray-400">Earned by Members</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-400">95%</div>
                    <div className="text-gray-400">Success Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 7: Call-to-Action */}
            <Card className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/20">
              <CardContent className="p-8 text-center">
                <TrendingUp className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4 text-white">Ready to Start Earning?</h2>
                <p className="text-xl text-gray-300 mb-8">
                  Don't wait! The sooner you start, the sooner you'll see results.
                </p>
                
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 text-lg px-8 py-4 mb-4"
                  asChild
                >
                  <a href="https://checkout.yoursite.com" target="_blank" rel="noopener noreferrer">
                    Access Your Training Now
                    <ExternalLink className="w-5 h-5 ml-2" />
                  </a>
                </Button>
                
                <p className="text-sm text-gray-400">
                  Questions? Email us at support@yoursite.com or use the chat widget below
                </p>
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
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