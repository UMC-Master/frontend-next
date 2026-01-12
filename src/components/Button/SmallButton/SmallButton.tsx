import clsx from 'clsx';
import { SmallButtonProps } from './SmallButton.types';

const SmallButton = ({ text, onClick, disabled }: SmallButtonProps) => {
  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={clsx(
        'w-27 h-12 flex justify-center items-center p-3 text-white rounded-lg transition-colors duration-200',
        {
          'bg-gray-500 cursor-not-allowed': disabled,
          'bg-main-500 hover:bg-main-600 cursor-pointer': !disabled,
        },
      )}
    >
      {text}
    </div>
  );
};

export default SmallButton;
