import clsx from 'clsx';
import { LargeButtonProps } from './LargeButton.types';

const LargeButton = ({ onClick, text, disabled = false }: LargeButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'w-95 h-13 text-gray-200 transition-colors duration-200 rounded-2xl',
        {
          'bg-gray-500 cursor-not-allowed': disabled,
          'bg-main-500 hover:bg-main-600 cursor-pointer': !disabled,
        },
      )}
    >
      {text}
    </button>
  );
};

export default LargeButton;
