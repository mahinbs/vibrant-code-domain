import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';
import { toast } from 'sonner';
import { Loader2, Building, Users, Clock, DollarSign } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { customerInquiryService } from '@/services/customerInquiryService';

const enterpriseFormSchema = z.object({
  first_name: z.string().min(2, 'First name must be at least 2 characters'),
  last_name: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  company: z.string().min(2, 'Company name is required'),
  company_size: z.string().min(1, 'Please select company size'),
  service_interest: z.string().min(1, 'Please select a service area'),
  budget_range: z.string().min(1, 'Please select a budget range'),
  project_timeline: z.string().min(1, 'Please select a timeline'),
  message: z.string().min(20, 'Please provide detailed project requirements (minimum 20 characters)'),
});

type EnterpriseFormData = z.infer<typeof enterpriseFormSchema>;

interface EnterpriseContactFormProps {
  sourcePage?: string;
  onSuccess?: () => void;
  className?: string;
  title?: string;
  description?: string;
}

const EnterpriseContactForm = ({ 
  sourcePage = 'enterprise', 
  onSuccess,
  className = '',
  title = "Ready to Scale Your Business with Custom Technology?",
  description = "Schedule a strategic consultation with our enterprise solutions team."
}: EnterpriseContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const form = useForm<EnterpriseFormData>({
    resolver: zodResolver(enterpriseFormSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      company: '',
      company_size: '',
      service_interest: '',
      budget_range: '',
      project_timeline: '',
      message: '',
    },
  });

  const onSubmit = async (data: EnterpriseFormData) => {
    setIsSubmitting(true);

    try {
      const submissionData = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        company_size: data.company_size,
        service_interest: data.service_interest,
        budget_range: data.budget_range,
        project_timeline: data.project_timeline,
        message: data.message,
        source_page: sourcePage,
      };

      await customerInquiryService.submitInquiry(submissionData);
      
      toast.success('Your consultation request has been submitted successfully!', {
        description: 'Our enterprise team will contact you within 24 hours.'
      });

      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/thank-you', { 
          state: { 
            type: 'enterprise',
            message: 'Thank you for your interest in our enterprise solutions. Our team will be in touch soon.'
          }
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const companySize = [
    '10-50 employees',
    '51-200 employees', 
    '201-1000 employees',
    '1000+ employees',
    'Startup',
    'Enterprise'
  ];

  const serviceAreas = [
    'Custom Software Development',
    'Digital Transformation',
    'AI & Machine Learning Solutions',
    'Cloud Migration & Architecture',
    'Enterprise Web Applications',
    'Mobile App Development',
    'DevOps & Infrastructure',
    'Data Analytics & Business Intelligence',
    'Cybersecurity Solutions',
    'Legacy System Modernization'
  ];

  const budgetRanges = [
    '$50K - $100K',
    '$100K - $250K',
    '$250K - $500K',
    '$500K - $1M',
    '$1M+',
    'Custom Quote Required'
  ];

  const timelines = [
    'ASAP (Rush Project)',
    '1-3 months',
    '3-6 months', 
    '6-12 months',
    '12+ months',
    'Strategic Planning Phase'
  ];

  return (
    <section className={`py-16 bg-gray-900/50 ${className}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {title}
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {description}
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
                
                {/* Contact Information */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <Users className="h-5 w-5 mr-2 text-cyan-400" />
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="first_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">First Name *</FormLabel>
                          <FormControl>
                            <Input {...field} className="bg-gray-700/50 border-gray-600 text-white" />
                          </FormControl>
                          <FormMessage />
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
                            <Input {...field} className="bg-gray-700/50 border-gray-600 text-white" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">Business Email *</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" className="bg-gray-700/50 border-gray-600 text-white" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">Phone Number *</FormLabel>
                          <FormControl>
                            <Input {...field} type="tel" className="bg-gray-700/50 border-gray-600 text-white" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Company Information */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <Building className="h-5 w-5 mr-2 text-cyan-400" />
                    Company Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">Company Name *</FormLabel>
                          <FormControl>
                            <Input {...field} className="bg-gray-700/50 border-gray-600 text-white" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="company_size"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">Company Size *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                                <SelectValue placeholder="Select company size" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-gray-800 border-gray-600">
                              {companySize.map((size) => (
                                <SelectItem key={size} value={size} className="text-white hover:bg-gray-700">
                                  {size}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Project Details */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-cyan-400" />
                    Project Requirements
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <FormField
                      control={form.control}
                      name="service_interest"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">Service Area *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                                <SelectValue placeholder="Select service area" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-gray-800 border-gray-600">
                              {serviceAreas.map((service) => (
                                <SelectItem key={service} value={service} className="text-white hover:bg-gray-700">
                                  {service}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
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
                              <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                                <SelectValue placeholder="Select timeline" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-gray-800 border-gray-600">
                              {timelines.map((timeline) => (
                                <SelectItem key={timeline} value={timeline} className="text-white hover:bg-gray-700">
                                  {timeline}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="budget_range"
                    render={({ field }) => (
                      <FormItem className="mb-6">
                        <FormLabel className="text-gray-300 flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          Investment Range *
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                              <SelectValue placeholder="Select investment range" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-gray-800 border-gray-600">
                            {budgetRanges.map((range) => (
                              <SelectItem key={range} value={range} className="text-white hover:bg-gray-700">
                                {range}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Project Requirements & Goals *</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="Please describe your project requirements, business objectives, technical challenges, and success metrics you'd like to achieve..."
                            className="bg-gray-700/50 border-gray-600 text-white min-h-[120px] resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Submitting Request...
                    </>
                  ) : (
                    'Request Strategic Consultation'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseContactForm;