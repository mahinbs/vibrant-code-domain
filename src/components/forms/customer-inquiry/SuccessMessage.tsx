
import { CheckCircle } from 'lucide-react';

const SuccessMessage = () => {
  return (
    <div className="text-center py-12">
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
};

export default SuccessMessage;
