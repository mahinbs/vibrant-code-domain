
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { customerInquiryService } from '@/services/customerInquiryService';
import { CheckCircle, Loader2, ArrowRight, ArrowLeft } from 'lucide-react';

const formSchema = z.object({
  first_name: z.string().min(2, 'First name must be at least 2 characters'),
  last_name: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  service_interest: z.string().min(1, 'Please select a service'),
  budget_range: z.string().min(1, 'Please select a budget range'),
  project_timeline: z.string().min(1, 'Please select a timeline'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof formSchema>;

interface CustomerInquiryFormProps {
  sourcePage?: string;
  onSuccess?: () => void;
  className?: string;
}

const CustomerInquiryForm = ({ sourcePage = 'contact', onSuccess, className = '' }: CustomerInquiryFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const totalSteps = 3;

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

  const services = [
    'Web Applications',
    'Mobile Apps',
    'SaaS Solutions',
    'AI & Automation',
    'E-commerce',
    'Custom Software',
    'UI/UX Design',
    'Digital Transformation'
  ];

  const budgetRanges = [
    '$5,000 - $15,000',
    '$15,000 - $50,000',
    '$50,000 - $100,000',
    '$100,000 - $250,000',
    '$250,000+'
  ];

  const timelines = [
    'ASAP (Rush)',
    '1-2 months',
    '3-6 months',
    '6-12 months',
    '12+ months',
    'Just exploring'
  ];

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await customerInquiryService.submitInquiry({
        ...data,
        source_page: sourcePage,
      });
      
      setIsSubmitted(true);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your inquiry. Please try again.');
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
      <div className={`text-center py-12 ${className}`}>
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-3xl p-8 border border-green-500/20 max-w-2xl mx-auto">
          <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-6 animate-pulse" />
          <h3 className="text-3xl font-bold text-white mb-4">Thank You!</h3>
          <p className="text-xl text-gray-300 mb-6">
            Your inquiry has been successfully submitted. We'll get back to you within 24 hours.
          </p>
          <div className="space-y-3 text-gray-400">
            <p>• Our team will review your requirements</p>
            <p>• You'll receive a detailed proposal within 2 business days</p>
            <p>• We'll schedule a free consultation call to discuss your project</p>
          </div>
          <div className="mt-8 p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
            <p className="text-cyan-300 font-medium">
              Need immediate assistance? Call us at <span className="text-white">+1 (555) 123-4567</span>
            </p>
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
