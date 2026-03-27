'use client';

import { useRouter } from 'next/navigation';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  buttonText: string;
  redirectPath?: string;
}

export default function SuccessModal({
  isOpen,
  onClose,
  title,
  buttonText,
  redirectPath,
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
        className="absolute inset-0 bg-gray-1000/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-[rgba(254,254,254,0.95)] backdrop-blur-[5.65px] rounded-3xl px-6 py-9 w-full max-w-[380px]">
        <div className="flex flex-col items-center gap-8 w-full">
          {/* Title */}
          <p className="text-[22px] font-semibold leading-[1.2] tracking-[-0.01em] text-gray-900 text-center whitespace-nowrap">
            {title}
          </p>

          {/* Button */}
          <button
            onClick={handleButtonClick}
            className="w-[332px] h-[52px] bg-main-500 rounded-lg flex items-center justify-center"
          >
            <span className="text-title3 text-gray-200">{buttonText}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
