
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorMessageProps {
  error: string;
  retryCount: number;
  isSubmitting: boolean;
  onRetry: () => void;
}

const ErrorMessage = ({ error, retryCount, isSubmitting, onRetry }: ErrorMessageProps) => {
  return (
    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
      <div className="flex items-start space-x-3">
        <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-red-300 mb-3">{error}</p>
          {retryCount < 3 && (
            <Button
              onClick={onRetry}
              disabled={isSubmitting}
              variant="outline"
              size="sm"
              className="border-red-400/50 text-red-300 hover:bg-red-500/10"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isSubmitting ? 'animate-spin' : ''}`} />
              Try Again ({retryCount}/3)
            </Button>
          )}
          {retryCount >= 3 && (
            <div className="text-sm text-gray-400">
              <p>If the problem persists, please contact us directly:</p>
              <p className="text-cyan-300">Email: ceo@boostmysites.com</p>
              <p className="text-cyan-300">Phone: +1 (555) 123-4567</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
