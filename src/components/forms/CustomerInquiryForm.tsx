
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { customerInquiryService } from '@/services/customerInquiryService';
import { useToast } from '@/hooks/use-toast';

import ProgressBar from './customer-inquiry/ProgressBar';
import ErrorMessage from './customer-inquiry/ErrorMessage';
import SuccessMessage from './customer-inquiry/SuccessMessage';
import PersonalInformationStep from './customer-inquiry/PersonalInformationStep';
import ProjectDetailsStep from './customer-inquiry/ProjectDetailsStep';
import MessageStep from './customer-inquiry/MessageStep';
import NavigationButtons from './customer-inquiry/NavigationButtons';
import { useFormSteps } from './customer-inquiry/useFormSteps';
import { formSchema, FormData, CustomerInquiryFormProps } from './customer-inquiry/types';

const CustomerInquiryForm = ({ sourcePage = 'contact', onSuccess, className = '' }: CustomerInquiryFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const totalSteps = 3;
  const { toast } = useToast();
  const { getStepFields } = useFormSteps();

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
    setSubmitError(null);
    
    try {
      console.log('Form submission started with data:', data);
      console.log('Retry count:', retryCount);
      
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
      
      console.log('Submitting inquiry data:', inquiryData);
      const result = await customerInquiryService.submitInquiry(inquiryData);
      console.log('Submission successful:', result);
      
      setIsSubmitted(true);
      setRetryCount(0);
      toast({
        title: "Success!",
        description: "Your inquiry has been submitted successfully. We'll get back to you within 24 hours.",
      });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setRetryCount(prev => prev + 1);
      
      let errorMessage = 'There was an error submitting your inquiry. Please try again.';
      
      if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = (error as Error).message;
      }
      
      setSubmitError(errorMessage);
      toast({
        title: "Submission Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetry = () => {
    setSubmitError(null);
    form.handleSubmit(onSubmit)();
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

  if (isSubmitted) {
    return (
      <div className={`${className}`}>
        <SuccessMessage />
      </div>
    );
  }

  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      {submitError && (
        <ErrorMessage 
          error={submitError}
          retryCount={retryCount}
          isSubmitting={isSubmitting}
          onRetry={handleRetry}
        />
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {currentStep === 1 && <PersonalInformationStep control={form.control} />}
          {currentStep === 2 && <ProjectDetailsStep control={form.control} />}
          {currentStep === 3 && <MessageStep control={form.control} />}

          <NavigationButtons
            currentStep={currentStep}
            totalSteps={totalSteps}
            isSubmitting={isSubmitting}
            onPrevious={prevStep}
            onNext={nextStep}
          />
        </form>
      </Form>
    </div>
  );
};

export default CustomerInquiryForm;
