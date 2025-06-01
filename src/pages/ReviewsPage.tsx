import React, { useState, useMemo } from 'react';
import { Star, Filter, Zap, Shield, Users, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import ReviewCard from '@/components/ReviewCard';

interface Review {
  id: number;
  name: string;
  role: string;
  company: string;
  rating: number;
  review: string;
  service: string;
  image: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Jason M.",
    role: "COO",
    company: "FinEdge Systems",
    rating: 5,
    review: "The team at Boostmysites delivered a sleek, high-performance web app that transformed our manual processes into a seamless digital experience. Their responsiveness and attention to detail were unmatched.",
    service: "Web Applications",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face"
  }, {
    id: 2,
    name: "Neha J.",
    role: "CEO",
    company: "Craftly Digital",
    rating: 5,
    review: "Boostmysites created a powerful web platform for us that handles thousands of users daily without a hitch. The interface is clean, responsive, and exactly what we envisioned.",
    service: "Web Applications",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face"
  }, {
    id: 3,
    name: "Richard P.",
    role: "Founder",
    company: "LegalQuik",
    rating: 5,
    review: "They understood our complex requirements and translated them into a beautifully functioning web application. Timely delivery and excellent support throughout.",
    service: "Web Applications",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=150&h=150&fit=crop&crop=face"
  }, {
    id: 4,
    name: "Aparna R.",
    role: "Founder",
    company: "EduFlex LMS",
    rating: 5,
    review: "From ideation to execution, Boostmysites helped us launch a complete SaaS platform that's now being used by over 3,000 customers. Their understanding of subscription models and analytics made all the difference.",
    service: "SaaS Solutions",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face"
  }, {
    id: 5,
    name: "Taran V.",
    role: "Founder",
    company: "InvoicePro",
    rating: 5,
    review: "Building a SaaS from scratch felt overwhelming until we partnered with Boostmysites. They managed everything—multi-tenancy, payment gateways, analytics, and more.",
    service: "SaaS Solutions",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face"
  }, {
    id: 6,
    name: "Linda S.",
    role: "CMO",
    company: "HostEase",
    rating: 5,
    review: "Their SaaS expertise is evident in the way they structured our backend. We now have a stable subscription platform that continues to grow month after month.",
    service: "SaaS Solutions",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=150&h=150&fit=crop&crop=face"
  }, {
    id: 7,
    name: "Daniel K.",
    role: "Product Lead",
    company: "FitHabit",
    rating: 5,
    review: "Our mobile app needed to work flawlessly on both Android and iOS. Boostmysites built an intuitive cross-platform experience that our users love. 5-star app ratings speak for themselves!",
    service: "Mobile Applications",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face"
  }, {
    id: 8,
    name: "Claire T.",
    role: "Head of Product",
    company: "PetTrack",
    rating: 5,
    review: "Our app needed real-time updates and a slick user interface. Boostmysites nailed both. It's fast, modern, and users are staying longer.",
    service: "Mobile Applications",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face"
  }, {
    id: 9,
    name: "Yash R.",
    role: "Founder",
    company: "MealMate",
    rating: 5,
    review: "They delivered our cross-platform app on time and helped us publish it on both Play Store and App Store with zero hassle. Excellent experience!",
    service: "Mobile Applications",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=150&h=150&fit=crop&crop=face"
  }, {
    id: 10,
    name: "Shruti M.",
    role: "Head of Ops",
    company: "Rentzy",
    rating: 5,
    review: "The AI calling system Boostmysites built has automated 90% of our outbound calls, saving us over 300 hours/month. The natural language interaction is so good most customers don't even realize it's AI.",
    service: "AI Calling Agency",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face"
  }, {
    id: 11,
    name: "Deepak K.",
    role: "CEO",
    company: "LoanKart365",
    rating: 5,
    review: "Our sales team reduced cold-call hours by 80% thanks to the AI calling system Boostmysites built. The voice tech feels incredibly human.",
    service: "AI Calling Agency",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face"
  }, {
    id: 12,
    name: "Sophia A.",
    role: "Ops Manager",
    company: "QuickDrop",
    rating: 5,
    review: "Integrating AI into our customer support was a game-changer. Calls are handled intelligently and routing is now fully automated.",
    service: "AI Calling Agency",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=150&h=150&fit=crop&crop=face"
  }, {
    id: 13,
    name: "Ali R.",
    role: "CTO",
    company: "Medicare Desk",
    rating: 5,
    review: "They didn't just build automation—they helped us rethink how we work. Our internal workflows are now lightning-fast thanks to their AI integrations. Boostmysites is a real game-changer.",
    service: "AI Automation",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face"
  }, {
    id: 14,
    name: "Megha S.",
    role: "Co-founder",
    company: "LearnChamp",
    rating: 5,
    review: "Boostmysites automated our entire lead qualification process using AI, cutting down response time from 2 hours to 2 minutes.",
    service: "AI Automation",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face"
  }, {
    id: 15,
    name: "Junaid A.",
    role: "CTO",
    company: "BizPulse",
    rating: 5,
    review: "They built us a custom automation engine that pulls data from CRMs, triggers workflows, and even sends AI-written emails. Total lifesaver.",
    service: "AI Automation",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=150&h=150&fit=crop&crop=face"
  }
];

const services = ["All", "Web Applications", "SaaS Solutions", "Mobile Applications", "AI Calling Agency", "AI Automation"];

const ReviewsPage = () => {
  const [selectedService, setSelectedService] = useState("All");

  const filteredReviews = useMemo(() => {
    return selectedService === "All" ? reviews : reviews.filter(review => review.service === selectedService);
  }, [selectedService]);

  const getServiceColor = useMemo(() => {
    return (service: string) => {
      const colors = {
        "Web Applications": "bg-cyan-500/10 text-cyan-300 border-cyan-400/30",
        "SaaS Solutions": "bg-blue-500/10 text-blue-300 border-blue-400/30",
        "Mobile Applications": "bg-purple-500/10 text-purple-300 border-purple-400/30",
        "AI Calling Agency": "bg-pink-500/10 text-pink-300 border-pink-400/30",
        "AI Automation": "bg-green-500/10 text-green-300 border-green-400/30"
      };
      return colors[service as keyof typeof colors] || "bg-gray-500/10 text-gray-300 border-gray-400/30";
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.02),transparent_50%)]"></div>
      
      <Header />
      
      {/* Hero Section with Video Background */}
      <section className="relative pt-20 pb-12 px-6 min-h-[70vh] flex items-center overflow-hidden">
        {/* Video Background */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0"
          preload="metadata"
        >
          <source src="https://res.cloudinary.com/dknafpppp/video/upload/v1748772016/0_Ai_Brain_1280x720_1_om1z8u.mp4" type="video/mp4" />
        </video>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        
        {/* Extra Large Logo Overlay - Desktop */}
        <div className="absolute top-8 left-8 z-15 hidden lg:block">
          <img 
            src="https://res.cloudinary.com/dknafpppp/image/upload/v1748806784/freepik_br_f976b57b-9b0c-47dc-8aa0-439758154a91_cpevk3.png" 
            alt="Boostmysites Logo" 
            className="h-72 w-72 object-contain opacity-90 hover:opacity-100 transition-all duration-500 hover:scale-110 filter drop-shadow-2xl animate-pulse-light"
            loading="lazy"
          />
        </div>
        
        {/* Content */}
        <div className="container mx-auto text-center relative z-20">
          {/* Giant Mobile/Tablet Logo */}
          <div className="lg:hidden mb-12 flex justify-center">
            <img 
              src="https://res.cloudinary.com/dknafpppp/image/upload/v1748806784/freepik_br_f976b57b-9b0c-47dc-8aa0-439758154a91_cpevk3.png" 
              alt="Boostmysites Logo" 
              className="h-64 w-64 md:h-72 md:w-72 object-contain opacity-95 animate-fade-in filter drop-shadow-2xl"
              loading="lazy"
            />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Boostmysites</span>
            {' '}Reviews
          </h1>

          <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto">
            Experience testimonials from the digital frontier - 
            authentic feedback from clients who've ventured into the future with Boostmysites
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[{
              icon: Star,
              value: "4.9/5",
              label: "Rating",
              color: "text-yellow-400"
            }, {
              icon: Zap,
              value: "500+",
              label: "Projects",
              color: "text-cyan-400"
            }, {
              icon: Shield,
              value: "98%",
              label: "Retention",
              color: "text-green-400"
            }, {
              icon: Users,
              value: "15",
              label: "Stories",
              color: "text-purple-400"
            }].map((stat, index) => (
              <div key={index} className="bg-black/30 rounded-xl p-4 border border-cyan-500/20">
                <stat.icon className={`h-6 w-6 ${stat.color} mx-auto mb-2`} />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="px-6 mb-12">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <div className="flex items-center gap-3 bg-black/20 rounded-full px-4 py-2 border border-cyan-500/20">
              <Filter className="h-4 w-4 text-cyan-400" />
              <span className="text-cyan-300 text-sm">Filter:</span>
            </div>
            {services.map(service => (
              <Button 
                key={service} 
                onClick={() => setSelectedService(service)} 
                className={`transition-all duration-200 ${
                  selectedService === service 
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white" 
                    : "bg-black/20 border-cyan-500/20 text-gray-300 hover:bg-cyan-500/10"
                } rounded-full px-4 py-2 text-sm border`}
              >
                {service}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="px-6 pb-20">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((review, index) => (
              <ReviewCard
                key={review.id}
                review={review}
                index={index}
                getServiceColor={getServiceColor}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 pb-20">
        <div className="container mx-auto text-center">
          <div className="bg-black/30 rounded-2xl p-8 border border-cyan-500/20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Join Our{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Success Stories
              </span>
              ?
            </h2>
            <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
              Enter the future of digital innovation. Let's architect your next breakthrough together.
            </p>
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-full hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 font-semibold">
              <Zap className="h-4 w-4 mr-2" />
              Start Your Project
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ReviewsPage;
