import clsx from 'clsx';
import { LargeButtonProps } from './LargeButton.types';

const LargeButton = ({
  onClick,
  text,
  disabled = false,
  className,
}: LargeButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'h-13 w-full max-w-[380px] text-gray-200 transition-colors duration-200 rounded-2xl',
        {
          'bg-gray-500 cursor-not-allowed': disabled,
          'bg-main-500 hover:bg-main-600 cursor-pointer': !disabled,
        },
        className,
      )}
    >
      {text}
    </button>
  );
};

export default LargeButton;
