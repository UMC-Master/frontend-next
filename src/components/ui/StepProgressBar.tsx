interface StepProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function StepProgressBar({
  currentStep,
  totalSteps,
}: StepProgressBarProps) {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-95 h-3 bg-gray-200 rounded-lg overflow-hidden">
      {/* Progress Fill */}
      <div
        className="h-3 bg-main-500 rounded-lg transition-all duration-300 ease-out"
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
}
