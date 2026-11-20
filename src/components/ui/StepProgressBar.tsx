import clsx from 'clsx';

interface StepProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function StepProgressBar({
  currentStep,
  totalSteps,
  className,
}: StepProgressBarProps) {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div
      aria-label="회원가입 진행 단계"
      aria-valuemin={0}
      aria-valuemax={totalSteps}
      aria-valuenow={currentStep}
      role="progressbar"
      className={clsx(
        'h-3 w-full max-w-[380px] overflow-hidden rounded-lg bg-[#d9d9d9]',
        className,
      )}
    >
      {/* Progress Fill */}
      <div
        className="h-3 bg-main-500 rounded-lg transition-all duration-300 ease-out"
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
}
