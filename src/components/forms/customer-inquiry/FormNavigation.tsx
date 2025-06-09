
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  isSubmitting: boolean;
  onPrevStep: () => void;
  onNextStep: () => void;
}

const FormNavigation = ({ 
  currentStep, 
  totalSteps, 
  isSubmitting, 
  onPrevStep, 
  onNextStep 
}: FormNavigationProps) => {
  return (
    <div className="flex justify-between items-center pt-6">
      <Button
        type="button"
        onClick={onPrevStep}
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
          onClick={onNextStep}
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
  );
};

export default FormNavigation;
