
import React, { useState } from 'react';
import { Star, Filter, Zap, Shield, Users, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

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
  // Web Applications
  {
    id: 1,
    name: "Jason M.",
    role: "COO",
    company: "FinEdge Systems",
    rating: 5,
    review: "The team at Boostmysites delivered a sleek, high-performance web app that transformed our manual processes into a seamless digital experience. Their responsiveness and attention to detail were unmatched.",
    service: "Web Applications",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Neha J.",
    role: "CEO",
    company: "Craftly Digital",
    rating: 5,
    review: "Boostmysites created a powerful web platform for us that handles thousands of users daily without a hitch. The interface is clean, responsive, and exactly what we envisioned.",
    service: "Web Applications",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Richard P.",
    role: "Founder",
    company: "LegalQuik",
    rating: 5,
    review: "They understood our complex requirements and translated them into a beautifully functioning web application. Timely delivery and excellent support throughout.",
    service: "Web Applications",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 4,
    name: "Aparna R.",
    role: "Founder",
    company: "EduFlex LMS",
    rating: 5,
    review: "From ideation to execution, Boostmysites helped us launch a complete SaaS platform that's now being used by over 3,000 customers. Their understanding of subscription models and analytics made all the difference.",
    service: "SaaS Solutions",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 5,
    name: "Taran V.",
    role: "Founder",
    company: "InvoicePro",
    rating: 5,
    review: "Building a SaaS from scratch felt overwhelming until we partnered with Boostmysites. They managed everything—multi-tenancy, payment gateways, analytics, and more.",
    service: "SaaS Solutions",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 6,
    name: "Linda S.",
    role: "CMO",
    company: "HostEase",
    rating: 5,
    review: "Their SaaS expertise is evident in the way they structured our backend. We now have a stable subscription platform that continues to grow month after month.",
    service: "SaaS Solutions",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 7,
    name: "Daniel K.",
    role: "Product Lead",
    company: "FitHabit",
    rating: 5,
    review: "Our mobile app needed to work flawlessly on both Android and iOS. Boostmysites built an intuitive cross-platform experience that our users love. 5-star app ratings speak for themselves!",
    service: "Mobile Applications",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 8,
    name: "Claire T.",
    role: "Head of Product",
    company: "PetTrack",
    rating: 5,
    review: "Our app needed real-time updates and a slick user interface. Boostmysites nailed both. It's fast, modern, and users are staying longer.",
    service: "Mobile Applications",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 9,
    name: "Yash R.",
    role: "Founder",
    company: "MealMate",
    rating: 5,
    review: "They delivered our cross-platform app on time and helped us publish it on both Play Store and App Store with zero hassle. Excellent experience!",
    service: "Mobile Applications",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 10,
    name: "Shruti M.",
    role: "Head of Ops",
    company: "Rentzy",
    rating: 5,
    review: "The AI calling system Boostmysites built has automated 90% of our outbound calls, saving us over 300 hours/month. The natural language interaction is so good most customers don't even realize it's AI.",
    service: "AI Calling Agency",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 11,
    name: "Deepak K.",
    role: "CEO",
    company: "LoanKart365",
    rating: 5,
    review: "Our sales team reduced cold-call hours by 80% thanks to the AI calling system Boostmysites built. The voice tech feels incredibly human.",
    service: "AI Calling Agency",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 12,
    name: "Sophia A.",
    role: "Ops Manager",
    company: "QuickDrop",
    rating: 5,
    review: "Integrating AI into our customer support was a game-changer. Calls are handled intelligently and routing is now fully automated.",
    service: "AI Calling Agency",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 13,
    name: "Ali R.",
    role: "CTO",
    company: "Medicare Desk",
    rating: 5,
    review: "They didn't just build automation—they helped us rethink how we work. Our internal workflows are now lightning-fast thanks to their AI integrations. Boostmysites is a real game-changer.",
    service: "AI Automation",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 14,
    name: "Megha S.",
    role: "Co-founder",
    company: "LearnChamp",
    rating: 5,
    review: "Boostmysites automated our entire lead qualification process using AI, cutting down response time from 2 hours to 2 minutes.",
    service: "AI Automation",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face"
  },
  {
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

  const filteredReviews = selectedService === "All" 
    ? reviews 
    : reviews.filter(review => review.service === selectedService);

  const getServiceColor = (service: string) => {
    const colors = {
      "Web Applications": "bg-gradient-to-r from-cyan-500/20 to-cyan-300/20 text-cyan-300 border-cyan-400/50 shadow-cyan-400/20",
      "SaaS Solutions": "bg-gradient-to-r from-blue-500/20 to-blue-300/20 text-blue-300 border-blue-400/50 shadow-blue-400/20",
      "Mobile Applications": "bg-gradient-to-r from-purple-500/20 to-purple-300/20 text-purple-300 border-purple-400/50 shadow-purple-400/20",
      "AI Calling Agency": "bg-gradient-to-r from-pink-500/20 to-pink-300/20 text-pink-300 border-pink-400/50 shadow-pink-400/20",
      "AI Automation": "bg-gradient-to-r from-green-500/20 to-green-300/20 text-green-300 border-green-400/50 shadow-green-400/20"
    };
    return colors[service as keyof typeof colors] || "bg-gray-500/20 text-gray-300 border-gray-400/50";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Futuristic Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.03),transparent_50%)]"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
      </div>
      
      <Header />
      
      {/* Hero Section with Holographic Effect */}
      <section className="pt-20 pb-12 px-6 relative">
        <div className="container mx-auto text-center relative z-10">
          {/* Holographic Title */}
          <div className="relative mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 relative">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
                Neural
              </span>
              <span className="text-white mx-4">Reviews</span>
              <span className="bg-gradient-to-r from-pink-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-pulse">
                Matrix
              </span>
              {/* Holographic overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 blur-xl -z-10 animate-glow"></div>
            </h1>
          </div>

          <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Experience testimonials from the <span className="text-cyan-400 font-semibold">digital frontier</span> - 
            authentic feedback from clients who've ventured into the future with Boostmysites
          </p>

          {/* Stats with 3D Effect */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Star, value: "4.9/5", label: "Neural Rating", color: "text-yellow-400" },
              { icon: Zap, value: "500+", label: "Projects Deployed", color: "text-cyan-400" },
              { icon: Shield, value: "98%", label: "Client Retention", color: "text-green-400" },
              { icon: Users, value: "15", label: "Success Stories", color: "text-purple-400" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="group relative transform hover:scale-105 transition-all duration-500"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-400/20">
                  {/* 3D Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-2xl blur-sm group-hover:blur-none transition-all duration-500"></div>
                  <div className="relative z-10">
                    <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-3 animate-pulse`} />
                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
                  </div>
                  {/* Holographic shine */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Section with Neon Effects */}
      <section className="px-6 mb-12 relative z-10">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-8 relative">
            <div className="flex items-center gap-4 bg-black/30 backdrop-blur-xl rounded-full px-6 py-3 border border-cyan-500/30">
              <Filter className="h-5 w-5 text-cyan-400" />
              <span className="text-cyan-300 font-medium">Neural Filter:</span>
            </div>
            {services.map((service) => (
              <Button
                key={service}
                onClick={() => setSelectedService(service)}
                className={`relative overflow-hidden transition-all duration-500 transform hover:scale-105 ${
                  selectedService === service
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30 border-cyan-400/50"
                    : "bg-black/30 backdrop-blur-xl border-cyan-500/30 text-gray-300 hover:bg-cyan-500/10 hover:border-cyan-400/50 hover:text-cyan-300"
                } rounded-full px-6 py-3 font-medium border`}
              >
                {selectedService === service && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 animate-pulse"></div>
                )}
                <span className="relative z-10">{service}</span>
                {/* Neon glow effect */}
                {selectedService === service && (
                  <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full animate-pulse"></div>
                )}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Grid with Advanced 3D Cards */}
      <section className="px-6 pb-20 relative z-10">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredReviews.map((review, index) => (
              <div
                key={review.id}
                className="group relative transform transition-all duration-700 hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Card Container with 3D Transform */}
                <div className="relative bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-700 hover:shadow-2xl hover:shadow-cyan-400/20 transform-gpu perspective-1000 hover:rotateY-2 hover:rotateX-2">
                  
                  {/* Holographic Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  {/* Service Badge with Neon Effect */}
                  <div className={`inline-block px-4 py-2 rounded-full text-xs font-bold border mb-6 relative overflow-hidden ${getServiceColor(review.service)}`}>
                    <span className="relative z-10">{review.service}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>

                  {/* Rating with Floating Animation */}
                  <div className="flex mb-6 space-x-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="h-5 w-5 text-yellow-400 fill-current transform hover:scale-125 transition-transform duration-300 animate-pulse" 
                        style={{ animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>

                  {/* Review Text with Typewriter Effect */}
                  <blockquote className="text-gray-300 mb-8 leading-relaxed text-lg relative">
                    <span className="text-cyan-400 text-4xl absolute -top-2 -left-2 opacity-50">"</span>
                    <span className="relative z-10">{review.review}</span>
                    <span className="text-cyan-400 text-4xl absolute -bottom-4 -right-2 opacity-50">"</span>
                  </blockquote>

                  {/* Client Info with Avatar Glow */}
                  <div className="flex items-center relative">
                    <div className="relative mr-4">
                      <img
                        src={review.image}
                        alt={review.name}
                        className="w-16 h-16 rounded-full border-2 border-cyan-400/50 shadow-lg shadow-cyan-400/20 group-hover:shadow-cyan-400/40 transition-all duration-500"
                      />
                      {/* Avatar glow effect */}
                      <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-md animate-pulse"></div>
                    </div>
                    <div>
                      <div className="font-bold text-white text-lg mb-1">{review.name}</div>
                      <div className="text-cyan-300 font-medium">{review.role}</div>
                      <div className="text-gray-400 text-sm">at {review.company}</div>
                    </div>
                  </div>

                  {/* Scan Line Effect */}
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse"></div>
                  
                  {/* Corner Accent */}
                  <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-cyan-400/30 group-hover:border-cyan-400/60 transition-colors duration-500"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-cyan-400/30 group-hover:border-cyan-400/60 transition-colors duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Holographic Design */}
      <section className="px-6 pb-20 relative z-10">
        <div className="container mx-auto text-center">
          <div className="relative bg-black/40 backdrop-blur-xl rounded-3xl p-12 border border-cyan-500/30 overflow-hidden">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-600/5 to-purple-600/5 animate-pulse"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(0,255,255,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(0,128,255,0.1),transparent_50%)]"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Join Our{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                  Success Matrix
                </span>
                ?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Enter the future of digital innovation. Let's architect your next breakthrough together.
              </p>
              <Button className="relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-12 py-4 rounded-full hover:from-cyan-400 hover:to-blue-500 transition-all duration-500 font-bold text-lg shadow-2xl shadow-cyan-500/30 transform hover:scale-105 border border-cyan-400/50">
                <span className="relative z-10 flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Initialize Project
                </span>
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 blur-xl animate-pulse"></div>
                {/* Scan line */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ReviewsPage;
