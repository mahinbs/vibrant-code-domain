import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Calendar, Clock, Users, CheckCircle, Star, Play, Target, Briefcase, GraduationCap, ShoppingCart, UserCheck, Zap } from 'lucide-react';
import { useParallax } from '@/hooks/useParallax';
import { usePerformance } from '@/hooks/usePerformance';
import StickyButton from '@/components/ui/StickyButton';
import IconCard from '@/components/ui/IconCard';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface WebinarEvent {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  event_date: string;
  duration_minutes: number;
  speaker_name: string;
  speaker_bio: string;
  speaker_image: string;
  benefits: string[];
  agenda: Array<{ time: string; topic: string }>;
  registration_limit: number;
  // New landing page control fields
  hero_headline?: string;
  hero_subtitle?: string;
  show_scarcity?: boolean;
  sticky_cta_enabled?: boolean;
  cta_text?: string;
  cta_bg_color?: string;
  target_audience?: string[];
  social_proof_logos?: string[];
  social_proof_videos?: string[];
  recognitions?: string[];
  testimonials?: Array<{ quote: string; author: string; role: string; company: string; avatar?: string }>;
  show_social_proof?: boolean;
  privacy_note?: string;
  show_agenda_collapsible?: boolean;
}

interface RegistrationFormData {
  name: string;
  email: string;
  whatsapp_number: string;
}

const WebinarPage = () => {
  const [webinar, setWebinar] = useState<WebinarEvent | null>(null);
  const [registrationCount, setRegistrationCount] = useState(0);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState<RegistrationFormData>({
    name: '',
    email: '',
    whatsapp_number: ''
  });
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  const heroRef = useParallax<HTMLDivElement>({ speed: 0.5 });
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);
  const { throttleScroll } = usePerformance();

  useEffect(() => {
    fetchWebinarData();
    
    // Load Vanta immediately for hero background
    const loadVanta = async () => {
      try {
        // Load Three.js first
        if (!(window as any).THREE) {
          const threeScript = document.createElement('script');
          threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
          threeScript.async = false; // Load synchronously for faster init
          document.head.appendChild(threeScript);
          
          await new Promise((resolve, reject) => {
            threeScript.onload = resolve;
            threeScript.onerror = () => {
              console.error('Failed to load Three.js');
              reject();
            };
          });
        }
        
        // Load Vanta Globe
        if (!(window as any).VANTA) {
          const vantaScript = document.createElement('script');
          vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.globe.min.js';
          vantaScript.async = false; // Load synchronously for faster init
          document.head.appendChild(vantaScript);
          
          await new Promise((resolve, reject) => {
            vantaScript.onload = resolve;
            vantaScript.onerror = () => {
              console.error('Failed to load Vanta');
              reject();
            };
          });
        }
        
        // Initialize Vanta Globe with retry logic
        const initVanta = () => {
          if (vantaRef.current && (window as any).VANTA && !(vantaEffect.current)) {
            try {
              vantaEffect.current = (window as any).VANTA.GLOBE({
                el: vantaRef.current,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0x3fd1ff,
                size: 1.50,
                backgroundColor: 0x15153c
              });
            } catch (error) {
              console.error('Error initializing Vanta:', error);
              // Retry after a short delay
              setTimeout(initVanta, 500);
            }
          } else if (!vantaEffect.current) {
            // Retry if not ready yet
            setTimeout(initVanta, 100);
          }
        };
        
        initVanta();
        
      } catch (error) {
        console.error('Error loading Vanta scripts:', error);
      }
    };
    
    loadVanta();
    
    return () => {
      if (vantaEffect.current) {
        try {
          vantaEffect.current.destroy();
          vantaEffect.current = null;
        } catch (error) {
          console.error('Error destroying Vanta:', error);
        }
      }
    };
  }, []);

  useEffect(() => {
    if (webinar) {
      const timer = setInterval(() => {
        calculateTimeLeft();
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [webinar]);

  const fetchWebinarData = async () => {
    try {
      // Fetch active webinar event
      const { data: webinarData, error: webinarError } = await supabase
        .from('webinar_events')
        .select('*')
        .eq('is_active', true)
        .maybeSingle();

      if (webinarError) {
        console.error('Webinar fetch error:', webinarError);
        toast({
          title: "Error",
          description: "Failed to load webinar information",
          variant: "destructive",
        });
        setIsDataLoading(false);
        return;
      }

      if (!webinarData) {
        setIsDataLoading(false);
        return;
      }

      setWebinar({
        ...webinarData,
        benefits: Array.isArray(webinarData.benefits) 
          ? webinarData.benefits.filter((b: any) => typeof b === 'string') as string[]
          : [],
        agenda: Array.isArray(webinarData.agenda) 
          ? webinarData.agenda.filter((a: any) => a && typeof a === 'object' && a.time && a.topic) as Array<{ time: string; topic: string }>
          : [],
        // Type-safe conversion for new fields
        testimonials: Array.isArray(webinarData.testimonials) 
          ? webinarData.testimonials as Array<{ quote: string; author: string; role: string; company: string; avatar?: string }>
          : [],
        target_audience: Array.isArray(webinarData.target_audience) 
          ? webinarData.target_audience as string[]
          : [],
        social_proof_logos: Array.isArray(webinarData.social_proof_logos) 
          ? webinarData.social_proof_logos as string[]
          : [],
        social_proof_videos: Array.isArray(webinarData.social_proof_videos) 
          ? webinarData.social_proof_videos as string[]
          : [],
        recognitions: Array.isArray(webinarData.recognitions) 
          ? webinarData.recognitions as string[]
          : []
      });

      // Fetch registration count
      const { count, error: countError } = await supabase
        .from('webinar_registrations')
        .select('*', { count: 'exact', head: true })
        .eq('webinar_id', webinarData.id);

      if (!countError) {
        setRegistrationCount(count || 0);
      }
    } catch (error) {
      console.error('Error fetching webinar data:', error);
    } finally {
      setIsDataLoading(false);
    }
  };

  const calculateTimeLeft = () => {
    if (!webinar) return;
    
    const eventDate = new Date(webinar.event_date);
    const now = new Date();
    const difference = eventDate.getTime() - now.getTime();

    if (difference > 0) {
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // For WhatsApp number, only allow digits and limit to 10 characters
    if (name === 'whatsapp_number') {
      const cleanedValue = value.replace(/\D/g, ''); // Remove all non-digits
      if (cleanedValue.length <= 10) {
        setFormData(prev => ({ ...prev, [name]: cleanedValue }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const { name, email, whatsapp_number } = formData;
    
    if (!name.trim()) {
      toast({ title: "Error", description: "Please enter your name", variant: "destructive" });
      return false;
    }
    
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast({ title: "Error", description: "Please enter a valid email address", variant: "destructive" });
      return false;
    }
    
    if (!whatsapp_number.trim()) {
      toast({ title: "Error", description: "Please enter your WhatsApp number", variant: "destructive" });
      return false;
    }
    
    // Validate WhatsApp number is exactly 10 digits
    const cleanedWhatsApp = whatsapp_number.replace(/\D/g, '');
    if (cleanedWhatsApp.length !== 10) {
      toast({ title: "Error", description: "WhatsApp number must be exactly 10 digits", variant: "destructive" });
      return false;
    }
    
    if (!/^[6-9]\d{9}$/.test(cleanedWhatsApp)) {
      toast({ title: "Error", description: "Please enter a valid Indian mobile number starting with 6, 7, 8, or 9", variant: "destructive" });
      return false;
    }
    
    return true;
  };

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !webinar) return;
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('webinar_registrations')
        .insert({
          webinar_id: webinar.id,
          name: formData.name.trim(),
          email: formData.email.trim(),
          whatsapp_number: formData.whatsapp_number.trim()
        });

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Already Registered",
            description: "You have already registered for this webinar!",
            variant: "destructive",
          });
        } else {
          throw error;
        }
        return;
      }

      setIsRegistered(true);
      setRegistrationCount(prev => prev + 1);
      
      toast({
        title: "Registration Successful!",
        description: "You've been registered for the webinar. Check your email for details.",
      });
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToRegistration = () => {
    document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Helper function to display time exactly as stored
  const formatStoredTime = (dateString: string): string => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, '0');
    return `${displayHours}:${displayMinutes} ${ampm}`;
  };

  // Show registered success state
  if (isRegistered) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-accent/20 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <CheckCircle className="relative w-24 h-24 text-primary mx-auto animate-scale-in" />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              You're Registered!
            </h1>
            <p className="text-xl text-muted-foreground">
              Thank you for registering for <strong>{webinar?.title}</strong>
            </p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border rounded-2xl p-8 space-y-6">
            <h2 className="text-2xl font-semibold">What's Next?</h2>
            {webinar && (
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Event Details
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(webinar.event_date).toLocaleDateString()} at{' '}
                    {formatStoredTime(webinar.event_date)}
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Duration
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {webinar.duration_minutes} minutes
                  </p>
                </div>
              </div>
            )}
            
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-semibold">Next Steps:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  Check your email for the webinar link and calendar invite
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  We'll send you a reminder 1 hour before the event
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  Join us 5 minutes early to ensure smooth connectivity
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Have questions? Contact us anytime.
            </p>
            <Button 
              onClick={() => window.location.href = '/contact'}
              variant="outline"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      
      {/* Sticky CTA Button */}
      {webinar && webinar.sticky_cta_enabled && (
        <StickyButton
          text={webinar.cta_text || 'Reserve My Spot Now'}
          onClick={scrollToRegistration}
          bgColor={webinar.cta_bg_color || '#22c55e'}
        />
      )}
      
      {/* Hero Section with Vanta Globe Background - Shows immediately */}
      <section ref={vantaRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16" style={{ backgroundColor: '#15153c' }}>
        {/* Content overlay */}
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        
        {/* Scarcity Bar - Absolute top positioning */}
        {webinar && webinar.show_scarcity && (
          <div className="absolute top-0 left-0 right-0 z-50">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-center py-3 px-4 shadow-lg">
              <div className="flex items-center justify-center gap-2">
                <Zap className="w-4 h-4" />
                <span className="font-semibold text-sm">
                  ⚡ {Math.round(registrationCount / (webinar.registration_limit || 100) * 100)}% seats filled – Reserve your spot before registration closes!
                </span>
              </div>
            </div>
          </div>
        )}
        
        {/* Enhanced Hexagonal Geometric Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
          <div className="absolute top-20 left-20 w-40 h-40 border-2 border-white/20 rounded-lg rotate-45 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 border border-white/15 rounded-lg -rotate-12"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/10 rounded-full"></div>
          <div className="absolute top-10 right-10 w-32 h-32 border-2 border-white/25 rounded-lg rotate-30"></div>
        </div>
        
        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 animate-fade-in">
          {isDataLoading ? (
            /* Loading skeleton for hero content */
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="h-20 bg-white/20 rounded-lg animate-pulse mx-auto max-w-4xl"></div>
                <div className="h-8 bg-white/15 rounded-lg animate-pulse mx-auto max-w-2xl"></div>
              </div>
              <div className="bg-white/95 backdrop-blur-md border border-white/40 rounded-2xl p-8 mx-auto max-w-lg shadow-2xl">
                <div className="h-4 bg-gray-300 rounded animate-pulse mb-6 mx-auto w-32"></div>
                <div className="grid grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-gray-300 rounded-xl p-4 h-20 animate-pulse"></div>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-12 w-40 bg-white/25 rounded-xl animate-pulse"></div>
                ))}
              </div>
              <div className="h-14 w-64 bg-white/30 rounded-xl animate-pulse mx-auto"></div>
            </div>
          ) : webinar ? (
            <>
              {/* Company Branding */}
              <div className="mb-6 space-y-3">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <img 
                    src="/logo.png" 
                    alt="BoostMySites Logo" 
                    className="w-12 h-12 object-contain"
                  />
                  <div className="text-left">
                    <div className="text-white font-bold text-lg">BoostMySites</div>
                    <div className="text-white/80 text-sm">Hosted by BoostMySites</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent leading-tight drop-shadow-2xl">
                  {webinar.hero_headline || webinar.title}
                </h1>
                <p className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto drop-shadow-lg">
                  {webinar.hero_subtitle || webinar.subtitle}
                </p>
              </div>

              {/* Countdown Timer */}
              <div className="bg-white/95 backdrop-blur-md border border-white/40 rounded-2xl p-8 mx-auto max-w-lg shadow-2xl">
                <p className="text-sm text-[#0f172a] mb-6 font-semibold text-center">Event starts in:</p>
                <div className="grid grid-cols-4 gap-4">
                  {Object.entries(timeLeft).map(([unit, value]) => (
                    <div key={unit} className="text-center">
                      <div className="bg-gradient-to-br from-[#1e3a8a] to-[#0f172a] rounded-xl p-4 shadow-lg">
                        <div className="text-3xl md:text-4xl font-bold text-white">{value}</div>
                        <div className="text-xs text-white/80 capitalize font-medium">{unit}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Event Info */}
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center gap-3 bg-white/25 backdrop-blur-md rounded-xl px-6 py-3 border border-white/40 shadow-lg">
                  <Calendar className="w-5 h-5 text-white" />
                  <span className="font-semibold text-white">{new Date(webinar.event_date).toLocaleDateString()} at {formatStoredTime(webinar.event_date)}</span>
                </div>
                <div className="flex items-center gap-3 bg-white/25 backdrop-blur-md rounded-xl px-6 py-3 border border-white/40 shadow-lg">
                  <Clock className="w-5 h-5 text-white" />
                  <span className="font-semibold text-white">{webinar.duration_minutes} minutes</span>
                </div>
                <div className="flex items-center gap-3 bg-white/25 backdrop-blur-md rounded-xl px-6 py-3 border border-white/40 shadow-lg">
                  <Users className="w-5 h-5 text-white" />
                  <span className="font-semibold text-white">{registrationCount}/{webinar.registration_limit} registered</span>
                </div>
              </div>

              <Button 
                size="lg" 
                className="animate-pulse hover:animate-none font-bold text-lg px-8 py-4 rounded-xl shadow-xl transform transition-all duration-300 hover:scale-105 bg-orange-500 hover:bg-orange-600 text-white"
                onClick={scrollToRegistration}
              >
                {webinar.cta_text || 'Reserve Your Spot Now'}
              </Button>
            </>
          ) : (
            /* No webinar state */
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-white">No Active Webinar</h1>
              <p className="text-xl text-white/80">Check back soon for upcoming events!</p>
            </div>
          )}
        </div>
      </section>

      {/* Rest of the page with regular background */}
      <div className="bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#0f172a]">

      {/* Social Proof Section with Auto-scroll */}
      {webinar && webinar.show_social_proof && (webinar.social_proof_logos?.length || webinar.recognitions?.length || webinar.social_proof_videos?.length) && (
        <section className="py-16 bg-white/5 backdrop-blur-sm border-t border-white/20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Trusted by Industry Leaders</h3>
              <p className="text-white/80 text-sm font-medium">BoostMySites - As featured in</p>
            </div>
            
            {/* Company Branding */}
            <div className="flex justify-center mb-8">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-3 flex items-center gap-3">
                <img 
                  src="/logo.png" 
                  alt="BoostMySites Logo" 
                  className="w-8 h-8 object-contain"
                />
                <span className="text-white font-bold text-xl">BoostMySites</span>
                <span className="text-white/80 text-sm">- Digital Excellence Partner</span>
              </div>
            </div>
            
            {/* Auto-scrolling logos */}
            <div className="overflow-hidden">
              <div className="animate-scroll flex items-center gap-12" style={{ 
                animation: 'scroll 30s linear infinite',
                width: 'calc(200% + 4rem)'
              }}>
                {/* First set */}
                {webinar.social_proof_logos?.length ? (
                  <>
                    {webinar.social_proof_logos.map((logo, index) => (
                      <img 
                        key={index} 
                        src={logo} 
                        alt="Media logo" 
                        className="h-12 flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100"
                      />
                    ))}
                    {/* Duplicate for seamless loop */}
                    {webinar.social_proof_logos.map((logo, index) => (
                      <img 
                        key={`dup-${index}`} 
                        src={logo} 
                        alt="Media logo" 
                        className="h-12 flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100"
                      />
                    ))}
                  </>
                ) : (
                  <>
                    {webinar.recognitions?.map((recognition, index) => (
                      <div 
                        key={index}
                        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-3 text-white text-sm font-medium hover:bg-white/15 transition-all duration-300 flex-shrink-0"
                      >
                        {recognition}
                      </div>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {webinar.recognitions?.map((recognition, index) => (
                      <div 
                        key={`dup-${index}`}
                        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-3 text-white text-sm font-medium hover:bg-white/15 transition-all duration-300 flex-shrink-0"
                      >
                        {recognition}
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
            
            {/* Instagram Videos Row - Only show if videos exist */}
            {webinar.social_proof_videos?.length && (
              <div className="mt-16 space-y-8">
                {/* Section Header */}
                <div className="text-center space-y-3">
                  <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                    Real Success Stories
                  </h3>
                  <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
                    Watch our community members share their incredible transformation journeys
                  </p>
                </div>

                {/* Mobile Carousel / Desktop Grid */}
                <div className="relative">
                  {/* Mobile: Horizontal scroll */}
                  <div className="md:hidden overflow-x-auto pb-4">
                    <div className="flex gap-4 min-w-max px-4">
                      {webinar.social_proof_videos.slice(0, 6).map((video, index) => {
                        const getInstagramEmbedUrl = (url: string) => {
                          if (url.includes('instagram.com')) {
                            const postMatch = url.match(/\/p\/([^\/\?]+)/);
                            const reelMatch = url.match(/\/reel\/([^\/\?]+)/);
                            const postId = postMatch?.[1] || reelMatch?.[1];
                            if (postId) {
                              return `https://www.instagram.com/p/${postId}/embed/`;
                            }
                          }
                          return url;
                        };

                        return (
                          <div 
                            key={index} 
                            className="group relative w-72 flex-shrink-0"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                            <div className="relative bg-background/10 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-primary/20 transition-all duration-500 group-hover:-translate-y-1">
                              <iframe
                                src={getInstagramEmbedUrl(video)}
                                width="100%" 
                                height="450"
                                frameBorder="0"
                                scrolling="no"
                                allowTransparency={true}
                                allow="encrypted-media"
                                loading="lazy"
                                className="w-full rounded-2xl"
                                title={`Success story ${index + 1}`}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Desktop: Grid Layout */}
                  <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {webinar.social_proof_videos.slice(0, 6).map((video, index) => {
                      const getInstagramEmbedUrl = (url: string) => {
                        if (url.includes('instagram.com')) {
                          const postMatch = url.match(/\/p\/([^\/\?]+)/);
                          const reelMatch = url.match(/\/reel\/([^\/\?]+)/);
                          const postId = postMatch?.[1] || reelMatch?.[1];
                          if (postId) {
                            return `https://www.instagram.com/p/${postId}/embed/`;
                          }
                        }
                        return url;
                      };

                      return (
                        <div 
                          key={index} 
                          className="group relative animate-fade-in"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          {/* Glow Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                          
                          {/* Video Card */}
                          <div className="relative bg-background/10 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-primary/20 transition-all duration-500 group-hover:-translate-y-2 group-hover:border-white/20">
                            <iframe
                              src={getInstagramEmbedUrl(video)}
                              width="100%" 
                              height="500"
                              frameBorder="0"
                              scrolling="no"
                              allowTransparency={true}
                              allow="encrypted-media"
                              loading="lazy"
                              className="w-full rounded-2xl"
                              title={`Success story ${index + 1}`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Call to Action */}
                <div className="text-center pt-8">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-bold px-8 py-4 rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-primary/25"
                    onClick={scrollToRegistration}
                  >
                    Join Their Success Story
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Speaker Section - Only show when webinar data is loaded */}
      {webinar && (
        <section className="py-20 bg-white/95 backdrop-blur-sm relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a]/5 to-[#0f172a]/5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a]">Meet Your Speaker</h2>
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-[#1e3a8a]">{webinar.speaker_name}</h3>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {webinar.speaker_bio}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-slate-700">Industry Expert with 1000+ Students Trained</span>
                </div>
              </div>
              <div className="relative animate-fade-in">
                <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a] to-[#0f172a] rounded-2xl blur-2xl opacity-20 animate-pulse"></div>
                <img 
                  src={webinar.speaker_image} 
                  alt={webinar.speaker_name}
                  className="relative w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Show loading skeleton for speaker section when data is loading */}
      {isDataLoading && (
        <section className="py-20 bg-white/95 backdrop-blur-sm relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a]/5 to-[#0f172a]/5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="h-10 bg-gray-300 rounded animate-pulse"></div>
                <div className="space-y-4">
                  <div className="h-8 bg-gray-300 rounded animate-pulse w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5"></div>
                  </div>
                </div>
                <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2"></div>
              </div>
              <div className="h-96 bg-gray-300 rounded-2xl animate-pulse"></div>
            </div>
          </div>
        </section>
        )}

        {/* Combined: What You'll Learn & Who Should Attend */}
        <section className="py-20 bg-black relative overflow-hidden">
          {/* AI Brain Video Background */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover z-0"
            preload="metadata"
          >
            <source src="https://res.cloudinary.com/dknafpppp/video/upload/v1748771996/0_Ai_Brain_1920x1080_quggeb.mp4" type="video/mp4" />
          </video>
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            
            {/* Grid Layout: Side by Side */}
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
              
              {/* What You'll Learn - Left Side */}
              <div className="space-y-8">
                <div className="text-center lg:text-left animate-fade-in">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-lg">What You'll Learn</h2>
                  <p className="text-lg text-white/90 drop-shadow-md">
                    This comprehensive session will equip you with practical knowledge and actionable strategies
                  </p>
                </div>
               
                <div className="grid gap-4">
                  {webinar?.benefits?.map((benefit, index) => (
                    <IconCard 
                      key={index}
                      icon={CheckCircle}
                      text={benefit}
                    />
                  )) || []}
                </div>
              </div>

              {/* Who Should Attend - Right Side */}
              <div className="space-y-8">
                <div className="text-center lg:text-left animate-fade-in">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-lg">Who Should Attend?</h2>
                  <p className="text-lg text-white/90 drop-shadow-md">
                    This webinar is perfect for:
                  </p>
                </div>
              
                <div className="grid gap-4">
                  {(webinar?.target_audience?.length ? webinar.target_audience : [
                    'Entrepreneurs & Business Owners',
                    'Digital Marketing Professionals', 
                    'Freelancers & Consultants',
                    'Students & Graduates',
                    'E-commerce Store Owners',
                    'Tech Enthusiasts'
                  ]).map((audience, index) => {
                    const getAudienceIcon = (audience: string) => {
                      if (audience.toLowerCase().includes('entrepreneur')) return Target;
                      if (audience.toLowerCase().includes('freelancer')) return Briefcase;
                      if (audience.toLowerCase().includes('student') || audience.toLowerCase().includes('professional')) return GraduationCap;
                      if (audience.toLowerCase().includes('coach') || audience.toLowerCase().includes('consultant')) return UserCheck;
                      if (audience.toLowerCase().includes('commerce') || audience.toLowerCase().includes('seller')) return ShoppingCart;
                      return UserCheck;
                    };
                    
                    return (
                      <IconCard 
                        key={index}
                        icon={getAudienceIcon(audience)}
                        text={audience}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* CTA after combined sections */}
            <div className="mt-16 text-center">
              <Button 
                size="lg"
                className="font-bold text-lg px-8 py-4 rounded-xl shadow-xl transform transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: webinar?.cta_bg_color || '#22c55e', color: 'white' }}
                onClick={scrollToRegistration}
              >
                {webinar?.cta_text || 'Reserve My Spot Now'}
              </Button>
            </div>
          </div>
        </section>

        {/* Event Agenda */}
        <section className="py-20 bg-black relative overflow-hidden">
          {/* AI Brain Video Background */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover z-0"
            preload="metadata"
          >
            <source src="https://res.cloudinary.com/dknafpppp/video/upload/v1748771996/0_Ai_Brain_1920x1080_quggeb.mp4" type="video/mp4" />
          </video>
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-lg">Event Agenda</h2>
              <p className="text-lg text-white/90 drop-shadow-md">
                A structured 90-minute session designed for maximum value
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              {webinar?.show_agenda_collapsible ? (
                <div className="md:hidden">
                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <Button variant="outline" className="w-full mb-4 bg-white/10 border-white/20 text-white hover:bg-white/20">
                        View Agenda Details
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-4">
                      {webinar?.agenda?.map((item, index) => (
                        <div 
                          key={index}
                          className="bg-white/95 backdrop-blur-sm border border-white/30 rounded-xl p-4 flex items-center gap-4 hover:shadow-2xl hover:bg-white transition-all duration-300"
                        >
                          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 flex-shrink-0 border border-white/30">
                            <Clock className="w-4 h-4 text-[#1e3a8a]" />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col gap-1">
                              <span className="font-semibold text-[#1e3a8a] text-sm">{item.time}</span>
                              <span className="font-medium text-gray-700 text-sm">{item.topic}</span>
                            </div>
                          </div>
                        </div>
                      )) || []}
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              ) : null}
              
              {/* Desktop agenda or expanded mobile view */}
              <div className={webinar?.show_agenda_collapsible ? "hidden md:block space-y-4" : "space-y-4"}>
                {webinar?.agenda?.map((item, index) => (
                  <div 
                    key={index}
                    className="bg-white/95 backdrop-blur-sm border border-white/30 rounded-xl p-6 flex items-center gap-6 hover:shadow-2xl hover:bg-white transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 flex-shrink-0 border border-white/30">
                      <Clock className="w-5 h-5 text-[#1e3a8a]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <span className="font-semibold text-[#1e3a8a]">{item.time}</span>
                        <span className="text-gray-400">•</span>
                        <span className="font-medium text-gray-700">{item.topic}</span>
                      </div>
                    </div>
                  </div>
                )) || []}
              </div>
            </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="registration" className="py-20 bg-black relative overflow-hidden">
        {/* AI Brain Video Background */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0"
          preload="metadata"
        >
          <source src="https://res.cloudinary.com/dknafpppp/video/upload/v1748771996/0_Ai_Brain_1920x1080_quggeb.mp4" type="video/mp4" />
        </video>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-lg">Secure Your Spot</h2>
            <p className="text-lg text-white/90 drop-shadow-md">
              Limited seats available - Register now to guarantee your access
            </p>
            <div className="mt-6 text-sm font-bold text-white bg-white/25 backdrop-blur-md rounded-xl px-6 py-3 inline-block border border-white/30">
              {registrationCount}/{webinar?.registration_limit || 0} spots taken
            </div>
          </div>

          <div className="bg-white/98 backdrop-blur-md border-2 border-white/50 rounded-2xl p-8 shadow-2xl animate-fade-in">
            <form onSubmit={handleRegistration} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white font-semibold">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="border-[#1e3a8a]/40 focus:border-[#1e3a8a] bg-white transition-all duration-200 focus:scale-105 focus:ring-2 focus:ring-[#1e3a8a]/20"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white font-semibold">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className="border-[#1e3a8a]/40 focus:border-[#1e3a8a] bg-white transition-all duration-200 focus:scale-105 focus:ring-2 focus:ring-[#1e3a8a]/20"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsapp_number" className="text-white font-semibold">WhatsApp Number *</Label>
                <Input
                  id="whatsapp_number"
                  name="whatsapp_number"
                  type="tel"
                  value={formData.whatsapp_number}
                  onChange={handleInputChange}
                  placeholder="Enter 10-digit mobile number (e.g., 9876543210)"
                  pattern="[6-9][0-9]{9}"
                  maxLength={10}
                  className="border-[#1e3a8a]/40 focus:border-[#1e3a8a] bg-white transition-all duration-200 focus:scale-105 focus:ring-2 focus:ring-[#1e3a8a]/20"
                  required
                />
                <p className="text-xs text-white/80">
                  Enter your 10-digit WhatsApp number without country code
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-orange-500 hover:bg-orange-600 border-0 text-white font-bold text-lg shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl" 
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    Registering...
                  </div>
                ) : (
                  'Register for Free'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-xs text-white/70">
              {webinar?.privacy_note || 'By registering, you agree to receive webinar updates via email and WhatsApp'}
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
};

export default WebinarPage;