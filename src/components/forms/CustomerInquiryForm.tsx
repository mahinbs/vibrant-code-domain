
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { customerInquiryService } from '@/services/customerInquiryService';
import { useToast } from '@/hooks/use-toast';
import { formSchema, FormData, CustomerInquiryFormProps } from './customer-inquiry/types';
import ProgressBar from './customer-inquiry/ProgressBar';
import PersonalInformationStep from './customer-inquiry/PersonalInformationStep';
import ProjectDetailsStep from './customer-inquiry/ProjectDetailsStep';
import ProjectDescriptionStep from './customer-inquiry/ProjectDescriptionStep';
import FormNavigation from './customer-inquiry/FormNavigation';

const CustomerInquiryForm = ({ sourcePage = 'contact', onSuccess, className = '' }: CustomerInquiryFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = 3;
  const { toast } = useToast();
  const navigate = useNavigate();

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
      
      toast({
        title: "Success!",
        description: "Your inquiry has been submitted successfully. Redirecting to confirmation page...",
      });
      
      if (onSuccess) {
        onSuccess();
      }
      
      // Redirect to thank you page after a brief delay
      setTimeout(() => {
        navigate('/thank-you');
      }, 1000);
      
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

  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {currentStep === 1 && (
            <PersonalInformationStep 
              control={form.control} 
              errors={form.formState.errors} 
            />
          )}

          {currentStep === 2 && (
            <ProjectDetailsStep 
              control={form.control} 
              errors={form.formState.errors} 
            />
          )}

          {currentStep === 3 && (
            <ProjectDescriptionStep 
              control={form.control} 
              errors={form.formState.errors} 
            />
          )}

          <FormNavigation
            currentStep={currentStep}
            totalSteps={totalSteps}
            isSubmitting={isSubmitting}
            onPrevStep={prevStep}
            onNextStep={nextStep}
          />
        </form>
      </Form>
    </div>
  );
};

export default CustomerInquiryForm;
