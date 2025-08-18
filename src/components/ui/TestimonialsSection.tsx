import React from 'react';
import { Star } from 'lucide-react';
import Title from './Title';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: "Ramesh Kumar",
      location: "Bangalore",
      text: "I got my first AI freelancing client in 17 days! Never thought it was possible.",
      rating: 5,
      earnings: "₹45,000 in first month"
    },
    {
      name: "Priya Sharma", 
      location: "Delhi",
      text: "The CRM system helped me manage 12 leads in my first week. Amazing results!",
      rating: 5,
      earnings: "₹38,000 in first month"
    },
    {
      name: "Arjun Patel",
      location: "Mumbai", 
      text: "From zero experience to landing my first project. The training is incredible!",
      rating: 5,
      earnings: "₹52,000 in first month"
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 pointer-events-none"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <Title className="text-4xl mb-4">Real Success Stories</Title>
          <p className="text-xl text-muted-foreground">See what our students achieve in their first month</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card/10 backdrop-blur-sm border border-border/20 rounded-xl p-6 hover:bg-card/15 transition-all duration-300">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-foreground mb-4 italic">"{testimonial.text}"</p>
              <div className="border-t border-border/20 pt-4">
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                <p className="text-sm font-semibold text-primary mt-2">{testimonial.earnings}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;