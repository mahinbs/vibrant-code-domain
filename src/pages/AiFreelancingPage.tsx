import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyButton from '@/components/ui/StickyButton';
import { AnimatedJourneySection } from '@/components/journey/AnimatedJourneySection';
import FeaturedLogosMarquee from '@/components/FeaturedLogosMarquee';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Play, Check, Star, ArrowRight, X } from 'lucide-react';

const AiFreelancingPage = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const vantaRef = useRef<HTMLDivElement | null>(null);
  const vantaInstance = useRef<any>(null);

  // Vanta Waves background effect
  useEffect(() => {
    const initVanta = () => {
      if (!vantaRef.current || vantaInstance.current || !(window as any).VANTA?.WAVES) return;
      
      console.log('Initializing Vanta Waves background');
      vantaInstance.current = (window as any).VANTA.WAVES({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x200088
      });
    };

    // Try to initialize immediately
    initVanta();
    
    // If VANTA is not loaded yet, retry periodically
    const retryInterval = setInterval(initVanta, 200);

    return () => {
      clearInterval(retryInterval);
      if (vantaInstance.current) {
        vantaInstance.current.destroy();
        vantaInstance.current = null;
      }
    };
  }, []);

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !showExitIntent) {
        setShowExitIntent(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [showExitIntent]);

  const scrollToForm = () => {
    setIsFormVisible(true);
    const formElement = document.getElementById('lead-form');
    formElement?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('trial_leads')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          source: 'ai_freelancing_trial'
        }]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Thank you for your interest! We'll contact you soon with your $1 trial details.",
      });

      setFormData({ name: '', email: '', phone: '' });
      setIsFormVisible(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: <Check className="w-6 h-6 text-primary" />,
      title: "1 Month AI Freelancing Training",
      description: "Step-by-step roadmap from beginner to earning freelancer"
    },
    {
      icon: <Check className="w-6 h-6 text-primary" />,
      title: "Access to CRM & AI Tools",
      description: "Ready-to-use tools with no setup needed"
    },
    {
      icon: <Check className="w-6 h-6 text-primary" />,
      title: "Real Client Proposals & Projects", 
      description: "Hands-on practice with actual client work"
    },
    {
      icon: <Check className="w-6 h-6 text-primary" />,
      title: "Dedicated Support Team",
      description: "We guide you at every step of your journey"
    }
  ];

  const steps = [
    { number: "01", title: "Sign up with $1", description: "Get instant access to everything" },
    { number: "02", title: "Get your training, CRM, and tools", description: "Everything ready to use" },
    { number: "03", title: "Learn AI freelancing in easy steps", description: "Follow our proven roadmap" },
    { number: "04", title: "Pitch to clients using ready-made proposals", description: "We provide the templates" },
    { number: "05", title: "Start earning", description: "Get your first paying client" }
  ];

  const faqs = [
    {
      question: "Do I need coding skills?",
      answer: "No, beginners are welcome! Our training is designed for people with no technical background."
    },
    {
      question: "What if I can't find clients?",
      answer: "We give you projects, proposals, and even help you find clients. You're never alone in this journey."
    },
    {
      question: "What happens after the $1 trial?",
      answer: "You choose to continue or stop. No hidden fees, no risk. Cancel anytime during the trial."
    },
    {
      question: "How quickly can I start earning?",
      answer: "70% of our freelancers get their first paying client within 30 days of starting the program."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div ref={vantaRef} className="absolute inset-0 z-0 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  Launch Your <span className="text-primary">AI Freelancing</span> Career – For Just <span className="text-secondary">$1</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Get your first month of training, tools, and projects at just $1. Start freelancing in AI with no prior experience required.
                </p>
                <Button 
                  onClick={scrollToForm}
                  size="lg"
                  className="text-lg px-8 py-6 h-auto"
                >
                  Start for Just $1
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="relative">
                <div className="bg-card border rounded-xl p-8 shadow-lg">
                  <div className="flex items-center justify-center h-64 bg-muted rounded-lg mb-4 relative group cursor-pointer">
                    <Play className="w-16 h-16 text-primary group-hover:scale-110 transition-transform" />
                    <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-medium">Demo Video - 1 Minute</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    See exactly what you'll get in your $1 trial
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Get Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What You'll Get for Just $1</h2>
            <p className="text-xl text-muted-foreground">Everything you need to start your AI freelancing journey</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-card border rounded-xl p-6 text-center hover:shadow-lg transition-all">
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button onClick={scrollToForm} variant="outline" size="lg">
              Start Now – Just $1
            </Button>
          </div>
        </div>
      </section>

      {/* Why This is Different */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why This is Different</h2>
            <FeaturedLogosMarquee />
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-lg font-medium mb-2">70% of freelancers got their first paying client within 30 days</p>
              <p className="text-sm text-muted-foreground">Based on our program completion data</p>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Journey Section */}
      <AnimatedJourneySection onCtaClick={scrollToForm} />

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-card border rounded-xl p-6 mb-4">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="lead-form" className="py-20 bg-primary/5">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Your AI Freelancing Journey Starts Today</h2>
            <p className="text-xl text-muted-foreground mb-8">For the price of a coffee</p>
            
            {isFormVisible && (
              <form onSubmit={handleFormSubmit} className="bg-card border rounded-xl p-8 shadow-lg">
                <div className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                  <Input
                    type="tel"
                    placeholder="Your Phone (Optional)"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Claim My $1 Trial Now'}
                  </Button>
                </div>
              </form>
            )}
            
            {!isFormVisible && (
              <Button onClick={scrollToForm} size="lg" className="text-lg px-8 py-6 h-auto">
                Claim My $1 Trial Now
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Exit Intent Popup */}
      {showExitIntent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card border rounded-xl p-8 max-w-md w-full relative">
            <button 
              onClick={() => setShowExitIntent(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-bold mb-4">Still thinking?</h3>
            <p className="text-muted-foreground mb-6">Don't miss this $1 chance to start freelancing in AI.</p>
            <Button 
              onClick={() => {
                setShowExitIntent(false);
                scrollToForm();
              }} 
              className="w-full"
              size="lg"
            >
              Grab the $1 Trial
            </Button>
          </div>
        </div>
      )}

      <StickyButton 
        text="Start for $1" 
        onClick={scrollToForm}
        bgColor="#22c55e"
      />

      <Footer />
    </div>
  );
};

export default AiFreelancingPage;