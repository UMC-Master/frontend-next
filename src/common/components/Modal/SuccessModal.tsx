'use client';

import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  buttonText: string;
  redirectPath?: string;
  illustration?: ReactNode;
  blurBackdrop?: boolean;
}

export default function SuccessModal({
  isOpen,
  onClose,
  title,
  buttonText,
  redirectPath,
  illustration,
  blurBackdrop = true,
}: SuccessModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleButtonClick = () => {
    onClose();
    if (redirectPath) {
      router.push(redirectPath);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      {/* Backdrop */}
      <div
        className={clsx(
          'absolute inset-0 bg-gray-1000/70',
          blurBackdrop && 'backdrop-blur-sm',
        )}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative max-h-[calc(100dvh-3rem)] w-full max-w-[380px] overflow-y-auto rounded-3xl bg-[rgba(254,254,254,0.95)] px-6 py-9 backdrop-blur-[5.65px]"
      >
        <div className="flex flex-col items-center gap-8 w-full">
          <div className="flex w-full flex-col items-center">
            {illustration}
            <p className="w-full text-center text-title1 text-gray-900">
              {title}
            </p>
          </div>

          {/* Button */}
          <button
            type="button"
            onClick={handleButtonClick}
            className="flex h-[52px] w-full max-w-[332px] items-center justify-center rounded-lg bg-main-500"
          >
            <span
              className={
                illustration
                  ? 'text-title4 text-gray-200'
                  : 'text-title3 text-gray-200'
              }
            >
              {buttonText}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
