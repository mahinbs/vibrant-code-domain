
import React, { useState } from 'react';
import { Star, Filter } from 'lucide-react';
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
  // SaaS Solutions
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
  // Mobile Applications
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
  // AI Calling Agency
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
  // AI Automation
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
      "Web Applications": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      "SaaS Solutions": "bg-blue-500/20 text-blue-400 border-blue-500/30",
      "Mobile Applications": "bg-purple-500/20 text-purple-400 border-purple-500/30",
      "AI Calling Agency": "bg-pink-500/20 text-pink-400 border-pink-500/30",
      "AI Automation": "bg-green-500/20 text-green-400 border-green-500/30"
    };
    return colors[service as keyof typeof colors] || "bg-gray-500/20 text-gray-400 border-gray-500/30";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Reviews</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            See what our clients say about their experience working with Boostmysites
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-cyan-500/20">
              <div className="text-3xl font-bold text-cyan-400">4.9/5</div>
              <div className="text-gray-300">Average Rating</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-cyan-500/20">
              <div className="text-3xl font-bold text-cyan-400">500+</div>
              <div className="text-gray-300">Projects Delivered</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-cyan-500/20">
              <div className="text-3xl font-bold text-cyan-400">98%</div>
              <div className="text-gray-300">Client Retention</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="px-6 mb-12">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Filter className="h-5 w-5 text-cyan-400 mt-2" />
            {services.map((service) => (
              <Button
                key={service}
                onClick={() => setSelectedService(service)}
                variant={selectedService === service ? "default" : "outline"}
                className={`${
                  selectedService === service
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                    : "bg-white/5 border-cyan-500/30 text-gray-300 hover:bg-cyan-500/10"
                } transition-all duration-300`}
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredReviews.map((review, index) => (
              <div
                key={review.id}
                className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:transform hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Service Badge */}
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium border mb-4 ${getServiceColor(review.service)}`}>
                  {review.service}
                </div>

                {/* Rating */}
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Review Text */}
                <blockquote className="text-gray-300 mb-6 leading-relaxed">
                  "{review.review}"
                </blockquote>

                {/* Client Info */}
                <div className="flex items-center">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-12 h-12 rounded-full mr-4 border-2 border-cyan-500/30"
                  />
                  <div>
                    <div className="font-semibold text-white">{review.name}</div>
                    <div className="text-sm text-gray-400">{review.role} at {review.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 pb-20">
        <div className="container mx-auto text-center">
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 backdrop-blur-md rounded-2xl p-12 border border-cyan-500/20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Join Our Success Stories?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's create something amazing together. Get in touch to discuss your project.
            </p>
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 font-medium shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105">
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
