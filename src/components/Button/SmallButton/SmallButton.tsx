import clsx from 'clsx';
import { SmallButtonProps } from './SmallButton.types';

const SmallButton = ({ text, onClick, disabled }: SmallButtonProps) => {
  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={clsx(
        'flex h-12 w-27 shrink-0 items-center justify-center rounded-lg p-3 text-title4 text-white transition-colors duration-200',
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
