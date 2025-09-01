import { Check } from 'lucide-react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  completedSteps: number[];
}

export const ProgressIndicator = ({ currentStep, totalSteps, completedSteps }: ProgressIndicatorProps) => {
  const steps = [
    'Location',
    'Crop Details',
    'Soil & Irrigation',
    'Inputs & Practices',
    'Review'
  ];

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {steps.slice(0, totalSteps).map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = completedSteps.includes(stepNumber);
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div key={stepNumber} className="flex items-center">
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all
                ${isCompleted 
                  ? 'bg-success border-success text-success-foreground' 
                  : isCurrent 
                  ? 'border-primary text-primary bg-primary/10' 
                  : 'border-muted text-muted-foreground'
                }
              `}>
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-medium">{stepNumber}</span>
                )}
              </div>
              <div className="ml-2 text-sm">
                <p className={`font-medium ${isCurrent ? 'text-primary' : isCompleted ? 'text-success' : 'text-muted-foreground'}`}>
                  {step}
                </p>
              </div>
              {index < totalSteps - 1 && (
                <div className={`w-12 h-0.5 mx-4 ${isCompleted ? 'bg-success' : 'bg-muted'}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};