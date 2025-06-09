
interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  return (
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
  );
};

export default ProgressBar;
