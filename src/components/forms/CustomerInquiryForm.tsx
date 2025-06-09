
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ArrowRight, Loader2, CheckCircle, Rocket, Lightbulb, Zap } from 'lucide-react';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { customerInquiryService } from '@/services/customerInquiryService';
import { useToast } from '@/hooks/use-toast';
import { formSchema, FormData, CustomerInquiryFormProps, services, budgetRanges, timelines } from './customer-inquiry/types';

const CustomerInquiryForm = ({ sourcePage = 'contact', onSuccess, className = '' }: CustomerInquiryFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const totalSteps = 3;
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      company: '',
      service_interest: '',
      budget_range: '',
      project_timeline: '',
      message: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      const inquiryData = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone || '',
        company: data.company || '',
        service_interest: data.service_interest,
        budget_range: data.budget_range,
        project_timeline: data.project_timeline,
        message: data.message,
        source_page: sourcePage,
      };
      
      await customerInquiryService.submitInquiry(inquiryData);
      
      setIsSubmitted(true);
      toast({
        title: "Success!",
        description: "Your inquiry has been submitted successfully. We'll get back to you within 24 hours.",
      });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your inquiry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    const fields = getStepFields(currentStep);
    const isValid = await form.trigger(fields);
    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const getStepFields = (step: number): (keyof FormData)[] => {
    switch (step) {
      case 1:
        return ['first_name', 'last_name', 'email', 'phone'];
      case 2:
        return ['service_interest', 'budget_range', 'project_timeline'];
      case 3:
        return ['message'];
      default:
        return [];
    }
  };

  if (isSubmitted) {
    return (
      <div className={`${className}`}>
        <div className="relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20 animate-pulse"></div>
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          
          <div className="relative z-10 text-center py-16 max-w-4xl mx-auto px-6">
            {/* Success Icon with Animation */}
            <div className="mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-xl animate-pulse"></div>
              <CheckCircle className="h-20 w-20 text-green-400 mx-auto relative animate-scale-in" />
            </div>

            {/* Main Heading */}
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent animate-fade-in">
              🚀 Your Vision is Our Mission!
            </h2>

            {/* Motivational Subheading */}
            <p className="text-2xl md:text-3xl text-gray-200 mb-8 font-medium animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Every great app starts with a <span className="text-cyan-300 font-bold">bold idea</span> — and yours is next!
            </p>

            {/* Inspirational Quote */}
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-8 border border-cyan-500/20 mb-10 backdrop-blur-sm animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <blockquote className="text-xl md:text-2xl text-gray-300 italic mb-4">
                "The future belongs to those who believe in the beauty of their dreams."
              </blockquote>
              <p className="text-cyan-300 font-semibold">— Eleanor Roosevelt</p>
            </div>

            {/* Motivational Content Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20 backdrop-blur-sm animate-fade-in" style={{ animationDelay: '0.9s' }}>
                <Lightbulb className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Innovation Awaits</h3>
                <p className="text-gray-300">Your idea has the power to transform industries, solve real problems, and create lasting impact in the digital world.</p>
              </div>
              
              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl p-6 border border-cyan-500/20 backdrop-blur-sm animate-fade-in" style={{ animationDelay: '1.2s' }}>
                <Rocket className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Ready for Liftoff</h3>
                <p className="text-gray-300">Together, we'll build something extraordinary that users will love, businesses will adopt, and the market will celebrate.</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-6 border border-green-500/20 backdrop-blur-sm animate-fade-in" style={{ animationDelay: '1.5s' }}>
                <Zap className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Lightning Speed</h3>
                <p className="text-gray-300">From concept to creation, we'll move fast and build smart. Your vision will become reality faster than you imagined.</p>
              </div>
            </div>

            {/* Success Stats */}
            <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-2xl p-8 border border-gray-700/30 backdrop-blur-sm mb-10 animate-fade-in" style={{ animationDelay: '1.8s' }}>
              <h3 className="text-2xl font-bold text-white mb-6">Join 1,500+ Visionaries Who Transformed Their Ideas Into Reality</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-cyan-400 mb-2">500M+</div>
                  <div className="text-gray-300">Users Reached</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400 mb-2">$2.5B+</div>
                  <div className="text-gray-300">Revenue Generated</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-400 mb-2">99.8%</div>
                  <div className="text-gray-300">Client Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-8 border border-cyan-500/20 backdrop-blur-sm animate-fade-in" style={{ animationDelay: '2.1s' }}>
              <h3 className="text-2xl font-bold text-white mb-6">What Happens Next? 🎯</h3>
              <div className="space-y-4 text-left max-w-2xl mx-auto">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-black font-bold">1</div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">Deep Dive Analysis (24 hours)</h4>
                    <p className="text-gray-300">Our expert team will analyze your requirements and craft a tailored strategy for your project's success.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">Custom Proposal (48 hours)</h4>
                    <p className="text-gray-300">Receive a detailed roadmap, timeline, and investment plan designed specifically for your vision.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">Strategy Call (Within 3 days)</h4>
                    <p className="text-gray-300">Join a personalized consultation where we'll refine your idea and plan the development journey ahead.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-10 p-6 bg-gradient-to-r from-gray-900/60 to-gray-800/60 rounded-xl border border-gray-600/30 backdrop-blur-sm animate-fade-in" style={{ animationDelay: '2.4s' }}>
              <p className="text-xl text-cyan-300 font-medium mb-3">
                Ready to start building the future? 🌟
              </p>
              <p className="text-gray-300 mb-4">
                Our team is standing by to make your vision a reality. Need immediate assistance?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a href="tel:+15551234567" className="flex items-center space-x-2 text-white hover:text-cyan-300 transition-colors">
                  <span className="font-semibold">📞 +1 (555) 123-4567</span>
                </a>
                <span className="hidden sm:block text-gray-500">|</span>
                <a href="mailto:hello@company.com" className="flex items-center space-x-2 text-white hover:text-cyan-300 transition-colors">
                  <span className="font-semibold">✉️ hello@company.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">Step {currentStep} of {totalSteps}</span>
          <span className="text-sm text-gray-400">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30">
              <h3 className="text-2xl font-bold text-white mb-6">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">First Name *</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="bg-gray-800/50 border-gray-600/50 text-white focus:ring-cyan-500 focus:border-cyan-500"
                          placeholder="John"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Last Name *</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="bg-gray-800/50 border-gray-600/50 text-white focus:ring-cyan-500 focus:border-cyan-500"
                          placeholder="Doe"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Email Address *</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="email"
                          className="bg-gray-800/50 border-gray-600/50 text-white focus:ring-cyan-500 focus:border-cyan-500"
                          placeholder="john@company.com"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Phone Number</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="tel"
                          className="bg-gray-800/50 border-gray-600/50 text-white focus:ring-cyan-500 focus:border-cyan-500"
                          placeholder="+1 (555) 123-4567"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem className="mt-6">
                    <FormLabel className="text-gray-300">Company Name</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        className="bg-gray-800/50 border-gray-600/50 text-white focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="Your Company Inc."
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Step 2: Project Details */}
          {currentStep === 2 && (
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30">
              <h3 className="text-2xl font-bold text-white mb-6">Project Details</h3>
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="service_interest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Service Interest *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-gray-800/50 border-gray-600/50 text-white focus:ring-cyan-500 focus:border-cyan-500">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          {services.map((service) => (
                            <SelectItem key={service} value={service} className="text-white focus:bg-gray-700">
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="budget_range"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Budget Range *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-gray-800/50 border-gray-600/50 text-white focus:ring-cyan-500 focus:border-cyan-500">
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          {budgetRanges.map((range) => (
                            <SelectItem key={range} value={range} className="text-white focus:bg-gray-700">
                              {range}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="project_timeline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Project Timeline *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-gray-800/50 border-gray-600/50 text-white focus:ring-cyan-500 focus:border-cyan-500">
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          {timelines.map((timeline) => (
                            <SelectItem key={timeline} value={timeline} className="text-white focus:bg-gray-700">
                              {timeline}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}

          {/* Step 3: Message */}
          {currentStep === 3 && (
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30">
              <h3 className="text-2xl font-bold text-white mb-6">Project Description</h3>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Tell us about your project *</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        rows={6}
                        className="bg-gray-800/50 border-gray-600/50 text-white focus:ring-cyan-500 focus:border-cyan-500 resize-none"
                        placeholder="Describe your project requirements, goals, and any specific features you need..."
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-6">
            <Button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 disabled:opacity-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button
                type="button"
                onClick={nextStep}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Inquiry'
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CustomerInquiryForm;
