'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  buttonText: string;
  redirectPath?: string;
  illustrationSrc?: string;
  illustrationAlt?: string;
}

export default function SuccessModal({
  isOpen,
  onClose,
  title,
  buttonText,
  redirectPath,
  illustrationSrc,
  illustrationAlt = '',
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
    >
      <div
        className="absolute inset-0 bg-gray-1000/70"
        onClick={onClose}
      />

      <div className="relative w-full max-w-[380px] rounded-3xl bg-gray-100 px-6 py-9">
        <div className="flex w-full flex-col items-center gap-8">
          {illustrationSrc ? (
            <Image
              src={illustrationSrc}
              alt={illustrationAlt}
              width={132}
              height={132}
              className="h-[132px] w-[132px]"
            />
          ) : null}

          <p
            id="success-modal-title"
            className="w-full text-center text-title1 text-gray-1000"
          >
            {title}
          </p>

          <button
            type="button"
            onClick={handleButtonClick}
            className="flex h-[52px] w-full items-center justify-center rounded-lg bg-main-500"
          >
            <span className="text-title3 text-gray-200">{buttonText}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
