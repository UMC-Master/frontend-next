'use client';

import Image from 'next/image';
import { ReactNode } from 'react';
import BackwardIcon from '@/assets/svgs/arrow_backward.svg';

export interface AppHeaderProps {
  title: string | ReactNode;
  leftIcon?: string;
  onIconClick?: () => void;
  sticky?: boolean;
  className?: string;
}

export default function TitleHeader({
  title,
  leftIcon = BackwardIcon,
  onIconClick,
  sticky = false,
  className = '',
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
        {leftIcon && (
          <button
            type="button"
            onClick={onIconClick}
            aria-label="left icon"
            className=""
          >
            <Image src={leftIcon} alt="icon" width={28} height={28} />
          </button>
        )}
      </div>
      {/* Title */}
      <h1 className="text-title2 text-gray-1000">{title}</h1>
    </ContainerTag>
  );
}
