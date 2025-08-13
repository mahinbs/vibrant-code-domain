import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Calendar, Clock, Users, CheckCircle, Star, Play } from 'lucide-react';
import { useParallax } from '@/hooks/useParallax';
import { usePerformance } from '@/hooks/usePerformance';

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
}

interface RegistrationFormData {
  name: string;
  email: string;
  whatsapp_number: string;
}

const WebinarPage = () => {
  const [webinar, setWebinar] = useState<WebinarEvent | null>(null);
  const [registrationCount, setRegistrationCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState<RegistrationFormData>({
    name: '',
    email: '',
    whatsapp_number: ''
  });
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  const heroRef = useParallax<HTMLDivElement>({ speed: 0.5 });
  const { throttleScroll } = usePerformance();

  useEffect(() => {
    fetchWebinarData();
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
        setIsLoading(false);
        return;
      }

      if (!webinarData) {
        setIsLoading(false);
        return;
      }

      setWebinar({
        ...webinarData,
        benefits: Array.isArray(webinarData.benefits) 
          ? webinarData.benefits.filter((b: any) => typeof b === 'string') as string[]
          : [],
        agenda: Array.isArray(webinarData.agenda) 
          ? webinarData.agenda.filter((a: any) => a && typeof a === 'object' && a.time && a.topic) as Array<{ time: string; topic: string }>
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
      setIsLoading(false);
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
    setFormData(prev => ({ ...prev, [name]: value }));
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading webinar...</p>
        </div>
      </div>
    );
  }

  if (!webinar) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Active Webinar</h1>
          <p className="text-muted-foreground">There are no active webinars at the moment.</p>
        </div>
      </div>
    );
  }

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
              Thank you for registering for <strong>{webinar.title}</strong>
            </p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border rounded-2xl p-8 space-y-6">
            <h2 className="text-2xl font-semibold">What's Next?</h2>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Event Details
                </h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(webinar.event_date).toLocaleDateString()} at{' '}
                  {new Date(webinar.event_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
    <div className="min-h-screen bg-gradient-to-br from-[#4A90E2] via-[#2563eb] to-[#1A365D] relative overflow-hidden">
      {/* Hexagonal Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      
      {/* Floating Hexagons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-16 h-16 bg-white/5 rounded-lg rotate-45 animate-float"></div>
        <div className="absolute top-32 right-20 w-12 h-12 bg-white/10 rounded-lg rotate-12 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-white/5 rounded-lg -rotate-12 animate-float" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-32 right-1/3 w-14 h-14 bg-white/10 rounded-lg rotate-45 animate-float" style={{animationDelay: '6s'}}></div>
        <div className="absolute top-1/2 left-10 w-10 h-10 bg-white/5 rounded-lg rotate-12 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/3 right-10 w-18 h-18 bg-white/5 rounded-lg -rotate-45 animate-float" style={{animationDelay: '3s'}}></div>
      </div>
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4A90E2]/80 via-[#2563eb]/60 to-[#1A365D]/90"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(74,144,226,0.3),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(26,54,93,0.4),transparent_70%)]"></div>
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Hexagonal Geometric Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-32 h-32 border border-white/10 rounded-lg rotate-45 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 border-2 border-white/5 rounded-lg -rotate-12"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-white/5 rounded-full"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent leading-tight drop-shadow-lg">
              {webinar.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-md">
              {webinar.subtitle}
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="bg-white/90 backdrop-blur-sm border border-white/30 rounded-2xl p-6 mx-auto max-w-lg shadow-2xl">
            <p className="text-sm text-[#1A365D] mb-4 font-medium">Event starts in:</p>
            <div className="grid grid-cols-4 gap-4">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <div className="text-2xl md:text-3xl font-bold text-primary">{value}</div>
                    <div className="text-xs text-muted-foreground capitalize">{unit}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Event Info */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-white/80">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <Calendar className="w-5 h-5 text-white" />
              <span className="font-medium">{new Date(webinar.event_date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <Clock className="w-5 h-5 text-white" />
              <span className="font-medium">{webinar.duration_minutes} minutes</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <Users className="w-5 h-5 text-white" />
              <span className="font-medium">{registrationCount}/{webinar.registration_limit} registered</span>
            </div>
          </div>

          <Button 
            size="lg" 
            className="animate-pulse hover:animate-none"
            onClick={scrollToRegistration}
          >
            Reserve Your Spot Now
          </Button>
        </div>
      </section>

      {/* Speaker Section */}
      <section className="py-20 bg-white/95 backdrop-blur-sm relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#4A90E2]/5 to-[#1A365D]/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold">Meet Your Speaker</h2>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-primary">{webinar.speaker_name}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {webinar.speaker_bio}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-sm font-medium">Industry Expert with 1000+ Students Trained</span>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-2xl blur-2xl opacity-20 animate-pulse"></div>
              <img 
                src={webinar.speaker_image} 
                alt={webinar.speaker_name}
                className="relative w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-20 bg-white/95 backdrop-blur-sm relative">
        <div className="absolute inset-0 bg-gradient-to-l from-[#4A90E2]/5 to-[#1A365D]/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1A365D]">What You'll Learn</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              This comprehensive session will equip you with practical knowledge and actionable strategies
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {webinar.benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-card border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover-scale animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-lg p-2 flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm leading-relaxed">{benefit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Agenda */}
      <section className="py-20 bg-gradient-to-br from-[#4A90E2]/10 via-white to-[#1A365D]/10 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#4A90E2]/5 to-[#1A365D]/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1A365D]">Event Agenda</h2>
            <p className="text-lg text-gray-600">
              A structured 90-minute session designed for maximum value
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {webinar.agenda.map((item, index) => (
              <div 
                key={index}
                className="bg-card border rounded-xl p-6 flex items-center gap-6 hover:shadow-lg transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-primary/10 rounded-lg p-3 flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-primary">{item.time}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="font-medium">{item.topic}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="registration" className="py-20 bg-gradient-to-br from-[#4A90E2] via-[#2563eb] to-[#1A365D] relative overflow-hidden">
        {/* Hexagonal background for registration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M20 20l6.5-11.3L20 0l-6.5 11.3L20 20z M20 20l6.5 11.3L20 40l-6.5-11.3L20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-lg">Secure Your Spot</h2>
            <p className="text-lg text-white/90 drop-shadow-md">
              Limited seats available - Register now to guarantee your access
            </p>
            <div className="mt-4 text-sm font-medium text-white bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
              {registrationCount}/{webinar.registration_limit} spots taken
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-sm border border-white/30 rounded-2xl p-8 shadow-2xl animate-fade-in">
            <form onSubmit={handleRegistration} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[#1A365D] font-medium">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="border-[#4A90E2]/30 focus:border-[#4A90E2] bg-white transition-all duration-200 focus:scale-105"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#1A365D] font-medium">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className="border-[#4A90E2]/30 focus:border-[#4A90E2] bg-white transition-all duration-200 focus:scale-105"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsapp_number" className="text-[#1A365D] font-medium">WhatsApp Number *</Label>
                <Input
                  id="whatsapp_number"
                  name="whatsapp_number"
                  type="tel"
                  value={formData.whatsapp_number}
                  onChange={handleInputChange}
                  placeholder="Enter your WhatsApp number"
                  className="border-[#4A90E2]/30 focus:border-[#4A90E2] bg-white transition-all duration-200 focus:scale-105"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-[#4A90E2] to-[#1A365D] hover:from-[#357ABD] hover:to-[#0D2B4D] border-0 text-white font-semibold shadow-lg transform transition-all duration-200 hover:scale-105" 
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

            <div className="mt-6 text-center text-xs text-gray-600">
              By registering, you agree to receive webinar updates via email and WhatsApp
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebinarPage;