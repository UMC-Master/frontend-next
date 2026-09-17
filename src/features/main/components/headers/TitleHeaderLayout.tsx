'use client';

import { ReactNode } from 'react';
import BackwardIcon from '@/assets/svgs/arrow_backward.svg';

export interface AppHeaderProps {
  title: string | ReactNode;
  leftIcon?: React.ComponentType<{ className?: string }>;
  showLeftIcon?: boolean;
  onIconClick?: () => void;
  sticky?: boolean;
  className?: string;
  titleClassName?: string;
}

export default function TitleHeader({
  title,
  leftIcon: LeftIcon = BackwardIcon,
  showLeftIcon = true,
  onIconClick,
  sticky = false,
  className = '',
  titleClassName = '',
}: AppHeaderProps) {
  const ContainerTag = sticky ? 'header' : 'div';

  return (
    <ContainerTag
      className={[
        'relative flex items-center justify-center h-13.5',
        sticky ? 'sticky top-0 z-30 bg-white' : '',
        className,
      ].join(' ')}
    >
      {/* Left icon */}
      <div className="absolute left-0 flex items-center">
        {LeftIcon && showLeftIcon && (
          <button
            type="button"
            onClick={onIconClick}
            aria-label="left icon"
            className="flex size-9 items-center justify-center"
          >
            <LeftIcon className="size-7" />
          </button>
        )}
      </div>
      {/* Title */}
      <h1 className={['text-title2 text-gray-1000', titleClassName].join(' ')}>
        {title}
      </h1>
    </ContainerTag>
  );
}
