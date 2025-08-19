import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyButton from '@/components/ui/StickyButton';
import GlowBackdrop from '@/components/ui/GlowBackdrop';
import SectionDivider from '@/components/ui/SectionDivider';
import { AnimatedJourneySection } from '@/components/journey/AnimatedJourneySection';
import FeaturedLogosMarquee from '@/components/FeaturedLogosMarquee';
import Title from '@/components/ui/Title';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Play, Check, Star, ArrowRight, X, Target, Users, Briefcase, BookOpen, Zap, HeadphonesIcon } from 'lucide-react';
import TrustBadges from '@/components/ui/TrustBadges';
import TestimonialsSection from '@/components/ui/TestimonialsSection';
import VideoModal from '@/components/ui/VideoModal';
import InstagramSocialProof from '@/components/social/InstagramSocialProof';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ProofCard from '@/components/ui/ProofCard';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const AiFreelancingPage = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [instaVideos, setInstaVideos] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const vantaRef = useRef<HTMLDivElement | null>(null);
  const vantaInstance = useRef<any>(null);
  const heroHeadingRef = useRef<HTMLHeadingElement | null>(null);

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
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x16,
        shininess: 67.00,
        waveHeight: 18.00,
        waveSpeed: 0.90,
        zoom: 1.16
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

  // Fetch Instagram videos from webinar data
  useEffect(() => {
    const fetchInstagramVideos = async () => {
      try {
        const { data: webinarData } = await supabase
          .from('webinar_events')
          .select('social_proof_videos')
          .eq('is_active', true)
          .maybeSingle();

        if (webinarData?.social_proof_videos) {
          setInstaVideos(webinarData.social_proof_videos);
        }
      } catch (error) {
        console.error('Error fetching Instagram videos:', error);
      }
    };

    fetchInstagramVideos();
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

  // ML11 Animation Effect
  useEffect(() => {
    if (!heroHeadingRef.current) return;

    // Wrap words first, then letters within words
    const lettersElement = heroHeadingRef.current.querySelector('.ml11-letters');
    if (!lettersElement) return;

    const text = lettersElement.textContent || '';
    
    // Split by words and wrap each word, then wrap letters within words
    const wordsHtml = text.split(' ').map(word => {
      const lettersHtml = word.replace(/([^\x00-\x80]|\w)/g, "<span class='ml11-letter'>$&</span>");
      return `<span class="ml11-word">${lettersHtml}</span>`;
    }).join(' ');
    
    lettersElement.innerHTML = wordsHtml;

    // Set initial state - all letters hidden
    gsap.set('.ml11-letter', { opacity: 0 });
    gsap.set('.ml11-line', { scaleY: 0, opacity: 0.5, x: 0 });

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set('.ml11-letter', { opacity: 1 });
      return;
    }

    // Create GSAP timeline
    const tl = gsap.timeline({ repeat: -1, delay: 1 });

    tl.fromTo('.ml11-line', 
      { scaleY: 0, opacity: 0.5 },
      { scaleY: 1, opacity: 1, duration: 0.7, ease: "expo.out" }
    )
    .to('.ml11-line', {
      x: () => {
        const lettersWidth = lettersElement?.getBoundingClientRect().width || 0;
        return lettersWidth + 10;
      },
      duration: 0.7,
      ease: "expo.out",
      delay: 0.1
    })
    .fromTo('.ml11-letter',
      { opacity: 0 },
      { 
        opacity: 1,
        duration: 0.6,
        ease: "expo.out",
        stagger: 0.034
      },
      "-=0.775"
    )
    .to('.ml11', {
      opacity: 0,
      duration: 1,
      ease: "expo.out",
      delay: 1
    })
    .set('.ml11', { opacity: 1 })
    .set('.ml11-line', { scaleY: 0, opacity: 0.5, x: 0 })
    .set('.ml11-letter', { opacity: 0 });

  }, []);

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
      icon: (
        <div className="icon-circle w-10 h-10 rounded-full flex items-center justify-center mx-auto">
          <BookOpen className="icon w-5 h-5" />
        </div>
      ),
      title: "Training",
      description: "Complete AI freelancing course"
    },
    {
      icon: (
        <div className="icon-circle w-10 h-10 rounded-full flex items-center justify-center mx-auto">
          <Target className="icon w-5 h-5" />
        </div>
      ),
      title: "CRM + Tools",
      description: "Ready-to-use systems"
    },
    {
      icon: (
        <div className="icon-circle w-10 h-10 rounded-full flex items-center justify-center mx-auto">
          <Briefcase className="icon w-5 h-5" />
        </div>
      ),
      title: "Sell under our brand",
      description: "Use our portfolio & proven reputation"
    },
    {
      icon: (
        <div className="icon-circle w-10 h-10 rounded-full flex items-center justify-center mx-auto">
          <HeadphonesIcon className="icon w-5 h-5" />
        </div>
      ),
      title: "Support Team",
      description: "24/7 guidance"
    },
    {
      icon: (
        <div className="icon-circle w-10 h-10 rounded-full flex items-center justify-center mx-auto">
          <Zap className="icon w-5 h-5" />
        </div>
      ),
      title: "Landing Pages",
      description: "Professional websites"
    },
    {
      icon: (
        <div className="icon-circle w-10 h-10 rounded-full flex items-center justify-center mx-auto">
          <Users className="icon w-5 h-5" />
        </div>
      ),
      title: "Mentorship",
      description: "Expert guidance"
    },
    {
      icon: (
        <div className="icon-circle w-10 h-10 rounded-full flex items-center justify-center mx-auto">
          <Star className="icon w-5 h-5" />
        </div>
      ),
      title: "10+ services to start selling",
      description: "Ready-made service offerings"
    },
    {
      icon: (
        <div className="icon-circle w-10 h-10 rounded-full flex items-center justify-center mx-auto">
          <ArrowRight className="icon w-5 h-5" />
        </div>
      ),
      title: "Sales strategies",
      description: "Proven methods to close deals"
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
      question: "What kind of support will I get?",
      answer: "You'll receive a dedicated landing page, CRM access, marketing and lead generation support, technical help for proposals and deals, plus complete project delivery so you can focus only on growth."
    },
    {
      question: "What services can I sell?",
      answer: "You can sell high-demand services like AI development, web and app development, UI/UX design, blockchain, cloud computing, VR/AR, chatbots, analytics, game development, IoT and more — all fulfilled by our expert team."
    },
    {
      question: "Do I need to invest in tools or ads?",
      answer: "No, you don't. Everything you need to start, including CRM, landing page, and project support, is already included."
    },
    {
      question: "Can I do this part-time?",
      answer: "Yes, you can begin part-time and scale up at your own pace as you bring in more clients."
    },
    {
      question: "Is there any long-term contract?",
      answer: "No, there are no binding contracts. You can cancel anytime after your trial if you don't wish to continue."
    },
    {
      question: "How much can I earn?",
      answer: "Your earnings depend on the clients you bring and the services you sell, but with high-value services, the potential is unlimited."
    },
    {
      question: "Do I need coding skills?",
      answer: "No, beginners are welcome! Our training is designed for people with no technical background."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white dark">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-40 md:pt-44 lg:pt-48 pb-20 relative overflow-hidden">
        <div ref={vantaRef} className="absolute inset-0 z-0 pointer-events-none" />
        <GlowBackdrop position="top-right" size="large" color="blue" intensity="high" />
        <GlowBackdrop position="bottom-left" size="medium" color="teal" intensity="medium" />
        <GlowBackdrop position="center" size="large" color="purple" intensity="low" className="opacity-30" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 ref={heroHeadingRef} className="ml11 text-5xl md:text-6xl mb-6 font-bold">
                  <span className="ml11-text-wrapper">
                    <span className="ml11-line"></span>
                    <span className="ml11-letters">Launch Your AI Freelancing Career – For Just $1</span>
                  </span>
                </h1>
                <p className="text-xl text-white mb-6">
                  This isn't a course — it's a complete freelancing package. Get CRM tools, outreach strategies, marketing support, and real implementation resources that show you exactly how to start making money with AI — all for just $1 in your first month.
                </p>
                <div className="bg-red-500/20 border border-red-500/40 rounded-lg p-3 mb-6 max-w-md">
                  <p className="text-red-300 text-sm font-semibold">⏰ Limited to first 100 freelancers only</p>
                  <p className="text-red-200 text-xs">Secure your spot now</p>
                </div>
                <Button 
                  onClick={scrollToForm}
                  size="lg"
                  className="text-lg px-8 py-6 h-auto mb-4"
                >
                  Start for Just $1
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <TrustBadges />
                
              </div>
              <div className="relative">
                <div className="bg-card/40 backdrop-blur-sm border border-white/10 rounded-xl p-8 shadow-lg">
                  <AspectRatio ratio={9/16}>
                    <div 
                      onClick={() => setIsVideoModalOpen(true)}
                      className="flex items-center justify-center w-full h-full bg-muted rounded-lg mb-4 relative group cursor-pointer hover:bg-muted/80 transition-all"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg"></div>
                      <div className="relative z-10 text-center">
                        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                        <p className="text-white font-semibold">Watch: How you'll start freelancing for $1</p>
                        <p className="text-gray-300 text-sm mt-1">1 minute demo</p>
                      </div>
                    </div>
                  </AspectRatio>
                  <p className="text-sm text-muted-foreground text-center">
                    See exactly what you'll get in your $1 trial
                  </p>
                </div>
              </div>
            </div>
            
            {/* Powered by BoostMySites BaaS - Within Hero */}
            <div className="mt-12">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-white mb-1">
                  Powered by Boostmysites Business-As-A-Service
                </h3>
              </div>
              <FeaturedLogosMarquee 
                direction="left" 
                speed={30} 
                showTitle={true}
                titleText="As featured in"
              />
            </div>
          </div>
        </div>
        
        <div className="relative w-full h-px mt-8">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      </section>

      {/* Your Journey to Success Section */}
      <div className="relative">
        <GlowBackdrop position="center" size="large" color="teal" intensity="medium" />
        <GlowBackdrop position="top-right" size="large" color="blue" intensity="high" />
        <GlowBackdrop position="bottom-left" size="medium" color="purple" intensity="high" />
        <AnimatedJourneySection onCtaClick={scrollToForm} />
      </div>

      <SectionDivider />

      <TestimonialsSection />

      <SectionDivider />

      <InstagramSocialProof 
        videoUrls={instaVideos}
        title="Success Stories from Our Community"
        subtitle="Real transformations from our AI freelancing program"
        onCta={scrollToForm}
        background="inherit"
      />

      <SectionDivider />

      {/* FAQ Section */}
      <section className="py-20 relative">
        <GlowBackdrop position="top-right" size="large" color="blue" intensity="high" />
        <GlowBackdrop position="bottom-left" size="large" color="teal" intensity="medium" />
        <GlowBackdrop position="center" size="medium" color="purple" intensity="low" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 pointer-events-none z-0"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <Title className="text-4xl mb-4">Frequently Asked Questions</Title>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-card/40 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
                  <AccordionTrigger className="px-6 py-4 text-left hover:bg-card/60 transition-all">
                    <span className="font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="text-center mt-12">
            <Button onClick={scrollToForm} size="lg" className="mb-4">
              Still Have Questions? Start for $1
            </Button>
            <TrustBadges />
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* What You'll Get for Just $1 Section */}
      <section className="py-20 relative">
        <GlowBackdrop position="top-left" size="large" color="blue" intensity="medium" />
        <GlowBackdrop position="bottom-right" size="medium" color="purple" intensity="high" />
        <GlowBackdrop position="center" size="small" color="teal" intensity="low" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 pointer-events-none z-0"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Title className="text-4xl mb-4">What You'll Get for Just $1</Title>
            <p className="text-xl text-muted-foreground mb-6">Everything you need to start your AI freelancing journey</p>
            <div className="inline-block bg-primary/20 border border-primary/40 rounded-full px-6 py-2">
              <p className="text-primary font-bold text-lg">$2,000+ value — yours for $1 trial</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            {benefits.map((benefit, index) => (
              <ProofCard
                key={index}
                title={benefit.title}
                subtitle={benefit.description}
                icon={benefit.icon}
              />
            ))}
          </div>
          <div className="text-center">
            <Button onClick={scrollToForm} variant="outline" size="lg" className="mb-4">
              Start Now – Just $1
            </Button>
            <TrustBadges />
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Final CTA Section */}
      <section id="lead-form" className="py-20 relative">
        <GlowBackdrop position="bottom-left" size="large" color="purple" intensity="high" />
        <GlowBackdrop position="top-right" size="large" color="blue" intensity="high" />
        <GlowBackdrop position="center" size="medium" color="teal" intensity="medium" />
        <GlowBackdrop position="bottom-right" size="small" color="blue" intensity="low" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90 pointer-events-none z-0"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <Title className="text-4xl mb-4">Your AI Freelancing Journey Starts Today</Title>
            <p className="text-xl text-muted-foreground mb-8">For the price of a coffee</p>
            
            {isFormVisible && (
              <form onSubmit={handleFormSubmit} className="bg-card/40 backdrop-blur-sm border border-white/10 rounded-xl p-8 shadow-lg">
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
                    required
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
          <div className="bg-card/90 backdrop-blur-sm border border-white/10 rounded-xl p-8 max-w-md w-full relative">
            <button 
              onClick={() => setShowExitIntent(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-bold mb-4">Still thinking?</h3>
            <p className="text-muted-foreground mb-6">Don't miss the $1 chance to start freelancing in AI. Claim before spots fill.</p>
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

      <VideoModal 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
      />

      <Footer />
    </div>
  );
};

export default AiFreelancingPage;